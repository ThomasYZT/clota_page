<!--边框头部组件-->

<template>
  <div class="frame-header">
    <div class="company-log" :class="{'pack-up' : menuIsPackUp}">
      clot 的logo
    </div>
    <div class="shrink">
      <span
        class="iconfont"
        @click="shrinkMenu"></span>
    </div>
    <!--导航区域-->
    <div class="navigation-wrap">
      <div class="navigate_before">
        <i  class="ivu-icon ivu-icon-ios-arrow-forward"></i>
      </div>
      <ul class="navigation">
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
        <li class="sub-menu active">
          工作台
          <span class="bar"></span>
        </li>
      </ul>
      <div class="navigate_next">
        <i  class="ivu-icon ivu-icon-ios-arrow-forward"></i>
      </div>
    </div>
    <div class="menu-li">
      <Menu mode="horizontal" active-name="1">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-stats" />
            <div class="avator"></div>
            Admin
          </template>
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </Submenu>
      </Menu>
    </div>
    <ul class="icon-li">
      <li class="icon">
        <i  class="ivu-icon ivu-icon-logo-apple" ></i>
      </li>
      <li class="icon">
        <i  class="ivu-icon ivu-icon-logo-apple" ></i>
      </li>
      <li class="icon">
        <i  class="ivu-icon ivu-icon-logo-apple" ></i>
      </li>
    </ul>
    <div class="lang-change">
      <span class="lang" :class="{'active' : lang === 'zh-CN'}" @click="setLang('zh-CN')">中文</span>
      <span class="xg">/</span>
      <span class="lang" :class="{'active' : lang === 'en'}" @click="setLang('en')">En</span>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {}
        },
        methods: {
          /**
           * 收起或展开左侧菜单
           */
          shrinkMenu () {
            this.$store.commit('updateMenuIsPackUp', !this.menuIsPackUp);
          },
          /**
           * 设置语言
           * @param lang
           */
          setLang (lang) {
            this.$store.commit('setLang', lang);
          }
        },
        computed : {
          ...mapGetters({
            menuIsPackUp: 'menuIsPackUp',
            lang: 'lang',
          }),
        }
    }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/base';
  .frame-header{
    display: flex;
    @include block_outline($height : 60px);

    .company-log{
      @include block_outline($width : 200px,$height : 60px);
      color: $color_fff;
      text-align: center;
      float: left;
      transition: all 0.3s;

      &.pack-up{
        width: 45px!important;
        transition: all 0.3s;
      }
    }

    .shrink{
      @include block_outline(100px);

      .iconfont{
        margin-top: 25px;
        @include block_outline(20px,13px,false);
        background: red;
        cursor: pointer;
      }
    }

    .navigation-wrap{
      display: flex;
      flex: 1;
      overflow: hidden;

      .navigate_next{
        @include block_outline($width : 77px);
        border-left: 1px solid rgba(255,255,255,0.10);
        box-shadow: -1px 0 2px 0 rgba(255,255,255,0.20);

        .ivu-icon{
          font-size: 30px;
          margin:16px 0 0 10px;
          color: rgba($color_fff,0.2);
        }
      }

      .navigate_before{
        @include block_outline($width : 30px);
        border-right: 1px solid rgba(255,255,255,0.10);
        box-shadow: 1px 0 2px 0 rgba(255,255,255,0.20);

        .ivu-icon{
          font-size: 30px;
          margin:16px 0 0 10px;
          color: rgba($color_fff,0.2);
        }
      }

      .navigation{
        padding-left: 10px;
        white-space: nowrap;
        overflow-x:auto;
        flex: 1;
        height: 70px;

        .sub-menu{
          display: inline-block;
          @include block_outline(auto);
          font-size: $font_size_16px;
          color: rgba($color_fff,0.6);
          line-height: 60px;
          margin: 0 20px;
          cursor: pointer;

          .bar{
            display: none;
          }

          &.active{
            color: $color_fff;
            position: relative;

            .bar{
              display: inline-block;
              @include block_outline($height : 4px);
              border-radius: 2px;
              background: $color_fff;
              @include absolute_pos(absolute,$top : 46px,$left : 0);
            }
          }

          &:nth-of-type(1){
            margin-left: 0;
          }
        }
      }
    }

    .menu-li{
      position: relative;
      @include block_outline(auto,100%);

      .avator{
        @include block_outline(30px,30px);
        @include absolute_pos(absolute,17px,$left :-30px);
        background: red;
        border-radius: 30px;

        img{
          @include block_outline($is_block : false);
          border-radius: 30px;
        }
      }

      /deep/ .ivu-menu{
        height: 100%;
        background: transparent;

        .ivu-menu-submenu{
          color: $color_fff;
        }

        .ivu-menu-submenu-title{
          margin-top: 3px;
        }
      }

      /deep/ .ivu-menu-horizontal.ivu-menu-light:after{
        display: none;
      }
    }

    .icon-li{
      overflow: hidden;
      padding: 23px 20px 23px 0;
      display: inline-block;
      @include block_outline(auto,100%);

      .icon{
        float: left;
        @include block_outline(18px,16px);
        background: red;
        margin: 0 9px;

        &:nth-of-type(1){
          margin-left: 0;
        }
      }
    }

    .lang-change{
      position: relative;
      @include block_outline($width : 118px);
      padding: 18px 20px 20px 20px;
      font-size: $font_size_16px;
      color: $color_lang_color;
      cursor: pointer;

      &::before{
        display: block;
        content : '';
        @include block_outline(2px,20px);
        @include absolute_pos(absolute,20px,auto,auto,0);
        background: $color_669ad5;
      }

      .xg{
        padding: 0 3px;
      }

      .lang{

        &.active{
          color: $color_fff;
        }
      }
    }
  }
</style>
