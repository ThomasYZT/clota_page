<!--
    会员登录
    作者：杨泽涛
-->
<template>
    <div class="login">
        <!-- 手机号码 -->
        <x-input class="c-input"
                 :title="$t('mobile')"
                 keyboard="number"
                 text-align="right"
                 :placeholder="$t('pleaseInput',{field : $t('mobile') })"
                 v-model.trim="loginInfo.phoneNum"
                 label-width="150px">
        </x-input>
        <!-- 验证码 -->
        <x-input class="c-input verify-input"
                 :title="$t('validCode')"
                 v-model.trim="loginInfo.vcode"
                 :placeholder="$t('enterCode')"
                 :show-clear="false"
                 text-align="right"
                 keyboard="number"
                 label-width="150px">
            <div slot="right-full-height"
                 class="validate"
                 :class="{active: isGetCode}"
                 @click="getCode">
                <p>{{$t('getValidCode')}}{{countDown ? '(' + countDown/1000 + ')': ''}}</p>
            </div>
        </x-input>
        <!-- 注册按钮 -->
        <div class="bottom-info">
            <p class="msg">
                <span @click="activateCard">{{$t('activateMemberCard')}}</span>
            </p>
            <p class="register-entry" v-if="hasRegister">
                <!-- 注册入口暂时屏蔽 -->
                <span @click="toRegister()">{{$t('register')}}</span>
            </p>
        </div>
        <!-- 登录按钮 -->
        <x-button class="button"
                  @click.native="login()">
            {{$t('login')}}
        </x-button>
        <!-- 购买会员卡 -->
        <div class="entry-wrapper">
            <span @click="buyMemberCard">{{$t('buyMemberCard')}}</span>
        </div>
    </div>
</template>

