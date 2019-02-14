<!--
    富文本编辑器组件
    作者：杨泽涛
-->
<template>
    <div class="editor">
        <!-- 图片上传组件辅助-->
        <el-upload
            v-show="false"
            class="avatar-uploader"
            :action="serverUrl"
            :headers="headers"
            name="file"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload">
        </el-upload>

        <quill-editor
            ref="myQuillEditor"
            v-model="content"
            :options="editorOption"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>

<script>

    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import ajax from '@/api/index';
    import api from '@/api/apiList';
    import config from '@/config/index';
    export default {
        props : {
            value : {
                type : String,
                default : '',
            }
        },
        components : {
            quillEditor
        },
        data () {
            return {
                editorOption : {
                    modules : {
                        toolbar : {
                            container : [
                                ['bold', 'italic', 'underline', 'strike'],
                                ['blockquote', 'code-block'],
                                [{ 'header' : 1 }, { 'header' : 2 }],
                                [{ 'list' : 'ordered' }, { 'list' : 'bullet' }],
                                [{ 'script' : 'sub' }, { 'script' : 'super' }],
                                [{ 'indent' : '-1' }, { 'indent' : '+1' }],
                                [{ 'direction' : 'rtl' }],
                                [{ 'size' : ['small', false, 'large', 'huge'] }],
                                [{ 'header' : [1, 2, 3, 4, 5, 6, false] }],
                                [{ 'font' : [] }],
                                [{ 'color' : [] }, { 'background' : [] }],
                                [{ 'align' : [] }],
                                ['clean'],
                                ['link', 'image']
                            ],
                            handlers : {
                                'image' : function (value) {
                                    if (value) {
                                        document.querySelector('.el-upload__input').click();
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    },
                    placeholder : this.$t('inputPlaceholder'),

                },
                content : '',
            };
        },
        computed : {
            headers () {
                return {
                    token : ajax.getToken()
                };
            },
            serverUrl () {
                return config.HOST + api.imgUpload;
            },
            editor () {
                return this.$refs.myQuillEditor.quill;
            },
        },
        methods : {
            // 内容改变事件
            onEditorChange ({ html }) {
                this.$emit('update:value', html);
            },
            // 富文本图片上传前
            beforeUpload () {
                this.$store.commit('changePromisings','add');
            },
            uploadSuccess (res) {
                let quill = this.$refs.myQuillEditor.quill;
                if (res.success && res.data) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', res.data);
                    // 调整光标到最后
                    quill.setSelection(length + 1);
                } else {
                    this.$Message.error(this.$t('failureTip', { tip : this.$t('insertImg') }));
                }
                this.$store.commit('changePromisings','del');
            },

            // 富文本图片上传失败
            uploadError () {
                this.$store.commit('changePromisings','del');
                this.$Message.error(this.$t('failureTip', { tip : this.$t('insertImg') }));
            },
            disableEditor () {
                this.editor.enable(false);
            }
        },
        created () {
            this.content = this.value;
        },
        watch : {
            value : {
                handler () {
                    this.content = this.value;
                },
                immediate : true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .editor {
        line-height: normal !important;
        /deep/ .quill-editor {

            height: 500px;
            .ql-snow .ql-tooltip[data-mode=link]::before {
                content: "请输入链接地址:";
            }
            .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
                border-right: 0px;
                content: '保存';
                padding-right: 0px;
            }

            .ql-snow .ql-tooltip[data-mode=video]::before {
                content: "请输入视频地址:";
            }

            .ql-snow .ql-picker.ql-size .ql-picker-label::before,
            .ql-snow .ql-picker.ql-size .ql-picker-item::before {
                content: '14px';
            }
            .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
            .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
                content: '10px';
            }
            .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
            .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
                content: '18px';
            }
            .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
            .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
                content: '32px';
            }

            .ql-snow .ql-picker.ql-header .ql-picker-label::before,
            .ql-snow .ql-picker.ql-header .ql-picker-item::before {
                content: '文本';
            }
            .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
            .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
                content: '标题1';
            }
            .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
            .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
                content: '标题2';
            }
            .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
            .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
                content: '标题3';
            }
            .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
            .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
                content: '标题4';
            }
            .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
            .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
                content: '标题5';
            }
            .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
            .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
                content: '标题6';
            }

            .ql-snow .ql-picker.ql-font .ql-picker-label::before,
            .ql-snow .ql-picker.ql-font .ql-picker-item::before {
                content: '标准字体';
            }
            .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
            .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
                content: '衬线字体';
            }
            .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
            .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
                content: '等宽字体';
            }
        }

    }

</style>

