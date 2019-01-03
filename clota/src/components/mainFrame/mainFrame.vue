<!---->

<template>
    <div class="main-frame">
        <frame-header>
        </frame-header>
        <div class="frame-content">
            <frame-sidebar v-if="hasSidebar">
            </frame-sidebar>
            <div class="router-con" :class="{'pick-up' : menuIsPackUp, 'no-sider-bar' : !hasSidebar}">
                <slot></slot>
                <!--加载中插件-->
                <transition name="fade">
                    <loading v-if="isLoading">
                    </loading>
                </transition>
                <!--设置信息-->
                <settting>
                </settting>
            </div>
        </div>
    </div>
</template>

<script>
    import frameHeader from './frameHeader';
    import frameSidebar from './frameSidebar';
    import { mapGetters } from 'vuex';
    import loading from '../loading/loading';
    import settting from './setting';

    export default {
        components : {
            frameHeader,
            frameSidebar,
            loading,
            settting
        },
        data () {
            return {};
        },
        methods : {},
        computed : {
            ...mapGetters({
                menuIsPackUp : 'menuIsPackUp',
                isLoading : 'isLoading'
            }),
            //是否有侧边栏导航
            hasSidebar () {
                if (this.$route && this.$route.meta) {
                    if (this.$route.meta.hasSideBar === false) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            },
        }
    };

</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .main-frame {
        @include block_outline();

        .frame-content {
            @include block_outline($height: unquote('calc(100% - 60px)'));

            .router-con {
                position: relative;
                @include block_outline(unquote('calc(100% - 210px)'));
                float: left;
                /*<!--background: $color_fff;-->*/
                border-radius: 5px 5px 0 0;
                transition: all 0.3s;
                overflow: hidden;

                &.pick-up {
                    @include block_outline(unquote('calc(100% - 55px)'));
                    transition: all 0.3s;
                }

                &.no-sider-bar {
                    @include block_outline(unquote('calc(100%)'));
                    transition: all 0.1s;
                    overflow: auto;
                }
            }

            &::after {
                display: block;
                content: '';
                @include block_outline(10px);
                float: left;
            }
        }
    }
</style>
