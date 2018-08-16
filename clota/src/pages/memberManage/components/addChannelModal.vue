<template>
    <!--新增渠道-->
    <Modal
        v-model="visible"
        title="新增渠道"
        class-name="add-channel-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="130">
                <div class="ivu-form-item-wrap">
                    <Form-item label="渠道名称：" prop="name">
                        <Input v-model="data.name" placeholder="请输入" style="width: 280px" />
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
                    name: '',
                    remark: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '渠道名称不能为空', trigger: 'blur' },
                    ],
                    type: [

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
    .add-channel-modal{
    }
</style>

