<!---->

<template>
    <div id="app">
        <router-view v-if="noFrame">
        </router-view>
        <main-frame v-else>
            <router-view>
            </router-view>
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
        methods : {},
        computed : {
            noFrame () {
                // 解决刷新页面未拿到正确路由meta信息时noFrame初始值默认为false触发了mainFrame的created事件(根据$route.name来判断当前是否能拿到meta信息)
                return this.$route.name ? !!this.$route.meta.noFrame : true;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    #app {
        @include block_outline();
        min-width: $window_min_width;
        min-height: $window_min_height;
        background-size: 100% 100%;
    }
</style>
