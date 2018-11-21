<!--mainframe头部框架-->

<template>
    <div class="main-header">
        <div class="company-logo">
            <img src="../../assets/images/icon-logo.svg" class="logo-class" alt="">
        </div>
        <div class="menu-info">
            <ul class="menu-list">
                <li class="menu"
                    v-for="(item,i) in menuList"
                    :key="i"
                    :class="{'with-sub-menu' : item.children && item.children.length > 0}"
                    @mouseover="showMenu(i)"
                    @mouseout="hideMenu(i)">
                    <span class="menu-span"
                          :class="{'active' : item.meta.lightMenu === activeMenu}"
                          @click="toTopMenu(item)">
                      {{$t(item.meta.menuName)}}
                    </span>
                    <!--二级菜单-->
                    <ul class="sub-menu"  v-if="menuShowList[i] && item.children && item.children.length > 0">
                        <li class="sub-menu-list"
                            v-for="(list,k) in item.children"
                            :key="k"
                            :class="{'active' : $route.meta.subMenuType === list.meta.subMenuType}"
                            @click="toSubMenu(list,i)">
                            {{$t(list.meta.menuName)}}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="operation">
            <div class="menu-li">
                <Menu mode="horizontal" @on-select="menuChange">
                    <Submenu name="1">
                        <template slot="title">
                            <div class="avator">
                                <img class="avator-class" src="../../assets/images/icon-avator.png" alt="">
                            </div>
                            {{userInfo.name}}
                        </template>
                        <MenuItem v-for="(item,i) in accountOperations"
                                  :name="item.name"
                                  :key="i">{{item.label}}</MenuItem>
                    </Submenu>
                </Menu>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';

    export default {
        data () {
            return {
                //二级菜单是否显示标志结合
                menuShowList : [],
                //账户操作列表
                accountOperations : [
                    {
                        name : 'personalCenter',
                        label : this.$t('personalCenter')
                    },
                    {
                        name : 'logout',
                        label : this.$t('logout')
                    }
                ]
            };
        },
        methods : {
            /**
             * 跳转到对应的菜单
             * @param data
             */
            toTopMenu (data) {
                if (data.children && data.children.length > 0) return false;
                this.$router.push({ path : data.path },() => {
                    sessionStorage.clear();
                });
            },
            /**
             * 跳转到对应的二级菜单
             * @param data
             */
            toSubMenu (data,i) {
                this.$router.push({ path : data.path },() => {
                    sessionStorage.clear();
                });
                this.$set(this.menuShowList,i,false);
            },
            /**
             * 显示菜单
             * @param i
             */
            showMenu (i) {
                this.$set(this.menuShowList,i,true);
            },
            /**
             * 隐藏菜单
             * @param i
             */
            hideMenu (i) {
                this.$set(this.menuShowList,i,false);
            },
            /**
             * 退出登录
             */
            logOut () {
                common.loginOut();
            },
            /**
             * 当个人的账号操作改变时
             * @param name
             */
            menuChange (name) {
                if (name === 'logout') {
                    this.logOut();
                } else if (name === 'personalCenter') {
                    this.$router.push({
                        name : 'person'
                    });
                }
            }
        },
        computed : {
            ...mapGetters({
                routerInfo : 'routerInfo',
                userInfo : 'userInfo'
            }),
            //当前激活的菜单
            activeMenu () {
                if (this.$route && this.$route.meta) {
                    return this.$route.meta.lightMenu;
                } else {
                    return '';
                }
            },
            //菜单列表，排除挂靠在其它路由下的路由
            menuList () {
                let routerInfo = defaultsDeep([],this.routerInfo);
                if (routerInfo) {
                    return routerInfo.filter(item => {
                        //判断是否需要显示二级菜单
                        if (item.children && item.children.length > 0) {
                            let children = item.children.filter(list => list.meta && list.meta.showInMenu === true);
                            item.children = children;
                        } else {
                            item.children = [];
                        }
                        item.showSubMenu = false;
                        //有路由名字需要判断路由名字和meta信息里面的_name是否相同，
                        if (item.name) {
                            return item.name === item.meta._name;
                        } else {
                            //没有路由名字的都是一级路由，需要显示菜单
                            return item.path !== '*';
                        }
                    });
                } else {
                    return [];
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .main-header {
        @include block_outline($height: 56px);
        background-image: linear-gradient(90deg, #012F84 0%, #0294D7 100%);
        box-shadow: 0 4px 8px 0 rgba(40, 84, 166, 0.20);

        .company-logo {
            @include block_outline(200px);
            float: left;

            .logo-class {
                @include block_outline();
                padding-left: 100px;
            }
        }

        .menu-info {
            float: left;
            @include block_outline(unquote('calc(100% - 360px)'));
            text-align: center;

            .menu-list {
                display: inline-block;
                @include block_outline(auto);

                .menu {
                    @include block_outline(120px);
                    display: inline-block;
                    float: left;
                    padding: 15px 0 12px 0;
                    line-height: 29px;
                    font-size: $font_size_14px;
                    color: rgba($color_fff, 0.6);
                    text-align: center;
                    list-style: none;
                    transition: all 0.5s;

                   &.with-sub-menu{
                       min-width: 120px;
                       width: max-content;
                       transition: all 0.5s;

                       &:hover{
                           background: $color_004B88;

                           .menu-span{
                               background: transparent!important;
                           }
                       }
                   }

                    &:hover .menu-span{
                        background: rgba($color_000, 0.20);
                        border-radius: 100px;
                        transition: all 0.5s;
                    }

                    .menu-span {
                        @include block_outline($is_block: false);
                        cursor: pointer;

                        &.active {
                            background: rgba($color_000, 0.20);
                            border-radius: 100px;
                        }
                    }

                    &:hover .sub-menu{
                        position: relative;
                        z-index: 99999;
                        display: block;
                        transition: all 0.3s;
                    }

                    .sub-menu{
                        min-width: 100%;
                        /*display: none;*/
                        z-index: 99;
                        @include block_outline(max-content,auto);
                        @include absolute_pos(relative,$top : 12px);
                        background: $color_004B88;
                        transition: all 0.3s;
                        padding: 12px 0 22px 0;
                        border-radius: 0 0 4px 4px;

                        .sub-menu-list{
                            @include block_outline($height : 35px);
                            line-height: 20px;
                            padding: 7.5px;
                            font-size: $font_size_12px;
                            color: rgba($color_fff,0.5);
                            text-align: center;
                            cursor: pointer;

                            &.active,
                            &:hover{
                                color: $color_fff;
                            }
                        }
                    }
                }
            }
        }

        .operation {
            float: left;
            @include block_outline(160px);

            .menu-li {
                display: inline-block;
                position: relative;
                padding-left: 40px;
                padding-top: 15px;
                padding-bottom: 15px;
                @include block_outline(160px, 100%);

                .avator {
                    @include block_outline(30px, 30px);
                    @include absolute_pos(absolute, 0, $left: -30px);
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
                        color: rgba($color_fff, 0.8);
                    }
                }
                /deep/ .ivu-menu-horizontal {
                    line-height: 26px !important;

                    &.ivu-menu-light:after {
                        display: none;
                    }
                }

                /deep/ .ivu-menu-submenu {
                    padding: 0 10px !important;
                }
            }

            .icon-help {
                width: 40px;
                font-size: $font_size_18px;
                color: $color_B3D5EB;
                margin-top: 20px;
                border-right: 0;
                float: left;
            }
        }

        /deep/ .ivu-select-dropdown{
            z-index: 9999;
        }
    }
</style>
