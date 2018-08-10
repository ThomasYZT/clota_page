<!--运维后台操作日志-->

<template>
    <div class="operation-log">

    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .operation-log{
        @include block_outline($height : auto);
        min-height: 100%;
        background: $color_fff;
        overflow: auto;
    }
</style>
