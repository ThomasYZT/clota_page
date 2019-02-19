<!--
    图片上传组件
    作者：杨泽涛
-->
<template>
    <div class="img-uploader">
        <el-upload
            ref="imgUpload"
            :class="{ 'add-hidden' : addDisabled || uploadList.length >= quantityLimit || defaultList.length >= quantityLimit }"
            :action="action"
            list-type="picture-card"
            :limit="quantityLimit"
            :show-file-list="true"
            :before-upload="beforeUpload"
            :on-error="uploadFail"
            :file-list="defaultList"
            :show-upload-list="true"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handlEexceed"
            :on-success="uploadSuc">
            <i class="el-icon-plus" ></i>{{message}}
        </el-upload>

        <div class="extra-info" v-if="imgInfo">{{imgInfo}}</div>

        <!--图片预览-->
        <image-preview ref="imagePreview" :images="[dialogImageUrl]">
            <img :src="dialogImageUrl">
        </image-preview>
    </div>
</template>

<script>
    import config from '@/config/index';
    import api from '@/api/apiList';
    import ajaxConfig from '@/api/index.js';
    import imagePreview from '@/components/imagePreview/index.vue';

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
                default : 5
            },
            //上传文件格式
            format : {
                type : Array,
                default () {
                    return [];
                }
            },
            //文案
            message : {
                type : String,
                default () {
                    return '';
                }
            },
            imgInfo : {
                type : String,
                default () {
                    return '';
                }
            }
        },
        components : {
            imagePreview
        },
        data () {
            return {
                //已上传文件列表
                uploadList : [],
                //预览图片url
                dialogImageUrl : '',
                //是否到达文件数量限制
                limit : false,
                //是否显示添加按钮
                addDisabled : false,
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
             * @param file
             * @param fileList
             */
            uploadSuc (res, file, fileList) {
                if (res.success) {
                    this.uploadList.push(res.data);
                    //若已上传文件到达上传数量限制，则不显示上传按钮
                    if (this.uploadList.length < this.quantityLimit) {
                        this.addDisabled = false;
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
             * @param file
             * @param fileList
             */
            handleRemove (file, fileList) {
                if (this.limit) {
                    //删除图片，消除超出限制的状态
                    this.limit = false;
                } else {
                    this.uploadList.splice(fileList.indexOf(file), 1);
                    this.$emit('remove-img', this.uploadList);
                    //删除图片--显示出添加上传的按钮
                    if (this.uploadList.length < this.quantityLimit) {
                        setTimeout(() => {
                            this.addDisabled = false;
                        }, 500);
                    }
                }
            },
            /**
             * 点击预览图片
             * @param file
             */
            handlePictureCardPreview (file) {
                this.dialogImageUrl = file.url;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.imagePreview.show();
                    },100);
                });
            },
            /**
             * 上传失败
             * @param err
             * @param file
             * @param fileList
             */
            uploadFail (err, file, fileList) {
                this.$message.error('failureTip', { tip : this.$t('upload') });
                this.$store.commit('changePromisings','del');
            },
            /**
             * 上传文件之前
             * @param {object} file
             * @returns {boolean}
             */
            beforeUpload (file) {
                this.addDisabled = true;
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
                this.imageShow = false;
            },
            /**
             * 文件超出指定数量时
             */
            handlEexceed () {
                this.$Message.error(this.$t( 'mostUploadPic', { num : this.quantityLimit }));
                this.limit = true;
            },
            /**
             * 重置
             */
            reset () {
                this.$refs.imgUpload.clearFiles();
                //已上传文件列表
                this.uploadList = [];
                //预览图片url
                this.dialogImageUrl = '';
                //是否显示预览图片
                this.imageShow = false;
                //是否到达文件数量限制
                this.limit = false;
                //是否显示添加按钮
                this.addDisabled = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .img-uploader {
        display: inline-block;
    }

    /deep/ .add-hidden {
        .el-upload {
            display: none;
        }
    }

    .extra-info {
        width: 148px;
        text-align: center;
    }
</style>
