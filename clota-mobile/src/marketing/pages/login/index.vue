<!--登录-->

<template>
    <div class="login">
        <div class="login-bg">
            <img src="../../../assets/images/icon-login-bg.png" alt="">
        </div>
        <div class="input-wrap">
            <div class="company-name">
                {{companyName}}
            </div>
            <div class="system-name">{{$t('全民营销系统')}}</div>
            <div class="content">
                <x-input :title="$t('mobile')"
                         v-model="formData.phoneNum"
                         class="c-input"
                         text-align="right"
                         label-width="150px"
                         :placeholder="$t('请输入您的手机号')" >
                </x-input>
                <x-input :title="$t('登录密码')"
                         v-model="formData.password"
                         class="c-input"
                         text-align="right"
                         type="password"
                         label-width="150px"
                         :placeholder="$t('inputField',{ field : $t('登录密码') })">
                </x-input>
                <x-input :title="$t('validCode')"
                         v-if="showValidateCode"
                         v-model="formData.code"
                         class="c-input"
                         type="password"
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
                    <span class="label" @click="toResetPass">{{$t('忘记密码')}}</span>
                </div>
                <x-button class="button"
                          :disabled="!marketINgCompanyCode || !companyName"
                          @click.native="login">{{$t('login')}}</x-button>
                <div class="to-register">
                    {{$t('没有账号?')}}<span class="login-label" @click="toRegister">去注册</span>
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
                    //所属类别
                    type : '出租车',
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
                }
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
                    this.queryUserType();
                    // ajax.post('market_login',{
                    //     mobile : this.formData.phoneNum,
                    //     password : MD5(this.formData.password).toString(),
                    //     typeId : this.marketTypeId,
                    //     orgId : this.marketOrgId,
                    //     levelId : this.marketLevelId,
                    // }).then(res => {
                    //     if (res.success) {
                    //         this.$store.commit('marketUpdateToken',res.data);
                    //         this.$store.dispatch('marketGetUserInfo').then(() => {
                    //             this.$router.push({
                    //                 name : 'marketingProduct'
                    //             });
                    //         });
                    //         sessionStorage.setItem('loginErr',0);
                    //     } else if (res.code && res.code !== '300') {
                    //         this.$vux.toast.show({
                    //             text : this.$t('errorMsg.' + res.code),
                    //             type : 'cancel'
                    //         });
                    //         this.setLoginErrNum();
                    //     } else {
                    //         this.$vux.toast.show({
                    //             text : this.$t('operateFail',{ msg : this.$t('login') }),
                    //             type : 'cancel'
                    //         });
                    //         this.setLoginErrNum();
                    //     }
                    // });
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
                        this.$vux.toast.text(this.$t('inputField',{ field : this.$t('登录密码') }));
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
                        this.$store.commit('marketUpdateCompanyName',res.data ? res.data.orgName : '');
                        this.$store.commit('marketUpdateOrgId',res.data ? res.data.orgId : '');
                        this.$store.commit('marketUpdatOrgAddress',res.data ? res.data.orgAddress : '');
                    } else if (res.code && res.code !== '300') {
                        this.$store.commit('marketUpdateCompanyName','');
                        this.$store.commit('marketUpdateOrgId','');
                        this.$store.commit('marketUpdatOrgAddress','');
                        this.$vux.toast.show({
                            text : this.$t('errorMsg.' + res.code),
                            type : 'cancel'
                        });
                    } else {
                        this.$store.commit('marketUpdateCompanyName','');
                        this.$store.commit('marketUpdateOrgId','');
                        this.$store.commit('marketUpdatOrgAddress','');
                    }
                }).finally(() => {
                    this.$store.commit('marketUpdateCompanyCode',orgCode);
                });
            },
            /**
             * 获取路由参数
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.queryOrgInfo(params.companyCode);
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
                    orgId : this.marketOrgId,
                    imgkey : this.imgCodeImfo.key,
                    imgCode : this.imgCodeImfo.code
                }).then(res => {
                    if (!res.success && res.code === 'MK013') {
                        this.userTypeList = res.data ? res.data.map(item => {
                            return {
                                key : item.id,
                                value : item.typeName
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
                    } else {
                        if (res.data && res.data.length === 1) {
                            this.$store.commit('marketUpdateTypeId',res.data[0]['id']);
                            this.$store.commit('marketUpdateTypeName',res.data[0]['typeName']);
                            this.loginWithType();
                        } else {
                            this.$vux.toast.show({
                                text : this.$t('operateFail',{ msg : this.$t('login') }),
                                type : 'cancel'
                            });
                        }
                        this.setLoginErrNum();
                    }
                });
            },
            /**
             * 选择了所属类别，然后登录
             * @param{String} typeId 营销类别id
             */
            toLogin (typeId) {
                this.$store.commit('marketUpdateTypeId',typeId);
                this.$store.commit('marketUpdateTypeName',this.userTypeList.filter(item => item.id === typeId)['typeName']);
                this.loginWithType();
            },
            /**
             * 开始登录
             */
            loginWithType () {
                ajax.post('market_login',{
                    mobile : this.formData.phoneNum,
                    password : MD5(this.formData.password).toString(),
                    typeId : this.marketTypeId,
                    orgId : this.marketOrgId,
                    imgkey : this.imgCodeImfo.key,
                    imgCode : this.imgCodeImfo.code
                }).then(res => {
                    if (res.success) {
                        this.$store.commit('marketUpdateToken',res.data);
                        this.$store.dispatch('marketGetUserInfo').then(() => {
                            this.$router.push({
                                name : 'marketingProduct'
                            });
                        });
                        sessionStorage.setItem('loginErr',0);
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
                ajax.post('market_createIMGValidCode').then(res => {
                    if (res.success) {
                        this.imgCodeImfo.code = res.data ? 'data:img/jpg;base64,' + res.data.code : '';
                        this.imgCodeImfo.key = res.data ? res.data.key : '';
                    } else {
                        this.imgCodeImfo.code = '';
                        this.imgCodeImfo.key = '';
                    }
                });
            }
        },
        computed : {
            ...mapGetters({
                companyName : 'companyName',
                marketOrgId : 'marketOrgId',
                marketTypeId : 'marketTypeId',
                marketINgCompanyCode : 'marketINgCompanyCode',
            })
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams(to.query);
            });
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

                    .login-label{
                        color: $color_blue;
                    }
                }
            }
        }
    }
</style>
