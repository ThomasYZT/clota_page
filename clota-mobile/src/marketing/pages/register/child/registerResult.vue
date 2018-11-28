<!--注册结果-->

<template>
    <div class="register-result">
        <div class="success-wrap">
            <img class="suc-img" src="../../../../assets/images/pay-success.svg" alt="">
            <div class="suc-label">恭喜，注册成功</div>
            <x-button class="button"
                      @click.native="next">{{$t('现在登录')}}</x-button>
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
    .register-result{
        @include center_center();

        .success-wrap{
            @include block_outline($height : 300px);
            text-align: center;

            .suc-img{
                display: inline-block;
                @include block_outline(108px,108px);
            }

            .suc-label{
                margin-top: 24px;
                font-size: $font_size_22px;
                color: $color_333;
                text-align: center;
            }
        }
    }
</style>
