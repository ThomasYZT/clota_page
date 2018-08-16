<template>
    <!--会员管理--储值设置-->
    <div class="member-fund-setting">

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
                routerName: 'fundSetting',
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-fund-setting{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;


    }
</style>
