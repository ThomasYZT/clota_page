<!--微信或支付宝直连支付-->

<template>
    <div class="wx-ali-direct-connection">
        <div class="pay-result" v-if="paySuccess !== null">
            <!--支付成功-->
            <div class="pay-success" v-if="paySuccess === true">
                <img class="status-icon" src="../../../assets/images/pay-success.svg" alt="">
                <p class="status-message">{{$t('paySuccess')}}</p>
            </div>
            <!--支付失败-->
            <div class="pay-failed" v-if="paySuccess === false">
                <img class="status-icon" src="../../../assets/images/pay-failure.svg" alt="">
                <p class="status-message">{{$t('payFailure')}}</p>
            </div>
            <x-button  v-if="canBackToAccount" class="button" @click.native="toAccount">{{$t('backToAccount')}}</x-button>
        </div>
        <div v-if="aliPayInWeixin === true && paySuccess === null" class="img-wrapper">
            <img class="notice" src="../../../assets/images/open-in-browser.svg" alt="">
            <!-- 返回账户 -->
            <x-button class="button" @click.native="cancelPay">{{$t('cancelPay')}}</x-button>
        </div>
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
                //是否能返回账户页面
                canBackToAccount : false
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
                        this.transactionId = toRoute.query.transactionId;
                        this.aliPayInWeixin = true;
                        this.timer = setInterval(() => {
                            this.queryConsumeUpdateBiz();
                        },1000);
                    }
                } else {
                    //跳转到支付页面
                    if (params && params.formContent && params.payType) {
                        const divEle = document.createElement('div');
                        divEle.innerHTML = params.formContent;
                        document.body.appendChild(divEle);
                        document.forms[0].acceptCharset = 'UTF8';
                        document.forms[0].submit();
                    } else if (toRoute && toRoute.query && toRoute.query.fromzl) { //支付宝在微信中付款
                        let urlParms = JSON.parse(JSON.stringify(toRoute.query));
                        delete urlParms.transactionId;
                        delete urlParms.fromzl;
                        let url = ('https://openapi.alipay.com/gateway.do?' + querystring.stringify(urlParms));
                        window.location.href = url;
                    } else if (toRoute && toRoute.query.out_trade_no) {//处理支付结果
                        this.queryPayRecordByOutTradeNo(toRoute.query.out_trade_no);
                    }
                }
            },
            /**
             * 查询支付结果
             * @param{String} outTradeNo 订单编号
             */
            queryPayRecordByOutTradeNo (outTradeNo) {
                this.$vux.loading.show({
                    text : this.$t('支付结果查询中')
                });
                ajax.post('market_queryPayRecordByOutTradeNo',{
                    outTradeNo
                },null,false).then(res => {
                    this.paySuccess = res.success && res.data && res.data.txnStatus === "success";
                }).finally(() => {
                    this.$vux.loading.hide();
                });
            },
            /**
             * 跳转到下单页面
             */
            toAccount () {
                this.$router.push({
                    name : 'account'
                });
            },
            /**
             * 查询交易结果
             */
            queryConsumeUpdateBiz () {
                ajax.post('queryConsumeUpdateBiz', {
                    transactionId : this.transactionId
                }).then(res => {
                    if (res.success && (res.data !== 'doing' && res.data !== 'unknown') ) {
                        clearInterval(this.timer);
                        this.timer = '';
                        this.paySuccess = true;
                    }
                });
            },
        },
        computed : {
            ...mapGetters({
                isWeixin : 'isWeixin',
            })
        },
        beforeDestroy () {
            clearInterval(this.timer);
            this.timer = '';
        },
        created () {
            this.canBackToAccount = localStorage.getItem('token') ? true : false;
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
