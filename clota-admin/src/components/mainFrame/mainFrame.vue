<!--mainframe外层框架-->

<template>
  <div class="main-frame">
    <!--头部菜单栏-->
    <main-header>
    </main-header>
    <!--router-view容器-->
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    import mainHeader from './mainHeader';
    export default {
        components : {
          mainHeader
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .main-frame{
    @include block_outline();

    .main-content{
      @include block_outline($height : unquote('calc(100% - 56px)'));
      background: $color_f4f6f9;
    }
  }
</style>
