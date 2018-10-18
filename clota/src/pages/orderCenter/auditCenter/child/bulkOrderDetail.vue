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
    </div>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import bulkOrderBase from './bulkOrderBase.vue';
    import visitorInfo from '../../components/visitorInfo.vue';
    import productDetail from '../../components/productDetail.vue';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            bulkOrderBase,
            visitorInfo,
            productDetail,
        },
        props: {},
        data() {
            return {
                detailData: {
                    baseInfo: {},
                    visitor: {
                        documentInfo: {}
                    },
                    ticketList: [],
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
