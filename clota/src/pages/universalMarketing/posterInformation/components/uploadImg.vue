<!--
    上传图片组件
    作者：杨泽涛
-->
<template>
    <div class="upload-img">
        <el-upload
            :class="{ 'add-hidden' : addDisabled }"
            :action="action"
            :headers="headers"
            list-type="picture-card"
            :limit="quantityLimit"
            :before-upload="beforeUpload"
            :on-error="uploadFail"
            :file-list="defaultList"
            :show-upload-list="true"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handlEexceed"
            :on-success="uploadSuc">
            <i class="el-icon-plus"></i>
            <span>{{$t('uploadPicture')}}</span>
        </el-upload>
        <Modal :title="$t('picturePreview')"
               :transfer="false"
               :mask-closable="false"
               :closable="false"
               class-name="picture-preview"
               v-model="dialogVisible">
            <img :src="dialogImageUrl" style="width: 100%">
            <div slot="footer" class="modal-footer">
                <Button class="ivu-btn-90px"
                        type="ghost"
                        @click="hide" >{{$t("cancel")}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import config from '@/config/index';
    import api from '@/api/apiList';
    import ajaxConfig from '@/api/index.js';
    export default {
        props : {
            //上传图片数量限制
            quantityLimit : {
                type : Number,
                default : 5
            },
            //默认显示的照片
            defaultList : {
                type : Array,
                default () {
                    return [];
                }
            },
            //上传图片大小控制 单位M
            size : {
                type : Number,
                default : 1
            },
            //上传文件格式
            format : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {},
        data () {
            return {
                uploadList : [],
                dialogImageUrl : '',
                dialogVisible : false,
                limit : false,
                //是否显示添加按钮
                addDisabled : false
            };
        },
        computed : {
            //返回上传接口地址
            action () {
                return config.HOST + api.imgUpload;
            },
            //上传文件的headers
            headers () {
                return {
                    token : ajaxConfig.getToken()
                };
            },
            //图片限制大小
            limitSize () {
                return this.size * 1024;
            }
        },
        methods : {
            /**
             * 文件上传成功
             * @param response
             */
            uploadSuc (res) {
                if (res.success) {
                    this.uploadList.push(res.data);
                    if (this.uploadList.length === this.quantityLimit) {
                        this.addDisabled = true;
                    }
                    this.$emit('upload-success',this.uploadList);
                    this.$Message.success(this.$t('上传成功'));
                } else {
                    if (res.code === 'S003') {
                        this.$Message.error( this.$t('上传失败'));
                    } else {
                        this.$Message.error( '解析失败' );
                    }
                }
                this.$store.commit('changePromisings','del');
            },
            /**
             * 删除图片
             * @param file
             * @param fileList
             */
            handleRemove (file, fileList) {
                if (this.limit) {
                    this.limit = false;
                } else {
                    this.uploadList.splice(fileList.indexOf(file), 1);
                    this.$emit('remove-img',this.uploadList);
                    if (this.uploadList.length < this.quantityLimit) {
                        this.addDisabled = false;
                    }
                }
            },
            /**
             * 点击预览图片
             * @param file
             */
            handlePictureCardPreview (file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            /**
             * 上传失败
             */
            uploadFail () {
                this.$message.error('图片上传失败');
                this.$store.commit('changePromisings','del');
            },
            /**
             * 上传文件之前
             * @param {object} file
             */
            beforeUpload (file) {
                //文件格式校验
                let isRightFormat = this.format.findIndex((item) => {
                    return file.type.split('/')[1] === item;
                });
                //校验文件大小
                let isRightSize = file.size > this.size * 1024 * 1024;

                if (isRightFormat < 0) {
                    this.$Message.error(this.$t('fileFormatOnlyIs', { format : this.format.join(',') }));
                    return false;
                }

                if (isRightSize) {
                    this.$Message.error(this.$t('fileSizeNoMore', { size : this.size + 'M' }));
                    return false;
                }
                this.$store.commit('changePromisings','add');
            },
            /**
             * 隐藏预览
             */
            hide () {
                this.dialogVisible = false;
            },
            /**
             * 文件超出指定数量时
             */
            handlEexceed () {
                this.$Message.error(this.$t( 'mostUploadPic', { num : this.quantityLimit }));
                this.limit = true;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .upload-img {
        /deep/ .el-upload {
            width: 80px;
            height: 80px;
            line-height: 80px;
            font-size: 12px;
            background-color: #FAFAFA;
            color: #999999;
            i.el-icon-plus {
                color: #999999;
                font-size: 12px;
            }
        }
        /deep/ .el-upload-list__item {
            width: 80px;
            height: 80px;
        }

        /deep/ .picture-preview.ivu-modal-wrap {
            z-index: 9999;
        }
    }

    /deep/ .add-hidden {
        .el-upload {
            display: none;
        }
    }


</style>
