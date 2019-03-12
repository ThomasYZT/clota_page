<!--账户充值-->

<template>
    <div class="account-recharege">
        <div class="recharge-title">
            <x-input title="¥"
                     ref="money"
                     v-model="rechargeMoney"
                     :show-clear="false"
                     label-width="20px"
                     :debounce="500"
                     @on-change="getTrueMoney">
            </x-input>
            <div class="actual-money">
                <span class="label">{{$t('actualToAccount')}}</span>
                <span class="account">{{actualMoney | moneyFilter | contentFilter}}{{accountDefineId !== '1' ? $t(unit) : $t('yuan')}}</span>
                <span class="other-data">{{$t('includeDonate',{num : donateMoney + ' ' + (accountDefineId !== '1' ? $t(unit) : $t('yuan'))})}}</span>
            </div>
        </div>
        <div class="pay-type-chose">
            <div class="type-title">{{$t('chosePayType')}}</div>
            <div class="type-list">
                <group title="default">
                    <radio
                        v-model="payType"
                        title=""
                        :options="commonList"
                        @on-change="rechageTypechange">
                    </radio>
                </group>
            </div>

        </div>
        <div class="btn-area">
            <x-button @click.native="recharge"
                      :disabled="commonList.length < 1 || cardInfo.status === 'frozen'">
                {{$t('recharge')}}
            </x-button>
        </div>

    </div>
</template>

