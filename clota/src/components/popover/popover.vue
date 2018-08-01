<template>
  <transition name="w-popover">
    <div class="w-popover"
         :style="style"
         :data-transfer="transfer"
         v-show="visible"
         v-transfer-dom
         @mousedown.stop=""
         @mouseenter="onMouseenter"
         @mouseleave="onMouseleave">
      <div class="arrow"
           :class="{
                    left: (realDir === 'left'),
                    right: (realDir === 'right'),
                    top: (realDir === 'top'),
                    bottom: (realDir === 'bottom')
                }"
           :style="arrowStyle"></div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  import dom from './domUtils.js';

  export default {
    name: 'WPopover',
    props: {
      // 必填，挂载dom元素对象 {object}
      el: null,
      // 可选，默认显示位置 {string} 'left'、'right'、'top'、'bottom'，默认：'right'
      placement: {
        type: String,
        default: 'right'
      },
      // 可选，对齐方式 {string} placement为'left'、'right'时，可选'top' 'bottom'，placement为'top'、'bottom'时，可选 'left' 'right'，默认：居中显示
      align: {
        type: String,
        default: ''
      },
      // 可选，最终调整偏移 {object} 例如：{left: -8, top: 8}，默认：{}
      offset: {
        type: Object,
        default: () => {}
      },
      // 可选，是否将弹层放置在 body 内，如果设置了false，则需要放置在需要跟随的滚动元素内部 {boolean} 默认：true
      transfer: {
        type: Boolean,
        default: true
      },
      // 可选，是否需要采用其它的触发方式，目前指提供'hover'，其它情况需要手动触发显示隐藏，'hover'：hover时自动显示，无需手动调用显示和隐藏
      trigger: {
        type: String,
        default: 'click'
      },
      // 可选，是否需要自适应位置，默认：true
      adaptive: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        // 可见
        visible: false,
        // 样式
        style: null,
        // 箭头样式
        arrowStyle: null,
        // 真实显示出来后弹窗的实际方向 top bottom left right
        realDir: '',
        // 定位后微调的距离
        adjustPx: 8,
        // hover定时器
        hoverTimer: null
      }
    },
    computed: {
      // 显示方位，'hor'（水平位置上显示，左或右），'ver'（垂直位置上显示，上或下）
      dir() {
        return 'top,bottom'.includes(this.placement) ? 'ver' : 'hor';
      }
    },
    watch: {
      el(el) {
        this.initEvents();
      }
    },
    methods: {
      onMouseenter() {
        if (this.trigger === 'hover') {
          clearTimeout(this.hoverTimer);
        }
      },
      onMouseleave() {
        if (this.trigger === 'hover') {
          this.hoverTimer = setTimeout(() => {
            this.hide();
          }, 200);
        }
      },
      show() {
        this.$emit('show-before')
        this.visible = true
        this.setPos()
        this.$emit('show-after')
      },
      hide() {
        if (!this.visible) return;

        this.$emit('hide-before')
        this.visible = false
        this.$emit('hide-after')
      },
      setPos() {
        if (!this.visible) return;

        this.$nextTick(() => {
          switch (this.dir) {
            case 'hor':
              this.setHorPos();
              break
            case 'ver':
              this.setVerPos();
              break
          }
        });
      },
      setVerPos() {
        // 获取挂载元素信息
        const mountEl = this.el;
        const mountElRc = mountEl.getBoundingClientRect();
        const popoverEl = this.$el;

        let style = {};

        let left = null
        let top = this.offset && this.offset.top ? this.offset.top : 0 // 判断偏移

        // 获取dropdown的定位祖先元素
        let posParentEl = this.transfer ? null : dom.getHasPosParentEl(popoverEl)
        let posParentElRc = this.transfer ? null : posParentEl.getBoundingClientRect()

        // 统一触发器元素相对位置变量
        const relativeTop = this.transfer ? mountElRc.top : (mountElRc.top - posParentElRc.top + Math.abs(posParentEl.scrollTop))
        const relativeLeft = this.transfer ? mountElRc.left : (mountElRc.left - posParentElRc.left + Math.abs(posParentEl.scrollLeft))
        const relativeRight = this.transfer ? mountElRc.right : (relativeLeft + mountElRc.width)
        const relativeBottom = this.transfer ? mountElRc.bottom : (relativeTop + mountElRc.height)

        // 统一容器宽高变量
        const containerWidth = this.transfer ? window.innerWidth : posParentEl.scrollWidth
        const containerHeight = this.transfer ? window.innerHeight : posParentEl.scrollHeight

        // 如果默认定位在右方，则在垂直方向显示时显示在下方
        if (this.placement === 'bottom') {
          top += (relativeBottom + this.adjustPx)
          this.realDir = 'bottom'

          // 上下出界判断(需要自适应才调整)
          if (this.adaptive && top + popoverEl.offsetHeight > containerHeight) {
            top = relativeTop - this.adjustPx - popoverEl.offsetHeight
            this.realDir = 'top'
          }
        } else {
          top += (relativeTop - this.adjustPx - popoverEl.offsetHeight)
          this.realDir = 'top'

          // 上下出界判断(需要自适应才调整)
          if (this.adaptive && top < 0) {
            top = relativeBottom + this.adjustPx
            this.realDir = 'bottom'
          }
        }

        // 如果存在对齐方式则按对齐方式对齐
        if (this.align) {
          switch (this.align) {
            case 'left':
              left = relativeLeft
              break
            case 'right':
              left = relativeRight - popoverEl.offsetWidth
              break
          }
        } else {
          left = relativeLeft + mountElRc.width / 2 - popoverEl.offsetWidth / 2
        }

        // 偏移调整
        if (this.offset && this.offset.left) {
          left += this.offset.left;
        }

        // 左右出界判断
        if (this.adaptive) {
          if (left < 0) {
            left = 10
          } else if (left + popoverEl.offsetWidth > containerWidth) {
            left = containerWidth - popoverEl.offsetWidth - 10
          }
        }

        // 定位箭头
        let arrowLeft = relativeLeft + mountElRc.width / 2 - left - 8

        // 箭头出界判断
        if (arrowLeft < 0) {
          arrowLeft = 8
        } else if (arrowLeft > popoverEl.offsetWidth - 16) {
          arrowLeft = popoverEl.offsetWidth - 24
        }

        switch (this.realDir) {
          case 'top':
            this.arrowStyle = {
              bottom: `${-16}px`,
              left: `${arrowLeft}px`
            }
            break
          case 'bottom':
            this.arrowStyle = {
              top: `${-16}px`,
              left: `${arrowLeft}px`
            }
            break
        }

        style.left = left + 'px'
        style.top = top + 'px'

        this.style = style
      },
      setHorPos() {
        // 获取挂载元素信息
        const mountEl = this.el
        const mountElRc = mountEl.getBoundingClientRect()
        const popoverEl = this.$el

        let style = {}

        let left = this.offset && this.offset.left ? this.offset.left : 0 // 判断偏移
        let top = null

        // 获取dropdown的定位祖先元素
        let posParentEl = this.transfer ? null : dom.getHasPosParentEl(popoverEl)
        let posParentElRc = this.transfer ? null : posParentEl.getBoundingClientRect()

        // 统一触发器元素相对位置变量
        const relativeTop = this.transfer ? mountElRc.top : (mountElRc.top - posParentElRc.top + Math.abs(posParentEl.scrollTop))
        const relativeLeft = this.transfer ? mountElRc.left : (mountElRc.left - posParentElRc.left + Math.abs(posParentEl.scrollLeft))
        const relativeRight = this.transfer ? mountElRc.right : (relativeLeft + mountElRc.width)
        const relativeBottom = this.transfer ? mountElRc.bottom : (relativeTop + mountElRc.height)

        // 统一容器宽高变量
        const containerWidth = this.transfer ? window.innerWidth : posParentEl.scrollWidth
        const containerHeight = this.transfer ? window.innerHeight : posParentEl.scrollHeight

        // 如果默认定位在右方
        if (this.placement === 'right') {
          left += (relativeRight + this.adjustPx)
          this.realDir = 'right'

          // 左右出界判断
          if (this.adaptive && left + popoverEl.offsetWidth > containerWidth) {
            left = relativeLeft - this.adjustPx - popoverEl.offsetWidth
            this.realDir = 'left'
          }
        } else {
          left += (relativeLeft - this.adjustPx - popoverEl.offsetWidth)
          this.realDir = 'left'

          // 左右出界判断
          if (this.adaptive && left < 0) {
            left = relativeRight + this.adjustPx
            this.realDir = 'right'
          }
        }

        // 如果存在对齐方式则按对齐方式对齐
        if (this.align) {
          switch (this.align) {
            case 'top':
              top = relativeTop
              break
            case 'bottom':
              top = relativeBottom - popoverEl.offsetHeight
              break
          }
        } else {
          top = relativeTop + mountElRc.height / 2 - popoverEl.offsetHeight / 2
        }

        // 偏移调整
        if (this.offset && this.offset.top) {
          top += this.offset.top;
        }

        // 上下出界判断
        if (this.adaptive) {
          if (top < 0) {
            top = 10
          } else if (top + popoverEl.offsetHeight > containerHeight) {
            top = containerHeight - popoverEl.offsetHeight - 10
          }
        }

        // 定位箭头
        let arrowTop = relativeTop + mountElRc.height / 2 - top - 8

        // 箭头出界判断
        if (arrowTop < 0) {
          arrowTop = 8
        } else if (arrowTop > popoverEl.offsetHeight - 16) {
          arrowTop = popoverEl.offsetHeight - 24
        }

        switch (this.realDir) {
          case 'left':
            this.arrowStyle = {
              right: `${-16}px`,
              top: `${arrowTop}px`
            }
            break
          case 'right':
            this.arrowStyle = {
              left: `${-16}px`,
              top: `${arrowTop}px`
            }
            break
        }

        style.left = left + 'px'
        style.top = top + 'px'

        this.style = style
      },
      initEvents() {
        if (this.el) {
          // 如果是 hover 方式触发popover
          if (this.trigger === 'hover') {
            this.el.onmouseenter = (ev) => {
              clearTimeout(this.hoverTimer);
              this.hoverTimer = setTimeout(() => {
                this.show();
              }, 200);
            };

            this.el.onmouseleave = (ev) => {
              clearTimeout(this.hoverTimer);
              this.hoverTimer = setTimeout(() => {
                this.hide();
              }, 200);
            };
          } else {
            const mousedown = document.onmousedown
            document.onmousedown = (ev) => {
              if (mousedown) mousedown(ev);
              // 点击外部隐藏
              this.hide();
            }

            // 如果弹层放置在body中，则跟随滚动
            const resizeFunc = window.onresize
            window.onresize = (ev) => {
              if (resizeFunc) resizeFunc(ev);
              this.setPos();
            }

            // 如果被显示在body中，则在滚动容器内跟随滚动
            if (this.transfer) {
              const scrollEls = dom.getAllHasScrollParentEls(this.el);
              scrollEls.forEach(el => {
                const scrollFunc = el.onscroll;
                el.onscroll = (ev) => {
                  if (scrollFunc) scrollFunc(ev);
                  // 触发元素在滚动容器内视图不可见时隐藏popover
                  let scrollRect = ev.target.getBoundingClientRect();
                  let popElRect = this.el.getBoundingClientRect();
                  if(popElRect.top < scrollRect.top || popElRect.bottom > scrollRect.bottom){
                    this.hide();
                  }else{
                    this.setPos();
                  }
                }
              });
            }
          }
        }
      }
    },
    mounted() {
      this.initEvents();
      this.$emit('init');
    }
  }
