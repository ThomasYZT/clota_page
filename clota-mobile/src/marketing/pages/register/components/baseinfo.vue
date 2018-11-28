<!--基本信息-->

<template>
    <div class="base-info">
        <div class="head">
            <img class="img-head" src="../../../../assets/images/icon-no-data.svg" alt="">
            <div class="register-tips">您正在注册 <span class="company-name">广州长隆飞鸟乐园</span> 的销售用户</div>
            <div class="belong-type">
                {{$t('colonSetting',{ key : '所属类别' })}}出租车
            </div>
        </div>
        <div class="content">
            <x-input :title="$t('mobile')"
                     class="c-input"
                     v-model.trim="formData.phoneNum"
                     text-align="right"
                     :placeholder="$t('请输入您的手机号')" >
                <div slot="right-full-height"
                     class="validate"
                     :class="{'time-counting' : isTiming}"
                     @click="getValidCode">
                    {{$t('getValidCode')}}
                    <countdown
                        v-if="isTiming"
                        v-model="time"
                        :start="isTiming"
                        @on-finish="timeFinish">
                    </countdown>
                </div>
            </x-input>
            <x-input :title="$t('validCode')"
                     v-model="formData.code"
                     class="c-input"
                     text-align="right"
                     label-width="150px"
                     :placeholder="$t('enterCode')">
            </x-input>
            <x-input :title="$t('登录密码')"
                     v-model="formData.password"
                     class="c-input"
                     text-align="right"
                     type="password"
                     label-width="150px"
                     :placeholder="$t('inputField',{ field : $t('登录密码') })">
            </x-input>
        </div>
        <x-button class="button"
                  @click.native="next">{{$t('下一步')}}</x-button>
        <div class="to-login">
            {{$t('已有账号')}}<span class="login-label">去登陆</span>
        </div>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import { validator } from 'klwk-ui';
	export default {
		data () {
			return {
                //表单数据
                formData : {
                    //手机号
                    phoneNum : '',
                    //验证吗
                    code : '',
                    //登录密码
                    password : ''
                },
                //是否正在计时
                isTiming : false,
                //计时时间
                time : 60
            };
		},
		methods : {
            /**
             * 获取手机号验证码
             */
            getValidCode () {
                if (!this.isTiming) {
                    this.validatePhone().then(() => {
                        ajax.post('getCode', {
                            phoneNum : this.formData.phoneNum,
                            type : 'member_login',
                        }).then((res) => {
                            if (!res.success) {
                                this.$vux.toast.show({
                                    text : this.$t('operateFail',{ msg : this.$t('send') }),
                                    type : 'cancel'
                                });
                            } else {
                                this.formData.vcode = '';
                                this.isTiming = true;
                                this.$vux.toast.show({
                                    text : this.$t('operateSuc',{ msg : this.$t('send') })
                                });
                            }
                        });
                    });
                }
            },
            /**
             * 计时完成
             */
            timeFinish () {
                this.isTiming = false;
                this.time = 60;
            },
            /**
             * 跳转到下一步
             */
            next () {
                this.validatePhone().then(() => {
                    return this.validateCode();
                }).then(() =>{
                    return this.validatePassword();
                }).then(() => {
                    this.$emit('get-formData',this.formData);
                });
            },/**
             * 校验手机号是否正确
             * @return{Function} 校验结果
             */
            validatePhone () {
                return new Promise((resolve,reject) => {
                    if (this.formData.phoneNum === '') {
                        this.$vux.toast.text(this.$t('pleaseEnterMobile'));
                        reject();
                    } else {
                        if (!validator.isMobile(this.formData.phoneNum)) {
                            this.$vux.toast.text(this.$t('pleaseEnterRightMobile'));
                            reject();
                        } else {
                            resolve();
                        }
                    }
                });
            },
            /**
             * 校验验证码
             * @return {Promise<any>}
             */
            validateCode () {
                return new Promise((resolve,reject) => {
                    if (this.formData.code === '') {
                        this.$vux.toast.text(this.$t('pleaseInputValidCode'));
                        reject();
                    } else {
                        resolve();
                    }
                });
            },
            /**
             * 校验登录密码
             * @return {Promise<any>}
             */
            validatePassword () {
                return new Promise((resolve,reject) => {
                    if (this.formData.password === '') {
                        this.$vux.toast.text(this.$t('inputField',{ field : this.$t('登录密码') }));
                        reject();
                    } else {
                        let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/;
                        if (reg.test(this.formData.password)) {
                            resolve();
                        } else {
                            this.$vux.toast.text(this.$t('errorPwdRule'));
                            reject();
                        }
                    }
                });
            }
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .base-info{

        .head{
            @include block_outline($height : 160px);
            background: $color_fff;
            padding-top: 19px;
            text-align: center;

            .img-head{
                display: inline-block;
                @include block_outline(53px,53px);
                background: red;
                border-radius: 27px;
                background-size: 100% 100%;
            }

            .register-tips{
                height: 20px;
                line-height: 20px;
                margin-top: 21px;
                font-size: $font_size_14px;
                color: $color_333;

                .company-name{
                    color: $color_yellow;
                }
            }

            .belong-type{
                height: 18px;
                line-height: 18px;
                font-size: $font_size_13px;
                color: $color_333;
                margin-top: 7px;
            }
        }

        .content{
            margin-top: 8px;
            background: $color_fff;

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

                &.time-counting{
                    color: #C5C5C5;
                }
            }
        }

        /deep/ .weui-btn{
            margin-top: 68px;
        }

        .to-login{
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
</style>
