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
                 :placeholder="$t('pleaseInput',{field : this.$t('mobile') })"
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
                 disabled="isGetCode"
                 @click="getCode">
                <p>{{$t('getValidCode')}}{{this.countDown ? '(' + this.countDown/1000 + ')': ''}}</p>
            </div>
        </x-input>
        <!-- 注册按钮 -->
        <div class="bottom-info">
            <p class="msg">{{msg}}</p>
            <p class="register-entry">
                <span @click="$router.push({path: '/register'})">{{$t('register')}}</span>
            </p>
        </div>
        <!-- 登陆按钮 -->
        <x-button class="button"
                  @click.native="login()">{{$t('login')}}</x-button>
    </div>
</template>

<script>
    import ajax from '../../api/index';
    import {validator} from 'klwk-ui';
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                //输入提示信息
                msg: '',
                //登陆信息
                loginInfo: {
                    phoneNum: '',
                    vcode: ''
                },
                isGetCode: false,
                timer: null,
                //倒计时间
                countDown: null,
                //微信用户信息
                wxUserInfo :{},
                //公司编码
                companyCode : 'C2001'
            }
        },
        methods: {
            /**
             * 获取验证码
             */
            getCode() {
                //先验证是否在60s倒计时内
                if(!this.isGetCode) {
                    //再验证电话号码是否存在
                    this.phoneValidate(() => {
                        this.isGetCode = true;
                        this.timimg();
                        ajax.post('getCode', {
                            phoneNum: this.loginInfo.phoneNum
                        }).then((res) => {
                            if(!res.success) {
                                this.$vux.toast.text(this.$t('getCodeFailed'))
                            }
                        })
                    });
                }
            },
            /**
             * 登陆
             */
            login() {
                this.msg = '';
                this.validate(() => {
                    ajax.post('login', {
                        phoneNum: this.loginInfo.phoneNum,
                        code: this.loginInfo.vcode,
                        companyCode: this.companyCode
                    }).then((res) => {
                        if(res.success) {
                            this.dataToLogin(res);
                        } else if(res.toString() === 'Error: Network Error'){
                            this.$vux.toast.text(this.$t('netNotGood'));
                        }else {
                            this.$vux.toast.text(this.$t(res.code));
                        }
                    })
                });
            },
            /**
             * 验证输入信息
             */
            validate(callback) {
                //手机号验证 验证手机号不为空 且为 手机号格式
                this.phoneValidate(() => {
                    //验证验证码不为空
                    if(this.loginInfo.vcode === '') {
                        this.$vux.toast.text(this.$t('pleaseInputValidCode'));
                    }else{
                        if(callback) {
                            callback();
                        }
                    }
                });
            },
            /**
             * 手机号验证 验证手机号不为空 且为 手机号格式
             * @param callback
             */
            phoneValidate(callback) {
                this.msg = '';
                if(this.loginInfo.phoneNum === '') {
                    this.$vux.toast.text(this.$t('pleaseEnterMobile'));
                } else {
                    if(!validator.isMobile(this.loginInfo.phoneNum)){
                        this.$vux.toast.text(this.$t('pleaseEnterRightMobile'));
                    }else{
                        callback();
                    }
                }
            },
            /**
             * 计时器函数
             */
            timimg() {
                this.countDown = 5000;
                this.timer = setInterval(() => {
                    if(this.countDown !== 0) {
                        this.countDown -= 1000;
                    }else {
                        this.isGetCode = false;
                        this.countDown = null;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            },
            /**
             * 获取路由信息
             * @param route
             */
            getparms (route) {
                let queryParams = this.getUrlString(location.href);
                if(queryParams && queryParams.code){
                    this.getOAuth2UserInfo(queryParams.code);
                }
            },
            /**
             * 获取微信用户信息
             * @param code
             */
            getOAuth2UserInfo (code) {
                ajax.post('getOAuth2UserInfo',{
                    code : code,
                    lang : this.lang,
                    companyCode: this.companyCode
                }).then(res => {
                    if(res.success){
                        this.dataToLogin(res);
                    }else{
                        //错误信息为空，表示获取到了用户信息
                        if(!res.errcode){
                            this.wxUserInfo = res.data ? JSON.parse(res.data) : {};
                        }else{
                            this.wxUserInfo = {};
                        }
                    }
                });
            },
            /**
             * 获取url的参数
             * @param url
             * @returns {Array}
             */
            getUrlString (url) {
                let obj = {};
                if(url.indexOf('?') !== -1){
                    let query = url.split("?")[1];
                    let queryArr = query.split("&");
                    queryArr.forEach(function(item){
                        let key = item.split("=")[0];
                        let value = item.split("=")[1];
                        obj[key] = value;
                    });
                }
                return obj;
            },
            /**
             * 处理登录数据
             * @param res
             */
            dataToLogin (res) {
                //存储token信息
                localStorage.setItem('token', res.data.token);
                //存储用户信息
                localStorage.setItem('userInfo', JSON.stringify(res.data));
                //更新用户信息
                this.$store.commit('updateUserInfo');
                //登陆跳转到主页
                this.$router.push({ name: 'home'});
            }
        },
        beforeRouteEnter(to,from,next){
            next(vm => {
                vm.getparms(to);
            });
        },
        computed :{
            ...mapGetters({
                lang : 'lang'
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    $img_base_url : '../../assets/images/';

    .login {
        margin-top: 15px;
        color: #4A4A4A;
        background: get_url('icon-bg.png');
        background-size: 100% 100%;
        height: 100%;

        .bottom-info {
            display: flex;
            .msg {
                width: 70%;
                margin-left: 14px;
                padding: 10px 0;
                color: #FF8C69;
                font-size: 12px;
                font-style: italic;
            }

            .register-entry {
                width: 30%;
                margin-right: 16.5px;
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

        .validate{
            height: 100%;
            padding: 0 10px;
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



