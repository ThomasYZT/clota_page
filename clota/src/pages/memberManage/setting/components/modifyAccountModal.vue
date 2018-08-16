<template>
    <!--编辑账户-->
    <Modal
        v-model="visible"
        title="编辑账户"
        class-name="modify-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="130">
                <div class="ivu-form-item-wrap">
                    <Form-item label="账户归属" prop="account">
                        <Select v-model="data.account" placeholder="请选择">
                            <Option value="sss">账户</Option>
                        </Select>
                    </Form-item>
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
                <div class="ivu-form-item-wrap">
                    <FormItem label="充值渠道">
                        <RadioGroup v-model="data.channel">
                            <Radio label="cash">允许兑现</Radio>
                            <Radio label="account">不允许兑现</Radio>
                        </RadioGroup>
                    </FormItem>
                </div>
            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >保存</Button>
            <Button type="ghost" @click="hide" >取消</Button>
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
                },
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

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
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

        }
    }
</style>
