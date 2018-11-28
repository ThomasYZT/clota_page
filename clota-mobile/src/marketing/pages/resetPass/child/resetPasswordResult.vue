<!--重置密码结果-->

<template>
    <div class="register-result">
        <div class="success-wrap">
            <img class="suc-img" src="../../../../assets/images/pay-success.svg" alt="">
            <div class="suc-label">{{$t('恭喜，密码重置成功!')}}</div>
            <x-button class="button"
                      @click.native="toLogin">{{$t('现在登录')}}</x-button>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {};
        },
        methods : {
            /**
             * 跳转到登录页面
             */
            toLogin () {
                this.$router.push({
                    name : ''
                });
            },
            /**
             * 获取路由参数
             * @param{Object} params
             */
            getParams (params) {
                if (!params || !params.fromRegister) {
                    this.$router.push({
                        name : 'marketingLogin'
                    });
                }
            }
        },
        beforeRouteEnter (to,from,next){
            next(vm => {
                vm.getParams(to.params);
            });
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .register-result{
        @include center_center();

        .success-wrap{
            @include block_outline($height : 400px);
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

            /deep/ .weui-btn{
                margin-top: 68px;
            }
        }
    }
</style>
