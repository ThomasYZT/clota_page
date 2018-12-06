<!--修改手机号-->

<template>
    <div class="change-phone">
        <div class="hr"></div>
        <group>
            <!-- 身份证号 -->
            <x-input
                :title="$t('身份证号')"
                text-align="right"
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                v-model.trim="formData.idNum"
                placeholder-align="right">
            </x-input>
            <!--手机号-->
            <x-input :title="$t('新的手机号')"
                     v-model.trim="formData.phoneNum"
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
            <!-- 验证码 -->
            <x-input
                :title="$t('验证码')"
                text-align="right"
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                v-model.trim="formData.code"
                placeholder-align="right">
            </x-input>
        </group>
        <x-button class="button"
                  @click.native="confirm">{{$t('确定')}}</x-button>
    </div>
</template>

<script>
    import ajax from '@/marketing/api/index';
    import { validator } from 'klwk-ui';
    import { mapGetters } from 'vuex';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //身份证号
                formData : {
                    idNum : '',
                    //手机号
                    phoneNum : '',
                    //验证码
                    code : ''
                },
                //是否正在计时
                isTiming : false,
                //计时时间
                time : 60,
                //原手机号
                originPhone : ''
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
                            type : 'market_change_phone',
                            companyCode : this.marketINgCompanyCode
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
             * 确认修改手机号
             */
            confirm () {
                this.validateIdNum(() => {
                    return this.validateIdNum();
                }).then(() => {
                    return this.validatePhone();
                }).then(() => {
                    return this.validateCode();
                }).then(() => {
                    this.changePhone();
                });
            },
            /**
             * 校验身份证号
             * @return {Promise<any>}
             */
            validateIdNum () {
                return new Promise((resolve,reject) => {
                    if (this.formData && this.formData.idNum) {
                        if (validator.isIdCard(this.formData.idNum)) {
                            resolve();
                        } else {
                            this.$vux.toast.text(this.$t('errFormat',{ field : this.$t('身份证号') }));
                            reject();
                        }
                    } else {
                        this.$vux.toast.text(this.$t('pleaseInput',{ field : this.$t('身份证号') }));
                        reject();
                    }
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
                            if (this.originPhone === this.formData.phoneNum) {
                                this.$vux.toast.text(this.$t('twPhoneError'));
                            } else {
                                resolve();
                            }
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
             * 修改手机号
             */
            changePhone () {
                ajax.post('market_modifyMobile',{
                    idno : this.formData.idNum,
                    newMobile : this.formData.phoneNum,
                    code : this.formData.code,
                    type : 'market_change_phone',
                }).then(res => {
                    if (res.success) {
                        this.$vux.toast.show({
                            text : this.$t('operateSuc',{ msg : this.$t('modify') })
                        });
                        this.$router.push({
                            name : 'marketingSetting'
                        });
                    } else if (res.code && res.code !== '300') {
                        this.$vux.toast.show({
                            text : this.$t('errorMsg.' + res.code),
                            type : 'cancel'
                        });
                    } else {
                        this.$vux.toast.show({
                            text : this.$t('operateFail',{ msg : this.$t('modify') }),
                            type : 'cancel'
                        });
                    }
                });
            },
            /**
             * 计时完成
             */
            timeFinish () {
                this.isTiming = false;
                this.time = 60;
            },
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && params.phone) {
                    this.originPhone = params.phone;
                } else {
                    this.$rotuer.push({
                        name : 'marketingSetting'
                    });
                }
            }
        },
        computed : {
            ...mapGetters({
                marketINgCompanyCode : 'marketINgCompanyCode',
            })
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .change-phone{
        @include block_outline();
        overflow: auto;
        background: #f2f3f4;

        .hr{
            @include block_outline($height:8px);
        }

        /deep/ .weui-cell{
            height: 50px;
        }

        /deep/ .vux-cell-primary p,
        /deep/ .weui-cell__ft,
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

        /deep/ .vux-x-input-has-right-full .weui-cell__primary{
            padding-right: 5px;
        }

        /deep/ .vux-x-input-right-full{
            height: 50px!important;
        }

        /deep/ .weui-btn{
            margin-top: 44px;
        }
    }
</style>
