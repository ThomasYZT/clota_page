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
          <cell is-link
                title="可用积分"
                link="/component/tabbar-simple"
                class="cell">
              <i slot="icon"
                    style="color:#F46462"
                    class="icon iconfont icon-my-points"></i>
              <div class="arrow-wrap">
                  <span class="info">2789</span>
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link
                title="默认账户"
                link="/component/tabbar-icon"
                class="cell">
              <i slot="icon"
                    style="color: #368CE3"
                    class="icon iconfont icon-default-account"></i>
              <div class="arrow-wrap">
                  <span class="info">278939.63元</span>
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link
                title="我的订单"
                link="/component/tabbar-simple"
                class="cell">
              <i slot="icon"
                    style="color: #FF9700"
                    class="icon iconfont icon-my-orders"></i>
              <div class="arrow-wrap">
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link
                title="资金明细"
                link="/component/tabbar-icon"
                class="cell">
              <i slot="icon"
                    style="color: #6F62E5"
                    class="icon iconfont icon-check-flow"></i>
              <div class="arrow-wrap">
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link
                title="会员二维码"
                link="/component/tabbar-simple"
                class="cell">
              <i slot="icon"
                    style="color: #F46462"
                    class="icon iconfont icon-member-code"></i>
              <div class="arrow-wrap">
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link
                title="我的卡包"
                link="/component/tabbar-icon"
                class="cell">
              <i slot="icon"
                    style="color:#368CE3"
                    class="icon iconfont icon-my-package"></i>

              <div class="arrow-wrap">
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link
                title="会员权益"
                link="/component/tabbar-simple"
                class="cell">
              <i slot="icon"
                    style="color:#6F62E5"
                    class="icon iconfont icon-member-rights"></i>

              <div class="arrow-wrap">
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link
                title="安全设置"
                link="/component/tabbar-icon"
                class="cell">
              <i slot="icon"
                    style="color:#F46462"
                    class="icon iconfont icon-security-setting"></i>

              <div class="arrow-wrap">
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
      </div>
  </div>
</template>

<script>
    import onelevelMember from '../../assets/images/1levelMember.png'
    import secondlevelMember from '../../assets/images/2levelMember.png'
    import thirdlevelMember from '../../assets/images/3levelMember.png'
    import fourthlevelMember from '../../assets/images/4levelMember.png'
  export default {
    components: {},
    data() {
      return {
          bgList: [
              onelevelMember,
              secondlevelMember,
              thirdlevelMember,
              fourthlevelMember
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

        .nav {
            .cell {
                height: 60px;
                font-size: 14px;

                &:last-child {
                    &:after {
                        content: " ";
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        height: 0.026667rem;
                        border-top: 0.026667rem solid #D9D9D9;
                        color: #D9D9D9;
                        transform-origin: 0 0;
                        transform: scaleY(0.5);
                        left: 0.4rem;
                    }
                }
            }



            i.icon {
                font-size: 19px;
                margin-right: 16.25px;
            }

            .arrow-wrap {
                text-align: right;

                .info {
                    color: #353B48;
                    margin-right: 10px;
                }
            }
        }
    }
</style>
