<!--无数据组件-->

<template>
    <div class="no-data" v-if="!isLoading">
        <img src="../../assets/images/icon-no-data.svg" alt="">
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
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
    .no-data{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        img{
            @include block_outline(120px,120px,false);
        }
    }
</style>
