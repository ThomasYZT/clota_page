<!--团队订单详情-->

<template>
    <div class="team-order-detail">
        <bread-crumb-head
            :locale-router="'orderDetail'"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="content">
            <!--基本信息-->
            <base-info :base-info="orderDetailInfo"
                       :product-info-list="productInfoList">
            </base-info>
            <!--产品信息-->
            <product-info :product-info-list="productInfoList"
                          :view-type="viewType">
            </product-info>
            <!--游客信息-->
            <tourist-info :visitor-list="visitorList">
            </tourist-info>
            <!--导游信息-->
            <tour-guide-info :guide-list="guideList">
            </tour-guide-info>
            <!--司机信息-->
            <driver-info :driver-list="driverList">
            </driver-info>
            <!--订单明细-->
            <order-particulars :orderNo="orderDetailInfo.orderNo"
                               :product-info-list="productInfoList">
            </order-particulars>
            <!--订单操作日志-->
            <!--<order-operate-log :order-record-list="orderRecordList"-->
                               <!--v-if="viewType !== 'allocation'">-->
            <!--</order-operate-log>-->
            <!--分销佣金-->
            <commission v-if="viewType === 'allocation'"
                        :allocationCommission="allocationCommission">
            </commission>
        </div>
    </div>
</template>

<script>
    import baseInfo from './teamOrderChild/baseInfo';
    import lifeCycelMixins from '@/mixins/lifeCycleMixins.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import productInfo from './teamOrderChild/productInfo';
    import touristInfo from './teamOrderChild/touristInfo';
    import tourGuideInfo from './teamOrderChild/tourGuideInfo';
    import driverInfo from './teamOrderChild/driverInfo';
    import orderParticulars from './teamOrderChild/orderParticulars';
    // import orderOperateLog from '../components/operateLog';
    import commission from './teamOrderChild/commission';
    import ajax from '@/api/index.js';
    import common from '@/assets/js/common.js';

    export default {
        mixins : [lifeCycelMixins],
        components : {
            baseInfo,
            breadCrumbHead,
            productInfo,
            touristInfo,
            tourGuideInfo,
            driverInfo,
            orderParticulars,
            // orderOperateLog,
            commission
        },
        data () {
            return {
                //订单id
                orderId : '',
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'orderList', // 订单查询
                        router : {
                            name : 'orderList'
                        }
                    }
                ],
                //订单详情
                orderDetailInfo : {},
                //产品信息
                productInfoList : [],
                //游客信息
                visitorListInfo : []
            };
        },
        methods : {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.orderDetailInfo = params.orderDetail;
                    this.queryGroupDistributionInformation();
                    this.queryOrderPlacer();
                } else {
                    this.$router.push({
                        name : 'orderList'
                    });
                }
                // if (params && params.orderId) {
                //     this.orderId = params.orderId;
                //     this.queryTeamOrderDetail();
                // } else {
                //     this.$router.push({
                //         name : 'orderList'
                //     });
                // }
            },
            /**
             * 查询团队订单详情
             */
            queryTeamOrderDetail () {
                ajax.post('queryTeamOrderDetail',{
                    orderId : this.orderId
                }).then(res => {
                    if (res.success) {
                        this.orderDetailInfo = res.data ? res.data : {};
                    } else {
                        this.orderDetailInfo = {};
                    }
                });
            },
            /**
             * 查询团队订单产品详情
             */
            queryGroupDistributionInformation () {
                ajax.post('queryGroupDistributionInformation',{
                    orderNo : this.orderDetailInfo.orderNo
                }).then(res => {
                    if (res.status === 200) {
                        this.productInfoList = res.data ? res.data : [];
                    } else {
                        this.productInfoList = [];
                    }
                });
            },
            /**
             * 查询订单游客，司机和导游信息
             */
            queryOrderPlacer () {
                ajax.post('queryOrderPlacer',{
                    orderNo : this.orderDetailInfo.orderNo
                }).then(res => {
                    if (res.status === 200) {
                        this.visitorListInfo = res.data ? res.data : [];
                    } else {
                        this.visitorListInfo = [];
                    }
                });
            }
        },
        computed : {
            //产品列表
            // productInfoList () {
            //     if (this.orderDetailInfo && this.orderDetailInfo.productInfoList) {
            //         return this.orderDetailInfo.productInfoList;
            //     } else {
            //         return [];
            //     }
            // },
            //游客信息
            visitorList () {
                if (this.visitorListInfo && this.visitorListInfo.length > 0) {
                    return this.visitorListInfo.filter(item => item.visitorType === 'visitor');
                } else {
                    return [];
                }
            },
            //导游信息
            guideList () {
                if (this.visitorListInfo && this.visitorListInfo.length > 0) {
                    return this.visitorListInfo.filter(item => item.visitorType === 'guide');
                } else {
                    return [];
                }
            },
            //司机信息
            driverList () {
                if (this.visitorListInfo && this.visitorListInfo.length > 0) {
                    return this.visitorListInfo.filter(item => item.visitorType === 'driver');
                } else {
                    return [];
                }
            },
            //订单操作日志
            orderRecordList () {
                if (this.orderDetailInfo && this.orderDetailInfo.orderRecordList) {
                    return this.orderDetailInfo.orderRecordList;
                } else {
                    return [];
                }
            },
            //基本信息
            baseInfo () {
                if (this.orderDetailInfo && this.orderDetailInfo.baseInfo) {
                    return this.orderDetailInfo.baseInfo;
                } else {
                    return {};
                }
            },
            //视图
            viewType () {
                if (this.orderDetailInfo && this.orderDetailInfo.orderOrgType) {
                    return this.orderDetailInfo.orderOrgType;
                } else {
                    return '';
                }
            },
            // 分销佣金
            allocationCommission () {
                if (this.orderDetailInfo && common.isNotEmpty(this.orderDetailInfo.allocationCommission)) {
                    return this.orderDetailInfo.allocationCommission;
                } else {
                    return '';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .team-order-detail{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        border-radius : 4px;
        @include padding_place();

        .content{
            background: $color_fff;
            margin-top: 10px;
            padding: 20px 20px 0 20px;
        }
    }
</style>
