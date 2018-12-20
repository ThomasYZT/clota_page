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
            <product-info :product-info-list="productInfoList">
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
            <order-operate-log :order-record-list="orderRecordList">
            </order-operate-log>
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
    import orderOperateLog from '../components/operateLog';
    import ajax from '@/api/index.js';

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
            orderOperateLog,
        },
        data () {
            return {
                //上级路由列表
                // beforeRouterList : [
                //     {
                //         name : 'orderList', // 订单查询
                //         router : {
                //             name : 'orderList'
                //         }
                //     }
                // ],
                //订单详情
                orderDetailInfo : {},
                //产品信息
                productInfoList : [],
                //游客信息
                visitorListInfo : [],
                //订单操作日志
                orderRecordList : []
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
                    this.queryOperationLog();
                } else {
                    this.$router.push({
                        name : 'orderList'
                    });
                }
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
            },
            /**
             * 查询订单操作日志信息
             */
            queryOperationLog () {
                ajax.post('queryOperationLog',{
                    orderDetailNo : this.orderDetailInfo.orderDetailNo
                }).then(res => {
                    if (res.status === 200) {
                        this.orderRecordList = res.data ? res.data : [];
                    } else {
                        this.orderRecordList = [];
                    }
                });
            }
        },
        computed : {
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
            //基本信息
            baseInfo () {
                if (this.orderDetailInfo && this.orderDetailInfo.baseInfo) {
                    return this.orderDetailInfo.baseInfo;
                } else {
                    return {};
                }
            },
            //上级路由信息
            beforeRouterList () {
                if (this.$route.name === 'teamOrderDetail') {
                    return [
                        {
                            name : 'orderList', // 订单查询
                            router : {
                                name : 'orderList'
                            }
                        }
                    ];
                } else if (this.$route.name === 'preAduitTeamOrderDetail') {
                    return [
                        {
                            name : '团队订单预审核', // 团队订单预审核
                            router : {
                                name : 'teamOrderAudit'
                            }
                        }
                    ];
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
