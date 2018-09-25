<!--修改手机号码-->

<template>
    <div class="change-phone">
        <div class="phone-img">
        </div>
        <div class="phone-num">当前手机号：18389903830</div>
        <group>
            <x-input
                title="手机号码"
                ref="test"
                :required="true"
                text-align="right"
                :show-clear="false"
                mask="999 9999 9999"
                v-model.trim="formData.mobile"
                placeholder="请输入"
                placeholder-align="right">
            </x-input>
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
            <x-button @click.native="save">保存</x-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //表单数据
                formData : {
                    mobile : '',
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
                console.log(this.$refs.test.validate)
                // this.$refs.test.forceShowError();
                this.$refs.test.blur();
                this.$refs.test1.blur();
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .change-phone{
        @include block_outline();
        padding-top: 24px;
        float: left;

        .phone-img{
            @include block_outline(50px,50px);
            border-radius: 50px;
            background: rgba(47,112,223,0.05);
            margin: 0 auto;
        }

        .phone-num{
            font-size: $font_size_16px;
            color: #353B48;
            text-align: center;
            margin-top: 14px;
            margin-bottom: 30px;
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

            &:before{
                display: none;
            }
        }

        /deep/ .weui-cell:before{
            left: 0;
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
        }

        /deep/ .weui-cell__ft{
            display: flex;
            align-items: center;
        }

        .btn-area{
            @include block_outline(unquote('calc(100% - 55px)'),42px);
            margin: 64px auto 0;

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
