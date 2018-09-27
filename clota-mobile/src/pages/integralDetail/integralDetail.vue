<!--
    积分明细
    作者：杨泽涛
-->
<template>
  <div class="integral-detail">
      <div class="score-board">
          <h5 class="score">{{num}}</h5>
          <p class="name">{{$t('integralDetail')}}</p>
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
    import scoreItem from './components/scoreItem';
    import ajax from '../../api/index';
    import {mapGetters} from 'vuex'

    export default {
        components: {
            scoreItem
        },
        data() {
            return {
                infoList: [],/*[
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
                ]*/
                //积分总数
                num: 0
            }
        },
        methods: {
            /**
             * 获取页面信息
             */
            getData() {
                ajax.post('queryOrgAccountChange', {
                    accountTypeIds: '2',
                    operType: '',
                    cardId: this.userInfo.cardId,
                    pageNo: 1,
                    pageSize: 20
                }).then((res) => {
                    if(res.success) {
                        this.infoList = res.data.data;
                        this.num = res.data.data.reduce((preValue, curValue) => {
                            return preValue + parseInt(curValue.amount)
                        }, 0);
                    }else {
                        this.$vux.toast.text(res.message)
                    }
                })
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ])
        },
        created() {
            this.getData();
        }
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
