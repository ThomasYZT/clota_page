<!--选择支付方式并支付-->

<template>
    <div class="pay-order">
        <div class="product-info">
            <div class="product-name">{{productName | contentFilter}}</div>
            <div class="pay-money">
                <span class="pay-label">{{$t('colonSetting',{ key : $t('amountToPay') })}}</span>
                <span class="money">{{totalAmount | moneyFilter(2,'￥') | contentFilter}}</span>
            </div>
        </div>
        <div class="pay-type-select">
            <div class="title">{{$t('chosePayType')}}</div>
            <div class="type-list">
                <group >
                    <radio
                        v-model="payType"
                        title=""
                        :options="payTypeListDeal"
                        @on-change="rechageTypechange">
                    </radio>
                </group>
            </div>
        </div>
        <div class="btn-area">
            <x-button @click.native="recharge"
                      v-if="payType !== 'collect'"
                      :disabled="payTypeListDeal.length < 1">
                {{$t('toPay')}}
            </x-button>
            <x-button @click.native="recharge"
                      v-else
                      :disabled="payTypeListDeal.length < 1">
                {{$t('confirm')}}
            </x-button>
        </div>
    </div>
</template>

<script>
    import ajax from '@/marketing/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //支付方式列表
                payTypeList : [],
                //选择的支付方式
                payType : '',
                //产品名称
                productName : '',
                //应付总额
                totalAmount : '',
                payFormData : {},
                //产品是否支持到付
                supportCollect : ''
            };
        },
        methods : {
            /**
             * 支付
             */
            recharge () {
                if (this.isWeixin && this.payType === 'wx') {
                    let paymentChannel = this.payTypeList.find(item => item.key === 'ali')['payType'];
                    if (paymentChannel === 'zhilian') {
                        this.getPayPageForMobile('market_getPayPageForMobileNoLogin');
                    } else {
                        //在微信中调用微信支付--银石支付
                        this.getPayPageForOfficialAccount();
                    }
                } else if (this.payType === 'collect') {//到付直接下单
                    this.payFormData.paymentTypeId = this.payType;
                    //根据路由名称判断下单角色
                    if (this.$route.name === 'salesManCreateOrderToPay') {
                        this.payFormData.from = 'marketer';
                    } else {
                        this.payFormData.from = 'visitor';
                    }
                    localStorage.setItem('payFormData', JSON.stringify(this.payFormData));
                    this.$router.replace({
                        name : 'salesManCreateOrderPayResult',
                        params : {
                            payType : 'collect'
                        }
                    });
                } else {
                    this.getPayPageForMobile('market_getPayPageForMobileNoLogin');
                }
            },
            /**
             * 获取所有支付方式
             */
            queryAllPayType () {
                ajax.postWithoutToken('market_queryExtOnlineAccount',{
                    isPlatformAcc : false,
                    orgId : this.marketOrgId
                }).then(res => {
                    if (res.success) {
                        this.payTypeList = [];
                        if (res.data && res.data.length > 0) {
                            for (let i = 0,j = res.data.length; i < j; i++) {
                                if (res.data[i]['useStatus'] === 'not_enabled') return;
                                if (res.data[i]['accountType'] === 'weixin') {
                                    this.payTypeList.unshift({
                                        icon : require('../../../../assets/images/icon-wx-pay.svg'),
                                        key : 'wx',
                                        value : this.$t('wxPay'),
                                        param : res.data[i],
                                        payType : res.data[i].paymentChannel === 'wxorali' ? 'zhilian' : 'yinshi'
                                    });
                                } else {
                                    this.payTypeList.push({
                                        icon : require('../../../../assets/images/icon-ali-pay.svg'),
                                        key : 'ali',
                                        value : this.$t('aliPay'),
                                        param : res.data[i],
                                        payType : res.data[i].paymentChannel === 'wxorali' ? 'zhilian' : 'yinshi'
                                    });
                                }
                            }
                        }
                        if (this.payTypeList.length > 0) {//选择第一个作为支付渠道
                            this.payType = this.payTypeList[0].key;
                        } else if (this.$route.name === 'salesManCreateOrderToPay' && this.supportCollect === 'true') {//支持到付
                            this.payType = 'collect';
                        }
                    } else {
                        this.payTypeList = [];
                    }
                });
            },
            /**
             * 选择的支付方式改变
             * @param{String} payType 更改后的支付方式的key
             */
            rechageTypechange (payType) {
                this.payType = this.payTypeList.find(item => {
                    return item.key === payType;
                });
            },
            /**
             * 获取路由参数
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.productName = params.productName;
                    this.totalAmount = params.totalAmount;
                    this.supportCollect = params.supportCollect;
                } else {
                    this.$router.replace({
                        name : 'marketingTourist'
                    });
                }
            },
            /**
             * 在微信中调用微信支付
             */
            getPayPageForOfficialAccount () {
                let createOrderParams = localStorage.getItem('create-order-detail') ? JSON.parse(localStorage.getItem('create-order-detail')) : {};
                let paymentChannel = this.payTypeList.find(item => item.key === 'ali')['payType'];
                ajax.postWithoutToken('market_getPayPageForOfficialAccount', {
                    bizScene : 'order',
                    bizType : 'pay_order',
                    channelType : 'weixin',
                    txnAmt : this.totalAmount,
                    redirectUrl : this.getRedirectUrl(paymentChannel),
                    orgId : this.marketOrgId,
                    paymentChannel : paymentChannel,
                    ...createOrderParams
                }).then(res => {
                    this.payFormData = {};
                    if (res.success) {
                        //设置支付表单信息
                        this.payFormData = res.data ? res.data : {};
                        this.payFormData.paymentTypeId = this.payType;
                        if (this.$route.name === 'salesManCreateOrderToPay') {
                            this.payFormData.from = 'marketer';
                        } else {
                            this.payFormData.from = 'visitor';
                        }
                        localStorage.setItem('payFormData', JSON.stringify(this.payFormData));
                        location.href = location.origin + this.$router.options.base + '/marketing/tourist/createOrder/startPay?payFormData=' + encodeURI(this.payFormData);
                    } else if (res.code === '300') {
                        this.$vux.toast.text(this.$t('payAbnormal'));
                    }
                });
            },
            /**
             * 获取支付回调地址
             * @param{String} paymentChannel 支付类型（'直连或银石支付'）
             * @return{String} 回调地址加密
             */
            getRedirectUrl (paymentChannel) {
                let userType = '';
                if (this.$route.name === 'salesManCreateOrderToPay') {
                    userType = 'marketer';
                } else {
                    userType = 'visitor';
                }
                if (paymentChannel === 'zhilian') {
                    const { href } = this.$router.resolve({
                        name : 'wxOrAlidirectPay',
                        query : {
                            userType
                        }
                    });
                    return encodeURI(location.origin + href);
                } else {
                    const { href } = this.$router.resolve({
                        name : 'marketingCreateOrderPayResult',
                        query : {
                            userType
                        }
                    });
                    return encodeURI(location.origin + href);
                }
            },
            /**
             * 获取手机网页支付信息
             * @param{String} urlKey apikey
             */
            getPayPageForMobile (urlKey) {
                let createOrderParams = localStorage.getItem('create-order-detail') ? JSON.parse(localStorage.getItem('create-order-detail')) : {};
                let paymentChannel = this.payTypeList.find(item => item.key === 'ali')['payType'];
                ajax.postWithoutToken(urlKey, {
                    bizScene : 'order',
                    bizType : 'pay_order',
                    channelType : this.payType === 'wx' ? 'weixin' : 'alipay',
                    txnAmt : this.totalAmount,
                    redirectUrl : this.getRedirectUrl(paymentChannel),
                    orgId : this.marketOrgId,
                    paymentChannel : paymentChannel,
                    ...createOrderParams
                }).then(res => {
                    this.payFormData = {};
                    if (res.success && res.data) {
                        if (paymentChannel === 'zhilian') {
                            if (this.payType === 'wx') {//直连微信支付
                                if (res.data.formContent) {
                                    try {
                                        let formContent = JSON.parse(res.data.formContent);
                                        location.href = formContent.mwebUrl;
                                    } catch (err) {
                                        this.$vux.toast.text(this.$t('payAbnormal'));
                                    }
                                } else {
                                    this.$vux.toast.text(this.$t('payAbnormal'));
                                }
                            } else {//直连支付宝支付
                                if (this.isWeixin) {
                                    const { href } = this.$router.resolve({
                                        name : 'wxOrAlidirectPay'
                                    });
                                    const divEle = document.createElement('div');
                                    let userType = '';
                                    divEle.innerHTML = res.data.formContent;
                                    this.$el.appendChild(divEle);
                                    const formEle = this.$el.querySelector('form[name=punchout_form]');
                                    let queryParam = formEle.getAttribute('action').split('?')[1];
                                    Array.prototype.slice.call(formEle.querySelectorAll("input[type=hidden]")).forEach(function (ele) {
                                        queryParam += '&' + ele.name + "=" + encodeURIComponent(ele.value);
                                    });
                                    if (this.$route.name === 'salesManCreateOrderToPay') {
                                        userType = 'marketer';
                                    } else {
                                        userType = 'visitor';
                                    }
                                    location.href = location.origin + href + '?' + queryParam + '&transactionId=' + res.data.transactionId + '&fromzl=true&userType=' + userType;
                                } else {
                                    this.$router.push({
                                        name : 'wxOrAlidirectPay',
                                        params : {
                                            payType : this.payType,
                                            formContent : res.data.formContent
                                        }
                                    });
                                }
                            }
                        } else {
                            this.payFormData = res.data ? res.data : {};
                            this.payFormData.orderId = res.data ? res.data.bizId : '';
                            this.payFormData.paymentChannel = paymentChannel;
                            //根据路由名称判断下单角色
                            if (this.$route.name === 'salesManCreateOrderToPay') {
                                this.payFormData.from = 'marketer';
                            } else {
                                this.payFormData.from = 'visitor';
                            }
                            //设置支付表单信息
                            localStorage.setItem('payFormData', JSON.stringify(this.payFormData));
                            location.href = location.origin + this.$router.options.base + '/marketing/tourist/createOrder/startPay' +
                                '?paymentTypeId=' + this.payType +
                                '&amount=' + this.payFormData.txnAmt +
                                '&txnType=' + this.payFormData.txnType +
                                '&partnerId=' + this.payFormData.partnerId +
                                '&channelId=' + this.payFormData.channelId +
                                '&merchantTxnNo=' + this.payFormData.merchantTxnNo +
                                '&merchantId=' + this.payFormData.merchantId +
                                '&txnAmt=' + this.payFormData.txnAmt +
                                '&redirectUrl=' + this.payFormData.redirectUrl +
                                '&txnShortDesc=' + this.payFormData.txnShortDesc +
                                '&sign=' + this.payFormData.sign +
                                '&currencyCode=' + this.payFormData.currencyCode +
                                '&notifyUrl=' + escape(this.payFormData.notifyUrl) +
                                '&payWebUrl=' + escape(this.payFormData.payWebUrl) +
                                '&transactionId=' + this.payFormData.transactionId +
                                '&userType=' + this.payFormData.from;
                        }
                    } else if (res.code === '300') {
                        this.$vux.toast.text(this.$t('payAbnormal'));
                    }
                });
            },
        },
        created () {
            this.queryAllPayType();
        },
        computed : {
            ...mapGetters({
                marketOrgId : 'marketOrgId',
                isWeixin : 'isWeixin',
            }),
            //根据从哪个页面过来的请求，分别获取支付方式
            payTypeListDeal () {
                if (this.$route.name === 'salesManCreateOrderToPay' && this.supportCollect === 'true') {
                    return [].concat(this.payTypeList,[{
                        icon : require('../../../../assets/images/icon-offline-pay.svg'),
                        key : 'collect',
                        value : this.$t('offlinePayment'),
                        param : {}
                    }]);
                } else {
                    return this.payTypeList;
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .pay-order{
        @include block_outline();
        background: #f2f3f4;
        overflow: auto;

        .product-info{
            @include block_outline($height : 75px);
            padding: 9.5px 14px;
            background: $color_fff;

            .product-name{
                @include block_outline($height : 28px);
                font-size: $font_size_14px;
                color: $color_333;
                @include overflow_tip();
                line-height: 28px;
            }

            .pay-money{
                @include block_outline($height : 27px);
                line-height: 27px;

                .pay-label{
                    font-size: $font_size_11px;
                    color: $color_333;
                }

                .money{
                    font-size: $font_size_16px;
                    color: #F15B40;
                }
            }
        }

        .pay-type-select{
            margin-top: 9px;
            background: $color_fff;

            .title{
                @include block_outline($height : 40px);
                line-height: 40px;
                padding: 0 14px;
                font-size: $font_size_15px;
                color: #353B48;
                border-bottom: 0.5px solid #E8E8E8;
            }

            .type-list{
                padding: 15px 0;

                /deep/ .vux-radio-icon{
                    display: inline-block;
                    @include block_outline(18px,18px);
                }

                /deep/ .weui-cells{
                    &::after,
                    &::before{
                        display: none;
                    }
                }

                /deep/ .weui-cell:before{
                    display: none;
                }

                /deep/ .weui-check__label{
                    height: 40px!important;
                }
            }
        }

        .btn-area{
            @include block_outline(unquote('calc(100% - 55px)'),42px);
            margin: 33px auto 0;

            /deep/ .weui-btn_default{
                background: $color_0073EB;
                font-size: 17px;
                color: $color_fff;
                border-radius: 100px;
                letter-spacing: 2px;

                &[disabled='disabled']{
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    color: rgba(0, 0, 0, 0.2);
                    background: $color_fff;
                }
            }
        }
    }
</style>
