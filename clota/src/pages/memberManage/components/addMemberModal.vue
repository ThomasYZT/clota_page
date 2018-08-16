<template>
    <!--新增会员-->
    <Modal
        v-model="visible"
        title="新增会员"
        class-name="add-member-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="130">
                <div class="ivu-form-item-wrap">
                    <Form-item label="等级名称：" prop="name">
                        <Input v-model="data.name" placeholder="请输入会员级别名称，例：黄金会员" style="width: 280px" />
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="备注：" prop="remark">
                        <Input v-model="data.remark" type="textarea" placeholder="请输入" style="width: 280px" />
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="" prop="fund">
                        <Checkbox v-model="data.fund">是否储值</Checkbox>
                        <Checkbox v-model="data.integ">是否积分</Checkbox>
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
                    fund: true,
                    integ: true,
                    remark: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '渠道名称不能为空', trigger: 'blur' },
                    ],
                    fund: [
                        { required: true, message: '是否储值不能为空', trigger: 'blur' },
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
    .add-member-modal{
    }
</style>

