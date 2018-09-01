<!---->

<template>
    <div id="app" :class="skinType">
        <router-view v-if="noFrame"/>
        <main-frame v-else>
            <transition name="fade">
                <router-view>
                </router-view>
            </transition>
        </main-frame>
    </div>
</template>

<script>
    import mainFrame from '@/components/mainFrame/mainFrame';
    import {mapGetters} from 'vuex'

    export default {
        name : 'app',
        components: {
            mainFrame
        },
        data() {
            return {}
        },
        methods: {},
        computed: {
            noFrame() {
                // 解决刷新页面未拿到正确路由meta信息时noFrame初始值默认为false触发了mainFrame的created事件(根据$route.name来判断当前是否能拿到meta信息)
                return this.$route.name ? !!this.$route.meta.noFrame : true;
            },
            ...mapGetters({
                skinType: 'skinType',
            }),
        },
        created () {
            this.$store.commit('updateManageOrgs',JSON.parse(localStorage.getItem('manageOrgs')));
        }
    }
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
<style>

    body{
        overflow: auto!important;
    }
</style>
