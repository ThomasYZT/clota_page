<!--设置交易密码-->

<template>
    <div class="change-phone">
        <div class="area">
            <group>
                <cell
                    title="当前手机号"
                    value-align="left"
                    value="17237387333">
                </cell>
                <x-input title="验证码"
                         ref="test1"
                         :required="true"
                         class="valid-class"
                         v-model.trim="formData.validCode"
                         text-align="right"
                         placeholder="请输入验证码" >
                    <div slot="right-full-height"
                         class="validate"
                         @click="getValidCode">获取动态码</div>
                </x-input>
            </group>
            <div class="btn-area">
                <x-button @click.native="nextStep">下一步</x-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //表单数据
                formData : {
                    validCode : ''
                }
            }
        },
        methods: {
            /**
             * 获取短信验证码
             */
            getValidCode () {

            },
            /**
             * 保存新手机号
             */
            save () {
            },
            /**
             * 跳转到 下一步
             */
            nextStep () {
                this.$router.replace({
                    name : 'inputPass'
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .change-phone{
        @include block_outline();
        float: left;
        background: rgba(242,243,244,1);

        .area{
            padding-top: 26px;
            @include block_outline($height : 374px);
            background: $color_fff;
        }

        .validate{
            @include block_outline(98px);
            text-align: center;
            font-size: $font_size_12px;
            color: #046FDB;
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 1px solid #e8e8e8;
        }

        /deep/ .weui-label{
            font-size: $font_size_15px;
            color: #4A4A4A;
        }

        /deep/ .weui-input{
            font-size: $font_size_15px;
        }

        /deep/ .weui-cells{
            margin-top: 0;

            &:before{
                display: none;
            }
        }

        /deep/ .weui-cell {
            height: 50px;

            &:nth-of-type(1) .vux-cell-bd{
                padding-right: 10px;
            }

            &:before{
                left: 0;
            }
        }

        .valid-class /deep/ .weui-input{
            padding-right: 10px;
            box-sizing: border-box;
        }

        /deep/ .vux-x-input:nth-last-of-type(1){
            padding-top: 0;
            padding-bottom: 0;
            padding-right: 0;
        }

        /deep/ .vux-x-input-right-full{
            float: right;
            height:50px;
        }

        /deep/ .weui-cell__ft{
            display: flex;
            align-items: center;
        }

        .btn-area{
            @include block_outline(unquote('calc(100% - 55px)'),42px);
            margin: 171px auto 0;

            /deep/ .weui-btn_default{
                background: $color_0073EB;
                font-size: 17px;
                color: $color_fff;
                border-radius: 100px;
                letter-spacing: 5px;
            }
        }
    }
</style>
