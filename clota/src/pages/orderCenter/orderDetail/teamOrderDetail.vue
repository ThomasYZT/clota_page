<!--团队订单详情-->

<template>
    <div class="team-order-detail">
        <bread-crumb-head
            :locale-router="'订单详情'"
            :before-router-list="beforeRouterList">     <!--新增卡券 : 修改卡券信息-->
        </bread-crumb-head>
        <div class="content">
            <!--基本信息-->
            <base-info>
            </base-info>
            <!--产品信息-->
            <product-info>
            </product-info>
            <!--游客信息-->
            <tourist-info>
            </tourist-info>
            <!--导游信息-->
            <tour-guide-info>
            </tour-guide-info>
            <!--司机信息-->
            <driver-info>
            </driver-info>
            <!--订单明细-->
            <order-particulars>
            </order-particulars>
            <!--订单操作日志-->
            <order-operate-log>
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
    import orderOperateLog from './teamOrderChild/orderOperateLog';
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
            orderOperateLog
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
            }
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams(params) {
                // if(params && params.orderId){
                //     this.orderId = params.orderId;
                // }else{
                //     this.$router.push({
                //         name : 'reserveOrderDetail'
                //     });
                // }
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
