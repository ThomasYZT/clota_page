<!---->

<template>
  <div id="app">
    <main-frame>
      <router-view>
      </router-view>
    </main-frame>
  </div>
</template>

<script>
    import mainFrame from '@/components/mainFrame/mainFrame';
    export default {
      components : {
        mainFrame
      },
      data() {
          return {}
      },
      methods: {},
    }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';

  #app{
    @include block_outline();
    background: get_url('icon-background.png');
    min-width: $window_min_width;
    background-size: 100% 100%;
  }
</style>
