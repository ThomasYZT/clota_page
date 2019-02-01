<!--
    添加日期方案模态框
    作者：杨泽涛
-->
<template>
    <div class="add-date-plan-modal">
        <Modal v-model="visible"
               class-name="vertical-center-modal add-date-plan"
               transfer
               width="400"
               :title="$t('保存为自定义日期方案：')"
               @on-cancel="hide"
               :mask-closable="false">
            <div class="form-wrapper">
                <Form ref="modalForm"
                      :model="formData"
                      :rules="ruleValidate"
                      label-position="top">
                    <FormItem :label="$t('colonSetting', { key : $t('日期方案名称') })" prop="name">
                        <Input v-model="formData.name"
                               :placeholder="$t('inputPlaceholder')" style="width: 200px" />
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button class="ivu-btn-90px" type="primary" @click="save">{{$t('save')}}</Button>
                <Button class="ivu-btn-90px" type="default" @click="hide">{{$t('cancel')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    export default {
        components : {},
        data () {
            const validateMethods = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') )); // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
            };
            return {
                //修改、新增状态
                type : 'add',
                //是否显示模态框
                visible : false,
                //表单数据
                formData : {
                    name : '',
                    dateList : ''
                },
                //表单校验方法
                validateMethods : validateMethods,
            }
        },
        computed : {
            ruleValidate () {
                return {
                    //日期方案名称
                    name : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('自定义日期方案名称') }), trigger : 'blur' },
                        { max : 10, message : this.$t('errorMaxLength', { field : this.$t('remark'), length : 10 }), trigger : 'blur' },
                        { validator : this.validateMethods.emoji, trigger : 'blur' },
                    ]
                }
            }
        },
        methods : {
            /**
             *  显示模态框
             *  @param data 模态框数据
             */
            show (data) {
                this.type = data.type;
                this.formData.id = data.id;
                this.formData.name = data.name;
                this.formData.dateList = data.dateList;
                this.visible = true;
            },
            /**
             * 关闭模态框
             */
            hide () {
                this.visible = false;
                this.$refs.modalForm.resetFields();
            },
            /**
             * 保存日期方案
             */
            save () {
                if (this.type === 'modify') {
                    this.updateDatePlan();
                } else {
                    this.addDatePlan();
                }
            },
            addDatePlan () {
                this.$refs.modalForm.validate((valid) => {
                    if (valid) {
                        ajax.post('addDatePlan', {
                            name : this.formData.name,
                            dateList : this.formData.dateList,
                        }).then(res => {
                            if (res.success) {
                                this.$Message.success(this.$t('successTip', { tip : this.$t('save') }));
                                this.visible = false;
                                this.$emit('updateDateList');
                            } else {
                                if (res.code && res.code === 'S017') {
                                    this.$Message.error(this.$t(res.code));
                                } else {
                                    this.$Message.error(this.$t('failureTip', { tip : this.$t('save') }));
                                }
                            }
                        })
                    }
                });
            },
            updateDatePlan () {
                this.$refs.modalForm.validate((valid) => {
                    if (valid) {
                        ajax.post('updateDatePlan', {
                            id : this.formData.id,
                            name : this.formData.name,
                            dateList : this.formData.dateList,
                        }).then(res => {
                            if (res.success) {
                                this.$Message.success(this.$t('successTip', { tip : this.$t('modify') }));
                                this.visible = false;
                                this.$emit('updateDateList');
                            } else {
                                if (res.code && res.code === 'S017') {
                                    this.$Message.error(this.$t(res.code));
                                } else {
                                    this.$Message.error(this.$t('failureTip', { tip : this.$t('modify') }));
                                }
                            }
                        })
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    /deep/ .ivu-modal-body {
        position: relative;
        min-height: 168px;
    }

    .add-date-plan {
        .form-wrapper {
            @include center_center();

        }
    }
</style>
