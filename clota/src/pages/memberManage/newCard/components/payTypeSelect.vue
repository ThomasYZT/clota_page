<!--支付方式选择-->

<template>
    <div class="pay-type-select">
        <div class="card-info-title">{{$t('payTypeSelect')}}</div>
        <Form :model="formData" label-position="top">
            <FormItem label="收款方式" prop="payType" :rules="{ required : true,trigger : 'change' }">
                <RadioGroup v-model="formData.payType" @on-change="payTypeChange">
                    <Radio label="weixin">{{$t('weChat')}}</Radio><!--微信-->
                    <Radio label="alipay">{{$t('ailiPay')}}</Radio><!--支付宝-->
                    <Radio label="cash">{{$t('_cash')}}</Radio><!--支付宝-->
                </RadioGroup>
            </FormItem>
        </Form>
    </div>
</template>

<script>
	export default {
		data () {
			return {
                formData : {
                    //支付方式
                    payType : 'cash',
                }
            };
		},
		methods : {
            /**
             * 将选择的支付方式传递给使用的组件
             */
		    setPayType () {
		        this.$emit('set-pay-type',this.formData.payType);
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
        width: 850px;
        margin: 0 auto;

        .card-info-title{
            text-align: center;
            font-size: $font_size_16px;
            color: $color_333;
            padding: 47px 0 16px 0;
        }
    }
</style>
