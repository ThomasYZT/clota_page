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
    import noDataTip from '../../../components/noDataTip/noData-tip'
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
            return {};
        },
        methods : {}
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
