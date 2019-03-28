<!--
    微信公众号配置
    作者：杨泽涛
-->
<template>
    <div class="official-accounts-setting">
        <div class="pick-up-title" >
            <span class="label">{{$t('公众号配置')}}</span>
            <span class="back-up"
                  @click="isPackUp = !isPackUp">
					{{$t(isPackUp ? 'backUp' : 'upLoad')}}
				<span class="iconfont icon-pull-down" :class="{'icon-reverse' : isPackUp}"></span>
			</span>
        </div>


        <transition name="fade">
            <div class="data-wrap"  v-if="isPackUp">
                <div class="edit-wrap">
                    <template>
                        <div class="edit" v-if="!isEditing" @click="edit">
                            <span v-if="!isEditing" data-v-d42ae04c="" class="iconfont icon-edit"></span>{{$t('编辑')}}
                        </div>
                        <template v-else>
                            <span class="save" @click="validateData">{{$t('save')}}</span>
                            <span class="cancel" @click="cancelEdit">{{$t('cancel')}}</span>
                        </template>
                    </template>
                </div>

                <div class="form-wrap">
                    <Form ref="memberSetting"
                          :rules="memberConfigRule"
                          :model="memberConfig"
                          label-position="right"
                          :label-width="130">
                        <!-- 仅开通了会员服务才显示 -->
                        <div class="setting-box" v-show="memberWx">
                            <h4 class="form-title">会员管理-微信公众账号配置：</h4>
                            <i-row>
                                <i-col span="20">
                                    <FormItem label="AppID" prop="memberWxAppId">
                                        <Input v-model.trim="memberConfig.memberWxAppId"
                                               type="text"
                                               :placeholder="$t('inputField', { field : 'appID' })"
                                               :disabled="!isEditing"
                                               style="width: 200px"></Input>
                                    </FormItem>
                                </i-col>
                                <i-col span="20">
                                    <FormItem label="AppSecret" prop="memberWxAppSecret">
                                        <Input v-model.trim="memberConfig.memberWxAppSecret"
                                               type="text"
                                               :disabled="!isEditing"
                                               :placeholder="$t('inputField', { field : 'appSecret' })"
                                               style="width: 200px"></Input>
                                    </FormItem>
                                </i-col>
                                <i-col span="20">
                                    <FormItem label="微信卡包">
                                        <Checkbox v-model="memberConfig.openMembercard"
                                                  :disabled="!isEditing">{{''}}</Checkbox>
                                    </FormItem>
                                </i-col>
                            </i-row>
                            <i-row v-show="memberConfig.openMembercard">
                                <i-col span="20">
                                    <FormItem label="支付即会员规则" prop="payGiftCard">
                                        <Checkbox v-model="memberConfig.payGiftCard"
                                                  :disabled="!isEditing">{{''}}</Checkbox>
                                    </FormItem>
                                </i-col>
                                <template v-if="memberConfig.payGiftCard">
                                    <i-col span="20">
                                        <FormItem label="微信支付商户号" prop="mchId">
                                            <Input v-model.trim="memberConfig.mchId"
                                                   type="text"
                                                   :disabled="!isEditing"
                                                   :placeholder="$t('inputField', { field : '微信支付商户号' })"
                                                   style="width: 200px"></Input>
                                        </FormItem>
                                    </i-col>
                                    <i-col span="20">
                                        <FormItem label="规则有效期" prop="time">
                                            <DatePicker v-model="memberConfig.time"
                                                        type="daterange"
                                                        :editable="false"
                                                        format="yyyy-MM-dd"
                                                        transfer
                                                        placement="bottom-end"
                                                        :disabled="!isEditing"
                                                        :readonly="!isEditing"
                                                        :placeholder="$t('selectField', { msg : '有效期' })"></DatePicker>
                                        </FormItem>
                                    </i-col>
                                    <i-col span="20">
                                        <FormItem label="支付金额范围">
                                            <i-row>
                                                <i-col span="6" class="first-input">
                                                    <FormItem prop="payGiftCardMinAmount">
                                                        <Input v-model.trim="memberConfig.payGiftCardMinAmount"
                                                               type="text"
                                                               :disabled="!isEditing"
                                                               :placeholder="$t('inputField', { field : '金额' })"
                                                               style="width: 100%"></Input>
                                                    </FormItem>
                                                </i-col>
                                                <i-col span="2" style="text-align: center">
                                                    -
                                                </i-col>
                                                <i-col span="6">
                                                    <FormItem prop="payGiftCardMaxAmount">
                                                        <Input v-model.trim="memberConfig.payGiftCardMaxAmount"
                                                               type="text"
                                                               :disabled="!isEditing"
                                                               :placeholder="$t('inputField', { field : '金额' })"
                                                               style="width: 100%"></Input>
                                                    </FormItem>
                                                </i-col>
                                            </i-row>
                                        </FormItem>
                                    </i-col>
                                </template>
                            </i-row>
                        </div>

                        <!-- 仅开通了全民营销服务才显示 -->
                        <div class="setting-box" v-show="marketWx">
                            <h4 class="form-title">全民营销-微信公众账号配置：</h4>
                            <i-row>
                                <i-col span="20">
                                    <FormItem label="AppID" prop="marketWxAppId">
                                        <Input v-model="memberConfig.marketWxAppId"
                                               type="text"
                                               :placeholder="$t('inputField', { field : 'appID' })"
                                               :disabled="!isEditing"
                                               style="width: 200px"></Input>
                                    </FormItem>
                                </i-col>
                                <i-col span="20">
                                    <FormItem label="AppSecret" prop="marketWxAppSecret">
                                        <Input v-model="memberConfig.marketWxAppSecret"
                                               type="text"
                                               :placeholder="$t('inputField', { field : 'appSecret' })"
                                               :disabled="!isEditing"
                                               style="width: 200px"></Input>
                                    </FormItem>
                                </i-col>
                            </i-row>
                        </div>
                    </Form>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import common from '@/assets/js/common';
    import defaultsDeep from 'lodash/defaultsDeep';
    import pick from 'lodash/pick';
    import ajax from '@/api/index';
    export default {
        props : {
            //是否开启全民营销模块
            'marketWx' : {
                type : Boolean,
                default : false,
            },
            //是否开启会员模块
            'memberWx' : {
                type : Boolean,
                default : false,
            },
            'wxMpSet' : {
                type : Object,
                default () {
                    return {};
                },
            },
            //是否默认展开
            'isDefaultPackUp' : {
                type : Boolean,
                default : false
            },
            //配置查询参数
            'search-params' : {
                typee : Object,
                default () {
                    return {};
                }
            },
        },
        components : {},
        data () {
            //校验钱
            const validateMoney = (rule, value, callback) => {
                if (value) {
                    common.validateMoney(value).then(() => {
                        callback();
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t('errorMaxLength',{ field : '' ,length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : '' }));
                        }
                    });
                } else {
                    callback();
                }
            };

            const validateDateRange = (rule, value, callback) => {
                if (value && typeof value === 'object') {
                    if (this.wxPackageRequired) {
                        if (value[0] && value[1]) {
                            callback();
                        } else {
                            callback(this.$t('selectField', { msg : this.$t('validatedDate') }));
                        }
                    } else {
                        callback();
                    }
                } else {
                    callback(this.$t('selectField', { msg : this.$t('validatedDate') }));
                }
            }

            const comparator = (rule, value, callback) => {
                if (rule && rule.params && Object.keys(rule.params).length > 0 &&
                    value && this.memberConfig[rule.params.target]) {
                    if (rule.params.type === 'smaller') {
                        if (Number(value) >= Number(this.memberConfig[rule.params.target])) {
                            callback(this.$t("必须小于最大支付金额"))
                        } else {
                            callback()
                        }
                    } else {
                        if (Number(value) <= Number(this.memberConfig[rule.params.target])) {
                            callback(this.$t("必须大于最小支付金额"))
                        } else {
                            callback()
                        }
                    }
                } else {
                    callback();
                }
            }
            return {
                //是否收起
                isPackUp : true,
                //是否处于编辑状态
                isEditing : false,
                //会员管理配置表单数据
                memberConfig : {
                    //会员微信公众号appID
                    memberWxAppId : '',
                    //会员微信appSecret
                    memberWxAppSecret : '',
                    //是否开启微信卡包
                    openMembercard : false,
                    //是否开启支付即会员
                    payGiftCard : false,
                    //支付即会员最小金额
                    payGiftCardMinAmount : '',
                    //支付即会员最大金额
                    payGiftCardMaxAmount : '',
                    //商户号
                    mchId : '',
                    //有效期
                    time : [],
                    //全民营销appid
                    marketWxAppId : '',
                    //全民营销AppSecret
                    marketWxAppSecret : '',
                },
                formDataCopy : {},
                //钱校验规则
                validateMoney : validateMoney,
                //校验是否选择有效期
                validateDateRange : validateDateRange,
                //比较器
                comparator : comparator,
            };
        },
        computed : {
            //会员基础配置是否必填
            memberBaseConfigRequired () {
                if (this.memberConfig.memberWxAppId || this.memberConfig.memberWxAppSecret) {
                    return true;
                } else {
                    return false;
                }
            },
            //会员卡包配置是否必填
            wxPackageRequired () {
                return this.memberConfig.payGiftCard;
            },
            //全民营销基础配置是否必填
            marketBaseConfigRequired () {
                if (this.memberConfig.marketWxAppId || this.memberConfig.marketWxAppSecret) {
                    return true;
                } else {
                    return false;
                }
            },
            //会员表单校验规则
            memberConfigRule () {
                return {
                    memberWxAppId : [
                        { required : this.memberBaseConfigRequired,
                          message : this.$t('inputField', { field : this.$t('appID') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('appID'),length : 50 }) }
                    ],
                    memberWxAppSecret : [
                        { required : this.memberBaseConfigRequired,
                          message : this.$t('inputField', { field : this.$t('appSecret') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('appSecret'),length : 50 }) }
                    ],
                    mchId : [
                        { required : this.wxPackageRequired,
                          message : this.$t('inputField', { field : this.$t('商户号') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('商户号'),length : 50 }) }],
                    time : [
                        { required : this.wxPackageRequired, type : 'array', min : 2, message : this.$t('selectField', { msg : this.$t('有效期') }), trigger : 'change' },
                        { validator : this.validateDateRange, trigger : 'blur' },
                    ],
                    payGiftCardMinAmount : [
                        { required : this.wxPackageRequired,
                          message : this.$t('inputField', { field : this.$t('金额') }), trigger : 'blur'},
                        { validator : this.validateMoney, trigger : 'blur' },
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('金额'),length : 50 }) },
                        { validator : this.comparator, trigger : 'blur', params : { type : 'smaller', target : 'payGiftCardMaxAmount' } }
                    ],
                    payGiftCardMaxAmount : [
                        { required : this.wxPackageRequired,
                          message : this.$t('inputField', { field : this.$t('金额') }), trigger : 'blur'},
                        { validator : this.validateMoney, trigger : 'blur' },
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('金额'),length : 50 }) },
                        { validator : this.comparator, trigger : 'blur', params : { type : 'bigger', target : 'payGiftCardMinAmount' } }
                    ],
                    marketWxAppId : [
                        { required : this.marketBaseConfigRequired,
                            message : this.$t('inputField', { field : this.$t('appID') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('appID'),length : 50 }) }
                    ],
                    marketWxAppSecret : [
                        { required : this.marketBaseConfigRequired,
                            message : this.$t('inputField', { field : this.$t('appSecret') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('appSecret'),length : 50 }) }
                    ],
                }
            },
        },
        methods : {
            /**
             * 编辑在线收款账户信息
             */
            edit () {
                this.isEditing = true;
            },
            /**
             *  取消编辑
             */
            cancelEdit () {
                this.isEditing = false;
                Object.assign(this.memberConfig, this.wxMpSet);
                this.memberConfig.openMembercard = this.wxMpSet.openMembercard === 'true' ? true : false;
                this.memberConfig.payGiftCard = this.wxMpSet.payGiftCard === 'true' ? true : false;
                delete this.memberConfig.payGiftCardStartTime;
                delete this.memberConfig.payGiftCardEndTime;
                this.memberConfig.time = (this.wxMpSet.payGiftCardStartTime && this.wxMpSet.payGiftCardEndTime) ?
                    [this.wxMpSet.payGiftCardStartTime, this.wxMpSet.payGiftCardEndTime] : [];
            },
            /**
             * 校验表单数据
             */
            validateData () {
                //校验会员表单
                this.$refs.memberSetting.validate((valid) => {
                    if (valid) {
                        let formData = {};
                        formData = defaultsDeep(formData, this.memberConfig);
                        formData.payGiftCardStartTime = this.memberConfig.time[0] ? new Date(this.memberConfig.time[0]).format("yyyy-MM-dd HH:mm:ss") : '';
                        formData.payGiftCardEndTime = this.memberConfig.time[1] ? new Date(this.memberConfig.time[1]).format("yyyy-MM-dd HH:mm:ss") : '';
                        formData.openMembercard = this.memberConfig.openMembercard.toString();
                        formData.payGiftCard = this.memberConfig.payGiftCard.toString();

                        delete formData.time;
                        this.setWxMpSet(formData);
                    }
                });
            },
            /**
             *  重置表单数据
             */
            resetFormData () {
                this.$refs.memberSetting.resetFields();
            },
            /**
             * 保存公众号配置
             * @param formData
             */
            setWxMpSet (formData) {
                formData.orgId = this.searchParams.id;
                if ((formData.payGiftCard === 'false' || formData.openMembercard === 'false') && this.wxMpSet.payGiftCardRuleId) {
                    ajax.post('deletePayGiftCardRule', {
                        orgId : this.searchParams.id
                    }).then((res) => {
                        if (res.status === 200) {
                            this.setWxMpSetApi(formData);
                        } else {
                            this.$Message.error(this.$t('failureTip',{ tip : this.$t('modify') }));
                        }
                    });
                } else {
                    this.setWxMpSetApi(formData);
                }

            },
            setWxMpSetApi (formData) {
                ajax.post('setWxMpSet', formData).then(res => {
                    if (res.status === 200) {
                        this.isEditing = false;
                        this.resetFormData();
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('modify') }));
                        this.$emit('fresh-wxMpSet-data');
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('modify') }));
                    }
                });
            }
        },
        watch : {
            wxMpSet : {
                handler (newVal) {
                    if (Object.keys(newVal).length > 0) {
                        Object.assign(this.memberConfig, this.wxMpSet);
                        this.memberConfig.openMembercard = this.wxMpSet.openMembercard === 'true' ? true : false;
                        this.memberConfig.payGiftCard = this.wxMpSet.payGiftCard === 'true' ? true : false;
                        delete this.memberConfig.payGiftCardStartTime;
                        delete this.memberConfig.payGiftCardEndTime;
                        this.memberConfig.time = (this.wxMpSet.payGiftCardStartTime && this.wxMpSet.payGiftCardEndTime) ?
                            [this.wxMpSet.payGiftCardStartTime, this.wxMpSet.payGiftCardEndTime] : [];
                    }
                },
                deep : true,
                immediate : true,
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .official-accounts-setting {
        .pick-up-title{
            @include block_outline($height: 59px);
            padding: 25px 0 10px 0;

            .label {
                display: inline-block;
                font-size: $font_size_16px;
                color: $color_333;
                line-height: 24px;
                vertical-align: middle;
            }

            .back-up {
                font-size: $font_size_14px;
                color: $color_blue;
                display: inline-block;
                margin-left: 10px;
                margin-top: 2px;
                vertical-align: middle;
                cursor: pointer;

                .icon-pull-down{
                    display: inline-block;
                    transition: all 0.5s;

                    &::before{
                        color: $color_blue;
                        font-size: 12px;
                    }

                    &.icon-reverse{
                        transform: rotate(180deg);
                        transition: all 0.5s;
                    }

                }
            }
        }

        .data-wrap {
            @include block_outline($height: auto);

            .edit-wrap {
                @include block_outline($height : 30px);
                line-height: 30px;
                text-align: right;

                .edit,
                .save {
                    color: $color_blue;
                    cursor: pointer;
                }

                .cancel {
                    cursor: pointer;
                }
            }

            .form-wrap {
                @include block_outline($height: auto);
                margin-left: 20px;

                .first-input {
                    /deep/ .ivu-form-item-content {
                        width: auto;
                    }
                }

                .setting-box {
                    .form-title {
                        margin-bottom: 10px;
                        color: #333;
                    }
                }
            }
        }
    }
</style>
