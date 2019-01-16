<!--设置收款账户-->

<template>
    <div class="set-deposit-account">
        <div class="hr" v-if="stage === 1"></div>
        <div v-else class="warning-tips">{{$t('为保障您的资金安全，变更收款账户需要进行短信验证')}}</div>
        <group>
            <!-- 账户类型 -->
            <!--<x-input-->
                <!--v-show="stage === 1"-->
                <!--:title="$t('收款账户类型')"-->
                <!--text-align="right"-->
                <!--:placeholder="$t('pleaseInputMsg')"-->
                <!--:show-clear="false"-->
                <!--v-model.trim="formData.accountType"-->
                <!--placeholder-align="right">-->
            <!--</x-input>-->
            <popup-radio v-show="stage === 1"
                         :title="$t('收款账户类型')"
                         :options="accountTypeList"
                         v-model="formData.accountType">
            </popup-radio>
            <x-input
                v-show="stage === 1 && formData.accountType === 'other'"
                :title="$t('请输入收款账户类型')"
                text-align="right"
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                v-model.trim="formData.otherAccountType"
                placeholder-align="right">
            </x-input>
            <!-- 收款人姓名 -->
            <x-input
                v-show="stage === 1"
                :title="$t('收款人姓名')"
                text-align="right"
                disabled
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                v-model.trim="formData.name"
                placeholder-align="right">
            </x-input>
            <!-- 收款账户 -->
            <x-input
                v-show="stage === 1"
                :title="$t('收款账户')"
                text-align="right"
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                v-model.trim="formData.account"
                placeholder-align="right">
            </x-input>
            <!--短信验证码-->
            <x-input :title="$t('短信验证码')"
                     v-show="stage === 2"
                     v-model.trim="formData.code"
                     text-align="right"
                     :placeholder="$t('pleaseInputMsg')" >
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
        </group>
        <x-button class="button"
                  @click.native="save">{{$t('下一步')}}</x-button>
        <confirm v-model="confirmShow"
                 v-transfer-dom
                 :title="$t('提示')"
                 :show-cancel-button="false"
                 :confirm-text="$t('立即返回')"
                 @on-confirm="onConfirm">
            <p style="text-align:center;">{{ $t('设置成功，5S后返回。') }}</p>
        </confirm>
    </div>
</template>

