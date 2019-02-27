<!--边框头部组件-->

<template>
    <div class="frame-header">
        <div class="company-log" :class="{'pack-up' : menuIsPackUp}">
            <img src="../../assets/images/icon-logo-small.svg" class="logo-img" alt="">
        </div>
        <div class="shrink">
      <span
          v-if="hasSidebar"
          class="iconfont"
          :class="{'icon-icon-unfold' : !menuIsPackUp,'icon-icon-pack-up' : menuIsPackUp}"
          @click="shrinkMenu"></span>
        </div>
        <!--导航区域-->
        <div class="navigation-wrap">
            <!--一级菜单-->
            <idler-wheel-tap>
                <div slot="before" class="navigate_before" slot-scope="row">
                    <i class="ivu-icon ivu-icon-ios-arrow-forward" @click="row.toLeft()"></i>
                </div>
                <div class="sub-menu"
                     :class="{'active' : activeMenu === item.meta.menuName}"
                     v-for="(item,index) in menuList" :key="index"
                     @click="toTopMenu(item)">
                    {{$t(`${item.meta.menuName}`)}}
                    <span class="bar"></span>
                </div>
                <div slot="next" class="navigate_next" slot-scope="row">
                    <i class="ivu-icon ivu-icon-ios-arrow-forward" @click="row.toRight()"></i>
                </div>
            </idler-wheel-tap>
        </div>
        <div class="menu-area">

            <ul class="icon-li">
                <li class="icon">
                    <span class="iconfont icon-notification-w"></span>
                </li>
                <li class="icon" v-clickoutside="closeOperate">
                    <span class="iconfont icon-gengduo"
                          @click="toggleOperateLine"
                          :class="{'is-reverse' : operateLine}"></span>
                </li>
            </ul>
            <div class="org-info" @click="toggleOrgStatus" v-clickoutside="closeTree">
                <span class="org-name" v-w-title="manageOrgs.orgName">{{manageOrgs.orgName}}</span>
                <span v-if="manageOrgList.length > 1" class="iconfont icon-down"></span>
            </div>
            <transition name="fade">
                <org-tree v-if="orgTreeShow" @hide-tree="orgTreeShow = false">
                </org-tree>
            </transition>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';
    import orgTree from './orgTree';
    import idlerWheelTap from '../idlerWheelTap/index';

    export default {
        components : {
            orgTree,
            idlerWheelTap
        },
        data () {
            return {
                //是否显示集团组织树
                orgTreeShow : false,
            };
        },
        methods : {
            /**
             * 收起或展开左侧菜单
             */
            shrinkMenu () {
                this.$store.commit('updateMenuIsPackUp', !this.menuIsPackUp);
            },
            /**
             * 跳转到对应的一级菜单
             * @param {*} data
             */
            toTopMenu (data) {
                this.$router.push({ path : data.path });
            },
            /**
             * 退出登录
             */
            logOut () {
                common.loginOut();
            },
            /**
             * 切换组织树的显示状态
             */
            toggleOrgStatus () {
                if (this.isLoading || this.manageOrgList.length <= 1) return;
                this.orgTreeShow = !this.orgTreeShow;
            },
            /**
             * 关闭组织树
             */
            closeTree () {
                this.orgTreeShow = false;
            },
            /**
             * 切换右侧操作栏状态
             */
            toggleOperateLine () {
                this.$store.commit('changeOperateLine',!this.operateLine);
            },
            /**
             * 关闭右侧操作栏
             */
            closeOperate () {
                this.$store.commit('changeOperateLine',false);
            },

        },
        computed : {
            ...mapGetters({
                menuIsPackUp : 'menuIsPackUp',
                lang : 'lang',
                routerInfo : 'routerInfo',
                operateLine : 'operateLine',
                manageOrgs : 'manageOrgs',
                isLoading : 'isLoading',
                manageOrgList : 'manageOrgList',
            }),
            //当前激活的菜单
            activeMenu () {
                if (this.$route && this.$route.meta && this.$route.meta.rightPath) {
                    return this.$route.meta.rightPath.split('.')[0];
                } else {
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
                        // if (item.children && item.children.length > 0) {
                        //     item.children = item.children.filter(list => list.meta && list.meta.isMenu === true);
                        // } else {
                        //     item.children = [];
                        // }
                        // item.showSubMenu = false;
                        return item.meta && item.meta.isMenu;
                        //有路由名字需要判断路由名字和meta信息里面的_name是否相同，
                        // if (item.name) {
                        //     return item.name === item.meta._name;
                        // }else{
                        //     //没有路由名字的都是一级路由，需要显示菜单
                        //     return  item.path !== '*'
                        // }
                    });
                } else {
                    return [];
                }
            },
            //是否有侧边栏导航
            hasSidebar () {
                if (this.$route && this.$route.meta) {
                    if (this.$route.meta.hasSideBar === false) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            },
        },
        mounted () {
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/base';

    .frame-header {
        display: flex;
        @include block_outline($height: 60px);
        z-index: 99;
        position: relative;

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

            .navigate_before,
            .navigate_next {
                cursor: pointer;

                .ivu-icon {
                    font-size: 30px;
                    padding: 16px 0 0 10px;
                    color: rgba($color_fff, 0.2);
                    height: 100%;
                    transition: color 0.3s;

                    &:hover{
                        color: $color_fff;
                        transition: color 0.3s;
                    }
                }
            }

            .navigate_next{
                @include block_outline($width: 50px);
                box-shadow: -1px 0 2px 0 rgba(255, 255, 255, 0.20);
                border-left: 1px solid rgba(255, 255, 255, 0.10);
            }

            .navigate_before {
                @include block_outline($width: 30px);
                border-right: 1px solid rgba(255, 255, 255, 0.10);
                box-shadow: 1px 0 2px 0 rgba(255, 255, 255, 0.20);
                text-align: right;

                .ivu-icon {
                    transform: rotate(180deg);
                }
            }
        }

        .menu-area{
            height: 100%;

            .org-info{
                @include block_outline(atuo,20px);
                margin: 20px 0 0 0;
                padding-right: 15px;
                float: right;
                color: $color_fff;
                font-size: $font_size_14px;
                cursor: pointer;

                .org-name{
                    display: inline-block;
                    max-width: 130px;
                    @include overflow_tip();
                    vertical-align: middle;
                }

                .icon-down{
                    vertical-align: middle;
                }
            }

            .icon-li {
                float: right;
                overflow: hidden;
                padding: 18px 20px 23px 0;
                display: inline-block;
                @include block_outline(auto, 100%);

                .icon {
                    float: left;
                    @include block_outline(18px, 16px);
                    margin: 0 9px;
                    cursor: pointer;

                    &:nth-of-type(1) {
                        margin-left: 0;
                    }

                    .iconfont {
                        display: inline-block;
                        color: $color_fff;
                        transition: all 0.5s;
                    }
                }

                .is-reverse{
                    transform: rotate(90deg);
                    transition: all 0.5s;
                }
            }
        }

        .sub-menu{
            text-transform: capitalize;
        }
    }
</style>
