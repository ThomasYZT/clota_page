<template>
    <!--会员管理--会员积分--总体积分率折扣率设置-->
    <Modal
        v-model="visible"
        :title="title"
        class-name="set-rate-modal vertical-center-modal"
        width="600"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="80">
                <div class="ivu-form-item-wrap">
                    <Form-item label="积分率" prop="integRate">
                        <Input v-model="baseNum" placeholder="请输入"/>
                        <span class="font">元  <span class="equil">=</span></span>
                        <Input v-model="data.integRate" placeholder="请输入"/>
                        <span>积分</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="折扣率" prop="discountRate">
                        <Input v-model="data.discountRate" placeholder="请输入"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap textarea-wrap">
                    <Form-item label="备注" prop="remark">
                        <Input v-model="data.remark" type="textarea" placeholder="请输入"/>
                    </Form-item>
                </div>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc">保存</Button>
            <Button type="ghost" @click="hide">取消</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        props: ['title'],
        components: {},
        data () {
            return {
                visible: false,
                baseNum: 100,
                data: {
                    integRate: '',
                    discountRate: '',
                    remark: '',
                },
                ruleValidate: {
                    integRate: [
                        { required: true, message: '积分率不能为空', trigger: 'blur' },
                    ],
                    discountRate: [
                        { required: true, message: '折扣率不能为空', trigger: 'blur' },
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
    .set-rate-modal{

        .modal-body{
            padding: 64px 25px;

            /deep/ .ivu-input-wrapper{
                width: 160px;
                margin-right: 5px;
            }
            .font{
                margin-right: 15px;
            }
            .equil{
                margin-left: 10px;
            }

            .textarea-wrap{
                /deep/ .ivu-input-wrapper{
                    width: 390px;
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
