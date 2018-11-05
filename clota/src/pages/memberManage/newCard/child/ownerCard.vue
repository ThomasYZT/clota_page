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
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('name')" prop="custName"><!--姓名-->
                    <Input v-model.trim="cardParam.custName"
                           :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>
                <Form-item :label="$t('mobilePhone')" prop="phoneNum"><!--手机号-->
                    <Input v-model.trim="cardParam.phoneNum"
                           :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('gender')" prop="gender"><!--性别-->
                    <Select v-model="cardParam.gender" :placeholder="$t('selectField', {msg: ''})">
                        <Option v-for="(item,index) in enumData.genderEnum" :key="index"
                                :value="item.name">
                            {{$t(item.desc)}}
                        </Option>
                    </Select>
                </Form-item>
                <Form-item :label="$t('birthday')" prop="birthday"><!--生日-->
                    <Date-picker
                        type="date"
                        v-model="cardParam.birthday"
                        :options="dateOption"
                        format="yyyy-MM-dd"
                        :placeholder="$t('selectField', {msg: ''})">
                    </Date-picker>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('credentialsType')" prop="certificationType"><!--证件类型-->
                    <Select v-model="cardParam.certificationType"
                            :placeholder="$t('selectField', {msg: $t('credentialsType')})"><!--请选择证件类型-->
                        <Option v-for="item in enumData.idType"
                                :key="item.id"
                                :value="item.id">
                            {{item.name}}
                        </Option>
                    </Select>
                </Form-item>
                <Form-item :label="$t('credentialsCode')" prop="idCardNumber"><!--证件编号-->
                    <Input v-model.trim="cardParam.idCardNumber"
                           :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('购房总金额')" prop="houseMoney"><!--购房总金额-->
                    <Input v-model.trim="cardParam.houseMoney"
                           :placeholder="$t('inputField', {field: $t('购房总金额')})"/>
                </Form-item>
                <Form-item :label="$t('房产信息')" prop="realEstateInformation"><!--房产信息-->
                    <Input v-model.trim="cardParam.realEstateInformation"
                           :placeholder="$t('inputField', {field: $t('房产信息')})"/>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('购房日期')" prop="birthday"><!--购房日期-->
                    <Date-picker
                        type="date"
                        v-model="cardParam.purchaseDate"
                        format="yyyy-MM-dd"
                        :placeholder="$t('selectField', {msg: ''})">
                    </Date-picker>
                </Form-item>
                <Form-item :label="$t('支付密码')" prop="tradePassword">
                    <Button type="ghost">{{$t('设置密码')}}</Button>
                </Form-item>
            </div>
            <Form-item :label="$t('remark')" prop="remark" style="width: 100%;"><!--备注-->
                <Input v-model.trim="cardParam.remark"
                       type="textarea"
                       :rows="3"
                       :placeholder="$t('inputField', {field: ''})"/>
            </Form-item>
        </Form>
        <!--副卡-->
        <secondary-card :id-type="enumData.idType" ref="secondaryCard"></secondary-card>
        <!--实体卡信息-->
        <owner-entity-card ref="ownerEntityCard"></owner-entity-card>
        <!--footer 按钮-->
        <div class="content-footer">
            <template v-if="type === 'add'">
                <Button type="primary"
                        :loading="loading"
                        @click="formValidateFunc">
                    {{$t('confirmAdd')}}
                </Button>
            </template>
            <template v-if="type === 'modify'">
                <Button type="primary"
                        :loading="loading"
                        @click="formValidateFunc">
                    {{$t('confirm')}}
                </Button>
            </template>
            <Button type="ghost"
                    @click="goBack">
                {{$t("cancel")}}
            </Button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {genderEnum} from '@/assets/js/constVariable';
    import {validator} from 'klwk-ui';
    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import entityCardInfo from '../components/entityCardInfo.vue';
    import secondaryCard from './secondaryCard.vue';
    import ownerEntityCard from './ownerEntityCard.vue';

    export default {
        components: {
            entityCardInfo,
            secondaryCard,
            ownerEntityCard
        },
        props: {
            selectedCard: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data() {
            let validateMethod = {

                mobile: (rule, value, callback) => {
                    if (!validator.isMobile(value)) {
                        callback(this.$t('errorFormat', {field: this.$t('phoneNum')}));
                    } else {
                        callback();
                    }
                },

                emoji: (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error(this.$t('errorIrregular')));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                }

            };

            //校验字段长度
            const validateFileLength = (rule, value, callback) => {
                if (common.isNotEmpty(value)) {
                    if (value.length > rule.maxLength) {
                        callback(this.$t('errorMaxLength', {field: rule.name, length: rule.maxLength}));
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
                            callback(this.$t('errorMaxLength', {field: rule.name, length: rule.maxLength}));
                        } else {
                            callback();
                        }
                    } else {
                        callback(this.$t('filterError', {field: rule.name}));
                    }
                } else {
                    callback();
                }
            };

            return {
                //新增/修改
                type: 'add',
                // 新增/修改按钮loading
                loading: false,
                dateOption: {
                    disabledDate: function (value) {
                        return value && ( value.format('yyyy-MM-dd') < '1900-01-01' || value.format('yyyy-MM-dd') > new Date().format('yyyy-MM-dd'));
                    }
                },
                enumData: {
                    idType: [],
                    genderEnum: genderEnum
                },

                // 持卡人信息表单
                cardParam: {
                    "custName": "",//姓名
                    "phoneNum": "",//手机号
                    "gender": "",// 性别
                    "birthDay": "",//生日
                    "certificationType": "",//证件类型
                    "idCardNumber": "",//证件号码
                    "remark": "",//备注
                    "homeAddr": "",//家庭地址
                    "houseMoney": "",//购房总金额
                    "realEstateInformation": "",//房产信息
                    "purchaseDate": "",//购房日期
                    "tradePassword": "",//支付密码
                },

                // 表单校验规则
                ruleValidate: {
                    custName: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('name')}), trigger: 'blur'},     // 姓名不能为空
                        {
                            type: 'string',
                            max: 15,
                            message: this.$t('errorMaxLength', {field: this.$t('name'), length: 15}),
                            trigger: 'blur'
                        },      // 姓名不能多于15个字符
                        {validator: validateMethod.emoji, trigger: 'blur'}
                    ],
                    phoneNum: [
                        {
                            required: true,
                            message: this.$t('errorEmpty', {field: this.$t('mobilePhone')}),
                            trigger: 'blur'
                        },       // 手机号不能为空
                        {validator: validateMethod.mobile, trigger: 'blur'}
                    ],
                    gender: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('gender')}), trigger: 'change'},     // 性别不能为空
                    ],
                    remark: [
                        {
                            validator: validateFileLength,
                            trigger: 'blur',
                            name: this.$t('remark'),
                            maxLength: 100
                        }
                    ],
                    homeAddr: [
                        {validator: validateFileLength, trigger: 'blur', name: this.$t('address'), maxLength: 100}
                    ],
                    idCardNumber: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('identificationNum')}), trigger: 'blur'},     // 证件编号不能为空
                        {validator: validateNumAndStr, trigger: 'blur', name: this.$t('credentialsCode'), maxLength: 40}
                    ],
                    certificationType: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('credentialsType')}), trigger: 'change'},     // 证件类型不能为空
                    ],
                }
            }
        },
        computed: {},
        created() {
            this.queryDocument();
        },
        mounted() {
        },
        watch: {},
        methods: {
            //查询证件类型
            queryDocument() {
                ajax.post('queryDocument', {
                    isDeleted: 'false',
                    pageNo: 1,
                    pageSize: 99999,
                }).then(res => {
                    if (res.success) {
                        this.enumData.idType = res.data.data || [];
                    }
                })
            },
            //表单校验
            formValidateFunc() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        var params = {
                            memberInfo: this.cardParam,
//                            memberCard: this.$refs.ownerEntityCard.tableData,
                            // TODO  memberCard包含了主卡和副卡的信息，应该是对象数组（后端接口还没做好，暂时按照个人会员传参方式传）
                            memberCard: {
                                ...this.selectedCard,
                            },
                            viceCard: this.$refs.secondaryCard.tableData
                        };
                        params.memberInfo.birthDay = params.memberInfo.birthDay ?
                            new Date(params.memberInfo.birthDay).format('yyyy-MM-dd') : '';
                        //区分新增与修改
                        if (this.type === 'add') {
                            this.saveAndEditMember('saveNewMemberInfo', params);
                        }
                        /*if (this.type === 'modify') {
                            params.memberInfo.id = this.info.id;
                            params.memberCard.id = this.info.cardId;
                            this.saveAndEditMember('editMemberInfo', params);
                        }*/
                    }
                })
            },
            //新增/编辑会员接口
            saveAndEditMember(url, params) {
                this.loading = true;
                ajax.post(url, {
                    memberInfo: JSON.stringify(params.memberInfo),
                    memberCard: JSON.stringify(params.memberCard),
                    viceCard: JSON.stringify(params.viceCard),
                }).then(res => {
                    if (res.success) {
                        //区分新增与修改
                        if (this.type === 'add') {
                            this.$Message.success(this.$t('successTip', {tip: this.$t('add')}));     // 新增会员成功
                            this.$router.push({name: 'memberInfo'});
                        }
                        if (this.type === 'modify') {
                            this.$Message.success(this.$t('successTip', {tip: this.$t('modify')}));     // 修改会员成功
                            this.$router.back();
                        }
                    } else {
                        //区分新增与修改
                        let errorTip = '';
                        if (res.message == 'M008') {
                            errorTip = this.$t('phoneExistCard');   // 手机号已被注册，请更换手机号
                        }

                        if(this.type === 'add'){
                            this.$Message.error(errorTip || this.$t('failureTip',{tip : this.$t('add')}));
                        }
                        if(this.type === 'modify'){
                            this.$Message.error(errorTip || this.$t('failureTip',{tip : this.$t('modify')}));
                        }

                    }
                }).finally(() => {
                    this.loading = false;
                })
            },
            //返回
            goBack() {
                //区分新增与修改
                if (this.type === 'add') {
                    this.$router.push({name: 'memberInfo'});
                }
                if (this.type === 'modify') {
                    this.$router.back();
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .personal-card {
        /deep/ h3 {
            margin-top: 20px;
            margin-bottom: 15px;
            text-align: center;
            font-size: $font_size_16px;
            color: $color_333;
        }
    }

    .ivu-form-item-wrap {
        display: flex;
        justify-content: space-between;
    }

    .ivu-form-item {
        width: 280px;
        text-align: left;
        margin-right: 0;

        .ivu-date-picker {
            display: block;
        }
    }

    .content-footer {
        margin: 20px 0 40px 0;
        text-align: center;

        /deep/ .ivu-btn {
            width: 108px;
            &:nth-child(1) {
                margin-right: 20px;
            }
        }
    }
</style>