<script>
    import ajax from '@/member/api/index.js';
    import { validator } from 'klwk-ui';
    import { mapGetters, mapMutations, mapActions } from 'vuex';

    export default {
        data () {
            return {
                //登录信息
                loginInfo : {
                    //手机号
                    phoneNum : '',
                    //验证码
                    vcode : ''
                },
                //当前是否正在获取验证码
                isGetCode : false,
                //定时器
                timer : null,
                //倒计时间
                countDown : null,
                //微信用户信息
                wxUserInfo : {},
                //微信openid
                openId : '',
                //是否有注册入口
                hasRegister : false,
            };
        },
        computed : {
            ...mapGetters({
                lang : 'lang',
                companyCode : 'companyCode',
            })
        },
        methods : {
            ...mapMutations([
                'updateUserInfo',
                'updateCardInfoList',
                'updateCardInfo',
            ]),
            ...mapActions([
                'getCardListInfo'
            ]),
            /**
             * 获取验证码
             */
            getCode () {
                //先验证是否在60s倒计时内
                if (!this.isGetCode) {
                    //再验证电话号码是否存在
                    this.phoneValidate(() => {
                        ajax.post('getCode', {
                            phoneNum : this.loginInfo.phoneNum,
                            type : 'member_login',
                            companyCode : this.companyCode
                        }).then((res) => {
                            if (!res.success) {
                                if (res.message && res.message === 'M045') {
                                    this.$vux.toast.show({
                                        text : this.$t(res.message),
                                        type : 'cancel',
                                    });
                                    this.$router.push({
                                        name : 'mobileRegister'
                                    });
                                } else if (res.message && (res.message === 'M049' || res.message === 'M050' || res.message === 'M051')) {
                                    this.$vux.toast.show({
                                        text : this.$t(res.message),
                                        type : 'cancel',
                                    });
                                } else {
                                    this.$vux.toast.show({
                                        text : this.$t('operateFail',{ msg : this.$t('send') }),
                                        type : 'cancel'
                                    });
                                }
                            } else {
                                this.loginInfo.vcode = '';
                                this.timimg();
                                this.isGetCode = true;
                                this.$vux.toast.show({
                                    text : this.$t('operateSuc',{ msg : this.$t('send') }),
                                    type : 'success'
                                });
                            }
                        });
                    });
                }
            },
            /**
             * 登录
             */
            login () {
                this.validate(() => {
                    ajax.post('login', {
                        phoneNum : this.loginInfo.phoneNum,
                        code : this.loginInfo.vcode,
                        companyCode : this.companyCode,
                        openId : this.wxUserInfo.openId ? this.wxUserInfo.openId : this.openId,
                    }).then((res) => {
                        if (res.success) {
                            this.dataToLogin(res);
                        } else if (res.code === '300') {
                            this.$vux.toast.text(this.$t('operateFail',{ msg : this.$t('login') }));
                        } else {
                            this.$vux.toast.text(this.$t(res.code));
                        }
                    });
                });
            },
            /**
             * 验证输入信息
             * @param{Function} callback 校验成功的回调函数
             */
            validate (callback) {
                //手机号验证 验证手机号不为空 且为 手机号格式
                this.phoneValidate(() => {
                    //验证验证码不为空
                    if (this.loginInfo.vcode === '') {
                        this.$vux.toast.text(this.$t('pleaseInputValidCode'));
                    } else {
                        if (callback) {
                            callback();
                        }
                    }
                });
            },
            /**
             * 手机号验证 验证手机号不为空 且为 手机号格式
             * @param{Function} callback 回调函数
             */
            phoneValidate (callback) {
                if (this.loginInfo.phoneNum === '') {
                    this.$vux.toast.text(this.$t('pleaseEnterMobile'));
                } else {
                    if (!validator.isMobile(this.loginInfo.phoneNum)) {
                        this.$vux.toast.text(this.$t('pleaseEnterRightMobile'));
                    } else {
                        callback();
                    }
                }
            },
            /**
             * 计时器函数
             */
            timimg () {
                this.countDown = 60000;
                this.timer = setInterval(() => {
                    if (this.countDown !== 0) {
                        this.countDown -= 1000;
                    } else {
                        this.isGetCode = false;
                        this.countDown = null;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000);
            },
            /**
             * 获取路由信息
             */
            getparms () {
                let queryParams = this.getUrlString(location.href);
                if (queryParams && queryParams.code) {
                    this.getOAuth2UserInfo(queryParams.code);
                }
                if (queryParams && queryParams.openId) {
                    this.openId = queryParams.openId;
                }
            },
            /**
             * 获取微信用户信息
             * @param{String} code 微信回调code
             */
            getOAuth2UserInfo (code) {
                ajax.post('getOAuth2UserInfo',{
                    code : code,
                    lang : this.lang,
                    companyCode : this.companyCode
                }).then(res => {
                    if (res.success) {
                        this.dataToLogin(res);
                    } else {
                        //错误信息为空，表示获取到了用户信息
                        if (!res.errcode) {
                            this.wxUserInfo = res.data ? res.data : {};
                            //存储token信息
                            localStorage.setItem('wxUserInfo', JSON.stringify(this.wxUserInfo));
                        } else {
                            this.wxUserInfo = {};
                        }
                    }
                });
            },
            /**
             * 获取url的参数
             * @param{String} url url地址
             * @returns {Array} query参数
             */
            getUrlString (url) {
                let obj = {};
                if (url.indexOf('?') !== -1) {
                    let query = url.split("?")[1];
                    let queryArr = query.split("&");
                    queryArr.forEach(function (item) {
                        let key = item.split("=")[0];
                        let value = item.split("=")[1];
                        obj[key] = value;
                    });
                }
                return obj;
            },
            /**
             * 处理登录数据
             * @param{Object} res 返回的用户信息
             */
            dataToLogin (res) {
                localStorage.clear();
                //存储token信息
                localStorage.setItem('token', res.data.token);
                //存储本地、vuex用户信息
                this.updateUserInfo(res.data);
                //获取用卡列表信息
                this.getCardList();
            },
            /**
             * 跳到注册界面
             */
            toRegister () {
                this.$router.replace({
                    name : 'mobileRegister'
                });
            },
            /**
             * 前往激活会员卡
             */
            activateCard () {
                this.$router.push({
                    name : 'activateCard'
                });
            },
            /**
             * 前往购买会员卡
             */
            buyMemberCard () {

            },
            /**
             * 获取会员卡列表
             */
            getCardList () {
                //获取会员卡列表
                this.getCardListInfo().then(() => {
                    this.$router.replace({ name : 'home' });
                }).catch(err => {
                    if (err === 'serviceError') {
                        this.$vux.toast.text(this.$t('companyHasNotMemberService'));
                    }
                });
            },
            checkCardLevelOfGrowth () {
                ajax.post('checkCardLevelOfGrowth', {
                    companyCode : this.companyCode,
                }).then((res) => {
                    if (res.success) {
                        if (res.data) {
                            this.hasRegister = true;
                        } else {
                            this.hasRegister = false;
                        }
                    } else {
                        this.hasRegister = false;
                    }
                })
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getparms(to);
                vm.checkCardLevelOfGrowth();
            });
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    $img_base_url : '../../../assets/images/';

    .login {
        padding: 10px 0;
        color: #4A4A4A;
        background: get_url('icon-bg.png');
        background-size: 100% 100%;
        height: 100%;

        .bottom-info {
            display: flex;
            .msg {
                flex: 1 0;
                padding: 10px 12.5px;
                color: #046FDB;
                font-size: 12.5px;
            }

            .register-entry {
                flex: 1 0;
                padding-right: 16.5px;
                color: #046FDB;
                height: 50.5px;
                line-height: 50.5px;
                font-size: 12.5px;
                text-align: right;
            }
        }

        .code-button{
            padding: 0 10px;
        }

        .entry-wrapper {
            margin-top: 14px;
            text-align: center;
            span {
                color: $color_333;
                font-size: 13px;
            }
        }

        .validate{
            height: 100%;
            padding: 0 15px 0 18px;
            text-align: center;
            font-size: $font_size_12px;
            color: #046FDB;
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 1px solid #F5F5F5;

            &.time-counting{
                color: #C5C5C5;
            }
        }

        /deep/ .vux-x-input-right-full{
            height: 50px;
        }

        /deep/ .weui-cell__primary{
            padding-right: 10px;
        }

        /deep/ .weui-label{
            font-size: $font_size_15px;
        }

        /deep/ .weui-input{
            font-size: $font_size_15px;
        }
    }
</style>


