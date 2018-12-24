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
            <baseInfo :baseInfo="orderDetailInfo">
            </baseInfo>

            <!--游客信息-->
            <touristInfo :visitor="touristInfo">
            </touristInfo>

            <!--产品明细,包含申请退票和改签-->
            <product-detail-for-apply  :ticketList="ticketList"
                            v-if="productDetailForApply"
                            :visitor="touristInfo"
                            :baseInfo="orderDetailInfo"
                            @fresh-data="freshData">
            </product-detail-for-apply>
            <!--产品明细,包含审核退票和改签-->
            <product-detail-for-audit  :ticketList="ticketList"
                                       v-if="productDetailForAudit"
                                       :visitor="touristInfo"
                                       :baseInfo="orderDetailInfo"
                                       @fresh-data="freshData">
            </product-detail-for-audit>

            <!--分销信息-->
            <distributionInfo :allocationInfo="allocationInfo">
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
            <operateLog :order-record-list="orderRecordList"></operateLog>

        </div>
    </div>
</template>

<script>
    import lifeCycelMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/api/index.js';
    import baseInfo from './individualOrderChild/level2/baseInfo';
    import productDetailForApply from './individualOrderChild/level2/productDetailForApply';
    import productDetailForAudit from './individualOrderChild/level2/productDetailForAudit';
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
            productDetailForApply,
            refundLog,
            touristInfo,
            vertificationLog,
            distributionInfo,
            breadCrumbHead,
            productDetailForAudit
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
                if (params && params.orderDetailInfo) {
                    this.orderDetailInfo = params.orderDetailInfo;
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
             * 刷新页面数据
             */
            freshData () {
                this.queryIndividualProductDetail();
            },
            /**
             * 获取下游客信息
             */
            queryOrderPlacer () {
                ajax.post('queryOrderPlacer',{
                    orderNo : this.orderDetailInfo.orderNo,
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data) {
                            for (let i = 0,j = res.data.length; i < j; i++) {
                                if (res.data[i]['visitorType'] === 'visitor') {
                                    this.touristInfo = res.data[i];
                                    return;
                                }
                            }
                        }
                        this.touristInfo = {};
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
                    orderDetailNo : this.orderDetailInfo.orderDetailNo
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
                let params = {
                    orderDetailNo : this.orderDetailInfo.orderDetailNo,
                    pageSize : 99999,
                    page : 1
                };
                //如果是在审核退改签的页面需要传入refundId参数
                if (this.productDetailForAudit) {
                    Object.assign(params,{ refundId : this.orderDetailInfo.refundId });
                }
                ajax.post('queryIndividualProductDetail',{
                    ...params
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
                    orderDetailNo : this.orderDetailInfo.orderDetailNo,
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
                    orderDetailNo : this.orderDetailInfo.orderDetailNo,
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
                    orderDetailNo : this.orderDetailInfo.orderDetailNo,
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
            //面包屑路由信息
            beforeRouterList () {
                if (this.$route.name === 'individualOrderDetail2Level') { //从订单查询页面跳转过来
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
                                    orderDetail : this.orderDetailInfo
                                }
                            }
                        }
                    ];
                } else if (this.$route.name === 'refundAuditRefundOrderDetail') { //从散客订单退票审核页面跳转过来
                    return [
                        {
                            name : '散客退票审核订单', // 散客退票审核订单
                            router : {
                                name : 'indRefundOrderAudit'
                            }
                        }
                    ];
                } else if (this.$route.name === 'alterAuditRefundOrderDetail') { //从散客订单改签审核页面跳转过来
                    return [
                        {
                            name : '散客改签审核订单', // 散客改签审核订单
                            router : {
                                name : 'indAlterOrderAudit'
                            }
                        }
                    ];
                } else {
                    return [];
                }
            },
            //包含申请退票改签的产品明细是否显示
            productDetailForApply () {
                return this.$route.name === 'individualOrderDetail2Level';
            },
            //包含审核退票改签的产品明细是否显示
            productDetailForAudit () {
                return this.$route.name === 'alterAuditRefundOrderDetail' || this.$route.name === 'refundAuditRefundOrderDetail';
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
