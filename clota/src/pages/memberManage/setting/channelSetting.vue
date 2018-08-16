<template>
    <!--会员管理--渠道设置-->
    <div class="member-channel-setting">

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
                routerName: 'channelSetting',
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-channel-setting{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;


    }
</style>
