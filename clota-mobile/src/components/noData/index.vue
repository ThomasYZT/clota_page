<!--无数据组件-->

<template>
    <div class="no-data">
        <img src="../../assets/images/icon-no-data.svg" alt="">
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
    .no-data{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: $color_fff;

        img{
            @include block_outline(120px,120px,false);
        }
    }
</style>