<script>
    import ajax from '@/member/api/index.js';
    import lifeCycle from '@/mixins/lifeCycleMixins.js';
    import common from '@/assets/js/common';
    import { mapGetters } from 'vuex';
    export default {
        mixins : [lifeCycle],
        data () {
            return {
                //可选中支付方式
                commonList : [],
                //支付方式
                payType : '',
                //实际到账金额
                actualMoney : '',
                //充值金额
                rechargeMoney : '',
                //账户类型id
                accountTypeId : '',
                //赠送金额
                donateMoney : 0,
                //账户名称
                accountTypeName : '',
                //支付接口参数对象
                payFormData : {},
                //选择的支付方式
                chosedAccount : {},
                //账户单位
                unit : '',
                //账户id
                accountDefineId : ''
            };
        },
        computed : {
            ...mapGetters([
                'userInfo',
                'cardInfo',
                'lang'
            ]),
            //是否设置交易密码
            hasTradePassword () {
                return this.cardInfo.hasTradePassword === 'true';
            }
        },
        methods : {
            /**
             * 获取实际到账金额
             */
            getTrueMoney () {
                this.validateRechargeMoney().then(()=>{
                    ajax.post('getRechargeActMoney',{
                        accountTypeId : this.accountTypeId,
                        amount : this.rechargeMoney,
                        cardId : this.cardInfo.id
                    }).then(res => {
                        if (res.success) {
                            this.actualMoney = res.data ? res.data.actMoney : '';
                            this.donateMoney = res.data ? res.data.gift : '';
                        } else {
                            this.actualMoney = '';
                            this.donateMoney = '';
                        }
                    });
                }).catch(() => {
                    this.actualMoney = '';
                    this.donateMoney = '';
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.accountTypeId = params.accountTypeId;
                    this.accountTypeName = params.accountName;
                    this.accounId = params.accounId;
                    this.unit = params.unit;
                    this.accountDefineId = params.accountDefineId;
                    this.setTitle();
                    this.queryOnlinePayAccount();
                } else {
                    this.$router.push({
                        name : 'account'
                    });
                }
            },
            /**
             * 充值类型改变
             * @param {*} data
             */
            rechageTypechange (data) {
                this.chosedAccount = this.commonList.find(item => {
                    return item.key === data;
                });
            },
            /**
             * 校验充值金额
             * @param showErrorInfo 是否显示错误信息
             */
            validateRechargeMoney (showErrorInfo) {
                return new Promise((resolve,reject) => {
                    common.validateMoney(this.rechargeMoney).then(() => {
                        resolve();
                    }).catch(err => {
                        if (showErrorInfo) {
                            if (err === 'errorMaxLength') {
                                this.$vux.toast.text(this.$t('errorMaxLength',{ field : this.$t('rechargeNum'),length : 10 }));
                            } else {
                                this.$vux.toast.text(this.$t(err,{ field : this.$t('rechargeNum') }));
                            }
                        }
                        reject();
                    });
                });
            },
            /**
             * 设置标题
             */
            setTitle () {
                document.title = this.$t('rechartAccount',{ 'account' : this.accountTypeName });
            },
            /**
             * 充值
             */
            recharge () {
                if (this.cardInfo.status === 'frozen') return;
                if (!this.hasTradePassword) {
                    this.$vux.toast.text(this.$t('pleaseSetTradePass'));
                    this.$router.push({
                        name : 'changeTradePass',
                        params : {
                            mobile : this.userInfo.phoneNum
                        }
                    });
                    return;
                }
                this.validateRechargeMoney(true).then(() => {
                    if (this.payType === 'wx' && this.isWeixin()) {
                        //微信内微信支付专用
                        this.getPayPageForOfficialAccount();
                    } else {
                        //微信内支付宝支付、微信外支付宝、微信支付
                        this.getPayPageForMobile();
                    }
                });
            },
            /**
             *  获取在线支付方式列表
             */
            queryOnlinePayAccount () {
                ajax.post('queryOnlinePayAccount',{
                    orgId : this.cardInfo.orgId
                }).then(res => {
                    this.commonList = [];
                    if (res.success && res.data) {
                        for (let i = 0,j = res.data.length; i < j; i++) {
                            if (res.data[i]['useStatus'] === 'not_enabled') return;
                            if (res.data[i]['accountType'] === 'weixin') {
                                this.commonList.unshift({
                                    icon : require('../../../../assets/images/icon-wx-pay.svg'),
                                    key : 'wx',
                                    value : this.$t('wxPay'),
                                    param : res.data[i],
                                    payType : res.data[i].paymentChannel === 'wxorali' ? 'zhilian' : 'yinshi'
                                });
                            } else {
                                this.commonList.push({
                                    icon : require('../../../../assets/images/icon-ali-pay.svg'),
                                    key : 'ali',
                                    value : this.$t('aliPay'),
                                    param : res.data[i],
                                    payType : res.data[i].paymentChannel === 'wxorali' ? 'zhilian' : 'yinshi'
                                });
                            }
                        }
                        this.chosedAccount = this.commonList.length > 0 ? this.commonList[0] : {};
                        this.payType = this.commonList.length > 0 ? this.commonList[0].key : '';
                    } else {
                        this.commonList = [];
                        this.chosedAccount = {};
                        this.payType = '';
                    }
                });
            },
            /**
             * 判断是否在微信浏览器
             */
            isWeixin () {
                let ua = navigator.userAgent.toLowerCase();
                let isWeixin = ua.indexOf('micromessenger') != -1;
                if (isWeixin) {
                    return true;
                } else {
                    return false;
                }
            },
            /**
             * 获取手机网页支付信息
             */
            getPayPageForMobile () {
                let paymentChannel = this.commonList.find(item => item.key === this.payType )['payType'];
                ajax.post('getPayPageForMobile', {
                    bizScene : 'member',
                    bizType : 'recharge',
                    bizId : this.cardInfo.id,
                    channelId : this.payType === 'wx' ? 'weixin' : 'alipay',
                    txnAmt : this.rechargeMoney,
                    memberLevelId : this.cardInfo.levelId,
                    redirectUrl : this.getRedirectUrl(paymentChannel),
                    paymentChannel : paymentChannel,
                    extData : JSON.stringify({
                        accountBizType : 'recharge',
                        accountTypeId : this.accountTypeId,
                        amount : this.rechargeMoney,
                        paymentType : 'weixin',
                        orgId : this.cardInfo.orgId,
                        cardId : this.cardInfo.id,
                        memberId : this.cardInfo.memberId,
                        operUserId : this.cardInfo.orgId
                    }),
                    orgId : this.cardInfo.orgId,
                }).then(res => {
                    if (res.success) {
                        this.payFormData = res.data ? res.data : {};
                        if (paymentChannel === 'zhilian') {
                            if (this.isWeixin) {
                                const { href } = this.$router.resolve({
                                    name : 'wOraDirectPay'
                                });
                                const divEle = document.createElement('div');
                                divEle.innerHTML = res.data.formContent;
                                this.$el.appendChild(divEle);
                                const formEle = this.$el.querySelector('form[name=punchout_form]');
                                let queryParam = formEle.getAttribute('action').split('?')[ 1 ];
                                Array.prototype.slice.call(formEle.querySelectorAll("input[type=hidden]")).forEach(function ( ele ) {
                                    queryParam += '&' + ele.name + "=" + encodeURIComponent(ele.value);
                                });
                                location.href = location.origin + href + '?' + queryParam + '&transactionId=' + res.data.transactionId + '&fromzl=true';
                            } else {
                                this.$router.push({
                                    name : 'wOraDirectPay',
                                    params : {
                                        payType : this.payType,
                                        formContent : res.data.formContent
                                    }
                                });
                            }
                        } else {
                            //设置支付表单信息
                            localStorage.setItem('payFormData', JSON.stringify(this.payFormData));
                            location.href = location.origin + this.$router.options.base + this.$router.options.routes.filter((item) => {
                                    return item.module === 'member';
                                })[0].path + '/h5Pay?memberId=' + this.userInfo.memberId +
                                '&cardId=' + this.cardInfo.id +
                                '&accounId=' + this.accounId +
                                '&paymentTypeId=' + this.payType +
                                '&accountTypeId=' + this.accountTypeId +
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
                                '&token=' + ajax.getToken();
                        }
                    } else {
                        this.payFormData = {};
                        this.$vux.toast.text(this.$t('payAbnormal'));
                    }
                });
            },
            /**
             * 微信内微信支付获取支付信息
             */
            getPayPageForOfficialAccount () {
                ajax.post('getPayPageForOfficialAccount', {
                    bizScene : 'member',
                    bizType : 'recharge',
                    bizId : this.cardInfo.id,
                    channelId : 'weixin',
                    txnAmt : this.rechargeMoney,
                    memberLevelId : this.cardInfo.levelId,
                    redirectUrl : this.getRedirectUrl(),
                    extData : JSON.stringify({
                        accountBizType : 'recharge',
                        accountTypeId : this.accountTypeId,
                        amount : this.rechargeMoney,
                        paymentType : 'weixin',
                        orgId : this.cardInfo.orgId,
                        cardId : this.cardInfo.id,
                        memberId : this.cardInfo.memberId,
                        operUserId : this.cardInfo.orgId
                    })
                }).then(res => {
                    if (res.success) {
                        //设置支付表单信息
                        this.payFormData = res.data ? res.data : {};
                        this.payFormData.memberId = this.userInfo.memberId;
                        this.payFormData.cardId = this.cardInfo.id;
                        this.payFormData.accounId = this.accounId;
                        this.payFormData.paymentTypeId = this.payType;
                        this.payFormData.accountTypeId = this.accountTypeId;
                        this.payFormData.remark = '';
                        this.payFormData.amount = this.payFormData.txnAmt;
                        localStorage.setItem('payFormData', JSON.stringify(this.payFormData));
                        // this.$router.push({
                        //     name : 'h5Pay',
                        //     query : {
                        //         payFormData : encodeURI(this.payFormData)
                        //     }
                        // });
                        location.href = location.origin + this.$router.options.base + this.$router.options.routes.filter((item) => {
                            return item.module === 'member';
                        })[0].path + '/h5Pay?payFormData=' + encodeURI(this.payFormData);
                    } else {
                        this.payFormData = {};
                        this.$vux.toast.text(this.$t('payAbnormal'));
                    }
                });
            },
            /**
             * 获取支付回调地址
             * @param{String} paymentChannel 支付方式
             */
            getRedirectUrl (paymentChannel) {
                if (paymentChannel === 'zhilian') {
                    const { href } = this.$router.resolve({
                        name : 'wOraDirectPay'
                    });
                    return encodeURI(location.origin + href);
                } else {
                    const { href } = this.$router.resolve({
                        name : 'payStatus'
                    });
                    return encodeURI(location.origin + href);
                }
                // if (paymentChannel === 'zhilian') {
                //
                // } else {
                //     let router = this.$router;
                //     let base = router.options.base;
                //     let module = this.$router.options.routes.filter((item) => {
                //         return item.module === 'member';
                //     })[0].path;
                //     return encodeURI(location.origin + base + module + '/payStatus');
                // }
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.$refs.money.focus();
            });
        },
        watch : {
            lang () {
                this.setTitle();
            }
         }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .account-recharege{
        @include block_outline();
        background: rgba(242,243,244,1);

        .recharge-title{
            padding-top: 20px;
            @include block_outline($height : 126px);
            background: $color_fff;

            /deep/ .vux-x-input{
                @include block_outline($height : 60px);
                border-bottom: 1px solid #e8e8e8;
            }

            /deep/ .weui-cell__hd{
                font-size: 25px;
                height: 100%;
                display: flex;
                align-items: center;
            }

            /deep/ .weui-cell__hd{
                font-size: $font_size_19px;
                color: $color_333;
            }

            /deep/ .weui-input{
                height: 35px;
                font-size: 28px;
                color: #353B48;
            }

            /deep/ .weui-cell__primary{
                height: 100%;

                input{
                    height: 100%;
                    display: block;
                    /*height: 35px;*/
                    padding: 0!important;
                }
            }

            .actual-money{
                @include block_outline($height : 45px);
                line-height: 45px;
                padding: 0 14px;
                display: flex;

                .label{
                    font-size: $font_size_13px;
                    color: #353B48;
                    white-space: nowrap;
                }

                .account{
                    font-size: $font_size_13px;
                    color: #F7981C;
                    margin: 0 5px;
                }

                .other-data{
                    font-size: $font_size_11px;
                    color: $color_999;
                    white-space: nowrap;
                }
            }
        }

        .pay-type-chose{
            background: $color_fff;
            margin-top: 8px;

            .type-title{
                @include block_outline($height : 40px);
                line-height: 40px;
                font-size: $font_size_15px;
                padding-left: 14px;
                border-bottom: 1px solid #e8e8e8;
                color: #353B48;
            }

            .type-list{
                padding: 15px 0;

                /deep/ .vux-radio-icon{
                    display: inline-block;
                    @include block_outline(18px,18px);
                }
            }

            /deep/ .weui-cells__title{
                display: none;
            }

            /deep/ .weui-cells:before,
            /deep/ .weui-cells:after{
                display: none;
            }

            /deep/ .weui-check__label{
                height: 40px;
            }

            /deep/ .weui-cell:before{
                display: none;
            }

            /deep/ .vux-radio-label{
                font-size: $font_size_15px;
                color: #353B48;
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

        .pay-form {
            display: none;
        }
    }
</style>
