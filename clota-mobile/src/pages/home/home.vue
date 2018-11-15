<!--
    会员主页
    作者：杨泽涛
-->
<template>
  <div class="home"
       v-show="!isLoading">
      <swiper height="205px"
              :class="{'no-spot': this.cardInfoList.length === 1}"
              v-model="cardIndex"
              @on-index-change="swiperChange"
              dots-position="center">
          <swiper-item v-for="(item, index) in cardInfoList"
                       :key="index">
              <member-card :info="item"></member-card>
          </swiper-item>
      </swiper>

      <div class="nav">
          <label-item v-for="(item, index) in labelList" :info.sync="item" :cardInfo="cardInfo" :key="index">
          </label-item>
      </div>

  </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';
    import labelItem from './components/labelItem';
    import memberCard from './components/memberCard';
    import defaultsDeep from 'lodash/defaultsDeep';
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
                    title : 'defaultAccount',
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
                {
                    title : 'card',
                    link : '/card',
                    iconClass : 'icon-my-package',
                    info : '',
                    params : {},
                    iconColor : '#368CE3'
                },
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
                //当前卡索引
                cardIndex : 0
            };
        },
        computed : {
            ...mapGetters([
                'isLoading',
                'userInfo',
                'cardInfo',
                'cardInfoList'
            ]),
        },
        methods : {
            ...mapMutations([
                'updateCardInfo',
                'updateCardInfoList',
                'updateUserInfo'
            ]),
            /**
             *  会员卡切换
             *  @param index
             */
            swiperChange (index) {
                //更新会员卡数据
                localStorage.setItem('cardInfo', JSON.stringify(this.memberCardList[index]));
                this.updateCardInfo();
                //更新个人信息
                let userInfo = defaultsDeep({cardId : this.cardInfo.id}, this.userInfo);
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                this.updateUserInfo();
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
                    if (this.labelList[i].title === 'integralDetail') {
                        return this.labelList[i];
                    }
                    switch (this.labelList[i].title) {
                        case 'integralDetail':
                            this.labelList[i].info = this.cardInfo.pointBalance;
                            this.labelList[i].params.num = this.cardInfo.pointBalance;
                            break;
                        case 'defaultAccount':
                            this.labelList[i].info = this.cardInfo.moneyBalance
                            break;
                        case 'memberRight':
                            this.labelList[i].params.levelDesc = this.cardInfo.levelDesc;
                            break;
                        default :
                            this.labelList[i].info = '';
                            this.labelList[i].params = {};

                    }
                }
            }
        },
        created () {
            //设置菜单数据
            this.setCell();
        }
  };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .home {
        height: 100%;
        overflow: auto;
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

        /deep/ .no-spot {
            .vux-indicator {
                display: none;
            }
        }

        .nav {
            margin-bottom: 150px;
        }
    }
</style>
