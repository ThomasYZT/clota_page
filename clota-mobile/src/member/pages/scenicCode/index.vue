<!--
    入园二维码
    作者：杨泽涛
-->
<template>
    <div class="scenic-code">
        <div class="code-area">
            <qrcode ref="qrCode"
                    class="qr-code"
                    :value="cardInfo.inCode"
                    type="img"
                    @click.native="showPreImage"></qrcode>

            <barcode
                class="barcode"
                ref="barcode"
                tag="img"
                :value="cardInfo.inCode"
                :options="{ displayValue : true }"
                @click.native="pre1CodeImage">
            </barcode>
        </div>

        <!--预览图片-->
        <div v-transfer-dom
             class="img-preview"
             :class="{'img-pre-rotate' : preRotate}">
            <previewer
                :options="options"
                :list="prevList"
                ref="previewer">
            </previewer>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        components : {},
        data () {
            return {
                //预览图片列表
                prevList : [],
                //预览图片是否旋转
                preRotate : false,
                options : {
                    getThumbBoundsFn : index => {
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                        let thumbnail = null;
                        let rect = null;
                        if (index === 0) {
                            thumbnail = this.$refs.barcode.$el;
                        } else if (index === 1) {
                            thumbnail = this.$refs.qrCode.$el;
                        }
                        rect = thumbnail.getBoundingClientRect();
                        return { x : rect.left, y : rect.top + pageYScroll, w : rect.width };
                    }
                }
            };
        },
        computed : {
            ...mapGetters([
                'cardInfo'
            ])
        },
        methods : {
            /**
             * 显示预览一维码
             */
            pre1CodeImage () {
                this.preRotate = true;
                this.prevList = [
                    {
                        src : this.$refs.barcode.$el.src,
                        w : 600,
                        h : 300
                    }
                ];
                this.$nextTick(() =>{
                    this.$refs.previewer.show(0);
                });
            },
            /**
             * 显示预览二维码
             */
            showPreImage () {
                this.prevList = [
                    {
                        src : this.$refs.qrCode.imgData,
                        w : 240,
                        h : 240
                    }
                ];
                this.$nextTick(() =>{
                    this.$refs.previewer.show(0);
                });
            },
            /**
             * 设置标题
             */
            setTitle () {
                document.title = this.cardInfo.levelDesc + this.$t('enterSenicCode');
            },
        },
        created () {
            this.setTitle();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .scenic-code {
        height: 100%;
        background-color: $color_blue;
        padding-top: 50px;

        .code-area {
            width: 80%;
            padding: 20px;
            margin: 0 auto;
            text-align: center;
            background-color: white;
            /deep/ img {
                width: 150px !important;
                height: 150px !important;
            }

            .barcode {
                margin-top: 30px;
                width: 100% !important;
                height: 100px !important;
            }
        }
    }

    .img-pre-rotate {
        /deep/ .pswp__img {
            transform: rotate(90deg) !important;
            padding: 20px !important;
        }
    }


</style>
