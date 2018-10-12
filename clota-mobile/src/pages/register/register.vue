<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="register">
        <x-input :title="$t('name')"
                 class="c-input"
                 label-width="150px"
                 text-align="right"
                 v-model="registerInfo.custName"></x-input>
        <x-input :title="$t('mobile')"
                 v-model="registerInfo.phoneNum"
                 class="c-input"
                 text-align="right"
                 keyboard="number"
                 label-width="150px"></x-input>
        <x-input :title="$t('validCode')"
                 v-model="registerInfo.vcode"
                 :placeholder="$t('pleaseInputValidCode')"
                 class="c-input verify-input"
                 :show-clear="false"
                 text-align="right"
                 keyboard="number"
                 label-width="150px">
            <div slot="right-full-height"
                 class="validate"
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
    import ajax from '../../api';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import {mapGetters} from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        data() {
            return {
                registerInfo: {
                    custName: '',
                    phoneNum: '',
                    gender: [],
                    vcode: ''
                },
                sexList: [[this.$t('male'), this.$t('female')]],
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
                        ajax.post('getCode', {
                            phoneNum: this.registerInfo.phoneNum,
                            type : 'member_register',
                            companyCode : this.companyCode
                        }).then((res) => {
                           if(!res.success) {
                               this.$vux.toast.show({
                                   text: this.$t('operateFail',{msg : this.$t('send')}),
                                   type : 'cancel'
                               });
                           }else {
                               this.timimg();
                               this.isGetCode = true;
                               this.$vux.toast.show({
                                   text: this.$t('operateSuc',{msg : this.$t('send')})
                               })
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
                this.msg = '';
                //输入验证
                this.validate(() => {
                    ajax.post('registerMember', {
                        openId: this.openId,
                        name: this.registerInfo.custName,
                        phoneNum: this.registerInfo.phoneNum,
                        code: this.registerInfo.vcode,
                        sex: this.registerInfo.gender[0] === this.$t('male') ? 'male' : 'female',
                        companyCode: this.companyCode //冰雪世界景区
                    }).then((res) => {
                        if(res.success) {
                            //存储token信息
                            localStorage.setItem('token', res.data.token);
                            //存储用户信息
                            localStorage.setItem('userInfo', JSON.stringify(res.data));
                            //更新用户信息
                            this.$store.commit('updateUserInfo');
                            //提示注册成功
                            this.$vux.toast.text(this.$t('registSuccess'));
                            //自动登陆跳转到主页
                            this.$router.push({ name: 'home'});
                        } else {
                            this.$vux.toast.text(this.$t(res.code));
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
                    this.$vux.toast.text(this.$t('pleaseEnterName'))
                    return;
                }

                //验证手机号不为空 且为 手机号格式
                this.phoneValidate()

                //验证验证码不为空
                if(this.registerInfo.vcode === '') {
                    this.$vux.toast.text(this.$t('pleaseInputValidCode'))
                    return;
                }

                //验证性别不为空
                if(this.registerInfo.gender.length == 0) {
                    this.$vux.toast.text(this.$t('pleaseEnterSex'))
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
                    this.$vux.toast.text(this.$t('pleaseEnterMobile'))
                    return;
                } else {
                    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if(!phoneReg.test(this.registerInfo.phoneNum)) {
                        this.$vux.toast.text(this.$t('pleaseEnterRightMobile'))
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
                this.countDown = 60000;
                this.timer = setInterval(() => {
                    if(this.countDown !== 0) {
                        this.countDown -= 1000;
                    }else {
                        this.isGetCode = false;
                        this.countDown = null;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000);
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && params.openId){
                    this.openId = params.openId;
                }else{
                    // this.$router.push({
                    //     name: 'login'
                    // });
                }
            },
        },
        computed :{
            ...mapGetters({
                companyCode : 'companyCode'
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    $img_base_url : '../../assets/images/';

    .register {
        height: 100%;
        width: 100%;
        color: #4A4A4A;
        background: get_url('icon-bg.png');
        background-size: 100% 100%;

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

        .validate{
            height: 100%;
            padding: 0 18px;
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
    }
</style>
