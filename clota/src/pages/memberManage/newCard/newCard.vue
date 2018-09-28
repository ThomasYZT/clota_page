<!--
内容：新开卡
作者：djc
日期：
-->

<template>
    <div class="new-card">
        <!--tpCard - 测试-->
        <object id="rd" data="./comRD800.dll" WIDTH="0" HEIGHT="0"
                classid="clsid:638B238E-EB84-4933-B3C8-854B86140668"></object>

        <div class="new-card-content">
            <Form ref="formValidate"
                  :model="newCardParam"
                  :rules="ruleValidate"
                  label-position="top">
                <h3>{{$t('cardOwnerInfo')}}</h3><!--持卡人信息-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('name')" prop="custName"><!--姓名-->
                        <Input v-model.trim="newCardParam.custName"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('mobilePhone')" prop="phoneNum"><!--手机号-->
                        <Input v-model.trim="newCardParam.phoneNum"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('gender')" prop="gender"><!--性别-->
                        <Select v-model="newCardParam.gender" :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="(item,index) in enumData.genderEnum" :key="index"
                                    :value="item.name">
                                {{$t(item.desc)}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('birthday')" prop="birthday"><!--生日-->
                        <Date-picker
                            type="date"
                            v-model="newCardParam.birthday"
                            :options="dateOption"
                            format="yyyy-MM-dd"
                            :placeholder="$t('selectField', {msg: ''})"
                            @on-change="customValid($event, 'birthday')">
                        </Date-picker>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="E-mall" prop="emailAddr">
                        <Input v-model.trim="newCardParam.emailAddr"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('QQ')" prop="qq">
                        <Input v-model.trim="newCardParam.qq"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('levelSetting')" prop="levelId"><!--会员级别-->
                        <Select v-model="newCardParam.levelId"
                                :placeholder="$t('selectField', {msg: $t('memberLevelPri')})"><!--请选择会员初始级别-->
                            <Option v-for="item in enumData.level"
                                    :key="item.id"
                                    :value="item.id">{{item.levelDesc}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('countryCode')" prop="stateCode"><!--国家代码-->
                        <Input v-model.trim="newCardParam.stateCode"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('cityCode')" prop="cityCode"><!--城市代码-->
                        <Input v-model.trim="newCardParam.cityCode"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('credentialsType')" prop="certificationType"><!--证件类型-->
                        <Select v-model="newCardParam.certificationType"
                                :placeholder="$t('selectField', {msg: $t('credentialsType')})"><!--请选择证件类型-->
                            <Option v-for="item in enumData.idType"
                                    :key="item.id"
                                    :value="item.id">
                                {{item.name}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('credentialsCode')" prop="idCardNumber"><!--证件编号-->
                        <Input v-model.trim="newCardParam.idCardNumber"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('personalInterests')" prop="hobby"><!--个人兴趣-->
                        <Input v-model.trim="newCardParam.hobby"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <Form-item :label="$t('address')" prop="homeAddr" style="width: 100%;"><!--地址-->
                    <Input v-model.trim="newCardParam.homeAddr"
                           :placeholder="$t('inputField', {field: $t('familyAddress')})"/><!--请输入家庭地址-->
                </Form-item>

                <h3>{{$t('entityCardInfo')}}</h3><!--实体卡信息-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('thirdCardNum')" prop="tpNo"><!--卡面号-->
                        <Input v-model.trim="newCardParam.tpNo"
                               :disabled="true"
                               :placeholder="$t('readCard')"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('thirdCardFaceNum')" prop="tpCardNo"><!--物理卡号-->
                        <Input v-model.trim="newCardParam.tpCardNo"
                               :disabled="true"
                               :placeholder="$t('readCard')"/>
                    </Form-item>
                </div>
                <!--<div><Button type="primary" @click="fetchCardInfo()">获取实体卡信息</Button></div>-->
            </Form>
        </div>
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
    import {genderEnum, vipLevel, vipChannel} from '@/assets/js/constVariable';
    import pick from 'lodash/pick';
    import {validator} from 'klwk-ui';
    import ajax from '@/api/index';
    import minBy from 'lodash/minBy';
    import common from '@/assets/js/common.js';

    export default {
        components: {},
        props: {},
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
            //校验邮箱
            const validateEmail = (rule, value, callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('errorFormat', {field: this.$t('mail')}));
                    }
                } else {
                    callback();
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
                loading: false,
                dateOption: {
                    disabledDate: function (value) {
                        return value && ( value.format('yyyy-MM-dd') < '1900-01-01' || value.format('yyyy-MM-dd') > new Date().format('yyyy-MM-dd'));
                    }
                },
                enumData: {
                    level: vipLevel.slice(1),
                    channel: vipChannel.slice(1),
                    idType: [],
                    status: [
                        {
                            desc: this.$t('memberStatusAll'),    // 全部会员状态
                            name: this.$t('memberStatusAll'),
                        }
                    ],
                    genderEnum: genderEnum
                },

                // 新开卡传参
                newCardParam: {
                    "custName": "",//姓名
                    "phoneNum": "",//手机号
                    "emailAddr": "",//E-mall
                    "birthDay": "",//生日
                    "gender": "",// 性别
                    "qq": "",//QQ
                    "cityCode": "",//城市代码
                    "stateCode": "",//国家代码
                    "hobby": "",//个人兴趣
                    "certificationType": "",//证件类型
                    "idCardNumber": "",//证件号码
                    "homeAddr": "",//家庭地址
                    //卡信息
                    "levelId": "",//会员级别
                    "tpNo": "",//第三方卡号
                    "tpCardNo": "",//第三方卡面号
                },
                // 所有实体卡信息
                allEntityCards: [],
                // D3 SDK 注册后的实例对象
                rd_D3: {},

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
                    emailAddr: [
                        {validator: validateEmail, trigger: 'blur'},
                        {
                            max: 100,
                            message: this.$t('errorMaxLength', {field: this.$t('mail'), length: 100}),
                            trigger: 'blur'
                        },      // 邮箱不能多于100个字符
                    ],
                    qq: [
                        {validator: validateFileLength, trigger: 'blur', name: 'qq', maxLength: 50}
                    ],
                    hobby: [
                        {
                            validator: validateFileLength,
                            trigger: 'blur',
                            name: this.$t('personalInterests'),
                            maxLength: 100
                        }
                    ],
                    homeAddr: [
                        {validator: validateFileLength, trigger: 'blur', name: this.$t('address'), maxLength: 100}
                    ],
                    stateCode: [
                        {validator: validateNumAndStr, trigger: 'blur', name: this.$t('countryCode'), maxLength: 30}
                    ],
                    cityCode: [
                        {validator: validateNumAndStr, trigger: 'blur', name: this.$t('cityCode'), maxLength: 30}
                    ],
                    tpNo: [
                        {validator: validateNumAndStr, trigger: 'blur', name: this.$t('thirdCardNum'), maxLength: 30}
                    ],
                    idCardNumber: [
                        {validator: validateNumAndStr, trigger: 'blur', name: this.$t('credentialsCode'), maxLength: 40}
                    ],
                    tpCardNo: [
                        {
                            validator: validateNumAndStr,
                            trigger: 'blur',
                            name: this.$t('thirdCardFaceNum'),
                            maxLength: 30
                        }
                    ]
                }
            }
        },
        computed: {},
        created() {
            this.queryDocument();
            this.getLevelList();
            this.getAllEntityCard();
        },
        mounted() {
//            this.idCardTest(rd);     // rd -- 实体卡SDK
            this.rd_D3 = rd;
        },
        watch: {},
        methods: {
            //手动校验，解决datePicker手动输入触发校验时获取到的值有延时导致校验错误问题
            customValid(data, field) {
                this.$nextTick(() => {
                    this.$refs.formValidate.validateField(field);
                })
            },

            //表单校验
            formValidateFunc() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        var params = {
                            memberInfo: pick(this.newCardParam, ['custName', 'phoneNum', 'emailAddr', 'birthDay',
                                'gender', 'qq', 'cityCode', 'stateCode', 'hobby', 'certificationType', 'idCardNumber', 'homeAddr']),
                            memberCard: pick(this.newCardParam, ['levelId', 'tpNo', 'tpCardNo']),
                        };
                        params.memberInfo.birthDay = params.memberInfo.birthDay ?
                            new Date(params.memberInfo.birthDay).format('yyyy-MM-dd') : '';
                        //区分新增与修改
                        if (this.type === 'add') {
                            this.saveAndEditMember('saveNewMemberInfo', params);
                        }
                        if (this.type === 'modify') {
                            params.memberInfo.id = this.info.id;
                            params.memberCard.id = this.info.cardId;
                            this.saveAndEditMember('editMemberInfo', params);
                        }
                    }
                })
            },

            // 获取会员级别列表
            getLevelList() {
                return ajax.post('queryMemberLevels', {
                    pageNo: 1,
                    pageSize: 99999,
                    isDeleted: 'false',
                }).then(res => {
                    if (res.success) {
                        this.$set(this.enumData, 'level', this.enumData.level.concat(res.data.data || []));
                        if (!this.newCardParam.levelId) {
                            this.newCardParam.levelId = minBy(this.enumData.level, 'levelNum').id;
                        }
                    } else {
                        this.$Message.warning('queryChannelSet ' + this.$t('queryFailure') + '！');
                    }
                    return res;
                })
            },

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

            /**
             * 查询所有导入的实体卡信息
             */
            getAllEntityCard() {
                return ajax.post('queryEntityCard',{
                    cardStatus : '',
                    pageNo : 1,
                    pageSize : 99999,
                }).then(res => {
                    if (res.success && res.data && res.data.memberEntityCardVoList) {
                        this.allEntityCards = res.data.memberEntityCardVoList.data || [];
                    } else {
                        this.$Message.error(this.$t('failureTip', {tip: this.$t('获取实体卡基础数据')}));
                    }
                    return res.data;
                });
            },

            //新增/编辑会员接口
            saveAndEditMember(url, params) {
                ajax.post(url, {
                    memberInfo: JSON.stringify(params.memberInfo),
                    memberCard: JSON.stringify(params.memberCard),
                }).then(res => {
                    if (res.success) {
                        //区分新增与修改
                        if (this.type === 'add') {
                            this.$Message.success(this.$t('successTip', {tip: this.$t('add')}));     // 新增会员成功
                            this.$router.push({name: 'memberInfo'});
                        }
                        if (this.type === 'modify') {
                            this.$Message.success(this.$t('successTip', {tip: this.$t('modify')}));     // 新增会员成功
                            this.$router.back();
                        }
                    } else {
                        //区分新增与修改
                        if (this.type === 'add') {
                            this.$Message.error(res.message || this.$t('failureTip', {tip: this.$t('add')}));
                        }
                        if (this.type === 'modify') {
                            this.$Message.error(res.message || this.$t('failureTip', {tip: this.$t('modify')}));
                        }
                    }
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
            /**
             * 读取实体卡信息
             * @param rd -- 实体卡SDK
             */
            fetchCardInfo(rd) {
                if (Array.isArray(this.allEntityCards) && !this.allEntityCards.length) {
                    this.getAllEntityCard().then(() => {
                        this.readEntityCard(this.rd_D3);
                    });
                } else {
                    this.readEntityCard(this.rd_D3);
                }
            },
            readEntityCard(rd) {
                var st; //主要用于返回值
//                var lSnr; //本用于取序列号，但在javascript只是当成dc_card函数的一个临时变量
//                var rlen; //用于取一些返回值长度，但在javascript只是当成dc_card函数的一个临时变量

                if (rd.dc_init) {
                    st = rd.dc_init(100, 115200);
                }
//                st = 180;   // 测试代码
                if (!st || st <= 0) {
                    this.$Message.error(this.$t("cardInitError") + '！');    // 实体卡初始化出错
                    return;
                }
                console.info(this.$t("cardInitSuccess") + '！');     // 实体卡初始化成功

                let matchedCard = this.allEntityCards.find((item, i) => {
                    return rd.get_bstrRBuffer_asc === item.id;
                });
                if (matchedCard) {
                    this.newCardParam.tpNo = rd.get_bstrRBuffer_asc;
                    this.newCardParam.tpCardNo = matchedCard.faceNum;
                } else {
                    this.$Message.warning(this.$t('noMatchCard'));  // 对不起，找不到该卡的信息，请尝试更换其他的卡
                }
            },


        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .new-card {
        @include block_outline();
        overflow: auto;
        background-color: $color_fff;
        border-radius: 4px 4px 0 0;

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
    }

    .new-card-content {
        width: 850px;
        /*height: 100%;*/
        margin: auto;
        background-color: $color_fff;

        .ivu-form {
            padding-top: 40px;
            padding-bottom: 20px;

            > h3 {
                margin-bottom: 15px;
                text-align: center;
                font-size: $font_size_16px;
                color: $color_333;
            }
        }

        .ivu-form-item-wrap {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            &:nth-child(2n) {
                margin-right: 280px;
            }
        }

        .ivu-form-item {
            width: 280px;
            text-align: left;

            .ivu-date-picker {
                display: block;
            }

            .ivu-select-selected-value,
            .ivu-input {
                font-size: 14px;
            }

            .ivu-select-item {
                font-size: 14px !important;
            }
        }

    }
</style>
