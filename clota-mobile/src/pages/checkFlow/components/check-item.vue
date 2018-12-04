<!--
    check-flow页面内部组件
    作者：杨泽涛
-->
<template>
  <div class="check-item">
      <div class="info">
          <p class="ticket-name">{{$t(checkFlowName)}}</p>
          <p class="time">{{info.createdTime}}</p>
      </div>
      <div class="check">
          <p><span v-if="info.amount > 0">+</span>{{ info.amount  | moneyFilter | contentFilter}}{{$t('yuan')}}</p>
      </div>
  </div>
</template>

<script>

  export default {
      props : {
        info : {
            type : Object,
            default : null
        }
      },
      components : {},
      computed : {
          checkFlowName () {
              switch (this.info.operationType) {
                  case 'consume':
                      if (this.info.evaluateType === 'consume_add') {
                          return 'gainByConsuming';
                      } else {
                          return 'consume';
                      }
                  case 'recharge':
                      return 'gainByRecharging';
                  case 'adjust_money':
                      return 'adjustMoney';
                  case 'open_card':
                      return 'open_card';
                  default:
                      return '-';
              }
          }
      },
      data () {
          return {};
      },
      methods : {}
  };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .check-item {
        position: relative;
        display: flex;
        height: 70px;
        width: 100%;

        &:after {
            position: absolute;
            bottom: 0;
            left: 19px;
            content: ' ';
            width: calc(100% - 33px);
            border-bottom: 1px solid #E8E8E8;
        }

        .check, .info {
            flex-grow: 1;
        }

        .check {
            margin-right: 14px;
            line-height: 70px;
            text-align: right;
            font-size: 18px;
        }

        .info {
            padding: 14.5px 0 14px 19px;


            .ticket-name {
                font-size: 14px;
            }

            .time {
                font-size: 12px;
                color: #8395A7;
            }
        }
    }
</style>
