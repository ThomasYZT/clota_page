<template>
    <!--会员储值账户余额修改/会员积分账户修改-->
    <Modal
        v-model="visible"
        :title="type === 'fund' ? '会员储值账户余额修改' : '会员积分账户修改' "
        class-name="modify-balance-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="150">
                <div class="ivu-form-item-wrap">
                    <Form-item label="用户姓名：">
                        <span>刘木子</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="当前储值账户余额：">
                        <span class="num">3728.28</span> 元
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="账户余额调整：" prop="num">
                        <RadioGroup v-model="data.fund">
                            <Radio label="add">增加 <Input v-model="data.num" :disabled="data.fund === 'reduce'" placeholder="请输入" style="width: 170px" />{{type === 'fund'?'元':'积分'}}</Radio>
                            <Radio label="reduce">减少 <Input v-model="data.num" :disabled="data.fund === 'add'" placeholder="请输入" style="width: 170px" />{{type === 'fund'?'元':'积分'}}</Radio>
                        </RadioGroup>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="请选择修改原因：" prop="reason">
                        <Select v-model="data.reason" placeholder="请选择">
                            <Option value="">原因</Option>
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
                // 储值/积分 fund/integration
                type: 'fund',
                visible: false,
                data: {
                    fund: 'add',
                    num: '',
                    reason: '',
                    remark: '',
                },
                ruleValidate: {
                    num: [
                        { required: true, message: '账户余额调整不能为空', trigger: 'blur' },
                    ],
                    reason: [
                        { required: true, message: '修改原因不能为空', trigger: 'change' },
                    ],
                    remark: [
                        { required: true, message: '备注不能为空', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {

            show ( type ) {
                this.type = type || 'fund';
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

    .modify-balance-modal{

        .num{
            font-size: $font_size_18px;
            color: $color_yellow;
        }
    }
</style>


