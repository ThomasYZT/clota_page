<!--
    支付结果页
    作者：杨泽涛
-->
<template>
    <div class="pay-status">
        <span v-if="status === 'success'">支付成功！</span>
        <span v-else-if="status === 'failure'">支付失败！</span>
    </div>
</template>

<script>

    export default {
        components : {},
        data () {
            return {
                status : ''
            }
        },
        methods : {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
