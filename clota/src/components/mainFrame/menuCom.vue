<!--下级菜单组件-->

<template>
    <Submenu :name="menuInfo.meta._name" class="sub-menu-class">
        <template slot="title">
            <span v-if="menuInfo.meta.iconClass"
                  class="iconfont"
                  :class="[menuInfo.meta.iconClass]"></span>
            <span class="menu-name">{{$t(`${menuInfo.meta.menuName}`)}}</span>
        </template>
        <template v-for="(item,i) in subMenuList">
            <menu-com
                :menu-deep="menuDeep + 1"
                :menu-info="item"
                :children-menu="item.children"
                v-if="item.children && item.children.length > 2">
            </menu-com>
            <MenuItem :name="item.meta.menuName"
                      v-else
                      :key="item.name">
                        <span v-if="item.meta.iconClass"
                              class="iconfont"
                              :class="[item.meta.iconClass]"></span>
                <span class="menu-name">{{$t(`${item.meta.menuName}`)}}</span>
            </MenuItem>
        </template>
    </Submenu>
</template>

<script>

    export default {
        name : 'menuCom',
        props : {
            //当前菜单信息
            'menu-info' : {
                type : Object,
                default () {
                    return {}
                }
            },
            //子菜单
            'children-menu' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //菜单层级
            'menu-deep' : {
                type : Number,
                default : 3
            }
        },
        data() {
            return {}
        },
        computed: {
            /**
             * 下级菜单
             * name不为空的才是有对应的实际菜单
             * @returns {Array}
             */
            subMenuList() {
                return this.childrenMenu.filter(item => item.meta && item.meta.isMenu);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/base';

    .sub-menu-class{

        /deep/ .ivu-menu-submenu-title {
            display: flex;

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
                @include overflow_tip();
            }

            .ivu-icon{
                width: 10px;
                height: 100%;
                display: inline-block;
                vertical-align: middle;
            }
        }

        /deep/ .ivu-menu-item{
            padding-left: 48px!important;
            background: rgba($color_fff,0.1);

            &:not(:nth-last-of-type(1)){
                border-bottom: 0!important;
            }

            & .menu-name{
                font-size: $font_size_12px;
                color: rgba($color_fff,0.6);
                user-select: none;
            }

            &:hover .menu-name,
            &.ivu-menu-item-active .menu-name{
                color: $color_fff!important;
            }
        }

        /deep/ .ivu-icon-ios-arrow-down:before{
            content : "\F10A"!important;
        }

        &.ivu-menu-opened .ivu-menu-submenu-title-icon {
            transform: rotate(90deg) !important;
        }

        /deep/ .ivu-icon{
            @include block_outline(14px,14px);
            margin-right: 0!important;
        }
    }

</style>
