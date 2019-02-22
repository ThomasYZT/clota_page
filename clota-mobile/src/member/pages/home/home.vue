<!--
    会员主页
    作者：杨泽涛
-->
<template>
    <!--v-show="cardInfo && Object.keys(cardInfo).length > 0"-->
  <div class="home" :class="{'full-height' : !hasPointMenu}">
      <swiper ref="swiper"
              :show-dots="cardInfoList.length > 1"
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

      <!-- 卡包领取 -->
      <x-dialog v-model="isShowCard"
                class="dialog-crad-give"
                :hide-on-blur="true">
          <div class="txt">
              <p class="title">{{$t('addMemberCard')}}</p>
              <p>{{$t('addMemberCardTxtOne') + cardExt.length + $t('addMemberCardTxtTwo')}}！</p>
          </div>
          <div class="opreta-btn">
              <div class="no" @click="isShowCard=false;">{{$t('getCardBtnNo')}}</div>
              <div class="get" @click="getCard">{{$t('getCardBtn')}}</div>
          </div>
      </x-dialog>

  </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex';
    import labelItem from './components/labelItem';
    import memberCard from './components/memberCard';
    import ajax from '../../api/index';

    export default {
        components : {
            labelItem,
            memberCard
        },
        data () {
            return {
                //会员卡列表数据
                memberCardList : [],
                // 展示卡包
                isShowCard : false,
                // 卡的拓展信息
                cardExt : []
            };
        },
        created () {
            this.getCardListInfo().then(() => {
                //判断是否开通了微信卡包
                if (this.wxMpSet.openMembercard === 'true' && this.wxMpSet.wxCardId && this.isWeixin && this.userInfo.openId) {
                    this.queryUnboundCard();
                }
            })
        },
        computed : {
            ...mapGetters([
                'isLoading',
                'userInfo',
                'cardInfo',
                'cardInfoList',
                'companyCode',
                'memberConfigInfo',
                'wxMpSet',
                'isWeixin'
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
            },
            //是否有积分服务
            hasPointMenu () {
                return this.memberConfigInfo && this.memberConfigInfo.memberPoint === 'true';
            },
            //是否有储值服务
            hasRechargeMenu () {
                return this.memberConfigInfo && this.memberConfigInfo.memberRecharge === 'true';
            },
            //功能菜单列表
            labelList () {
                let baseFunc = [
                    {
                        title : 'myOrder',
                        link : '/order',
                        routeName : 'order',
                        iconClass : 'icon-my-orders',
                        info : '',
                        params : {},
                        iconColor : '#FF9700'
                    },
                    {
                        title : 'memberRight',
                        link : '/memberRight',
                        routeName : 'memberRight',
                        iconClass : 'icon-member-rights',
                        info : '',
                        params : {},
                        iconColor : '#6F62E5'
                    },
                    // {
                    //     title : 'card',
                    //     link : '/card',
                    //     iconClass : 'icon-my-package',
                    //     info : '',
                    //     params : {},
                    //     iconColor : '#368CE3'
                    // },
                    /*,
					{
						title: '安全设置',
						link: '/integralDetail',
						iconClass: 'icon-my-points',
						info: '',
						iconColor: '#F46462'
					}*/
                ];
                //是否开通积分服务
                if (this.hasPointMenu) {
                    baseFunc = baseFunc.concat([
                        {
                            title : 'integralDetail',
                            link : '/integralDetail',
                            routeName : 'integralDetail',
                            iconClass : 'icon-my-points',
                            info : this.cardInfo.pointBalance,
                            params : {},
                            iconColor : '#F46462'
                        },
                        {
                            title : 'integralMall',
                            link : '/integralMall',
                            routeName : 'integralMall',
                            iconClass : 'icon-integral-mall-select',
                            info : '',
                            params : {},
                            iconColor : '#6F62E5'
                        },
                    ]);
                }
                //配置储值套餐信息
                if (this.hasRechargeMenu) {
                    baseFunc = baseFunc.concat([
                        {
                            title : 'accountOfStoreValue',
                            link : '/account',
                            routeName : 'account',
                            iconClass : 'icon-default-account',
                            info : this.cardInfo.moneyBalance,
                            params : {},
                            iconColor : '#368CE3'
                        },
                        {
                            title : 'memberCode',
                            link : '/memberCode',
                            routeName : 'memberCode',
                            iconClass : 'icon-member-code',
                            info : '',
                            params : {},
                            iconColor : '#F46462'
                        },
                        {
                            title : 'checkFlow',
                            link : '/checkFlow',
                            routeName : 'checkFlow',
                            iconClass : 'icon-check-flow1',
                            info : '',
                            params : {},
                            iconColor : '#6F62E5'
                        },
                    ]);
                }
                return baseFunc;
            }
        },
        methods : {
            ...mapMutations([
                'updateCardInfo',
            ]),
            ...mapActions([
                'getCardListInfo'
            ]),
            /**
             *  会员卡切换
             *  @param{Number} index
             */
            swiperChange (index) {
                //更新会员卡数据
                this.updateCardInfo(this.cardInfoList[index]);
                this.$store.dispatch('getMemberConfigInfo');
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
             * 是否领取会员卡至微信卡包
             */
            queryUnboundCard () {
                ajax.post('queryUnboundCard', {
                    memberId : this.userInfo.memberId
                }).then((res) => {
                    if (res.success) {
                        if (res.data && res.data.length != 0) {
                            this.isShowCard = true;
                            this.getCardExt();
                        }
                    } else {
                        this.$vux.toast.text(this.$t(res.code));
                    }
                });
            },
            /**
             * 获取卡的拓展信息
             */
            getCardExt () {
                ajax.post('getBatchCardExt', {
                    openId : this.userInfo.openId,
                    memberId : this.userInfo.memberId,
                    companyCode : this.companyCode
                }).then((res) => {
                    if (res.success) {
                        this.cardExt = res.data ? res.data : [];
                    } else {
                        this.$vux.toast.text(this.$t(res.code));
                    }
                });
            },
            /**
             * 领取卡包
             */
            getCard () {
                let cardList = [];
                this.cardExt.forEach(item => {
                    cardList.push({
                        cardId : item.cardId,
                        cardExt : JSON.stringify({
                            code : item.code,
                            openid : item.openId,
                            timestamp : item.timestamp,
                            nonce_str : item.nonceStr,
                            signature : item.signature
                        })
                    });
                });
                this.$wechat.addCard({
                    cardList : cardList,
                    success : () => {
                        this.$vux.toast.text(this.$t('getCardSuccess'));
                    },
                    fail : () => {
                        this.$vux.toast.text(this.$t('getCardFail'));
                    },
                    complete : () => {
                        this.isShowCard = false;
                    }
                });
            }
        },
  };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .home {
        height: calc(100% - 50px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        &.full-height{
            height: 100%;
        }

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
                background: $color_gray;

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

    .dialog-crad-give {
        /deep/ .weui-dialog {
            padding-top: 30px;
            background: #FFFFFF;
            border-radius: 14px;
            .txt {
                padding: 15px;
                font-size: 15px;
                color: #888888;
                .title {
                    font-size: 18px;
                    color: #000000;
                    margin-bottom: 9px;
                }
            }
        }
        .opreta-btn {
            display: flex;
            font-size: 18px;
            color: #000000;
            text-align: center;
            border-top: 1px solid #DCDEE3;
            margin-top: 16px;
            > div {
                flex: 1;
                padding: 16px;
                &.get {
                    color: #046FDB;
                    border-left: 1px solid #DCDEE3;
                }
            }
        }

    }
</style>
