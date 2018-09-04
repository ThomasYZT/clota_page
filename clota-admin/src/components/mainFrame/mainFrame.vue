<!--mainframe外层框架-->

<template>
    <div class="main-frame">
        <!--头部菜单栏-->
        <main-header>
        </main-header>
        <!--router-view容器-->
        <div class="main-content">
            <slot></slot>
            <transition name="fade">
                <loading v-if="isLoading">
                </loading>
            </transition>
        </div>
    </div>
</template>

<script>
    import mainHeader from './mainHeader';
    import loading from '@/components/loading/loading.vue';
    import {mapGetters} from 'vuex';

    export default {
        components: {
            mainHeader,
            loading
        },
        data() {
            return {}
        },
        methods: {},
        computed : {
            ...mapGetters({
                isLoading : 'isLoading'
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .main-frame {
        @include block_outline();

        .main-content {
            position: relative;
            @include block_outline($height: unquote('calc(100% - 56px)'));
            background: $color_f4f6f9;
        }
    }
</style>
