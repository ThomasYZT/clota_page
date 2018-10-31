<!--散客付款方式-->

<template>
    <div class="account-money-info">
        <div class="content">
            <div class="account-left">
                <!--账户可用额度-->
                <span class="label">{{$t('accountUsableAmount')}}：</span>
                <span class="value">{{accountInfo.validatMoney | moneyFilter | contentFilter}}</span>
                <!--可用额度不足-->
                <span class="warning-label" v-if="limitEnough">{{$t('notEnoughAvailableAmount')}}！</span>
            </div>
            <div class="account-right">
                <!--订单总金额-->
                <span class="label">{{$t('orderTotalAmount')}}：</span>
                <span class="value">{{accountInfo.totalPrice | moneyFilter | contentFilter}}</span>
            </div>
            <Button type="warning"
                    :disabled="limitEnough"
                    class="ivu-btn-108px"
                    @click="payOrder">{{$t('payment')}}</Button><!--付款-->
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            //账户信息
            'account-info'  : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            /**
             * 付款
             */
            payOrder() {
                this.$emit('pay-order');
            }
        },
        computed : {
            //账户余额是否充足
            limitEnough () {
                return this.accountInfo.validatMoney < this.accountInfo.totalPrice;
            }
        }
    }
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
                clear: both;
                float: right;
                margin-top: 5px;
            }
        }
    }
</style>
