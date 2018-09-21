<!---->

<template>
    <div id="app" >
        <transition name="fade">
            <router-view :key="hashKey">
            </router-view>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name : 'app',
        components: {
        },
        data() {
            return {}
        },
        methods: {
        },
        computed: {
            ...mapGetters({
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

