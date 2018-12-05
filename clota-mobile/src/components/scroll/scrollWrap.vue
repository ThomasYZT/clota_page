<!---->

<template>
    <scroll ref="scroll"
            :data="itemData"
            :scrollbar="scrollbarObj"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp">
        <slot>

        </slot>
    </scroll>
</template>

<script>
    import scroll from './scroll';
    import Vue from 'vue';
    export default {
        props : {
            //数据
            'item-data' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                //是否显示滚动条
                scrollbar : false,
                pullDownRefresh : true,
                pullUpLoad : true,
                pullDownRefreshThreshold : 40,
                scrollbarFade : true,
                pullDownRefreshStop : 40,
                pullUpLoadThreshold : 20,
                pullUpLoadMoreTxt : 'pullUpLoadMoreTxt',
                pullUpLoadNoMoreTxt : 'loading',
                startY : 0,
            };
        },
        components : {
            scroll
        },
        methods : {
            /**
             * 下拉刷新
             */
            onPullingDown () {
                this.$emit('pull-down',() => {
                    // 如果没有新数据
                    this.$refs.scroll.forceUpdate();
                });
            },
            /**
             * 上拉刷新
             */
            onPullingUp () {
                this.$emit('pull-up',() => {
                    // 如果没有新数据
                    this.$refs.scroll.forceUpdate();
                });
            },
            /**
             * 重新渲染scroll组件
             */
            rebuildScroll : function () {
                Vue.nextTick(() => {
                    this.$refs.scroll.destroy();
                    this.$refs.scroll.initScroll();
                });
            },
        },
        computed : {
            scrollbarObj : function () {
                return this.scrollbar ? { fade : this.scrollbarFade } : false;
            },
            pullDownRefreshObj : function () {
                return this.pullDownRefresh ? {
                    threshold : parseInt(this.pullDownRefreshThreshold),
                    stop : parseInt(this.pullDownRefreshStop),
                    txt : 'freshComplete'
                } : false;
            },
            pullUpLoadObj : function () {
                return this.pullUpLoad ? {
                    threshold : parseInt(this.pullUpLoadThreshold),
                    txt : { more : 'loading', noMore : 'noMoreData' }
                } : false;
            }
        },
        watch : {
            startY () {
                this.rebuildScroll();
            },
            scrollbarObj : {
                handler () {
                    this.rebuildScroll();
                },
                deep : true
            },
            pullDownRefreshObj : {
                handler (val) {
                    const scroll = this.$refs.scroll.scroll;
                    if (val) {
                        scroll.openPullDown();
                    } else {
                        scroll.closePullDown();
                    }
                },
                deep : true
            },
            pullUpLoadObj : {
                handler (val) {
                    const scroll = this.$refs.scroll.scroll;
                    if (val) {
                        scroll.openPullUp();
                    } else {
                        scroll.closePullUp();
                    }
                },
                deep : true
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
