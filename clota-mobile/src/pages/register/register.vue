<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="register">
        <x-input :title="$t('name')"
                 class="c-input"
                 label-width="150px"
                 v-model="registerInfo.custName"></x-input>
        <x-input :title="$t('mobile')"
                 v-model="registerInfo.phoneNum"
                 class="c-input"
                 keyboard="number"
                 label-width="150px"></x-input>
        <x-input :title="$t('validCode')"
                 v-model="registerInfo.vcode"
                 :placeholder="$t('pleaseInputValidCode')"
                 class="c-input verify-input"
                 :show-clear="false"
                 keyboard="number"
                 label-width="150px">
            <div slot="right"
                 class="code-button"
                 :class="{active: isGetCode}"
                 :disabled="true"
                 @click="getCode()">
                <p>{{$t('getValidCode')}}{{this.countDown ? '(' + this.countDown/1000 + ')': ''}}</p>
            </div>
        </x-input>
        <div>
            <popup-picker :title="$t('sex')"
                          :data="sexList"
                          v-model="registerInfo.gender"
                          @on-change="sexValueChange"
                          class="c-input"
                          :placeholder="$t('pleaseChoose')"></popup-picker>
        </div>
        <p class="msg" v-if="msg != ''">{{msg}}</p>

        <x-button class="button"
                  @click.native="register()">{{$t('getCard')}}</x-button>
        <p class="register-tip" @click="$router.push({name: 'mobileLogin'})">{{$t('hasAccount')}}</p>
    </div>
</template>

<script>
    import ajax from '../../api'
    export default {
        data() {
            return {
                registerInfo: {
                    custName: '',
                    phoneNum: '',
                    gender: [],
                    vcode: ''
                },
                sexList: [['男', '女']],
                msg: '',
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
                            phoneNum: this.registerInfo.phoneNum
                        }).then((res) => {
                           if(!res.success) {
                               this.msg = '获取验证码失败！'
                           }
                        })
                    });
                }

            },
            /**
             * 性别取值更新
             */
            sexValueChange(value) {
                //console.log(value)
            },
            /**
             * 注册会员
             */
            register() {
                this.msg = ''
                //输入验证
                this.validate(() => {
                    ajax.post('registerMember', {
                        name: this.registerInfo.custName,
                        phoneNum: this.registerInfo.phoneNum,
                        code: this.registerInfo.vcode,
                        sex: this.registerInfo.gender[0] === '男' ? 'male' : 'female',
                        companyCode: '000000071' //冰雪世界景区
                    }).then((res) => {
                        if(res.success) {
                            this.$vux.toast.text('注册成功');
                            this.$router.push({name: 'mobileLogin'})
                        }else {
                            this.$vux.toast.text(res.message);
                        }
                    })
                });
            },
            /**
             * 输入验证
             */
            validate(callback) {
                //验证姓名不为空
                if(this.registerInfo.custName === '') {
                    this.msg = "请输入姓名";
                    return;
                }

                //验证手机号不为空 且为 手机号格式
                this.phoneValidate()

                //验证验证码不为空
                if(this.registerInfo.vcode === '') {
                    this.msg = "请输入验证码";
                    return;
                }

                //验证性别不为空
                if(this.registerInfo.gender.length == 0) {
                    this.msg = "请选择性别";
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
                if(this.registerInfo.phoneNum === '') {
                    this.msg = '请输入手机号码'
                    return;
                } else {
                    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if(!phoneReg.test(this.registerInfo.phoneNum)) {
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

    .register {
        width: 100%;
        margin-top: 15px;
        color: #4A4A4A;

        .msg {
            margin-left: 14px;
            padding: 10px 0;
            color: #FF8C69;
            font-size: 12px;
            font-style: italic;
        }

        .register-tip {
            margin-top: 14px;
            font-size: 14px;
            color: #8395A7;
            text-align: center;
        }

        /deep/ .weui-cell.vux-tap-active.weui-cell_access {
            height: 100% !important;
        }
    }
</style>
