<!--
内容：补卡
作者：djc
日期：
-->

<template>
    <div class="replenish-card">
        <!--头部tab组件-->
        <header-tabs :router-name="'replenishCard'"></header-tabs>
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
    .replenish-card{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;


    }
</style>
