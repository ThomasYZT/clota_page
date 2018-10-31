<!--
内容：挂失
作者：djc
日期：
-->

<template>
    <div class="report-loss">
        <!--头部tab组件-->
        <header-tabs :router-name="'reportLoss'"></header-tabs>
    </div>
</template>
<script type="text/ecmascript-6">
    import headerTabs from './components/newCardTabs.vue';

    export default {
        components: {
            headerTabs,
        },
        props: {},
        data() {
            return {}
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .report-loss{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;


    }
</style>
