<!--团队订单详情-->

<template>
    <div class="team-order-detail">
        <bread-crumb-head
            :locale-router="'订单详情'"
            :before-router-list="beforeRouterList">     <!--新增卡券 : 修改卡券信息-->
        </bread-crumb-head>
        <div class="content">
            <!--基本信息-->
            <base-info :base-info="baseInfo"
                       :product-info-list="productInfoList"
                       :view-type="viewType">
            </base-info>
            <!--产品信息-->
            <product-info :product-info-list="productInfoList"
                          :view-type="viewType">
            </product-info>
            <!--游客信息-->
            <tourist-info :visitor-list="visitorList"
                          v-if="viewType !== 'allocation'">
            </tourist-info>
            <!--导游信息-->
            <tour-guide-info :guide-list="guideList"
                             v-if="viewType !== 'allocation'">
            </tour-guide-info>
            <!--司机信息-->
            <driver-info :driver-list="driverList"
                         v-if="viewType !== 'allocation'">
            </driver-info>
            <!--订单明细-->
            <order-particulars :orderId="orderId"
                               :product-info-list="productInfoList"
                               v-if="viewType !== 'allocation'">
            </order-particulars>
            <!--订单操作日志-->
            <order-operate-log :order-record-list="orderRecordList"
                               v-if="viewType !== 'allocation'">
            </order-operate-log>
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
    import orderOperateLog from './teamOrderChild/orderOperateLog';
    import commission from './teamOrderChild/commission';
    import ajax from '@/api/index.js';
    export default {
        mixins :[lifeCycelMixins],
        components : {
            baseInfo,
            breadCrumbHead,
            productInfo,
            touristInfo,
            tourGuideInfo,
            driverInfo,
            orderParticulars,
            orderOperateLog,
            commission
        },
        data() {
            return {
                //订单id
                orderId : '',
                //上级路由列表
                beforeRouterList: [
                    {
                        name: '订单查询',
                        router: {
                            name: 'reserveOrderDetail'
                        }
                    }
                ],
                //订单详情
                orderDetailInfo : {}
            }
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams(params) {
                if(params && params.orderId){
                    this.orderId = params.orderId;
                    this.queryTeamOrderDetail();
                }else{
                    this.$router.push({
                        name : 'reserveOrderDetail'
                    });
                }
            },
            /**
             * 查询团队订单详情
             */
            queryTeamOrderDetail () {
                ajax.post('queryTeamOrderDetail',{
                    orderId : this.orderId
                }).then(res => {
                    if(res.success){
                        this.orderDetailInfo = res.data ? res.data : {};
                    }else{
                        this.orderDetailInfo = {};
                    }
                });
            }
        },
        computed : {
            //产品列表
            productInfoList () {
                if(this.orderDetailInfo && this.orderDetailInfo.productInfoList){
                    return this.orderDetailInfo.productInfoList;
                }else{
                    return [];
                }
            },
            //游客信息
            visitorList () {
                if(this.orderDetailInfo && this.orderDetailInfo.visitorList){
                    return this.orderDetailInfo.visitorList.map(item =>{
                        let documentInfo = item.documentInfo ? JSON.parse(item.documentInfo) : {};
                        return {
                            ...item,
                            idNum :documentInfo['data'],
                            idType :documentInfo['type'],
                        }
                    });
                }else{
                    return [];
                }
            },
            //导游信息
            guideList () {
                if(this.orderDetailInfo && this.orderDetailInfo.guideList){
                    return this.orderDetailInfo.guideList.map(item => {
                        let documentInfo = item.documentInfo ? JSON.parse(item.documentInfo) : {};
                        return {
                            ...item,
                            idNum :documentInfo['data'],
                            idType :documentInfo['type'],
                        }
                    });
                }else{
                    return [];
                }
            },
            //司机信息
            driverList () {
                if(this.orderDetailInfo && this.orderDetailInfo.driverList){
                    return this.orderDetailInfo.driverList.map(item => {
                        let documentInfo = item.documentInfo ? JSON.parse(item.documentInfo) : {};
                        return {
                            ...item,
                            idNum :documentInfo['data'],
                            idType :documentInfo['type'],
                        }
                    });
                }else{
                    return [];
                }
            },
            //订单操作日志
            orderRecordList () {
                if(this.orderDetailInfo && this.orderDetailInfo.orderRecordList){
                    return this.orderDetailInfo.orderRecordList;
                }else{
                    return [];
                }
            },
            //基本信息
            baseInfo () {
                if(this.orderDetailInfo && this.orderDetailInfo.baseInfo){
                    return this.orderDetailInfo.baseInfo;
                }else{
                    return {};
                }
            },
            //视图
            viewType () {
                if(this.orderDetailInfo && this.orderDetailInfo.orderOrgType){
                    return this.orderDetailInfo.orderOrgType;
                }else{
                    return '';
                }
            },
            // 分销佣金
            allocationCommission () {
                if(this.orderDetailInfo && this.orderDetailInfo.allocationCommission){
                    return this.orderDetailInfo.allocationCommission;
                }else{
                    return '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .team-order-detail{
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
