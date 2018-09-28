<!--
    积分明细
    作者：杨泽涛
-->
<template>
  <div class="integral-detail">
      <div class="score-board">
          <h5 class="score">{{query.num}}</h5>
          <p class="name">{{$t('integralDetail')}}</p>
      </div>

      <div class="scroll-wrapper">
          <scroll ref="scroll"
                  :data="infoList"
                  :scrollbar="scrollbar"
                  :pullDownRefresh="pullDownRefreshObj"
                  :pullUpLoad="pullUpLoadObj"
                  @pullingDown="onPullingDown"
                  @pullingUp="onPullingUp">
              <score-item v-for="(item, index) in infoList"
                          :key="index"
                          :info="item">

              </score-item>
          </scroll>
      </div>
  </div>
</template>

<script>
    import Scroll from '../../components/scroll/scroll'
    import scoreItem from './components/scoreItem';
    import ajax from '../../api/index';
    import {mapGetters} from 'vuex'

    export default {
        components: {
            scoreItem,
            Scroll
        },
        data() {
            return {
                infoList: [],
                //积分总数
                num: 0,
                //是否显示滚动条
                scrollbar: false,
                //下拉刷新配置
                pullDownRefreshObj: {
                    //临界值
                    threshold: 90,
                    //刷新完成bubble停留的位置
                    stop: 40,
                    //设置加载和加载中显示的文字
                    txt: this.$t('freshComplete')
                },
                //上拉加载配置
                pullUpLoadObj: {
                    //临界值
                    threshold: 20,
                    //设置加载和加载中显示的文字
                    txt: {more: 'loading', noMore: 'noMoreData'}
                },
                //分页设置
                pageSetting: {
                    pageNo: 1,
                    pageSize: 10
                },
                //页面参数
                query: null
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
                    ...this.pageSetting
                }).then((res) => {
                    if(res.success) {
                        if(this.pageSetting.pageNo === 1) {
                            this.infoList = res.data ? res.data.data : [];
                            this.infoList.forEach((item) => {
                                switch (item.operationType) {
                                    case 'adjust_score':
                                        item.purpose = 'adjustScore'
                                        break;
                                    case 'consume_add':
                                        item.purpose = 'gainByConsuming'
                                        break;
                                    case 'consume_reduce':
                                        item.purpose = 'scoreResume';
                                        break;
                                    case 'recharge_add':
                                        item.purpose = 'gainByRecharging'
                                        break;
                                    default:
                                        item.purpose = '-'
                                }
                            })
                        } else {
                            if(res.data.data.length !== 0) {
                                this.infoList = this.infoList.concat(res.data.data);
                            }else {
                                this.refresh();
                            }
                        }
                    }else {
                        this.infoList = [];
                        this.$vux.toast.text(res.message);
                    }
                });
            },
            /**
             * 下拉刷新操作
             */
            onPullingDown() {
                this.pageSetting.pageNo = 1;
                this.getData();
            },
            /**
             * 上拉刷新操作
             */
            onPullingUp() {
                this.pageSetting.pageNo += 1;
                this.getData();
            },
            //强制刷新scroll
            refresh() {
                this.$refs.scroll.forceUpdate();
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ])
        },
        created() {
            this.query = this.$route.query;
            this.getData();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .integral-detail {
        height: 100%;

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

        .scroll-wrapper {
            position: relative;
            height: calc(100% - 175px);
        }
    }

</style>
