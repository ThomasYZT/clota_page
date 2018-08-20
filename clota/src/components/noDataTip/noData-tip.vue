<!--无数据组件-->

<template>
    <div class="component-noData-tip">
        <img src="../../assets/images/icon-no-data.png" alt="">
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        components: {},
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

<style lang="scss">
    @import '~@/assets/scss/base';
    .component-noData-tip {
        text-align: center;
        @include center_center();
    }
</style>
