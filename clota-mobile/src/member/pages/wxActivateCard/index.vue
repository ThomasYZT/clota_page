<!--
    微信会员卡激活
-->
<template>
    <div class="wx-activate-card">
        <!-- 姓名 -->
        <x-input class="c-input"
                 :title="$t('name')"
                 type="text"
                 text-align="right"
                 :placeholder="$t('pleaseInput',{field : $t('name') })"
                 v-model.trim="formData.custName"
                 label-width="150px">
        </x-input>
        <!-- 性别 -->
        <div>
            <popup-picker :title="$t('sex')"
                          :cancel-text="$t('cancel')"
                          :confirm-text="$t('complete')"
                          :data="sexList"
                          show-name
                          v-model="gender"
                          class="c-input"
                          @on-change="sexChange"
                          :placeholder="$t('pleaseChoose')">
            </popup-picker>
        </div>
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
        <x-input :title="$t('validCode')"
                 v-model="formData.code"
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
        <!-- 生日 -->
        <datetime
            class="c-input"
            start-date="1970-01-01"
            :end-date="endDate"
            :confirm-text="$t('confirm')"
            :cancel-text="$t('cancel')"
            :title="$t('birthday')"
            :placeholder="$t('pleaseSelect',{field : $t('birthday') })"
            v-model="formData.birthDay">
        </datetime>
        <!-- 证件类型 -->
        <div style="border-top: 1px solid #F5F5F5;">
            <popup-picker :title="$t('cardType')"
                          :cancel-text="$t('cancel')"
                          :confirm-text="$t('complete')"
                          :data="idTypeList"
                          show-name
                          v-model="certificationType"
                          class="c-input"
                          @on-change="certificationTypeChange"
                          :placeholder="$t('pleaseSelect',{field : $t('cardType') })">
            </popup-picker>
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
        <x-input :title="$t('address')"
                 class="c-input"
                 label-width="150px"
                 text-align="right"
                 :placeholder="$t('pleaseInput',{field : $t('address') })"
                 v-model="formData.homeAddr"></x-input>

        <x-button class="button"
                  @click.native="validate()">{{$t('memberCardActivating')}}</x-button>
    </div>
</template>

<script>
    import ajax from '../../api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { genderEnum } from '@/assets/js/constVariable.js';
    import { mapGetters, mapActions } from 'vuex';
    import { validator } from 'klwk-ui';

    export default {
        mixins : [lifeCycleMixins],
        data() {
            return {
                //表单数据
                formData : {
                    // 会员名称
                    custName: '',
                    // 性别
                    gender: '',
                    // 手机号
                    phoneNum: '',
                    // 验证码
                    code: '',
                    // 出生日期
                    birthDay: '',
                    // 证件类型ID
                    certificationType: '',
                    // 证件号码
                    idCardNumber: '',
                    // 地址
                    homeAddr: ''
                },
                //选中的性别
                gender : [],
                //证件类型列表数据
                idTypeList : [],
                //选中的证件类型
                certificationType : [],
                //微信openId
                openId : '',
                //性别列表数据
                sexList : [genderEnum.map(item => ({ name : this.$t(item.name),value : item.desc }))],
                // 定时器
                timer: null,
                //倒计时间
                countDown: null,
                // 按钮是否禁用
                isGetCode: false,
                //微信用户信息
                wxUserInfo : {},
                //当前时间
                endDate: new Date().format('yyyy-MM-dd')
            }
        },
        methods: {
            ...mapActions([
                'getCardListInfo'
            ]),
            /**
             * 获取验证码
             */
            getCode() {
                //先验证是否在60s倒计时内
                if(!this.isGetCode) {
                    //再验证电话号码是否存在
                    this.phoneValidate(() => {
                        ajax.post('getCode', {
                            phoneNum: this.formData.phoneNum,
                            type : 'member_activate',
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
             * 查询所有证件类型
             */
            queryDocument (orgId) {
                ajax.post('queryDocuments', {
                    orgId: orgId
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
             * 查询会员信息
             */
            queryWxMemberInfo () {
                ajax.post('queryWxMemberInfo', {
                    openId: this.openId,
                    companyCode : this.companyCode
                }).then((res) => {
                    if(res.success) {
                        let dataObj = res.data ? res.data : {};
                        console.log(dataObj)
                        this.formData.custName = dataObj.custName?dataObj.custName:'';
                        this.formData.gender = dataObj.gender?dataObj.gender:'';
                        this.formData.phoneNum = dataObj.phoneNum?dataObj.phoneNum:'';
                        this.formData.birthDay = dataObj.birthDay ? dataObj.birthDay.split(' ')[0] : '';
                        this.formData.certificationType = dataObj.certificationType?dataObj.certificationType:'';
                        this.formData.idCardNumber = dataObj.idCardNumber?dataObj.idCardNumber:'';
                        this.formData.homeAddr = dataObj.homeAddr?dataObj.homeAddr:'';
                        if (dataObj.gender) { this.gender[0] = dataObj.gender }
                        if (dataObj.certificationType) { this.certificationType[0] = dataObj.certificationType; }
                        this.gender = JSON.parse(JSON.stringify(this.gender));
                        this.formData = JSON.parse(JSON.stringify(this.formData));
                        this.queryDocument(dataObj.orgId);
                    } else {
                        this.$vux.toast.text(this.$t(res.code));
                    }
                });
            },
            /**
             * 激活
             */
            finishInfo () {
                ajax.post('wxActiveCard', Object.assign({
                    wxOpenId: this.openId,
                    companyCode: this.companyCode
                }, this.formData)).then((res) => {
                    if(res.success) {
                        this.$vux.toast.text(this.$t('activateSuccess'));
                        this.$wechat.closeWindow();
                    } else {
                        this.$vux.toast.text(this.$t(res.code));
                    }
                });
            },

            /**
             * 输入验证
             */
            validate () {
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

                //性别
                if (validator.isEmpty(this.formData.gender)) {
                    this.$vux.toast.text(this.$t('pleaseSelect', { field : this.$t('sex') }));
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
                    this.$vux.toast.text(this.$t('pleaseSelect', { field : this.$t('cardType') }));
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
                this.finishInfo();
            },
            /**
             * 手机号验证 验证手机号不为空 且为 手机号格式
             * @param callback
             */
            phoneValidate(callback) {
                if(this.formData.phoneNum === '') {
                    this.$vux.toast.text(this.$t('pleaseEnterMobile'));
                    return;
                } else {
                    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if(!phoneReg.test(this.formData.phoneNum)) {
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
             * 获取路由信息
             */
            getParams () {
                let queryParams = this.getUrlString(location.href);
                if (queryParams && queryParams.openid) {
                    this.openId = queryParams.openid;
                    this.queryWxMemberInfo();
                }
            },
            /**
             * 获取url的参数
             * @param{String} url url地址
             * @returns {Array} query参数
             *
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
            }
        },
        computed: {
            ...mapGetters({
                lang : 'lang',
                companyCode : 'companyCode'
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    $img_base_url : '../../../assets/images/';

    .wx-activate-card {
        height: 100%;
        width: 100%;
        color: #4A4A4A;
        background: get_url('icon-bg.png');
        background-size: 100% 100%;

        /deep/ .weui-cell__primary{
            padding-right: 10px;
        }

        .msg {
            margin-left: 14px;
            padding: 10px 0;
            color: #FF8C69;
            font-size: 12px;
            font-style: italic;
        }

        /deep/ .weui-cell.vux-tap-active.weui-cell_access {
            height: 100% !important;
        }

        .vux-datetime::before {
            border-top: 0;
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
