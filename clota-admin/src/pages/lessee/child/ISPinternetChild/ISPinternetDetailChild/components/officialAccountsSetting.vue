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
                    <div class="setting-box">
                        <h4 class="form-title">会员管理-微信公众账号配置：</h4>
                        <Form ref="memberSetting"
                              :rules="memberConfigRule"
                              :model="memberConfig"
                              label-position="right"
                              :label-width="130">
                            <i-row>
                                <i-col span="20">
                                    <FormItem label="AppID" prop="appID">
                                        <Input v-model.trim="memberConfig.appID"
                                               type="text"
                                               :placeholder="$t('inputField', { field : 'appID' })"
                                               :disabled="!isEditing"
                                               style="width: 200px"></Input>
                                    </FormItem>
                                </i-col>
                                <i-col span="20">
                                    <FormItem label="AppSecret" prop="appSecret">
                                        <Input v-model.trim="memberConfig.appSecret"
                                               type="text"
                                               :disabled="!isEditing"
                                               :placeholder="$t('inputField', { field : 'appSecret' })"
                                               style="width: 200px"></Input>
                                    </FormItem>
                                </i-col>
                                <i-col span="20">
                                    <FormItem label="微信卡包" prop="wxPackageUse">
                                        <Checkbox v-model="memberConfig.wxPackageUse"
                                                  :disabled="!isEditing">{{''}}</Checkbox>
                                    </FormItem>
                                </i-col>
                            </i-row>
                            <transition name="fade">
                                <i-row v-if="memberConfig.wxPackageUse">
                                    <i-col span="20">
                                        <FormItem label="支付即会员" prop="payBeMember">
                                            <Checkbox v-model="memberConfig.payBeMember"
                                                      :disabled="!isEditing">{{''}}</Checkbox>
                                        </FormItem>
                                    </i-col>
                                    <i-col span="20">
                                        <FormItem label="微信支付商户号" prop="merchantId">
                                            <Input v-model="memberConfig.merchantId"
                                                   type="text"
                                                   :disabled="!isEditing"
                                                   :placeholder="$t('inputField', { field : '微信支付商户号' })"
                                                   style="width: 200px"></Input>
                                        </FormItem>
                                    </i-col>
                                    <i-col span="20">
                                        <FormItem label="有效期" prop="time">
                                            <DatePicker v-model="memberConfig.time"
                                                        type="daterange"
                                                        :editable="false"
                                                        transfer
                                                        placement="bottom-end"
                                                        :disabled="!isEditing"
                                                        :placeholder="$t('selectField', { msg : '有效期' })"></DatePicker>
                                        </FormItem>
                                    </i-col>
                                    <i-col span="20">
                                        <FormItem label="金额范围">
                                            <i-row>
                                                <i-col span="6" class="first-input">
                                                    <FormItem prop="payMin">
                                                        <Input v-model="memberConfig.payMin"
                                                               type="text"
                                                               :disabled="!isEditing"
                                                               :placeholder="$t('inputField', { field : '金额' })"
                                                               style="width: 170px"></Input>
                                                    </FormItem>
                                                </i-col>
                                                <i-col span="2" style="text-align: center">
                                                    -
                                                </i-col>
                                                <i-col span="6">
                                                    <FormItem prop="payMax">
                                                        <Input v-model="memberConfig.payMax"
                                                               type="text"
                                                               :disabled="!isEditing"
                                                               :placeholder="$t('inputField', { field : '金额' })"
                                                               style="width: 170px"></Input>
                                                    </FormItem>
                                                </i-col>
                                            </i-row>
                                        </FormItem>
                                    </i-col>
                                </i-row>
                            </transition>
                        </Form>
                    </div>
                    <div class="setting-box">
                        <h4 class="form-title">全民营销-微信公众账号配置：</h4>
                        <Form ref="marketSetting"
                              :rules="marketConfigRule"
                              :model="marketConfig"
                              label-position="right"
                              :label-width="120">
                            <i-row>
                                <i-col span="20">
                                    <FormItem label="AppID" prop="appID">
                                        <Input v-model="marketConfig.appID"
                                               type="text"
                                               :placeholder="$t('inputField', { field : 'appID' })"
                                               :disabled="!isEditing"
                                               style="width: 200px"></Input>
                                    </FormItem>
                                </i-col>
                                <i-col span="20">
                                    <FormItem label="AppSecret" prop="appSecret">
                                        <Input v-model="marketConfig.appSecret"
                                               type="text"
                                               :placeholder="$t('inputField', { field : 'appSecret' })"
                                               :disabled="!isEditing"
                                               style="width: 200px"></Input>
                                    </FormItem>
                                </i-col>
                            </i-row>
                        </Form>
                    </div>

                </div>
            </div>
        </transition>
    </div>
