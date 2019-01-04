<!---->

<template>
    <div id="app" :class="skinType">
        <router-view v-if="noFrame && isRouterActive"/>
        <main-frame v-else >
            <transition name="el-fade-in">
                <router-view :key="hashKey" v-if="isRouterActive">
                </router-view>
            </transition>
        </main-frame>
    </div>
</template>

<script>
    import mainFrame from '@/components/mainFrame/mainFrame';
    import { mapGetters } from 'vuex';
    import ajax from '@/api/index';

    export default {
        name : 'app',
        components : {
            mainFrame
        },
        data () {
            return {
                //路由页面是否显示
                isRouterActive : true
            };
        },
        methods : {
            /**
             * 重新加载页面
             */
            reload () {
                this.isRouterActive = false;
                this.$nextTick(() => {
                    this.isRouterActive = true;
                });
            },
        },
        computed : {
            noFrame () {
                // 解决刷新页面未拿到正确路由meta信息时noFrame初始值默认为false触发了mainFrame的created事件(根据$route.name来判断当前是否能拿到meta信息)
                if (this.$route.name) {
                    return !!this.$route.meta.noFrame;
                } else {
                    return !(this.$route.meta && (this.$route.meta.menuName === '404' || this.$route.meta.menuName === 'noSubMenu'));
                }
            },
            ...mapGetters({
                skinType : 'skinType',
                hashKey : 'hashKey',
                lang : 'lang',
            }),
        },
        mounted () {
            this.$nextTick(() => {
                //初始化读卡器信息
                this.$store.dispatch('initCardRead');
            });
        },
        watch : {
            lang () {
                this.reload();
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
        /*transition: all 0.3s;*/
    }
</style>
<style lang="scss">
    @import '~@/assets/scss/base';
    body,
    html{
        min-width: $window_min_width;
        min-height: $window_min_height;

    }
    html{
        overflow: auto!important;
    }
</style>
