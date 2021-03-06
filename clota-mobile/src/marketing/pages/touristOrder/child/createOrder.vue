<!--填写订单-->

<template>
    <div class="create-order">
        <div class="order-title">
            <div class="order-info">
                <div class="order-name">{{productDetail.productName | contentFilter}}</div>
                <div class="notice" @click="showProductNotice = true">{{$t('ticketInfo')}}</div>
            </div>
            <ul class="label-input">
                <li class="label-list" v-if="cannotReturn">{{$t('withoutReturn')}}</li>
                <li class="label-list" v-else>{{$t('returnable')}}</li>
                <li class="label-list" v-if="cannotAlter">{{$t('unmodifiable')}}</li>
                <li class="label-list" v-else>{{$t('modifiable')}}</li>
            </ul>
        </div>
        <div class="content">
            <group class="group-wrap">
                <cell
                    :title="$t('playDate')"
                    class="padding-right"
                    :value="playDate">
                </cell>
                <x-number :title="$t('buyNum')"
                          :fillable="true"
                          v-model="buyNum"
                          :max="maxChoosed"
                          :min="minChoosed">
                </x-number>
            </group>
            <div class="tip-hr" v-if="saleRuleDesc">
                {{saleRuleDesc}}
            </div>
            <group class="group-wrap" v-for="(item,index) in formData" :key="index">
                <popup-radio :title="$t('cardType')"
                             v-if="acceptIdType.length > 0"
                             :options="acceptIdType"
                             v-model="formData[index].idType">
                </popup-radio>
                <!-- 证件号 -->
                <x-input
                    v-if="acceptIdType.length > 0"
                    :title="$t('idNumber')"
                    text-align="right"
                    :show-clear="false"
                    v-model.trim="formData[index].idNum"
                    :placeholder="$t('pleaseInput',{ field : $t('idNumber') })"
                    placeholder-align="right">
                </x-input>
                <!-- 游客姓名 -->
                <x-input
                    :title="$t('touristName')"
                    text-align="right"
                    :show-clear="false"
                    v-model.trim="formData[index].name"
                    :placeholder="$t('sameAsCertificate')"
                    placeholder-align="right">
                </x-input>
                <!-- 手机号 -->
                <x-input
                    :title="$t('mobile')"
                    text-align="right"
                    :show-clear="false"
                    keyboard="tel"
                    v-model.trim="formData[index].phone"
                    :placeholder="$t('forGetMsg')"
                    placeholder-align="right">
                </x-input>
            </group>
        </div>
        <div class="btn-wrap">
            <div class="total-amount">
                {{$t('colonSetting',{ key : $t('amount') })}}
                <span class="money">{{totalAmount | moneyFilter(2,'￥') | contentFilter}}</span>
            </div>
            <div class="create-btn" @click="createOrder">{{$t('createOrder')}}</div>
        </div>

        <!--购票须知模态框-->
        <ticket-notice :choosedProductInfo="productDetail"
                       v-model="showProductNotice">
        </ticket-notice>
        <!--游客下单失败提提-->
        <tourist-order-error v-model="showErrorToast"
                             :tourist-info="errorTouristInfo">
        </tourist-order-error>
    </div>
</template>

