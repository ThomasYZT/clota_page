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
          <!--<scroll ref="scroll"-->
                  <!--:data="infoList"-->
                  <!--:scrollbar="scrollbar"-->
                  <!--:pullDownRefresh="pullDownRefreshObj"-->
                  <!--:pullUpLoad="pullUpLoadObj"-->
                  <!--@pullingDown="onPullingDown"-->
                  <!--@pullingUp="onPullingUp">-->
              <!--<score-item v-for="(item, index) in infoList"-->
                          <!--:key="index"-->
                          <!--:info="item">-->
              <!--</score-item>-->
          <!--</scroll>-->
          <scroll ref="scroll"
                  :data="infoList"
                  :scrollbar="scrollbar"
                  :pullDownRefresh="pullDownRefreshObj"
                  :pullUpLoad="pullUpLoadObj"
                  :startY="parseInt(startY)"
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
    import Scroll from '../../components/scroll/scroll';
    import scoreItem from './components/scoreItem';
    import ajax from '../../api/index';
    import { mapGetters } from 'vuex';
    import Vue from 'vue';

    export default {
        components : {
            scoreItem,
            Scroll
        },
        data () {
            return {
                infoList : [],
                //积分总数
                num : 0,
                //是否显示滚动条
                scrollbar : false,
                //下拉刷新配置
                pullDownRefreshObj : {
                    //临界值
                    threshold : 90,
                    //刷新完成bubble停留的位置
                    stop : 40,
                    //设置加载和加载中显示的文字
                    txt : 'freshComplete'
                },
                startY : 0,
                //上拉加载配置
                pullUpLoadObj : {
                    //临界值
                    threshold : 20,
                    //设置加载和加载中显示的文字
                    txt : { more : 'loading', noMore : 'noMoreData' }
                },
                //分页设置
                pageSetting : {
                    pageNo : 1,
                    pageSize : 10
                },
                //页面参数
                query : null
            };
        },
        methods : {
            /**
             * 获取页面信息
             */
            getData () {
                ajax.post('queryOrgAccountChange', {
                    accountTypeIds : '2',
                    operType : '',
                    cardId : this.cardInfo.id,
                    ...this.pageSetting
                }).then((res) => {
                    if (res.success) {
                        if (res.data) {
                            if ( res.data.data.length >= this.pageSetting.pageNo * (this.pageSetting.pageSize - 10) && res.data.data.length <= this.pageSetting.pageNo * this.pageSetting.pageSize) {
                                //组装数据
                                this.packingData(res.data.data);
                                this.infoList = res.data ? res.data.data : [];
                            } else {
                                //组装数据
                                this.packingData(res.data.data);
                                this.infoList = res.data ? res.data.data : [];
                                this.refresh();
                                this.pageSetting.pageSize -= 10;
                            }
                        } else {
                            this.infoList = [];
                        }
                    } else {
                        this.infoList = [];
                        this.$vux.toast.text(this.$t('getDataFailure'));
                    }
                });
            },
            /**
             * 下拉刷新操作
             */
            onPullingDown () {
                this.pageSetting = {
                    pageNo : 1,
                    pageSize : 10
                };
                this.getData();
            },
            /**
             * 上拉刷新操作
             */
            onPullingUp () {
                this.pageSetting.pageSize += 10;
                this.getData();
            },
            //强制刷新scroll
            refresh () {
                this.$refs.scroll.forceUpdate();
            },
            /**
             * 组装数据
             */
            packingData (data) {
                data.forEach((item) => {
                    switch (item.operationType) {
                        case 'adjust_score':
                            item.purpose = 'adjustScore';
                            break;
                        case 'consume':
                            item.evaluateType === 'consume_add' ? item.purpose = 'gainByConsuming' : item.purpose = 'scoreResume';
                            break;
                        case 'recharge':
                            item.purpose = 'gainByRecharging';
                            break;
                        case 'exchange_goods':
                            //积分兑换商品
                            item.purpose = 'exchange_goods';
                            break;
                        case 'open_card':
                            //新开卡
                            item.purpose = 'open_card';
                            break;
                        case 'expire_score':
                            //积分失效
                            item.purpose = 'expire_score';
                            break;
                        default:
                            item.purpose = '-';
                    }
                });
            },
            rebuildScroll () {
                Vue.nextTick(() => {
                    this.$refs.scroll.destroy();
                    this.$refs.scroll.initScroll();
                });
            }
        },
        computed : {
            ...mapGetters([
                'userInfo',
                'cardInfo',
            ])
        },
        created () {
            this.query = this.$route.query;
            this.getData();
        },
        watch : {
            startY () {
                this.rebuildScroll();
            }
        }
    };
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
