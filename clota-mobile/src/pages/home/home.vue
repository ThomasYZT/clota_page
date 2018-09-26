<!--
    会员主页
    作者：杨泽涛
-->
<template>
  <div class="home">
      <div class="member-card" :style="{backgroundImage: cardBg}">
          <div class="card-content" :style="{color: cardFontColor}">
              <div class="person-info">
                  <div class="left">
                      <div class="img-wrapper">
                          <img class="default-face" src="../../assets/images/defaut-face.png" alt="">
                      </div>
                      <span class="username">{{cardInfo.custName+" "}}></span>
                  </div>
                  <div class="right">
                      <div  class="card-level">
                        <i class="iconfont icon-level">{{cardLevel}}</i>
                        <span class="level-name">{{lvName}}</span>
                      </div>
                  </div>
              </div>

              <div class="company-info">
                  <span>{{cardInfo.orgName}}</span>
                  <img src="" alt="">
              </div>

              <div class="card-info">
                  <div>{{cardInfo.cardCode | formatCardCode}}</div>
                  <div>
                      <i class="iconfont icon-code"></i>
                      <i class="iconfont icon-arrow-right"></i>
                  </div>
              </div>
          </div>
      </div>

      <div class="nav">
          <label-item v-for="(item, index) in labelList" :info="item" :key="index"></label-item>
      </div>
  </div>
</template>

<script>
    import ajax from '../../api/index'
    import {mapActions} from 'vuex'
    import labelItem from './components/labelItem'
    import onelevelMember from '../../assets/images/1levelMember.png'
    import secondlevelMember from '../../assets/images/2levelMember.png'
    import thirdlevelMember from '../../assets/images/3levelMember.png'
    import fourthlevelMember from '../../assets/images/4levelMember.png'
    export default {
        components: {
            labelItem
        },
        filters: {
            /**
             * 格式化会员卡号
             * @param val
             * @return {string}
             */
            formatCardCode(val) {
                if(!val) return '';
                val = val.toString();
                return val.replace(/(.{4})/g,'$& ');
            }
        },
        data() {
            let labelList = [
                {
                    title: '可用积分',
                    link: '/integralDetail',
                    iconClass: 'icon-my-points',
                    info: '',
                    iconColor: '#F46462'
                },
                {
                    title: '默认账户',
                    link: '/integralDetail',
                    iconClass: 'icon-default-account',
                    info: '',
                    iconColor: '#368CE3'
                },
                {
                    title: '我的订单',
                    link: '/integralDetail',
                    iconClass: 'icon-my-orders',
                    info: '',
                    iconColor: '#FF9700'
                },
                {
                    title: '资金明细',
                    link: '/checkFlow',
                    iconClass: 'icon-check-flow',
                    info: '',
                    iconColor: '#6F62E5'
                },
                {
                    title: '会员二维码',
                    link: '/integralDetail',
                    iconClass: 'icon-member-code',
                    info: '',
                    iconColor: '#F46462'
                },
                {
                    title: '我的卡包',
                    link: '/integralDetail',
                    iconClass: 'icon-my-package',
                    info: '',
                    iconColor: '#368CE3'
                },
                {
                    title: '会员权益',
                    link: '/memberRight',
                    iconClass: 'icon-member-rights',
                    info: '',
                    iconColor: '#6F62E5'
                }/*,
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
            labelList.getByTitle = function(value) {
                for(let i=0,len=labelList.length; i < len; i++) {
                    if(labelList[i].title === value) {
                        return labelList[i];
                    }
                }
            };
            return {
                cardInfo: {},
                bgList: [
                    onelevelMember,
                    secondlevelMember,
                    thirdlevelMember,
                    fourthlevelMember
                ],
                labelList: labelList,
                cardBg: 'url(' + onelevelMember + ')',
                cardLevel: 1,
                lvName: '普通会员',
                //会员卡字体颜色
                cardFontColor: '#fff'
            }
        },
        methods: {
            ...mapActions([
                'setCardInfo'
            ]),
            /**
             * 获取页面数据
             */
            getData() {
                ajax.post('queryMemberPage', {
                    cardId: JSON.parse(sessionStorage.getItem('userInfo')).cardId,
                    pageNo: 1,
                    pageSize: 100
                }).then((res) => {
                    if(res.success) {
                        res.data.data[0].levelNum = 4;
                        //存储会员卡信息
                        sessionStorage.setItem('cardInfo', JSON.stringify(res.data.data[0]));
                        this.setCardInfo(res.data.data[0]);
                        this.cardInfo = res.data.data[0];

                        //初始化页面数据
                        this.labelList.getByTitle('可用积分').info = this.cardInfo.pointBalance;
                        this.labelList.getByTitle('默认账户').info = this.cardInfo.moneyBalance;

                        //获取会员卡配色方案
                        this.setCardTheme(res.data.data[0].levelNum)
                    }else {
                        this.$vux.toast.text(res.message);
                    }
                })
            },
            /**
             * 设置会员卡主题
             */
            setCardTheme(lvVal) {
                if(!lvVal) {
                    this.cardFontColor = "#fff";
                    this.cardBg = 'url(' + this.bgList[0] + ')';
                    this.cardLevel = 1;
                    return;
                }
                lvVal = lvVal.toString();
                switch(lvVal) {
                    case '1':
                        this.cardFontColor = "#fff";
                        this.cardBg = 'url(' + this.bgList[0] + ')';
                        this.cardLevel = 1;
                        this.lvName = '普通会员';
                        break;
                    case '2':
                        this.cardFontColor = "#fff";
                        this.cardBg = 'url(' + this.bgList[1] + ')';
                        this.cardLevel = 2;
                        this.lvName = '黄金会员';
                        break;
                    case '3':
                        this.cardFontColor = "#fff";
                        this.cardBg = 'url(' + this.bgList[2] + ')';
                        this.cardLevel = 3;
                        this.lvName = '铂金会员';
                        break;
                    case '4':
                        this.cardFontColor = "#F0D890";
                        this.cardBg = 'url(' + this.bgList[3] + ')';
                        this.cardLevel = 4;
                        this.lvName = '钻石会员';
                        break;
                }

            }
        },
        created() {
            this.getData();
        },
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .home {
        .member-card {
            position: relative;
            width: 100%;
            height: 167.5px;
            background-size: 100% 100%;

            .card-content {
                position: absolute;
                left: 24px;
                bottom: 0px;
                width: 327-21.2px;
                height: 150px;
                margin-left: 21.2px;

                .person-info {
                    margin-bottom: 30px;
                    margin-top: 21.2px;
                    display: flex;
                    height: 37px;
                    width: 100%;

                    div {
                        width: 50%;
                        height: 100%;
                        &.left {
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
                                height: 100%;
                                line-height: 32.65px;
                                vertical-align: top;
                                font-size: 14px;
                            }
                        }
                        &.right {
                            margin-right: 21.2px;
                            text-align: center;
                            position: relative;

                            .card-level {
                                margin-top: 8px;
                                padding: 0 15px;
                                width: auto;
                                height: 21px;
                                display: inline-block;
                                background-color: rgba(43,44,46,0.1);
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
                        width: 50%;
                        &:first-child {
                            width: auto;
                            white-space: nowrap;
                        }
                        &:last-child {
                            text-align: right;

                            &:last-child {
                                margin-right: 29.5px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
