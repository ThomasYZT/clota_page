<!--
    散客二级订单详情
    作者：杨泽涛
-->
<template>
    <div class="individual-order-detail">
        <div class="content">
            <!--订单基本信息-->
            <baseInfo :baseInfo="baseInfo"> </baseInfo>

            <!--游客信息-->
            <!--分销商不可见-->
            <touristInfo v-if="orderOrgType !== 'allocation'"
                         :visitor="visitor"></touristInfo>

            <!--产品明细-->
            <!--
                需要传入产品名称、产品单价、产品明细列表数据、基础信息(包含产品明细id，退票、改签时用到)、机构对应订单角色(用于判断是否可对所有产品进行改签和退票)
            -->
            <productDetail  :ticketList="ticketList"
                            :orderOrgType="orderOrgType"
                            :productName="productDetail.productName"
                            :productPrice="productDetail.amount"
                            :baseInfo="baseInfo"></productDetail>

            <!--分销信息-->
            <!--下单企业不可见-->
            <distributionInfo v-if="orderOrgType !== 'channel'"
                              :allocationInfo="allocationInfo"></distributionInfo>

            <!--退票日志-->
            <!--分销商不可见-->
            <refundLog v-if="orderOrgType !== 'allocation'"
                       :refundAlterList="refundAlterList"></refundLog>

            <!--核销日志-->
            <!--分销商不可见-->
            <vertificationLog v-if="orderOrgType !== 'allocation'"
                              :verifyTicketLogList="verifyTicketLogList"></vertificationLog>

            <!--操作日志-->
            <!--分销商不可见-->
            <operateLog v-if="orderOrgType !== 'allocation'"
                        :orderOperationRecordList="orderOperationRecordList"></operateLog>
        </div>
    </div>
</template>

<script>
    import lifeCycelMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/api/index.js';
    import baseInfo from './individualOrderChild/level2/baseInfo';
    import operateLog from './individualOrderChild/level2/operateLog';
    import productDetail from './individualOrderChild/level2/productDetail';
    import refundLog from './individualOrderChild/level2/refundLog';
    import touristInfo from './individualOrderChild/level2/touristInfo';
    import vertificationLog from './individualOrderChild/level2/vertificationLog';
    import distributionInfo from './individualOrderChild/level2/distributionInfo'
    export default {
        mixins: [lifeCycelMixins],
        components: {
            baseInfo,
            operateLog,
            productDetail,
            refundLog,
            touristInfo,
            vertificationLog,
            distributionInfo
        },
        data() {
            return {
                //产品订单明细数据--路由数据
                productDetail: {},
                //二级订单详情接口数据
                orderDetailInfo: {},
                //产品明细列表数据
                ticketList: [],
            }
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams(params) {
                if(params && params.productDetail){
                    this.productDetail = params.productDetail;
                    this.getSecondLevelOrderDetailInfo();
                    this.getOrderTicketList();
                }else{
                    this.$router.push({
                        name : 'individualFirstLevel'
                    });
                }
            },
            /**
             * 获取二级订单详情数据
             */
            getSecondLevelOrderDetailInfo() {
                ajax.post('querySecondIndividualOrderDetail', {
                    visitorProductId: this.productDetail.visitorProductId
                }).then(res => {
                    if(res.success) {
                        this.orderDetailInfo = res.data;
                    } else {
                        this.orderDetailInfo = {};
                    }
                })
            },
            /**
             * 获取产品明细列表
             */
            getOrderTicketList() {
                ajax.post('queryOrderTicketList', {
                    visitorProductId: this.productDetail.visitorProductId
                }).then(res => {
                    if(res.success) {
                        this.ticketList = res.data;
                    }else {
                        this.ticketList = [];
                    }
                })
            }
        },
        computed: {
            allocationInfo() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.allocationInfo) {
                    return this.orderDetailInfo.allocationInfo;
                }else {
                    return {};
                }
            },
            //基本信息
            baseInfo() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.baseInfo) {
                    return this.orderDetailInfo.baseInfo;
                }else {
                    return {};
                }
            },
            //操作记录信息
            orderOperationRecordList() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.orderOperationRecordList) {
                    return this.orderDetailInfo.orderOperationRecordList;
                }else {
                    return [];
                }
            },
            //退票日志列表信息
            refundAlterList() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.refundAlterList) {
                    return this.orderDetailInfo.refundAlterList;
                }else {
                    return [];
                }
            },
            totalRefundFee() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.totalRefundFee) {
                    return this.orderDetailInfo.totalRefundFee;
                }else {
                    return {};
                }
            },
            //核销日志列表信息
            verifyTicketLogList() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.verifyTicketLogList) {
                    return this.orderDetailInfo.verifyTicketLogList;
                }else {
                    return [];
                }
            },
            //游客信息
            visitor() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.visitor) {
                    return this.orderDetailInfo.visitor;
                }else {
                    return {};
                }
            },
            //机构对应订单角色
            orderOrgType() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.baseInfo) {
                    return this.orderDetailInfo.baseInfo.orderOrgType;
                }else {
                    return '';
                }
            },
            //分销信息
            allocationInfo() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.allocationInfo) {
                    return this.orderDetailInfo.allocationInfo;
                }else {
                    return {};
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .individual-order-detail {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;
        @include padding_place();

        .content{
            padding: 0 20px;
        }
    }
</style>
