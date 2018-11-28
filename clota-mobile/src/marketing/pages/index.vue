<!--全民分销系统-->

<template>
    <div class="marketing">
        <div class="view-content" :class="{ 'full-height' : !showTabbar }">
            <router-view>

            </router-view>
        </div>
        <tabbar v-if="showTabbar">
            <tabbar-item badge="2">
                <img slot="icon" src="../../assets/images/icon-ali-pay.svg">
                <span slot="label">Wechat</span>
            </tabbar-item>
            <tabbar-item show-dot :selected="true">
                <img slot="icon" src="../../assets/images/icon-ali-pay.svg">
                <span slot="label">Message</span>
            </tabbar-item>
            <tabbar-item selected link="/component/demo">
                <img slot="icon" src="../../assets/images/icon-ali-pay.svg">
                <span slot="label">Explore</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    export default {
        data () {
            return {};
        },
        methods : {},
        computed : {
            //是否显示底部tab栏
            showTabbar () {
                return this.$route && this.$route.meta && !this.$route.meta.hideTabbar;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .marketing{
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
