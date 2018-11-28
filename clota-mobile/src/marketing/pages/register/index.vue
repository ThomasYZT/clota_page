<!--全民营销注册-->

<template>
    <div class="register">
        <div class="head">
            <img class="img-head" src="../../../assets/images/icon-no-data.svg" alt="">
            <div class="register-tips">您正在注册 <span class="company-name">广州长隆飞鸟乐园</span> 的销售用户</div>
            <div class="belong-type">
                {{$t('colonSetting',{ key : '所属类别' })}}出租车
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
    .register{
        @include block_outline();
        background: #f2f3f4;

        .head{
            @include block_outline($height : 160px);
            background: $color_fff;
            padding-top: 19px;
            text-align: center;

            .img-head{
                display: inline-block;
                @include block_outline(53px,53px);
                background: red;
                border-radius: 27px;
                background-size: 100% 100%;
            }

            .register-tips{
                height: 20px;
                line-height: 20px;
                margin-top: 21px;
                font-size: $font_size_14px;
                color: #003E00;

                .company-name{
                    color: $color_yellow;
                }
            }
        }
    }
</style>
