<!--
    会员主页
    作者：杨泽涛
-->
<template>
  <div class="home"
       v-show="!isLoading">
      <swiper height="205px"
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

        /*.member-card {
            position: relative;
            width: 100%;
            height: 167.5px;
            background-size: 100% 100%;

            &.one-level .card-level{
                background: #A1A5BA;
            }
            &.two-level .card-level{
                background: #ECBB3F;
            }
            &.three-level .card-level{
                background: #E4C3AC;
            }
            &.four-level .card-level{
                background-color:  #2B2C2E;
            }

            .card-content {
                position: absolute;
                left: 24px;
                bottom: 0;
                width: 327-21.2px;
                height: 150px;
                margin-left: 21.2px;

                .person-info {
                    margin-bottom: 30px;
                    margin-top: 21.2px;
                    display: flex;
                    height: 37px;
                    width: 100%;
                    display: flex;

                    div {
                        height: 100%;

                        &.left {
                            flex: 1;
                            .img-wrapper {
                                display: inline-block;
                                position: relative;
                                width: 37px;
                                border-radius: 50%;
                                background-color: rgba(255,255,255,0.1);

                                img.default-face {
                                    position: absolute;
                                    margin-right: 12px;
                                    border-radius: 50%;
                                    left: 2.175px;
                                    top: 2.175px;
                                    width: 32.65px;
                                    height: 32.65px;
                                }
                            }

                            span.username {
                                margin-left: 5px;
                                display: inline-block;
                                width: calc(100% - 60px);
                                height: 100%;
                                line-height: 32.65px;
                                vertical-align: top;
                                font-size: 14px;
                                @include overflow_tip();

                                .name{
                                    vertical-align: middle;
                                }

                                .icon-arrow{
                                    font-size: 12px!important;
                                    vertical-align: middle;
                                    line-height: 16px;
                                    margin-top: 8px;
                                }
                            }
                        }
                        &.right {
                            margin-right: 15px;
                            text-align: right;
                            position: relative;

                            .card-level {
                                margin-top: 4px;
                                padding: 0 15px;
                                width: auto;
                                height: 21px;
                                display: inline-block;
                                border-radius: 10px;
                                font-size: 8px;
                                line-height: 21px;
                                i {
                                    font-size: 8px;
                                    opacity: 1;
                                }
                                span {
                                    opacity: 1;
                                }
                            }

                        }
                    }
                }

                .company-info {
                    height: 19px;
                    width: 100%;
                    margin-bottom: 9px;
                    font-size: 12.5px;
                }

                .card-info {
                    display: flex;
                    height: 19px;
                    width: 100%;
                    font-size: 14px;

                    div {
                        &:first-child {
                            flex: 1;
                            white-space: nowrap;
                        }
                        &:last-child {
                            text-align: right;

                            &:last-child {
                                margin-right: 22.5px;
                            }
                        }
                    }
                }
            }
        }*/

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

        .nav {
            margin-bottom: 150px;
        }
    }
</style>