</script>

<style lang="scss">
  .w-popover-enter-active,
  .w-popover-leave-active {
    transition: opacity .2s ease-in-out;
  }
  .w-popover-enter,
  .w-popover-leave-to {
    opacity: 0;
  }

  .w-popover {
    position: absolute;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    z-index: 1230;

    .arrow {
      position: absolute;
      border-width: 8px;
      border-style: solid;
      &:before {
        position: absolute;
        border-width: 8px;
        border-style: solid;
        content: '';
      }
      &.left {
        border-color: transparent transparent transparent rgba(0,0,0,.1);
        &:before {
          top: -8px;
          right: -7px;
          border-color: transparent transparent transparent #fff;
        }
      }
      &.right {
        border-color: transparent rgba(0,0,0,.1) transparent transparent;
        &:before {
          top: -8px;
          left: -7px;
          border-color: transparent #fff transparent transparent;
        }
      }
      &.top {
        border-color: rgba(0,0,0,.1) transparent transparent transparent;
        &:before {
          left: -8px;
          bottom: -7px;
          border-color: #fff transparent transparent transparent;
        }
      }
      &.bottom {
        border-color: transparent transparent rgba(0,0,0,.1) transparent;
        &:before {
          left: -8px;
          top: -7px;
          border-color: transparent transparent #fff transparent;
        }
      }
    }
  }
</style>
