<!--
    会员主页
    作者：杨泽涛
-->
<template>
  <div class="home"
       v-show="!isLoading">
      <div class="member-card"
           :class="[memberVipCardClass]"
           :style="{backgroundImage: cardBg}">
          <div class="card-content" :style="{color: cardFontColor}">
              <div class="person-info">
                  <div class="left">
                      <div class="img-wrapper">
                          <img class="default-face"
                               :src="userInfo.userImg ? userInfo.userImg : memberHeadImg"
                               @click="showImg">
                      </div>
                      <span class="username" @click="toPersonInfo">
                          <span class="name">
                          {{cardInfo.custName}}
                          </span>
                          <span class="iconfont icon-arrow"></span>
                      </span>
                  </div>
                  <div class="right">
                      <div  class="card-level">
                        <i class="iconfont icon-level">{{cardLevel}}</i>
                        <span class="level-name">{{cardInfo.levelDesc}}</span>
                      </div>
                  </div>
              </div>

              <div class="company-info">
                  <span>{{cardInfo.orgName}}</span>
                  <img src="" alt="">
              </div>

              <div class="card-info">
                  <div style="font-weight: bold">{{cardInfo.cardCode | formatCardCode}}</div>
                  <div @click="toMemberCode">
                      <i class="iconfont icon-code"></i>
                      <i class="iconfont icon-arrow-right"></i>
                  </div>
              </div>
          </div>
      </div>

      <div class="nav">
          <label-item v-for="(item, index) in labelList" :info.sync="item" :key="index"></label-item>
      </div>

      <x-dialog v-model="isShowImg"
                hide-on-blur
                :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
          <img class="person-img" :src="userInfo.userImg ? userInfo.userImg : memberHeadImg" alt="">
      </x-dialog>

  </div>
</template>

