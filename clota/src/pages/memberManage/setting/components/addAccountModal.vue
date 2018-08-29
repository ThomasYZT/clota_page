<template>
    <!--新增账户-->
    <Modal
        v-model="visible"
        title="新增账户级别"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <div class="steps-wrap">
                <Steps :current="step">
                    <Step title="" icon="record"></Step>
                    <Step title="" icon="record"></Step>
                    <Step title="" icon="record"></Step>
                </Steps>
            </div>

            <!--step 1-->
            <template v-if="step === 0">
                <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                    <div class="ivu-form-item-wrap">
                        <Form-item label="账户归属" prop="accountBelonging">
                            <Select v-model="formData.accountBelonging" @on-change="changeAccountBelonging">
                                <Option v-for="(item, index) in tableData"
                                        :value="item.id"
                                        :key="index">
                                    {{ item.orgName }}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="账户名称" prop="accountName">
                            <Input v-model.trim="formData.accountName" :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="单位" prop="unit">
                            <Input v-model.trim="formData.unit" :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap" >
                        <Form-item label="储值比率" prop="rateDenominator">
                            <Input v-model.trim="formData.rateNumerator"
                                   :placeholder="$t('inputField', {field: ''})"
                                   class="single-input"/>
                            <span style="padding: 0 5px;">:</span>
                            <Input v-model.trim="formData.rateDenominator"
                                   :placeholder="$t('inputField', {field: ''})"
                                   class="single-input"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <FormItem label="是否允许兑现">
                            <RadioGroup v-model="formData.exchangeToCash">
                                <Radio label="true">允许兑现</Radio>
                                <Radio label="false">不允许兑现</Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                </Form>
            </template>

            <!--step 2-->
            <template v-if="step === 1">
                <table-com
                    ref="moneyMultiTablePlug"
                    :table-com-min-height="380"
                    :column-data="moneyColumnData"
                    :table-data="tableData"
                    @selection-change="handleSelectionChangeToMoney"
                    :border="false">
                    <el-table-column
                        slot="column0"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        type="selection"
                        slot-scope="row">
                    </el-table-column>
                </table-com>
            </template>

            <!--step 3-->
            <template v-if="step === 2">
                <table-com
                    ref="sendMultiTablePlug"
                    :table-com-min-height="380"
                    :column-data="sendColumnData"
                    :table-data="sendData"
                    @selection-change="handleSelectionChangeToSend"
                    :border="false">
                    <el-table-column
                        slot="column0"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        type="selection"
                        slot-scope="row">
                    </el-table-column>
                </table-com>
            </template>

        </div>

        <div slot="footer" class="modal-footer">
            <template v-if="step === 0">
                <Button type="primary" @click="nextStep(true)" >下一步</Button>
                <Button type="ghost" @click="hide" >取消</Button>
            </template>
            <template v-if="step === 1">
                <Button type="primary" @click="nextStep(false)" >下一步</Button>
                <Button type="ghost" @click="prevStep" >上一步</Button>
            </template>
            <template v-if="step === 2">
                <Button type="primary" @click="save" >保存</Button>
                <Button type="ghost" @click="prevStep" >上一步</Button>
            </template>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import defaultsDeep from 'lodash/defaultsDeep';
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        props: ['length','table-data','send-data'],
        components: {
            tableCom,
        },
        data () {

            const validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error('输入内容不合规则'));
                    } else {
                        callback();
                    }
                },
            };

            //校验正整数
            const validateNumber = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    callback(err);
                });
            };

            //校验分子
            const validateRateNumerator = (rule,value,callback) => {
                common.validateInteger( this.formData.rateNumerator ).then(() => {
                    if (value && value.isUtf16()) {
                        callback(new Error('输入内容不合规则'));
                    } else {
                        callback();
                    }
                }).catch(err => {
                    callback(err);
                });
            };

            return {
                visible: false,
                //步骤
                step: 0,
                //表单数据
                index: null,
                formData: {
                    accountBelonging: '',
                    accountName: '',
                    unit: '元',
                    rate: '1',
                    rateNumerator: '1',
                    rateDenominator: '1',
                    exchangeToCash: 'false',
                    corpusAppliedOrgId: [],
                    donateAppliedOrgId: [],
                },
                //校验规则
                ruleValidate: {
                    accountBelonging: [
                        { required: true, message: '账户归属不能为空', trigger: 'change' },
                    ],
                    accountName: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 10, message: '账户名称不能超过10字符', trigger: 'blur' },
                    ],
                    unit: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 10, message: '单位不能超过10字符', trigger: 'blur' },
                    ],
                    rateDenominator: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 10, message: '储值比率不能超过10字符', trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                        { validator: validateRateNumerator, trigger: 'blur' },
                    ],
                },
                //多选列表
                multipleSelectionToMoney: [],
                multipleSelectionToSend: [],
                //表头信息
                moneyColumnData: [
                    {
                        title: '',
                        minWidth: 110,
                        field: '',
                    },
                    {
                        title: '本金可使用范围设置',
                        minWidth: 400,
                        field: 'orgName'
                    },
                ],
                sendColumnData: [
                    {
                        title: '',
                        minWidth: 110,
                        field: '',
                    },
                    {
                        title: '赠送金额可使用范围设置',
                        minWidth: 400,
                        field: 'orgName'
                    },
                ],
            }
        },
        watch: {
            'formData.rateNumerator': function (newVal) {
                this.$refs.formValidate.validateField('rateDenominator');
            }
        },
        methods: {

            show ( data ) {
                this.index = this.length;
                if( data ){
                    this.formData = defaultsDeep({}, data.item);
                    this.index = data.index;
                }
                this.visible = true;
            },

            changeAccountBelonging (val) {
                let obj = this.tableData.find( item => val === item.id );
                this.formData.accountName = obj ? obj.orgName : '';
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if(valid){
                        this.step ++;
                    }
                })
            },

            //多选
            handleSelectionChangeToMoney(val) {
                this.multipleSelectionToMoney = val;
            },
            handleSelectionChangeToSend(val) {
                this.multipleSelectionToSend = val;
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.formData = {
                    accountBelonging: '',
                    accountName: '',
                    unit: '',
                    rate: '',
                    rateNumerator: '',
                    rateDenominator: '',
                    exchangeToCash: 'true',
                    corpusAppliedOrgId: [],
                    donateAppliedOrgId: [],
                };
                this.multipleSelection = [];
                this.index = null;
                if( this.$refs.moneyMultiTablePlug ){
                    this.$refs.moneyMultiTablePlug.clearSelection();
                }
                if( this.$refs.sendMultiTablePlug ){
                    this.$refs.sendMultiTablePlug.clearSelection();
                }
                if(this.step === 0){
                    this.$refs.formValidate.resetFields();
                }
            },

            //下一步
            nextStep ( data ) {
                if(data){
                    this.formValidateFunc();
                } else {
                    this.step ++;
                }
            },
            //下一步
            prevStep () {
                this.step --;
            },

            //保存
            save () {
                this.formData.corpusAppliedOrgId = [];
                this.formData.donateAppliedOrgId = [];
                this.multipleSelectionToMoney.forEach( (item, index) => {
                    this.formData.corpusAppliedOrgId.push(item.id);
                });
                this.multipleSelectionToSend.forEach( (item, index) => {
                    this.formData.donateAppliedOrgId.push(item.id);
                });
                let params = {
                    accountBelonging: this.formData.accountBelonging,
                    accountName: this.formData.accountName,
                    unit: this.formData.unit,
                    rateDenominator: this.formData.rateDenominator,
                    rateNumerator: this.formData.rateNumerator,
                    rate: (Number(this.formData.rateDenominator)/Number(this.formData.rateNumerator)).toFixed(2),
                    exchangeToCash: this.formData.exchangeToCash,
                    corpusAppliedOrgId: this.formData.corpusAppliedOrgId.join(','),
                    donateAppliedOrgId: this.formData.donateAppliedOrgId.join(','),
                };
                console.log(params)
                this.updateMemberAccountDefine(params);
            },

            //保存/更改/储值账户设置
            updateMemberAccountDefine ( params ) {
                ajax.post('updateMemberAccountDefine', params).then(res => {
                    if( res.success ) {
                        this.$Message.success('新增成功！');
                        this.hide();
                        this.$emit('updata-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.warning(res.message || 'updateMemberAccountDefine 新增失败！');
                    }
                })
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 0 14px;
            height: 430px;

            .steps-wrap{
                padding-top: 5px;
                margin-left: 100px;
                margin-bottom: 18px;

                /deep/ .ivu-steps .ivu-steps-head-inner > .ivu-steps-icon.ivu-icon {
                    font-size: 12px;
                    transform: scale(0.7);
                }
                /deep/ .ivu-steps .ivu-steps-tail > i{
                    height: 2px;
                    border-radius: 2px;
                }
            }

            /deep/ .ivu-from{
                padding-top: 15px;
            }

            /deep/ .ivu-select{
                width: 280px;
            }

            /deep/ .ivu-input-wrapper{
                width: 280px;
                &.single-input{
                    width: 130px !important;
                }
            }

        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>
