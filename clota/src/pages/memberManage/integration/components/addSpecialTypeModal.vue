<template>
    <!--新增特殊会员类别-->
    <Modal
        v-model="visible"
        title="新增特殊会员类别"
        class-name="add-special-type-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="120">
                <div class="ivu-form-item-wrap">
                    <Form-item label="员工分类名称" prop="name">
                        <Input v-model.trim="data.name" placeholder="请输入"></Input>
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
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '员工分类名称不能为空', trigger: 'blur' },
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
