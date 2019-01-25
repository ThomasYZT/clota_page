<!--
内容：产品列表 - 票类列表 - 编辑/新增
作者：
日期：
-->
<template>
    <div class="edit-ticket">
        <!-- 面包屑导航 -->
        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="localeRouter">
        </bread-crumb-head>

        <div class="container">
            <!-- 基本信息表单 -->
            <baseInfo ref="baseInfo"
                      :standardPrice.sync="standardPrice"></baseInfo>
            <!-- 票面信息表单 -->
            <ticketInfo ref="ticketInfo"
                        :standardPrice="standardPrice"></ticketInfo>
            <!-- 购买限制表单 -->
            <buyLimit ref="buyLimit"
                      :productEffSetEnable.sync="productEffSetEnable"></buyLimit>
            <!-- 产品有效性表单 -->
            <productEffect ref="productEffect"
                           :productEffSetEnable="productEffSetEnable"></productEffect>
            <!-- 游玩规则 -->
            <playRule ref="playRule"
                      :formData="formData"
                      :parkList="parkList"
                      :parkListCount="parkListCount"></playRule>
            <!--底部操作-->
            <div class="footer">
                <!--新增按钮-->
                <template v-if="type === 'add' && canApplyAuditProduct">
                    <Button type="primary"
                            :loading="loading"
                            @click="formValidateFunc"> <!--提交审核-->
                            {{$t('commitCheck')}}
                    </Button>
                    <Button type="ghost"
                            @click="goBack"><!--放弃新增-->
                            {{$t("giveUpAdd")}}
                    </Button>
                </template>
                <!--修改按钮-->
                <template v-if="type === 'modify'">
                    <Button type="primary"
                            :loading="loading"
                            @click="formValidateFunc">
                        {{$t('save')}}
                    </Button>
                    <Button type="ghost"
                            @click="goBack"><!--放弃修改-->
                        {{$t("giveUpModify")}}
                    </Button>
                </template>
            </div>
        </div>

    </div>
</template>

