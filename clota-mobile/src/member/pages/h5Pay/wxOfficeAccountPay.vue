<!--微信公众号支付-->

<template>
    <div class="wx-account-pay">
        <div class="status-wrapper">
            <div class="status" v-if="isPayAbnormal === true">
                <img class="status-icon" src="../../../assets/images/pay-failure.svg" alt="">
                <p class="status-message">{{$t('payAbnormal')}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import ajax from '@/member/api/index.js';
    import { mapGetters } from 'vuex';

	export default {
		data () {
			return {
                //微信openid
                wxOpenId : '',
                //是否支付异常
                isPayAbnormal : false,
                //支付参数
                orderParams : {}
            };
		},
		methods : {
            /**
             * 获取路由信息
             * @param{Object} toQuryParams 路由信息
             */
            getParams (toQuryParams) {
                if (toQuryParams && toQuryParams.code) {
                    this.isPayAbnormal = false;
                    this.orderParams['bizScene'] = toQuryParams['bizScene'];
                    this.orderParams['bizType'] = toQuryParams['bizType'];
                    this.orderParams['paymentChannel'] = 'zhilian';
                    this.orderParams['txnAmt'] = toQuryParams['txnAmt'];
                    this.orderParams['orgId'] = toQuryParams['orgId'];
                    this.getOpenId(toQuryParams.code,toQuryParams.orgId);
                } else {
                    this.isPayAbnormal = true;
                }
            },
            /**
             * 获取微信用户openid
             * @param{String} code 微信回调code
             * @param{String} orgId 机构id
             */
            getOpenId (code,orgId) {
                ajax.post('getOpenid',{
                    code : code,
                    orgId : orgId
                }).then(res => {
                    if (res.data && res.data) {
                        this.wxOpenId = res.data;
                        this.getPayPageForOfficialAccountNoLogin();
                    } else {
                        this.isPayAbnormal = true;
                    }
                });
            },
            /**
             * 获取jsapi支付参数
             */
            getPayPageForOfficialAccountNoLogin () {
                ajax.post('getPayPageForOfficialAccount',{
                    bizScene : this.orderParams['bizScene'],
                    bizType : this.orderParams['bizType'],
                    paymentChannel : this.orderParams['paymentChannel'] ,
                    txnAmt : this.orderParams['txnAmt'],
                    payerRealId : this.wxOpenId,
                    orgId : this.orderParams['orgId'],
                }).then(res => {
                    if (res.success && res.data) {
                        try {
                            let formContent = JSON.parse(res.data.formContent);
                            this.configWxInfo(formContent);
                        } catch (err) {
                            this.$vux.toast.text(this.$t('payAbnormal'));
                        }
                    }
                });
            },
            /**
             * 微信浏览器内发起支付
             * @param{Object} payParams
             */
            wxToPay (payParams) {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId" : payParams.appId, //公众号名称，由商户传入
                        "timeStamp" : payParams.timeStamp, //时间戳，自1970年以来的秒数
                        "nonceStr" : payParams.nonceStr, //随机串
                        "package" : payParams.packageValue,
                        "signType" : payParams.signType, //微信签名方式：
                        "paySign" : payParams.paySign, //微信签名
                    },
                    (res) => {
                        if (res.err_msg === "get_brand_wcpay_request:ok" ) {
                            this.$router.replace({
                                name : 'wOraDirectPay',
                                query : {
                                    wxJsdk : true
                                }
                            });
                        } else {
                            this.$router.replace({
                                name : 'wOraDirectPay',
                                query : {
                                    wxJsdk : false
                                }
                            });
                        }
                });
            },
            /**
             * 配置微信支付
             * @param{Object} formContent 支付参数
             */
            configWxInfo (formContent) {
                if (this.isWeixin) {
                    if (typeof WeixinJSBridge === "undefined") {
                        if ( document.addEventListener ) {
                            document.addEventListener('WeixinJSBridgeReady', this.wxToPay.bind(this,formContent), false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', this.wxToPay.bind(this,formContent));
                            document.attachEvent('onWeixinJSBridgeReady', this.wxToPay.bind(this,formContent));
                        }
                    } else {
                        this.wxToPay(formContent);
                    }
                } else {
                    this.$vux.toast.text(this.$t('payInWx'));
                }
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams(to.query);
            });
        },
        computed : {
            ...mapGetters([
                'lang',
                'isWeixin'
            ])
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .wx-account-pay{
        @include block_outline();

        .status-wrapper{
            width: 100%;
            height: 280px;
            position: absolute;
            top: 40%;
            margin-top: -150px;
            text-align: center;

            .status-icon {
                width: 150px;
            }

            .status-message {
                margin-top: 20px;
                font-size: 18px;
            }
        }
    }
</style>
