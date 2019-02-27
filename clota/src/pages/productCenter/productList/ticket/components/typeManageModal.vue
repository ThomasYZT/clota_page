<!--
    类别管理模态框
    作者：杨泽涛
-->
<template>
    <div class="type-manage-modal">
        <Modal v-model="visible"
               class-name="vertical-center-modal type-manage"
               transfer
               width="600"
               :title="$t('colonSetting', { key : $t('productTypeManage') })"
               @on-cancel="hide"
               :mask-closable="false">
            <div class="manager-wrapper">
                <Form ref="typeForm"
                      :model="formData">
                    <i-row>
                        <i-col span="12"
                               v-for="(item, index) in formData.typeList"
                               :key="item.id">
                            <FormItem
                                :prop="'typeList.' + index + '.name'"
                                :rules="rules">
                                    <Input type="text"
                                           :disabled="!item.editing"
                                           v-model="item.name"
                                           style="width: 60%;"
                                           placeholder=""></Input>
                                    <div class="btn-wrapper">
                                        <ul class="operate-list">
                                            <template v-if="item.editing">
                                                <li @click="save(item, index)">{{$t('save')}}</li>
                                                <li @click="cancel(item, index)" class="red-label" >{{$t('cancel')}}</li>
                                            </template>
                                            <template v-else>
                                                <li @click="edit(item)">{{$t('edit')}}</li>
                                                <li @click="del(item)" class="red-label" >{{$t('del')}}</li>
                                            </template>

                                        </ul>
                                    </div>
                            </FormItem>
                        </i-col>
                    </i-row>
                </Form>

                <div class="form-wrapper">
                    <Form ref="addTypeForm"
                          :model="addFormData"
                          :rules="ruleValidate"
                          label-position="left">
                        <FormItem :label="$t('colonSetting', { key : $t('typeName') })" prop="name">
                            <Input v-model="addFormData.name"
                                   :placeholder="$t('inputPlaceholder')" style="width: 200px" />
                            <span class="btn-inline" @click="validateType">{{$t('addProductType')}}</span>
                        </FormItem>
                    </Form>
                </div>
            </div>

            <div slot="footer">
                <Button class="ivu-btn-90px" type="primary" @click="confirm">{{$t('confirm')}}</Button>
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
                //模态框是否显示
                visible : false,
                formData : {
                    typeList : [
                        {
                            name : '',
                            index : 1,
                            status : 1
                        }
                    ]
                },
                //新增类别表单数据
                addFormData : {
                    //类别id
                    id : '',
                    //类别名称、标签名称
                    name : '',
                    //使用场景 product_tag -- 标签 product_type -- 类别
                    scene : '',
                },
                //表单校验方法
                validateMethods : validateMethods,
                //类别列表数据
                typeList : [],
            };
        },
        computed : {
            //表单校验规则
            rules () {
                return [
                    { required : true, message : this.$t('errorEmpty', { msg : this.$t('typeName') }), trigger : 'blur' },
                    { max : 10, message : this.$t('errorMaxLength', { field : this.$t('typeName'), length : 10 }), trigger : 'blur' },
                    { validator : this.validateMethods.emoji, trigger : 'blur' },
                ]
            },
            //新增类别表单校验规则
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
             * 显示模态框
             */
            show () {
                this.queryTagDefines();
            },
            /**
             * 关闭模态框
             */
            hide () {
                this.$refs.addTypeForm.resetFields();
                this.typeList = [];
                this.formData = { typeList : [] };
                this.visible = false;
            },
            /**
             * 确认
             */
            confirm () {
                this.hide()
            },
            /**
             * 获取类别列表数据
             */
            queryTagDefines () {
                ajax.post('queryTagDefines', {
                    scene : 'product_type',
                }).then(res => {
                    if (res.success) {
                        this.typeList = res.data ? res.data : [];
                        this.formData.typeList = this.typeList.map((item) => {
                            return {
                                id : item.id,
                                name : item.name,
                                //是否处于编辑状态
                                editing : false,
                            }
                        });
                    } else {
                        this.typeList = [];
                        this.formData.typeList = [];
                    }
                    this.visible = true;
                });
            },
            /**
             * 编辑类别
             * @param typeItem
             */
            edit (typeItem) {
                typeItem.editing = true;
            },
            /**
             * 删除类别
             * @param typeItem
             */
            del (typeItem) {
                this.deletaValidate(typeItem);
            },
            /**
             *  删除类别校验
             */
            deletaValidate (typeItem) {
                ajax.post('deletedProductTagType', {
                    id : typeItem.id,
                }).then(res => {
                    if (res.success) {
                        this.$emit('updateTypeList');
                        this.queryTagDefines();
                        this.$Message.success(this.$t('successTip', { tip : this.$t('delete') }));
                    } else {
                        this.$Message.error(this.$t('productTypeIsUsingTip'));
                    }
                })
            },
            /**
             * 保存类别
             * @param typeItem
             */
            save (typeItem, index) {
                this.$refs.typeForm.validateField('typeList.' + index + '.name', (err) => {
                    if (!err) {
                        this.updateTagDefine(typeItem);
                    }
                });
            },
            /**
             *  更新类别名称
             *  @param typeItem
             */
            updateTagDefine (typeItem) {
                ajax.post('updateTagDefine', {
                    id : typeItem.id,
                    name : typeItem.name,
                }).then(res => {
                    if (res.success) {
                        this.$emit('updateTypeList');
                        this.queryTagDefines();
                        this.$Message.success(this.$t('successTip', { tip : this.$t('modify') }));
                    } else {
                        if (res.code && res.code === 'S015') {
                            this.$Message.error(this.$t(res.code));
                        } else {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('modify') }));
                        }
                    }
                });
            },
            /**
             * 取消操作
             * @param typeItem
             * @param index
             */
            cancel (typeItem, index) {
                typeItem.name = this.typeList.find((item) => {
                    return item.id === typeItem.id;
                }).name;
                this.$refs.typeForm.validateField('typeList.' + index + '.name');
                typeItem.editing = false;
            },
            /**
             *  校验类别
             */
            validateType () {
                this.$refs.addTypeForm.validate((valid) => {
                    if (valid) {
                        this.addType();
                    }
                });
            },
            /**
             * 新增类别
             */
            addType () {
                ajax.post('addTagDefine', {
                    name : this.addFormData.name,
                    scene : 'product_type',
                }).then((res) => {
                    if (res.success) {
                        this.$refs.addTypeForm.resetFields();
                        this.queryTagDefines();
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
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        min-height: 200px;

        .form-wrapper {
            width: 100%;
            height: 50px;
            position: relative;
            /deep/ .ivu-form-item {
                margin-top: 18px;
                text-align: center;
                .ivu-form-item-content {
                    display: inline-block;
                }
                .ivu-form-item-label {
                    float: none;
                }
            }
        }
    }

    /deep/ .ivu-form-item-content {
        height: 32px;

        .btn-wrapper {
            margin-left: 10px;
            display: inline-block;
        }

        .btn-inline {
            font-size: 12px;
            color: $color_blue;
            cursor: pointer;
        }
    }

</style>
