<template>
    <div data-scope-style class="login">
        <group class="group" label-width="150px">

            <x-input title="手机号码"
                     class="c-input"
                     keyboard="number">
            </x-input>

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
            font-size: 30px;
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

        .button {
            max-width: calc(100% - 110px);
        }

    }
</style>
<style lang="scss">
    .login[data-scope-style] {
        .weui-cells:before,
        .weui-cells:after,
        .weui-cell:before,
        .weui-cell:after{
            border: none;
        }
    }

</style>



