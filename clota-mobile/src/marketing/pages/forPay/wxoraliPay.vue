<!--微信或支付宝直连支付-->

<template>
    <div class="wx-ali-direct-connection">
        <div class="pay-result" v-if="paySuccess !== null">
            <!--预定成功-->
            <div class="pay-success" v-if="paySuccess === true">
                <img class="status-icon" src="../../../assets/images/pay-success.svg" alt="">
                <p class="status-message">{{$t('reserveSucessfully')}}</p>
                <div class="label-info">
                    {{$t('reserveSuccessfullyNotice')}}
                </div>
            </div>
            <!--预定失败-->
            <div class="pay-failed" v-if="paySuccess === false">
                <img class="status-icon" src="../../../assets/images/pay-failure.svg" alt="">
                <p class="status-message">{{$t('reserveFaield')}}</p>
            </div>
            <x-button class="button" @click.native="toOrderPage" v-if="marketUserId">{{$t('continueToReserve')}}</x-button>
        </div>
        <div v-if="aliPayInWeixin === true && paySuccess === null" class="img-wrapper">
            <img class="notice" src="../../../assets/images/open-in-browser.svg" alt="">
            <!-- 取消支付按钮 -->
            <x-button class="button" @click.native="cancelPay">{{$t('cancelPay')}}</x-button>
        </div>
        <confirm v-model="confirmShow"
                 class="confirm-modal-wrap"
                 v-transfer-dom
                 :title="$t('notice')"
                 :confirm-text="$t('confirm')"
                 :cancel-text="$t('cancel')"
                 :show-cancel-button="false"
                 @on-confirm="confirmPayResult">
            <p style="text-align:center;">{{ $t('errorMsg.OD009') }}</p>
        </confirm>
        <!--退款失败提示框-->
        <confirm v-model="refundConfirmModal"
                 class="confirm-modal-wrap"
                 v-transfer-dom
                 :title="$t('notice')"
                 :confirm-text="$t('confirm')"
                 :cancel-text="$t('cancel')"
                 :show-cancel-button="false"
                 @on-confirm="confirmRefundResult">
            <p style="text-align:center;">{{ $t('cancelPaymentResultNotice') }}</p>
        </confirm>
    </div>
</template>

