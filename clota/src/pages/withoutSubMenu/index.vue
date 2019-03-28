<!--没有二级菜单的提示组件-->

<template>
    <div class="without-sub-menu">
        <div class="area-con">
            {{$t('moduleWithoutMenu')}}
        </div>
    </div>
</template>

<script>
    import mainFrame from '@/components/mainFrame/mainFrame';
    export default {
        components : {
            mainFrame
        },
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .without-sub-menu {
        @include block_outline();

        .area-con{
            @include block_outline();
            background: $color_fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: $font_size_18px;
            color: $color_333;
        }
    }
</style>
