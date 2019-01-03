<!--无权限或不存在的页面-->

<template>
    <div class="permission-not">
        <main-frame>
            <div class="wrap">
                <img src="../../assets/images/icon-no-permission.png" class="img-pic" alt="">
            </div>
        </main-frame>
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
