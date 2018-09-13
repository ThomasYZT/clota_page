<!--景区经营权限设置-->

<template>
    <div class="manage-role-set">
        <div class="node-list"></div>
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
    .manage-role-set{
        @include block_outline($height : 310px);
        border-bottom: 1px solid $color_E1E1E1;
        border-top: 1px solid $color_E1E1E1;
    }
</style>
