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
                            <Select v-model="formData.accountBelonging">
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
                            <Input v-model.trim="formData.accountName" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap" prop="unit">
                        <Form-item label="单位" prop="unit">
                            <Input v-model.trim="formData.unit" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap" props="rate">
                        <Form-item label="储值比率">
                            <Input value="1"
                                   disabled
                                   placeholder="请输入"
                                    class="single-input"/>
                            <span style="padding: 0 5px;">:</span>
                            <Input v-model.trim="formData.rate"
                                   placeholder="请输入"
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
                <div class="table-wrap">
                    <el-table
                        :data="tableData"
                        :border="false"
                        @selection-change="handleSelectionChangeToMoney"
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="orgName"
                            label="本金可使用范围设置">
                        </el-table-column>
                    </el-table>
                </div>
                <!--<div class="page-wrap" v-if="tableData.length > 0">-->
                    <!--<el-pagination-->
                        <!--layout="prev, pager, next"-->
                        <!--:total="50">-->
                    <!--</el-pagination>-->
                <!--</div>-->
            </template>

            <!--step 3-->
            <template v-if="step === 2">
                <div class="table-wrap">
                    <el-table
                        :data="sendData"
                        :border="false"
                        @selection-change="handleSelectionChangeToSend"
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="orgName"
                            label="赠送金额可使用范围设置">
                        </el-table-column>
                    </el-table>
                </div>
                <!--<div class="page-wrap" v-if="tableData.length > 0">-->
                    <!--<el-pagination-->
                        <!--layout="prev, pager, next"-->
                        <!--:total="50">-->
                    <!--</el-pagination>-->
                <!--</div>-->
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

    export default {
        props: ['length','table-data','send-data'],
        components: {},
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

            return {
                visible: false,
                //步骤
                step: 0,
                //表单数据
                index: null,
                formData: {
                    accountBelonging: '',
                    accountName: '',
                    unit: '',
                    rate: '1',
                    start: 1,
                    end: 1,
                    exchangeToCash: 'true',
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
                    ],
                    unit: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                    rate: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                    ],
                },
                //多选列表
                multipleSelectionToMoney: [],
                multipleSelectionToSend: [],
            }
        },
        methods: {

            show ( data ) {
                console.log(data)
                this.index = this.length;
                if( data ){
                    this.formData = data.item;
                    this.index = data.index;
                }
                this.visible = true;
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
                if(this.step === 0){
                    this.$refs.formValidate.resetFields();
                }
                this.formData = {};
                this.multipleSelection = [];
                this.index = null;
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
                    rate: this.formData.start/this.formData.end,
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
            height: 450px;

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