<script>
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ticketNotice from '../components/ticketNotice';
    import ajax from '@/marketing/api/index';
    import { validator } from 'klwk-ui';
    import common from '@/assets/js/common.js';
    import { mapGetters } from 'vuex';
    import touristOrderError from '../components/touristOrderError';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            ticketNotice,
            touristOrderError
        },
        data () {
            return {
                formData : [{
                    name : '',
                    phone : '',
                    //证件类型
                    idType : '',
                    //证件号
                    idNum : ''
                }],
                //产品明细信息
                productDetail : {},
                //是否显示购票须知模态框
                showProductNotice : false,
                //产品销售政策
                productPolicy : {},
                //游玩日期
                playDate : '',
                //购买数量
                buyNum : 1,
                //是否显示错误提示框
                showErrorToast : false,
                //下单错误的游客信息
                errorTouristInfo : []
            };
        },
        methods : {
            getParams (params) {
                if (params && params.productDetail && Object.keys(params.productDetail).length > 0) {
                    this.productDetail = params.productDetail;
                    this.playDate = params.playDate;
                    this.queryProductPolicy();
                } else {
                    this.$router.push({
                        name : 'marketingTourist'
                    });
                }
            },
            /**
             * 查询产品销售规则
             */
            queryProductPolicy () {
                ajax.postWithoutToken('market_findProductSaleRules',{
                    productIds : this.productDetail.productId
                }).then(res => {
                    if (res.success) {
                        this.productPolicy = res.data ? res.data[this.productDetail.productId] : {};
                    } else {
                        this.productPolicy = [];
                    }
                });
            },
            /**
             * 校验证件类型
             * @return {Promise<any>}
             */
            validateIdType () {
                return new Promise((resolve,reject) => {
                    if ( this.acceptIdType.length > 0) {
                        for ( let i = 0,j = this.formData.length; i < j; i++) {
                            if (this.formData[i]['idType'] === '') {
                                this.$vux.toast.text(this.$t('pleaseSelect',{ field : this.$t('cardType') }));
                                reject();
                            }
                        }
                        resolve();
                    } else {
                        resolve();
                    }
                });
            },
            /**
             * 校验证件号
             * @return {Promise<any>}
             */
            validateIdNum () {
                return new Promise((resolve,reject) => {
                    if ( this.acceptIdType.length > 0) {
                        for ( let i = 0,j = this.formData.length; i < j; i++) {
                            if (this.formData[i]['idNum'] === '') {
                                this.$vux.toast.text(this.$t('pleaseInputIdNum'));
                                reject();
                            } else if (this.formData[i]['idNum']) {
                                if (this.formData[i]['idType'] === 'identity') {
                                    if (validator.isIdCard(this.formData[i]['idNum'])) {
                                        resolve();
                                    } else {
                                        this.$vux.toast.show({
                                            text : this.$t('errFormat',{ field : this.$t('idCard') }),
                                            type : 'text',
                                            width : '5.2rem'
                                        });
                                        reject();
                                    }
                                } else {
                                    if (this.formData[i].idNum.length > 40) {
                                        this.$vux.toast.text(this.$t('errorMaxLength',{ field : this.$t('idCard'),length : 40 }));
                                        reject();
                                    } else {
                                        resolve();
                                    }
                                }
                            } else {
                                reject();
                            }
                        }
                        resolve();
                    } else {
                        resolve();
                    }
                });
            },
            /**
             * 校验姓名
             * @return {Promise<any>}
             */
            validateName () {
                return new Promise ((resolve,reject) => {
                    for ( let i = 0,j = this.formData.length; i < j; i++) {
                        if (this.formData[i]['name'] === '') {
                            this.$vux.toast.text(this.$t('pleaseInput',{ field : this.$t('name') }));
                            reject();
                        } else if (this.formData[i].name.length > 20) {
                            this.$vux.toast.text(this.$t('maxLengthErr',{ field : this.$t('name'),length : 20 }));
                            reject();
                        }
                    }
                    resolve();
                });
            },
            /**
             * 校验手机号是否正确
             * @return{Function} 校验结果
             */
            validatePhone () {
                return new Promise((resolve,reject) => {
                    for ( let i = 0,j = this.formData.length; i < j; i++) {
                        if (this.formData[i]['phone'] === '') {
                            this.$vux.toast.text(this.$t('pleaseEnterMobile'));
                            reject();
                        } else if (!validator.isMobile(this.formData[i].phone)) {
                            this.$vux.toast.text(this.$t('pleaseEnterRightMobile'));
                            reject();
                        }
                    }
                    resolve();
                });
            },
            /**
             * 下单
             */
            createOrder () {
                this.validateIdType().then(() => {
                    return this.validateIdNum();
                }).then(() => {
                    return this.validateName();
                }).then(() => {
                    return this.validatePhone();
                }).then(() => {
                    this.checkExtProductSaleRule();
                });
            },
            /**
             * 校验是否能下单
             */
            validateOrderIsRight () {
                ajax.postWithoutToken('market_checkOrderBeforePay',{
                    productInfos : JSON.stringify([{
                        productId : this.productDetail.productId,
                        policyId : this.productDetail.policyId,
                        allocationId : this.productDetail.allocationId,
                        price : this.productDetail.salePrice,
                        actPrice : this.productDetail.salePrice,
                        quantity : this.buyNum
                    }]),
                    orderVisitorProductVos : JSON.stringify(this.getTouristInfo()),
                    playDate : this.playDate,
                    saleRuleVos : JSON.stringify(this.getSaleRuleVos()),
                }).then(res => {
                    if (res.success && res.data) {
                        this.addTouristOrder();
                    } else if (res.code && res.code !== '300') {
                        this.$vux.toast.text(this.$t('errorMsg.' + res.code));
                    } else {
                        this.$vux.toast.text(this.$t('operateFail',{ msg : this.$t('createOrder') }));
                    }
                });
            },
            /**
             * 获取游客信息
             * @return {Array}
             */
            getTouristInfo () {
                let result = [];
                for (let i = 0,j = this.formData.length; i < j; i++) {
                    let baseInfo = {
                        phoneNumber : this.formData[i]['phone'],
                        visitorType : 'visitor',
                        visitorName : this.formData[i]['name'],
                    };
                    if (this.acceptIdType.length > 0) {
                        baseInfo['documentInfo'] = [{
                            data : this.formData[i]['idNum'],
                            type : this.formData[i]['idType'],
                        }];
                        baseInfo['productModels'] = [{
                            documentId : this.formData[i]['idNum'],
                            documentType : this.formData[i]['idType'],
                            originVisitDate : this.playDate,
                            productId : this.productDetail.productId,
                            productName : this.productDetail.productName,
                            quantity : this.productPolicy.needId === 'one' ? 1 : this.buyNum,
                            allocationId : this.productDetail.allocationId,
                        }];
                    } else {
                        baseInfo['documentInfo'] = [];
                        baseInfo['productModels'] = [{
                            originVisitDate : this.playDate,
                            productId : this.productDetail.productId,
                            productName : this.productDetail.productName,
                            quantity : this.productPolicy.needId === 'one' ? 1 : this.buyNum,
                            allocationId : this.productDetail.allocationId,
                        }];
                    }
                    result.push(baseInfo);
                }
                //游客信息大于0，添加第一个作为下单人
                if (result.length > 0) {
                    result.push({
                        ...result[0],
                        visitorType : 'payer'
                    });
                }
                return result;
            },
            /**
             * 获取销售规则
             * @return {Array}
             */
            getSaleRuleVos () {
                let result = [];
                for (let i = 0,j = this.formData.length; i < j; i++) {
                    result.push({
                        productId : this.productDetail.productId,
                        documentType : this.formData[i]['idType'],
                        documentId : this.formData[i]['idNum'],
                        mobile : this.formData[i]['phone'],
                        productName : this.productDetail.productName,
                        visitorName : this.formData[i]['name'],
                        count : this.productPolicy.needId === 'one' ? 1 : this.buyNum
                    });
                }
                return result;
            },
            /**
             * 新增订单
             */
            addTouristOrder () {
                localStorage.setItem('create-order-detail',JSON.stringify({
                    productInfos : JSON.stringify([{
                        productId : this.productDetail.productId,
                        policyId : this.productDetail.policyId,
                        allocationId : this.productDetail.allocationId,
                        price : this.productDetail.salePrice,
                        actPrice : this.productDetail.salePrice,
                        quantity : this.buyNum
                    }]),
                    orderVisitorProductVos : JSON.stringify(this.getTouristInfo()),
                    playDate : this.playDate,
                    saleRuleVos : JSON.stringify(this.getSaleRuleVos()),
                    orderAmount : this.totalAmount,
                    orderChannel : 'market',
                    marketUserId : this.marketUserId,
                    latitude : this.marketLatitude,
                    longitude : this.marketLongitude,
                }));
                let routeName = '';
                //区分游客下单和销售用户下单
                if (this.$route.name === 'salesManCreateOrder') {
                    routeName = 'salesManCreateOrderToPay';
                } else {
                    routeName = 'marketingCreateOrderToPay';
                }
                this.$router.replace({
                    name : routeName,
                    params : {
                        productName : this.productDetail.productName,
                        totalAmount : this.totalAmount,
                        supportCollect : this.productDetail.supportCollect
                    }
                });
            },
            /**
             * 校验订单是否符合订票规则
             */
            checkExtProductSaleRule () {
                ajax.postWithoutToken('market_checkExtProductSaleRule',{
                    productSaleVo : JSON.stringify(this.formData.map(item => {
                        if (this.acceptIdType.length > 0) {
                            return {
                                productId : this.productDetail.productId,
                                productName : this.productDetail.productName,
                                mobile : item.phone,
                                visitorName : item.name,
                                documentType : item.idType,
                                documentId : item.idNum,
                                count : this.productPolicy.needId === 'one' ? 1 : this.buyNum,
                            };
                        } else {
                            return {
                                productId : this.productDetail.productId,
                                productName : this.productDetail.productName,
                                mobile : item.phone,
                                visitorName : item.name,
                                count : this.productPolicy.needId === 'one' ? 1 : this.buyNum,
                            };
                        }
                    }))
                }).then(res => {
                    if (res.success) {
                        if (res.data && res.data.length > 0) {
                            this.errorTouristInfo = res.data;
                            this.showErrorToast = true;
                        } else {
                            this.validateOrderIsRight();
                        }
                    } else {
                        this.$vux.toast.text(this.$t('operateFail',{ msg : this.$t('createOrder') }));
                    }
                });
            }
        },
        computed : {
            ...mapGetters({
                marketUserId : 'marketUserId',
                marketLongitude : 'marketLongitude',
                marketLatitude : 'marketLatitude',
            }),
            //产品不可退
            cannotReturn () {
                if (this.productDetail && this.productDetail.returnRuleModel) {
                    return this.productDetail.returnRuleModel.type === 'notAllow';
                }
                return false;
            },
            //产品不可改签
            cannotAlter () {
                if (this.productDetail && this.productDetail.alterRuleModel) {
                    return this.productDetail.alterRuleModel.type === 'notAllow';
                }
                return false;
            },
            //支付总额
            totalAmount () {
                return this.buyNum * (this.productDetail ? this.productDetail.salePrice : 0);
            },
            //支持的证件类型
            acceptIdType () {
                if (this.productPolicy && this.productPolicy.needId === 'noRequired') {
                    return [];
                } else {
                    if (this.productPolicy && this.productPolicy.acceptIdType) {
                        return this.productPolicy.acceptIdType.split(',').map(item => {
                            return {
                                key : item,
                                value : this.$t(item),
                            };
                        });
                    } else {
                        return [];
                    }
                }
            },
            //最大选择的产品数量
            maxChoosed () {
                if (this.productPolicy && this.productPolicy.maxNum !== null && this.productPolicy.maxNum !== '' ) {
                    return Number(this.productPolicy.maxNum);
                } else {
                    return 9999;
                }
            },
            //最小选择的产品数量
            minChoosed () {
                if (this.productPolicy && this.productPolicy.minNum) {
                    return Number(this.productPolicy.minNum);
                } else {
                    return 1;
                }
            },
            //显示的产品销售政策
            saleRuleDesc () {
                if (this.productPolicy && Object.keys(this.productPolicy).length > 0) {
                    if (this.productPolicy && this.productPolicy.needId === 'one') {
                        return this.$t(`scenicBuyTicketRule1`);
                    } else if (this.productPolicy && this.productPolicy.needId === 'more') {
                        let idLimit = {};
                        try {
                            idLimit = JSON.parse(this.productPolicy.idLimit);
                        } catch (e) {
                            idLimit = {};
                        }
                        return this.$t(`scenicBuyTicketRule2`,{ num : idLimit.quantity });
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            }
        },
        watch : {
            //监视购买数量判断需要添加几个证件
            buyNum (newVal,oldVal) {
                if (common.isNotEmpty(newVal)) {
                    if (this.productPolicy && this.productPolicy.needId === 'one') {
                        if (newVal > oldVal) {
                            this.formData.push({
                                name : '',
                                phone : '',
                                //证件类型
                                idType : '',
                                //证件号
                                idNum : ''
                            });
                        } else {
                            this.formData.pop();
                        }
                    }
                }
            }
        }
    };
</SCRIPT>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .create-order{
        @include block_outline();
        overflow: hidden;
        background: #f2f3f4;

        .order-title{
            @include block_outline($height : 68px);
            padding: 8px 14px;
            background: $color_fff;

            .order-info{
                @include block_outline($height : 27px);
                padding: 3.5px 0;
                display: flex;
                flex-direction: row;
                line-height: 20px;

                .order-name{
                    flex: 1;
                    @include overflow_tip();
                    padding-right: 10px;
                }

                .notice{
                    font-size: $font_size_12px;
                    color: #0073EB;
                }
            }

            .label-input{
                @include block_outline($height : 25px);
                padding: 2.5px 0;

                .label-list{
                    font-size: $font_size_11px;
                    display: inline-block;
                    border: 1px solid #EB6751;
                    padding: 1px 5px;
                    margin: 0;
                    line-height: 15px;
                    border-radius: 4px;
                    color: #EB6751;
                }
            }
        }

        .content{
            @include block_outline($height : unquote('calc(100% - 112px)'));
            overflow: auto;

            .group-wrap{
                margin-top: 8px;
            }
        }

        .btn-wrap{
            @include absolute_pos(fixed,$bottom : 0);
            @include block_outline($height : 44px);
            border-top: 0.5px solid #E1E1E1;
            background: $color_fff;
            display: flex;
            flex-direction: row;
            padding-left: 14px;
            line-height: 44px;

            .total-amount{
                flex: 1;
                font-size: $font_size_12px;
                color: #303030;

                .money{
                    color: #F17E40;
                }
            }

            .create-btn{
                padding: 0 37px;
                font-size: $font_size_16px;
                text-align: center;
                background: #F17E40;
                color: $color_fff;
            }
        }

        /deep/ .weui-cell{
            height: 50px;
        }

        /deep/ .vux-number-selector{
            height: 28px!important;
        }

        /deep/ .vux-number-input{
            font-size: 17px;
        }

        /dee/ .vux-number-selector-plus{
            margin-right: 0!important;
        }

        .tip-hr{
            padding: 8px 10px 0 15px;
            font-size: 13px;
        }
    }
</style>
