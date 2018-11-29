<!--
    二维码注册管理
    作者：杨泽涛
-->
<template>
    <div class="code-register">
        <codeBox></codeBox>
    </div>
</template>

<script>
    import codeBox from '../components/codeBox';
    export default {
        components : {
            codeBox
        },
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .code-register {
        padding : 35px 33px;
    }
</style>
