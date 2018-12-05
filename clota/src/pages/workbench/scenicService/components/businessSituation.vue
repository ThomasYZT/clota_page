<!--
内容：今日营业状况
作者：djc
日期：
-->

<template>
    <div class="abnormal-warn">
        <div class="title">{{$t('warnAlarm')}}</div>
        <div class="table-list-area">

        </div>
    </div>
</template>
<script>
    import line from '../../components/line.vue';
    import ajax from '@/api/index.js';

    export default {
        components : {
            line
        },
        props : {},
        data () {
            return {}
        },
        computed : {},
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .abnormal-warn {
        position: relative;
        float: left;
        @include block_outline($width: unquote('calc(100% - 425px)'), $height: 309px);
        @include card();

        .title {
            @include block_outline($height: 45px);
            border-bottom: 1px solid $color_E8E8E;
            line-height: 45px;
            padding: 0 20px;
            font-size: $font_size_16px;
            color: $color_353B5E;
        }

        .table-list-area {
            padding: 0 20px;
            @include block_outline($height: 204px);
        }
    }
</style>
