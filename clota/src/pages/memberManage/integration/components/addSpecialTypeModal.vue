<template>
    <!--新增特殊会员类别-->
    <Modal
        v-model="visible"
        title="新增特殊会员类别"
        class-name="add-special-type-modal vertical-center-modal"
        width="520"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="140">
                <div class="ivu-form-item-wrap">
                    <Form-item label="员工分类名称" prop="name">
                        <Input v-model.trim="formData.name" :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >{{$t("save")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>
    import ajax from '@/api/index.js';
    export default {
        props : {
            //当前操作的特殊会员分类信息
            'employee-type-info':{
                type : Object,
                default () {
                    return {};
                }
            }
        },
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
                        {max : 15,message : '最多输入15个字符',trigger : 'blur'}
                    ],
                },
                //当前特殊会员分类的id
                employeeTypeId : ''
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
                    id : this.employeeTypeId,
                    staffDesc : this.formData.name
                }).then(res => {
                    if(res.success){
                        this.$Message.success('新增成功');
                        this.$emit('fresh-data');
                    }else{
                        this.$Message.error('新增失败');
                    }
                }).finally(() => {
                    this.hide();
                });
            }
        },
        watch : {
            //如果特殊员工分类修改，则获取对应的id
            'employeeTypeInfo' : {
                deep : true,
                handler (newVal,oldVal) {
                    if(newVal && Object.keys(newVal).length > 0){
                        this.employeeTypeId = newVal.id;
                        this.formData.name = newVal.staffDesc;
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/scss/base';

    .add-special-type-modal{

        .ivu-modal-body{
            display: flex;
            align-items: center;
            min-height: 270px;
        }

        .modal-body{

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
