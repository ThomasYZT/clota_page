<!--
内容：关联实体卡
作者：djc
日期：
-->

<template>
    <div class="associate-entity-card">
        <!--头部tab组件-->
        <header-tabs :router-name="'associateEntityCard'"></header-tabs>
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
    .associate-entity-card{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;


    }
</style>
