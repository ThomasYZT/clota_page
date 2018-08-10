<!--订单详情-->

<template>
    <div class="order-detail">
        <bread-crumb-head
            :locale-router="$t('orderDetail')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="order-info">
            <!--订单表头信息-->
            <order-info>
            </order-info>
            <!--产品信息-->
            <product-info>
            </product-info>
            <!--游客信息 -->
            <tourist-info>
            </tourist-info>
            <!--短消息-->
            <sms-info>
            </sms-info>
            <!--退票信息-->
            <refund-ticket>
            </refund-ticket>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import orderInfo from './orderDetailChild/orderInfo';
    import productInfo from './orderDetailChild/productInfo';
    import touristInfo from './orderDetailChild/touristInfo';
    import smsInfo from './orderDetailChild/smsInfo';
    import refundTicket from './orderDetailChild/refundTicket';
    export default {
        components :{
            breadCrumbHead,
            orderInfo,
            productInfo,
            touristInfo,
            smsInfo,
            refundTicket
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('order'),
                        router: {
                            name: 'order'
                        }
                    }
                ],
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-detail{
        @include block_outline();

        .order-info{
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            overflow: auto;
            padding: 20px 50px 0 50px;
        }
    }
</style>
