<!--滚轮tap切换-->

<template>
    <div class="idler-wheel-tap">
        <div class="before" :class="{hidden : !showLeftNonius}">
            <slot name="before" :toLeft="toLeft"></slot>
        </div>
        <div class="scroll-area">
            <div class="navigation" @scroll="scrollEvent">
                <slot></slot>
            </div>
        </div>
        <div class="next" :class="{hidden : !showRightNonius}">
            <slot name="next" :toRight="toRight"></slot>
        </div>
    </div>
</template>

<script>
    import {scrollIntoView} from '@/utils/domUtils.js';
    export default {
        data() {
            return {
                //是否显示左侧游标
                showLeftNonius : false,
                //是否显示右侧游标
                showRightNonius : false,
                //列表信息
                itemMenuInfo : [],
            }
        },
        methods: {
            /**
             * 点击左侧按钮，让列表向左滑动一个
             */
            toLeft () {
                let el = this.$el.querySelector('.navigation');
                let rightOffsetCount = 0;
                for(let i = 0,j = this.itemMenuInfo.length;i < j;i++){
                    if(i === 0){
                        if(el.scrollLeft > 0 && el.scrollLeft <= this.itemMenuInfo[0]['offsetWidth']){
                            this.scrollIntoView(el,el.scrollLeft,0,'vertical');
                            break;
                        }
                    }else{
                        rightOffsetCount += this.itemMenuInfo[i - 1]['offsetWidth'];
                        if(el.scrollLeft > rightOffsetCount && el.scrollLeft <= rightOffsetCount + this.itemMenuInfo[i]['offsetWidth']){
                            this.scrollIntoView(el,el.scrollLeft,rightOffsetCount,'vertical');
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
                for(let i = 0,j = this.itemMenuInfo.length;i < j;i++){
                    rightOffsetCount += this.itemMenuInfo[i]['offsetWidth'];
                    if(el.scrollLeft < rightOffsetCount){
                        this.scrollIntoView(el,el.scrollLeft,rightOffsetCount,'vertical');
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
                    el.onmousewheel = function(event) {
                        //禁止事件默认行为（此处禁止鼠标滚轮行为关联到"屏幕滚动条上下移动"行为）
                        event.preventDefault();
                        //设置鼠标滚轮滚动时屏幕滚动条的移动步长
                        let step = 100;
                        if (event.deltaY < 0) {
                            //向上滚动鼠标滚轮，屏幕滚动条左移
                            _this.scrollIntoView(el,this.scrollLeft,this.scrollLeft - step,'vertical');
                        } else {
                            //向下滚动鼠标滚轮，屏幕滚动条右移
                            _this.scrollIntoView(el,this.scrollLeft,this.scrollLeft + step,'vertical');
                        }
                    }
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
                    for(let i = 0,j = menuItem.length;i < j;i++){
                        this.itemMenuInfo.push(menuItem[i]);
                    }
                });
            },
            /**
             * 注册监听页面缩放事件
             */
            registerWindowResize () {
                window.addEventListener('resize',this.noniusDeal)
            },
            /**
             * 页面缩放的时候处理左右游标的问题
             */
            noniusDeal () {
                let el = this.$el.querySelector('.navigation');
                let scrollLeft = el.scrollLeft;
                let offsetWidth = el.offsetWidth;
                let scrollWidth = el.scrollWidth;
                this.showRightNonius = !(scrollLeft + offsetWidth === scrollWidth);
                this.showLeftNonius = (scrollLeft !== 0);
            },
            /**
             * 取消页面注册事件
             */
            offWindowResize() {
                window.removeEventListener('resize',this.noniusDeal);
            }
        },
        mounted () {
            this.registerMouseWheelEvent();
            this.initOneLevelMenuInfo();
            this.registerWindowResize();
        },
        beforeDestroy() {
            this.offWindowResize();
        }
    }
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
                height: 70px;
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
