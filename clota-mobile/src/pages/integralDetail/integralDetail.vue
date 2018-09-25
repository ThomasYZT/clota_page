<!--
    积分明细
    作者：杨泽涛
-->
<template>
  <div class="integral-detail">
      <div class="score-board">
          <h5 class="score">{{2789}}</h5>
          <p class="name">可用积分</p>
      </div>

      <div class="content">
          <score-item v-for="(item, index) in infoList"
                      :key="index"
                      :info="item">

          </score-item>
      </div>
  </div>
</template>

<script>
    import scoreItem from './components/scoreItem'
    export default {
        components: {
            scoreItem
        },
        data() {
            return {
                infoList: [
                    {
                        ticketName: '北京欢乐谷门票',
                        time: '2018.06.02 08:00:00',
                        check: -4000
                    },
                    {
                        ticketName: '北京欢乐谷门票',
                        time: '2018.06.02 08:00:00',
                        check: -3000
                    },
                    {
                        ticketName: '储值100元',
                        time: '2018.06.02 08:00:00',
                        check: 4000
                    }
                ]
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .score-board {
        width: 100%;
        height: 175px;
        background: url("../../assets/images/integrateDetialBg.png");
        background-size: 100% 100%;
        color: #fff;
        text-align: center;

        .score {
            padding-top: 60px;
            font-size: 34px;
        }

        .name {
            font-size: 12px;
        }
    }
</style>
