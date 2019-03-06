<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <table-com :column-data="columnData"
               :table-data="tableData"
               :border="true"
               :show-pagination="true"
               :total-count="totalCount"
               :ofset-height="170"
               :page-no-d.sync="pageNo"
               :page-size-d.sync="pageSize"
               @query-data="queryList">
    </table-com>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import { receivedTableHead } from '../couponUsageDetailsConfig';
    export default {
        components : {
            tableCom
        },
        data () {
            return {
                //表头数据
                columnData : receivedTableHead,
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页记录数
                pageSize : 10
            };
        },
        methods : {
            queryList () {

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
