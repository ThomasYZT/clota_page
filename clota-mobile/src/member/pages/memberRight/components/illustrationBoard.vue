<!--
    说明板组件
    作者：杨泽涛
-->
<template>
  <div class="illustration-board">
      <h5 class="title">
          <slot name="name">{{info.name}}</slot>
      </h5>
      <p class="item">
          <span class="item-title">{{$t('scoreRate')}} {{$t('colon')}} </span>
          1 {{$t('colon')}} <slot name="scoreRate">{{info.scoreRate}}</slot>
          {{$t('bracketSetting', { content : $t('score') + $t('colon') + $t('RMB') })}}
      </p>
      <p class="item">
          <span class="item-title">{{$t('discountRate')}} {{$t('colon')}} </span><slot name="discountRate">{{info.discountRate}}</slot>
      </p>
  </div>
</template>

<script>

  export default {
      props : {
        info : {
            type : Object,
            default () {
                return {};
            }
        }
      },
    components : {},
    data () {
      return {};
    },
    methods : {}
  };
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';
    .illustration-board {
        position: relative;
        padding: 14px 25px;
        width: 100%;
        height: 123px;
        color: #353B48;
        font-size: 12px;
        text-align: left;

        .title {
            font-size: 14px;
            margin-bottom: 3px;
            color: #353B48;
        }
        .item {
            margin-top: 9px;

            .item-title {
                font-size: 12px;
                color: #8E9091;
            }
        }

        /*&:after {*/
            /*position: absolute;*/
            /*bottom: 14px;*/
            /*display: block;*/
            /*margin-top: 14px;*/
            /*content: ' ';*/
            /*width: calc(100% - 25px);*/
            /*border-bottom: 1px dashed #E8E8E8;*/
        /*}*/
    }


</style>
