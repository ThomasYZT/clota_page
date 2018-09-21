<!---->

<template>
    <div id="app" :class="skinType">
        <router-view v-if="noFrame"/>
        <main-frame v-else >
            <transition name="fade">
                <router-view :key="hashKey">
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
        methods: {
        },
        computed: {
            noFrame() {
                // 解决刷新页面未拿到正确路由meta信息时noFrame初始值默认为false触发了mainFrame的created事件(根据$route.name来判断当前是否能拿到meta信息)
                return this.$route.name ? !!this.$route.meta.noFrame : true;
            },
            ...mapGetters({
                skinType: 'skinType',
                hashKey : 'hashKey'
            }),
        },
        created () {
            // this.$store.commit('updateManageOrgs',JSON.parse(localStorage.getItem('manageOrgs')));
        }
    }
</script>

<style lang="scss" scoped>

</style>

