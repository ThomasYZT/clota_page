<!--选择支付方式并支付-->

<template>
    <div class="pay-order">
        <div class="product-info">
            <div class="product-name">珠海长隆主题乐园全天双人票</div>
            <div class="pay-money">
                <span class="pay-label">{{$t('colonSetting',{ key : $t('应付总额') })}}</span>
                <span class="money">{{100 | moneyFilter | contentFilter}}</span>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		data () {
			return {};
		},
		methods : {}
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .pay-order{
        @include block_outline();
        background: #f2f3f4;
        overflow: auto;

        .product-info{
            @include block_outline($height : 75px);
            padding: 9.5px 14px;

            .product-name{
                @include block_outline($height : 26px);
                font-size: $font_size_14px;
                color: $color_333;
                @include overflow_tip();
                line-height: 20px;
            }

            .pay-money{
                @include block_outline($height : 27px);

                .pay-label{
                    font-size: $font_size_11px;
                    color: $color_333;
                }

                .money{

                }
            }
        }
    }
</style>
