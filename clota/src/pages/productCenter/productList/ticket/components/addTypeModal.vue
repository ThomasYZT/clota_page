<!--
    添加产品类别、标签模态框
    作者：杨泽涛
-->
<template>
    <div class="add-type-modal">
        <Modal v-model="visible"
               class-name="vertical-center-modal add-type"
               transfer
               width="400"
               :title="$t('添加产品类别：')"
               @on-cancel="hide"
               :mask-closable="false">

            <div class="form-wrapper">
                <Form ref="modalForm"
                      :model="formData"
                      :rules="ruleValidate"
                      label-position="top">
                    <FormItem :label="$t('colonSetting', { key : $t('typeName') })" prop="name">
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
                //修改、新增状态 add -- 新增 modify -- 修改
                type : '',
                //是否显示模态框
                visible : false,
                //表单数据
                formData : {
                    //类别id
                    id : '',
                    //类别名称、标签名称
                    name : '',
                    //使用场景 product_tag -- 标签 product_type -- 类别
                    scene : '',
                },
                //表单校验方法
                validateMethods : validateMethods,
            };
        },
        computed : {
            ruleValidate () {
                return {
                    //类别名称
                    name : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('typeName') }), trigger : 'blur' },
                        { max : 10, message : this.$t('errorMaxLength', { field : this.$t('typeName'), length : 10 }), trigger : 'blur' },
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
                this.type = data.type ? data.type : '';
                this.formData.id = data.id ? data.id : '';
                this.formData.scene = data.scene ? data.scene : '';
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
             * 保存类别
             */
            save () {
                if (this.type === 'modify') {
                    this.updateType();
                } else {
                    this.addType();
                }
            },
            /**
             * 新增类别
             */
            addType () {
                ajax.post('addTagDefine', {
                    name : this.formData.name,
                    scene : this.formData.scene,
                }).then((res) => {
                    if (res.success) {
                        this.visible = false;
                        this.$refs.modalForm.resetFields();
                        this.$emit('updateTypeList');
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                    } else {
                        if (res.code && res.code === 'S015') {
                            this.$Message.error(this.$t(res.code));
                        } else {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('add') }));
                        }
                    }
                });
            },
            /**
             * 更新类别
             */
            updateType () {
                ajax.post('addTagDefine', {
                    id : this.formData.id,
                    name : this.formData.name,
                }).then((res) => {
                    if (res.success) {
                        this.visible = false;
                        this.$refs.modalForm.resetFields();
                        this.$emit('updateTypeList');
                        this.$Message.success(this.$t('successTip', { tip : this.$t('modify') }));
                    } else {
                        if (res.code && res.code === 'S015') {
                            this.$Message.error(this.$t(res.code));
                        } else {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('modify') }));
                        }
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        position: relative;
        min-height: 168px;
    }

    .add-type {
        .form-wrapper {
            @include center_center();

        }
    }
</style>
