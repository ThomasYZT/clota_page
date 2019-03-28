<!--
    支付结果页
    作者：杨泽涛
-->
<template>
    <div class="pay-status">
        <span v-if="status === 'success'">{{$t('successTip', { tip : $t('pay') })}}</span>
        <span v-else-if="status === 'failure'">{{$t('failureTip', { tip : $t('pay') })}}</span>
    </div>
</template>

<script>

    export default {
        components : {},
        data () {
            return {
                status : ''
            };
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
