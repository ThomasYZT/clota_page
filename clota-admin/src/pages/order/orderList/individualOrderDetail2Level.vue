<!--
    散客二级订单详情
    作者：杨泽涛
-->
<template>
    <div class="individual-order-detail">
        <bread-crumb-head
            :locale-router="$t('orderDetailInfo')"
            :before-router-list="beforeRouterList">     <!--新增卡券 : 修改卡券信息-->
        </bread-crumb-head>
        <div class="content">
            <!--订单基本信息-->
            <baseInfo :baseInfo="productDetail">
            </baseInfo>

            <!--游客信息-->
            <touristInfo :visitor="touristInfo">
            </touristInfo>

            <!--产品明细-->
            <!--
                需要传入产品名称、产品单价、产品明细列表数据、基础信息(包含产品明细id，退票、改签时用到)、机构对应订单角色(用于判断是否可对所有产品进行改签和退票)
            -->
            <productDetail  :ticketList="ticketList"
                            :orderOrgType="orderOrgType"
                            :productName="productDetail.productName"
                            :productPrice="productDetail.price"
                            :baseInfo="productDetail"
                            @fresh-data="freshData">
            </productDetail>

            <!--分销信息-->
            <distributionInfo :totalRefundFee="totalRefundFee"
                              :allocationInfo="allocationInfo">
            </distributionInfo>

            <!--退票日志-->
            <!--分销商不可见-->
            <refundLog :refundAlterList="refundAlterList">
            </refundLog>

            <!--核销日志-->
            <!--分销商不可见-->
            <vertificationLog :verifyTicketLogList="verifyTicketLogList">
            </vertificationLog>

            <!--操作日志-->
            <!--分销商不可见-->
            <operateLog :order-record-list="orderRecordList"></operateLog>

        </div>
    </div>
</template>

