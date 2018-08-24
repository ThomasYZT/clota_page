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
            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="100">
                <div class="ivu-form-item-wrap">
                    <Form-item label="请选择账户" prop="accountTypeId">
                        <Select v-model="data.accountTypeId" placeholder="请选择">
                            <Option v-for="(item,index) in store"
                                    :key="index"
                                    :value="item.id">
                                {{item.accountName}}
                            </Option>
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

    import ajax from '@/api/index';

    export default {
        props: ['store','detail'],
        components: {},
        data () {
            return {
                visible: false,
                //表单数据
                data: {
                    accountTypeId: '',
                },
                //表单校验
                ruleValidate: {
                    accountTypeId: [
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
                        this.addAccountInfo();
                    }
                })
            },

            //新增账户
            addAccountInfo () {
                ajax.post('addAccountInfo', {
                    accountTypeId: this.data.accountTypeId,
                    memberId: this.detail.id,
                    cardId: this.detail.cardId,
                }).then(res => {
                    if(res.success){
                        this.$Message.success('新增账号成功！');
                        this.$emit('add-success');
                        this.hide();
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'addAccountInfo 失败！');
                    }
                });
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.data.accountTypeId = '';
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 90px 85px;
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>
