<!--团队付款方式-->

<template>
    <div class="account-money-info">
        <div class="content">
            <div class="account-left">
                <!--支付方式-->
                <span class="pay-type-label">{{$t('payType')}}：</span>
                <RadioGroup v-model="payType">
                    <Radio label="deposit">{{$t('payType.deposit')}}</Radio>
                    <Radio label="collect">{{$t('payType.collect')}}</Radio>
                </RadioGroup>
            </div>
            <div class="account-right">
                <!--订单总金额-->
                <span class="label">{{$t('orderTotalAmount')}}：</span>
                <span class="value">{{accountInfo.totalPrice | moneyFilter | contentFilter}}</span>
            </div>
            <div class="account-info">
                <!--账户可用额度-->
                <span class="label">{{$t('accountUsableAmount')}}：</span>
                <span class="value">{{accountInfo.validatMoney | moneyFilter | contentFilter}}</span>
                <!--可用额度不足-->
                <span class="warning-label" v-if="limitEnough">{{$t('notEnoughAvailableAmount')}}！</span>
            </div>
            <Button type="warning"
                    class="ivu-btn-108px"
                    :disabled="canPayOrder"
                    @click="payOrder">{{$t('payment')}}</Button>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            //账户信息
            'account-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                //支付方式
                payType : 'deposit'
            };
        },
        methods : {
            /**
             * 付款
             */
            payOrder () {
                this.$emit('pay-order',{
                    payType : this.payType
                });
            },
            /**
             * 获取支付类型
             */
            getPayType () {
                return this.payType;
            }
        },
        computed : {
            //判断是否能付款,定存需要有足够的余额，到付可以直接下单
            canPayOrder () {
                if (this.payType === 'deposit') {
                    return this.accountInfo.validatMoney < this.accountInfo.totalPrice;
                } else {
                    return false;
                }
            },
            //余额是否充足
            limitEnough () {
                return this.accountInfo.validatMoney < this.accountInfo.totalPrice;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .account-money-info{
        padding: 0 30px;

        .content{
            padding: 26px;
            @include block_outline($height : 115px);
            background: $color_F5F7FA;

            .account-left{
                font-size: $font_size_16px;
                height: 22px;
                line-height: 22px;
                float: left;

                .pay-type-label{
                    font-size: $font_size_14px;
                    color: #585858;
                    margin-right: 10px;
                }
            }

            .account-info{
                width: auto;
                font-size: $font_size_16px;
                height: 22px;
                line-height: 22px;
                clear: both;
                float: left;
                margin-top: 6px;

                .label{
                    color: #585858;
                }

                .value{
                    color: $color_blue;
                }

                .warning-label{
                    color: $color_yellow;
                    display: inline-block;
                    margin-left: 20px;
                }
            }

            .account-right{
                height: 33px;
                line-height: 22px;
                float: right;

                .label{
                    color: #585858;
                    font-size: $font_size_16px;
                }

                .value{
                    color: $color_yellow;
                    font-size: $font_size_24px;
                }
            }

            .ivu-btn-108px{
                display: block;
                clear: right;
                float: right;
                margin-top: 5px;
            }
        }
    }
</style>
