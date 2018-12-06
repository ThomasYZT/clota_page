<!---->

<template>
    <div class="wx-member-card">
        <router-view>

        </router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {};
        },
        methods : {},
        created () {
        }
    };
</script>


<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .wx-member-card{
        @include block_outline();
        .view-content{
            @include block_outline($height : unquote('calc(100% - 53px)'));

            &.full-height{
                height: 100%;
            }
        }

        /deep/ .weui-tabbar{
            background: $color_fff;
        }
    }
</style>
