<!--
    提现设置
    作者：杨泽涛
-->
<template>
    <div class="cash-offer-settings">
        <cashOfferSettingBox></cashOfferSettingBox>
    </div>
</template>

<script>
    import cashOfferSettingBox from '../components/cashOfferSettingBox'
    export default {
        components : {
            cashOfferSettingBox
        },
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .cash-offer-settings {
        padding: 20px 30px;
    }
</style>
