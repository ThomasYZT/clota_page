<!--mainframe头部框架-->

<template>
  <div class="main-header">

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
	@import '~@/assets/scss/base';
  .main-header{
    @include block_outline($height : 56px);
    background-image: linear-gradient(90deg, #012F84 0%, #0294D7 100%);
    box-shadow: 0 4px 8px 0 rgba(40,84,166,0.20);
  }
</style>
