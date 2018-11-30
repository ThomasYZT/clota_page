<!--全民分销系统-->

<template>
    <div class="marketing">
        <div class="view-content" :class="{ 'full-height' : !showTabbar }">
            <router-view>

            </router-view>
        </div>
        <tabbar v-if="showTabbar" @on-item-click="toRouter">
            <tabbar-item badge="2"
                         :selected="selectedTabbar === 'product'"
                         @on-item-click="toRouter('marketingProduct')">
                <img slot="icon" src="../../assets/images/icon-ali-pay.svg">
                <span slot="label">产品</span>
            </tabbar-item>
            <tabbar-item show-dot
                         :selected="selectedTabbar === 'order'"
                         @on-item-click="toRouter('marketingOrder')">
                <img slot="icon" src="../../assets/images/icon-ali-pay.svg">
                <span slot="label">订单</span>
            </tabbar-item>
            <tabbar-item link="/component/demo">
                <img slot="icon" src="../../assets/images/icon-ali-pay.svg">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    export default {
        data () {
            return {};
        },
        methods : {
            /**
             * 跳转到对应的路由页面
             * @param{String} routerName
             */
            toRouter (routerName) {
                this.$router.replace({
                    name : routerName
                });
            }
        },
        computed : {
            //是否显示底部tab栏
            showTabbar () {
                return this.$route && this.$route.meta && !this.$route.meta.hideTabbar;
            },
            //选择的底部菜单栏
            selectedTabbar () {
                return this.$route && this.$route.meta ? this.$route.meta.menuBar : '';
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