</template>

<script>

    export default {
        props : {
            //是否默认展开
            'isDefaultPackUp' : {
                type : Boolean,
                default : false
            },
        },
        components : {},
        data () {
            return {
                //是否收起
                isPackUp : true,
                //是否处于编辑状态
                isEditing : false,
                //会员管理配置表单数据
                memberConfig : {
                    appID : '',
                    appSecret : '',
                    wxPackageUse : false,
                    payBeMember : false,
                    merchantId : '',
                    time : [],
                    payMin : '',
                    payMax : '',
                },
                //全民营销配置表单数据
                marketConfig : {
                    appID : '',
                    appSecret : '',
                }
            };
        },
        computed : {
            //会员基础配置是否必填
            memberBaseConfigRequired () {
                if (this.memberConfig.appID || this.memberConfig.appSecret) {
                    return true;
                } else {
                    return false;
                }
            },
            //会员卡包配置是否必填
            wxPackageRequired () {
                return this.memberConfig.wxPackageUse
            },
            //全民营销基础配置是否必填
            marketBaseConfigRequired () {
                if (this.marketConfig.appID || this.marketConfig.appSecret) {
                    return true;
                } else {
                    return false;
                }
            },
            //会员表单校验规则
            memberConfigRule () {
                return {
                    appID : [
                        { required : this.memberBaseConfigRequired,
                          message : this.$t('inputField', { field : this.$t('appID') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('appID'),length : 50 }) }
                    ],
                    appSecret : [
                        { required : this.memberBaseConfigRequired,
                          message : this.$t('inputField', { field : this.$t('appSecret') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('appID'),length : 50 }) }
                    ],
                    merchantId : [
                        { required : this.wxPackageRequired,
                          message : this.$t('inputField', { field : this.$t('appID') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('appID'),length : 50 }) }],
                    time : [
                        { required : this.wxPackageRequired, type : 'array', min : 2, message : this.$t('selectField', { msg : this.$t('有效期') }), trigger : 'change' }
                    ],
                    payMin : [
                        { required : this.wxPackageRequired,
                          message : this.$t('inputField', { field : this.$t('金额') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('金额'),length : 50 }) }
                    ],
                    payMax : [
                        { required : this.wxPackageRequired,
                          message : this.$t('inputField', { field : this.$t('金额') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('金额'),length : 50 }) }
                    ],
                }
            },
            //全民营销表单校验规则
            marketConfigRule () {
                return {
                    appID : [
                        { required : this.marketBaseConfigRequired,
                          message : this.$t('inputField', { field : this.$t('appID') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('appID'),length : 50 }) }
                    ],
                    appSecret : [
                        { required : this.marketBaseConfigRequired,
                          message : this.$t('inputField', { field : this.$t('appSecret') }), trigger : 'blur'},
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('appID'),length : 50 }) }
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
                //this.formDataCopy = JSON.parse(JSON.stringify(this.formData));
            },
            /**
             *  取消编辑
             */
            cancelEdit () {
                this.isEditing = false;
            },
            /**
             * 校验表单数据
             */
            validateData () {

            },
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
