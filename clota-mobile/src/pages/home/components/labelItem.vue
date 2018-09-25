<!--
    主页内部元素
    作者：杨泽涛
-->
<template>
  <div class="label-item">
      <cell is-link
            :title="info.title"
            :link="info.link"
            class="cell">
          <i slot="icon"
             :style="{color: info.iconColor}"
             class="icon iconfont"
             :class="info.iconClass"></i>
          <div class="arrow-wrap">
              <span class="info">{{info.info}}</span>
              <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
          </div>
      </cell>
  </div>
</template>

<script>

  export default {
    props: {
        //导航信息
        info: {
            type: Object,
            default: null
        }
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';
</style>
