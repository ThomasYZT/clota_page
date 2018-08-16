<template>
    <!--会员等级晋升规则设置-->
    <Modal
        v-model="visible"
        title="会员等级晋升规则设置"
        class-name="member-rule-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="170">
                <div class="ivu-form-item-wrap">
                    <Form-item label="普通会员成长值范围：" prop="fund">
                        <Input v-model="data.fund" placeholder="请输入" style="width: 100px" />
                        <span>——</span>
                        <Input v-model="data.add" placeholder="请输入" style="width: 100px" />
                    </Form-item>
                    <Form-item label="黄金会员成长值范围：" prop="fund">
                        <Input v-model="data.fund" placeholder="请输入" style="width: 100px" />
                        <span>——</span>
                        <Input v-model="data.add" placeholder="请输入" style="width: 100px" />
                    </Form-item>
                    <Form-item label="铂金会员成长值范围：" prop="fund">
                        <Input v-model="data.fund" placeholder="请输入" style="width: 100px" />
                        <span>——</span>
                        <Input v-model="data.add" placeholder="请输入" style="width: 100px" />
                    </Form-item>
                    <Form-item label="钻石会员成长值范围：" prop="fund">
                        <Input v-model="data.fund" placeholder="请输入" style="width: 100px" />
                        <span>——</span>
                        <Input v-model="data.add" placeholder="请输入" style="width: 100px" />
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
                    fund: 0,
                    add: 5,
                    remark: '',
                },
                ruleValidate: {
                    fund: [
                        { required: true, message: '储值金额不能为空', trigger: 'blur' },
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
    .member-rule-modal{

    }
</style>

