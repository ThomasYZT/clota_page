<!--
    散客一级订单详情
    作者：杨泽涛
-->
<template>
    <div class="individual-order-detail">
        <bread-crumb-head
            :locale-router="$t('orderDetail')"
            :before-router-list="beforeRouterList">     <!--新增卡券 : 修改卡券信息-->
        </bread-crumb-head>
        <div class="content">
            <!--散客订单基本信息-->
            <baseInfo :base-info="orderDetailInfo">
            </baseInfo>

            <!--订单明细-->
            <orderDetailList :orderDetailList="orderDetailList">
            </orderDetailList>

            <!--下单人-->
            <orderPlacer :orderVisitor="orderCreator">
            </orderPlacer>
        </div>
    </div>
</template>

<script>
    import baseInfo from './individualOrderChild/level1/baseInfo';
    import orderDetailList from './individualOrderChild/level1/orderDetailList';
    import orderPlacer from './individualOrderChild/level1/orderPlacer';
    import lifeCycelMixins from '@/mixins/lifeCycleMixins.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import ajax from '@/api/index.js';
    export default {
        mixins : [lifeCycelMixins],
        components : {
            baseInfo,
            orderDetailList,
            orderPlacer,
            breadCrumbHead
        },
        data () {
            return {
                //订单详情信息
                orderDetailInfo : {},
                //订单id
                orderId : '',
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'reserveOrderDetail',
                        router : {
                            name : 'orderList'
                        }
                    }
                ],
                //订单明细信息
                orderDetailList : [],
                //下单人信息
                orderCreator : {}
            };
        },
        methods : {
            /**
             * 获取路由参数
             * @param{Object} params 路由参数
             */
            getParams (params) {
                if (params && params.orderDetail && Object.keys(params.orderDetail).length > 0) {
                    this.orderDetailInfo = params.orderDetail;
                    this.querySecondOrder();
                    this.queryOrderPlacer();
                } else {
                    this.$router.push({
                        name : 'reserveOrderDetail'
                    });
                }
            },
            /**
             * 查询订单明细信息
             */
            querySecondOrder () {
                ajax.post('querySecondOrder',{
                    orderNo : this.orderDetailInfo.orderNo,
                }).then(res => {
                    if (res.status === 200) {
                        this.orderDetailList = res.data ? res.data : [];
                    } else {
                        this.orderDetailList = [];
                    }
                });
            },
            /**
             * 获取下单人信息
             */
            queryOrderPlacer () {
                ajax.post('queryOrderPlacer',{
                    orderNo : this.orderDetailInfo.orderNo,
                }).then(res => {
                    if (res.status === 200) {
                        this.orderCreator = res.data ? res.data[0] : {};
                    } else {
                        this.orderCreator = {};
                    }
                });
            }
        },
        computed : {
            //基本信息
            baseInfo () {
                if (Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.baseInfo) {
                    return this.orderDetailInfo.baseInfo;
                } else {
                    return {};
                }
            },
            //机构对应订单角色
            orderOrgType () {
                if (Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.orderOrgType) {
                    return this.orderDetailInfo.orderOrgType;
                } else {
                    return '';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .individual-order-detail {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        border-radius : 4px;
        background: #f5f7fa;

        .content{
            padding: 20px 20px 0 20px;
            background: $color_fff;
            margin-top: 10px;
        }
    }
</style>
