<template>
    <!--会员管理--积分消费管理-->
    <div class="member-consume-setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

    </div>
</template>

<script>

    import headerTabs from './components/headerTabs.vue'

    export default {
        components: {
            headerTabs,
        },
        data () {
            return {
                routerName: 'consumeSetting',
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-consume-setting{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;


    }
</style>
