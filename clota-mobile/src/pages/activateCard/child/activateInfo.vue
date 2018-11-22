<!--
    填写激活信息页面
    作者：杨泽涛
-->
<template>
    <div class="activate-info">
        <template>
            <!-- 企业名称 -->
            <x-input class="c-input"
                     v-if="cardInfo.cardTypeId === '3'"
                     :title="$t('companyName')"
                     type="text"
                     text-align="right"
                     :placeholder="$t('pleaseInput',{field : $t('companyName') })"
                     v-model.trim="formData.companyName"
                     label-width="150px">
            </x-input>
            <!-- 姓名 -->
            <x-input class="c-input"
                     :title="$t('name')"
                     type="text"
                     text-align="right"
                     :placeholder="$t('pleaseInput',{field : $t('name') })"
                     v-model.trim="formData.custName"
                     label-width="150px">
            </x-input>
            <!-- 手机号码 -->
            <x-input class="c-input"
                     :title="$t('mobile')"
                     keyboard="number"
                     text-align="right"
                     :placeholder="$t('pleaseInput',{field : $t('mobile') })"
                     v-model.trim="formData.phoneNum"
                     label-width="150px">
            </x-input>
            <!-- 验证码 -->
            <x-input class="c-input verify-input"
                     :title="$t('validCode')"
                     v-model.trim="formData.code"
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
                    <p>{{$t('getValidCode')}}{{countDown ? '(' + countDown/1000 + ')': ''}}</p>
                </div>
            </x-input>
            <!-- 生日 -->
            <datetime
                class="c-input"
                :confirm-text="$t('confirm')"
                :cancel-text="$t('cancel')"
                :title="$t('birthday')"
                :placeholder="$t('pleaseSelect',{field : $t('birthday') })"
                v-model="formData.birthDay"></datetime>
            <!-- 证件类型 -->
            <div>
                <popup-picker :title="$t('cardType')"
                              :data="idTypeList"
                              show-name
                              v-model="certificationType"
                              class="c-input"
                              @on-change="certificationTypeChange"
                              :placeholder="$t('pleaseSelect',{field : $t('cardType') })"></popup-picker>
            </div>
            <!-- 证件号码 -->
            <x-input class="c-input"
                     :title="$t('IdNumber')"
                     keyboard="number"
                     text-align="right"
                     :placeholder="$t('pleaseInput',{field : $t('IdNumber') })"
                     v-model="formData.idCardNumber"
                     label-width="150px">
            </x-input>
            <!-- 性别 -->
            <div>
                <popup-picker :title="$t('sex')"
                              :data="sexList"
                              show-name
                              v-model="gender"
                              class="c-input"
                              @on-change="sexChange"
                              :placeholder="$t('pleaseChoose')"></popup-picker>
            </div>

            <!-- 下一步按钮 -->
            <x-button class="button"
                      @click.native="validate()">{{$t('nextStep')}}</x-button>
        </template>

    </div>
</template>

