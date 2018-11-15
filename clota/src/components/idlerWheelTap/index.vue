<!--滚轮tap切换-->

<template>
    <div class="idler-wheel-tap">
        <div class="before" :class="{hidden : !showLeftNonius}" v-show="noniusShow" :hidden="!showLeftNonius && !showRightNonius">
            <slot name="before" :toLeft="toLeft"></slot>
        </div>
        <div class="scroll-area">
            <div class="navigation" @scroll="scrollEvent">
                <slot></slot>
            </div>
        </div>
        <div class="next" :class="{hidden : !showRightNonius}" v-show="noniusShow" :hidden="!showLeftNonius && !showRightNonius">
            <slot name="next" :toRight="toRight"></slot>
        </div>
    </div>
</template>

<script>
    import { scrollIntoView } from '@/utils/domUtils.js';
    import { mapGetters } from 'vuex';
    import debounce from 'lodash/debounce';

    export default {
        props : {
            //默认跳转到的列表序号
            'default-index' : {
                type : [Number,String],
                default : 0
            }
        },
        data () {
            return {
                //是否显示左侧游标
                showLeftNonius : false,
                //是否显示右侧游标
                showRightNonius : false,
                //列表信息
                itemMenuInfo : [],
                //右边是否显示
                noniusShow : false
            };
        },
        methods : {
            /**
             * 点击左侧按钮，让列表向左滑动一个
             */
            toLeft () {
                let el = this.$el.querySelector('.navigation');
                let rightOffsetCount = 0;
                for (let i = 0,j = this.itemMenuInfo.length; i < j; i++) {
                    if (i === 0) {
                        if (el.scrollLeft > 0 && el.scrollLeft <= this.itemMenuInfo[0]['offsetWidth']) {
                            this.scrollIntoView(el,el.scrollLeft,0,'horizontal');
                            break;
                        }
                    } else {
                        rightOffsetCount += this.itemMenuInfo[i - 1]['offsetWidth'];
                        if (el.scrollLeft > rightOffsetCount && el.scrollLeft <= rightOffsetCount + this.itemMenuInfo[i]['offsetWidth']) {
                            this.scrollIntoView(el,el.scrollLeft,rightOffsetCount,'horizontal');
                            break;
                        }
                    }
                }
                this.showRightNonius = (el.scrollLeft + el.offsetWidth === el.scrollWidth);
            },
            /**
             * 点击右侧按钮，让列表向右滑动一个
             */
            toRight () {
                let el = this.$el.querySelector('.navigation');
                let rightOffsetCount = 0;
                for (let i = 0,j = this.itemMenuInfo.length; i < j; i++) {
                    rightOffsetCount += this.itemMenuInfo[i]['offsetWidth'];
                    if (el.scrollLeft < rightOffsetCount) {
                        this.scrollIntoView(el,el.scrollLeft,rightOffsetCount,'horizontal');
                        break;
                    }
                }
                this.showLeftNonius = el.scrollLeft > 0;
            },
            /**
             * 注册滚轮滚动事件
             */
            registerMouseWheelEvent () {
                this.$nextTick(() =>{
                    let el = this.$el.querySelector('.navigation');
                    let _this = this;
                    el.onmousewheel = function (event) {
                        //禁止事件默认行为（此处禁止鼠标滚轮行为关联到"屏幕滚动条上下移动"行为）
                        event.preventDefault();
                        //设置鼠标滚轮滚动时屏幕滚动条的移动步长
                        let step = 100;
                        if (event.deltaY < 0) {
                            //向上滚动鼠标滚轮，屏幕滚动条左移
                            _this.scrollIntoView(el,this.scrollLeft,this.scrollLeft - step,'horizontal');
                        } else {
                            //向下滚动鼠标滚轮，屏幕滚动条右移
                            _this.scrollIntoView(el,this.scrollLeft,this.scrollLeft + step,'horizontal');
                        }
                    };
                });
            },
            //滚动条带效果的滚动
            scrollIntoView : scrollIntoView,
            /**
             * 注册区域滚动事件
             * @param e
             */
            scrollEvent (e) {
                let scrollLeft = e.target.scrollLeft;
                let offsetWidth = e.target.offsetWidth;
                let scrollWidth = e.target.scrollWidth;
                this.showRightNonius = !(scrollLeft + offsetWidth === scrollWidth);
                this.showLeftNonius = (scrollLeft !== 0);
            },
            /**
             * 初始化列表元素信息
             */
            initOneLevelMenuInfo () {
                this.$nextTick(() => {
                    let el = this.$el.querySelector('.navigation');
                    let menuItem = el.childNodes;
                    this.showRightNonius = el.scrollWidth > el.offsetWidth;
                    for (let i = 0,j = menuItem.length; i < j; i++) {
                        this.itemMenuInfo.push(menuItem[i]);
                    }
                    this.toIndexItem(this.defaultIndex);
                });
            },
            /**
             * 注册监听页面缩放事件
             */
            registerWindowResize () {
                window.addEventListener('resize',this.noniusDeal);
            },
            /**
             * 页面缩放的时候处理左右游标的问题
             */
            noniusDeal () {
                let el = this.$el.querySelector('.navigation');
                let scrollLeft = el.scrollLeft;
                let offsetWidth = el.offsetWidth;
                let scrollWidth = el.scrollWidth;
                if (offsetWidth !== scrollWidth) {
                    this.showRightNonius = !(scrollLeft + offsetWidth === scrollWidth);
                } else {
                    this.showRightNonius = false;
                }
                this.showLeftNonius = (scrollLeft !== 0);
                this.noniusShow = true;
            },
            /**
             * 取消页面注册事件
             */
            offWindowResize () {
                window.removeEventListener('resize',this.noniusDeal);
            },
            /**
             * 跳转到特定的某个列表
             * @param index
             * @param duration 动画持续时间
             */
            toIndexItem (index,duration = 500) {
                let el = this.$el.querySelector('.navigation');
                let offsetLeft = 0;
                if ( index === 0) {
                    this.scrollIntoView(el,el.scrollLeft,0,'horizontal',duration);
                } else {
                    for (let i = 0,j = index - 1; i <= j; i++) {
                        offsetLeft += this.itemMenuInfo[i]['offsetWidth'];
                    }
                    if (duration > 0) {
                        this.scrollIntoView(el,el.scrollLeft,offsetLeft,'horizontal',duration);
                    } else {
                        el.scrollLeft = offsetLeft;
                    }
                }
            },
            /**
             * 重置位置
             */
            resetPosition () {}
        },
        mounted () {
            this.registerMouseWheelEvent();
            this.initOneLevelMenuInfo();
            this.registerWindowResize();
            this.$nextTick(() => {
                this.noniusDeal();
            });
            this.resetPosition = debounce(() => {
                this.$nextTick(() => {
                    this.noniusDeal();
                });
            },300);
        },
        beforeDestroy () {
            this.offWindowResize();
        },
        watch : {
            defaultIndex (newVal) {
                this.$nextTick(() => {
                    this.toIndexItem(newVal,0);
                });
            },
            lang () {
                this.$nextTick(() => {
                    this.noniusDeal();
                });
            }
        },
        computed : {
            ...mapGetters({
                lang : 'lang'
            })
        },
        updated () {
            this.resetPosition();
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .idler-wheel-tap{
        display: flex;
        flex-direction: row;
        @include block_outline();

        .before,
        .next{

            &.hidden{
                visibility: collapse;
            }
        }

        .scroll-area {
            position: relative;
            flex: 1;

            .navigation {
                width: 100%;
                white-space: nowrap;
                overflow-x: auto;
                overflow-y: hidden;
                height: calc(100% + 20px);
                position: absolute;

                .sub-menu {
                    display: inline-block;
                    @include block_outline(auto);
                    font-size: $font_size_16px;
                    color: rgba($color_fff, 0.6);
                    line-height: 54px;
                    /*margin: 0 20px;*/
                    cursor: pointer;
                    transition: color 0.3s;
                    padding-right: 20px;
                    padding-left: 20px;

                    &:hover{
                        color: $color_fff;
                        transition: color 0.3s;
                    }

                    .bar {
                        display: none;
                    }

                    &.active {
                        color: $color_fff;
                        position: relative;

                        .bar {
                            display: inline-block;
                            @include block_outline($width : unquote('calc(100% - 40px)'),$height: 4px);
                            border-radius: 2px;
                            background: $color_fff;
                            @include absolute_pos(absolute, $top: 46px, $left: 20px);
                        }
                    }

                    &:nth-of-type(1) {
                        margin-left: 0;
                    }
                }
            }
        }
    }
</style>
