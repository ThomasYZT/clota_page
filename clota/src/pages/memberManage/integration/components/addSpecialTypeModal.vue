<template>
    <!--新增特殊会员类别-->
    <Modal
        v-model="visible"
        :title="$t('addSpecialMemType')"
        class-name="add-special-type-modal vertical-center-modal"
        width="520"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate"
                  :label-position="lang === 'zh-CN' ? 'right' : 'top'"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="lang === 'zh-CN' ? 150 : 0">
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('memberTypeName')" prop="name">
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
    import { mapGetters } from 'vuex';
    export default {
        props : {
            //当前操作的特殊会员分类信息
            'employee-type-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                //模态框是否显示
                visible : false,
                //表单数据
                formData : {
                    name : '',
                },
                //表单校验规则
                ruleValidate : {
                    name : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('memberTypeName') }), trigger : 'blur' },
                        { max : 15,message : this.$t('errorMaxLength',{ field : this.$t('memberTypeName'),length : 15 }),trigger : 'blur' }
                    ],
                },
                //当前特殊会员分类的id
                employeeTypeId : ''
            };
        },
        methods : {

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
                });
            },

            /**
             * 关闭模态框
             */
            hide () {
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
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('add') }));
                        this.$emit('fresh-data');
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('add') }));
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
                    if (newVal && Object.keys(newVal).length > 0) {
                        this.employeeTypeId = newVal.id;
                        this.formData.name = newVal.staffDesc;
                    }
                }
            }
        },
        computed : {
            ...mapGetters({
                lang : 'lang'
            })
        }
    };
</script>

<style lang="scss">
    @import '~@/assets/scss/base';

    .add-special-type-modal{

        /deep/ .ivu-modal-body{
            display: flex;
            align-items: center;
            min-height: 270px;
            justify-content: center;
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
