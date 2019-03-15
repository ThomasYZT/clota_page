<!--微信公众号支付-->

<template>
    <div class="wx-account-pay">
        <div class="status-wrapper">
            <div class="status" v-if="isPayAbnormal === false">
                <img class="status-icon" src="../../../assets/images/pay-failure.svg" alt="">
                <p class="status-message">{{$t('payAbnormal')}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import ajax from '@/marketing/api/index.js';
    import { mapGetters } from 'vuex';

	export default {
		data () {
			return {
                //订单参数
                ordreParams : {},
                //微信openid
                wxOpenId : '',
                //是否支付异常
                isPayAbnormal : false
            };
		},
		methods : {
            /**
             * 获取路由信息
             * @param{Object} toQuryParams 路由信息
             */
            getParams (toQuryParams) {
                if (toQuryParams && toQuryParams.code) {
                    this.ordreParams['bizScene'] = toQuryParams['bizScene'];
                    this.ordreParams['bizType'] = toQuryParams['bizType'];
                    this.ordreParams['paymentChannel'] = 'zhilian';
                    this.ordreParams['txnAmt'] = toQuryParams['txnAmt'];
                    this.ordreParams['orgId'] = toQuryParams['orgId'];
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
                ajax.post('market_getOpenid',{
                    code : code,
                    orgId : orgId
                }).then(res => {
                    if (res.data && res.data) {
                        this.wxOpenId = res.data;
                        this.getPayPageForOfficialAccountNoLogin();
                    }
                });
            },
            /**
             * 获取jsapi支付参数
             */
            getPayPageForOfficialAccountNoLogin () {
                let createOrderParams = localStorage.getItem('create-order-detail') ? JSON.parse(localStorage.getItem('create-order-detail')) : {};
                ajax.post('market_getPayPageForOfficialAccountNoLogin',{
                    bizScene : this.ordreParams['bizScene'],
                    bizType : this.ordreParams['bizType'],
                    paymentChannel : this.ordreParams['paymentChannel'] ,
                    txnAmt : this.ordreParams['txnAmt'],
                    payerRealId : this.wxOpenId,
                    orgId : this.ordreParams['orgId'],
                    ...createOrderParams
                }).then(res => {
                    if (res.success && res.data) {
                        try {
                            let formContent = JSON.parse(res.data.formContent);
                            if (this.isWeixin) {
                                this.$wechat.chooseWXPay({
                                    timestamp : formContent.timeStamp,
                                    nonceStr : formContent.nonceStr, // 支付签名随机串，不长于 32 位
                                    package : formContent.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                    signType : formContent.signTyp, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                    paySign : formContent.paySign, // 支付签名
                                    success : () => {
                                        this.$router.replace({
                                            name : 'wxOrAlidirectPay',
                                            query : {
                                                wxJsdk : true
                                            }
                                        });
                                    },
                                    fail : () => {
                                        this.$router.replace({
                                            name : 'wxOrAlidirectPay',
                                            query : {
                                                wxJsdk : false
                                            }
                                        });
                                    }
                                });
                            } else {
                                location.href = formContent.mwebUrl;
                            }
                        } catch (err) {
                            this.$vux.toast.text(this.$t('payAbnormal'));
                        }
                    }
                });
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
        }
    }
</style>
