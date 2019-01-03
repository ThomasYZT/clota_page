<!--
    文章内容组件
    作者：杨泽涛
-->
<template>
    <div class="helper-article">
        <template v-if="Object.keys(pageInfo).length > 0">
            <h4 class="page-title"><span>{{pageContent.title}}</span></h4>
            <div class="page-content" v-html="pageContent.content"></div>
        </template>
        <noDataTip v-else></noDataTip>
    </div>
</template>

<script>
    import noDataTip from '@/components/noDataTip/noData-tip';
    import ajax from '@/api/index';
    export default {
        props : {
            //帮助信息
            pageInfo : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            noDataTip
        },
        data () {
            return {
                pageContent : {}
            };
        },
        methods : {
            /**
             * 根据id查询页面信息
             */
            findPageInfoById () {
                ajax.post('findPageInfoById', {
                    id : this.pageInfo.id
                }).then(res => {
                    if (res.success) {
                        this.pageContent = res.data ? res.data : {};
                    } else {
                        this.pageContent = {};
                    }
                });
            }
        },
        watch : {
            pageInfo : {
                handler () {
                    this.findPageInfoById();
                },
                deep : true,
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .helper-article {
        position: relative;
        padding: 10px;
        @include block_outline();
        overflow: auto;

        .page-title {
            width: 100%;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
            text-align: center;
        }

        .page-content {
            padding: 20px;
            word-break: break-all;
            /deep/ img {
                max-width: 100%;
            }
        }
    }
</style>
