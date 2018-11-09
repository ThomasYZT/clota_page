<!--
    主页内部元素
    作者：杨泽涛
-->
<template>
  <div class="label-item">
      <cell :is-link="false"
            v-if="!(cardInfo.cardTypeId === '1' && (info.title === 'integralDetail' || info.title === 'integralMall'))"
            :title="$t(info.title)"
            @click.native="toUrl(info.link,info.params)"
            class="cell">
          <i slot="icon"
             :style="{color: info.iconColor}"
             class="icon iconfont"
             :class="info.iconClass"></i>
          <div class="arrow-wrap">
              <span class="info" v-if="info.title ==='defaultAccount'">{{info.info | moneyFilter(2,'','')}}</span>
              <span class="info" v-if="info.title ==='integralDetail'">{{info.info | moneyFilter(0,'','')}}</span>
              <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
          </div>
      </cell>
  </div>
</template>

<script>

  export default {
    props : {
        //导航信息
        info : {
            type : Object,
            default () {
                return {}
            },
        },
        //卡信息
        cardInfo : {
            type : Object,
            default () {
                return {}
            },
        }
    },
    data () {
      return {};
    },
    methods : {
        /**
         * 页面导航控制
         */
        toUrl (url,params) {
            if (params && Object.keys(params).length > 0) {
                this.$router.push({ path : url, query : params });
            } else {
                this.$router.push({ path : url });
            }
        }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';
    .label-item{

        /deep/ .weui-cell{
            height: 50px;
            line-height: 50px;
        }

        .icon{
            display: inline-block;
            float: left;
        }
    }
</style>
