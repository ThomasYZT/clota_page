<!--边框左侧菜单组件-->

<template>
    <div class="frame-slidbar" :class="{'width-is-zero' : menuIsPackUp}">
        <div class="menu-list">
            <Menu :active-name="activeMenu"
                  accordion
                  :open-names="openedNames"
                  @on-select="selectMenu"
                  width="auto"
                  ref="menu"
                  v-if="subMenuList.length > 0"
                  @on-open-change="openChange">
                <template v-for="item in subMenuList">
                    <menu-com
                        :menu-info="item"
                        :menu-deep="2"
                        :children-menu="item.children"
                        v-if="item.children && item.children.length > 2">
                    </menu-com>
                    <MenuItem :name="item.name"
                              v-else
                              :key="item.name"
                              @click.native="changeMenuItem">
                        <span v-if="item.meta.iconClass"
                              class="iconfont"
                              :class="[item.meta.iconClass]"></span>
                        <span class="menu-name"
                              v-w-title="$t(`${item.meta.menuName}`)">
                            {{$t(`${item.meta.menuName}`)}}
                        </span>
                    </MenuItem>
                </template>
            </Menu>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import menuCom from './menuCom';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        components : {
            menuCom
        },
        data() {
            return {
                //当前展开的二级菜单
                openedNames : [],
                //上次展开的二级菜单保存记录
                openedNamesRecord :[]
            }
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
                //解决点击菜单组织树不收起来的问题
                this.$el.click();
                this.$store.commit('changeOperateLine',false);
            },
            /**
             * 当展开二级菜单的时候，左边菜单全部展开
             * @param name
             */
            openChange (name) {
                this.openedNamesRecord = name;
                if(this.menuIsPackUp){
                    this.$store.commit('updateMenuIsPackUp', false);
                }
            },
            /**
             * 选择二级菜单，三级菜单收起
             */
            changeMenuItem () {
                this.openedNames = [];
                this.openedNamesRecord = [];
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened();
                });
            }
        },
        computed: {
            ...mapGetters({
                menuIsPackUp: 'menuIsPackUp',
                routerInfo: 'routerInfo'
            }),
            /**
             * 二级菜单列表
             * 二级菜单列表排除了路径为空的重定向路由和没有匹配到路由的重定向路由
             * 如果菜单的name属性和meta下的_name属性的值不同，说明这个菜单权限是挂靠在name为meta._name下的菜单，这里也需要排除
             * @returns {Array}
             */
            subMenuList() {
                if (this.$route && this.$route.meta && this.routerInfo && this.routerInfo.length > 0) {
                    let activeTopMenu = this.$route.meta.rightPath ? this.$route.meta.rightPath.split('.')[0] : '';
                    for (let i = 0, j = this.routerInfo.length; i < j; i++) {
                        if ( (this.routerInfo[i].meta.rightPath ? this.routerInfo[i].meta.rightPath.split('.')[0] : '') === activeTopMenu) {
                            return this.routerInfo[i]['children'].filter(item => {
                                //排除重定向路由和权限挂在其它路由下的路由
                                //children大于2的表示它有下级菜单，不可以排除
                                return item.meta && item.meta.isMenu;
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
                if(this.$route && this.$route.meta && this.$route.meta.rightPath){
                    let path = this.$route.meta.rightPath.split('.');
                    return path[path.length - 1];
                }else{
                    return '';
                }
            }
        },
        watch: {
            //监听路由变化，更新激活菜单
            '$route'(newVal,oldVal) {
                this.$nextTick(() => {
                    let menu = this.$refs.menu;
                    if (menu) {
                        menu.updateActiveName(this.activeMenu);
                    }
                });
            },
            menuIsPackUp (newVal,oldVal){
                if(newVal === true){
                    this.openedNames = [];
                }else{
                    this.openedNames = defaultsDeep([],this.openedNamesRecord);
                }
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened();
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

            /deep/ .menu-name,
            /deep/ .ivu-icon-ios-arrow-down{
                display: none!important;
            }
        }

        .menu-list {
            @include block_outline($width: 220px);
            padding-top: 30px;
            overflow-x: auto;
            overflow-y: scroll;
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
