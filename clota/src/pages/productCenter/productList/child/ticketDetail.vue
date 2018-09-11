<!--
内容：产品列表 - 票类列表 - 票类详情
作者：
日期：
-->

<template>
    <div class="ticket-detail">

        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="$t('ticketDetail')">
        </bread-crumb-head>

        <div class="container">

        </div>

    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
        },
        data () {
            return {
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'ticketType',   // 产品列表--票类列表
                        router: 'ticketType',
                    }
                ],
                //详情数据
                detail: {},
            }
        },
        methods: {



            /**
             * 获取路由信息
             */
            getParams(params) {
                if(params && Object.keys(params).length > 0){
                    this.detail = params.info;
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .ticket-detail{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        /deep/ .ivu-breadcrumb {
            padding-left: 30px;
        }

        .container{

        }
    }
</style>
