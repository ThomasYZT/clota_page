<!--套餐-->

<template>
    <div class="package">
        <router-view>
        </router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .package{
        @include block_outline();
        min-height: 100%;
        background: $color_fff;
        overflow: auto;
    }
</style>
