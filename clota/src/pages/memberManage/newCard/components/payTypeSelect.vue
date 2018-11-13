<!--支付方式选择-->

<template>
    <div class="pay-type-select">
        <div class="block-title">{{$t('payTypeSelect')}}</div>
        <RadioGroup v-model="payType" @on-change="payTypeChange">
            <Radio label="weixin">{{$t('weChat')}}</Radio><!--微信-->
            <Radio label="alipay">{{$t('ailiPay')}}</Radio><!--支付宝-->
            <Radio label="cash">{{$t('_cash')}}</Radio><!--支付宝-->
        </RadioGroup>
    </div>
</template>

<script>
	export default {
		data () {
			return {
			    //支付方式
                payType : 'cash'
            };
		},
		methods : {
            /**
             * 将选择的支付方式传递给使用的组件
             */
		    setPayType () {
		        this.$emit('set-pay-type',this.payType);
            },
            /**
             * 支付方式改变
             */
            payTypeChange () {
		        this.setPayType();
            }
        },
        created () {
            this.setPayType();
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .pay-type-select{

    }
</style>