<script>
    import baseInfo from './child/baseInfo';
    import ticketInfo from './child/ticketInfo';
    import buyLimit from './child/buyLimit';
    import productEffect from './child/productEffect';
    import playRule from './child/playRule';
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import defaultsDeep from 'lodash/defaultsDeep';
    import pick from 'lodash/pick';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            baseInfo,
            ticketInfo,
            buyLimit,
            productEffect,
            playRule
        },
        data () {
            return {
                //面包屑上级路由信息
                beforeRouterList : [
                    {
                        name : 'ticketType', // 产品列表--票类列表
                        router : 'ticketType',
                    }
                ],
                //新增、修改
                type : 'add',
                //是否处于加载状态
                loading : false,
                //景区成本价
                standardPrice : '',
                //产品有效性是否可设置
                productEffSetEnable : false,
                //可游玩园区列表数据
                parkList : [],
                //可游玩园区列表总数
                parkListCount : 0,
                //表单数据
                formData : {},
                //可游玩景区数据
                productPlayRuleVo : [],
            };
        },
        methods : {
            /**
             *  表单校验
             */
            formValidateFunc () {
                Promise.all([
                    this.$refs.baseInfo.formValidate(),
                    this.$refs.ticketInfo.formValidate(),
                    this.$refs.buyLimit.formValidate(),
                    this.$refs.productEffect.formValidate(),
                    //校验游玩规则-产品园区列表数据
                    this.$refs.playRule.formValidate(),
                ]).then((formData) => {
                    formData.forEach((item) => {
                        if (Array.isArray(item)) {
                            this.productPlayRuleVo = item;
                        } else {
                            this.formData = defaultsDeep(this.formData, item);
                        }
                    });
                    //处理表单数据
                    this.formDataProcessing();
                }).catch((err) => {
                    console.log(err);
                    if (err === 'playParkNull') {
                        //可游玩园区数组为空
                        this.$Message.warning(this.$t('selectField',{ msg : this.$t('playPark') }));
                    } else if (err === 'AvailableNumberOfDays') {
                        //游玩景区游玩次数限制必填
                        this.$Message.warning(this.$t('inputField', { feild : this.$t('AvailableNumberOfDays') }));
                    }
                });
            },
            /**
             *  表单数据处理
             */
            formDataProcessing () {
                let rule = [];
                this.productPlayRuleVo.forEach((item) => {
                    let obj = defaultsDeep({},item);
                    if (item.saleType === 'one_ticket') {
                        obj.playPoint = [];
                    }
                    rule.push(obj);
                });
                //启用状态票修改完进入审核中状态
                if (this.type === 'modify' && this.formData.auditStatus === 'enabled') {
                    this.formData.auditStatus = 'auditing';
                }
                let params = {
                    //产品
                    productJson : JSON.stringify({
                        auditStatus : this.formData.auditStatus || '',
                        code : this.formData.code || '',
                        productDes : this.formData.productDes || '',
                        id : this.formData.id || '',
                        inNum : this.formData.inNum || '',
                        isGroup : this.formData.isGroup || '',
                        printName : this.formData.printName || '',
                        printPrice : this.formData.printPrice || '',
                        printRemark : this.formData.printRemark || '',
                        printTpl : this.formData.printTpl || '',
                        productName : this.formData.productName || '',
                        productType : this.formData.productType || '',
                        standardPrice : this.formData.standardPrice || '',
                        thirdCode : this.formData.thirdCode || '',
                        ticketRemark : this.formData.ticketRemark || '',
                        productEffSet : this.formData.productEffSet || '',
                    }),
                    //销售
                    saleRuleJson : JSON.stringify({
                        acceptIdType : this.formData.acceptIdType.length > 0 ? this.formData.acceptIdType.join(',') : '',
                        id : this.formData.saleId || '',
                        idLimit : JSON.stringify({
                            day : this.formData.limitByIdDay || '',
                            quantity : this.formData.limitByIdNum || '',
                        }),
                        mobileLimit : JSON.stringify({
                            day : this.formData.limitByMobileDay || '',
                            quantity : this.formData.limitByMobileNum || '',
                        }),
                        minNum : this.formData.minNum || '',
                        maxNum : this.formData.maxNum || '',
                        needAllId : '',
                        needId : this.formData.needId || '',
                        productId : this.formData.productId || '',
                        //stockNum : this.formData.stockNum || '',
                        //stockType : this.formData.stockType || '',
                    }),
                    //游玩
                    playRuleJson : JSON.stringify(rule),
                };
                //区分新增与修改
                if ( this.type === 'add' ) {
                    this.saveAndEditTicket( 'addProduct', params);
                }
                if ( this.type === 'modify' ) {
                    this.saveAndEditTicket( 'updateProduct', params);
                }
            },
            /**
             *  新增/修改票类
             */
            saveAndEditTicket ( url, params ) {
                ajax.post(url, params).then(res => {
                    if (res.success) {
                        //区分新增与修改
                        this.$Message.success(this.$t('successTip',{ tip : this.$t(this.type) }));
                        this.goBack();
                    } else {
                        //区分新增与修改
                        this.$Message.error(res.message || this.$t('failureTip',{ tip : this.$t(this.type) }));
                    }
                });
            },
            /**
             *  返回
             */
            goBack () {
                //区分新增与修改
                if ( this.type === 'add' ) {
                    this.$router.push({ name : 'ticketType' });
                }
                if ( this.type === 'modify' ) {
                    this.$router.back();
                }
            },
            /**
             * 获取路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.type = params.type;
                    if (params.info) {
                        this.initEditData(params.info);
                    }
                    if (params.productPlayRuleVo) {
                        this.productPlayRuleVo = defaultsDeep([], params.productPlayRuleVo);
                        this.$refs.playRule.initData(this.productPlayRuleVo);
                    }
                }
                this.queryScenicOrgByAccountRole();
            },
            /**
             * 初始化产品编辑信息
             * @param data
             */
            initEditData (data) {
                //基本信息表单初始化
                let baseInfoForm = pick(data, ['productName', 'standardPrice', 'thirdCode', 'productDes']);
                baseInfoForm.printPrice = String(data.printPrice);
                baseInfoForm.standardPrice = String(data.standardPrice);
                //票面信息表单初始化
                let ticketInfoForm = pick(data, ['printName', 'printPrice', 'ticketRemark', 'printRemark']);
                //购买限制表单初始化
                let buyLimitForm = pick(data, ['isGroup', 'inNum', 'minNum', 'maxNum', 'needId', 'acceptIdType',
                    'limitByIdDay', 'limitByIdNum', 'limitByMobileDay', 'limitByMobileNum']);
                buyLimitForm.limitByIdDay = data.idLimit ? JSON.parse(data.idLimit).day : '';
                buyLimitForm.limitByIdNum = data.idLimit ? JSON.parse(data.idLimit).quantity : '';
                buyLimitForm.limitByMobileDay = data.mobileLimit ? JSON.parse(data.mobileLimit).day : '';
                buyLimitForm.limitByMobileNum = data.mobileLimit ? JSON.parse(data.mobileLimit).quantity : '';
                buyLimitForm.limitByMobileNum = data.mobileLimit ? JSON.parse(data.mobileLimit).quantity : '';
                buyLimitForm.acceptIdType = data.acceptIdType ? data.acceptIdType.split(',') : [];
                //产品有效性表单初始化
                let effectForm = pick(data, ['productEffSet']);

                let commonData = {};
                commonData.id = String(data.id);
                commonData.saleId = String(data.saleId);
                this.formData = defaultsDeep({}, commonData, baseInfoForm, ticketInfoForm, effectForm);
                this.$refs.baseInfo.initData(baseInfoForm);
                this.$refs.ticketInfo.initData(ticketInfoForm);
                this.$refs.buyLimit.initData(buyLimitForm);
                this.$refs.productEffect.initData(effectForm);
            },
            /**
             * 查询权限下的园区
             */
            queryScenicOrgByAccountRole () {
                ajax.post('queryScenicOrgByAccountRole', {
                    privCode : '"addProduct"',
                }).then(res => {
                    if (res.success) {
                        this.parkList = res.data || [];
                        this.parkListCount = res.data.length || 0;
                    } else {
                        this.parkList = [];
                        this.parkListCount = 0;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
        },
        computed : {
            ...mapGetters([
                'permissionInfo',
            ]),
            //当前路由
            localeRouter () {
                return this.type === 'add' ? this.$t('addTicket') : this.$t('editDetail');
            },
            //是否可以提交审核信息
            canApplyAuditProduct () {
                return this.permissionInfo && 'addProduct' in this.permissionInfo;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-ticket {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        .container{

            .ivu-form{
                padding: 10px 0 20px;
                text-align: center;
            }

            /deep/ .error-tr{
                background: $color_EB6751_005;
            }

            .footer{
                text-align: center;

                /deep/ .ivu-btn{
                    min-width: 108px;
                    &:nth-child(1){
                        margin-right: 20px;
                    }
                }

            }

        }

    }

</style>