<script>
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/marketing/api/index';
    import { mapGetters } from 'vuex';
    import { querystring } from 'vux';

    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //支付是否成功
                paySuccess : null,
                //是否在微信中发起支付宝支付
                aliPayInWeixin : null,
                //交易id
                transactionId : '',
                //定时器
                timer : '',
                //确认提示框是否显示
                confirmShow : false,
                //取消支付失败提示框
                refundConfirmModal : false,
                //支付来源，销售用户或游客直接下单
                fromUser : ''
            };
        },
        methods : {
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             * @param{Object} toRoute 当前进入的路由信息
             */
            getParams (params,toRoute) {
                if (this.isWeixin) {
                    //微信里面使用支付宝支付
                    if (toRoute && toRoute.query && toRoute.query.fromzl) {
                        this.fromUser = toRoute.query.userType;
                        this.transactionId = toRoute.query.transactionId;
                        this.aliPayInWeixin = true;
                        this.timer = setInterval(() => {
                            this.queryConsumeUpdateBiz();
                        },1000);
                    } else if (toRoute && toRoute.query && 'wxJsdk' in toRoute.query) { //在微信里面使用微信支付
                        if (toRoute.query['wxJsdk'] === true) {
                            this.paySuccess = true;
                        } else {
                            this.paySuccess = false;
                        }
                    }
                } else {
                    if ((toRoute && toRoute.query && toRoute.query.transactionId && toRoute.query.out_trade_no)
                        || (toRoute && toRoute.query && toRoute.query.transactionId && !toRoute.query.fromzl) ) {//处理支付结果查询
                        this.transactionId = toRoute.query.transactionId;
                        this.timer = setInterval(() => {
                            this.queryConsumeUpdateBiz();
                        },1000);
                    } else if (params && params.formContent && params.payType) {//跳转到支付页面
                        const divEle = document.createElement('div');
                        divEle.innerHTML = params.formContent;
                        document.body.appendChild(divEle);
                        document.forms[0].acceptCharset = 'UTF8';
                        document.forms[0].submit();
                    } else if (toRoute && toRoute.query && toRoute.query.fromzl) { //支付宝在微信中付款
                        let urlParms = JSON.parse(JSON.stringify(toRoute.query));
                        delete urlParms.transactionId;
                        delete urlParms.fromzl;
                        delete urlParms.userType;
                        window.location.href = 'https://openapi.alipay.com/gateway.do?' + querystring.stringify(urlParms);
                    }
                }
            },
            // /**
            //  * 查询支付结果
            //  * @param{String} outTradeNo 订单编号
            //  */
            // queryPayRecordByOutTradeNo (outTradeNo) {
            //     this.$vux.loading.show({
            //         text : this.$t('searchIngPayResult')
            //     });
            //     ajax.post('market_queryPayRecordByOutTradeNo',{
            //         outTradeNo
            //     },null,false).then(res => {
            //         this.paySuccess = res.success && res.data && res.data.txnStatus === "success";
            //     }).finally(() => {
            //         this.$vux.loading.hide();
            //     });
            // },
            /**
             * 跳转到下单页面
             */
            toOrderPage () {
                if (this.fromUser === 'marketer') {
                    this.$router.replace({
                        name : 'marketingProduct'
                    });
                } else {
                    this.$router.replace({
                        name : 'marketingTourist'
                    });
                }
            },
            /**
             * 查询交易结果
             */
            queryConsumeUpdateBiz () {
                ajax.post('queryConsumeUpdateBiz', {
                    transactionId : this.transactionId
                },{},false).then(res => {
                    if (res.success && (res.data !== 'doing' && res.data !== 'unknown') ) {
                        clearInterval(this.timer);
                        this.timer = '';
                        this.paySuccess = true;
                    } else if (res.code === 'OD009') {
                        clearInterval(this.timer);
                        this.timer = '';
                        this.confirmShow = true;
                    }
                });
            },
            /**
             * 错误提示确认
             */
            confirmPayResult () {
                this.confirmShow = false;
                this.toOrderPage();
            },
            /**
             * 取消支付
             */
            cancelPay () {
                ajax.post('revocation', {
                    transactionId : this.transactionId
                }).then((res) => {
                    if (res.success) {
                        this.toOrderPage();
                    } else {
                        this.refundConfirmModal = true;
                    }
                    clearInterval(this.timer);
                    this.timer = '';
                });
            },
            /**
             * 取消支付报错确认
             */
            confirmRefundResult () {
                this.toOrderPage();
            },
        },
        computed : {
            ...mapGetters({
                isWeixin : 'isWeixin',
                marketUserId : 'marketUserId',
            })
        },
        beforeDestroy () {
            clearInterval(this.timer);
            this.timer = '';
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .wx-ali-direct-connection{
        width: 100%;
        height: 100%;

        .pay-result{
            width: 100%;
            height: 280px;
            position: absolute;
            top: 40%;
            margin-top: -150px;
            text-align: center;

            .pay-failed,
            .pay-success{

                .status-icon {
                    width: 150px;
                }

                .status-message {
                    margin-top: 20px;
                    font-size: 18px;
                }

                .label-info{
                    width: calc(100% - 46px);
                    margin: 10px auto 0;
                    text-align: center;
                    font-size: $font_size_14px;
                    color: $color_999;
                }
            }

            .button{
                margin-top: 50px;
            }
        }

        .img-wrapper {
            height: 100%;
            width: 100%;
            background-color: #000;
            opacity: .5;
            text-align: right;

            .notice {
                margin: 10px 20px;
                width: 50%;
            }
        }
    }
</style>
