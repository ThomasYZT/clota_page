<!--
    会员登录
    作者：杨泽涛
-->
<template>
    <div class="login">
        <!-- 手机号码 -->
        <x-input class="c-input"
                 title="手机号码"
                 keyboard="number"
                 v-model="loginInfo.phoneNum"
                 label-width="150px">
        </x-input>
        <!-- 验证码 -->
        <x-input class="c-input verify-input"
                 title="验证码"
                 v-model="loginInfo.vcode"
                 placeholder="输入验证码"
                 :show-clear="false"
                 keyboard="number"
                 label-width="150px">
            <div slot="right"
                 class="code-button"
                 :class="{active: isGetCode}"
                 @click="getCode">
                <p>获取动态码{{this.countDown ? '(' + this.countDown/1000 + ')': ''}}</p>
            </div>
        </x-input>
        <!-- 注册按钮 -->
        <div class="bottom-info">
            <p class="msg">{{msg}}</p>
            <p class="register-entry">
                <span @click="$router.push({path: '/register'})">去注册</span>
            </p>
        </div>
        <!-- 登陆按钮 -->
        <x-button class="button"
                  @click.native="login()">登陆</x-button>
    </div>
</template>

<script>
    import ajax from '../../api/index'
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
                countDown: null
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
                                this.msg = '获取验证码失败！'
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
                        companyCode: '000000071' //冰雪世界
                    }).then((res) => {
                        if(res.success) {
                            //存储token信息
                            sessionStorage.setItem('token', res.data.token);
                            //存储用户信息
                            sessionStorage.setItem('userInfo', JSON.stringify(res.data));
                            //登陆跳转到主页
                            this.$router.push({ name: 'home'});
                        } else if(res.toString() === 'Error: Network Error'){
                            this.$vux.toast.text('网络不好');
                        }else {
                            this.$vux.toast.text(res.message);
                        }
                    })
                });
            },
            /**
             * 验证输入信息
             */
            validate(callback) {
                //手机号验证 验证手机号不为空 且为 手机号格式
                this.phoneValidate();

                //验证验证码不为空
                if(this.loginInfo.vcode === '') {
                    this.msg = "请输入验证码";
                    return;
                }

                if(callback) {
                    callback();
                }
            },
            /**
             * 手机号验证 验证手机号不为空 且为 手机号格式
             * @param callback
             */
            phoneValidate(callback) {
                this.msg = '';
                if(this.loginInfo.phoneNum === '') {
                    this.msg = '请输入手机号码'
                    return;
                } else {
                    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if(!phoneReg.test(this.loginInfo.phoneNum)) {
                        this.msg = "请输入正确的手机号";
                        return;
                    }else {
                        if(callback) {
                            callback();
                        }
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .login {
        margin-top: 15px;
        color: #4A4A4A;

        .verify-input{
            .code-button {
                width: 90px;
            }
        }

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
    }
</style>



