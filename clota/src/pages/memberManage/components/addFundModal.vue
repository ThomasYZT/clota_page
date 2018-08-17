<template>
    <!--新增储值-->
    <Modal
        v-model="visible"
        title="新增储值"
        class-name="add-fund-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="form-item-wrap"><label>用户姓名：</label><span>刘木子</span></div>
            <div class="form-item-wrap"><label>手机号：</label><span>17527571287</span></div>
            <div class="form-item-wrap"><label>身份证号：</label><span>1011227979987298739</span></div>

            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="130">
                <div class="ivu-form-item-wrap double-input">
                    <Form-item label="增加储值金额：" prop="fund">
                        <Input v-model="data.fund" placeholder="请输入"/>
                        <span class="font">实际增加</span>
                        <Input v-model="data.add" placeholder="请输入"/>
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
                        <Input v-model="data.remark" type="textarea" placeholder="请输入"/>
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
    .add-fund-modal{

        .modal-body{
            padding: 20px 30px;
        }

        .form-item-wrap{
            width: 100%;
            float: left;
            margin-right: 10px;
            margin-bottom: 5px;
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
        }

        .ivu-form-item-wrap{

            /deep/ .ivu-select{
                width: 315px;
            }

            /deep/ .ivu-input-wrapper{
                width: 315px;
            }

            &.double-input{
                /deep/ .ivu-input-wrapper{
                    width: 120px;
                    margin-right: 5px;
                }
                .font{
                    margin-right: 5px;
                }
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>

