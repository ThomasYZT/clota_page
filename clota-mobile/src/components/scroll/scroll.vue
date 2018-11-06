<!--
    scroll组件
    作者：杨泽涛
-->
<template>
    <div class="flex-box">
        <div class="scroll">
            <div ref="wrapper" class="list-wrapper">
                <div class="scroll-content">
                    <div ref="listWrapper">
                        <slot>
                            <ul class="list-content">
                                <li @click="clickItem($event,item)" class="list-item" v-for="item in data">{{item}}</li>
                            </ul>
                        </slot>
                    </div>
                    <slot name="pullup"
                          :pullUpLoad="pullUpLoad"
                          :isPullUpLoad="isPullUpLoad"
                    >
                        <div class="pullup-wrapper" v-if="pullUpLoad && updating">
                            <div class="before-trigger" v-if="!isPullUpLoad">
                                <span>{{$t(pullUpTxt)}}</span>
                            </div>
                            <div class="after-trigger" v-else>
                                <loading></loading>
                            </div>
                        </div>
                    </slot>
                </div>
                <slot name="pulldown"
                      :pullDownRefresh="pullDownRefresh"
                      :pullDownStyle="pullDownStyle"
                      :beforePullDown="beforePullDown"
                      :isPullingDown="isPullingDown"
                      :bubbleY="bubbleY"
                >
                    <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
                        <div class="before-trigger" v-if="beforePullDown">
                            <bubble :y="bubbleY"></bubble>
                        </div>
                        <div class="after-trigger" v-else>
                            <div v-if="isPullingDown" class="loading">
                                <loading></loading>
                            </div>
                            <div v-else><span>{{refreshTxt}}</span></div>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import Loading from './loading/loading.vue';
    import Bubble from './bubble/bubble.vue';
    import common from '../../assets/js/common';

    const COMPONENT_NAME = 'scroll';
    const DIRECTION_H = 'horizontal';
    const DIRECTION_V = 'vertical';

    export default {
        name : COMPONENT_NAME,
        props : {
            //scroll数据
            data : {
                type : Array,
                default : function () {
                    return [];
                }
            },
            //实时坐标出发时机，基本用不到
            probeType : {
                type : Number,
                default : 1
            },
            click : {
                type : Boolean,
                default : true
            },
            listenScroll : {
                type : Boolean,
                default : false
            },
            listenBeforeScroll : {
                type : Boolean,
                default : false
            },
            listenScrollEnd : {
                type : Boolean,
                default : false
            },
            direction : {
                type : String,
                default : DIRECTION_V
            },
            //滚动条配置
            scrollbar : {
                type : null,
                default : false
            },
            //下拉刷新配置
            pullDownRefresh : {
                type : null,
                default : false
            },
            //上拉加载配置
            pullUpLoad : {
                type : null,
                default : false
            },
            startY : {
                type : Number,
                default : 0
            },
            //刷新延迟
            refreshDelay : {
                type : Number,
                default : 20
            },
            freeScroll : {
                type : Boolean,
                default : false
            },
            mouseWheel : {
                type : Boolean,
                default : false
            },
            bounce : {
                default : true
            },
            zoom : {
                default : false
            }
        },
        data () {
            return {
                beforePullDown : true,
                isRebounding : false,
                isPullingDown : false,
                isPullUpLoad : false,
                pullUpDirty : true,
                pullDownStyle : '',
                bubbleY : 0,
                //是否更新中
                updating : false
            };
        },
        computed : {
            pullUpTxt () {
                const moreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) || '加载中';

                const noMoreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore) || '无更多数据';

                return this.pullUpDirty ? moreTxt : noMoreTxt;
            },
            refreshTxt () {
                return (this.pullDownRefresh && this.pullDownRefresh.txt) || '刷新中';
            }
        },
        created () {
            this.pullDownInitTop = -50;
        },
        mounted () {
            setTimeout(() => {
                this.initScroll();
            }, 20);
        },
        destroyed () {
            this.$refs.scroll && this.$refs.scroll.destroy();
        },
        methods : {
            /**
             * 初始化scroll组件
             */
            initScroll () {
                if (!this.$refs.wrapper) {
                    return;
                }
                if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
                    this.$refs.listWrapper.style.minHeight = `${common.getRect(this.$refs.wrapper).height + 1}px`;
                }

                let options = {
                    probeType : this.probeType,
                    click : this.click,
                    scrollY : this.freeScroll || this.direction === DIRECTION_V,
                    scrollX : this.freeScroll || this.direction === DIRECTION_H,
                    scrollbar : this.scrollbar,
                    pullDownRefresh : this.pullDownRefresh,
                    pullUpLoad : this.pullUpLoad,
                    startY : this.startY,
                    freeScroll : this.freeScroll,
                    mouseWheel : this.mouseWheel,
                    bounce : this.bounce,
                    zoom : this.zoom
                };

                this.scroll = new BScroll(this.$refs.wrapper, options);

                if (this.listenScroll) {
                    this.scroll.on('scroll', (pos) => {
                        this.$emit('scroll', pos);
                    });
                }

                if (this.listenScrollEnd) {
                    this.scroll.on('scrollEnd', (pos) => {
                        this.$emit('scroll-end', pos);
                    });
                }

                if (this.listenBeforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScrollStart');
                    });

                    this.scroll.on('scrollStart', () => {
                        this.$emit('scroll-start');
                    });
                }

                if (this.pullDownRefresh) {
                    this._initPullDownRefresh();
                }

                if (this.pullUpLoad) {
                    this._initPullUpLoad();
                }
            },
            disable () {
                this.scroll && this.scroll.disable();
            },
            enable () {
                this.scroll && this.scroll.enable();
            },
            refresh () {
                this.scroll && this.scroll.refresh();
            },
            scrollTo () {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
            },
            scrollToElement () {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
            },
            clickItem (e, item) {
                console.log(e);
                this.$emit('click', item);
            },
            destroy () {
                this.scroll.destroy();
            },
            forceUpdate (dirty) {
                if (this.pullDownRefresh && this.isPullingDown) {
                    this.isPullingDown = false;
                    this._reboundPullDown().then(() => {
                        this._afterPullDown();
                    });
                } else if (this.pullUpLoad && this.isPullUpLoad) {
                    this.isPullUpLoad = false;
                    this.scroll.finishPullUp();
                    this.pullUpDirty = dirty;
                    setTimeout(() => {
                        this.updating = false;
                    }, 1000);
                    this.refresh();
                } else {
                    this.refresh();
                }
            },
            _initPullDownRefresh () {
                this.scroll.on('pullingDown', () => {
                    this.beforePullDown = false;
                    this.isPullingDown = true;
                    this.$emit('pullingDown');
                });

                this.scroll.on('scroll', (pos) => {
                    if (!this.pullDownRefresh) {
                        return;
                    }
                    if (this.beforePullDown) {
                        this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
                        this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`;
                    } else {
                        this.bubbleY = 0;
                    }

                    if (this.isRebounding) {
                        this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`;
                    }
                });
            },
            _initPullUpLoad () {
                this.scroll.on('pullingUp', () => {
                    this.isPullUpLoad = true;
                    this.updating = true;
                    this.$emit('pullingUp');
                });
            },
            _reboundPullDown () {
                const { stopTime = 600 } = this.pullDownRefresh;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.isRebounding = true;
                        this.scroll.finishPullDown();
                        resolve();
                    }, stopTime);
                });
            },
            _afterPullDown () {
                setTimeout(() => {
                    this.pullDownStyle = `top:${this.pullDownInitTop}px`;
                    this.beforePullDown = true;
                    this.isRebounding = false;
                    this.refresh();
                }, this.scroll.options.bounceTime);
            }
        },
        watch : {
            data () {
                setTimeout(() => {
                    this.forceUpdate(true);
                }, this.refreshDelay);
            }
        },
        components : {
            Loading,
            Bubble
        }
    };
</script>

<style lang="scss" scoped>

    .flex-box {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 20;
        top: 0;
        bottom: 0;
        left: 0;
        background: #fff;

        .scroll {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            -webkit-overflow-scrolling: touch;
            overflow: auto;

                .list-wrapper {
                    width: 100%;
                    height: 100%;
                    flex: 1 1;
                    flex-wrap: wrap;
                    overflow: auto;
                    border: 1px solid rgba(0, 0, 0, .1);
                    border-radius: 1px;
                    transform: rotate(0deg);// fix 子元素超出边框圆角部分不隐藏的问题
                    background: #F4F6F9;

                    .scroll-content {
                        position: relative;
                        z-index: 1;
                    }

                    .list-content {
                        position: relative;
                        z-index: 10;
                        background: #fff;
                    }

                    .list-item {
                        height: 60px;
                        line-height: 60px;
                        font-size: 18px;
                        padding-left: 20px;
                        border-bottom: 1px solid #e5e5e5;
                    }

                    .pulldown-wrapper {
                        position: absolute;
                        width: 100%;
                        left: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: all;
                        .after-trigger {
                            margin-top: 10px
                        }

                    }

                    .pullup-wrapper {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 16px 0
                    }
                }

            }
    }
</style>

