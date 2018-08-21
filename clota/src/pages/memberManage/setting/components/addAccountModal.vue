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
                <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="130">
                    <div class="ivu-form-item-wrap">
                        <Form-item label="账户归属" prop="account">
                            <Select v-model="data.account" placeholder="请选择">
                                <Option value="sss">账户</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <FormItem label="账户类型" prop="channel">
                            <RadioGroup v-model="data.channel">
                                <Radio label="cash">人民币账户</Radio>
                                <Radio label="account">虚拟账户</Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="账户名称" prop="num">
                            <Input v-model.trim="data.num" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="单位" prop="afterNum">
                            <Input v-model.trim="data.afterNum" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="储值比率">
                            <Input v-model.trim="data.num" placeholder="请输入" style="width: 130px;"/>
                            <span style="padding: 0 5px;">:</span>
                            <Input v-model.trim="data.num" placeholder="请输入" style="width: 130px;"/>
                        </Form-item>
                    </div>
                </Form>
            </template>

            <!--step 2-->
            <template v-if="step === 1">
                <div class="table-wrap">
                    <el-table
                        :data="tableData"
                        :border="false"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="本金可使用范围设置">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page-wrap" v-if="tableData.length > 0">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="50">
                    </el-pagination>
                </div>
            </template>

            <!--step 3-->
            <template v-if="step === 2">
                <div class="table-wrap">
                    <el-table
                        :data="tableData"
                        :border="false"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="赠送金额可使用范围设置">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page-wrap" v-if="tableData.length > 0">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="50">
                    </el-pagination>
                </div>
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
    export default {
        components: {},
        data () {
            return {
                visible: false,
                step: 0,
                data: {
                    num: '',
                    afterNum: '20',
                    channel: 'cash',
                    account: '',
                },
                ruleValidate: {
                    account: [
                        { required: true, message: '兑现数量不能为空', trigger: 'change' },
                    ],
                    channel: [
                        { required: true, message: '充值渠道不能为空', trigger: 'change' },
                    ],
                },
                tableData: [
                    { name: '温泉酒店A' },
                    { name: '温泉酒店B' },
                    { name: '温泉酒店C' },
                ],
                multipleSelection: [],
            }
        },
        methods: {

            show () {
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

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
            },

            nextStep ( data ) {
                if(data){
                    this.formValidateFunc();
                } else {
                    this.step ++;
                }
            },

            prevStep () {
                this.step --;
            },

            save () {

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

        }
    }
</style>
