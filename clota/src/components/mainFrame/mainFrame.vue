<!---->

<template>
  <div class="main-frame">
    <frame-header>
    </frame-header>
    <div class="frame-content">
      <frame-sidebar>
      </frame-sidebar>
      <div class="router-con">

      </div>
    </div>
  </div>
</template>

<script>
    import frameHeader from './frameHeader';
    import frameSidebar from './frameSidebar';
    export default {
      components : {
        frameHeader,
        frameSidebar
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

    .frame-content{
      @include block_outline($height : unquote('calc(100% - 60px)'));

      .router-con{
        @include block_outline($width : unquote('calc(100% - 210px)'));
        float: left;
        background: $color_fff;
        border-radius: 5px 5px 0 0 ;
      }
    }
  }
</style>
