<!--边框左侧菜单组件-->

<template>
    <div class="frame-slidbar" :class="{'width-is-zero' : menuIsPackUp}">
        <div class="menu-list">
            <!--<Menu :active-name="activeMenu"-->
                  <!--@on-select="selectMenu"-->
                  <!--width="auto"-->
                  <!--ref="menu"-->
                  <!--v-if="subMenuList.length > 0">-->
                <!--<MenuItem :name="item.meta._name"-->
                          <!--v-for="item in subMenuList"-->
                          <!--:key="item.name">-->
                        <!--<span v-if="item.meta.iconClass"-->
                            <!--class="iconfont"-->
                            <!--:class="[item.meta.iconClass]"></span>-->
                        <!--<span class="menu-name">{{$t(`${item.meta.menuName}`)}}</span>-->
                <!--</MenuItem>-->
            <!--</Menu>-->
            <Menu :active-name="activeMenu"
                  @on-select="selectMenu"
                  width="auto"
                  ref="menu"
                  v-if="subMenuList.length > 0">
                <template v-for="item in subMenuList">
                    <menu-com
                        :menu-info="item"
                        :children-menu="item.children"
                        v-if="item.children && item.children.length > 2">
                    </menu-com>
                    <MenuItem :name="item.meta._name"
                              v-else
                              :key="item.name">
                        <span v-if="item.meta.iconClass"
                              class="iconfont"
                              :class="[item.meta.iconClass]"></span>
                        <span class="menu-name">{{$t(`${item.meta.menuName}`)}}</span>
                    </MenuItem>
                </template>
            </Menu>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import menuCom from './menuCom';

    export default {
        components : {
            menuCom
        },
        data() {
            return {}
        },
        methods: {
            /**
             * 更改选择的菜单
             * @param name 菜单名字
             */
            selectMenu(name) {
                this.$router.push({
                    name: name
                });
            }
        },
        computed: {
            ...mapGetters({
                menuIsPackUp: 'menuIsPackUp',
                permissionInfo: 'permissionInfo'
            }),
            /**
             * 二级菜单列表
             * 二级菜单列表排除了路径为空的重定向路由和没有匹配到路由的重定向路由
             * 如果菜单的name属性和meta下的_name属性的值不同，说明这个菜单权限是挂靠在name为meta._name下的菜单，这里也需要排除
             * @returns {Array}
             */
            subMenuList() {
                if (this.$route && this.$route.meta) {
                    let activeTopMenu = this.$route.meta.lightMenu;
                    for (let i = 0, j = this.permissionInfo.length; i < j; i++) {
                        if (this.permissionInfo[i].meta._name === activeTopMenu) {
                            return this.permissionInfo[i]['children'].filter(item => {
                                //排除重定向路由和权限挂在其它路由下的路由
                                //children大于2的表示它有下级菜单，不可以排除
                                return item.meta && item.meta.menuName && !item.meta.hidden && (item.name === item.meta._name || item.children && item.children.length > 2);
                            });
                        }
                    }
                    return [];
                } else {
                    return [];
                }
            },
            //当前高亮的二级菜单
            //通过name或meta下的_name来标识激活菜单名字
            activeMenu() {
                if (this.$route && this.$route.meta) {
                    if(this.$route.name){
                        return this.$route.name;
                    }else if(this.$route.meta._name){
                        return this.$route.meta._name;
                    }else{
                        return '';
                    }
                } else {
                    return '';
                }
            }
        },
        watch: {
            //监听路由变化，更新激活菜单
            '$route'(oldVal, newVal) {
                this.$nextTick(() => {
                    let menu = this.$refs.menu;
                    if (menu) {
                        menu.updateActiveName(this.activeMenu);
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    $img_base_url: '../../assets/images/';
    @import '../../assets/scss/base';

    .frame-slidbar {
        @include block_outline(200px);
        float: left;
        background: get_url('icon-menu-bg.svg') no-repeat;
        background-position: center bottom;
        transition: all 0.3s;
        overflow: hidden;

        &.width-is-zero {
            width: 45px !important;
            transition: all 0.3s;

            /deep/ .menu-name {
                display: none;
            }
        }

        .menu-list {
            @include block_outline($width: 220px);
            padding-top: 30px;
            overflow: auto;
        }

        /deep/ .ivu-menu {
            width: 100% !important;
            background: $color_transparent;


            .ivu-menu-submenu-title{
                padding: 10px 25px 10px 17px;
                color: rgba($color_fff, 1);
                border-bottom: 1px solid rgba($color_fff, 0.1);
                font-size: $font_size_14px;

                &:hover{
                    background: rgba($color_fff, 0.1) !important;
                }
            }

            .ivu-menu-item{
                display: flex;
                flex-direction: row;
                padding: 10px 25px 10px 17px;
                color: rgba($color_fff, 1);
                font-size: $font_size_14px;
                @include block_outline($height: 42px);
                border-bottom: 1px solid rgba($color_fff, 0.1);
                border-right: 0 !important;

                &:nth-of-type(1) {
                    border-top: 1px solid rgba($color_fff, 0.1);
                }

                .iconfont {
                    width: 15px;
                    margin-right: 15px;
                    display: inline-block;
                    font-size: 13px;
                    vertical-align: middle;
                    padding-top: 2px;
                    color: $color_fff;
                }

                .menu-name {
                    flex: 1;
                    @include overflow_tip(100%, auto);
                }

                &:hover,
                &.ivu-menu-item-selected {
                    background: rgba($color_fff, 0.1) !important;
                }
            }
        }

        /deep/ .ivu-menu-vertical.ivu-menu-light:after {
            display: none;
        }
    }
</style>
