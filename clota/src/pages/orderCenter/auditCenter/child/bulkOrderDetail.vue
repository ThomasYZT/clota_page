<!--
内容：散客订单明细详情
作者：djc
日期：
-->

<template>
    <div class="bulk-order-detail">
        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="'orderDetailInfo'"><!--订单明细详情-->
        </bread-crumb-head>

        <div class="detail-container">
            <!--散客订单基本信息-->
            <bulk-order-base :module-info="detailData.baseInfo"></bulk-order-base>
            <!--游客信息-->
            <visitor-info :module-info="detailData.visitor"></visitor-info>
            <!--产品明细-->
            <product-detail :module-info="orderTicketList"
                            :base-info="detailData.baseInfo"
                            :visitor-info="detailData.visitor"
                            @confirm-audit="handleConfirmAudit">
            </product-detail>
            <!--分销信息-->
            <!--<allocation-info :module-info="detailData.allocationInfo"></allocation-info>-->
            <!--分销信息-->
            <!--下单企业不可见-->
            <distributionInfo viewType="scenic"
                              :allocationInfo="detailData.allocationInfo"></distributionInfo>
            <!--退票日志-->
            <refund-alter-log :module-info="detailData.refundAlterList"></refund-alter-log>
            <!--核销日志-->
            <verify-log :module-info="detailData.verifyTicketLogList"></verify-log>
            <!--操作日志-->
            <operate-log :order-record-list="detailData.orderOperationRecordList"></operate-log>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import ajax from '@/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import bulkOrderBase from './bulkOrderBase.vue';
    import visitorInfo from '../../components/visitorInfo.vue';
    import productDetail from '../../components/productDetail.vue';
    import allocationInfo from './allocationInfo.vue';
    import refundAlterLog from '../../components/refundAlterLog.vue';
    import verifyLog from '../../components/verifyLog.vue';
    import operateLog from '../../components/operateLog';
    import assignWith from 'lodash/assignWith';
    import distributionInfo from '../../orderDetail/individualOrderChild/level2/distributionInfo'

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            bulkOrderBase,
            visitorInfo,
            productDetail,
            allocationInfo,
            refundAlterLog,
            verifyLog,
            operateLog,
            distributionInfo
        },
        props: {},
        data() {
            return {
                // 订单审核详情
                detailData: {
                    baseInfo: {},
                    visitor: {
                        documentInfo: {},   // 证件信息：type-证件类型，data-证件号
                        phoneNumber: '',
                        visitorName: '',
                    },
                    ticketList: [],
                    allocationInfo: {
                        allocationCommission: 0,    // 分销佣金
                        policyName: '',    // 政策名称
                        settleLink: [],    // 分销链
                    },
                    refundAlterList: [],    // 退票改签日志
                    verifyTicketLogList: [],    // 核销日志
                    orderOperationRecordList: [],    // 操作日志
                },
                // 订单审核详情里面的产品明细列表
                orderTicketList: [],
            }
        },
        computed: {
            // 面包屑上级路由信息
            beforeRouterList() {
                if (this.$route.name == 'bulkRefundDetail') {
                    return [{
                        name: 'auditBulkRefund',   // 散客退票审核
                        router: {name: 'auditBulkRefund'}
                    }]
                } else if (this.$route.name == 'bulkChangeDetail') {
                    return [{
                        name: 'auditBulkChange',   // 散客改签审核
                        router: {name: 'auditBulkChange'}
                    }]
                }
            },
        },
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            /**
             * 查询散客订单详情
             */
            getBulkOrderDetail (id) {
                ajax.post('querySecondIndividualOrderDetail',{
                    visitorProductId: id
                }).then(res => {
                    if(res.success){
//                        this.detailData = res.data || {};
                        this.detailData = assignWith(this.detailData, res.data, (objValue, srcValue) => {
                            return srcValue ? srcValue : objValue;
                        });
                    }
                });
            },
            /**
             * 获取订单审核详情里面的产品明细列表
             */
            getOrderTicketList (id) {
                ajax.post('queryOrderTicketList',{
                    visitorProductId: id
                }).then(res => {
                    if(res.success){
                        this.orderTicketList = res.data || [];
                    }else{
                        this.orderTicketList = [];
                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    this.getBulkOrderDetail(params.rowData.visitorProductId);
//                    this.getBulkOrderDetail('1051793405354577920');
                    this.getOrderTicketList(params.rowData.visitorProductId);
                }else{
                    this.$router.go(-1);
                }
            },
            /**
             * 单个订单审核确认OK后，刷新订单详情数据
             * @param visitorProductId
             */
            handleConfirmAudit(visitorProductId) {
                this.getBulkOrderDetail(visitorProductId);
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .bulk-order-detail {

    }

    .detail-container {
        height: calc(100% - 50px);
        padding: 15px 20px;
    }
</style>
