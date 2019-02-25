<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="picture-manager">
        <div class="img-package"
             v-for="(item, index) in orgImages"
             @mouseenter="enter(item, index)"
             @mouseleave="leave(item, index)"
             v-viewer
             :key="index">
            <div class="img-wrapper">
                <img :src="item.sourceUrl" alt="">
                <div class="tags-wrapper">
                    <span class="cover" v-if="item.isCover === 'true'">{{$t('coverPage')}}</span>
                    <span class="rotation" v-if="item.isRotation === 'true'">{{$t('carousel')}}</span>
                </div>
                <p v-if="item.isCover === 'false'"
                   class="img-btn"
                   @click="inCover(item)">{{$t('setToCover')}}</p>
                <p v-else class="img-btn"
                   @click="outCover(item)">{{$t('cancelCover')}}</p>
                <p v-if="item.isRotation === 'false'"
                   class="img-btn"
                   @click="inRotation(item)">{{$t('addToCover')}}</p>
                <p v-else class="img-btn"
                   @click="outRotation(item)">{{$t('cancelCover')}}</p>
                <p @click="del(item)" class="img-btn del-btn">{{$t('del')}}</p>
            </div>
            <div class="layer">
                <span class="preview" @click="preview(item)">+</span>
            </div>
        </div>
        <img-uploader  ref="imgUpload"
                       :format="['png','jpeg']"
                       :message="$t('clickToUpload')"
                       :quantity-limit="1"
                       :tipStop="true"
                       @upload-failure="uploadFail"
                       @upload-success="uploadSuc">
        </img-uploader>
        <delModal ref="delModal">
            <div :class="$style.delTips">
                <Icon :class="$style.icon" type="help-circled"></Icon>
                <span :class="$style.redBale">{{$t('sureToDeletePic')}}</span>
            </div>
        </delModal>
        <!--<image-preview ref="imagePreview" :images="orgImages.map(item => { return item.sourceUrl })">-->
            <!--<img v-for="src in orgImages.map(item => { return item.sourceUrl })" :src="src" :key="src">-->
        <!--</image-preview>-->
        <image-preview ref="imagePreview" :images="[previewItem.sourceUrl]">
            <img :src="previewItem.sourceUrl" >
        </image-preview>
    </div>
</template>

