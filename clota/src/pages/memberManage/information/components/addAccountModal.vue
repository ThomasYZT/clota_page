<template>
    <!--新增账户-->
    <Modal
        v-model="visible"
        title="新增账户"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="90">
                <div class="ivu-form-item-wrap">
                    <Form-item label="账户归属" prop="place">
                        <Select v-model="data.place" placeholder="请选择">
                            <Option value="">账户归属</Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="账户" prop="account">
                        <Select v-model="data.account" placeholder="请选择">
                            <Option value="">账户</Option>
                        </Select>
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
                    place: '',
                    account: '',
                },
                ruleValidate: {
                    place: [
                        { required: true, message: '账户归属不能为空', trigger: 'change' },
                    ],
                    account: [
                        { required: true, message: '账户不能为空', trigger: 'change' },
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
