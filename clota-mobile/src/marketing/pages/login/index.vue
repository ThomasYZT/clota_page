<!--登录-->

<template>
    <div class="login" v-if="showPage">
        <div class="login-bg">
            <img src="../../../assets/images/icon-login-bg.png" alt="">
        </div>
        <div class="input-wrap">
            <div class="company-name">
                {{companyName}}
            </div>
            <div class="system-name">{{$t('marketingSystem')}}</div>
            <div class="content">
                <x-input :title="$t('mobile')"
                         ref="mobile"
                         v-model="formData.phoneNum"
                         class="c-input"
                         text-align="right"
                         label-width="150px"
                         :placeholder="$t('pleaseInputMsg')" >
                </x-input>
                <x-input :title="$t('loginPass')"
                         ref="password"
                         v-model="formData.password"
                         class="c-input"
                         text-align="right"
                         type="password"
                         label-width="150px"
                         :placeholder="$t('pleaseInputMsg')">
                </x-input>
                <x-input :title="$t('validCode')"
                         ref="code"
                         v-if="showValidateCode"
                         v-model="formData.code"
                         class="c-input"
                         text-align="right"
                         label-width="150px"
                         :placeholder="$t('inputField',{ field : $t('validCode') })">
                    <img slot="right-full-height"
                         class="validate"
                         :src="imgCodeImfo.code"
                         alt=""
                         @click="createIMGValidCode">
                </x-input>
                <div class="regret-pass" >
                    <span class="label" @click="toResetPass">{{$t('forgetPass')}}</span>
                </div>
                <x-button class="button"
                          :disabled="!companyCode || !companyName"
                          @click.native="login">{{$t('login')}}</x-button>
                <div class="to-register">
                    {{$t('noAccount')}}<span class="login-label" @click="toRegister">{{$t('toRegister')}}</span>
                </div>
            </div>
        </div>

        <!--选择所属类别-->
        <choose-type v-model="showTypeChosedModal"
                     :type-list="userTypeList"
                     @choose-type="toLogin">
        </choose-type>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ajax from '../../api/index';
    import { validator } from 'klwk-ui';
    import MD5 from 'crypto-js/md5';
    import chooseType from './components/chooseType';

    export default {
        components : {
            chooseType
        },
        data () {
            return {
                //表单信息
                formData : {
                    //手机号
                    phoneNum : '',
                    //登录密码
                    password : '',
                    //验证码
                    code : '',
                },
                //显示验证码
                showValidateCode : false,
                //当前用户所属列表
                userTypeList : [],
                //是否显示选择类别模态框
                showTypeChosedModal : false,
                //图形验证码
                imgCodeImfo : {
                    code : '',
                    key : ''
                },
                //微信用户id
                wxOpenId : '',
                //是否显示页面
                showPage : false
            };
        },
        methods : {
            /**
             * 登录
             */
            login () {
                this.validatePhone().then(() => {
                    return this.validatePassword();
                }).then(() => {
                    return this.validateCode();
                }).then(() => {
                    this.$refs.mobile.blur();
                    this.$refs.password.blur();
                    if (this.$refs.code) {
                        this.$refs.code.blur();
                    }
                    setTimeout(() => {
                        this.queryUserType();
                    },200);
                });
            },
            /**
             * 跳转到注册页面
             */
            toRegister () {
                this.$router.push({
                    name : 'marketingRegister'
                });
            },
            /**
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
             * 校验登录密码
             * @return {Promise<any>}
             */
            validatePassword () {
                return new Promise((resolve,reject) => {
                    if (this.formData.password === '') {
                        this.$vux.toast.text(this.$t('inputField',{ field : this.$t('loginPass') }));
                        reject();
                    } else {
                        resolve();
                    }
                });
            },
            /**
             * 校验验证码
             * @return {Promise<any>}
             */
            validateCode () {
                return new Promise((resolve,reject) => {
                    if (this.showValidateCode) {
                        if (this.formData.code === '') {
                            this.$vux.toast.text(this.$t('pleaseInputValidCode'));
                            reject();
                        } else {
                            resolve();
                        }
                    } else {
                        resolve();
                    }
                });
            },
            /**
             * 跳转到重置密码页面
             */
            toResetPass () {
                this.$router.push({
                    name : 'marketingResetPassword'
                });
            },
            /**
             * 设置登录错误信息
             */
            setLoginErrNum () {
                let countLoginErrNum = sessionStorage.getItem('loginErr') ? Number(sessionStorage.getItem('loginErr')) : 0;
                if (++countLoginErrNum > 3) {
                    this.showValidateCode = true;
                } else {
                    this.showValidateCode = false;
                }
                sessionStorage.setItem('loginErr',countLoginErrNum++);
            },
            /**
             * 获取组织信息
             * @param{String} orgCode 组织code
             */
            queryOrgInfo (orgCode) {
                ajax.post('market_toLoginPage',{
                    orgCode : orgCode
                }).then(res => {
                    if (res.success) {
                        this.$store.commit('marketUpdateCompanyName',res.data ? res.data.companyName : '');
                        this.$store.commit('marketUpdateMarketCompanyId',res.data ? res.data.companyId : '');
                    } else if (res.code && res.code !== '300') {
                        this.$store.commit('marketUpdateCompanyName','');
                        this.$store.commit('marketUpdateMarketCompanyId','');
                        this.$vux.toast.show({
                            text : this.$t('errorMsg.' + res.code),
                            type : 'cancel'
                        });
                    } else {
                        this.$store.commit('marketUpdateCompanyName','');
                        this.$store.commit('marketUpdateOrgId','');
                        this.$store.commit('marketUpdateMarketCompanyId','');
                    }
                }).finally(() => {
                    this.$store.commit('updateCompanyCode',orgCode);
                });
            },
            /**
             * 获取路由参数
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && params.code && this.isWeixin) {
                    this.getOAuth2UserInfo(params.code);
                } else {
                    this.showPage = true;
                }
                if (params && params.companyCode) {
                    this.$store.commit('updateCompanyCode',params.companyCode);
                    this.queryOrgInfo(params.companyCode);
                    this.createIMGValidCode();
                } else if (this.companyCode) {
                    this.queryOrgInfo(this.companyCode);
                    this.createIMGValidCode();
                }
            },
            /**
             * 查询用户所属类别信息
             */
            queryUserType () {
                ajax.post('market_queryUserType',{
                    phone : this.formData.phoneNum,
                    password : MD5(this.formData.password).toString(),
                    orgId : this.marketCompanyId,
                    imgkey : this.imgCodeImfo.key,
                    imgCode : this.imgCodeImfo.code
                }).then(res => {
                    if (!res.success && res.code === 'MK013') {
                        this.userTypeList = res.data ? res.data.map(item => {
                            return {
                                key : item.id,
                                value : item.typeName,
                                orgId : item.orgId,
                                orgAddress : item.orgAddress,
                            };
                        }) : [];
                        if (this.userTypeList.length > 0 ) {
                            this.showTypeChosedModal = true;
                        } else {
                            this.$vux.toast.show({
                                text : this.$t('operateFail',{ msg : this.$t('login') }),
                                type : 'cancel'
                            });
                        }
                    } else if (res.code && res.code !== '100' && res.code !== '300') {
                        this.$vux.toast.show({
                            text : this.$t('errorMsg.' + res.code),
                            type : 'cancel'
                        });
                        this.setLoginErrNum();
                        this.createIMGValidCode();
                    } else {
                        if (res.data && res.data.length === 1) {
                            this.$store.commit('marketUpdateTypeId',res.data[0]['id']);
                            this.$store.commit('marketUpdateTypeName',res.data[0]['typeName']);
                            this.$store.commit('marketUpdateOrgId',res.data[0]['orgId']);
                            this.$store.commit('marketUpdatOrgAddress',res.data[0]['orgAddress']);
                            this.loginWithType();
                        } else {
                            this.$vux.toast.show({
                                text : this.$t('operateFail',{ msg : this.$t('login') }),
                                type : 'cancel'
                            });
                        }
                        this.setLoginErrNum();
                        this.createIMGValidCode();
                    }
                });
            },
            /**
             * 选择了所属类别，然后登录
             * @param{String} typeId 营销类别id
             */
            toLogin (typeId) {
                if (typeId) {
                    let orgInfo = this.userTypeList.find(item => item.key === typeId);
                    this.$store.commit('marketUpdateTypeId',typeId);
                    this.$store.commit('marketUpdateTypeName',orgInfo['value']);
                    this.$store.commit('marketUpdateOrgId',orgInfo['orgId']);
                    this.$store.commit('marketUpdatOrgAddress',orgInfo['orgAddress']);
                    this.loginWithType();
                } else {
                    this.$vux.toast.text(this.$t('chooseMarketingTypes'));
                }
            },
            /**
             * 开始登录
             */
            loginWithType () {
                ajax.postWithoutToken('market_login',{
                    mobile : this.formData.phoneNum,
                    password : MD5(this.formData.password).toString(),
                    typeId : this.marketTypeId,
                    orgId : this.marketOrgId,
                    imgkey : this.imgCodeImfo.key,
                    imgCode : this.imgCodeImfo.code,
                    openId : this.wxOpenId
                }).then(res => {
                    if (res.success) {
                        this.dataToLogin(res.data);
                    } else if (res.code && res.code !== '300') {
                        this.$vux.toast.show({
                            text : this.$t('errorMsg.' + res.code),
                            type : 'cancel'
                        });
                        this.setLoginErrNum();
                    } else {
                        this.$vux.toast.show({
                            text : this.$t('operateFail',{ msg : this.$t('login') }),
                            type : 'cancel'
                        });
                        this.setLoginErrNum();
                    }
                });
            },
            /**
             * 获取图形验证码
             */
            createIMGValidCode () {
                ajax.postWithoutToken('market_createIMGValidCode').then(res => {
                    if (res.success) {
                        this.imgCodeImfo.code = res.data ? 'data:img/jpg;base64,' + res.data.code : '';
                        this.imgCodeImfo.key = res.data ? res.data.key : '';
                    } else {
                        this.imgCodeImfo.code = '';
                        this.imgCodeImfo.key = '';
                    }
                });
            },
            /**
             * 获取微信用户信息
             * @param{String} code 微信回调code
             */
            getOAuth2UserInfo (code) {
                ajax.post('getOAuth2UserInfo',{
                    code : code,
                    lang : this.lang,
                    companyCode : this.companyCode,
                    source : this.sourceInfo
                }).then(res => {
                    if (res.data && res.data.openId) {
                        this.wxOpenId = res.data.openId;
                        this.marketAutoLogin();
                    } else {
                        this.showPage = true;
                    }
                });
            },
            /**
             * 自动登录
             */
            marketAutoLogin () {
                ajax.post('market_autoLogin',{
                    companyCode : this.companyCode,
                    openId : this.wxOpenId
                }).then(res => {
                    if (res.success && res.data) {
                        this.$store.commit('marketUpdatOrgAddress',res.data['orgAddress']);
                        this.dataToLogin(res.data.token);
                    } else {
                        this.showPage = true;
                    }
                });
            },
            /**
             * 获取参数继续登录流程
             * @param{String} token 登录令牌
             */
            dataToLogin (token) {
                this.$store.commit('marketUpdateToken',token);
                this.$store.dispatch('marketGetUserInfo').then(() => {
                    this.$store.dispatch('marketGetLoginData').then(() => {
                        this.$router.replace({
                            name : 'marketingProduct'
                        });
                        sessionStorage.setItem('loginErr',0);
                    });
                });
            }
        },
        computed : {
            ...mapGetters({
                companyName : 'companyName',
                marketOrgId : 'marketOrgId',
                marketTypeId : 'marketTypeId',
                companyCode : 'companyCode',
                marketCompanyId : 'marketCompanyId',
                sourceInfo : 'sourceInfo',
                isWeixin : 'isWeixin',
            })
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams(to.query);
            });
        },
        created () {
            let countLoginErrNum = sessionStorage.getItem('loginErr') ? Number(sessionStorage.getItem('loginErr')) : 0;
            this.showValidateCode = countLoginErrNum >= 3;
            // this.setLoginErrNum();
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .login{
        @include block_outline();
        overflow: auto;
        background: #2c78ee;
        @include padding_place();

        .login-bg{
            @include block_outline($height : 125px);

            img{
                height: 100%;
                margin: 0 auto;
                display: block;
            }
        }

        .input-wrap{
            @include block_outline(unquote('calc(100% - 20px)'),468px);
            margin: 0 auto;
            background: $color_fff;
            box-shadow: 0 5px 15px 0 rgba(0,77,148,0.10);
            border-radius: 5px;
            padding-top: 29px;

            .company-name{
                @include overflow_tip();
                @include block_outline($height : 28px);
                line-height: 28px;
                text-align: center;
                color: $color_333;
                font-size: $font_size_16px;
            }

            .system-name{
                @include block_outline($height : 19px);
                line-height: 19px;
                font-size: $font_size_13px;
                color: $color_999;
                text-align: center;
                margin-top: 7px;
            }

            .content{
                padding: 28px 25px 0;

                /deep/ .vux-x-input{
                    padding-left: 0;
                    padding-right: 0;
                }

                /deep/ .vux-x-input-right-full{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .validate{
                    @include block_outline(70px,29px);
                    padding: 0 10px;
                    text-align: center;
                    font-size: $font_size_12px;
                    color: #046FDB;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .regret-pass{
                    display: inline-block;
                    margin-top: 10px;
                    @include block_outline($height : 17px);
                    text-align: right;

                    .label{
                        color: $color_blue;
                        font-size: $font_size_12px;
                    }
                }

                /deep/ .weui-btn{
                    margin-top: 35px;
                }

                .to-register{
                    margin-top: 10px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    font-size: $font_size_14px;
                    color: #8395A7;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .login-label{
                        color: $color_blue;
                        padding-left: 5px;
                    }
                }
            }
        }

        .button{
            max-width: calc(100% - 15px) !important;
        }
    }
</style>
