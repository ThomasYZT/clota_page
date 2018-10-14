<!--账户余额信息-->

<template>
    <div class="account-money-info">
        <div class="content">
            <div class="account-left">
                <span class="label">账户可用额度：</span>
                <span class="value">500</span>
            </div>
            <div class="account-right">
                <span class="label">订单总金额：</span>
                <span class="value">1000.00</span>
            </div>
            <Button type="warning" class="ivu-btn-108px">付款</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {}
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
                font-weight: bold;
                float: left;

                .label{
                    color: #585858;
                }

                .value{
                    color: $color_blue;
                }
            }

            .account-right{
                height: 33px;
                line-height: 22px;
                font-weight: bold;
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
