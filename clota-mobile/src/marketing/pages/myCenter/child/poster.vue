<!--海报设置-->

<template>
    <div class="poster">
        <scroll-wrap :item-data="posterData">
            <template v-for="(item,index) in posterRowData">
                <poster-item :key="index"
                             :data-index="index"
                             :data="item"
                             @show-preview-index="showPrivewImg">
                </poster-item>
            </template>
        </scroll-wrap>
        <!--预览图片-->
        <previewer
            v-transfer-dom
            class="poster-preview"
            :options="options"
            :list="prevList"
            ref="previewer"
            @on-close="downLoadBtnShow = false">
            <!--<template slot="button-before">-->
                <!--<div class="down-load-img"  @click="downLoadImg($event)">-->
                    <!--<span class="iconfont icon-alipay" ></span>-->
                <!--</div>-->
            <!--</template>-->
        </previewer>
        <transition name="fade">
            <div class="down-load-img"
                 v-transfer-dom
                 v-if="downLoadBtnShow"
                 @click="downLoadImg($event)">
                <span class="iconfont icon-alipay" ></span>
            </div>
        </transition>
    </div>
</template>

<script>
    import scrollWrap from '@/components/scroll/scrollWrap';
    import posterItem from './posterComponents/poster-list';
    export default {
        data () {
            return {
                //海报数据
                posterData : [
                    {
                        name : '爱的色放爱的色放爱的色放爱的色放爱的色放',
                        src : require('../../../../assets/images/1levelMember.png'),
                        size : 23
                    },
                    {
                        name : '爱的色',
                        src : require('../../../../assets/images/2levelMember.png'),
                        size : 23
                    },
                    {
                        name : '2',
                        src : require('../../../../assets/images/icon-invalid-url.png'),
                        size : 23
                    },
                    {
                        name : '2',
                        src : require('../../../../assets/images/icon-invalid-url.png'),
                        size : 23
                    },
                    {
                        name : '2',
                        src : require('../../../../assets/images/icon-invalid-url.png'),
                        size : 23
                    },
                    {
                        name : '2',
                        src : require('../../../../assets/images/icon-invalid-url.png'),
                        size : 23
                    },
                    {
                        name : '2',
                        src : require('../../../../assets/images/icon-invalid-url.png'),
                        size : 23
                    },
                    {
                        name : '2',
                        src : require('../../../../assets/images/icon-invalid-url.png'),
                        size : 23
                    },
                    {
                        name : '2',
                        src : require('../../../../assets/images/icon-invalid-url.png'),
                        size : 23
                    }
                ],
                options : {
                    getThumbBoundsFn : (index) => {
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                        let thumbnail = null;
                        let rect = null;
                        thumbnail = this.$el.querySelectorAll('.poster-pic')[index];
                        rect = thumbnail.getBoundingClientRect();
                        return { x : rect.left, y : rect.top + pageYScroll, w : rect.width };
                    }
                },
                //下载按钮是否显示
                downLoadBtnShow : false
            };
        },
        components : {
            scrollWrap,
            posterItem
        },
        methods : {
            /**
             * 显示预览图片
             * @param{Number} index 图片序号
             */
            showPrivewImg (index) {
                this.$nextTick(() =>{
                    this.$refs.previewer.show(index);
                    this.downLoadBtnShow = true;
                });
            },
            /**
             * 下载图片
             */
            downLoadImg () {
                this.$nextTick(() =>{
                    let imgIndex = this.$refs.previewer.getCurrentIndex();
                    window.open(this.prevList[imgIndex]['src']);
                });
            }
        },
        computed : {
            //将海报数据格式化为二维数组
            posterRowData () {
                let result = [];
                for (let i = 0,j = this.posterData.length; i < j; i += 2) {
                    if (this.posterData[i + 1]) {
                        result.push([
                            this.posterData[i],
                            this.posterData[i + 1],
                        ]);
                    } else {
                        result.push([
                            this.posterData[i],
                        ]);
                    }
                }
                return result;
            },
            //预览图片列表
            prevList () {
                let width = document.body.offsetWidth;
                return this.posterData.map(item => {
                    return {
                        src : item.src,
                        w : width,
                    };
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .poster{
        @include block_outline();
        background: $color_fff;
    }
</style>
<style>
    .poster-preview .pswp__bg{
        background: rgba(0,0,0,0.5)!important;
    }
    .down-load-img{
        position: fixed;
        bottom : 20px;
        left: 0;
        right: 0;
        width: 50px;
        height: 50px;
        margin: 0 auto;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
    }

    .down-load-img .iconfont {
        font-size: 25px;
    }
</style>
