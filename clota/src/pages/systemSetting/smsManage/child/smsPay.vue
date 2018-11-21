<!--
    提交支付页面
    作者：杨泽涛
-->
<template>
    <div class="sms-pay">
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
                <!--&lt;!&ndash; 支付结果回调地址 &ndash;&gt;-->
                <input type="text" name="RedirectUrl" v-model="payFormData.redirectUrl">
                <!-- 交易说明 -->
                <input type="text" name="TxnShortDesc" v-model="payFormData.txnShortDesc">
                <!-- 签名串 -->
                <input type="text" name="Sign" v-model="payFormData.sign">
                <!-- 异步通知url -->
                <input type="text" name="NotifyUrl" v-model="payFormData.notifyUrl">
            </form>
        </div>
    </div>
</template>

<script>
    import lifeCycleMixins from '../../../../mixins/lifeCycleMixins';
    export default {
        mixins : [lifeCycleMixins],
        components: {},
        data() {
            return {
                //支付参数
                payFormData : {}
            }
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && params.payFormData) {
                    this.payFormData = params.payFormData;
                    this.$nextTick(() => {
                        this.$refs.payForm.submit();
                    });
                } else {
                    this.$router.push({
                        name : 'buySms'
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .pay-form {
        display: none;
    }
</style>
