<!--
    支付跳转页
    作者：杨泽涛
-->
<template>
    <div class="h5-pay">
        <div class="pay-form">
            <form ref="payForm" :action="payFormData.payWebUrl" method="post">
                <!-- 币种 -->
                <input type="text" name="CurrencyCode" v-model="payFormData.currencyCode">
                <!-- 交易类型 -->
                <input type="text" name="TxnType" v-model="payFormData.txnType">
                <!-- 合作方id -->
                <input type="text" name="PartnerID" v-model="payFormData.partnerId">
                <!-- 支付方式id -->
                <input type="text" name="ChannelID" v-model="payFormData.channelId">
                <!-- 商户流水号 -->
                <input type="text" name="MerchantTxnNo" v-model="payFormData.merchantTxnNo">
                <!-- 商户id -->
                <input type="text" name="MerchantID" v-model="payFormData.merchantId">
                <!-- 支付说明 -->
                <input type="text" name="TxnAmt" v-model="payFormData.txnAmt">
                <!-- 支付结果回调地址 -->
                <input type="text" name="RedirectUrl" v-model="payFormData.redirectUrl">
                <!-- 交易说明 -->
                <input type="text" name="TxnShortDesc" v-model="payFormData.txnShortDesc">
                <!-- 签名串 -->
                <input type="text" name="Sign" v-model="payFormData.sign">
                <!-- 异步通知url -->
                <input type="text" name="NotifyUrl" v-model="payFormData.notifyUrl">
            </form>
        </div>

        <div v-if="isShowImg" class="img-wrapper">
            <img class="notice" src="../../../assets/images/open-in-browser.svg" alt="">

            <!-- 取消支付按钮 -->
            <x-button class="button" @click.native="cancelPay">{{$t('cancelPay')}}</x-button>
        </div>
        <!--未获取地理位置信息下单报错提示框-->
        <confirm v-model="confirmShow"
                 class="confirm-modal-wrap"
                 v-transfer-dom
                 :title="$t('notice')"
                 :confirm-text="$t('confirm')"
                 :show-cancel-button="false"
                 @on-confirm="confirmShow = false">
            <p style="text-align:center;">{{ $t('iosSettingError') }}</p>
        </confirm>

        <!--充值失败提示框-->
        <confirm v-model="errConfirmShow"
                 class="confirm-modal-wrap"
                 v-transfer-dom
                 :title="$t('notice')"
                 :confirm-text="$t('confirm')"
                 :show-cancel-button="false"
                 @on-confirm="confirmPayResult">
            <p style="text-align:center;">{{ $t('payFaieldNotice') }}</p>
        </confirm>
    </div>
</template>

<script>
    import { querystring } from 'vux';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins';
    import ajax from '@/member/api/index.js';
    export default {
        mixins : [lifeCycleMixins],
        components : {},
        data () {
            return {
                isShowImg : false,
                payFormData : {
                    payWebUrl : '',
                    txnType : '',
                    partnerId : '',
                    channelID : '',
                    merchantTxnNo : '',
                    merchantId : '',
                    txnAmt : '',
                    redirectUrl : '',
                    txnShortDesc : '',
                    sign : '',
                    currencyCode : '',
                    notifyUrl : ''
                },
                //计时器
                intervalId : null,
                //提示模态框是否显示
                confirmShow : false,
                //充值失败提示框
                errConfirmShow : false
            };
        },
        methods : {
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
             * 获取路由参数
             * @param params
             */
            getParams () {
                //微信
                if (this.isWeixin()) {
                    this.payFormData = JSON.parse(localStorage.getItem('payFormData'));
                    //alert(this.payFormData.paymentTypeId)
                    //微信内，公众号支付
                    if (this.payFormData.paymentTypeId === 'wx') {
                        //删除路由缓存数据
                        localStorage.removeItem('payStatus');
                        this.$nextTick(() => {
                            this.$refs.payForm.submit();
                        });

                    //微信内支付宝支付，显示其他浏览器打开
                    } else {
                        this.payFormData = querystring.parse(location.href.split('?')[1]);
                        this.isShowImg = true;
                        //开始轮询支付状态及支付结果
                        this.intervalId = setInterval(() => {
                           this.queryConsumeUpdateBiz();
                        }, 5000);
                    }

                //非微信 支付宝、微信支付、微信内支付宝跳转其他浏览器支付
                } else {
                    this.payFormData = querystring.parse(location.href.split('?')[1]);
                    //判断ios是否在隐私模式下
                    let isPrivate = false;
                    try {
                        localStorage.setItem('token', this.payFormData.token);
                    } catch (_) {
                        this.confirmShow = true;
                        isPrivate = true;
                    }
                    //在非隐私模式下才可以继续付款
                    if (!isPrivate) {
                        localStorage.setItem('payFormData', JSON.stringify(this.payFormData));
                        this.$nextTick(() => {
                            this.$refs.payForm.submit();
                        });
                    }
                }

            },
            /**
             * 查询支付状态 / 微信环境下
             */
            queryConsumeUpdateBiz () {
                ajax.post('queryConsumeUpdateBiz', {
                    transactionId : this.payFormData.transactionId
                }).then(res => {
                    if (res.success && (res.data !== 'doing' && res.data !== 'unknown') ) {
                        clearInterval(this.intervalId);
                        this.$router.push({
                            name : 'payStatus',
                            params : {
                                status : res.data,
                                payFormData : this.payFormData
                            }
                        });
                    } else if (res.code === 'OD009') {
                        clearInterval(this.intervalId);
                        this.intervalId = '';
                        this.errConfirmShow = true;
                    }
                });
            },
            /**
             * 取消支付
             */
            cancelPay () {
                ajax.post('revocation', {
                    transactionId : this.payFormData.transactionId
                }).then(() => {
                    clearInterval(this.intervalId);
                    this.$router.push({
                        name : 'account'
                    });
                })
            },
            /**
             * 删除定时器
             */
            clearIntervalInfo () {
                clearInterval(this.intervalId);
            },
            /**
             * 错误提示确认
             */
            confirmPayResult () {
                this.errConfirmShow = false;
                this.$router.push({
                    name : 'payStatus',
                    params : {
                        status : 'fail',
                        payFormData : this.payFormData
                    }
                });
            }
        },
        mounted () {
            //监听微信物理返回
            let state = {
                title : "title",
                url : "#"
            };
            history.pushState(state, "title", "#");
            window.addEventListener("popstate", this.clearIntervalInfo, false);
        },
        beforeDestroy () {
            window.removeEventListener("popstate", this.clearIntervalInfo);
            clearInterval(this.intervalId);
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .h5-pay {
        height: 100%;

        .pay-form {
            display: none;
        }

        .img-wrapper {
            height: 100%;
            width: 100%;

            background-color: #000;
            opacity: .5;
            text-align: right;
        }
        img.notice {
            margin: 10px 20px;
            width: 50%;
        }
    }
</style>
