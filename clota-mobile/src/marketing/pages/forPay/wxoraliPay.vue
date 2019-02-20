<!--微信或支付宝直连支付-->

<template>
    <div class="wx-ali-direct-connection">
        <div class="pay-result" v-if="paySuccess !== null">
            <!--预定成功-->
            <div class="pay-success" v-if="paySuccess === true">
                <img class="status-icon" src="../../../assets/images/pay-success.svg" alt="">
                <p class="status-message">{{$t('预定成功')}}</p>
                <div class="label-info">
                    {{$t('取票凭证将以短信形式发送到您指定的手机，请注意查收！')}}
                </div>
            </div>
            <!--预定失败-->
            <div class="pay-failed" v-if="paySuccess === false">
                <img class="status-icon" src="../../../assets/images/pay-failure.svg" alt="">
                <p class="status-message">{{$t('预定失败')}}</p>
            </div>
            <x-button class="button" @click.native="toOrderPage">{{$t('继续预定')}}</x-button>
        </div>
        <div v-if="aliPayInWeixin === true && paySuccess === null" class="img-wrapper">
            <img class="notice" src="../../../assets/images/open-in-browser.svg" alt="">
            <!-- 取消支付按钮 -->
            <x-button class="button" @click.native="cancelPay">{{$t('cancelPay')}}</x-button>
        </div>
    </div>
</template>

<script>
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/marketing/api/index';
    import { mapGetters } from 'vuex';

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
                timer : ''
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
                    if (toRoute && toRoute.query && toRoute.query.formContent && toRoute.query.transactionId) {
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
                    } else if (toRoute && toRoute.query && toRoute.query.formContent) { //通过url参数传递form表单进行付款
                        const divEle = document.createElement('div');
                        divEle.innerHTML = decodeURI(toRoute.query.formContent).replace(/%26/g,'&');
                        document.body.appendChild(divEle);
                        document.forms[0].acceptCharset = 'UTF8';
                        document.forms[0].submit();
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
            toOrderPage () {
                this.$router.push({
                    name : 'marketingTourist'
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
