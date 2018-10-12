<!--修改手机号码-->

<template>
    <div class="change-phone">
        <div class="phone-img">
            <span class="iconfont icon-mobile">
            <span class="path1"></span><span class="path2"></span>
            </span>
        </div>
        <div class="phone-num">{{$t('localePhone')}}：{{orginalMobile}}</div>
        <group>
            <x-input
                :title="$t('mobile')"
                ref="test"
                text-align="right"
                :show-clear="false"
                v-model.trim="formData.mobile"
                :placeholder="$t('pleaseInputMsg')"
                placeholder-align="right">
            </x-input>
            <x-input :title="$t('validCode')"
                     ref="test1"
                     class="valid-class"
                     v-model.trim="formData.validCode"
                     text-align="right"
                     :placeholder="$t('pleaseInputValidCode')" >
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
        <div class="btn-area">
            <x-button @click.native="save">{{$t('save')}}</x-button>
        </div>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import {validator} from 'klwk-ui';
    import {mapGetters} from 'vuex';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    export default {
        mixins : [lifeCycleMixins],
        data() {
            return {
                //表单数据
                formData : {
                    mobile : '',
                    validCode : ''
                },
                //原来的手机号码
                orginalMobile : '',
                //是否正在计时
                isTiming : false,
                //计时时间
                time : 60
            }
        },
        methods: {
            /**
             * 获取短信验证码
             */
            getValidCode () {
                if(this.isTiming) return;
                this.validateMobile().then(() => {
                    ajax.post('getCode',{
                        phoneNum : this.formData.mobile
                    }).then(res => {
                        if(res.success){
                            setTimeout(() =>{
                                this.$vux.toast.show({
                                    text: this.$t('operateSuc',{msg : this.$t('send')})
                                })
                            },500);
                            this.isTiming = true;
                        }else{
                            setTimeout(() =>{
                                this.$vux.toast.show({
                                    text: this.$t('operateFail',{msg : this.$t('send')}),
                                    type : 'cancel'
                                })
                            },500);
                        }
                    });
                });
            },
            /**
             * 保存新手机号
             */
            save () {
                this.validateMobile().then(() => {
                    return this.validateCode();
                }).then(() => {
                    this.updateMemberInfoByCode();
                });
            },
            /**
             * 校验是否填写了手机号
             */
            validateMobile () {
                return new Promise((resolve,reject) => {
                    if(this.formData && !this.formData.mobile){
                        this.$vux.toast.show({
                            text : this.$t('pleaseInput',{field : this.$t('mobile')}),
                            type : 'text',
                            width : '5rem'
                        });
                        reject();
                    }else if(!validator.isMobile(this.formData.mobile)){
                        this.$vux.toast.show({
                            text : this.$t('pleaseEnterRightMobile'),
                            type : 'text',
                            width : '5rem'
                        });
                        reject();
                    }else if(this.formData.mobile === this.orginalMobile){
                        this.$vux.toast.show({
                            text : this.$t('twPhoneError'),
                            type : 'text',
                            width : '8rem'
                        });
                        reject();
                    }else{
                        resolve();
                    }
                });
            },
            /**
             * 修改手机号码
             */
            updateMemberInfoByCode () {
                ajax.post('updatePhoneNum',{
                    id : this.userInfo.memberId,
                    phoneNum : this.formData.mobile,
                    code : this.formData.validCode,
                    companyId : this.userInfo.companyId,
                }).then(res => {
                    if(res.success){
                        this.$vux.toast.show({
                            text: this.$t('operateSuc',{'msg' : this.$t('modify')})
                        });
                        this.$router.replace({
                            name : 'personInfo'
                        });
                    }else{
                        if(res.code === 'M014'){
                            this.$vux.toast.show({
                                text: this.$t('phoneExitErr'),
                                type : 'text',
                                width : '9rem'
                            })
                        }else{
                            this.$vux.toast.show({
                                // text: '修改失败',
                                text: this.$t('operateFail',{msg : this.$t('modify')}),
                                type : 'cancel'
                            })
                        }
                    }
                });
            },
            /**
             * 校验验证码
             */
            validateCode () {
                return new Promise((resolve,reject) => {
                    if(this.formData && !this.formData.validCode) {
                        this.$vux.toast.show({
                            text: this.$t('pleaseInput',{field : this.$t('validCode')}),
                            type: 'text',
                            width: '5rem'
                        });
                        reject();
                    }else if(this.formData.mobile === this.orginalMobile){
                        this.$vux.toast.show({
                            text : this.$t('twPhoneError'),
                            type : 'text',
                            width : '8rem'
                        });
                        reject();
                    }else{
                        resolve();
                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params.mobile){
                    this.orginalMobile = params.mobile;
                }else{
                    this.$router.push({
                        name : 'personInfo'
                    });
                }
            },
            /**
             * 计时完成
             */
            timeFinish () {
                this.isTiming = false;
                this.time = 60;
            }
        },
        computed : {
            ...mapGetters({
                userInfo : 'userInfo'
            })
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .change-phone{
        @include block_outline();
        padding-top: 24px;
        float: left;
        background: $color_fff;

        .phone-img{
            @include block_outline(50px,50px);
            border-radius: 50px;
            /*background: rgba(47,112,223,0.05);*/
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon-mobile{
                font-size: 50px;
            }
        }

        .phone-num{
            font-size: $font_size_16px;
            color: #353B48;
            text-align: center;
            margin-top: 14px;
            margin-bottom: 30px;
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

        /deep/ .weui-label{
            font-size: $font_size_15px;
            color: #4A4A4A;
        }

        /deep/ .weui-input{
            font-size: $font_size_15px;
        }

        /deep/ .weui-cells{

            &:before{
                display: none;
            }
        }

        /deep/ .weui-cell:before{
            left: 0;
        }

        .valid-class /deep/ .weui-input{
            padding-right: 10px;
            box-sizing: border-box;
        }

        /deep/ .vux-x-input:nth-last-of-type(1){
            padding-top: 0;
            padding-bottom: 0;
            padding-right: 0;
        }

        /deep/ .vux-x-input-right-full{
            float: right;
        }

        /deep/ .weui-cell__ft{
            display: flex;
            align-items: center;
        }

        .btn-area{
            @include block_outline(unquote('calc(100% - 55px)'),42px);
            margin: 64px auto 0;

            /deep/ .weui-btn_default{
                background: $color_0073EB;
                font-size: 17px;
                color: $color_fff;
                border-radius: 100px;
                letter-spacing: 2px;
            }
        }
    }
</style>
