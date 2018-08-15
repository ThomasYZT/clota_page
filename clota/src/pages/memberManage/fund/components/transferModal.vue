<template>
    <!--转账-->
    <Modal
        v-model="visible"
        title="转账"
        class-name="transfer-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="form-item-wrap"><label>转出账户：</label><span>北京欢乐谷景区</span></div>
            <div class="form-item-wrap"><label>账户可用余额：</label><span class="num">3728.28</span> 元</div>

            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="130">
                <div class="ivu-form-item-wrap">
                    <Form-item label="转入账户选择" prop="fund">
                        <Select v-model="data.type" placeholder="请选择" style="width: 240px;">
                            <Option value="">账户</Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="转出金额" prop="type">
                        <Input v-model="data.fund" placeholder="请输入" style="width: 240px" /><span style="padding-left: 10px;">元</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="手续费" prop="type">
                        <Input disabled v-model="data.fund" placeholder="请输入" style="width: 240px" />
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="备注：" prop="remark">
                        <Input v-model="data.remark" type="textarea" placeholder="请输入" style="width: 240px" />
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
                    num: [
                        { required: true, message: '储值金额不能为空', trigger: 'blur' },
                    ],
                    fund: [
                        { message: '储值金额不能为空', trigger: 'blur' },
                    ],
                    type: [
                        { message: '收款方式不能为空', trigger: 'change' },
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
    .transfer-modal{
        .form-item-wrap{
            width: 100%;
            float: left;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            font-size: $font_size_14px;
            color: $color-666;
            >label{
                width: 130px;
                display: inline-block;
                text-align: right;
                padding-right: 10px;
                color: $color-333;
            }
            .num{
                font-size: $font_size_18px;
                color: $color_yellow;
            }
        }
    }
</style>

