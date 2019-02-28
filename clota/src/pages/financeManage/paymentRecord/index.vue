<!--在线收款记录-->

<template>
    <div class="online-payment">
        <!--筛选表头-->
        <filter-head @params-change="getParams">
        </filter-head>
        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="120"
            :page-no-d.sync="pageNo"
            :page-size-d.sync="pageSize"
            @query-data="queryRecord">
        </table-com>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import filterHead from './components/filterHead';
    import { columns } from './paymentRecordConfig';

    export default {
        components : {
            tableCom,
            filterHead
        },
        data () {
            return {
                //表格数据
                tableData : [],
                //表头信息配置
                columnData : columns,
                //总共条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //开始时间
                startTime : '',
                //结束时间
                endTime : '',
                //订单id
                orderId : ''
            };
        },
        methods : {
            /**
             * 查询付款记录
             */
            queryRecord  () {
                console.log(this.orderId);
            },
            /**
             * 获取筛选信息
             * @param{Object} params 筛选信息
             */
            getParams (params) {
                if (params.timeRange && params.timeRange[0] && params.timeRange[1]) {
                    this.startTime = params.timeRange[0].format('yyyy-MM-dd');
                    this.endTime = params.timeRange[1].format('yyyy-MM-dd');
                }
                this.orderId = params.orderId;
                this.queryRecord();
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .online-payment{
        width: 100%;
        height: 100%;
    }
</style>
