<!--
内容：订单详情
作者：djc
日期：
-->

<template>
    <div class="order-detail">
        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="$t('orderDetail')">
        </bread-crumb-head>
        <!--主表-->
        <order-info-main :info-data="order.memberOrderModel"></order-info-main>
        <!--产品子表-->
        <order-info-item :info-data="order.itemModels"></order-info-item>
        <!--支付方式子表-->
        <order-info-pay :info-data="order.payModels"></order-info-pay>
        <!--积分率信息-->
        <order-info-integral v-if="showMemberPoint"
                             :info-data="order.memberOrderModel.scoreRule ? JSON.parse(order.memberOrderModel.scoreRule) : {}">
        </order-info-integral>

    </div>
</template>
<script type="text/ecmascript-6">
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import orderInfoMain from '../components/orderInfoMain.vue';
    import orderInfoItem from '../components/orderInfoItem.vue';
    import orderInfoPay from '../components/orderInfoPay.vue';
    import orderInfoIntegral from '../components/orderInfoIntegral.vue';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            breadCrumbHead,
            orderInfoMain,
            orderInfoItem,
            orderInfoPay,
            orderInfoIntegral,
        },
        props : {},
        data () {
            return {
                //面包屑上级路由信息
                beforeRouterList : [
                    {
                        name : 'memberInfo', // 会员信息
                        router : { name : 'memberInfo' },
                    },
                    {
                        name : 'memberDetail', // 会员详情
                        router : { name : 'infoDetail' },
                    },
                    {
                        name : 'myOrder', // 我的订单
                        router : { name : 'myOrder' },
                    },
                ],

                // 订单详情数据
                order : {
                    itemModels : [],
                    memberOrderModel : {},
                    payModels : [],
                },
            };
        },
        computed : {
            ...mapGetters([
                'memberConfigInfo'
            ]),
            //是否可以显示会员积分折扣率信息
            showMemberPoint () {
                return this.memberConfigInfo && this.memberConfigInfo['memberPoint'] && this.memberConfigInfo['memberPoint'] === 'true';
            },
        },
        created () {
            this.getOrderDetail();
        },
        mounted () {
        },
        watch : {},
        methods : {
            getOrderDetail () {
                if (this.$route.query.orderId || this.$route.query.orderNo) {
                    ajax.post('queryOrderDetail', {
                        orderId : this.$route.query.orderId,
                        orderNo : this.$route.query.orderNo
                    }).then(res => {
                        if (res.success && res.data) {
                            this.order = res.data;
                        }
                    });
                } else {
                    this.$router.push({ name : 'myOrder' });
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    .order-detail {
        height: 100%;
        overflow: auto;
        background: #fff;
        border-radius: 5px 5px 0 0;
    }
</style>
