
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
                         :class="{active: isGetCode}"
                         @click="getValidCode">
                        {{$t('getValidCode')}}
                        <countdown v-model="time"
                                   @on-finish="countFinish"
                                   :start="isCountStart"
                                   v-show="isCountStart">
                        </countdown>
                    </div>
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
    import { mapGetters } from 'vuex';
    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //表单数据
                formData : {
                    validCode : ''
                },
                //手机号码
                originPhone : '',
                //倒计时间
                time : 60,
                //是否获取验证码
                isGetCode : false,
                //是否开始计时
                isCountStart : false
            };
        },
        methods : {
            /**
             * 跳转到 下一步
             */
            nextStep () {
                this.validateCode().then(() => {
                    return ajax.post('checkCode',{
                        phoneNum : this.originPhone,
                        code : this.formData.validCode,
                        type : 'member_mod_trade_password'
                    }).then(res => {
                        if (res.success) {
                            return Promise.resolve();
                        } else {
                            if (res.code === 'A005') {
                                this.$vux.toast.show({
                                    text : this.$t('A005'),
                                    type : 'text'
                                });
                            } else {
                                setTimeout(() =>{
                                    this.$vux.toast.show({
                                        text : this.$t('A003'),
                                        type : 'text'
                                    });
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
            getParams (params) {
                if (params && params.mobile) {
                    this.originPhone = params.mobile;
                } else {
                    this.$router.push({
                        name : 'personInfo'
                    });
                }
            },
            /**
             * 获取短信验证码
             */
            getValidCode () {
                //先验证是否在60s倒计时内
                if (!this.isGetCode) {
                    ajax.post('getCode',{
                        phoneNum : this.originPhone,
                        type : 'member_mod_trade_password',
                        companyCode : this.companyCode
                    }).then(res => {
                        if (res.success) {
                            this.isGetCode = true;
                            this.isCountStart = true;
                            setTimeout(() =>{
                                this.$vux.toast.show({
                                    text : this.$t('operateSuc',{ msg : this.$t('send') })
                                });
                            },500);
                        } else {
                            setTimeout(() =>{
                                this.$vux.toast.show({
                                    text : this.$t('operateFail',{ msg : this.$t('send') }),
                                    type : 'cancel'
                                });
                            },500);
                        }
                    });
                }

            },
            /**
             *  倒计时结束
             */
            countFinish () {
                this.time = 60;
                this.isGetCode = false;
                this.isCountStart = false;
            },
            /**
             * 校验验证码
             */
            validateCode () {
                return new Promise((resolve,reject) => {
                    if (this.formData && !this.formData.validCode) {
                        this.$vux.toast.show({
                            text : this.$t('pleaseInput',{ field : this.$t('validCode') }),
                            type : 'text',
                            width : '5rem'
                        });
                        reject();
                    } else {
                        resolve();
                    }
                });
            }
        },
        computed : {
            ...mapGetters({
                companyCode : 'companyCode'
            })
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .change-phone{
        height: 100%;
        @include block_outline();
        float: left;
        background: rgba(242,243,244,1);

        .area{
            @include block_outline($height : 100%);
            background: $color_fff;

            /deep/ .vux-cell-align-left,
            /deep/ .vux-label{
                color: #353B48;
                font-size: 15px;
            }
        }

        .validate{
            height: 100%;
            padding: 0 10px;
            text-align: center;
            font-size: $font_size_12px;
            color: #046FDB;
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 1px solid #e8e8e8;
        }

        .active {
            color: gray;
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
        /deep/ .weui-cell__bd.weui-cell__primary {
            padding-right: 20px;
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
