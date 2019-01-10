<!--公司在线收款-->

<template>
    <div class="online-receipt">
        <div class="pick-up-title" >
            <span class="label">{{$t('在线收款账户')}}</span>
            <span class="back-up"
                  v-if="showPickUp"
                  @click="isPackUp = !isPackUp">
                    {{$t(isPackUp ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-pull-down" :class="{'icon-reverse' : isPackUp}"></span>
            </span>
        </div>

        <transition name="fade">
            <div class="data-wrap" v-if="isPackUp">
                <div class="edit-wrap">
                    <div class="edit-left-bar">
                        <Form :label-width="120">
                            <i-row>
                                <i-col span="10">
                                    <FormItem :label="$t('colonSetting',{ key : '支付渠道' })">
                                        <Select v-model="paymentChannel"
                                                :disabled="!isEditing"
                                                @on-change="paymentChannelChange"
                                                style="width:150px">
                                            <Option v-for="item in paymentChannelList" :value="item.value" :key="item.value">{{ $t(item.label) }}</Option>
                                        </Select>
                                    </FormItem>
                                </i-col>
                            </i-row>
                        </Form>
                    </div>
                    <template v-if="!(nodeType === 'partner' && (auditStatus === 'reject' || auditStatus === 'audit'))">
                        <div class="edit-right-bar" v-if="!isEditing" @click="editAccountInfo">
                            <span v-if="!isEditing" data-v-d42ae04c="" class="iconfont icon-edit"></span>{{$t('编辑')}}
                        </div>
                        <template v-else>
                            <span class="save" @click="validateOnlineReceipt">{{$t('save')}}</span>
                            <span class="cancel" @click="cancelEdit">{{$t('cancel')}}</span>
                        </template>
                    </template>
                </div>

                <!-- 银石支付需填表单 -->
                <template v-if="paymentChannel === 'yinshi' ||
                         (paymentChannel === 'useCorpPayAcc' && parentOrgPaymentChannel.paymentChannel === 'yinshi')">
                    <Form ref="formValidate"
                          :model="formData"
                          :rules="ruleValidate"
                          :label-width="120">
                        <i-row v-if="isScenic">
                            <i-col span="10">
                                <!--设置收款账户-->
                                <FormItem :label="$t('colonSetting',{ key : '设置收款账户' })" prop="name">
                                    <Select v-model="formData.accountType"
                                            :disabled="!isEditing || paymentChannel === 'useCorpPayAcc'"
                                            @on-change="accountTypeChange">
                                        <Option v-for="(item,index) in accountListDeal"
                                                class="options-wrap"
                                                :key="index"
                                                v-w-title="$t(item.name)"
                                                :value="item.value" >
                                            {{$t(item.name)}}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="10">
                                <!--MerchantID-->
                                <FormItem :label="$t('colonSetting',{ key : 'MerchantID' })" prop="MerchantId">
                                    <Input v-model.trim="formData.MerchantId" :disabled="!isEditing || formData.accountType !== 'auto'"/>
                                </FormItem>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="10">
                                <!--partnerID-->
                                <FormItem :label="$t('colonSetting',{ key : 'partnerID' })" prop="partnerId">
                                    <Input v-model.trim="formData.partnerId" :disabled="!isEditing || formData.accountType !== 'auto'"/>
                                </FormItem>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="10">
                                <FormItem :label="$t('colonSetting',{ key : $t('收款账户类型') })" prop="name">
                                    <CheckboxGroup v-model="formData.payChannel" >
                                        <Checkbox label="weixin" :disabled="!isEditing || formData.accountType !== 'auto'">{{$t('weixin')}}</Checkbox>
                                        <Checkbox label="alipay" :disabled="!isEditing || formData.accountType !== 'auto'">{{$t('alipay')}}</Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                            </i-col>
                        </i-row>
                    </Form>
                </template>

                <!-- 微信支付宝直连需连表单 -->
                <template v-else-if="paymentChannel === 'wxorali' ||
                         (paymentChannel === 'useCorpPayAcc' && parentOrgPaymentChannel.paymentChannel === 'wxorali')">
                    <Form ref="wxoraliForm"
                          :model="wxoraliFormData"
                          :rules="wxoraliRuleValidate"
                          :label-width="120">
                        <div class="flex-wrapper">
                            <div class="flex-box">
                                <div class="box-title">
                                    <span class="form-title">微信收款账户</span>
                                </div>
                                <i-row>
                                    <i-col span="13">
                                        <FormItem :label="$t('colonSetting',{ key : 'appID' })" prop="officialAccountsAppID">
                                            <Input :disabled="!isEditing || useCorpPayAcc" v-model.trim="wxoraliFormData.officialAccountsAppID"/>
                                        </FormItem>
                                    </i-col>
                                    <i-col span="13">
                                        <FormItem :label="$t('colonSetting',{ key : '商户号' })" prop="merchantNum">
                                            <Input :disabled="!isEditing || useCorpPayAcc" v-model.trim="wxoraliFormData.merchantNum"/>
                                        </FormItem>
                                    </i-col>
                                    <i-col span="13">
                                        <FormItem :label="$t('colonSetting',{ key : 'API密钥' })" prop="secretKey">
                                            <Input :disabled="!isEditing || useCorpPayAcc" v-model.trim="wxoraliFormData.secretKey"/>
                                        </FormItem>
                                    </i-col>
                                </i-row>
                            </div>
                            <div class="flex-box">
                                <div class="box-title">
                                    <span class="form-title">支付宝收款账户</span>
                                </div>
                                <i-row>
                                    <i-col span="13">
                                        <FormItem :label="$t('colonSetting',{ key : 'appID' })" prop="appID">
                                            <Input :disabled="!isEditing || useCorpPayAcc" v-model.trim="wxoraliFormData.appID"/>
                                        </FormItem>
                                    </i-col>
                                    <i-col span="13">
                                        <FormItem :label="$t('colonSetting',{ key : '私钥' })" prop="privateKey">
                                            <Input :disabled="!isEditing || useCorpPayAcc" v-model.trim="wxoraliFormData.privateKey"/>
                                        </FormItem>
                                    </i-col>
                                    <i-col span="13">
                                        <FormItem :label="$t('colonSetting',{ key : '公钥' })" prop="publicKey">
                                            <Input :disabled="!isEditing || useCorpPayAcc" v-model.trim="wxoraliFormData.publicKey"/>
                                        </FormItem>
                                    </i-col>
                                </i-row>
                            </div>
                        </div>
                    </Form>
                </template>

                <!-- 不开通显示内容 -->
                <template v-else-if="paymentChannel === 'none' ||
                         (paymentChannel === 'useCorpPayAcc' && parentOrgPaymentChannel.paymentChannel === 'none')">
                    <div class="tip">未开通在线支付账号</div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import { paymentChannelList } from '@/assets/js/constVariable';

    export default {
        props : {
            //是否在景区
            'is-scenic' : {
                type : Boolean,
                default : false
            },
            //收款账户信息
            'receipt-account-info' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //是否显示收起展开
            'show-pick-up' : {
                type : Boolean,
                default : true
            },
        },
        data () {
            return {
                //是否收起
                isPackUp : true,
                //表单数据
                formData : {
                    MerchantId : '',
                    partnerId : '',
                    //收款账户类型
                    payChannel : [],
                    //收款账户
                    accountType : 'auto',
                },
                //微信支付宝直连表单数据
                wxoraliFormData : {
                    privateKey : '',
                    weixinUseStatus : '',
                    secretKey : '',
                    merchantNum : '',
                    appID : '',
                    aliUseStatus : '',
                    officialAccountsAppID : '',
                    publicKey : '',
                },
                //表单数据复制
                formDataCopy : {},
                //是否在编辑中
                isEditing : false,
                //选择的支付渠道
                paymentChannel : '',
                //是否上级公司的收款账户
                useCorpPayAcc : false,
            };
        },
        methods : {
            /**
             * 编辑在线收款账户信息
             */
            editAccountInfo () {
                //合作伙伴审核通过前，不可配置收款账户
                let editableList = ['partner'];
                if (editableList.includes(this.nodeType)) {
                    if (this.auditStatus !== 'success') {
                        return;
                    }
                }
                this.isEditing = true;
                this.formDataCopy = JSON.parse(JSON.stringify(this.formData));
            },
            /**
             * 保存在线收款账户信息
             */
            validateOnlineReceipt () {
                if (this.useCorpPayAcc) {
                    this.saveOnlineReceipt({
                        id : this.receiptAccountInfo.id,
                        useCorpPayAcc : this.useCorpPayAcc,
                    });
                } else {
                    if (this.paymentChannel === 'yinshi') {
                        this.$refs.formValidate.validate(valid => {
                            if ( valid ) {
                                this.saveOnlineReceipt({
                                    id : this.receiptAccountInfo.id,
                                    useCorpPayAcc : this.useCorpPayAcc,
                                    paymentChannel : this.paymentChannel,
                                    yinshiConfig : this.formData,
                                });
                            }
                        });
                    } else if (this.paymentChannel === 'wxorali') {
                        let valid = false;
                        for (let key in this.wxoraliFormData) {
                            if (this.wxoraliFormData[key] !== '') {
                                valid = true;
                            }
                        }
                        if (!valid) {
                            this.$Message.warning(this.$t('至少填写一种收款账户'));
                            return;
                        }
                        this.$refs.wxoraliForm.validate(valid => {
                            if ( valid ) {
                                this.saveOnlineReceipt({
                                    id : this.receiptAccountInfo.id,
                                    useCorpPayAcc : this.useCorpPayAcc,
                                    paymentChannel : this.paymentChannel,
                                    wxoraliConfig : this.wxoraliFormData,
                                });
                            }
                        });
                    } else {
                        this.saveOnlineReceipt({
                            id : this.receiptAccountInfo.id,
                            useCorpPayAcc : this.useCorpPayAcc,
                            paymentChannel : this.paymentChannel,
                        });
                    }
                }
            },
            /**
             *  保存收款账户设置
             *  @param id
             *  @param useCorpPayAcc
             *  @param paymentChannel
             *  @param yinshiConfig
             *  @param wxoraliConfig
             */
            saveOnlineReceipt ({ id, useCorpPayAcc, paymentChannel, yinshiConfig, wxoraliConfig }) {
                let params = {
                    id : id,
                    useCorpPayAcc : useCorpPayAcc,
                };
                if (!useCorpPayAcc && paymentChannel === 'yinshi') {
                    Object.assign(params, yinshiConfig);
                    params.payChannel = params.payChannel.join(',');
                }
                if (!useCorpPayAcc && paymentChannel === 'wxorali') {
                    Object.assign(params, wxoraliConfig);
                    params.aliUseStatus = params.aliUseStatus ? 'true' : 'false';
                    params.weixinUseStatus = params.weixinUseStatus ? 'true' : 'false';
                }
                params.paymentChannel = paymentChannel;
                ajax.post('addPayInfo',params).then(res => {
                    if (res.status === 200) {
                        this.isEditing = false;
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('modify') }));
                        this.resetFormData();
                        this.$emit('fresh-org-data');
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('modify') }));
                    }
                });
            },
            /**
             * 取消编辑
             */
            cancelEdit () {
                this.isEditing = false;
                this.resetFormData();
                let parentOrgPaymentChannelInfo = (this.receiptAccountInfo.parentOrgPaymentChannel && this.receiptAccountInfo.parentOrgPaymentChannel.paramData) ?
                    JSON.parse(this.receiptAccountInfo.parentOrgPaymentChannel.paramData) : {};
                let orgPaymentChannelInfo = (this.receiptAccountInfo.orgPaymentChannel && this.receiptAccountInfo.orgPaymentChannel.paramData) ?
                    JSON.parse(this.receiptAccountInfo.orgPaymentChannel.paramData) : {};
                let orgPaymentChannel = this.receiptAccountInfo.orgPaymentChannel;
                this.setReceiptAccountInfo({
                    useCorpPayAcc : this.receiptAccountInfo.useCorpPayAcc === 'true' ? true : false,
                    paymentChannel : this.receiptAccountInfo.useCorpPayAcc === 'true' ? 'useCorpPayAcc' :
                        orgPaymentChannel ? orgPaymentChannel.paymentChannel : 'none',
                    paymentChannelInfo : this.receiptAccountInfo.useCorpPayAcc === 'true' ?
                        parentOrgPaymentChannelInfo : orgPaymentChannelInfo,
                });
            },
            /**
             *  清空表单数据
             */
            resetFormData () {
                //表单数据
                this.formData = {
                    MerchantId : '',
                    partnerId : '',
                    //收款账户类型
                    payChannel : [],
                    //收款账户
                    accountType : 'auto',
                };
                //微信支付宝直连表单数据
                this.wxoraliFormData = {
                    privateKey : '',
                    weixinUseStatus : '',
                    secretKey : '',
                    merchantNum : '',
                    appID : '',
                    aliUseStatus : '',
                    officialAccountsAppID : '',
                    publicKey : '',
                };
                if (this.$refs.formValidate) {
                    this.$refs.formValidate.resetFields();
                }
                if (this.$refs.wxoraliForm) {
                    this.$refs.wxoraliForm.resetFields();
                }
            },
            /**
             * 账户类别改变
             * @param accountType
             */
            accountTypeChange (accountType) {
                for (let i = 0,j = this.accountListDeal.length; i < j; i++) {
                    if (this.accountListDeal[i]['value'] === accountType) {
                        this.formData.partnerId = this.accountListDeal[i]['partnerId'];
                        this.formData.MerchantId = this.accountListDeal[i]['merchantId'];
                        this.formData.payChannel = this.accountListDeal[i]['payChannel'];
                        if (accountType !== 'auto') {
                            this.useCorpPayAcc = true;
                        } else {
                            this.useCorpPayAcc = false;
                        }
                    }
                }
            },
            /**
             * 初始化微信支付宝直连表单数据
             * @param parentOrgPaymentChannel
             */
            initWxOrAliConfig (parentOrgPaymentChannel) {
                this.wxoraliFormData.officialAccountsAppID = parentOrgPaymentChannel.officialAccountsAppID;
                this.wxoraliFormData.merchantNum = parentOrgPaymentChannel.merchantNum;
                this.wxoraliFormData.secretKey = parentOrgPaymentChannel.secretKey;
                this.wxoraliFormData.appID = parentOrgPaymentChannel.appID;
                this.wxoraliFormData.privateKey = parentOrgPaymentChannel.privateKey;
                this.wxoraliFormData.publicKey = parentOrgPaymentChannel.publicKey;
            },
            /**
             * 初始化yinshi账户配置表单数据
             * @param parentOrgPaymentChannel
             */
            initYinShiConfig ({paymentChannelInfo , accountType}) {
                this.formData.accountType = accountType;
                this.formData.partnerId = paymentChannelInfo.partnerId;
                this.formData.MerchantId = paymentChannelInfo.merchantId;
                this.formData.payChannel = (function () {
                    let result = [];
                    if (paymentChannelInfo.weixinOpenStatus === 'open') {
                        result.push('weixin');
                    }
                    if (paymentChannelInfo.aliOpenStatus === 'open') {
                        result.push('alipay');
                    }
                    return result;
                })();
            },
            /**
             * 支付渠道变化处理
             * @param val
             */
            paymentChannelChange (val) {
                if (val && val === 'useCorpPayAcc') {
                    if (this.receiptAccountInfo.parentOrgPaymentChannel) {
                        let paymentChannelInfo = (this.receiptAccountInfo.parentOrgPaymentChannel && this.receiptAccountInfo.parentOrgPaymentChannel.paramData) ?
                            JSON.parse(this.receiptAccountInfo.parentOrgPaymentChannel.paramData) : {};
                        this.setReceiptAccountInfo({
                            useCorpPayAcc : true,
                            paymentChannel : val,
                            paymentChannelInfo : paymentChannelInfo,
                        });
                    }
                } else {
                    this.useCorpPayAcc = false;
                }
            },
            /**
             * 设置收款账户信息配置
             * @param paymentChannel
             * @param paymentChannelInfo
             */
            setReceiptAccountInfo ({ useCorpPayAcc, paymentChannel, paymentChannelInfo }) {
                this.useCorpPayAcc = useCorpPayAcc;
                this.paymentChannel = paymentChannel ? paymentChannel : 'none';

                if (paymentChannel === 'yinshi' ||
                    (useCorpPayAcc && this.parentOrgPaymentChannel.paymentChannel === 'yinshi') ||
                    (paymentChannel === 'useCorpPayAcc' && this.parentOrgPaymentChannel.paymentChannel === 'yinshi')) {
                    //复用yinshi账户配置
                    this.initYinShiConfig({
                        paymentChannelInfo : paymentChannelInfo,
                        accountType : useCorpPayAcc ? this.receiptAccountInfo.parentManageId : 'auto',
                    });
                } else if (paymentChannel === 'wxorali' ||
                    (useCorpPayAcc && this.parentOrgPaymentChannel.paymentChannel === 'wxorali') ||
                    (paymentChannel === 'useCorpPayAcc' && this.parentOrgPaymentChannel.paymentChannel === 'wxorali')) {
                    //复用微信支付宝账户配置
                    this.initWxOrAliConfig(paymentChannelInfo);
                } else {
                    this.resetFormData();
                }

            }
        },
        computed : {
            //收款账户处理数据
            accountListDeal () {
                let paymentChannel = (this.receiptAccountInfo.orgPaymentChannel && this.receiptAccountInfo.orgPaymentChannel.paramData) ?
                    JSON.parse(this.receiptAccountInfo.orgPaymentChannel.paramData) : {};

                if ( this.receiptAccountInfo.parentOrgPaymentChannel &&
                     this.receiptAccountInfo.parentOrgPaymentChannel.paramData &&
                     this.receiptAccountInfo.parentOrgPaymentChannel.paymentChannel === 'yinshi') {
                    let parentOrgPaymentChannel = JSON.parse(this.receiptAccountInfo.parentOrgPaymentChannel.paramData);
                    return [
                        {
                            value : 'auto',
                            name : '自定义',
                            partnerId : paymentChannel.partnerId,
                            merchantId : paymentChannel.merchantId,
                            payChannel : (function () {
                                let result = [];
                                if (paymentChannel.weixinOpenStatus === 'open') {
                                    result.push('weixin');
                                }
                                if (paymentChannel.aliOpenStatus === 'open') {
                                    result.push('alipay');
                                }
                                return result;
                            })(),
                        },
                        {
                            value : this.receiptAccountInfo.parentManageId,
                            name : this.receiptAccountInfo.parentManageName,
                            partnerId : parentOrgPaymentChannel.partnerId,
                            merchantId : parentOrgPaymentChannel.merchantId,
                            payChannel : (function () {
                                let result = [];
                                if (parentOrgPaymentChannel.weixinOpenStatus === 'open') {
                                    result.push('weixin');
                                }
                                if (parentOrgPaymentChannel.aliOpenStatus === 'open') {
                                    result.push('alipay');
                                }
                                return result;
                            })(),
                        }
                    ];
                } else {
                    return [{
                        value : 'auto',
                        name : '自定义',
                        partnerId : paymentChannel.partnerId,
                        merchantId : paymentChannel.merchantId,
                        payChannel : (function () {
                            let result = [];
                            if (paymentChannel.weixinUseStatus === 'enabled') {
                                result.push('weixin');
                            }
                            if (paymentChannel.aliOpenStatus === 'open') {
                                result.push('alipay');
                            }
                            return result;
                        })(),
                    }];
                }
            },
            //机构类型
            nodeType () {
                if (this.receiptAccountInfo && this.receiptAccountInfo.nodeType) {
                    return this.receiptAccountInfo.nodeType;
                } else {
                    return '';
                }
            },
            //审核状态 仅合作伙伴才有
            auditStatus () {
                if (this.receiptAccountInfo && this.receiptAccountInfo.auditStatus) {
                    return this.receiptAccountInfo.auditStatus;
                } else {
                    return '';
                }
            },
            //支付渠道字典数据
            paymentChannelList () {
                if (this.isScenic) {
                    return paymentChannelList;
                } else {
                    return paymentChannelList.filter((item) => {
                        return item.value !== 'useCorpPayAcc';
                    });
                }
            },
            //表单校验规则
            ruleValidate () {
                return {
                    MerchantId : [
                        {
                            required : this.paymentChannel === 'yinshi',
                            message : this.$t('inputField',{ field : this.$t('MerchantID') }),
                            trigger : 'blur'
                        },
                        { max : 50, message : this.$t('errorMaxLength',{ field : this.$t('MerchantID'),length : 50 }), trigger : 'blur' }
                    ],
                    partnerId : [
                        {
                            required : this.paymentChannel === 'yinshi',
                            message : this.$t('inputField',{ field : this.$t('partnerID') }),
                            trigger : 'blur'
                        },
                        { max : 50, message : this.$t('errorMaxLength',{ field : this.$t('partnerID'),length : 50 }), trigger : 'blur' }
                    ]
                }
            },
            //微信账户配置信息是否必填
            weixinRequired () {
                if (this.wxoraliFormData.officialAccountsAppID !== '' ||
                    this.wxoraliFormData.merchantNum !== '' ||
                    this.wxoraliFormData.secretKey !== '') {
                    return true;
                } else {
                    return false;
                }
            },
            //支付宝账户信息是否必填
            aliUseReuired () {
                if (this.wxoraliFormData.appID !== '' ||
                    this.wxoraliFormData.privateKey !== '' ||
                    this.wxoraliFormData.publicKey !== '') {
                    return true;
                } else {
                    return false;
                }
            },
            //微信或支付宝账户配置表单校验规则
            wxoraliRuleValidate () {
                return {
                    officialAccountsAppID : [
                        {
                            required : this.paymentChannel === 'wxorali' && this.weixinRequired,
                            message : this.$t('inputField',{ field : this.$t('appID') }),
                            trigger : 'blur',
                        },
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('appID'),length : 50 }) }
                    ],
                    merchantNum : [
                        {
                            required : this.paymentChannel === 'wxorali' && this.weixinRequired,
                            message : this.$t('inputField',{ field : this.$t('商户号') }),
                            trigger : 'blur',
                        },
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('商户号'),length : 50 }) }
                    ],
                    secretKey : [
                        {
                            required : this.paymentChannel === 'wxorali' && this.weixinRequired,
                            message : this.$t('inputField',{ field : this.$t('API密钥') }),
                            trigger : 'blur',
                        },
                        { max : 50,trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('API密钥'),length : 50 }) }
                    ],
                    appID : [
                        {
                            required : this.paymentChannel === 'wxorali' && this.aliUseReuired,
                            message : this.$t('inputField',{ field : this.$t('appID') }),
                            trigger : 'blur',
                        },
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('appID'),length : 50 }) }
                    ],
                    privateKey : [
                        {
                            required : this.paymentChannel === 'wxorali' && this.aliUseReuired,
                            message : this.$t('inputField',{ field : this.$t('私钥') }),
                            trigger : 'blur',
                        },
                        { max : 50, trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('私钥'),length : 50 }) }
                    ],
                    publicKey : [
                        {
                            required : this.paymentChannel === 'wxorali' && this.aliUseReuired,
                            message : this.$t('inputField',{ field : this.$t('公钥') }),
                            trigger : 'blur',
                        },
                        {max : 50,trigger : 'blur', message : this.$t('errorMaxLength', { field : this.$t('公钥'),length : 50 }) }
                    ]
                }
            },
            //上级账户配置信息
            parentOrgPaymentChannel () {
                if (this.receiptAccountInfo && this.receiptAccountInfo.parentOrgPaymentChannel) {
                    return this.receiptAccountInfo.parentOrgPaymentChannel;
                } else {
                    return {};
                }
            },
            //该节点账户配置信息
            orgPaymentChannel () {
                if (this.receiptAccountInfo && this.receiptAccountInfo.orgPaymentChannel) {
                    return this.receiptAccountInfo.orgPaymentChannel;
                } else {
                    return {};
                }
            }
        },
        watch : {
            //监听节点信息变化重置收款账户信息
            receiptAccountInfo : {
                handler (newVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
                        let parentOrgPaymentChannelInfo = (newVal.parentOrgPaymentChannel && newVal.parentOrgPaymentChannel.paramData) ?
                            JSON.parse(newVal.parentOrgPaymentChannel.paramData) : {};
                        let orgPaymentChannelInfo = (newVal.orgPaymentChannel && newVal.orgPaymentChannel.paramData) ?
                            JSON.parse(newVal.orgPaymentChannel.paramData) : {};
                        this.setReceiptAccountInfo({
                            useCorpPayAcc : newVal.useCorpPayAcc === 'true' ? true : false,
                            paymentChannel : newVal.useCorpPayAcc === 'true' ? 'useCorpPayAcc' :
                                newVal.orgPaymentChannel ? newVal.orgPaymentChannel.paymentChannel : 'none',
                            paymentChannelInfo : newVal.useCorpPayAcc === 'true' ?
                                parentOrgPaymentChannelInfo : orgPaymentChannelInfo,
                        });
                    }
                },
                immediate : true
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .online-receipt{
        @include block_outline($height : auto);
        overflow: auto;

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
        .data-wrap{
            @include block_outline($height : auto);

            .edit-wrap{
                margin: 10px 0 20px 0;
                @include block_outline($height : 30px);
                display: flex;
                line-height: 30px;

                .edit-left-bar {
                    flex: 1 0;
                    flex-basis: 50%;
                    text-align: left;

                    .inline-label {
                        margin-left: 10px;
                    }
                }
                .edit-right-bar {
                    flex: 1 0;
                    flex-basis: 50%;
                    text-align: right;
                }

                .edit-right-bar,
                .save{
                    color: $color_blue;
                    cursor: pointer;
                }

                .cancel{
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
            .tip {
                width: 100%;
                min-height: 200px;
                box-sizing: border-box;
                padding: 10px 0 10px 10px;
                line-height: 200px;
                text-align: center;
                color: $color_gray;
            }

            .flex-wrapper {
                display: flex;
                width: 100%;

                .flex-box {
                    flex: 1 0;
                    flex-basis: 50%;

                    .box-title {
                        margin-bottom: 5px;
                        height: 40px;
                        line-height: 40px;
                        .form-title {
                            display: inline-block;
                            width: 115px;
                        }
                    }
                }
            }
            .err-tip {
                color: $color_red;
                font-size: 12px;
            }
        }

        .options-wrap{
            @include overflow_tip();
        }
    }
</style>
