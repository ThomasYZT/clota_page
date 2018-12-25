<!--
    编辑面板组件
    作者：杨泽涛
-->
<template>
    <div class="edit-panel">
        <template v-if="nowfileItem.type === 'new-file' || editable">
            <div class="form-wrapper">
                <Form ref="form"
                      label-position="left"
                      :label-width="300"
                      :model="formData"
                      :rules="ruleValidate">
                    <FormItem :label="$t('pageTitle')" class="title-form-item" prop="title">
                        <Input v-model="formData.title" :placeholder="$t('inputField', { field : this.$t('pageTitle') } )" style="width:400px;"></Input>
                    </FormItem>
                    <FormItem label="" :label-width="0" class="edit-form-item" prop="content">
                        <editor :value.sync="formData.content"></editor>
                    </FormItem>
                </Form>
            </div>

            <div class="btn-wrapper">
                <Button type="primary" class="ivu-btn-90px" @click="save">保存</Button>
                <Button type="ghost" class="ivu-btn-90px" @click="cancel">取消</Button>
            </div>
        </template>
        <template v-else-if="nowfileItem.type === 'show-file'">
            <h4 class="page-title">{{nowfileItem.name}}</h4>
            <div class="page-content">
                <p class="content" v-html="content"></p>
            </div>
            <div class="btn-wrapper">
                <Button type="primary" class="ivu-btn-90px" @click="edit">编辑</Button>
                <Button type="error" class="ivu-btn-90px" @click="del">删除</Button>
            </div>

        </template>
        <template v-else>
            <div class="no-data-wrapper">
                <noDataTip></noDataTip>
            </div>
        </template>
    </div>
</template>

<script>
    import noDataTip from '@/components/noDataTip/noData-tip';
    import ajax from '@/api/index';
    import editor from '@/components/editor/editor';
    import 'quill/dist/quill.core.css';
    export default {
        props : {
            nowfileItem : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            noDataTip,
            editor
        },
        data () {
            return {
                //校验规则
                ruleValidate : {
                    title : [
                        { required : true, message : this.$t('inputField', { field : this.$t('pageTitle') }), trigger : 'blur' },
                        { type : 'string', max : 50, message : this.$t('errorMaxLength', { field : this.$t('pageTitle'), length : 50 }), trigger : 'blur' }
                    ],
                    content : [
                        { required : true, message : this.$t('inputField', { field : this.$t('pageContent') }), trigger : 'blur' },
                    ]
                },
                //表单数据
                formData : {
                    folderId : '',
                    title : '',
                    picsIDs : [],
                    content : '',
                },
                defaultMsg : '',
                config : {
                    initialFrameWidth : null,
                    initialFrameHeight : 400
                },
                content : '',
                editable : false
            };
        },
        methods : {
            save () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.editable) {
                            this.editFile();
                        } else {
                            this.newFolder();
                        }
                    }
                })
            },
            newFolder () {
                ajax.post('addPage', {
                    folderId : this.nowfileItem.folderId,
                    title : this.formData.title,
                    content : this.formData.content,
                }).then(res => {
                    if (res.status === 200 && res.data) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                        this.$emit('updatePageList', {
                            folderId : this.nowfileItem.folderId,
                            fileId : res.data.id,
                        });
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('add') }));
                    }
                });
            },
            editFile () {
                ajax.post('updatePage', {
                    id : this.nowfileItem.id,
                    title : this.formData.title,
                    content : this.formData.content,
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('edit') }));
                        this.$emit('updatePageList', {
                            folderId : this.nowfileItem.folderId,
                            fileId : this.nowfileItem.id,
                        });
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('edit') }));
                    }
                })
            },
            cancel () {
                this.$emit('cancel', this.nowfileItem);
            },
            getPageInfo () {
                ajax.get('pageInfo', {
                    id : this.nowfileItem.id
                }).then(res => {
                    if (res.status === 200) {
                        this.content = res.data ? res.data.content : '';
                    } else {
                        this.content = '';
                    }
                });
            },
            /**
             * 删除文件
             */
            del () {
                ajax.post('deletePage', {
                    id : this.nowfileItem.id
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('delete') }));
                        this.$emit('updatePageList', {
                            folderId : this.nowfileItem.folderId,
                            fileId : '',
                        });
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('delete') }));
                    }
                })
            },
            /**
             * 编辑文件
             */
            edit () {
                this.editable = true;
                this.formData.title = this.nowfileItem.name;
                this.formData.content = this.content;
            },
            reset () {
                this.editable = false;
                this.formData = {
                    folderId : '',
                    title : '',
                    picsIDs : [],
                    content : '',
                };
            }
        },
        watch : {
            nowfileItem : {
                handler (newVal) {
                    if (newVal.type === 'show-file') {
                        this.getPageInfo();
                    }

                    if (this.$refs.form) {
                        this.$refs.form.resetFields();
                    }
                    this.reset();
                },
                deep : true,
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-panel {
        position: relative;
        padding-bottom: 50px;
        min-height: 100%;
        width: 100%;

        .form-wrapper {
            height: 100%;
            width: 100%;
            margin: 0 auto;
            /deep/ .ivu-form {
                height: 100%;
            }

            .title-form-item {
                display: inline-block;
                width: 100%;
                height: 34px;

                /deep/ .ivu-form-item-label {
                    text-align: right;
                }
            }

            .edit-form-item {
                width: 100%;
               /deep/ .ivu-form-item-content {
                   height: 570px;
                   margin-left: 0 !important;
               }
            }
        }
        .btn-wrapper {
            width: 100%;
            position: absolute;
            bottom: 10px;
            text-align: center;

            .ivu-btn-90px {
                margin-right: 10px;
            }
        }

        .no-data-wrapper {
            @include absolute_pos(absolute, 0, 0, 0, 0);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
    }

    .page-title {
        text-align: center;
        font-size: 18px;
    }

    .page-content {
        width: 100%;
        padding: 10px;
        word-break: break-all;

        /deep/ img {
            max-width: 100%;
        }

    }

</style>
<style>
    blockquote {
        border-left: 4px solid #ccc !important;
        margin-bottom: 5px !important;
        margin-top: 5px !important;
        padding-left: 16px !important;
    }
    pre {
        white-space: pre-wrap;
        margin-bottom: 5px;
        margin-top: 5px;
        padding: 5px 10px;
        border-radius: 3px;
    }
    pre.ql-syntax {
        background-color: #23241f;
        color: #f8f8f2;
        overflow: visible;
    }
</style>
