<!--租户用地-->

<template>
  <div class="lessee-place">
    <div class="title">
      租户所在地
    </div>
    <div class="chart-place">
      <pie>
      </pie>
    </div>
  </div>
</template>

<script>
    import pie from './pie';
    export default {
        components :{
          pie
        },
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

    .title {
      @include block_outline($height: 45px);
      border-bottom: 1px solid $color_E8E8E;
      line-height: 45px;
      padding: 0 20px;
      font-size: $font_size_16px;
      color: $color_353B5E;
    }

    .chart-place{
      @include block_outline($height: 262px);
    }
  }
</style>
