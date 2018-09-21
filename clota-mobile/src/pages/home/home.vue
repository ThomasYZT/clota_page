<!--
    会员主页
    作者：杨泽涛
-->
<template>
  <div class="home">
      <div class="member-card">
          <img src="" alt="">
      </div>

      <div class="nav">
          <cell is-link title="可用积分" value=">" link="/component/tabbar-simple">
              <i slot="icon"
                    style="color:#F46462"
                    class="icon iconfont icon-my-points"></i>
              <div class="arrow-wrap">
                  <span class="info">2789</span>
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link title="默认账户" link="/component/tabbar-icon">
              <i slot="icon"
                    style="color: #368CE3"
                    class="icon iconfont icon-default-account"></i>
              <div class="arrow-wrap">
                  <span class="info">278939.63元</span>
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link title="我的订单" link="/component/tabbar-simple">
              <i slot="icon"
                    style="color: #FF9700"
                    class="icon iconfont icon-my-orders"></i>
              <div class="arrow-wrap">
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link title="资金明细" link="/component/tabbar-icon">
              <i slot="icon"
                    style="color: #6F62E5"
                    class="icon iconfont icon-check-flow"></i>
              <div class="arrow-wrap">
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link title="会员二维码" link="/component/tabbar-simple">
              <i slot="icon"
                    style="color: #F46462"
                    class="icon iconfont icon-member-code"></i>
              <div class="arrow-wrap">
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link title="我的卡包" link="/component/tabbar-icon">
              <i slot="icon"
                    style="color:#368CE3"
                    class="icon iconfont icon-my-package"></i>

              <div class="arrow-wrap">
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link title="会员权益" link="/component/tabbar-simple">
              <i slot="icon"
                    style="color:#6F62E5"
                    class="icon iconfont icon-member-rights"></i>

              <div class="arrow-wrap">
                  <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
              </div>
          </cell>
          <cell is-link title="安全设置" link="/component/tabbar-icon">
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

  export default {
    components: {},
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .home {
        .nav {
            margin-top: 20px;

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
