<template>
    <!--新增储值-->
    <Modal
        v-model="visible"
        title="新增账户"
        class-name="add-fund-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="130">
                <div class="ivu-form-item-wrap">
                    <Form-item label="用户姓名：">
                       <span>刘木子</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="手机号：">
                      <span>17527571287</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="身份证号：">
                        <span>1011227979987298739</span>
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap">
                    <Form-item label="增加储值金额：" prop="fund">
                        <Input v-model="data.fund" placeholder="请输入" style="width: 100px" />
                        <span>实际增加</span>
                        <Input v-model="data.add" placeholder="请输入" style="width: 100px" />
                        <span>元</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="收款方式：" prop="type">
                        <Select v-model="data.type" placeholder="请选择">
                            <Option value="">账户</Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="备注：" prop="remark">
                        <Input v-model="data.remark" type="textarea" placeholder="请输入" style="width: 280px" />
                    </Form-item>
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
                data: {
                    fund: '',
                    add: 5,
                    type: '',
                    remark: '',
                },
                ruleValidate: {
                    fund: [
                        { required: true, message: '储值金额不能为空', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '收款方式不能为空', trigger: 'change' },
                    ],
                }
            }
        },
        methods: {

            show () {
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        console.log(true)
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
</style>

