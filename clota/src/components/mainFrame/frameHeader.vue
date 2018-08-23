<!--边框头部组件-->

<template>
    <div class="frame-header">
        <div class="company-log" :class="{'pack-up' : menuIsPackUp}">
            <img src="../../assets/images/icon-logo-small.svg" class="logo-img" alt="">
        </div>
        <div class="shrink">
      <span
          class="iconfont"
          :class="{'icon-icon-unfold' : !menuIsPackUp,'icon-icon-pack-up' : menuIsPackUp}"
          @click="shrinkMenu"></span>
        </div>
        <!--导航区域-->
        <div class="navigation-wrap">
            <div class="navigate_before">
                <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
            </div>
            <!--一级菜单-->
            <div class="nav-scroll">
                <div class="navigation">
                    <div class="sub-menu"
                         :class="{'active' : activeMenu === item.meta.menuName}"
                         v-for="(item,index) in menuList" :key="index"
                         @click="toTopMenu(item)">
                        {{$t(`${item.meta.menuName}`)}}
                        <span class="bar"></span>
                    </div>
                </div>
            </div>
            <div class="navigate_next">
                <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
            </div>
        </div>
        <div class="menu-li">
            <Menu mode="horizontal" @on-select="menuChange">>
                <Submenu name="1">
                    <template slot="title">
                        <div class="avator">
                            <img class="avator-class" src="../../assets/images/icon-avator.png" alt="">
                        </div>
                        Admin
                    </template>
                    <MenuItem v-for="(item,i) in accountOperations"
                              :name="item.name"
                              :key="i">{{item.label}}</MenuItem>
                </Submenu>
            </Menu>
        </div>
        <ul class="icon-li">
            <li class="icon">
                <span class="iconfont icon-notification-w"></span>
            </li>
            <li class="icon">
                <span class="iconfont icon-help"></span>
            </li>
            <li class="icon">
                <span class="iconfont icon-theme"></span>
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
    import {mapGetters} from 'vuex'
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';

    export default {
        data() {
            return {
                //账户操作列表
                accountOperations : [
                    {
                        name : 'logout',
                        label : this.$t('logout')
                    }
                ]
            }
        },
        methods: {
            /**
             * 收起或展开左侧菜单
             */
            shrinkMenu() {
                this.$store.commit('updateMenuIsPackUp', !this.menuIsPackUp);
            },
            /**
             * 设置语言
             * @param lang
             */
            setLang(lang) {
                this.$store.commit('setLang', lang);
            },
            /**
             * 跳转到对应的一级菜单
             * @param data
             */
            toTopMenu(data) {
                this.$router.push({path: data.path});
            },
            /**
             * 当个人的账号操作改变时
             * @param name
             */
            menuChange (name) {
                if(name === 'logout'){
                    this.logOut();
                }else if(name === 'personalCenter'){
                    this.$router.push({
                        name : 'person'
                    });
                }
            },
            /**
             * 退出登录
             */
            logOut () {
                common.loginOut();
            }
        },
        computed: {
            ...mapGetters({
                menuIsPackUp: 'menuIsPackUp',
                lang: 'lang',
                routerInfo: 'routerInfo'
            }),
            //当前激活的菜单
            activeMenu() {
                if(this.$route && this.$route.meta && this.$route.meta.rightPath){
                    return this.$route.meta.rightPath.split('.')[0];
                }else{
                    return '';
                }
                // if (this.$route && this.$route.meta) {
                //     return this.$route.meta.lightMenu;
                // } else {
                //     return '';
                // }
            },
            //菜单列表
            menuList () {
                let routerInfo = defaultsDeep([],this.routerInfo);
                if (routerInfo) {
                    return routerInfo.filter(item => {
                        //判断是否需要显示二级菜单
                        if(item.children && item.children.length > 0){
                            item.children = item.children.filter(list => list.meta && list.meta.showInMenu === true);
                        }else{
                            item.children = [];
                        }
                        item.showSubMenu = false;
                        //有路由名字需要判断路由名字和meta信息里面的_name是否相同，
                        if (item.name) {
                            return item.name === item.meta._name;
                        }else{
                            //没有路由名字的都是一级路由，需要显示菜单
                            return  item.path !== '*'
                        }
                    })
                } else {
                    return [];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/base';

    .frame-header {
        display: flex;
        @include block_outline($height: 60px);

        .company-log {
            @include block_outline($width: 200px, $height: 60px);
            color: $color_fff;
            text-align: center;
            float: left;
            transition: all 0.3s;

            &.pack-up {
                width: 45px !important;
                transition: all 0.3s;

                .logo-img {
                    display: none !important;
                }
            }

            .logo-img {
                @include block_outline(140px, 26px, false);
                margin: 18px 0 0 34px;
            }
        }

        .shrink {
            @include block_outline(50px);

            .iconfont {
                margin-top: 20px;
                @include block_outline(20px, 13px, false);
                cursor: pointer;
                color: $color_fff;
                font-size: $font_size_15px;

                &.icon-icon-unfold {
                    transition: all 0.5s;
                }
            }
        }

        .navigation-wrap {
            display: flex;
            flex: 1;
            overflow: hidden;

            .navigate_next {
                @include block_outline($width: 77px);
                border-left: 1px solid rgba(255, 255, 255, 0.10);
                box-shadow: -1px 0 2px 0 rgba(255, 255, 255, 0.20);

                .ivu-icon {
                    font-size: 30px;
                    margin: 16px 0 0 10px;
                    color: rgba($color_fff, 0.2);
                }
            }

            .navigate_before {
                @include block_outline($width: 30px);
                border-right: 1px solid rgba(255, 255, 255, 0.10);
                box-shadow: 1px 0 2px 0 rgba(255, 255, 255, 0.20);

                .ivu-icon {
                    font-size: 30px;
                    margin: 16px 0 0 10px;
                    color: rgba($color_fff, 0.2);
                }
            }

            .nav-scroll {
                position: relative;
                padding-left: 10px;
                flex: 1;
                overflow: hidden;

                .navigation {
                    white-space: nowrap;
                    overflow-x: auto;
                    height: 70px;
                    position: absolute;

                    .sub-menu {
                        display: inline-block;
                        @include block_outline(auto);
                        font-size: $font_size_16px;
                        color: rgba($color_fff, 0.6);
                        line-height: 60px;
                        margin: 0 20px;
                        cursor: pointer;

                        .bar {
                            display: none;
                        }

                        &.active {
                            color: $color_fff;
                            position: relative;

                            .bar {
                                display: inline-block;
                                @include block_outline($height: 4px);
                                border-radius: 2px;
                                background: $color_fff;
                                @include absolute_pos(absolute, $top: 46px, $left: 0);
                            }
                        }

                        &:nth-of-type(1) {
                            margin-left: 0;
                        }
                    }
                }
            }
        }

        .menu-li {
            position: relative;
            @include block_outline(auto, 100%);

            .avator {
                @include block_outline(30px, 30px);
                @include absolute_pos(absolute, 17px, $left: -30px);
                border-radius: 30px;

                .avator-class {
                    @include block_outline($is_block: false);
                    border-radius: 30px;
                }
            }

            /deep/ .ivu-menu {
                height: 100%;
                background: transparent;

                .ivu-menu-submenu {
                    color: $color_fff;
                }

                .ivu-menu-submenu-title {
                    margin-top: 3px;
                    margin-left: 10px;
                }
            }

            /deep/ .ivu-menu-horizontal.ivu-menu-light:after {
                display: none;
            }
        }

        .icon-li {
            overflow: hidden;
            padding: 18px 20px 23px 0;
            display: inline-block;
            @include block_outline(auto, 100%);

            .icon {
                float: left;
                @include block_outline(18px, 16px);
                margin: 0 9px;

                &:nth-of-type(1) {
                    margin-left: 0;
                }

                .iconfont {
                    color: $color_fff;
                }
            }
        }

        .lang-change {
            position: relative;
            @include block_outline($width: 118px);
            padding: 18px 20px 20px 20px;
            font-size: $font_size_16px;
            color: $color_lang_color;
            cursor: pointer;

            &::before {
                display: block;
                content: '';
                @include block_outline(2px, 20px);
                @include absolute_pos(absolute, 20px, auto, auto, 0);
                background: $color_669ad5;
            }

            .xg {
                padding: 0 3px;
            }

            .lang {

                &.active {
                    color: $color_fff;
                }
            }
        }
    }
</style>
