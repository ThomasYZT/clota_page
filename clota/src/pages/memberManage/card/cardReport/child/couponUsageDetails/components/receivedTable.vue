<!--
    已领取
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
        <!-- 使用时间 -->
        <el-table-column
            slot="column3"
            show-overflow-tooltip
            slot-scope="row"
            :label="row.title"
            :width="row.width"
            :min-width="row.minWidth">
            <template slot-scope="scope">
                <!-- 已使用 -->
                <span v-if="scope.row.couponStatus === 'used'">
                    {{scope.row.useTime | contentFilter}}
                </span>
                <!-- 未使用 -->
                <span v-else>
                    {{$t('noUse')}}
                </span>
            </template>
        </el-table-column>
    </table-com>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import { receivedTableHead } from '../couponUsageDetailsConfig';
    import ajax from '@/api/index';
    export default {
        props : {
            //卡券状态
            couponStatus : {
                type : String,
                default : '',
            },
            //卡券状态
            rowData : {
                type : Object,
                default () {
                    return {};
                },
            }
        },
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
                ajax.post('queryReportDetail', {
                    couponId : this.rowData.id,
                    batchId : this.rowData.batchId,
                    couponStatus : this.couponStatus,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
