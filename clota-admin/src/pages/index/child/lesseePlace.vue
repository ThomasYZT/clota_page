<!--租户用地-->

<template>
  <div class="lessee-place">

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

  .lessee-place{
    float: left;
    @include block_outline(410px,309px);
    margin-left: 15px;
    @include card();
  }
</style>
