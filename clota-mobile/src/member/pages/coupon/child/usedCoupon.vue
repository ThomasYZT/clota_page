<!--已使用优惠券-->

<template>
    <div class="used-coupon">
        <div class="search-area">
        </div>
        <!--优惠券详情-->
        <coupon-item status="used">
        </coupon-item>
        <coupon-item status="used">
        </coupon-item>
    </div>
</template>

<script>
    import couponItem from '../components/couponItem';

    export default {
        components : {
            couponItem
        },
        data () {
            return {};
        },
        methods : {}
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .used-coupon{
        @include block_outline();
        background: #f2f3f4;
        overflow: auto;
        padding: 0 14px;
        .search-area{
            height: 60px;
        }
    }
</style>