<script>
    import ajax from '../../api/index';
    import { mapMutations, mapGetters } from 'vuex';
    import labelItem from './components/labelItem';
    import onelevelMember from '../../assets/images/1levelMember.png';
    import secondlevelMember from '../../assets/images/2levelMember.png';
    import thirdlevelMember from '../../assets/images/3levelMember.png';
    import fourthlevelMember from '../../assets/images/4levelMember.png';
    export default {
        components : {
            labelItem
        },
        filters : {
            /**
             * 格式化会员卡号
             * @param val
             * @return {string}
             */
            formatCardCode (val) {
                if (!val) return '';
                val = val.toString();
                return val.replace(/(.{4})/g,'$& ');
            }
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
                    iconColor : '#368CE3'
                },
                {
                    title : 'myOrder',
                    link : '/order',
                    iconClass : 'icon-my-orders',
                    info : '',
                    iconColor : '#FF9700'
                },
                {
                    title : 'checkFlow',
                    link : '/checkFlow',
                    iconClass : 'icon-check-flow1',
                    info : '',
                    iconColor : '#6F62E5'
                },
                {
                    title : 'memberCode',
                    link : '/memberCode',
                    iconClass : 'icon-member-code',
                    info : '',
                    iconColor : '#F46462'
                },
                {
                    title : 'card',
                    link : '/card',
                    iconClass : 'icon-my-package',
                    info : '',
                    iconColor : '#368CE3'
                },
                {
                    title : 'memberRight',
                    link : '/memberRight',
                    iconClass : 'icon-member-rights',
                    info : '',
                    params : {},
                    iconColor : '#6F62E5'
                },/*,
                    {
                        title: '安全设置',
                        link: '/integralDetail',
                        iconClass: 'icon-my-points',
                        info: '',
                        iconColor: '#F46462'
                    }*/
            ];
            /**
             * 根据title名获取对应的导航数据对象
             * @param value
             * @return {{title, link, iconClass, info, iconColor}|*}
             */
            labelList.getByTitle = function (value) {
                for (let i = 0,len = labelList.length; i < len; i++) {
                    if (labelList[i].title === value) {
                        return labelList[i];
                    }
                }
            };
            return {
                cardInfo : {},
                bgList : [
                    onelevelMember,
                    secondlevelMember,
                    thirdlevelMember,
                    fourthlevelMember
                ],
                labelList : labelList,
                cardBg : 'url(' + onelevelMember + ')',
                cardLevel : 1,
                lvName : '',
                //会员卡字体颜色
                cardFontColor : '#fff',
                //是否放大显示头像
                isShowImg : false,
            };
        },
        computed : {
            ...mapGetters({
                isLoading : 'isLoading',
                userInfo : 'userInfo'
            }),
            //vip卡类名
            memberVipCardClass () {
                if (this.cardInfo && this.cardInfo.levelNum !== '' && this.cardInfo.levelNum !== null) {
                    if (this.cardInfo.levelNum === 1) {
                        return 'one-level';
                    } else if (this.cardInfo.levelNum === 2) {
                        return 'two-level';
                    } else if (this.cardInfo.levelNum === 3) {
                        return 'three-level';
                    } else if (this.cardInfo.levelNum >= 4) {
                        return 'four-level';
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            },
            //头像信息
            memberHeadImg () {
                if (this.cardInfo && this.cardInfo.portrait) {
                    return this.cardInfo.portrait;
                } else {
                    return require('../../assets/images/defaut-face.png');
                }
            }
        },
        methods : {
            ...mapMutations([
                'updateCardInfo'
            ]),
            /**
             * 获取页面数据
             */
            getData () {
                ajax.post('queryMemberPage', {
                    cardId : JSON.parse(localStorage.getItem('userInfo')).cardId,
                    pageNo : 1,
                    pageSize : 100
                }).then((res) => {
                    if (res.success) {
                        //console.log(res.data.data[0])
                        // res.data.data[0].levelNum = 4;
                        //存储会员卡信息
                        localStorage.setItem('cardInfo', JSON.stringify(res.data.data[0]));
                        this.updateCardInfo();
                        this.cardInfo = res.data.data[0];

                        //初始化页面数据
                        this.labelList.getByTitle('integralDetail').info = this.cardInfo.pointBalance;
                        this.labelList.getByTitle('defaultAccount').info = this.cardInfo.moneyBalance;
                        this.labelList.getByTitle('memberRight').params.levelDesc = this.cardInfo.levelDesc;
                        this.labelList.getByTitle('integralDetail').params.num = this.cardInfo.pointBalance;
                        //获取会员卡配色方案
                        this.setCardTheme(res.data.data[0].levelNum);
                    } else {
                        this.$vux.toast.text(res.message);
                    }
                });
            },
            /**
             * 设置会员卡主题
             */
            setCardTheme (lvVal) {
                if (!lvVal) {
                    this.cardFontColor = "#fff";
                    this.cardBg = 'url(' + this.bgList[0] + ')';
                    this.cardLevel = 1;
                    return;
                }
                lvVal = lvVal.toString();
                switch (lvVal) {
                    case '1':
                        this.cardFontColor = "#fff";
                        this.cardBg = 'url(' + this.bgList[0] + ')';
                        this.cardLevel = 1;
                        this.lvName = 'regularMembers';
                        break;
                    case '2':
                        this.cardFontColor = "#fff";
                        this.cardBg = 'url(' + this.bgList[1] + ')';
                        this.cardLevel = 2;
                        this.lvName = 'goldMember';
                        break;
                    case '3':
                        this.cardFontColor = "#fff";
                        this.cardBg = 'url(' + this.bgList[2] + ')';
                        this.cardLevel = 3;
                        this.lvName = 'platinumMember';
                        break;
                    case '4':
                        this.cardFontColor = "#F0D890";
                        this.cardBg = 'url(' + this.bgList[3] + ')';
                        this.cardLevel = 4;
                        this.lvName = 'diamondMembers';
                        break;
                    default:
                        this.cardFontColor = "#fff";
                        this.cardBg = 'url(' + this.bgList[0] + ')';
                        this.cardLevel = 1;
                        this.lvName = 'regularMembers';
                }

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
             *  放大显示头像
             */
            showImg () {
                this.isShowImg = true;
            }
        },
        created () {
            this.getData();
        }
  };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .home {
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;

        .member-card {
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
        }

        .person-img {
            width: 50%;
        }

        .level-name{
            font-size: $font_size_11px;
        }
    }
</style>
