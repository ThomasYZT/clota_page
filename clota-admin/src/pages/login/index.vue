<!--登录组件-->

<template>
    <div class="login">
        <div class="company-logo">
            <img src="../../assets/images/icon-logo.svg" alt="" class="logo">
        </div>
        <div class="input-form">
            <div class="com-title">{{$t('companyName')}}</div>
            <Form ref="formValidate"
                  :model="formData"
                  :rules="rules"
                  :label-width="0">
                <!--账号-->
                <FormItem prop="account" class="input-with-icon">
                    <span class="iconfont icon-person"></span>
                    <Input v-model.trim="formData.account"
                           :disabled="logging"
                           style="width: 368px;height: 40px;"
                           :placeholder="$t('account')"
                           @on-enter="login"/>
                </FormItem>
                <!--密码-->
                <FormItem prop="password" class="input-with-icon">
                    <span class="iconfont icon-reset-pass"></span>
                    <Input v-model.trim="formData.password"
                           type="password"
                           :disabled="logging"
                           style="width: 368px"
                           :placeholder="$t('password',{msg : ''})"
                           @on-enter="login"/>
                </FormItem>
                <!--验证码-->
                <FormItem prop="verifyCode" class="password input-with-icon verify-code">
                    <span class="iconfont icon-person "></span>
                    <Input v-model.trim="formData.verifyCode"
                           :disabled="logging"
                           style="width: 368px"
                           :placeholder="$t('verifyCode')"
                           @on-enter="login"/>
                    <img class="verify-img"
                         :src="verifyCode"
                         @click="changeCode">
                </FormItem>
                <!--自动登录-->
                <FormItem class="auto-login">
                    <Checkbox label="Eat" v-model="rememberAccount">{{$t('rememberAccount')}}</Checkbox>
                </FormItem>
                <div class="err-message">
                    <transition name="fade">
                        <span v-if="showErrMessage">{{$t(errMessage)}}</span>
                    </transition>
                </div>
                <FormItem>
                    <Button type="primary"
                            :loading="logging"
                            class="login-btn"
                            @click="login">{{$t(logging ? 'logining' : 'login')}}
                    </Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import { commonFunc } from 'klwk-ui';
    import MD5 from 'crypto-js/md5';
    export default {
        data () {
            return {
                //表单校验规则
                rules : {
                    account : [
                        { required : true, message : this.$t('accountInputError'), trigger : 'blur' }
                    ],
                    password : [
                        { required : true, message : this.$t('passwordInputError'), trigger : 'blur' }
                    ],
                    verifyCode : [
                        { required : true, message : this.$t('verifyCodedInputError'), trigger : 'blur' }
                    ]
                },
                //表单数据
                formData : {
                    //账户
                    account : '',
                    //密码
                    password : '',
                    //验证码
                    verifyCode : ''
                },
                //是否显示错误信息
                showErrMessage : false,
                //错误信息
                errMessage : '',
                //登陆中
                logging : false,
                //记住账号
                rememberAccount : false,
                //验证码地址
                verifyCode : '',
                //验证码key
                verifyKey : '',
            };
        },
        methods : {
            /**
             * 登录
             */
            login () {
                commonFunc.delCookie('Account');
                this.logging = true;
                this.showErrMessage = false;
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.saveAccount();
                        ajax.post('login', {
                            loginName : this.formData.account,
                            password : MD5(this.formData.password).toString(),
                            validateCode : this.formData.verifyCode
                        }, {
                            headers : {
                                validateKey : this.verifyKey,
                            }
                        }).then(res => {
                            if (res.status === 200) {
                                localStorage.setItem('token',res.data.token);
                                localStorage.setItem('userInfo',JSON.stringify({
                                    name : this.formData.account
                                }));
                                this.$store.dispatch('getUserInfo').then(route => {
                                    this.$router.push({
                                        name : route.name
                                    },() => {
                                        this.logging = false;
                                    });
                                }).catch(() => {
                                    this.logging = false;
                                    this.$Message.error(this.$t('账户暂无任何菜单权限，请联系管理员开通菜单权限'));
                                });
                            } else if (res.message === 'User is already login!') {
                                this.errMessage = 'loginError.hasLogined';
                                this.showErrMessage = true;
                                this.changeCode();
                                this.logging = false;
                            } else if (res.message === 'Validate code error!') {
                                this.errMessage = 'loginError.verifyCodeError';
                                this.showErrMessage = true;
                                this.changeCode();
                                this.logging = false;
                            } else if (res.message === 'Loginname or password error!') {
                                this.errMessage = 'accountOPassError';
                                this.showErrMessage = true;
                                this.changeCode();
                                this.logging = false;
                            } else if (res.message === 'User is inactived!') {
                                this.errMessage = 'accountInvalid';
                                this.showErrMessage = true;
                                this.changeCode();
                                this.logging = false;
                            } else {
                                this.errMessage = res.message || 'loginError.accountError';
                                this.showErrMessage = true;
                                this.changeCode();
                                this.logging = false;
                            }
                        }).catch(() => {
                            this.errMessage = 'loginError.serverError';
                            this.showErrMessage = true;
                        });
                    } else {
                        this.logging = false;
                    }
                });
            },
            /**
             * 更改验证码
             */
            changeCode () {
                ajax.get('getValidateCode').then(res => {
                    if (res.status == 200 && res.data) {
                        this.verifyCode = 'data:image/jpeg;base64,' + res.data.base64Code;
                        this.verifyKey = res.data.validateKey || '';
                    }

                });
            },
            /**
             * 记住账号
             */
            saveAccount () {
                if (this.rememberAccount) {
                    localStorage.setItem('account',this.formData.account);
                    localStorage.setItem('rememberAccount','true');
                } else {
                    localStorage.removeItem('account');
                }
            }
        },
        created () {
            if (localStorage.getItem('account')) {
                this.formData.account = localStorage.getItem('account');
            }
            if (localStorage.getItem('rememberAccount') === 'true') {
                this.rememberAccount = true;
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm=> {
                vm.changeCode();
            });
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    $img_base_url: '../../assets/images/';
    .login {
        position: relative;
        @include block_outline();
        background: get_url('icon-login-background.png') 100%/100%;

        .company-logo {
            @include block_outline($height: 93px);
            padding-top: 40px;

            .logo {
                margin-left: 80px;
                @include block_outline(129px, 53px, false);
            }
        }

        .input-form {
            @include center_center();
            /*margin: 154px auto 0 auto;*/

            .input-with-icon {
                position: relative;

                &.verify-code /deep/ .ivu-input {
                    padding-right: 100px;
                }

                .iconfont {
                    z-index: 10;
                    @include absolute_pos(absolute, $top: 13px, $left: 15px);
                    font-size: $font_size_15px;

                    &:before{
                        color: $color_e6;
                    }
                }

                .verify-img {
                    @include absolute_pos(absolute, $top: 5px, $right: 11px);
                    @include block_outline(73px, 30px);
                    cursor: pointer;
                }
            }

            .com-title {
                font-size: $font_size_24px;
                color: $color_333;
                text-align: center;
            }

            .password {
                margin-bottom: 20px !important;
            }

            .auto-login {
                margin-bottom: 20px !important;
            }

            .login-btn {
                @include block_outline(368px, 40px);
                background-image: linear-gradient(90deg, #012F84 0%, #0294D7 100%);
                box-shadow: 0 4px 8px 0 rgba(40, 84, 166, 0.20);
                border-radius: 4px;
                font-size: $font_size_16px;
                color: $color_fff;
                line-height: 28px;
            }

            .err-message {
                @include block_outline($height: 18px);
                line-height: 18px;
                color: $color_err;
                font-size: $font_size_12px;
                text-align: center;
                margin-bottom: 12px;
            }

            /deep/ .ivu-input {
                height: 40px;
                padding-left: 40px;
                font-size: $font_size_16px;
            }

            /deep/ .ivu-form {
                margin-top: 35px;
            }

            /deep/ .ivu-checkbox-wrapper {
                font-size: $font_size_14px;
                color: $color_000_065;

                .ivu-checkbox {
                    margin-right: 8px;
                }
            }
        }
    }
</style>
