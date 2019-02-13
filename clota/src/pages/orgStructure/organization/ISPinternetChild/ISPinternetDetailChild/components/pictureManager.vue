<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="picture-manager">
        <div class="img-package"
             v-for="(item, index) in orgImages"
             :key="index">
            <div class="img-wrapper">
                <img src="" alt="">
            </div>
        </div>
        <img-uploader  ref="imgUpload"
                       :format="['png','jpeg']"
                       :message="'点击上传'"
                       :quantity-limit="1"
                       :tipStop="true"
                       @upload-failure="uploadFail"
                       @upload-success="uploadSuc">
        </img-uploader>
    </div>
</template>

<script>
    import ImgUploader from '../../../../../register/components/ImgUploader';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //景区轮播图资源
            orgImages : {
                type : Array,
                default () {
                    return [];
                }
            },
            //当前节点
            activeNode : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            ImgUploader
        },
        data () {
            return {};
        },
        methods : {
            /**
             * 上传图片成功
             */
            uploadSuc () {
                //新增机构图片资源
                this.addOrgImage();
                this.$refs.imgUpload.reset();
            },
            uploadFail () {
                this.$Message.error('景区资源上传失败');
            },
            /**
             * 新增机构图片资源
             */
            addOrgImage () {
                ajax.post('addOrgImage', {
                    orgId : this.activeNode.id,
                    type : 'pic',
                    sourceUrl : '',
                    isCover : 'false',
                    isRotation : 'false',
                    redirectUrlPc : '',
                    redirectUrlMobile : '',
                }).then(res => {
                    if (res.success) {
                        this.$emit('freshOrgInfo');
                        this.$Message.error('景区资源上传成功');
                    } else {
                        this.$Message.error('景区资源上传失败');
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .picture-manager {
        .img-package {
            width: 80px;
            height: 80px;
            .img-wrapper {

            }
        }
    }

    /deep/ .el-upload {
        min-width: 80px;
        width: 80px;
        height: 80px;
        font-size: 12px;
        background-color: #FAFAFA;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: center;

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
</style>
