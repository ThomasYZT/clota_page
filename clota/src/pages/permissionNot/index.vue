无权限或不存在的页面

<template>
    <div class="permission-not">
        <div class="wrap">
            <img src="../../assets/images/icon-no-permission.png" class="img-pic" alt="">
        </div>
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

    .permission-not {
        position: relative;
        @include block_outline();

        .wrap {
            background: #ffffff;
            @include center_center();

            .img-pic {
                display: block;
                @include block_outline(141px, 125px);
            }
        }
    }
</style>