<script>
    import lifeCycelMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/api/index.js';
    import baseInfo from './individualOrderChild/level2/baseInfo';
    import productDetail from './individualOrderChild/level2/productDetail';
    import refundLog from './individualOrderChild/level2/refundLog';
    import touristInfo from './individualOrderChild/level2/touristInfo';
    import vertificationLog from './individualOrderChild/level2/vertificationLog';
    import distributionInfo from './individualOrderChild/level2/distributionInfo';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import operateLog from '../components/operateLog';

    export default {
        mixins : [lifeCycelMixins],
        components : {
            baseInfo,
            operateLog,
            productDetail,
            refundLog,
            touristInfo,
            vertificationLog,
            distributionInfo,
            breadCrumbHead
        },
        data () {
            return {
                //产品订单明细数据--路由数据
                productDetail : {},
                //二级订单详情接口数据
                orderDetailInfo : {},
                //产品明细列表数据
                ticketList : [],
                //游客信息
                touristInfo : {},
                //订单操作日志
                orderRecordList : [],
                //退票日志
                refundAlterList : [],
                //核销日志列表
                verifyTicketLogList : [],
                //分销信息
                allocationInfo : {}
            };
        },
        methods : {
            /**
             * 获取路由参数
             * @param{Object} params 路由参数
             */
            getParams (params) {
                if (params && params.productDetail) {
                    this.productDetail = params.productDetail;
                    this.getSecondLevelOrderDetailInfo();
                    // this.getOrderTicketList();
                    this.queryOrderPlacer();
                    this.queryOperationLog();
                    this.queryIndividualProductDetail();
                    this.queryRefundLog();
                    this.queryVerificationLog();
                    this.queryDistributionInformation();
                } else {
                    this.$router.push({
                        name : 'individualFirstLevel'
                    });
                }
            },
            /**
             * 获取二级订单详情数据
             */
            getSecondLevelOrderDetailInfo () {
                ajax.post('querySecondIndividualOrderDetail', {
                    visitorProductId : this.productDetail.visitorProductId
                }).then(res => {
                    if (res.success) {
                        this.orderDetailInfo = res.data;
                    } else {
                        this.orderDetailInfo = {};
                    }
                });
            },
            /**
             * 刷新页面数据
             */
            freshData () {
                this.getSecondLevelOrderDetailInfo();
                this.queryIndividualProductDetail();
            },
            /**
             * 获取下游客信息
             */
            queryOrderPlacer () {
                ajax.post('queryOrderPlacer',{
                    orderNo : this.productDetail.orderNo,
                }).then(res => {
                    if (res.status === 200) {
                        this.touristInfo = res.data ? res.data[0] : {};
                    } else {
                        this.touristInfo = {};
                    }
                });
            },
            /**
             * 查询订单操作日志信息
             */
            queryOperationLog () {
                ajax.post('queryOperationLog',{
                    orderDetailNo : this.productDetail.orderDetailNo
                }).then(res => {
                    if (res.status === 200) {
                        this.orderRecordList = res.data ? res.data : [];
                    } else {
                        this.orderRecordList = [];
                    }
                });
            },
            /**
             * 查询产品明细信息
             */
            queryIndividualProductDetail () {
                ajax.post('queryIndividualProductDetail',{
                    orderDetailNo : this.productDetail.orderDetailNo,
                    pageSize : 99999,
                    page : 1
                }).then(res => {
                    if (res.status === 200) {
                        this.ticketList = res.data ? res.data.list : [];
                    } else {
                        this.ticketList = [];
                    }
                });
            },
            /**
             * 查询退票日志
             */
            queryRefundLog () {
                ajax.post('queryRefundLog',{
                    orderDetailNo : this.productDetail.orderDetailNo,
                }).then(res => {
                    if (res.status === 200) {
                        this.refundAlterList = res.data ? res.data : [];
                    } else {
                        this.refundAlterList = [];
                    }
                });
            },
            /**
             * 查询核销日志
             */
            queryVerificationLog () {
                ajax.post('queryVerificationLog',{
                    orderDetailNo : this.productDetail.orderDetailNo,
                }).then(res => {
                    if (res.status === 200) {
                        this.verifyTicketLogList = res.data ? res.data : [];
                    } else {
                        this.verifyTicketLogList = [];
                    }
                });
            },
            /**
             * 查询分销信息
             */
            queryDistributionInformation () {
                ajax.post('queryDistributionInformation',{
                    orderDetailNo : this.productDetail.orderDetailNo,
                }).then(res => {
                    if (res.status === 200) {
                        this.allocationInfo = res.data ? res.data : {};
                    } else {
                        this.allocationInfo = {};
                    }
                });
            }
        },
        computed : {
            //退票手续费收入
            totalRefundFee () {
                if (Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.totalRefundFee) {
                    return this.orderDetailInfo.totalRefundFee;
                } else {
                    return 0;
                }
            },
            // //分销信息
            // allocationInfo () {
            //     if (Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.allocationInfo) {
            //         return this.orderDetailInfo.allocationInfo;
            //     } else {
            //         return {};
            //     }
            // },
            //基本信息
            baseInfo () {
                if (Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.baseInfo) {
                    return this.orderDetailInfo.baseInfo;
                } else {
                    return {};
                }
            },
            //游客信息
            visitor () {
                if (Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.visitor) {
                    return this.orderDetailInfo.visitor;
                } else {
                    return {};
                }
            },
            //机构对应订单角色
            orderOrgType () {
                if (Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.baseInfo) {
                    return this.orderDetailInfo.baseInfo.orderOrgType;
                } else {
                    return '';
                }
            },
            //面包屑路由信息
            beforeRouterList () {
                return [
                    {
                        name : 'reserveOrderDetail', // 订单查询
                        router : {
                            name : 'orderList'
                        }
                    },
                    {
                        name : 'orderDetail', // 订单详情
                        router : {
                            name : 'individualOrderDetail1Level',
                            params : {
                                orderDetail : this.productDetail
                            }
                        }
                    }
                ];
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
        @include padding_place();

        .content{
            padding: 20px 20px 0 20px;
            background: $color_fff;
            margin-top: 10px;
        }
    }
</style>
