<!--租户菜单-->

<template>
    <div class="lessee">
        <div class="table-content">
            <div class="tab-list">
                <Menu :active-name="activeName"
                      width="auto"
                      @on-select="menuSelect">
                    <MenuItem :name="item.name"
                              v-for="(item,index) in tapList"
                              :key="index">
                        <Icon type="document-text"></Icon>
                        {{$t(item.label)}}
                    </MenuItem>
                </Menu>
            </div>
            <div class="table-info">
                <router-view :key="$route.name">
                </router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //tap列表
                tapList : [
                    {
                        name : 'orderList',
                        label : '订单查询'
                    },
                    {
                        name : 'teamOrderAudit',
                        label : '团队订单预审核'
                    },
                    {
                        name : 'indRefundOrderAudit',
                        label : '散客退票审核'
                    },
                    {
                        name : 'indAlterOrderAudit',
                        label : '散客改签审核'
                    }
                ]
            };
        },
        methods : {
            /**
             * 左侧菜单改变
             * @param name 菜单名称
             */
            menuSelect (name) {
                this.$router.push({ name : name });
            }
        },
        computed : {
            //当前激活的左侧菜单
            activeName () {
                if (this.$route && this.$route.name) {
                    return this.$route.name;
                } else {
                    return '';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .lessee {
        @include block_outline();
        overflow: auto;
        background: $color_fff;

        .table-content {
            @include block_outline();

            $tap_width: 200px;

            .tab-list {
                padding-top: 20px;
                float: left;
                @include block_outline($tap_width);
                border-right: 1px solid $color_E8E8E;

                /deep/ .ivu-menu-vertical.ivu-menu-light:after {
                    display: none;
                }
            }

            .table-info {
                float: left;
                @include block_outline(unquote('calc(100% - #{$tap_width})'), 100%);
            }
        }
    }
</style>
