<!--
    海报制作模态框
    作者：杨泽涛
-->
<template>
    <div class="modal-wrapper">
        <Modal v-model="choosePosterVisible"
               class-name="vertical-center-modal choose-poster-modal"
               transfer
               width="1000"
               :title="$t('colonSetting',{ key : $t('choosePosterBasePic') })"
               @on-cancel="choosePosterHide"
               :mask-closable="false">
            <div class="choose-wrapper">
                <div class="box">
                    <div class="box-title">{{$t('chosePosterPicTypeOne')}}</div>
                    <div class="box-body">
                        <posterSelection v-if="choosePosterVisible"
                                         :poster-list="posterList"
                                         @posterChosed="posterChosed"></posterSelection>
                    </div>
                </div>
                <div class="box">
                    <div class="box-title">{{$t('chosePosterPicTypeTwo')}}</div>
                    <div class="box-body">
                        <Button type="primary" class="ivu-btn-90px"
                                @click="addPoster">{{$t('uploadPoster')}}</Button>
                    </div>
                </div>
            </div>

            <div slot="footer">
                <Button class="ivu-btn-90px" type="primary" @click="nextStep">{{$t('nextStep')}}</Button>
                <Button class="ivu-btn-90px" type="default" @click="choosePosterHide">{{$t('cancel')}}</Button>
            </div>
        </Modal>
        <Modal v-model="editPosterVisible"
               class-name="vertical-center-modal edit-poster-modal"
               transfer
               width="1000"
               :title="$t('colonSetting',{ key : $t('editPoster') })"
               @on-cancel="editPosterHide"
               :mask-closable="false">
                <div class="workspace">
                    <imgSynthesizer v-if="editPosterVisible"
                                    ref="imgSynthesizer"
                                    :chosedPost="chosedPost"
                                    :src64="src64"
                                    :codeUrl="codeUrl"></imgSynthesizer>
                    <!--<img :src="downloadImageSrc" style="height: 432px;" alt="">-->
                </div>
            <div slot="footer">
                <Button class="ivu-btn-90px" type="primary" @click="save">{{$t('save')}}</Button>
                <Button class="ivu-btn-90px" type="default" @click="editPosterHide">{{$t('cancel')}}</Button>
            </div>
        </Modal>

        <uploadPosterModal ref="uploadPosterModal"
                           @addSuccess="queryPosterList"></uploadPosterModal>
    </div>
</template>

