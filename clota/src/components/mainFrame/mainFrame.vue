<!---->

<template>
  <div class="main-frame">
    <frame-header>
    </frame-header>
    <div class="frame-content">
      <frame-sidebar>
      </frame-sidebar>
      <div class="router-con" :class="{'pick-up' : menuIsPackUp}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
    import frameHeader from './frameHeader';
    import frameSidebar from './frameSidebar';
    import { mapGetters } from 'vuex'
    export default {
      components : {
        frameHeader,
        frameSidebar
      },
      data() {
          return {}
      },
      methods: {},
      computed : {
        ...mapGetters({
          menuIsPackUp: 'menuIsPackUp',
        }),
      }
    }

</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';
  .main-frame{
    @include block_outline();

    .frame-content{
      @include block_outline($height : unquote('calc(100% - 60px)'));

      .router-con{
        @include block_outline(unquote('calc(100% - 210px)'));
        float: left;
        background: $color_fff;
        border-radius: 5px 5px 0 0 ;
        transition: all 0.3s;

        &.pick-up{
          @include block_outline(unquote('calc(100% - 55px)'));
          transition: all 0.3s;
        }
      }

      &::after{
        display: block;
        content : '';
        @include block_outline(10px);
      }
    }
  }
</style>
