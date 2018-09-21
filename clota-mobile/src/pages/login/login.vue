<!--
    会员登录
    作者：杨泽涛
-->
<template>
    <div class="login" v-transfer-dom>
        <group class="group" label-width="150px">

            <x-input title="手机号码"
                     class="c-input"
                     keyboard="number">
            </x-input>

            <span style="display: block;width: 100px;"></span>

            <x-input title="验证码"
                     placeholder="输入验证码"
                     class="c-input verify-input"
                     :show-clear="false">
                <div slot="right"
                     class="code-button"
                     @click="getCode">
                    <p>获取动态码</p>
                </div>
            </x-input>
        </group>
        <div>
            <p class="register-entry"
               @click="$router.push('/mobile/register')">去注册</p>
        </div>

        <x-button class="button">登陆</x-button>
    </div>
</template>

<script>
    import MD5 from 'crypto-js/md5';
    export default {
        data() {
            return {}
        },
        methods: {
            /**
             * 获取验证码
             */
            getCode() {
                //todo 获取验证码
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .login {
        color: #4A4A4A;

        .c-input {
            height: 50.5px;
            font-size: 15px;
        }

        .verify-input{
            border-top: 1px solid #F5F5F5;
            border-bottom: 1px solid #F5F5F5;

            .code-button {
                padding-left: 16.5px;
                margin-left: 16.5px;
                height: 50.5px;
                width: 80px;
                line-height: 50.5px;
                color: #046FDB;
                font-size: 12.5px;
                text-align: center;
                border-left: 1px solid #E8E8E8;
            }
        }

        .register-entry {
            margin-right: 16.5px;
            color: #046FDB;
            height: 50.5px;
            line-height: 50.5px;
            font-size: 12.5px;
            text-align: right;
        }

        .button {
            margin-top: 150px;
            max-width: calc(100% - 110px);
            background-color: #0073EB;
            color: #FFF;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius: 20px;
        }

    }
</style>



