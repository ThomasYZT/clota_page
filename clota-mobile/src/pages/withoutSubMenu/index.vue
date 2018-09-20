<!--没有二级菜单的提示组件-->

<template>
    <div class="without-sub-menu">
        <mainFrame>
            该菜单下没有二级菜单
        </mainFrame>
    </div>
</template>

<script>
    import mainFrame from '@/components/mainFrame/mainFrame';
    export default {
        components : {
            mainFrame
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .without-sub-menu {

    }
</style>
