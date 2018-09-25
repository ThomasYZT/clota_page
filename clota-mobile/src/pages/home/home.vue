<!--
    会员主页
    作者：杨泽涛
-->
<template>
  <div class="home">
      <div class="member-card">
          <div class="card-content">
              <div class="person-info">
                  <div class="left">
                      <div class="img-wrapper">
                          <img class="default-face" src="../../assets/images/defaut-face.png" alt="">
                      </div>
                      <span class="username">{{'刘木子  '}}></span>
                  </div>
                  <div class="right"></div>
              </div>

              <div class="company-info">
                  <span>{{'北京欢乐谷景区'}}</span>
                  <img src="" alt="">
              </div>

              <div class="card-info">
                  <div>{{'8799  7493  6102'}}</div>
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
    import labelItem from './components/labelItem'
    import onelevelMember from '../../assets/images/1levelMember.png'
    import secondlevelMember from '../../assets/images/2levelMember.png'
    import thirdlevelMember from '../../assets/images/3levelMember.png'
    import fourthlevelMember from '../../assets/images/4levelMember.png'
  export default {
    components: {
        labelItem
    },
    data() {
      return {
          bgList: [
              onelevelMember,
              secondlevelMember,
              thirdlevelMember,
              fourthlevelMember
          ],
          labelList: [
              {
                  title: '可用积分',
                  link: '/integralDetail',
                  iconClass: 'icon-my-points',
                  info: '2789',
                  iconColor: '#F46462'
              },
              {
                  title: '默认账户',
                  link: '/integralDetail',
                  iconClass: 'icon-default-account',
                  info: '278939.63',
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
                  link: '/integralDetail',
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
          ]
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .home {
        .member-card {
            position: relative;
            width: 100%;
            height: 167.5px;
            background: url('../../assets/images/4levelMember.png');
            background-size: 100% 100%;

            .card-content {
                position: absolute;
                left: 24px;
                bottom: 0px;
                width: 327-21.2px;
                height: 150px;
                margin-left: 21.2px;
                color: #F0D890;

                .person-info {
                    margin-bottom: 30px;
                    margin-top: 21.2px;
                    display: flex;
                    height: 37px;
                    width: 100%;

                    div {
                        width: 50%;
                        height: 100%;
                        &:first-child {

                            .img-wrapper {
                                display: inline-block;
                                position: relative;
                                width: 37px;
                                border-radius: 50%;
                                background-color: #3D3B36;

                                img.default-face {
                                    position: absolute;
                                    margin-right: 12px;
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
                        &:last-child {
                            margin-right: 21.2px;
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
