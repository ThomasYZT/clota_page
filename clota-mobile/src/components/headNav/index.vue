<!--
    头部返回主页导航
    作者：杨泽涛
-->
<template>
    <div class="head-nav">
        <img @click="toHome()"
             src="../../assets/images/backToHome.svg" alt="">
    </div>
</template>

<script>

    export default {
        components: {},
        data() {
            return {}
        },
        methods: {
            toHome() {
                this.$router.push({
                    name: 'home'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .head-nav {
        height: 32px;

        img {
            vertical-align: top;
            margin-left: 19px;
            margin-top: 6px;
            width: 20px;
            height: 20px;
        }
    }
</style>
