<!--面包屑导航条-->

<template>
    <div class="bread-crumb-head">
        <Breadcrumb separator=">">
            <BreadcrumbItem
                :to="item.router"
                v-for="(item,index) in beforeRouterList"
                :key="index">
                {{item.name}}
            </BreadcrumbItem>
            <BreadcrumbItem>{{localeRouter}}</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
    export default {
        props: {
            //上级路由列表
            'before-router-list': {
                type: Array,
                default() {
                    return []
                }
            },
            //当前路由名称
            'locale-router': {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .bread-crumb-head {
        @include block_outline($height: 50px);
        line-height: 50px;
        background: $color_F4F6F8;

        /deep/ a.ivu-breadcrumb-item-link {
            color: $color_666;

            &:hover {
                color: $color_blue;
            }
        }

        /deep/ .ivu-breadcrumb-item-link {
            color: $color_333;
        }

        /deep/ .ivu-breadcrumb-item-separator{
            color: $color_999;
        }
    }
</style>
