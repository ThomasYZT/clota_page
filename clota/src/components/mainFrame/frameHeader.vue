<!--边框头部组件-->

<template>
  <div class="frame-header">
      <div class="company-log">
        clot 的logo
      </div>
      <div class="lang-change">
          <span class="active lang">中文</span>
          <span class="xg">/</span>
          <span class="lang">En</span>
      </div>
      <ul class="icon-li">
          <li class="icon">
          <i  class="ivu-icon ivu-icon-logo-apple" ></i>
          </li>
          <li class="icon">
            <i  class="ivu-icon ivu-icon-logo-apple" ></i>
          </li>
      </ul>
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
  @import '../../assets/scss/base';
  .frame-header{
    @include block_outline($height : 60px);

    .company-log{
      @include block_outline($width : 60px,$height : 60px);
      color: $color_fff;
      text-align: center;
      float: left;
    }

    .lang-change{
      position: relative;
      float: right;
      @include block_outline($width : 118px);
      padding: 18px 20px 20px 20px;
      font-size: $font_size_16px;
      color: $color_lang_color;
      cursor: pointer;

      &::before{
        display: block;
        content : '';
        @include block_outline(2px,20px);
        @include absolute_pos(absolute,20px,auto,auto,0);
        background: $color_fff;
      }

      .xg{
        padding: 0 3px;
      }

      .lang{

        &.active{
          color: $color_fff;
        }
      }
    }
  }
</style>
