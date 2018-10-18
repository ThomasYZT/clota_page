<!--
内容：散客订单明细详情
作者：djc
日期：
-->

<template>
    <div class="bulk-order-detail">
        <!--散客订单基本信息-->
        <bulk-order-base :module-info="detailData.baseInfo"></bulk-order-base>
        <!--游客信息-->
        <visitor-info :module-info="detailData.visitor"></visitor-info>
        <!--产品明细-->
        <product-detail :module-info="detailData.ticketList"
                        :base-info="detailData.baseInfo">
        </product-detail>
        <!--分销信息-->
        <allocation-info :module-info="detailData.allocationInfo"></allocation-info>
        <!--退票日志-->
        <refund-alter-log :module-info="detailData.refundAlterList"></refund-alter-log>
        <!--核销日志-->
        <verify-log :module-info="detailData.verifyTicketLogList"></verify-log>
        <!--操作日志-->
        <operate-log></operate-log>
    </div>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import bulkOrderBase from './bulkOrderBase.vue';
    import visitorInfo from '../../components/visitorInfo.vue';
    import productDetail from '../../components/productDetail.vue';
    import allocationInfo from './allocationInfo.vue';
    import refundAlterLog from '../../components/refundAlterLog.vue';
    import verifyLog from '../../components/verifyLog.vue';
    import operateLog from '../../orderDetail/teamOrderChild/orderOperateLog.vue';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            bulkOrderBase,
            visitorInfo,
            productDetail,
            allocationInfo,
            refundAlterLog,
            verifyLog,
            operateLog,
        },
        props: {},
        data() {
            return {
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
            }
        },
        computed: {},
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
                        this.detailData = res.data || {};
                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    this.getBulkOrderDetail(params.visitorPid);
                }else{
                    this.$router.go(-1);
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .bulk-order-detail {

    }
</style>