<script>
    import ajax from '../../../api/index';
    import { genderEnum } from '@/assets/js/constVariable.js';
    import { validator } from 'klwk-ui';
    import { mapGetters, mapMutations } from 'vuex';
    import lifeCycleMixins from '../../../mixins/lifeCycleMixins';
    export default {
        components : {},
        mixins : [lifeCycleMixins],
        data () {
            return {
                //页面计时器
                timer : null,
                //倒计时间
                countDown : null,
                //是否获取验证码
                isGetCode : false,
                //是否显示日期选择器
                isShowDate : false,
                //实体卡信息
                cardInfo : {},
                //性别列表数据
                sexList : [genderEnum.map(item => ({ name : this.$t(item.name),value : item.desc }))],
                //选中的性别
                gender : [],
                //证件类型列表数据
                idTypeList : [],
                //选中的证件类型
                certificationType : [],
                //微信openId
                openId : '',
                //组织id
                orgId : '',
                //表单数据
                formData : {
                    //企业名称
                    companyName : '',
                    //会员名称
                    custName : '',
                    //电话号码
                    phoneNum : '',
                    //性别
                    gender : '',
                    //生日
                    birthDay : '',
                    //证件类型
                    certificationType : '',
                    //证件号码
                    idCardNumber : '',
                    //验证码
                    code : '',
                    //公司编码
                    companyCode : '',
                    //微信openid
                    wxOpenId : '',
                    //实体卡id
                    id : ''
                },
                memberCardList : []
            };
        },
        computed : {
            ...mapGetters({
                lang : 'lang',
                companyCode : 'companyCode',
                userInfo : 'userInfo'
            })
        },
        methods : {
            ...mapMutations([
                'updateUserInfo',
                'updateLoginStatus',
                'updateCardInfoList',
                'updateCardInfo',
            ]),
            /**
             * 手机号验证 验证手机号不为空 且为 手机号格式
             * @param callback
             */
            phoneValidate (callback) {
                if (this.formData.phoneNum === '') {
                    this.$vux.toast.text(this.$t('pleaseEnterMobile'));
                } else {
                    if (!validator.isMobile(this.formData.phoneNum)) {
                        this.$vux.toast.text(this.$t('pleaseEnterRightMobile'));
                    } else {
                        callback();
                    }
                }
            },
            /**
             * 获取验证码
             */
            getCode () {
                //先验证是否在60s倒计时内
                if (!this.isGetCode) {
                    //再验证电话号码是否存在
                    this.phoneValidate(() => {
                        ajax.post('getCode', {
                            phoneNum : this.formData.phoneNum,
                            type : 'member_register',
                            companyCode : this.companyCode
                        }).then((res) => {
                            if (!res.success) {
                                this.$vux.toast.show({
                                    text : this.$t('operateFail',{ msg : this.$t('send') }),
                                    type : 'cancel'
                                });
                            } else {
                                this.timimg();
                                this.isGetCode = true;
                                this.$vux.toast.show({
                                    text : this.$t('operateSuc',{ msg : this.$t('send') })
                                });
                            }
                        });
                    });
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
             * 校验输入信息
             */
            validate () {
                //企业名称,仅企业卡需要校验
                if (this.cardInfo.cardTypeId === '3') {
                    if (!validator.isEmpty(this.formData.companyName)) {
                        if (!validator.isInLengthRange(this.formData.companyName,0,50)) {
                            this.$vux.toast.text(this.$t('maxLengthErr', { field : this.$t('companyName'), length : 50 }));
                            return;
                        }
                    } else {
                        this.$vux.toast.text(this.$t('pleaseInput', { field : this.$t('companyName') }));
                        return;
                    }
                }

                //姓名不为空
                if (!validator.isEmpty(this.formData.custName)) {
                    if (!validator.isInLengthRange(this.formData.custName,0,10)) {
                        this.$vux.toast.text(this.$t('maxLengthErr', { field : this.$t('name'), length : 10 }));
                        return;
                    }
                } else {
                    this.$vux.toast.text(this.$t('pleaseInput', { field : this.$t('name') }));
                    return;
                }

                //电话号码
                if (!validator.isEmpty(this.formData.phoneNum)) {
                    if (!validator.isMobile(this.formData.phoneNum)) {
                        this.$vux.toast.text(this.$t('errFormat', { field : this.$t('phone') }));
                        return;
                    }
                } else {
                    this.$vux.toast.text(this.$t('pleaseInput', { field : this.$t('phone') }));
                    return;
                }

                //验证码
                if (validator.isEmpty(this.formData.code)) {
                    this.$vux.toast.text(this.$t('pleaseInput', { field : this.$t('validCode') }));
                    return;
                }

                //生日
                if (validator.isEmpty(this.formData.birthDay)) {
                    this.$vux.toast.text(this.$t('pleaseInput', { field : this.$t('birthday') }));
                    return;
                }

                //证件类型
                if (validator.isEmpty(this.formData.certificationType[0])) {
                    this.$vux.toast.text(this.$t('pleaseInput', { field : this.$t('cardType') }));
                    return;
                }

                //证件号
                if (!validator.isEmpty(this.formData.idCardNumber)) {
                    if (this.formData.idCardNumber.length > 40) {
                        this.$vux.toast.text(this.$t('errFormat', { field : this.$t('IdNumber') }));
                        return;
                    }
                } else {
                    this.$vux.toast.text(this.$t('pleaseInput', { field : this.$t('idCard') }));
                    return;
                }

                //性别
                if (validator.isEmpty(this.formData.gender[0])) {
                    this.$vux.toast.text(this.$t('pleaseSelect', { field : this.$t('sex') }));
                    return;
                }

                //实体卡id
                if (validator.isEmpty(this.formData.id)) {
                    this.$vux.toast.text();
                    return;
                }

                this.activationMemberCard();
            },
            /**
             * 激活会员卡
             */
            activationMemberCard () {
                this.formData.companyCode = this.companyCode;
                ajax.post('activationMemberCard', {
                    ...this.formData,
                }).then(res => {
                    if (res.success) {
                        this.dataToLogin(res)
                        //提示注册成功
                        this.$vux.toast.show({
                            type : 'success',
                            text : this.$t('registSuccess')
                        });
                    } else {
                        if (res.code === 'A004') {
                            this.$vux.toast.show({
                                type : 'cancel',
                                text : this.$t(res.code),
                            });
                        } else {
                            this.$vux.toast.show({
                                type : 'cancel',
                                text : this.$t('activateFailure')
                            });
                        }

                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params /*&& params.openId*/ && params.cardInfo) {
                    this.cardInfo = params.cardInfo;
                    this.openId = params.openId;
                    //实体卡id
                    this.formData.id = this.cardInfo.id;
                    //微信openId
                    this.formData.wxOpenId = this.openId;
                    this.queryDocument();
                } else {
                    this.$router.push({
                        name : 'activateCard'
                    });
                }
            },
            /**
             * 查询所有证件类型
             */
            queryDocument () {
                ajax.post('queryDocuments', {
                    orgId : this.cardInfo.orgId
                }).then(res => {
                    if (res.success) {
                        this.idTypeList = res.data ? [res.data.data.map((item) => {
                            return {
                                value : item.id,
                                name : item.name
                            };
                        })] : [];
                    } else {
                        this.idTypeList = [];
                    }
                });
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
                this.updateUserInfo();
                //更新登陆状态
                this.updateLoginStatus();
                //获取用卡列表信息
                this.getCardList();
            },
            /**
             *  证件类型改变
             *  @param {array} data
             */
            certificationTypeChange (data) {
                this.formData.certificationType = data ? data[0] : '';
            },
            /**
             * 性别改变
             * @param {array} data
             */
            sexChange (data) {
                this.formData.gender = data ? data[0] : '';
            },
            /**
             * 获取会员卡列表
             */
            getCardList () {
                //获取会员卡列表
                ajax.post('queryMemberCardList', {
                    memberId : this.userInfo.memberId
                }).then(res => {
                    if (res.success) {
                        //存储卡列表数据
                        this.memberCardList = res.data ? res.data : [];
                        //存储会员卡/会员卡列表数据
                        localStorage.setItem('cardInfoList', JSON.stringify(this.memberCardList));
                        localStorage.setItem('cardInfo', JSON.stringify(this.memberCardList.length > 0 ? this.memberCardList[0] : {}));
                        this.updateCardInfoList();
                        this.updateCardInfo();
                        //激活成功跳转到主页
                        this.$router.replace({ name : 'home' });
                    } else {
                        localStorage.setItem('cardInfoList', '[]');
                        localStorage.setItem('cardInfo', '{}');
                        this.updateCardInfoList();
                        this.updateCardInfo();
                        this.$vux.toast.text(this.$t('getDataFailure'));
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    $img_base_url : '../../../assets/images/';

    .activate-info {
        padding: 10px;
        color: #4A4A4A;
        background: get_url('icon-bg.png');
        background-size: 100% 100%;
        height: 100%;

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

        /deep/ .weui-cell {
            &:before {
                border-top: none;
            }

            border-bottom: 1px solid #F5F5F5;

            .vux-cell-placeholder {
                color:  #C5C5C5;
                font-size: 15px;
            }
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
        /deep/ .weui-cell.vux-tap-active.weui-cell_access {
            height: 100% !important;
            border-bottom: none;
        }
    }

</style>
