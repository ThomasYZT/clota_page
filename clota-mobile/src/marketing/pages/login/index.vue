<!--登录-->

<template>
    <div class="login">
        <div class="input-wrap">
            <div class="company-name">
                {{companyName}}
            </div>
            <div class="system-name">{{$t('全民营销系统')}}</div>
            <div class="content">
                <x-input :title="$t('mobile')"
                         v-model="formData.phoneNum"
                         class="c-input"
                         text-align="right"
                         label-width="150px"
                         :placeholder="$t('请输入您的手机号')" >
                </x-input>
                <x-input :title="$t('登录密码')"
                         v-model="formData.password"
                         class="c-input"
                         text-align="right"
                         label-width="150px"
                         :placeholder="$t('inputField',{ field : $t('登录密码') })">
                </x-input>
                <x-input :title="$t('validCode')"
                         v-model="formData.password"
                         class="c-input"
                         type="password"
                         text-align="right"
                         label-width="150px"
                         :placeholder="$t('inputField',{ field : $t('validCode') })">
                    <img slot="right-full-height"
                         class="validate"
                         src="../../../assets/images/icon-no-data.svg" alt="">
                </x-input>
                <x-input :title="$t('所属类别')"
                         v-model="formData.type"
                         class="c-input"
                         text-align="right"
                         :disabled="true"
                         label-width="150px"
                         :placeholder="$t('inputField',{ field : $t('登录密码') })">
                </x-input>
                <div class="regret-pass">{{$t('忘记密码')}}</div>
                <x-button class="button"
                          @click.native="login">{{$t('login')}}</x-button>
                <div class="to-register">
                    {{$t('没有账号?')}}<span class="login-label" @click="toRegister">去注册</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data () {
            return {
                //表单信息
                formData : {
                    //手机号
                    phoneNum : '',
                    //登录密码
                    password : '',
                    //所属类别
                    type : '出租车'
                }
            };
        },
        methods : {
            /**
             * 登录
             */
            login () {

            },
            /**
             * 跳转到注册页面
             */
            toRegister () {
                this.$router.push({
                    name : 'marketingRegister'
                });
            }
        },
        computed : {
            ...mapGetters({
                companyName : 'companyName'
            })
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .login{
        @include block_outline();
        overflow: auto;
        background: #2c78ee;
        @include padding_place();

        .input-wrap{
            @include block_outline(unquote('calc(100% - 20px)'),468px);
            margin: 125px auto 0;
            background: $color_fff;
            box-shadow: 0 5px 15px 0 rgba(0,77,148,0.10);
            border-radius: 5px;
            padding-top: 29px;

            .company-name{
                @include overflow_tip();
                @include block_outline($height : 28px);
                line-height: 28px;
                text-align: center;
                color: $color_333;
                font-size: $font_size_16px;
            }

            .system-name{
                @include block_outline($height : 19px);
                line-height: 19px;
                font-size: $font_size_13px;
                color: $color_999;
                text-align: center;
                margin-top: 7px;
            }

            .content{
                padding: 28px 25px 0;

                /deep/ .vux-x-input{
                    padding-left: 0;
                    padding-right: 0;
                }

                /deep/ .vux-x-input-right-full{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .validate{
                    @include block_outline(70px,29px);
                    padding: 0 10px;
                    text-align: center;
                    font-size: $font_size_12px;
                    color: #046FDB;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .regret-pass{
                    margin-top: 10px;
                    @include block_outline($height : 17px);
                    color: $color_blue;
                    font-size: $font_size_12px;
                    text-align: right;
                }

                /deep/ .weui-btn{
                    margin-top: 35px;
                }

                .to-register{
                    margin-top: 10px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    font-size: $font_size_14px;
                    color: #8395A7;

                    .login-label{
                        color: $color_blue;
                    }
                }
            }
        }
    }
</style>
