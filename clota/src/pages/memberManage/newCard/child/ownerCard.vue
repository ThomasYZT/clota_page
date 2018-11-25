<!--
内容：业主卡
作者：djc
日期：
-->

<template>
    <div class="personal-card">
        <Form ref="formValidate"
              :model="cardParam"
              :rules="ruleValidate"
              label-position="top">
            <h3>{{$t('cardOwnerInfo')}}</h3><!--持卡人信息-->
            <i-row>
                <i-col span="12">
                    <!--姓名-->
                    <Form-item :label="$t('name')"
                               prop="custName">
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
                            <Option v-for="(item,index) in enumData.genderEnum"
                                    :key="index"
                                    :value="item.name">
                                {{$t(item.desc)}}
                            </Option>
                        </Select>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--生日-->
                    <Form-item :label="$t('birthday')"
                               prop="birthDay"
                               style="float:right;">
                        <Date-picker
                            style="width: 280px"
                            type="date"
                            :editable="false"
                            v-model="cardParam.birthDay"
                            :options="dateOption"
                            format="yyyy-MM-dd"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <!--证件类型-->
                    <Form-item :label="$t('credentialsType')" prop="certificationType">
                        <Select v-model="cardParam.certificationType"
                                style="width: 280px"
                                :placeholder="$t('selectField', {msg: $t('credentialsType')})"><!--请选择证件类型-->
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
                               style="width: 280px"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <!--购房总金额-->
                    <Form-item :label="$t('homeBuyMoney')" prop="houseMoney">
                        <Input v-model.trim="cardParam.houseMoney"
                               style="width: 280px"
                               :placeholder="$t('inputField', {field: $t('homeBuyMoney')})"/>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--房产信息-->
                    <Form-item :label="$t('homeInfo')"
                               prop="realEstateInformation"
                               style="float:right;">
                        <Input v-model.trim="cardParam.realEstateInformation"
                               style="width: 280px"
                               :placeholder="$t('inputField', {field: $t('homeInfo')})"/>
                    </Form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <!--购房日期-->
                    <Form-item :label="$t('buyHomeTime')" prop="purchaseDate">
                        <Date-picker
                            style="width: 280px"
                            :editable="false"
                            type="date"
                            v-model="cardParam.purchaseDate"
                            format="yyyy-MM-dd"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--支付密码-->
                    <Form-item :label="$t('payPass')"
                               prop="tradePassword"
                               style="float:right;width: 280px;">
                        <span v-if="cardParam.tradePassword"
                              class="blue-label"
                                @click="setPasswordModalShow = true">
                            {{$t('haveSetted')}}
                        </span>
                        <span v-else
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
                    <Form-item :label="$t('remark')"
                               prop="remark"
                               style="width: 100%;">
                        <Input v-model.trim="cardParam.remark"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </i-col>
            </i-row>
        </Form>
        <!--副卡-->
        <secondary-card :id-type="enumData.idType"
                        :main-card-info="cardParam"
                        @set-vice-card-info="getViceCard"
                        ref="secondaryCard">
        </secondary-card>
        <!--实体卡信息-->
        <owner-entity-card ref="ownerEntityCard"
                           :main-card-info="cardParam"
                           :vice-card-info="viceCardInfo">
        </owner-entity-card>
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
                             @confirm-data="createMember">
            <Form :rules="ruleValidate" :label-width="110">
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('selectCardAttribution') })">
                        {{selectedCard.levelName | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('memberCardSales') })">
                        {{selectedCard.salePrice | moneyFilter | contentFilter}}
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
                    <FormItem :label="$t('colonSetting',{ key : $t('credentialsType') })">
                        {{idNumName | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('identificationNum') })">
                        {{cardParam.idCardNumber | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('birthday') })">
                        {{cardParam.birthDay | timeFormat('yyyy-MM-dd') | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('mobilePhone') })">
                        {{cardParam.phoneNum | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12" >
                    <FormItem :label="$t('colonSetting',{ key : $t('homeBuyMoney') })">
                        <div class="word-wrap">
                            {{cardParam.houseMoney | moneyFilter | contentFilter}}
                        </div>
                    </FormItem>
                </i-col>
                <i-col span="12" >
                    <FormItem :label="$t('colonSetting',{ key : $t('homeInfo') })">
                        <div class="word-wrap" v-w-title="cardParam.realEstateInformation">
                            {{cardParam.realEstateInformation | contentFilter}}
                        </div>
                    </FormItem>
                </i-col>
                <i-col span="12" >
                    <FormItem :label="$t('colonSetting',{ key : $t('buyHomeTime') })">
                        <div class="word-wrap" v-w-title="cardParam.realEstateInformation">
                            {{cardParam.purchaseDate | timeFormat('yyyy-MM-dd') | contentFilter}}
                        </div>
                    </FormItem>
                </i-col>
                <i-col span="12" >
                    <FormItem :label="$t('colonSetting',{ key : $t('remark') })">
                        <div class="word-wrap" v-w-title="cardParam.remark">
                            {{cardParam.remark | contentFilter}}
                        </div>
                    </FormItem>
                </i-col>
                <!--<i-row v-if="viceCardInfo.length > 0">副卡信息</i-row>-->
                <div class="card-title" v-if="viceCardInfo.length > 0">副卡信息</div>
                <template v-for="(item,index) in viceCardInfo">
                    <i-col span="12" :key="index + 'custName'">
                        <FormItem :label="$t('colonSetting',{ key : $t('name') })">
                            <div class="word-wrap" >
                                {{item.custName | contentFilter}}
                            </div>
                        </FormItem>
                    </i-col>
                    <i-col span="12" :key="index + 'gender'">
                        <FormItem :label="$t('colonSetting',{ key : $t('gender') })">
                            {{$t(item.gender) | contentFilter}}
                        </FormItem>
                    </i-col>
                    <i-col span="12" :key="index + 'certificationType'">
                        <FormItem :label="$t('colonSetting',{ key : $t('credentialsType') })">
                            <div class="word-wrap" >
                                {{idTypeObj[item.certificationType] ? idTypeObj[item.certificationType]['name'] : '' | contentFilter}}
                            </div>
                        </FormItem>
                    </i-col>
                    <i-col span="12" :key="index + 'idCardNumber'">
                        <FormItem :label="$t('colonSetting',{ key : $t('identificationNum') })">
                            <div class="word-wrap" v-w-title="item.idCardNumber">
                                {{item.idCardNumber | contentFilter}}
                            </div>
                        </FormItem>
                    </i-col>
                    <i-col span="12" :key="index + 'birthDay'">
                        <FormItem :label="$t('colonSetting',{ key : $t('birthday') })">
                            <div class="word-wrap" >
                                {{item.birthDay | timeFormat('yyyy-MM-dd') | contentFilter}}
                            </div>
                        </FormItem>
                    </i-col>
                    <i-col span="12" :key="index + 'phoneNum'">
                        <FormItem :label="$t('colonSetting',{ key : $t('mobilePhone') })">
                            {{item.phoneNum | contentFilter}}
                        </FormItem>
                    </i-col>
                    <div class="hr"></div>
                </template>
            </Form>
        </confirm-member-info>
    </div>
</template>
<script type="text/ecmascript-6">
    import { genderEnum } from '@/assets/js/constVariable';
    import { validator } from 'klwk-ui';
    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import secondaryCard from './secondaryCard.vue';
    import ownerEntityCard from './ownerEntityCard.vue';
    import setPasswordModal from '../components/setPasswordModal';
    import confirmMemberInfo from '../components/confirmDetailModal';

    export default {
        components : {
            secondaryCard,
            ownerEntityCard,
            setPasswordModal,
            confirmMemberInfo
        },
        props : {
            //会员卡信息
            selectedCard : {
                type : Object,
                default () {
                    return {};
                }
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
                    if (/^[A-Za-z0-9]{0,}$/g.test(value)) {
                        if (value.length > rule.maxLength) {
                            callback(this.$t('errorMaxLength', { field : rule.name, length : rule.maxLength }));
                        } else {
                            callback();
                        }
                    } else {
                        callback(this.$t('filterError', { field : rule.name }));
                    }
                } else {
                    callback();
                }
            };

            //校验购房总金额
            const validateHouseMoney = (rule,value,callback) => {
                common.validateMoney(value,0,15).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t('errorMaxLength',{ field : this.$t('homeBuyMoney'),length : 15 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('homeBuyMoney') }));
                    }
                });
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
                    "birthDay" : "",//生日
                    "certificationType" : "",//证件类型
                    "idCardNumber" : "",//证件号码
                    "remark" : "",//备注
                    "homeAddr" : "",//家庭地址
                    "houseMoney" : "",//购房总金额
                    "realEstateInformation" : "",//房产信息
                    "purchaseDate" : "",//购房日期
                    "tradePassword" : "",//支付密码
                },
                //设置支付密码模态框是否显示
                setPasswordModalShow : false,
                //显示确认信息模态框
                showConfirmModal : false,
                //副卡信息
                viceCardInfo : [],
                // 表单校验规则
                ruleValidate : {
                    custName : [
                        // 姓名不能为空
                        {
                            required : true,
                            message : this.$t('inputField', { field : this.$t('name') }),
                            trigger : 'blur'
                        },
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
                        {
                            required : true,
                            message : this.$t('inputField', { field : this.$t('gender') }),
                            trigger : 'change'
                        }, // 性别不能为空
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
                        {
                            validator : validateFileLength,
                            trigger : 'blur',
                            name : this.$t('address'),
                            maxLength : 100
                        }
                    ],
                    idCardNumber : [
                        {
                            required : true,
                            message : this.$t('inputField', { field : this.$t('identificationNum') }),
                            trigger : 'blur'
                        }, // 证件编号不能为空
                        {
                            validator : validateNumAndStr,
                            trigger : 'blur',
                            name : this.$t('credentialsCode'),
                            maxLength : 40
                        }
                    ],
                    certificationType : [
                        {
                            required : true,
                            message : this.$t('errorEmpty', { msg : this.$t('credentialsType') }),
                            trigger : 'change'
                        }, // 证件类型不能为空
                    ],
                    birthDay : [
                        {
                            required : true,
                            message : this.$t('selectField', { msg : this.$t('birthday') }),
                            trigger : 'change',
                            type : 'date'
                        }
                    ],
                    purchaseDate : [
                        {
                            required : true,
                            message : this.$t('selectField', { msg : this.$t('buyHomeTime') }),
                            trigger : 'change',
                            type : 'date'
                        }
                    ],
                    houseMoney : [
                        {
                            required : true,
                            message : this.$t('inputField', { field : this.$t('homeBuyMoney') }),
                            trigger : 'blur',
                        },
                        {
                            validator : validateHouseMoney,
                            trigger : 'blur'
                        }
                    ],
                    realEstateInformation : [
                        {
                            required : true,
                            message : this.$t('errorEmpty', { msg : this.$t('homeInfo') }),
                            trigger : 'blur'
                        },
                        {
                            trigger : 'blur',
                            message : this.$t('errorMaxLength', { field : this.$t('homeInfo'), length : 100 }),
                            max : 100
                        }
                    ],
                    tradePassword : [
                        {
                            required : true,
                            message : this.$t('setTradePass'),
                            trigger : 'change',
                        },
                    ]
                }
            };
        },
        created () {
            this.queryDocument();
        },
        methods : {
            /**
             * 查询证件类型
             */
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
                Promise.all([this.$refs.secondaryCard.validateForm(),new Promise((resolve,reject) => {
                    this.$refs.formValidate.validate(valid => {
                        if (valid) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                })]).then(() => {
                    this.showConfirmModal = true;
                });
            },
            //新增/编辑会员接口
            saveAndEditMember (url, params) {
                this.loading = true;
                this.showConfirmModal = false;
                ajax.post(url, {
                    memberInfo : JSON.stringify(params.memberInfo),
                    viceCard : JSON.stringify(params.viceCard),
                    channelType : 'cash'
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') })); // 新增会员成功
                        this.cancelOperate();
                    } else {
                        if (res.message === 'M008') {
                            this.$Message.error(this.$t('phoneExistCard'));
                        } else if (res.message === 'M029') {
                            this.$Message.error(this.$t('viceCardAddErr'));
                        } else {
                            this.$Message.error(this.$t('failureTip',{ tip : this.$t('add') }));
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
                this.$refs.formValidate.resetFields();
                this.$refs.secondaryCard.resetTableData();
                this.$refs.ownerEntityCard.resetTableData();
                this.cardParam.custName = '';
                this.cardParam.phoneNum = '';
                this.cardParam.gender = '';
                this.cardParam.birthDay = '';
                this.cardParam.certificationType = '';
                this.cardParam.idCardNumber = '';
                this.cardParam.remark = '';
                this.cardParam.homeAddr = '';
                this.cardParam.houseMoney = '';
                this.cardParam.realEstateInformation = '';
                this.cardParam.purchaseDate = '';
                this.cardParam.tradePassword = '';
            },
            /**
             * 获取支付密码
             * @param{String} payPassword 支付密码
             */
            getPayPassword (payPassword) {
                this.cardParam.tradePassword = payPassword;
                this.$refs.formValidate.validateField('tradePassword');
            },
            /**
             * 获取添加的副卡信息
             * @param{Array} data 副卡信息
             */
            getViceCard (data) {
                this.viceCardInfo = data;
            },
            /**
             * 关联实体卡和会员的信息
             */
            linkCardInfoWithMember () {
                //主卡信息
                let memberInfo = {};
                //副卡信息
                let viceCard = [];
                //已读取的实体卡信息
                let cardInfo = this.$refs.ownerEntityCard.getEntityCardInfo();
                memberInfo = {
                    ...this.cardParam,
                    tpNo : cardInfo[0]['tpNo'],
                    tpCardNo : cardInfo[0]['tpCardNo'],
                    birthDay : this.cardParam['birthDay'] ? this.cardParam['birthDay'].format('yyyy-MM-dd') : '',
                    purchaseDate : this.cardParam['purchaseDate'] ? this.cardParam['purchaseDate'].format('yyyy-MM-dd') : '',
                    ...this.selectedCard.memberCard
                };
                viceCard = cardInfo.slice(1).map((item,i) => {
                    return {
                        ...item,
                        tpNo : cardInfo[i + 1]['tpNo'],
                        tpCardNo : cardInfo[i + 1]['tpCardNo'],
                        birthDay : item['birthDay'] ? item['birthDay'].format('yyyy-MM-dd') : '',
                        ...this.selectedCard.memberCard,
                    };
                });
                return {
                    memberInfo,
                    viceCard
                };
            },
            /**
             * 确认用户信息成功，可以新开卡
             */
            createMember () {
                let params = this.linkCardInfoWithMember();
                this.saveAndEditMember('saveNewMemberInfo', params);
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
            //证件类别对象类型
            idTypeObj () {
                let idType = this.enumData.idType;
                let result = {};
                for (let i = 0,j = idType.length; i < j; i++) {
                    result[idType[i]['id']] = idType[i];
                }
                return result;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .personal-card {
        @include padding_place($height : 50px);

         h3 {
            margin-top: 10px;
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
