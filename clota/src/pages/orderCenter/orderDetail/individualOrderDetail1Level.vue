<!--
    散客一级订单详情
    作者：杨泽涛
-->
<template>
    <div class="individual-order-detail">
        <div class="content">
            <!--散客订单基本信息-->
            <baseInfo :base-info="baseInfo" ></baseInfo>

            <!--订单明细-->
            <orderDetailList :orderOrgType="orderOrgType"
                             :orderDetailList="orderDetailList"></orderDetailList>

            <!--下单人-->
            <orderPlacer :orderVisitor="orderVisitor"></orderPlacer>
        </div>
    </div>
</template>

<script>
    import baseInfo from './individualOrderChild/level1/baseInfo';
    import orderDetailList from './individualOrderChild/level1/orderDetailList';
    import orderPlacer  from './individualOrderChild/level1/orderPlacer';
    import lifeCycelMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/api/index.js';
    export default {
        mixins: [lifeCycelMixins],
        components: {
            baseInfo,
            orderDetailList,
            orderPlacer
        },
        data() {
            return {
                //订单详情信息
                orderDetailInfo: {},
                //订单id
                orderId : '',
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
                    //路由中获取到参数后立马调用数据接口
                    this.queryindividualOrderDetail();
                }else{
                    this.$router.push({
                        name : 'reserveOrderDetail'
                    });
                }
            },
            /**
             * 查询团队订单详情
             */
            queryindividualOrderDetail () {
                ajax.post('queryFirstIndividualOrderDetail',{
                    orderId : this.orderId
                }).then(res => {
                    console.log(res)
                    if(res.success){
                        this.orderDetailInfo = res.data ? res.data : {};
                    }else{
                        this.orderDetailInfo = {};
                    }
                });
            }
        },
        computed: {
            //基本信息
            baseInfo () {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.baseInfo){
                    return this.orderDetailInfo.baseInfo;
                }else{
                    return {};
                }
            },
            //订单明细列表数据
            orderDetailList() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.orderDetailList) {
                    return this.orderDetailInfo.orderDetailList;
                }else {
                    return [];
                }
            },
            //下单人信息
            orderVisitor() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.orderVisitor) {
                    return this.orderDetailInfo.orderVisitor;
                }else {
                    return {};
                }
            },
            //机构对应订单角色
            orderOrgType() {
                if(Object.keys(this.orderDetailInfo).length > 0 && this.orderDetailInfo.orderOrgType) {
                    return this.orderDetailInfo.orderOrgType;
                } else {
                    return '';
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
