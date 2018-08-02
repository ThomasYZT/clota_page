<!--排行榜-->

<template>
  <div class="rank-list">
    <div class="title">
      服务器列表
      <span class="server-care">更多</span>
    </div>
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
  .rank-list{
    float: left;
    margin-left: 15px;
    @include block_outline(410px,315px);
    @include card();

    .title{
      @include block_outline($height : 45px);
      border-bottom: 1px solid $color_E8E8E;
      line-height: 45px;
      padding : 0 20px;
      font-size: $font_size_16px;
      color: $color_353B5E;

      .server-care{
        float: right;
        font-size: $font_size_12px;
        color: $color_1890FF;
        cursor: pointer;
      }
    }
  }
</style>
