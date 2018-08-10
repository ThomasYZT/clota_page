<!--mainframe头部框架-->

<template>
    <div class="main-header">
        <div class="company-logo">
            <img src="../../assets/images/icon-logo.svg" class="logo-class" alt="">
        </div>
        <div class="menu-info">
            <ul class="menu-list">
                <li class="menu" v-for="item in menuList">
            <span class="menu-span"
                  :class="{'active' : item.meta.lightMenu === activeMenu}"
                  @click="toTopMenu(item)">
              {{$t(item.meta.menuName)}}
            </span>
                </li>
            </ul>
        </div>
        <div class="operation">
            <span class="iconfont icon-help"></span>
            <div class="menu-li">
                <Menu mode="horizontal">
                    <Submenu name="1">
                        <template slot="title">
                            <div class="avator">
                                <img class="avator-class" src="../../assets/images/icon-avator.png" alt="">
                            </div>
                            Admin
                        </template>
                        <MenuItem name="3-1">新增和启动</MenuItem>
                        <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem>
                    </Submenu>
                </Menu>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {}
        },
        methods: {
            /**
             * 跳转到对应的菜单
             * @param data
             */
            toTopMenu(data) {
                this.$router.push({path: data.path});
            }
        },
        computed: {
            ...mapGetters({
                routerInfo: 'routerInfo'
            }),
            //当前激活的菜单
            activeMenu() {
                if (this.$route && this.$route.meta) {
                    return this.$route.meta.lightMenu;
                } else {
                    return '';
                }
            },
            //菜单列表，排除挂靠在其它路由下的路由
            menuList() {
                if (this.routerInfo) {
                    return this.routerInfo.filter(item => {
                        //有路由名字需要判断路由名字和meta信息里面的_name是否相同，
                        if (item.name) {
                            return item.name === item.meta._name;
                        }else if(item.path === '*'){
                            return false;
                        } else {//没有路由名字的都是一级路由，需要显示菜单
                            return true;
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
            @include block_outline(unquote('calc(100% - 400px)'));
            text-align: center;

            .menu-list {
                display: inline-block;
                @include block_outline(auto);

                .menu {
                    @include block_outline(100px);
                    display: inline-block;
                    float: left;
                    padding: 15px 0 12px 0;
                    line-height: 29px;
                    font-size: $font_size_14px;
                    color: rgba($color_fff, 0.6);
                    text-align: center;
                    list-style: none;

                    .menu-span {
                        @include block_outline($is_block: false);
                        cursor: pointer;

                        &.active {
                            background: rgba($color_000, 0.20);
                            border-radius: 100px;
                        }
                    }
                }
            }
        }

        .operation {
            float: left;
            @include block_outline(200px);

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
                margin-top: 17px;
                border-right: 0;
                float: left;
            }
        }
    }
</style>
