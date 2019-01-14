1<!--
内容：个人会员卡/企业会员卡
作者：djc
日期：
-->

<template>
    <div class="personal-card">
        <Form ref="formValidate"
              :model="cardParam"
              :rules="ruleValidate"
              label-position="top">
            <h3 v-if="cardType === 'personalCard'">{{$t('cardOwnerInfo')}}</h3><!--持卡人信息-->
            <h3 v-else-if="cardType === 'companyCard'">{{$t('companyCardHandler')}}</h3><!--企业及持卡人信息-->
            <i-row>
                <i-col span="12">
                    <!--姓名-->
                    <Form-item :label="$t('name')" prop="custName">
                        <Input v-model.trim="cardParam.custName"
                               style="width: 280px"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--手机号-->
                    <Form-item :label="$t('mobilePhone')"
                               prop="phoneNum"
                               style="float:right;">
                        <Input v-model.trim="cardParam.phoneNum"
                               style="width: 280px"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <!--性别-->
                    <Form-item :label="$t('gender')" prop="gender">
                        <Select v-model="cardParam.gender"
                                style="width: 280px"
                                :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="(item,index) in enumData.genderEnum" :key="index"
                                    :value="item.name">
                                {{$t(item.desc)}}
                            </Option>
                        </Select>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--生日-->
                    <Form-item :label="$t('birthday')"
                               v-if="cardType === 'personalCard'"
                               prop="birthDay"
                               style="float:right;">
                        <Date-picker
                            type="date"
                            style="width: 280px"
                            v-model="cardParam.birthDay"
                            :editable="false"
                            :options="dateOption"
                            format="yyyy-MM-dd"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                    <!--企业名称-->
                    <Form-item :label="$t('company_name')"
                               v-if="cardType === 'companyCard'"
                               prop="companyName"
                               style="float:right;">
                        <Input v-model.trim="cardParam.companyName"
                               style="width: 280px"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <!--证件类型-->
                    <Form-item :label="$t('credentialsType')" prop="certificationType">
                        <Select v-model="cardParam.certificationType"
                                style="width: 280px"
                                :placeholder="$t('selectField', {msg: $t('credentialsType')})"
                                @on-change="idTypeChange"><!--请选择证件类型-->
                            <Option v-for="item in enumData.idType"
                                    :key="item.id"
                                    :value="item.id">
                                {{item.name}}
                            </Option>
                        </Select>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--证件编号-->
                    <Form-item :label="$t('credentialsCode')"
                               prop="idCardNumber"
                               style="float:right;">
                        <Input v-model.trim="cardParam.idCardNumber"
                               :disabled="!cardParam.certificationType"
                               style="width: 280px"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </i-col>
            </i-row>
            <i-row v-if="showMemberRecharge">
                <i-col span="12">
                    <Form-item :label="$t('payPass')" prop="tradePassword">
                        <span class="blue-label"
                                v-if="cardParam.tradePassword"
                                @click="setPasswordModalShow = true">
                            {{$t('haveSetted')}}
                        </span>
                        <span  v-else
                               class="blue-label"
                                @click="setPasswordModalShow = true">
                            {{$t('setTradePass')}}
                        </span>
                    </Form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="24">
                    <!--备注-->
                    <Form-item :label="$t('remark')" prop="remark" style="width: 100%;">
                        <Input v-model.trim="cardParam.remark"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="24">
                    <Form-item :label="cardType === 'personalCard' ? $t('address') : $t('companyAddress')" prop="homeAddr" style="width: 100%;"><!--地址-->
                        <Input v-model.trim="cardParam.homeAddr"
                               :placeholder="$t('inputField', {field: $t('familyAddress')})"/><!--请输入家庭地址-->
                    </Form-item>
                </i-col>
            </i-row>

            <!--实体卡信息-->
            <entity-card-info :title="'entityCardInfo'"
                              ref="entityCardInfo"
                              @set-card-data="getCardData">
            </entity-card-info>

            <template v-if="cardIsSaling">
                <!--收款方式-->
                <h3 style="margin-top: 35px;">{{$t('paymentMethod')}}</h3>
                <Form-item prop="payType" :label="$t('paymentMethod')" >
                    <RadioGroup v-model="cardParam.payType">
                        <Radio v-for="(item,index) in payAccountList"
                               :disabled="selectedCard.salePrice <= 0"
                               :key="index"
                               :label="item.value">
                            {{$t('onlineAccount.' + item.value)}}
                        </Radio>
                    </RadioGroup>
                </Form-item>
            </template>
        </Form>
        <!--footer 按钮-->
        <div class="content-footer">
            <Button type="primary"
                    :loading="loading"
                    @click="formValidateFunc">
                {{$t('confirmAdd')}}
            </Button>
            <Button type="ghost"
                    @click="cancelOperate">
                {{$t("cancel")}}
            </Button>
        </div>

        <!--设置支付密码模态框-->
        <set-password-modal v-model="setPasswordModalShow"
                            @set-pay-password="getPayPassword">
        </set-password-modal>
        <!--确认会员信息模态框-->
        <confirm-member-info v-model="showConfirmModal"
                             @confirm-data="confirmDataInfo">
            <Form :rules="ruleValidate" :label-width="110">
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('selectCardAttribution') })">
                        {{selectedCard.levelName | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12" v-if="cardIsSaling">
                    <FormItem :label="$t('colonSetting',{ key : $t('memberCardSales') })">
                        {{selectedCard.salePrice | moneyFilter | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12"
                       v-if="cardType === 'companyCard'">
                    <FormItem :label="$t('colonSetting',{ key : $t('company_name') })">
                        {{cardParam.companyName | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('name') })">
                        {{cardParam.custName | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('gender') })">
                        {{$t(cardParam.gender) | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('mobilePhone') })">
                        {{cardParam.phoneNum | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('credentialsType') })">
                        {{idNumName | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('credentialsCode') })">
                        {{cardParam.idCardNumber | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12" v-if="cardType === 'personalCard'">
                    <FormItem :label="$t('colonSetting',{ key : $t('birthday') })">
                        {{cardParam.birthDay | timeFormat('yyyy-MM-dd') | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('remark') })">
                        <div class="word-wrap" v-w-title="cardParam.remark">
                            {{cardParam.remark | contentFilter}}
                        </div>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : cardType === 'personalCard' ? $t('address') : $t('companyAddress') })">
                        <div class="word-wrap" v-w-title="cardParam.homeAddr">
                            {{cardParam.homeAddr | contentFilter}}
                        </div>
                    </FormItem>
                </i-col>
            </Form>
        </confirm-member-info>

        <!--查询支付结果模态框-->
        <loop-for-pay-result v-model="payModalShow"
                             ref="payResultModal"
                             :transaction-id="transctionId"
                             @search-success="cancelOperate"
                             @start-pay="createMember">
        </loop-for-pay-result>
    </div>
</template>
<script type="text/ecmascript-6">
    import { genderEnum } from '@/assets/js/constVariable';
    import { validator } from 'klwk-ui';
    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import entityCardInfo from '../components/entityCardInfo.vue';
    import setPasswordModal from '../components/setPasswordModal';
    import confirmMemberInfo from '../components/confirmDetailModal';
    import loopForPayResult from '../../../../components/loopForPayResult/loopForPayResult';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            entityCardInfo,
            setPasswordModal,
            confirmMemberInfo,
            loopForPayResult
        },
        props : {
            selectedCard : {
                type : Object,
                default () {
                    return {};
                }
            },
            //卡类型
            'card-type' : {
                type : String,
                default : ''
            }
        },
        data () {
            let validateMethod = {

                mobile : (rule, value, callback) => {
                    if (!validator.isMobile(value)) {
                        callback(this.$t('errorFormat', { field : this.$t('phoneNum') }));
                    } else {
                        callback();
                    }
                },

                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error(this.$t('errorIrregular'))); // 输入内容不合规则
                    } else {
                        callback();
                    }
                }

            };

            //校验字段长度
            const validateFileLength = (rule, value, callback) => {
                if (common.isNotEmpty(value)) {
                    if (value.length > rule.maxLength) {
                        callback(this.$t('errorMaxLength', { field : rule.name, length : rule.maxLength }));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            //校验字符串是否包含数字和字母
            const validateNumAndStr = (rule, value, callback) => {
                if (common.isNotEmpty(value)) {
                    if (this.cardParam.certificationType === '1') {
                        if (validator.isIdCard(value)) {
                            callback();
                        } else {
                            callback(this.$t('errorFormat', { field : rule.name }));
                        }
                    } else {
                        if (/^[A-Za-z0-9]{0,}$/g.test(value)) {
                            if (value.length > rule.maxLength) {
                                callback(this.$t('errorMaxLength', { field : rule.name, length : rule.maxLength }));
                            } else {
                                callback();
                            }
                        } else {
                            callback(this.$t('errorFormat', { field : rule.name }));
                        }
                    }
                } else {
                    callback();
                }
            };

            return {
                // 新增/修改按钮loading
                loading : false,
                dateOption : {
                    disabledDate : function (value) {
                        return value && ( value.format('yyyy-MM-dd') < '1900-01-01' || value.format('yyyy-MM-dd') > new Date().format('yyyy-MM-dd'));
                    }
                },
                enumData : {
                    idType : [],
                    genderEnum : genderEnum
                },

                // 持卡人信息表单
                cardParam : {
                    "custName" : "",//姓名
                    "phoneNum" : "",//手机号
                    "gender" : "",// 性别
                    "birthDay" : '',//生日
                    "certificationType" : "",//证件类型
                    "idCardNumber" : "",//证件号码
                    "remark" : "",//备注
                    "homeAddr" : "",//家庭地址
                    "tradePassword" : "",//支付密码
                    "payType" : "cash",//收款方式
                    "companyName" : "",//企业名称
                    "tpNo" : "",//物理卡号
                    "tpCardNo" : "",//卡面号
                    "qrCode" : "",//扫码结果
                },
                //设置支付密码模态框是否显示
                setPasswordModalShow : false,
                //显示确认信息模态框
                showConfirmModal : false,
                // 表单校验规则
                ruleValidate : {
                    custName : [
                        { required : true, message : this.$t('inputField', { field : this.$t('name') }), trigger : 'blur' }, // 姓名不能为空
                        {
                            type : 'string',
                            max : 15,
                            message : this.$t('errorMaxLength', { field : this.$t('name'), length : 15 }),
                            trigger : 'blur'
                        }, // 姓名不能多于15个字符
                        { validator : validateMethod.emoji, trigger : 'blur' }
                    ],
                    phoneNum : [
                        {
                            required : true,
                            message : this.$t('inputField', { field : this.$t('mobilePhone') }),
                            trigger : 'blur'
                        }, // 手机号不能为空
                        { validator : validateMethod.mobile, trigger : 'blur' }
                    ],
                    gender : [
                        { required : true, message : this.$t('selectField', { msg : this.$t('gender') }), trigger : 'change' }, // 性别不能为空
                    ],
                    remark : [
                        {
                            validator : validateFileLength,
                            trigger : 'blur',
                            name : this.$t('remark'),
                            maxLength : 100
                        }
                    ],
                    homeAddr : [
                        { validator : validateFileLength, trigger : 'blur', name : this.$t('address'), maxLength : 100 }
                    ],
                    idCardNumber : [
                        { required : true, message : this.$t('inputField', { field : this.$t('identificationNum') }), trigger : 'blur' }, // 证件编号不能为空
                        { validator : validateNumAndStr, trigger : 'blur', name : this.$t('credentialsCode'), maxLength : 40 }
                    ],
                    certificationType : [
                        { required : true, message : this.$t('selectField', { msg : this.$t('credentialsType') }), trigger : 'change' }, // 证件类型不能为空
                    ],
                    birthDay : [
                        {
                            required : true,
                            message : this.$t('selectField', { msg : this.$t('birthday') }),
                            trigger : 'change',
                            type : 'date'
                        }
                    ],
                    payType : [
                        {
                            required : true,
                            message : this.$t('selectField', { msg : this.$t('payType') }),
                            trigger : 'blur'
                        }
                    ],
                    tradePassword : [
                        {
                            required : true,
                            message : this.$t('setTradePass'),
                            trigger : 'change',
                        },
                    ],
                    companyName : [
                        {
                            required : true,
                            message : this.$t('inputField', { field : this.$t('company_name') }),
                            trigger : 'blur',
                        },
                    ]
                },
                //支付查询结果是否显示
                payModalShow : false,
                //内部交易id
                transctionId : '',
            };
        },
        created () {
            this.queryDocument();
        },
        methods : {
            //查询证件类型
            queryDocument () {
                ajax.post('queryDocument', {
                    isDeleted : 'false',
                    pageNo : 1,
                    pageSize : 99999,
                }).then(res => {
                    if (res.success) {
                        this.enumData.idType = res.data.data || [];
                    } else {
                        this.enumData.idType = [];
                    }
                });
            },
            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.showConfirmModal = true;
                    }
                });
            },
            //新增/编辑会员接口
            saveAndEditMember (url, params) {
                this.loading = true;
                this.showConfirmModal = false;
                ajax.post(url, {
                    memberInfo : JSON.stringify(params.memberInfo),
                    channelType : this.cardParam.payType,
                    qrCode : this.cardParam.qrCode,
                    txnAmt : this.selectedCard.salePrice,
                    txnShortDesc : this.cardParam.payType === 'alipay' ? 'test' : ''
                }).then(res => {
                    if (res.success) {
                        this.$refs.payResultModal.setStage('success');
                        this.payModalShow = true;
                        this.cancelOperate();
                    } else {
                        if (res.code === 'M008') {
                            this.payModalShow = false;
                            this.$Message.error(this.$t('phoneExistCard'));// 手机号已被注册，请更换手机号
                        } else if (res.code === 'P002') {
                            this.startSearchForPayResult({
                                ...(res.data ? res.data : {})
                            });
                        } else if (res.code === 'P001') {
                            if (this.payModalShow) {
                                this.$refs.payResultModal.setStage('fail');
                            } else {
                                this.$Message.error(this.$t('payField'));
                            }
                        } else {
                            if (this.payModalShow) {
                                this.$refs.payResultModal.setStage('fail');
                            } else {
                                this.$Message.error(this.$t('failureTip',{ tip : this.$t('add') }));
                            }
                        }
                    }
                }).finally(() => {
                    this.loading = false;
                });
            },
            /**
             * 取消操作
             */
            cancelOperate () {
                this.cardParam.custName = '';
                this.cardParam.phoneNum = '';
                this.cardParam.gender = '';
                this.cardParam.birthDay = '';
                this.cardParam.certificationType = '';
                this.cardParam.idCardNumber = '';
                this.cardParam.remark = '';
                this.cardParam.homeAddr = '';
                this.cardParam.tradePassword = '';
                this.cardParam.payType = '';
                this.cardParam.companyName = '';
                this.cardParam.tpNo = '';
                this.cardParam.tpCardNo = '';
                this.cardParam.qrCode = '';
                this.$refs.formValidate.resetFields();
                this.$refs.entityCardInfo.resetInfo();
            },
            /**
             * 获取支付密码
             * @param{String} payPassword
             */
            getPayPassword (payPassword) {
                this.cardParam.tradePassword = payPassword;
                this.$refs.formValidate.validateField('tradePassword');
            },
            /**
             * 确认用户信息成功，可以新开卡
             * @param{String} qrCode 扫码枪扫码结果
             */
            createMember (qrCode) {
                let params = {
                    memberInfo : Object.assign({},{
                        ...this.cardParam,
                        ...this.selectedCard.memberCard,
                        birthDay : this.cardParam.birthDay ? this.cardParam.birthDay.format('yyyy-MM-dd') : '',
                    }),
                };
                this.cardParam.qrCode = qrCode;
                this.saveAndEditMember('saveNewMemberInfo', params);
            },
            /**
             * 获取读取的实体卡信息
             * @param{String} faceNum 卡面号
             * @param{String} physicalNum 物理卡号
             */
            getCardData ({ faceNum,physicalNum }) {
                this.cardParam.tpCardNo = faceNum;
                this.cardParam.tpNo = physicalNum;
            },
            /**
             * 开启查询支付结果
             * @param{Object} transctionId 内部交易id
             */
            startSearchForPayResult ({ transctionId }) {
                this.transctionId = transctionId;
                this.$refs.payResultModal.startSearchPayResult();
            },
            /**
             * 确认填写的数据是否正确
             */
            confirmDataInfo () {
                if (this.cardParam.payType === 'cash' || !this.selectedCard.salePrice) {
                    this.createMember();
                } else {
                    this.$refs.payResultModal.setStage('scan');
                    this.payModalShow = true;
                    this.showConfirmModal = false;
                }
            },
            /**
             * 选择的证件类型修改，重新校验证件编号
             */
            idTypeChange () {
                if (this.cardParam.idCardNumber) {
                    this.$refs.formValidate.validateField('idCardNumber');
                }
            }
        },
        computed : {
            //证件名称
            idNumName () {
                let idTypes = this.enumData.idType;
                for (let i = 0,j = idTypes.length; i < j; i++ ) {
                    if (idTypes[i]['id'] === this.cardParam.certificationType) {
                        return idTypes[i]['name'];
                    }
                }
                return '';
            },
            ...mapGetters([
                'payAccountList',
                'memberConfigInfo'
            ]),
            //是否显示会员卡售卡信息
            cardIsSaling () {
                return this.selectedCard && this.selectedCard.cardForm === 'sale';
            },
            //是否可以显示支付密码
            showMemberRecharge () {
                return this.memberConfigInfo && this.memberConfigInfo['memberRecharge'] && this.memberConfigInfo['memberRecharge'] === 'true';
            },
        },
        watch : {
            //监听会员卡售价的大小，如果小于0，只能选择现金支付
            'selectedCard.salePrice' (newVal,oldVal) {
                if (!newVal) {
                    this.cardParam.payType = 'cash';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .personal-card {
        @include padding_place($height : 50px);

        h3 {
            margin-top: 20px;
            margin-bottom: 15px;
            text-align: center;
            font-size: $font_size_16px;
            color: $color_333;
        }

        .blue-label{
            color: $color_blue;
            cursor: pointer;
        }
        .content-footer {
            @include absolute_pos(absolute,$left : 0,$right : 0,$bottom : 0);
            text-align: center;
            background: $color_fff;
            height: 56px;
            line-height: 56px;
            box-shadow: 0 -5px 3px 0 rgba(0, 0, 0, 0.03);
            background: $color_fff;
            z-index: 10;

            /deep/ .ivu-btn {
                width: 108px;
                &:nth-child(1) {
                    margin-right: 20px;
                }
            }
        }
    }
</style>
