<!--
    散客二级订单详情
    作者：杨泽涛
-->
<template>
    <div class="individual-order-detail">
        <baseInfo> </baseInfo>
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
    export default {
        mixins: [lifeCycelMixins],
        components: {
            baseInfo,
            operateLog,
            productDetail,
            refundLog,
            touristInfo,
            vertificationLog,
        },
        data() {
            return {
                //产品订单明细数据--路由数据
                productDetail: {},
                //二级订单详情接口数据
                orderDetailInfo: {}
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
            baseInfo() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.baseInfo) {
                    return this.orderDetailInfo.baseInfo;
                }else {
                    return {};
                }
            },
            orderOperationRecordList() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.orderOperationRecordList) {
                    return this.orderDetailInfo.orderOperationRecordList;
                }else {
                    return {};
                }
            },
            refundAlterList() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.refundAlterList) {
                    return this.orderDetailInfo.refundAlterList;
                }else {
                    return {};
                }
            },
            ticketList() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.ticketList) {
                    return this.orderDetailInfo.ticketList;
                }else {
                    return {};
                }
            },
            totalRefundFee() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.totalRefundFee) {
                    return this.orderDetailInfo.totalRefundFee;
                }else {
                    return {};
                }
            },
            verifyTicketLogList() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.verifyTicketLogList) {
                    return this.orderDetailInfo.verifyTicketLogList;
                }else {
                    return {};
                }
            },
            visitor() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.visitor) {
                    return this.orderDetailInfo.visitor;
                }else {
                    return {};
                }
            },
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
