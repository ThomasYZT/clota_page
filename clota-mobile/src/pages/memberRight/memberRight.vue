<!--
    会员权益
    作者：杨泽涛
-->
<template>
  <div class="member-right">
      <div class="top-tab">
          <p>{{'会员享受积分、折扣率权益说明'}}</p>
      </div>

      <div class="member-right-content">
          <h3 class="category">按会员级别</h3>
          <illustration-board v-for="(item, index) in infoList"
                              :key="index"
                              :info="item">
          </illustration-board>
      </div>
  </div>
</template>

<script>
    import illustrationBoard from './components/illustrationBoard'
  export default {
    components: {
        illustrationBoard
    },
    data() {
      return {
          infoList: [
              {
                  name: '白银会员',
                  IntegralRate: '1:2',
                  unit: '人名币:积分',
                  depositRate: '1:2',
              },
              {
                  name: '白银会员',
                  IntegralRate: '1:2',
                  unit: '人名币:积分',
                  depositRate: '1:2',
              }
          ]
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';

    .member-right {

        .top-tab {
            position: fixed;
            top: 0;
            width: 100%;
            height: 43px;
            background-color: #F4F6F9;

            p {
                margin-left: 14px;
                height: 100%;
                line-height: 43px;
                color: #8395A7;
                font-size: 14px;
            }
        }

        .member-right-content {
            margin-top: 43px;

            .category {
                margin: 0 auto;
                padding: 14px 0 14px 0;
                width: 50%;
                text-align: center;
                font-size: 15px;
                color: #C29F6B;
                background: url("../../assets/images/memberRightBg.svg");
                background-size: 100% 100%;
            }
        }
    }
</style>
