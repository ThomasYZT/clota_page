<!--
    会员主页
    作者：杨泽涛
-->
<template>
  <div class="home"
       v-show="!isLoading">
      <swiper ref="swiper"
              :show-dots="cardInfoList.length > 0"
              class="home-swiper"
              :value="cardIndex"
              @on-index-change="swiperChange"
              dots-position="center">
          <swiper-item v-for="(item, index) in cardInfoList"
                       :key="index">
              <member-card :info="item">
              </member-card>
          </swiper-item>
      </swiper>

      <div class="nav">
          <label-item v-for="(item, index) in labelList"
                      :info.sync="item"
                      :cardInfo="cardInfo"
                      :key="index">
          </label-item>
      </div>

  </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';
    import labelItem from './components/labelItem';
    import memberCard from './components/memberCard';
    export default {
        components : {
            labelItem,
            memberCard
        },
        data () {
            let labelList = [
                {
                    title : 'integralDetail',
                    link : '/integralDetail',
                    iconClass : 'icon-my-points',
                    info : '',
                    params : {},
                    iconColor : '#F46462'
                },
                {
                    title : 'accountOfStoreValue',
                    link : '/account',
                    iconClass : 'icon-default-account',
                    info : '',
                    params : {},
                    iconColor : '#368CE3'
                },
                {
                    title : 'myOrder',
                    link : '/order',
                    iconClass : 'icon-my-orders',
                    info : '',
                    params : {},
                    iconColor : '#FF9700'
                },
                {
                    title : 'checkFlow',
                    link : '/checkFlow',
                    iconClass : 'icon-check-flow1',
                    info : '',
                    params : {},
                    iconColor : '#6F62E5'
                },
                {
                    title : 'memberCode',
                    link : '/memberCode',
                    iconClass : 'icon-member-code',
                    info : '',
                    params : {},
                    iconColor : '#F46462'
                },
                // {
                //     title : 'card',
                //     link : '/card',
                //     iconClass : 'icon-my-package',
                //     info : '',
                //     params : {},
                //     iconColor : '#368CE3'
                // },
                {
                    title : 'memberRight',
                    link : '/memberRight',
                    iconClass : 'icon-member-rights',
                    info : '',
                    params : {},
                    iconColor : '#6F62E5'
                },
                {
                    title : 'integralMall',
                    link : '/integralMall',
                    iconClass : 'icon-integral-mall-select',
                    info : '',
                    params : {},
                    iconColor : '#6F62E5'
                },
                /*,
                {
                    title: '安全设置',
                    link: '/integralDetail',
                    iconClass: 'icon-my-points',
                    info: '',
                    iconColor: '#F46462'
                }*/
            ];
            return {
                labelList : labelList,
                //会员卡列表数据
                memberCardList : [],
            };
        },
        computed : {
            ...mapGetters([
                'isLoading',
                'userInfo',
                'cardInfo',
                'cardInfoList'
            ]),
            //当前卡索引
            cardIndex () {
                if (this.cardInfoList && this.cardInfoList.length > 0 && this.cardInfo && Object.keys(this.cardInfo).length !== 0) {
                    for (let i = 0, len = this.cardInfoList.length; i < len; i++) {
                        if (this.cardInfoList[i].id === this.cardInfo.id) {
                            return i;
                        }
                    }
                    return 0;
                } else {
                    return 0;
                }
            }
        },
        methods : {
            ...mapMutations([
                'updateCardInfo',
            ]),
            /**
             *  会员卡切换
             *  @param{Number} index
             */
            swiperChange (index) {
                //更新会员卡数据
                this.updateCardInfo(this.cardInfoList[index]);
                //设置菜单数据
                this.setCell();
            },
            /**
             * 跳转到会员详情
             */
            toPersonInfo () {
                this.$router.push({
                    name : 'personInfo'
                });
            },
            /**
             *  跳转到会员二维码
             */
            toMemberCode () {
                this.$router.push({
                    name : 'memberCode'
                });
            },
            /**
             * //设置菜单数据
             */
            setCell () {
                for (let i = 0,len = this.labelList.length; i < len; i++) {
                    switch (this.labelList[i].title) {
                        case 'integralDetail':
                            this.labelList[i].info = this.cardInfo.pointBalance;
                            this.labelList[i].params.num = this.cardInfo.pointBalance;
                            break;
                        case 'accountOfStoreValue':
                            this.labelList[i].info = this.cardInfo.moneyBalance;
                            break;
                        default :
                            this.labelList[i].info = '';
                            this.labelList[i].params = {};
                    }
                }
            },
        },
        created () {
            //设置菜单数据
            this.setCell();
        },
        watch : {
            cardInfo () {
                this.setCell();
            }
        }
  };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .home {
        height: calc(100% - 50px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        .person-img {
            width: 50%;
        }

        .level-name{
            font-size: $font_size_11px;
        }

        /deep/ .vux-slider > .vux-indicator > a,
        /deep/ .vux-slider .vux-indicator-right > a{
            margin: 0 4.5px;

            .vux-icon-dot{
                background: $color_eee;

                &.active{
                    background: #383837;
                }
            }
        }

        /deep/ .vux-indicator {
            bottom: 0;
        }

        .home-swiper {
            height: 210px;
            /deep/ .vux-swiper-item {
                height: 200px;
            }

            /deep/ .vux-swiper {
                height: 200px !important;
            }
        }
    }
</style>
