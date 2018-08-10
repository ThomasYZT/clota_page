<!--系统设置-->

<template>
    <div class="system">
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
    .system{
        @include block_outline();
        min-height: 100%;
        background: $color_fff;
        overflow: auto;
    }
</style>
