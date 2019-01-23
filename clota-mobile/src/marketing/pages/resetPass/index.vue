<!--重置密码-->

<template>
    <div class="reset-password">
        <div class="head">
            <img class="img-head" src="../../../assets/images/icon-avator.svg" alt="">
            <div class="register-tips">{{companyName}}</div>
            <div class="belong-type">
                {{$t('全民营销系统')}}
            </div>
        </div>
        <div class="content">
            <x-input v-show="stage === 1"
                     :title="$t('name')"
                     v-model.trim="formData.name"
                     class="c-input"
                     text-align="right"
                     label-width="150px"
                     :placeholder="$t('inputField',{ field : $t('name') })">
            </x-input>
            <x-input v-show="stage === 1"
                     :title="$t('身份证号')"
                     v-model.trim="formData.idNum"
                     class="c-input"
                     text-align="right"
                     label-width="150px"
                     :placeholder="$t('inputField',{ field : $t('身份证号') })">
            </x-input>
            <x-input v-show="stage === 2"
                     :title="$t('mobile')"
                     class="c-input"
                     v-model.trim="formData.phoneNum"
                     text-align="right"
                     :placeholder="$t('请输入您的手机号')" >
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
            <x-input  v-show="stage === 2"
                      :title="$t('validCode')"
                     v-model="formData.code"
                     text-align="right"
                     label-width="150px"
                     :placeholder="$t('enterCode')">
            </x-input>
            <cell v-show="stage === 3"
                  :title="$t('所属类别')"
                  class="c-input type-collect-info"
                  is-link
                  @click.native="typeChooseModalShow = true"
                  :value="typeName">
            </cell>
            <x-input v-show="stage === 3"
                     :title="$t('设置新密码')"
                     v-model.trim="formData.password"
                     class="c-input"
                     type="password"
                     text-align="right"
                     label-width="150px"
                     :placeholder="$t('inputField',{ field : $t('密码') })">
            </x-input>
            <x-input v-show="stage === 3"
                     :title="$t('再次输入密码')"
                     v-model.trim="formData.passwordAgain"
                     class="c-input"
                     type="password"
                     text-align="right"
                     label-width="150px"
                     :placeholder="$t('inputField',{ field : $t('密码') })">
            </x-input>
        </div>
        <x-button class="button"
                  @click.native="next">{{$t('下一步')}}</x-button>
        <div class="before-step" v-if="stage > 1" @click="beforeStep">{{$t('上一步')}}</div>
        <!--所属类别多选-->
        <pop-check-box v-model="typeChooseModalShow"
                       :left-text="$t('cancel')"
                       :right-text="$t('confirm')"
                       :head-title="$t('请选择所属类别')"
                       :operate-list="typeList"
                       :choosed-list-default="typeChoosed"
                       @get-choosed-lists="getChoosedTypeLists">
        </pop-check-box>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ajax from '@/marketing/api/index';
    import { validator } from 'klwk-ui';
    import MD5 from 'crypto-js/md5';
    import popCheckBox from '@/components/popCheckBox/popCheckBox.vue';

	export default {
		data () {
			return {
                //表单数据
                formData : {
                    //手机号
                    phoneNum : '',
                    //验证吗
                    code : '',
                    //姓名
                    name : '',
                    //证件号
                    idNum : '',
                    //输入的密码
                    password : '',
                    //再次输入的密码
                    passwordAgain : '',
                },
                //是否正在计时
                isTiming : false,
                //计时时间
                time : 60,
                //阶段
                stage : 1,
                //所属类别列表
                typeList : [],
                //选择类别的模态框是否显示
                typeChooseModalShow : false,
                //选择的所属类别信息
                typeChoosed : []
            };
		},
        components : {
            popCheckBox
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
                            type : 'market_reset_password',
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
             * 下一步
             */
            next () {
                if (this.stage === 1) {
                    this.validatetName().then(() => {
                        return this.validateIdNum();
                    }).then(() => {
                        this.stage += 1;
                    });
                } else if (this.stage === 2) {
                    this.queryUserTypeList().then(() => {
                        return this.validatePhone();
                    }).then(() => {
                        return this.validateCode();
                    }).then(() => {
                        this.validatePhoneCode();
                    });
                } else if (this.stage === 3) {
                    this.validateTypeInfo().then(() => {
                        return this.validatePassword();
                    }).then(() => {
                        return this.validatePasswordAgain();
                    }).then(() => {
                        this.resetPassword();
                    });
                }
            },
            /**
             * 跳转到上一步
             */
            beforeStep () {
                this.stage -= 1;
            },
            /**
             * 校验姓名
             * @return {Promise<any>}
             */
            validatetName () {
                return new Promise((resolve,reject) => {
                    if (this.formData.name === '') {
                        this.$vux.toast.text(this.$t('inputField',{ field : this.$t('name') }));
                        reject();
                    } else {
                        if (this.formData.name.length > 20) {
                            this.$vux.toast.text(this.$t('maxLengthErr',{ field : this.$t('name'),length : 20 }));
                        } else {
                            resolve();
                        }
                    }
                });
            },
            /**
             *
             * 校验身份证号
             * @return {Promise<any>}
             */
            validateIdNum () {
                return new Promise((resolve,reject) => {
                    if (this.formData.idNum === '') {
                        this.$vux.toast.text(this.$t('inputField',{ field : this.$t('identifyCard') }));
                        reject();
                    } else {
                        if (validator.isIdCard(this.formData.idNum)) {
                            resolve();
                        } else {
                            this.$vux.toast.text(this.$t('errFormat',{ field : this.$t('identifyCard') }));
                        }
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
                            resolve();
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
             * 校验登录密码
             * @return {Promise<any>}
             */
            validatePassword () {
                return new Promise((resolve,reject) => {
                    if (this.formData.password === '') {
                        this.$vux.toast.text(this.$t('inputField',{ field : this.$t('password') }));
                        reject();
                    } else {
                        let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/;
                        if (reg.test(this.formData.password)) {
                            resolve();
                        } else {
                            this.$vux.toast.text(this.$t('errorPwdRule'));
                            reject();
                        }
                    }
                });
            },
            /**
             * 校验第二次输入的密码
             * @return {Promise<any>}
             */
            validatePasswordAgain () {
                return new Promise((resolve,reject) => {
                    if (this.formData.passwordAgain === '') {
                        this.$vux.toast.text(this.$t('请再次输入密码') );
                        reject();
                    } else {
                        if (this.formData.password === this.formData.passwordAgain) {
                            resolve();
                        } else {
                            this.$vux.toast.text(this.$t('twicePassError'));
                        }
                    }
                });
            },
            /**
             * 重置密码
             */
            resetPassword () {
                ajax.post('market_resetPassword',{
                    name : this.formData.name,
                    idno : this.formData.idNum,
                    mobile : this.formData.phoneNum,
                    newPassword : MD5(this.formData.password).toString(),
                    typeIds : this.typeChoosed.join(','),
                    orgId : this.marketOrgId,
                }).then(res => {
                    if (res.success) {
                        this.$router.push({
                            name : 'marketingResetPasswordSuc',
                            params : {
                                fromRegister : true
                            }
                        });
                    } else if (res.code && res.code !== '300') {
                        this.$vux.toast.show({
                            text : this.$t('errorMsg.' + res.code),
                            type : 'cancel'
                        });
                    } else {
                        this.$vux.toast.show({
                            text : this.$t('operateFail',{ msg : this.$t('重置密码') }),
                            type : 'cancel'
                        });
                    }
                });
            },
            /**
             * 校验手机验证码是否正确
             */
            validatePhoneCode () {
                ajax.post('market_checkVerifyCode',{
                    mobile : this.formData.phoneNum,
                    code : this.formData.code,
                    companyCode : this.companyCode,
                    type : 'market_reset_password',
                }).then((res) => {
                    if (res.success) {
                        this.stage += 1;
                    } else if (res.code && res.code !== '300') {
                        this.$vux.toast.show({
                            type : 'cancel',
                            text : this.$t(res.code)
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
             * 查询用户所属类别列表
             */
            queryUserTypeList () {
                return new Promise((resolve,reject) => {
                    ajax.post('market_queryUserTypeForReset',{
                        phone : this.formData.phoneNum,
                        idno : this.formData.idNum,
                        orgId : this.marketOrgId
                    }).then(res => {
                        if (!res.success && res.code === 'MK013') {
                            this.typeList = res.data ? res.data.map(item => {
                                return {
                                    key : item.id,
                                    value : item.typeName
                                };
                            }) : [];
                            resolve();
                        } else if (res.success) {
                            this.typeList = res.data ? res.data.map(item => {
                                return {
                                    key : item.id,
                                    value : item.typeName
                                };
                            }) : [];
                            this.$set(this.typeChoosed,0,this.typeList.length > 0 ? this.typeList[0]['key'] : '');
                            resolve();
                        } else {
                            this.typeList = [];
                            this.$vux.toast.show({
                                type : 'cancel',
                                text : this.$t('手机号或证件号错误')
                            });
                            reject(res.code);
                        }
                    });
                });
            },
            /**
             * 获取组织信息
             * @param{String} orgCode 组织code
             */
            queryOrgInfo (orgCode) {
                ajax.post('market_toLoginPage',{
                    orgCode : orgCode
                }).then(res => {
                    if (res.success) {
                        this.$store.commit('marketUpdateCompanyName',res.data ? res.data.orgName : '');
                        this.$store.commit('marketUpdateOrgId',res.data ? res.data.orgId : '');
                    } else {
                        this.$store.commit('marketUpdateCompanyName','');
                        this.$store.commit('marketUpdateOrgId','');
                    }
                }).finally(() => {
                    this.$store.commit('updateCompanyCode',orgCode);
                });
            },
            /**
             * 获取路由参数
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.queryOrgInfo(params.companyCode);
                }
            },
            /**
             * 获取选择的所属类别
             * @param{Array} typeList 选中的所属类别信息
             */
            getChoosedTypeLists (typeList) {
                this.typeChoosed = typeList;
            },
            /**
             * 校验选择的所属类别信息是否正确
             */
            validateTypeInfo () {
                return new Promise((resolve,reject) => {
                    if (this.typeChoosed && this.typeChoosed.length > 0 ) {
                        resolve();
                    } else {
                        this.$vux.toast.text(this.$t('请选择所属类别') );
                        reject();
                    }
                });
            }
        },
        computed : {
            ...mapGetters({
                companyName : 'companyName',
                isWeixin : 'isWeixin',
                marketOrgId : 'marketOrgId',
                marketTypeId : 'marketTypeId',
                companyCode : 'companyCode',
            }),
            //所选的类别名称信息
            typeName () {
                let str = [];
                for (let i = 0,j = this.typeChoosed.length; i < j; i++) {
                    if (this.typeChoosed[i] in this.typeListObj) {
                        str.push(this.typeListObj[this.typeChoosed[i]]['value']);
                    }
                }
                return str.join(',');
            },
            //所属类别格式转换
            typeListObj () {
                let result = {};
                for (let i = 0,j = this.typeList.length; i < j; i++) {
                    result[this.typeList[i]['key']] = this.typeList[i];
                }
                return result;
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams(to.query);
            });
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .reset-password{
        @include block_outline();
        background: #f2f3f4;
        overflow: auto;

        .head{
            @include block_outline($height : 160px);
            background: $color_fff;
            padding-top: 19px;
            text-align: center;

            .img-head{
                display: inline-block;
                @include block_outline(53px,53px);
                border-radius: 27px;
                background-size: 100% 100%;
            }

            .register-tips{
                height: 20px;
                line-height: 20px;
                margin-top: 21px;
                font-size: $font_size_16px;
                color: $color_333;

                .company-name{
                    color: $color_yellow;
                }
            }

            .belong-type{
                height: 18px;
                line-height: 18px;
                font-size: $font_size_13px;
                color: $color_999;
                margin-top: 7px;
            }
        }

        .content{
            margin-top: 10px;
            background: $color_fff;

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
        /deep/ .weui-btn{
            margin-top: 48px;
        }

        .before-step{
            font-size: $font_size_13px;
            color: $color_blue;
            max-width: calc(100% - 1.466667rem);
            text-align: left;
            margin: 12px auto 0;
        }


        /deep/ .weui-cell{
            height: 50px;

            &:before{
                top : 50px;
            }
        }

        .type-collect-info  {
            /deep/ .weui-cell__ft{
                max-width : calc(100% - 104px);
                white-space : nowrap;
                overflow : hidden;
            }
        }
    }
</style>
