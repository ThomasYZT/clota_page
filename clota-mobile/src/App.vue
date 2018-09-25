<!---->

<template>
    <div id="app" >
        <transition :name="viewTransition">
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
            viewTransition () {
                return 'vux-pop-in'
            }
        },
        created () {
            // this.$store.commit('updateManageOrgs',JSON.parse(localStorage.getItem('manageOrgs')));
        },
        watch : {
            '$route': {
                handler (newVal,oldVal) {
                    if(newVal && newVal.meta && newVal.meta.title){
                        document.title = newVal.meta.title;
                    }else{
                        document.title = 'clota';
                    }
                    this.$store.commit('updateKeyBoardStatus',false);
                },
                immediate : true
            }
        }
    }
</script>

<style lang="scss">
    body,html{
        -webkit-tap-highlight-color: transparent;
    }
    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        transition: all 500ms;
        height: 100%;
        top: 46px;
        position: absolute;
        backface-visibility: hidden;
        perspective: 1000;
    }
    .vux-pop-out-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    .vux-pop-out-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .vux-pop-in-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .vux-pop-in-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
</style>

