<!--
    上传图片组件
    作者：杨泽涛
-->
<template>
    <div class="upload-img">
        <el-upload
            ref="imgUpload"
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
            //上传图片大小控制 单位Mb
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
            },
            //上传图片url地址
            imgUpload : {
                type : String,
                default : api.imgUpload
            }
        },
        components : {},
        data () {
            return {
                //已上传文件列表
                uploadList : [],
                //预览图片url
                dialogImageUrl : '',
                //是否显示预览图片
                dialogVisible : false,
                //是否到达文件数量限制
                limit : false,
                //是否显示添加按钮
                addDisabled : false
            };
        },
        computed : {
            //返回上传接口地址
            action () {
                return config.HOST + this.imgUpload;
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
             * @param {object} res
             * @param {object} file 当前上传的文件
             */
            uploadSuc (res,file) {
                if (res.success) {
                    this.uploadList.push({
                        url : res.data,
                        size : file.size
                    });
                    //若已上传文件到达上传数量限制，则不显示上传按钮
                    if (this.uploadList.length === this.quantityLimit) {
                        this.addDisabled = true;
                    }
                    this.$emit('upload-success',this.uploadList);
                    this.$Message.success(this.$t('successTip', { tip : this.$t('upload') }));
                } else {
                    if (res.code === 'S003') {
                        this.$Message.error( this.$t('failureTip', { tip : this.$t('upload') }));
                    } else {
                        this.$Message.error( 'analysisFail' );
                    }
                }
                this.$store.commit('changePromisings','del');
            },
            /**
             * 删除图片
             * @param {object} file
             * @param {array} fileList
             */
            handleRemove (file, fileList) {
                if (this.limit) {
                    //删除图片，消除超出限制的状态
                    this.limit = false;
                } else {
                    this.uploadList.splice(fileList.indexOf(file), 1);
                    this.$emit('remove-img',this.uploadList);
                    //删除图片--显示出添加上传的按钮
                    if (this.uploadList.length < this.quantityLimit) {
                        this.addDisabled = false;
                    }
                }
            },
            /**
             * 点击预览图片
             * @param {object} file
             */
            handlePictureCardPreview (file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            /**
             * 上传失败
             */
            uploadFail () {
                this.$message.error('failureTip', { tip : this.$t('upload') });
                this.$store.commit('changePromisings','del');
            },
            /**
             * 上传文件之前
             * @param {object} file
             * @returns {boolean}
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
        },
        mounted () {
            if (this.$refs && this.$refs.imgUpload) {
                if (this.$refs.imgUpload.fileList.length >= this.quantityLimit) {
                    this.addDisabled = true;
                } else {
                    this.addDisabled = false;
                }
            }
        },
        watch : {
            defaultList : {
                handler () {
                    this.$nextTick(() => {
                        if (this.$refs && this.$refs.imgUpload) {
                            if (this.$refs.imgUpload.fileList.length >= this.quantityLimit) {
                                this.addDisabled = true;
                            } else {
                                this.addDisabled = false;
                            }
                        }
                    })
                }
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
