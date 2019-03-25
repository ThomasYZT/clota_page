<!--
    H5页面背景设置模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal view-code-modal"
               transfer
               width="700"
               :title="$t('H5BGSet')"
               @on-cancel="hide"
               :mask-closable="false">

            <div class="modal-content">
                <p class="tip">图片限制：750*1334像素、大小小于5M，仅支持jpg/png/jpeg格式</p>

                <ImgUploader :quantityLimit="1"
                             :size="20"
                             :message="$t('uploadPicture')"
                             :format="['jpeg','png','bmp']"
                             @remove-img="removeImg"
                             @upload-success="uploadSuccess"></ImgUploader>
            </div>

            <div slot="footer" class="modal-footer">
                <Button type="primary" @click="save()" >{{$t("save")}}</Button>
                <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import ImgUploader from '../../../../register/components/ImgUploader';
    export default {
        components : {
            ImgUploader
        },
        data () {
            return {
                //是否显示模态框
                visible : false,
            };
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.visible = true;
            },
            hide () {
                this.visible = false;
            },
            /**
             *  删除图片
             * @param {array} uploadList
             */
            removeImg (uploadList) {
                this.img = uploadList;
            },
            /**
             *  上传图片成功
             * @param {array} uploadList
             */
            uploadSuccess (uploadList) {
                this.img = uploadList;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        height: 432px;
        overflow: auto;
    }

    .view-code-modal {
        .tip {
            margin-bottom: 15px;
            font-size: 16px;
            color: #C5C5C5;
        }
    }

    /deep/ .el-upload {
        min-width: 180px;
        width: 180px;
        height: 220px;
        font-size: 12px;
        background-color: #fff;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3.5px;
        i.el-icon-plus {
            color: #999999;
            font-size: 12px;
        }
    }
    /deep/ .el-upload-list__item {
        width: 180px;
        height: 220px;
        border-radius: 0;
    }

    /deep/ .picture-preview.ivu-modal-wrap {
        z-index: 9999;
    }
</style>