<script>
    import uploadPosterModal from '../../../posterInformation/components/uploadPosterModal';
    import imgSynthesizer from './imgSynthesizer';
    import ImgUploader from '../../../../register/components/ImgUploader';
    import posterSelection from './posterSelection';
    import ajax from '@/api/index';
    import common from '../../../../../assets/js/common';
    import html2canvas from 'html2canvas';
    export default {
        components : {
            posterSelection,
            ImgUploader,
            uploadPosterModal,
            imgSynthesizer
        },
        data () {
            return {
                //选择海报地图模态框是否显示
                choosePosterVisible : false,
                //编辑海报模态框是否显示
                editPosterVisible : false,
                //海报列表
                posterList : [],
                //选择的海报
                chosedPost : {},
                //二维码图片地址
                codeUrl : '',
                //base64编码格式海报底图
                src64 : '',
                //下载图片base64格式码
                downloadImageSrc : '',
            };
        },
        methods : {
            /**
             *  显示选择海报底图模态框
             *  @param codeUrl
             */
            show ({ codeUrl }) {
                this.codeUrl = codeUrl;
                //查询海报列表
                this.queryPosterList().then(() => {
                    this.choosePosterVisible = true;
                });
            },
            /**
             *  显示编辑海报模态框
             */
            nextStep () {
                if (Object.keys(this.chosedPost).length > 0) {
                    ajax.post('img2base64', {
                        imgUrl : this.chosedPost.posterUrl
                    }).then(res => {
                        if (res.success) {
                            this.src64 = res.data ? res.data : '';
                            this.editPosterVisible = true;
                        } else {
                            this.src64 = '';
                            this.$Message.error(this.$t('getPosterFaield'));
                        }
                    });
                    this.editPosterVisible = true;
                } else {
                    this.$Message.warning(this.$t('choosePosterBasePic'));
                }
            },
            /**
             *  隐藏选择海报底图模态框
             */
            choosePosterHide () {
                this.codeUrl = '';
                this.posterList = [];
                this.chosedPost = {};
                this.choosePosterVisible = false;
            },
            /**
             *  隐藏编辑海报模态框
             */
            editPosterHide () {
                this.downloadImageSrc = '';
                this.src64 = "";
                this.editPosterVisible = false;
            },
            /**
             * 保存并下载制作好的海报
             */
            save () {
                let dom = this.$refs['imgSynthesizer'].$el;
                //获取元素相对于视察的偏移量
                let rect = dom.getBoundingClientRect();
                let scaledCanvas = document.createElement('canvas');
                //设置canvas的大小为要截图区域的6倍
                scaledCanvas.width = dom.offsetWidth * 6;
                scaledCanvas.height = dom.offsetHeight * 6;
                let scaledContext = scaledCanvas.getContext("2d");
                scaledContext.scale(6, 6);
                //设置context位置，值为相对于视窗的偏移量负值，让图片复位
                scaledContext.translate(-rect.left,-rect.top);
                html2canvas(this.$refs['imgSynthesizer'].$el, {
                    canvas : scaledCanvas,
                }).then(canvas => {
                    //关闭抗锯齿
                    let context = canvas.getContext('2d');
                    context.mozImageSmoothingEnabled = false;
                    context.webkitImageSmoothingEnabled = false;
                    context.msImageSmoothingEnabled = false;
                    context.imageSmoothingEnabled = false;
                    this.downloadImageSrc = canvas.toDataURL('image/png');
                    //下载此图片
                    this.downloadImg();
                });
            },
            /**
             *  下载海报
             */
            downloadImg () {
                if (common.whichBrowser() === "IE" || common.whichBrowser() === "Edge") {
                    this.IEdownload();
                } else {
                    this.commonDownload();
                }
            },
            /**
             *  ie下载图片方法
             */
            IEdownload () {
                // 截取base64的数据内容（去掉前面的描述信息，类似这样的一段：data:image/png;base64,）并解码为2进制数据
                let bstr = atob(this.downloadImageSrc.split(',')[1]);
                // 获取解码后的二进制数据的长度，用于后面创建二进制数据容器
                let n = bstr.length;
                // 创建一个Uint8Array类型的数组以存放二进制数据
                let u8arr = new Uint8Array(n);
                // 将二进制数据存入Uint8Array类型的数组中
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                // 创建blob对象
                let blob = new Blob([u8arr]);
                // 调用浏览器的方法，调起IE的下载流程
                window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png');
            },
            /**
             *  通用下载图片方法
             */
            commonDownload () {
                let aLink = document.createElement('a');
                //new Blob([content]);
                let blob = this.base64ToBlob(this.downloadImageSrc);

                let evt = document.createEvent("HTMLEvents");
                //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
                evt.initEvent("click", true, true);
                aLink.download = 'test.png';
                aLink.href = URL.createObjectURL(blob);
                //兼容火狐
                aLink.dispatchEvent(new MouseEvent('click', { bubbles : true, cancelable : true, view : window }));
            },
            /**
             *  base64转blob
             *  @param code
             */
            base64ToBlob (code) {
                let parts = code.split(';base64,');
                let contentType = parts[0].split(':')[1];
                let raw = window.atob(parts[1]);
                let rawLength = raw.length;

                let uInt8Array = new Uint8Array(rawLength);

                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }
                return new Blob([uInt8Array], { type : contentType });
            },
            /**
             *  查询海报列表
             */
            queryPosterList () {
                return new Promise((resolve, reject) => {
                    ajax.post('marketing-posterList', {
                        pageNo : 1,
                        pageSize : 9999,
                    }).then(res => {
                        if (res.success) {
                            this.posterList = res.data ? res.data.data : [];
                            resolve();
                        } else {
                            this.posterList = [];
                            reject();
                        }
                    });
                });
            },
            /**
             * 新增海报
             */
            addPoster () {
                this.$refs.uploadPosterModal.toggle({
                    type : 'show'
                });
            },
            /**
             * 海报被选中时
             * @param post
             */
            posterChosed (post) {
                this.chosedPost = post;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .choose-poster-modal,/deep/ .edit-poster-modal {
        .ivu-modal-body {
            position: relative;
            min-height: 432px;
        }
    }

    .choose-poster-modal {
        .choose-wrapper {
            .box {
                .box-title {
                    margin-bottom: 16px;
                    font-size: 16px;
                    color: #354052;
                    letter-spacing: 1.14px;
                    text-align: left;
                }

                .box-body {
                    margin-bottom: 16px;
                }
            }
        }
    }

    .edit-poster-modal {
        .workspace {
            height: 432px;
            text-align: center;
        }
    }


</style>
