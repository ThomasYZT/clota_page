<!--边框左侧菜单组件-->

<template>
  <div class="frame-slidbar">

  </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
  $img_base_url : '../../assets/images/';
  @import '../../assets/scss/base';

  .frame-slidbar{
    @include block_outline(200px);
    float: left;
    background: get_url('icon-menu-bg.svg') no-repeat;
    background-position: center bottom;
  }
</style>
