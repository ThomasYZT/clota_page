<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="register">
        <x-input title="姓名"
                 class="c-input"
                 label-width="150px"></x-input>
        <x-input title="手机号码"
                 class="c-input"
                 keyboard="number"
                 label-width="150px"></x-input>
        <x-input title="验证码"
                 placeholder="输入验证码"
                 class="c-input verify-input"
                 :show-clear="false"
                 keyboard="number"
                 label-width="150px">
            <div slot="right"
                 class="code-button"
                 @click="getCode">
                <p>获取动态码</p>
            </div>
        </x-input>
        <popup-picker title="性别"
                      :data="sexList"
                      class="c-input"
                      v-model="isSexPick"
                      @on-change="sexValueChange"
                      :placeholder="'请选择'"></popup-picker>


        <x-button class="button">立即开卡</x-button>
        <p class="register-tip">已有账号，去登陆</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sexList: [['男', '女']],
                //是否显示性别选择弹窗
                isSexPick: []
            }
        },
        methods: {
            /**
             * 获取验证码
             */
            getCode() {
                //todo 获取验证码
            },
            /**
             * 性别取值更新
             */
            sexValueChange(value) {
                console.log(value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .register {
        margin-top: 15px;
        color: #4A4A4A;

        .c-input {
            height: 50.5px;
            font-size: 15px;
            border-bottom: 1px solid #F5F5F5;
            &:before {
                border: none !important;
            }
        }

        .verify-input{

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
            margin-top: 145px;
            max-width: calc(100% - 110px);
            background-color: #0073EB;
            color: #FFF;
        }

        .register-tip {
            margin-top: 14px;
            font-size: 14px;
            color: #8395A7;
            text-align: center;
        }

        /deep/ .weui-cell.vux-tap-active.weui-cell_access {
            height: 100% !important;
        }
    }
</style>
