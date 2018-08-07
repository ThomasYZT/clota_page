<!--新增公司节点-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="add-company"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" v-w-title="addedNodeDetail.nodeName">{{addedNodeDetail.nodeName}}</span>
        </div>
        <div class="target-body">
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="0">
                <FormItem :label="$t('fianceSuperior')" prop="fianceSuperior">
                    <Select v-model="formData.fianceSuperior" style="width:280px">
                        <Option v-for="item in smsProviderList"
                                :value="item.value"
                                :key="item.value">
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('manageSuperior')" prop="manageSuperior">
                    <Input v-model="formData.manageSuperior" disabled style="width: 280px"/>
                </FormItem>
                <FormItem :label="$t('controlAccount')" prop="controlAccount">
                    <Input v-model="formData.controlAccount" style="width: 280px"/>
                </FormItem>
                <FormItem :label="$t('email')" prop="mail">
                    <Input v-model="formData.mail" style="width: 280px"/>
                </FormItem>
                <FormItem :label="$t('smsProvider')" prop="smsProvider">
                    <Select v-model="formData.smsProvider" style="width:280px">
                        <Option v-for="item in smsProviderList"
                                :value="item.value"
                                :key="item.value">
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('phone')" prop="phone">
                    <Input v-model="formData.phone" style="width: 280px"/>
                </FormItem>
                <FormItem :label="$t('fax')" prop="fax">
                    <Input v-model="formData.fax" style="width: 280px"/>
                </FormItem>
                <FormItem :label="$t('companyCode') + '(' + $t('offlineVerify') + ')'">
                    <Input v-model="formData.companyCode" style="width: 280px"/>
                </FormItem>
                <div class="hint">用于与线下系统对接</div>
                <FormItem :label="$t('location')">
                    <city-plugin @select="formData.place = $event">
                    </city-plugin>
                </FormItem>
                <FormItem :label="$t('address')">
                    <Input v-model="formData.address" type="textarea" style="width: 280px"/>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" class="ivu-btn-90px" @click="save">保存</Button>
        </div>
    </Modal>
</template>

<script>
    import {validator} from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';

    export default {
        components: {
            cityPlugin
        },
        props: {
            //绑定的模态框是否显示的变量
            value: {
                type: Boolean,
                default: false
            },
            //选择的父节点详情
            'chosed-node-detail': {
                type: Object,
                default() {
                    return {}
                }
            },
            //新增的节点详情
            'added-node-detail': {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            //校验管理账号
            const validateControlAccount = (rule, value, callback) => {
                callback();
            };
            //校验电子邮箱
            const validateMail = (rule, value, callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.emailError'));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', {msg: this.$t('email')}));
                }
            };
            //校验联系电话
            const validatePhone = (rule, value, callback) => {
                if (value) {
                    if (validator.isMobile(value) || validator.isTelephone(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.phoneError'));
                    }
                } else {
                    callback();
                }
            };
            //校验传真
            const validateFax = (rule, value, callback) => {
                if (value) {
                    if (validator.isMobile(value) || validator.isTelephone(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.formatError', {field: this.$t('fax')}));
                    }
                } else {
                    callback();
                }
            };
            return {
                //表单数据
                formData: {
                    //经营上级
                    manageSuperior: '',
                    //联系电话
                    phone: '',
                    //财务上级
                    fianceSuperior: '',
                    //传真
                    fax: '',
                    //公司编码
                    companyCode: '',
                    //管理账号
                    controlAccount: '',
                    //电子邮箱
                    mail: '',
                    //短信供应商
                    smsProvider: '',
                    //详细地址
                    address: '',
                    //地点
                    place: '',
                },
                //表单校验规则
                ruleValidate: {
                    phone: [
                        {validator: validatePhone, trigger: 'blur'},
                    ],
                    fax: [
                        {validator: validateFax, trigger: 'blur'},
                    ],
                    fianceSuperior: [
                        {
                            required: true,
                            message: this.$t('validateError.pleaseSelect', {msg: this.$t('fianceSuperior')}),
                            trigger: 'change'
                        },
                    ],
                    manageSuperior: [
                        {
                            required: true,
                            message: this.$t('validateError.pleaseSelect', {msg: this.$t('manageSuperior')}),
                            trigger: 'change'
                        },
                    ],
                    controlAccount: [
                        {required: true, validator: validateControlAccount, trigger: 'blur'},
                    ],
                    mail: [
                        {required: true, validator: validateMail, trigger: 'blur'},
                    ],
                    smsProvider: [
                        {
                            required: true,
                            message: this.$t('validateError.pleaseSelect', {msg: this.$t('smsProvider')}),
                            trigger: 'change'
                        },
                    ]
                },
                //短信供应商列表
                smsProviderList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                ],
            }
        },
        watch: {
            //监听选择的父节点信息
            'chosedNodeDetail': {
                handler(newVal, oldVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
                        this.formData.manageSuperior = newVal.title;
                        this.formData.fianceSuperior = newVal.title;
                    }
                },
                immediate: true
            }
        },
        methods: {
            /**
             * 模态框状态改变
             */
            changeValue(data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {
                if (type === false) {
                    this.resetFormData();
                    this.$refs.formValidate.resetFields();
                }
            },
            /**
             * 保存新增租户数据
             */
            save() {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.addCompany();
                    }
                });
            },
            /**
             * 初始化表单数据
             */
            resetFormData() {
                for (let item in this.formData) {
                    this.formData[item] = '';
                }
            },
            /**
             * 调用新增公司的接口
             */
            addCompany() {
                this.$emit('fresh-structure-data');
                this.$emit('input', false);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-company {

        & /deep/ .ivu-modal {
            width: 560px !important;
            height: 615px;
        }

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                width: 100%;
                display: inline-block;
                @include overflow_tip();
            }
        }

        & /deep/ .ivu-modal-header {
            padding: 17px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 13px;
        }

        & /deep/ .ivu-modal-body {
            padding: 0;
        }

        .hint {
            text-indent: 180px;
            margin-top: -12px;
            margin-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_999;
        }

        .target-body {
            width: 100%;
            height: 497px;
            padding: 20px 0 5px 0;
            overflow: auto;

            /deep/ .ivu-form {

                .ivu-form-item {
                    margin-bottom: 15px;
                    padding-right: 110px;
                    position: relative;

                    .ivu-form-item-error-tip {
                        width: 110px;
                        position: absolute;
                        top: 7px;
                        right: -110px;
                        left: auto;
                        line-height: 1;
                        padding: 6px 0 0 5px;
                        color: #ed3f14;
                    }
                }

                .ivu-form-item-label {
                    font-size: $font_size_14px;
                    color: $color_6c6c6c;
                }
            }
        }
        & /deep/ .ivu-modal-footer {
            text-align: center;
        }
    }
</style>
