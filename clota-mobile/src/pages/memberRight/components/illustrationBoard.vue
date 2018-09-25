<!--
    说明板组件
    作者：杨泽涛
-->
<template>
  <div class="illustration-board">
      <h5 class="title">{{info.name}}</h5>
      <p class="item"><span class="item-title">积分比例：</span>{{info.IntegralRate}} ({{info.unit}})</p>
      <p class="item"><span class="item-title">折扣率：</span>{{info.IntegralRate}} ({{info.unit}})</p>

  </div>
</template>

<script>

  export default {
      props: {
        info:  {
            type: Object,
            default: ''
        }
      },
    components: {},
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';
    .illustration-board {
        padding: 14px 25px;
        width: 100%;
        height: 123px;
        color: #353B48;

        &:after {
            display: block;
            margin-top: 14px;
            content: ' ';
            width: calc(100% - 25px);
            border-bottom: 1px dashed #E8E8E8;
        }

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

    }



</style>
