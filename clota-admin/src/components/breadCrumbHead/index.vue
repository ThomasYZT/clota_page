<!--面包屑导航条-->

<template>
    <Affix :offset-top="56" >
        <div class="bread-crumb-head">
            <Breadcrumb>
                <BreadcrumbItem
                    :to="item.router"
                    v-for="(item,index) in beforeRouterList"
                    :key="index">
                    {{$t(item.name)}}
                </BreadcrumbItem>
                <BreadcrumbItem>{{$t(localeRouter)}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
    </Affix>
</template>

<script>
    export default {
        props : {
            //上级路由列表
            'before-router-list' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //当前路由名称
            'locale-router' : {
                type : String,
                default : ''
            }
        },
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .bread-crumb-head {
        @include block_outline($height: 54px);
        padding: 16px 32px;
        background: $color_fff;

        /deep/ a.ivu-breadcrumb-item-link {
            color: rgba($color_000, 0.45);

            &:hover {
                color: $color_blue;
            }
        }

        /deep/ .ivu-breadcrumb-item-link {
            color: rgba($color_000, 0.65);
        }
    }
</style>
