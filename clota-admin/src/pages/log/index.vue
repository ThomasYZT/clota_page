<!--日志信息-->

<template>
    <div class="log">
        <router-view>
        </router-view>
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
    .log{
        @include block_outline($height : auto);
        min-height: 100%;
        background: $color_fff;
        overflow: auto;
    }
</style>