<script>
    import imagePreview from '@/components/imagePreview/index.vue';
    import delModal from '@/components/delModal/index';
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
            ImgUploader,
            delModal,
            imagePreview
        },
        data () {
            return {
                //当前悬浮的图片
                nowIndex : '',
                //当前悬浮的图片对象
                nowItem : {},
                //当前预览图片对象
                previewItem : {},
            };
        },
        methods : {
            /**
             * 上传图片成功
             * @param data
             */
            uploadSuc (data) {
                //新增机构图片资源
                this.addOrgImage(data);
                this.$refs.imgUpload.reset();
            },
            /**
             *  上传图片失败
             */
            uploadFail () {
                this.$Message.error(this.$t('uploadScenicResourceFaield'));
            },
            /**
             * 新增机构图片资源
             */
            addOrgImage (data) {
                ajax.post('addOrgImage', {
                    orgId : this.activeNode.id,
                    type : 'pic',
                    sourceUrl : data[0] ? data[0] : '',
                    isCover : 'false',
                    isRotation : 'false',
                    redirectUrlPc : '',
                    redirectUrlMobile : '',
                }).then(res => {
                    if (res.success) {
                        this.$emit('freshOrgInfo');
                        this.$Message.success(this.$t('uploadScenicResourceSuccessfully'));
                    } else {
                        this.$Message.error(this.$t('uploadScenicResourceFaield'));
                    }
                })
            },
            /**
             * 鼠标悬浮时
             * @param item
             * @param index
             */
            enter (item, index) {
                this.nowItem = item;
                this.nowIndex = index;
            },
            /**
             * 鼠标离开时
             * @param item
             * @param index
             */
            leave (item, index) {
                this.nowItem = {};
                this.nowIndex = '';
            },
            /**
             * 删除图片
             * @param item
             */
            del (item) {
                let params = {
                    id : item.id,
                    isDeleted : 'true',
                };
                this.$refs.delModal.show({
                    title : this.$t('deleteResource'),
                    confirmCallback : () => {
                        this.updateOrgImage(params, 'del');
                    }
                })
            },
            /**
             * 删除图片接口
             * @param params
             */
            updateOrgImage (params, type) {
                ajax.post('updateOrgImage', params).then(res => {
                    if (res.success) {
                        this.$emit('freshOrgInfo');
                        this.$Message.success(this.$t('successTip', { tip : this.$t(type) }));
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t(type) }));
                    }
                })
            },
            /**
             * 设为封面
             * @param item
             */
            inCover (item) {
                let params = {
                    id : item.id,
                    isCover : 'true',
                }
                this.updateOrgImage(params, this.$t('setToCover'));
            },
            /**
             * 取消封面
             * @param item
             */
            outCover (item) {
                let params = {
                    id : item.id,
                    isCover : 'false',
                }
                this.updateOrgImage(params, this.$t('cancelCover'));
            },
            /**
             * 加入轮播
             * @param item
             */
            inRotation (item) {
                let params = {
                    id : item.id,
                    isRotation : 'true',
                }
                this.updateOrgImage(params, this.$t('addToCover'));
            },
            /**
             * 取消轮播
             * @param item
             */
            outRotation (item) {
                let params = {
                    id : item.id,
                    isRotation : 'false',
                }
                this.updateOrgImage(params, this.$t('cancelCarousel'));
            },
            /**
             * 预览图片
             * @param
             */
            preview (item) {
                this.previewItem = item;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.imagePreview.show();
                    },100);
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .picture-manager {
        width: 100%;
        .img-package {
            position: relative;
            margin: 0 5px;
            width: 80px;
            height: 160px;
            display: inline-block;
            vertical-align: top;
            box-sizing: border-box;
            .img-wrapper {
                position: relative;
                height: 80px;
                width: 100%;

                .img-btn {
                    margin: 5px 0;
                    font-size: 12px;
                    color: $color_blue;
                    line-height: 100%;
                    cursor: pointer;

                    &:hover {
                        font-weight: bold;
                    }
                }

                .del-btn {
                    color: $color_red;
                }

                img {
                    display: inline-block;
                    height: 100%;
                    width: 100%;
                    border-radius: 5px;
                    cursor: pointer;

                    &:hover {
                        filter: blur(2px);
                        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=2, MakeShadow=false); /* IE6~IE9 */
                    }
                }

                .tags-wrapper {
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    line-height: 100%;
                    .cover, .rotation {
                        padding: 2px 5px;
                        display: block;
                        float: left;
                        font-size: 12px;
                        color: $color_fff;
                        border-radius: 5px;
                        line-height: 100%;
                    }
                    .cover {
                        background-color: $color_red;
                    }
                    .rotation {
                        background-color: $color_blue;
                    }
                }
            }
            .layer {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 80px;
                border-radius: 5px;
                background-color: gray;
                opacity: 0.4;
                text-align: center;

                .preview {
                    font-size: 20px;
                    line-height: 80px;
                    cursor: pointer;
                }
            }
        }

        .hover {
            .img-wrapper {
                img {
                    filter: blur(2px);
                }
            }
            .layer {
                display: block;
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
<style module lang="scss">
    .delTips{
        position: absolute;
        padding: 0 76px 0 106px;
        color: #333333;
        font-size: 14px;
    }

    .icon{
        position: absolute;
        left: 88px;
        top : 2px;
        font-size: 15px;
        color: #EB6751;
    }

    .redBale {
        color: #ED3F14;
    }

    .blue-txt {
        color: #2F70DF;
        margin-right: 5px;
    }
</style>
