<!--
    文章内容组件
    作者：杨泽涛
-->
<template>
    <div class="helper-article">
        <div v-if="Object.keys(pageInfo).length > 0" v-html="pageInfo.content"></div>
        <noDataTip v-else></noDataTip>
    </div>
</template>

<script>
    import noDataTip from '../../../components/noDataTip/noData-tip';
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
                })
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
    }
</style>
