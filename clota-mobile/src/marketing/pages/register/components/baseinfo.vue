<!--基本信息-->

<template>
    <div class="base-info">
        <div class="head">
            <img class="img-head" src="../../../../assets/images/icon-avator.svg" alt="">
            <div class="register-tips" v-if="!needValidateScene" v-html="$t('registerCompanyMarketing',{ companyName : `<span class='company-name'>${companyName}</span>` })"></div>
            <div class="belong-type" v-if="!needValidateScene">
                {{$t('colonSetting',{ key : $t('belongsToCategory') })}}{{marketTypeName | contentFilter}}
            </div>
        </div>
        <div class="content">
            <popup-radio :title="$t('scenic')"
                         v-if="needValidateScene"
                         class="weui-cells"
                         :options="sceneList"
                         v-model="formData.scene">
                <p slot="popup-header" class="vux-1px-b" :class="[$style.popuTitle]">
                    {{$t('pleaseSelect',{ field : $t('scenic') })}}
                    <span v-if="sceneList.length < 1" :class="$style.noData">{{$t('noData')}}</span>
                </p>
            </popup-radio>
            <popup-radio :title="$t('belongsToCategory')"
                         v-if="needValidateScene"
                         class="weui-cells"
                         :options="typeList"
                         v-model="formData.type">
                <p slot="popup-header" class="vux-1px-b" :class="[$style.popuTitle]">
                    {{$t('pleaseSelect',{ field : $t('belongsToCategory') })}}
                    <span v-if="typeList.length < 1" :class="$style.noData">{{$t('noData')}}</span>
                </p>
            </popup-radio>
            <x-input :title="$t('mobile')"
                     keyboard="number"
                     class="c-input weui-cell"
                     v-model.trim="formData.phoneNum"
                     text-align="right"
                     :placeholder="$t('pleaseInputYourPhoneNumber')" >
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
                     class="c-input weui-cell"
                     keyboard="number"
                     text-align="right"
                     label-width="150px"
                     :placeholder="$t('enterCode')">
            </x-input>
            <x-input :title="$t('loginPass')"
                     v-model="formData.password"
                     class="c-input weui-cell"
                     text-align="right"
                     type="password"
                     label-width="150px"
                     :placeholder="$t('inputField',{ field : $t('loginPass') })">
            </x-input>
        </div>
        <x-button class="button"
                  @click.native="next">{{$t('nextStep')}}</x-button>
        <div class="to-login">
            {{$t('haveAccount')}}<span class="login-label" @click="toLogin">{{$t('toLogin')}}</span>
        </div>
    </div>
</template>

<script>
    import ajax from '@/marketing/api/index';
    import { validator } from 'klwk-ui';
    import { mapGetters } from 'vuex';
	export default {
        props : {
            //景区列表
            'scene-list' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //所属类别
            'type-list' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //是否需要校验景区和所属类别
            'need-validate-scene' : {
                type : Boolean,
                default : false
            }
        },
		data () {
			return {
                //表单数据
                formData : {
                    //手机号
                    phoneNum : '',
                    //验证吗
                    code : '',
                    //登录密码
                    password : '',
                    //景区
                    scene : '',
                    //所属类别
                    type : ''
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
                        ajax.post('market_getPhoneVerificationCode', {
                            phoneNum : this.formData.phoneNum,
                            type : 'maket_register',
                            companyCode : this.companyCode,
                            orgId : this.marketOrgId
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
                this.validateScene().then(() => {
                    return this.validateType();
                }).then(() => {
                    return this.validatePhone();
                }).then(() => {
                    return this.validateCode();
                }).then(() =>{
                    return this.validatePassword();
                }).then(() => {
                    this.validatePhoneCode();
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
                        this.$vux.toast.text(this.$t('inputField',{ field : this.$t('loginPass') }));
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
            },
            /**
             * 跳转到登录页面
             */
            toLogin () {
                this.$router.push({
                    name : 'marketingLogin',
                    query : {
                        companyCode : this.companyCode
                    }
                });
            },
            /**
             * 校验手机验证码是否正确
             */
            validatePhoneCode () {
                ajax.post('market_checkVerifyCode',{
                    mobile : this.formData.phoneNum,
                    code : this.formData.code,
                    companyCode : this.companyCode,
                    type : 'maket_register',
                    orgId : this.marketOrgId
                }).then((res) => {
                    if (res.success) {
                        this.$emit('get-formData',this.formData);
                    } else if (res.code && res.code !== '300') {
                        this.$vux.toast.show({
                            type : 'cancel',
                            text : this.$t(res.code)
                        });
                    } else {
                        this.$vux.toast.show({
                            type : 'cancel',
                            text : this.$t('errorMsg.A003')
                        });
                    }
                });
            },
            /**
             * 校验景区
             */
            validateScene () {
                return new Promise((resolve,reject) => {
                    if (this.needValidateScene) {
                        if (this.formData.scene) {
                            resolve();
                        } else {
                            this.$vux.toast.text(this.$t('pleaseSelect',{ field : this.$t('scenic') }));
                            reject();
                        }
                    } else {
                        resolve();
                    }
                });
            },
            /**
             * 校验所属类别
             */
            validateType () {
                return new Promise((resolve,reject) => {
                    if (this.needValidateScene) {
                        if (this.formData.type) {
                            resolve();
                        } else {
                            this.$vux.toast.text(this.$t('pleaseSelect',{ field : this.$t('belongsToCategory') }));
                            reject();
                        }
                    } else {
                        resolve();
                    }
                });
            }
        },
        computed : {
            ...mapGetters({
                companyName : 'companyName',
                marketTypeName : 'marketTypeName',
                companyCode : 'companyCode',
                marketOrgId : 'marketOrgId',
            })
        },
        watch : {
            //所属景区改变，重新获取所属类别
            'formData.scene' (newVal) {
                this.$emit('fresh-type',newVal);
                this.formData.type = '';
                this.$store.commit('marketUpdateOrgId',newVal);
            },
            'formData.type' (newVal) {
                this.$store.commit('marketUpdateTypeId',newVal);
            }
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .base-info{

        .head{
            background: $color_fff;
            padding: 20px 0;
            text-align: center;

            .img-head{
                display: inline-block;
                @include block_outline(53px,53px);
                border-radius: 27px;
                background-size: 100% 100%;
            }

            .register-tips{
                height: 20px;
                line-height: 20px;
                margin-top: 21px;
                font-size: $font_size_14px;
                color: $color_333;

                /deep/ .company-name{
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

            /deep/ .weui-cell:before{
                display: none;
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

    /deep/ .weui-cell{
        height: 50px;
    }
</style>
<style module>
    .popuTitle {
        width: 100%;
        text-align: center;
        padding: 8px 0;
        color: #888;
    }
    .noData{
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333333;
    }
</style>
