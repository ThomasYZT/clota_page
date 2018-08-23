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
            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="120">
                <div class="ivu-form-item-wrap">
                    <Form-item label="员工分类名称" prop="name">
                        <Input v-model.trim="formData.name" placeholder="请输入"/>
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
    import ajax from '@/api/index.js';
    export default {
        components: {},
        data () {
            return {
                //模态框是否显示
                visible: false,
                //表单数据
                formData: {
                    name: '',
                },
                //表单校验规则
                ruleValidate: {
                    name: [
                        { required: true, message: '员工分类名称不能为空', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {

            /**
             * 模态框显示
             */
            show () {
                this.visible = true;
            },

            /**
             * 表单校验
             */
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        this.addMemberStaffType();
                    }
                })
            },

            /**
             * 关闭模态框
             */
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
            },
            /**
             * 新增特殊会员类别
             */
            addMemberStaffType () {
                ajax.post('setMemberStaffType',{
                    typeName : this.formData.name
                }).then(res => {
                    if(res.success){
                        this.$Message.success('新增成功');
                    }else{
                        this.$Message.error('新增失败');
                    }
                }).finally(() => {
                    this.hide();
                });
            }
        },
    }
</script>

<style lang="scss">
    @import '~@/assets/scss/base';

    .add-special-type-modal{

        .ivu-modal-body{
            min-height: 200px;
        }

        .modal-body{
            padding: 60px 45px;

             .ivu-input-wrapper{
                width: 280px;
                margin-right: 5px;
            }

            .ivu-form-item{
                margin-bottom: 0;
            }
        }

        .modal-footer{
             .ivu-btn{
                padding: 5px 30px;
            }
        }

    }

</style>
