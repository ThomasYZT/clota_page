<!--提现申请结果-->

<template>
    <div class="register-result">
        <div class="success-wrap">
            <img class="suc-img" src="../../../../assets/images/pay-success.svg" alt="">
            <div class="suc-label">{{$t('applicationSubmitted')}}</div>
            <div class="wait-tips">{{$t('waitScenicAudit')}}</div>
            <x-button class="button"
                      @click.native="back">{{$t('back')}}</x-button>
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
             * 获取路由参数
             * @param{Object} params
             */
            getParams (params) {
                if (!params || !params.fromRegister) {
                    this.$router.push({
                        name : 'marketingOrder'
                    });
                }
            },
            /**
             * 返回
             */
            back () {
                this.$router.push({
                    name : 'marketingOrder'
                });
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

            .wait-tips{
                padding-top: 4px;
                @include overflow_tip();
                @include block_outline($height : 26px);
                line-height: 26px;
                font-size: $font_size_14px;
                color: $color_999;
            }
        }

        .button{
            margin-top: 30px;
        }
    }
</style>
