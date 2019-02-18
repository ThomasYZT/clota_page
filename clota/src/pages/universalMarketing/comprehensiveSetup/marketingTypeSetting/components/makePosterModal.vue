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
               :title="$t('选择海报底图：')"
               @on-cancel="choosePosterHide"
               :mask-closable="false">
            <div class="choose-wrapper">
                <div class="box">
                    <div class="box-title">方式1：从已上传的海报图片中选择</div>
                    <div class="box-body">
                        <posterSelection :poster-list="posterList"
                                         @posterChosed="posterChosed"></posterSelection>
                    </div>
                </div>
                <div class="box">
                    <div class="box-title">方式2：</div>
                    <div class="box-body">
                        <Button type="primary" class="ivu-btn-90px"
                                @click="addPoster">{{$t('上传海报')}}</Button>
                    </div>
                </div>
            </div>

            <div slot="footer">
                <Button class="ivu-btn-90px" type="primary" @click="nextStep">{{$t('下一步')}}</Button>
                <Button class="ivu-btn-90px" type="default" @click="choosePosterHide">{{$t('cancel')}}</Button>
            </div>
        </Modal>
        <Modal v-model="editPosterVisible"
               class-name="vertical-center-modal edit-poster-modal"
               transfer
               width="1000"
               :title="$t('编辑海报：')"
               @on-cancel="editPosterHide"
               :mask-closable="false">
                <div class="workspace">
                    <!--<img class="" :src="chosedPost.posterUrl">-->
                    <imgSynthesizer v-if="editPosterVisible"
                                    ref="imgSynthesizer"
                                    :chosedPost="chosedPost"
                                    :src64="src64"
                                    :codeUrl="codeUrl"></imgSynthesizer>
                    <!--<img :src="src64" width="100%" alt="">-->
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
    import Canvas2Image from 'canvas2image';
    require('../../../../../utils/html2canvas');
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
                            this.$t('海报底图获取失败');
                        }
                    });
                    this.editPosterVisible = true;
                } else {
                    this.$Message.warning(this.$t('请选择海报底图'));
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
                this.src64 = "";
                this.editPosterVisible = false;
            },
            /**
             * 保存并下载制作好的海报
             */
            save () {
                const dom = this.$refs['imgSynthesizer'].$el;
                const scale = 1.5;
                // let _canvas = document.createElement('canvas');
                // let context = _canvas.getContext('2d');
                // context.mozImageSmoothingEnabled = false;
                // context.webkitImageSmoothingEnabled = false;
                // context.msImageSmoothingEnabled = false;
                // context.imageSmoothingEnabled = false;
                html2canvas(this.$refs['imgSynthesizer'].$el, {
                    scale,
                    width : dom.offsetWidth * scale,
                    height : dom.offsetHeight * scale,
                    onrendered : (canvas) => {
                        this.src64 = canvas.toDataURL('image/png');
                        console.log(this.src64)
                        //Canvas2Image.saveAsPNG(canvas, dom.offsetWidth * scale, dom.offsetHeight * scale);
                        //下载此图片
                        let aLink = document.createElement('a');
                        aLink.href = this.src64;
                        aLink.download = 'test.png';
                        aLink.click();
                    }
                });
                // let url = _canvas.toDataURL("image/png");//PNG格式

                // let aLink = document.createElement('a');
                // aLink.href = url;
                // aLink.download = 'test.png';
                // aLink.click();

                this.choosePosterHide();
                this.editPosterHide();
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
