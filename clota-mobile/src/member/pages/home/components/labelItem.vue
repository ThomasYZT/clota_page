<!--
    主页内部元素
    作者：杨泽涛
-->
<template>
  <div class="label-item">
      <cell :is-link="false"
            v-if="!(cardInfo.cardTypeId === '1' && (info.title === 'integralDetail' || info.title === 'integralMall'))"
            :title="$t(info.title)"
            @click.native="toUrl(info.routeName,info.params)"
            class="cell">
          <i slot="icon"
             :style="{color: info.iconColor}"
             class="icon iconfont"
             :class="info.iconClass"></i>
          <div class="arrow-wrap">
              <span class="info" v-if="info.title ==='accountOfStoreValue'">{{info.info | moneyFilter(2,'','')}}</span>
              <span class="info" v-else-if="info.title ==='integralDetail'">{{info.info | moneyFilter(0,'','')}}</span>
              <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
          </div>
      </cell>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
  export default {
    props : {
        //导航信息
        info : {
            type : Object,
            default () {
                return {};
            },
        },
        //卡信息
        cardInfo : {
            type : Object,
            default () {
                return {};
            },
        }
    },
    data () {
      return {};
    },
    computed : {
        ...mapGetters([
           'userInfo'
        ]),
        //是否设置交易密码
        hasTradePassword () {
            return this.cardInfo.hasTradePassword === 'true' ? true : false;
        }
    },
    methods : {
        /**
         * 页面导航控制
         */
        toUrl (routeName,params) {
            if (this.cardInfo.status && this.cardInfo.status === 'frozen' && this.info.link === '/memberCode') {
                this.$vux.toast.text(this.$t('thisCardIsFrozen'));
            } else if (!this.hasTradePassword && this.info.link === '/memberCode') {
                this.$vux.toast.text(this.$t('pleaseSetTradePass'));
                this.$router.push({
                    name : 'changeTradePass',
                    params : {
                        mobile : this.userInfo.phoneNum
                    }
                });
            } else {
                if (params && Object.keys(params).length > 0) {
                    this.$router.push({ name : routeName, query : params });
                } else {
                    this.$router.push({ name : routeName });
                }
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
