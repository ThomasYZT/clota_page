<!--新增款台节点-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="add-cashier"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" v-w-title="addedNodeDetail.nodeName">{{addedNodeDetail.nodeName}}</span>
        </div>
        <div class="target-body">
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="160">
                <!--服务器名称-->
                <FormItem :label="$t('serverName')" prop="serverName">
                    <Input v-model="formData.serverName" style="width: 280px"/>
                </FormItem>
                <div class="hint">服务器名称为景区编码+设备编码或内网IP地址，不可重复</div>
                <!--款台类型-->
                <FormItem :label="$t('cashierType')" prop="cashierType">
                    <Select v-model="formData.cashierType"
                            style="width:280px"
                            @on-change="cashierTypeChange">
                        <Option v-for="item in cashierTypeList"
                                :value="item.value"
                                :key="item.value">
                            {{ $t(item.label) }}
                        </Option>
                    </Select>
                </FormItem>
                <!--所属核销设备分组-->
                <FormItem :label="$t('cashierTypeGroup')"
                          prop="cashierTypeGroup"
                          v-if="showCashierTypeGroup">
                    <Select v-model="formData.cashierTypeGroup" style="width:280px">
                        <Option v-for="item in cashierTypeGroupList"
                                :value="item.id"
                                :key="item.id">
                            {{ $t(item.groupName) }}
                        </Option>
                    </Select>
                </FormItem>
                <!--所属销售渠道分组-->
                <FormItem :label="$t('saleTypeGroup')"
                          prop="saleTypeGroup"
                          v-if="showSaleTypeGroup">
                    <Select v-model="formData.saleTypeGroup" style="width:280px">
                        <Option v-for="item in saleTypeGroupList"
                                :value="item.id"
                                :key="item.id">
                            {{ item.groupName }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="ghost"
                class="ivu-btn-90px"
                @click="cancel">取消</Button>
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="save">保存</Button>
        </div>
    </Modal>
</template>

<script>
    import {validator} from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import {cashierType} from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';

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
            //校验服务器名称
            const validateServerName = (rule, value, callback) => {
                callback();
            };
            return {
                //表单数据
                formData: {
                    //款台类型
                    cashierType: '',
                    //所属核销设备分组
                    cashierTypeGroup: '',
                    //服务器名称
                    serverName: '',
                    //短信供应商
                    smsProvider: '',
                    //所属销售渠道分组
                    saleTypeGroup: '',
                },
                //表单校验规则
                ruleValidate: {
                    cashierType: [
                        {
                            required: true,
                            message: this.$t('validateError.pleaseSelect', {msg: this.$t('fianceSuperior')}),
                            trigger: 'change'
                        },
                    ],
                    serverName: [
                        {required: true, validator: validateServerName, trigger: 'blur'},
                    ],
                    smsProvider: [
                        {
                            required: true,
                            message: this.$t('validateError.pleaseSelect', {msg: this.$t('smsProvider')}),
                            trigger: 'change'
                        },
                    ]
                },
                //款台类型
                cashierTypeList: cashierType,
                //所属核销设备分组列表
                cashierTypeGroupList: [],
                //所属销售渠道分组
                saleTypeGroupList: [],
            }
        },
        watch: {
            //监听选择的父节点信息
            'chosedNodeDetail': {
                handler(newVal, oldVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
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
                }else{
                    this.getCheckItemPage();
                    this.getSaleItemPage();
                }
            },
            /**
             * 保存新增租户数据
             */
            save() {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.addCashier();
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
             * 调用新增款台的接口
             */
            addCashier() {
                ajax.post('addOrgInfo',{
                    orgName : this.addedNodeDetail.nodeName,
                    nodeType : 'table',
                    checkerType : this.formData.cashierType,
                    saleGroupId : this.formData.saleTypeGroup,
                    checkGroupId : this.formData.cashierTypeGroup,
                    serverUrl : this.formData.serverName,
                    parentManageId : this.chosedNodeDetail.id,
                    parentEconomicId : this.chosedNodeDetail.id,
                }).then(res => {
                   if(res.success){
                       this.$emit('fresh-structure-data');
                       this.$emit('input', false);
                       this.$Message.success('新增成功');
                   }else{
                        this.$Message.error('新增失败');
                   }
                });
            },
            /**
             * 选择款台类型之后
             * @param data
             */
            cashierTypeChange (data) {
                console.log(data)
            },
            /**
             * 取消新增
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 获取核销设备分组
             */
            getCheckItemPage () {
                ajax.post('getOrgGroupList',{
                    groupType : 'check'
                }).then(res => {
                   if(res.success){
                       this.cashierTypeGroupList = res.data ? res.data : [];
                   } else{
                       this.cashierTypeGroupList = [];
                   }
                });
            },
            /**
             * 获取销售设备分组
             */
            getSaleItemPage () {
                ajax.post('getOrgGroupList',{
                    groupType : 'sale'
                }).then(res => {
                    if(res.success){
                        this.saleTypeGroupList = res.data ? res.data : [];
                    } else{
                        this.saleTypeGroupList = [];
                    }
                });
            }
        },
        computed : {
            //是否显示所属核销设备分组
            showCashierTypeGroup () {
                if(this.formData.cashierType){
                    return this.formData.cashierType === 'check' || this.formData.cashierType === 'combine';
                }else{
                    return true;
                }
            },
            //是否显示所属销售渠道分组
            showSaleTypeGroup () {
                if(this.formData.cashierType){
                    return this.formData.cashierType === 'sale' || this.formData.cashierType === 'combine';
                }else{
                    return true;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-cashier {

        & /deep/ .ivu-modal {
            width: 560px !important;
            height: 410px;
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

        .target-body {
            width: 100%;
            height: 290px;
            padding: 55px 0 5px 0;
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

         .hint {
            text-indent: 160px;
            margin-top: -12px;
            margin-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_999;
        }
    }
</style>
