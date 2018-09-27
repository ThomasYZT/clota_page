
<!--设置交易密码-->

<template>
    <div class="change-phone">
        <div class="area">
            <group>
                <cell
                    :title="$t('localePhone')"
                    value-align="left"
                    :value="originPhone">
                </cell>
                <x-input :title="$t('validCode')"
                         ref="test1"
                         class="valid-class"
                         v-model.trim="formData.validCode"
                         text-align="right"
                         :placeholder="$t('pleaseInputValidCode')" >
                    <div slot="right-full-height"
                         class="validate"
                         @click="getValidCode">{{$t('getValidCode')}}</div>
                </x-input>
            </group>
            <div class="btn-area">
                <x-button @click.native="nextStep">{{$t('nextStep')}}</x-button>
            </div>
        </div>
    </div>
</template>

<script>
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/api/index.js';
    export default {
        mixins : [lifeCycleMixins],
        data() {
            return {
                //表单数据
                formData : {
                    validCode : ''
                },
                //手机号码
                originPhone : ''
            }
        },
        methods: {
            /**
             * 跳转到 下一步
             */
            nextStep () {
                this.validateCode().then(() => {
                    return  ajax.post('checkCode',{
                        phoneNum : this.originPhone,
                        code : this.formData.validCode
                    }).then(res => {
                        if(res.success){
                            return Promise.resolve();
                        }else{
                            if(res.code === 'A005'){
                                this.$vux.toast.show({
                                    text: '验证码失效',
                                    type : 'text'
                                })
                            }else if(res.code === 'A003'){
                                setTimeout(() =>{
                                    this.$vux.toast.show({
                                        text: '验证码为空',
                                        type : 'text'
                                    })
                                },500);
                            }else{
                                setTimeout(() =>{
                                    this.$vux.toast.show({
                                        text: '验证码错误',
                                        type : 'text'
                                    })
                                },500);
                            }
                            return Promise.reject();
                        }
                    });
                }).then(() => {
                    this.$router.replace({
                        name : 'inputPass',
                        params : {
                            mobile : this.originPhone,
                            code : this.formData.validCode
                        }
                    });
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams(params) {
                if(params && params.mobile){
                    this.originPhone = params.mobile;
                }else{
                    this.$router.push({
                        name : 'personInfo'
                    });
                }
            },
            /**
             * 获取短信验证码
             */
            getValidCode () {
                ajax.post('getCode',{
                    phoneNum : this.originPhone
                }).then(res => {
                    if(res.success){
                        setTimeout(() =>{
                            this.$vux.toast.show({
                                text: '发送成功'
                            })
                        },500);
                    }else{
                        setTimeout(() =>{
                            this.$vux.toast.show({
                                text: '发送失败',
                                type : 'cancel'
                            })
                        },500);
                    }
                });
            },
            /**
             * 校验验证码
             */
            validateCode () {
                return new Promise((resolve,reject) => {
                    if(this.formData && !this.formData.validCode) {
                        this.$vux.toast.show({
                            text: '请输入验证码',
                            type: 'text',
                            width: '5rem'
                        });
                        reject();
                    }else{
                        resolve();
                    }
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