<script>
    import ajax from '@/marketing/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //设置成功提示框是否显示
                confirmShow : false,
                //表单数据
                formData : {
                    //账户类别
                    accountType : '',
                    // 收款人姓名
                    name : '',
                    //收款账户
                    account : '',
                    //验证码
                    code : '',
                    //其它账户类型
                    otherAccountType : ''
                },
                //计时时间
                time : 60,
                //当前阶段
                stage : 1,
                //是否正在计时
                isTiming : false,
                //当前手机号
                mobile : '',
                //定时器
                timer : '',
                //收款账户类型列表
                accountTypeList : [
                    //微信支付
                    {
                        key : 'wxPay',
                        value : this.$t('微信')
                    },
                    //支付宝支付
                    {
                        key : 'aliPay',
                        value : this.$t('支付宝')
                    },
                    //其它
                    {
                        key : 'other',
                        value : this.$t('other')
                    }
                ]
            };
        },
        methods : {
            /**
             * 保存收款账户信息
             */
            save () {
                if (this.stage === 1) {
                    this.validateAccountType().then(() => {
                        return this.validateName();
                    }).then(() => {
                        return this.validateAccount();
                    }).then(() => {
                        this.stage = 2;
                    });
                } else if (this.stage === 2) {
                    this.validateCode().then(() => {
                        this.validatePhoneCode();
                    });
                }
            },
            /**
             * 校验收款账户类型
             * @return{Function} promise函数
             */
            validateAccountType () {
                return new Promise((resolve,reject) => {
                    if (this.formData && this.formData.accountType && this.formData.accountType !== 'other') {
                        resolve();
                    } else if (this.formData && this.formData.accountType && this.formData.accountType === 'other') {
                        if (this.formData.otherAccountType) {
                            if (this.formData.otherAccountType.length > 50) {
                                this.$vux.toast.text(this.$t('errorMaxLength',{ field : this.$t('收款账户类型'),length : 50 }));
                            } else {
                                resolve();
                            }
                        } else {
                            this.$vux.toast.text(this.$t('pleaseInput',{ field : this.$t('收款账户类型') }));
                            reject();
                        }
                    } else {
                        this.$vux.toast.text(this.$t('pleaseInput',{ field : this.$t('收款账户类型') }));
                        reject();
                    }
                });
            },
            /**
             * 校验姓名
             * @return {Promise<any>}
             */
            validateName () {
                return new Promise ((resolve,reject) => {
                    if (this.formData && this.formData.name ) {
                        if (this.formData.name.length > 20) {
                            this.$vux.toast.text(this.$t('maxLengthErr',{ field : this.$t('收款人姓名'),length : 20 }));
                            reject();
                        } else {
                            resolve();
                        }
                    } else {
                        this.$vux.toast.text(this.$t('pleaseInput',{ field : this.$t('收款人姓名') }));
                        reject();
                    }
                });
            },
            /**
             * 校验收款账户
             * @return {Promise<any>}
             */
            validateAccount () {
                return new Promise((resolve,reject) => {
                    if (this.formData && this.formData.account ) {
                        if (this.formData.account.length > 100) {
                            this.$vux.toast.text(this.$t('maxLengthErr',{ field : this.$t('收款账户'),length : 100 }));
                            reject();
                        } else {
                            resolve();
                        }
                    } else {
                        this.$vux.toast.text(this.$t('pleaseInput',{ field : this.$t('收款账户') }));
                        reject();
                    }
                });
            },
            /**
             * 确认立即返回
             */
            onConfirm () {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = '';
                }
                this.$router.push({
                    name : 'marketingOwnerCenter'
                });
            },

            /**
             * 获取手机号验证码
             */
            getValidCode () {
                if (!this.isTiming) {
                    ajax.post('market_getPhoneVerificationCode', {
                        phoneNum : this.mobile,
                        type : 'makert_change_account',
                        companyCode : this.companyCode
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
                }
            },
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && params.accountInfo && Object.keys(params.accountInfo).length > 0) {
                    this.formData.accountType = 'other';
                    this.formData.otherAccountType = params.accountInfo.accountType;
                    for (let i = 0,j = this.accountTypeList.length; i < j; i++) {
                        if (this.accountTypeList[i]['key'] === params.accountInfo.accountType) {
                            this.formData.accountType = params.accountInfo.accountType;
                            this.formData.otherAccountType = '';
                            break;
                        }
                    }
                    this.formData.name = params.accountInfo.name;
                    this.formData.account = params.accountInfo.account;
                    this.mobile = params.accountInfo.mobile;
                } else {
                    this.$router.push({
                        name : 'marketingOwnerCenter'
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
             * 修改收款账户信息
             */
            updateAccountInfo () {
                ajax.post('market_updateBankAccount',{
                    accountType : this.formData.accountType === 'other' ? this.formData.otherAccountType : this.formData.accountType,
                    accountInfo : this.formData.account,
                }).then(res => {
                    if (res.success) {
                        this.confirmShow = true;
                        if (this.timer) {
                            clearTimeout(this.timer);
                            this.timer = '';
                        }
                        this.timer = setTimeout(() => {
                            this.onConfirm();
                        },5000);
                    } else if (res.code && res.code !== '300') {
                        this.$vux.toast.show({
                            type : 'cancel',
                            text : this.$t('errorMsg.' + res.code)
                        });
                    } else {
                        this.$vux.toast.show({
                            type : 'cancel',
                            text : this.$t('修改账户失败')
                        });
                    }
                });
            },
            /**
             * 校验手机验证码是否正确
             */
            validatePhoneCode () {
                ajax.post('market_checkVerifyCode',{
                    mobile : this.mobile,
                    code : this.formData.code,
                    companyCode : this.companyCode,
                    type : 'makert_change_account',
                }).then((res) => {
                    if (res.success) {
                        this.updateAccountInfo();
                    } else if (res.code && res.code !== '300') {
                        this.$vux.toast.show({
                            type : 'cancel',
                            text : this.$t('errorMsg.' + res.code)
                        });
                    } else {
                        this.$vux.toast.show({
                            type : 'cancel',
                            text : this.$t('验证码错误')
                        });
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
        },
        computed : {
            ...mapGetters({
                companyCode : 'companyCode',
            })
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .set-deposit-account{
        @include block_outline();
        background: #f2f3f4;

        .hr{
            @include block_outline($height:8px);
        }

        .warning-tips{
            @include block_outline($height : 30px);
            text-align: center;
            font-size: $font_size_14px;
            color: #8395A7;
            line-height: 30px;
        }

        .weui-btn{
            margin-top: 44px;
        }

        /deep/ .weui-cell{
            height: 50px;
        }

        /deep/ .weui-label{
            color: #172434;
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
</style>
