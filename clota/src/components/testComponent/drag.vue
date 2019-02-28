<!--拖拽组件-->

<template>
    <div class="drag-label"
         @mousedown="down($event)"
         @mousemove="move($event)"
         @mouseup="end">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //开始拖拽标志
                startDrag : false,
                //初始化位置
                defaultPosition : {
                    x : 0,
                    y : 0
                },
                dx : '',
                dy : '',
                nx : '',
                ny : '',
                xPum : '',
                yPum : ''
            };
        },
        methods : {
            /**
             * 按下元素
             * @param e
             */
            down (e) {
                let touch = null;
                if (e.touches) {
                    touch = e.touches[0];
                } else {
                    touch = e;
                }
                this.startDrag = true;
                this.defaultPosition.x = touch.clientX;
                this.defaultPosition.y = touch.clientY;
                this.dx = this.$el.offsetLeft;
                this.dy = this.$el.offsetTop;
                document.addEventListener("touchmove",this.documentMoveEvent, false);
            },
            /**
             * 开始拖动
             * @param e
             */
            move (e) {
                if (!this.startDrag) return;
                // e.preventDefault();
                let touch = null;
                if (e.touches) {
                    touch = e.touches[0];
                } else {
                    touch = e;
                }
                this.nx = touch.clientX - this.defaultPosition.x;
                this.ny = touch.clientY - this.defaultPosition.y;
                this.xPum = this.dx + this.nx;
                this.yPum = this.dy + this.ny;
                if (this.xPum > 0 && this.xPum < document.body.offsetWidth - 40) {
                    this.$el.style.left = this.xPum + "px";
                }
                if (this.yPum > 0 && this.yPum < document.body.offsetHeight - 40) {
                    this.$el.style.top = this.yPum + "px";
                }
            },
            /**
             * 拖拽结束
             */
            end () {
                this.startDrag = false;
                document.removeEventListener("touchmove",this.documentMoveEvent, false);
            },
            /**
             * 阻止页面滑动默认事件
             */
            documentMoveEvent (e) {
                e.preventDefault();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .drag-label{
        position: absolute;
    }
</style>
