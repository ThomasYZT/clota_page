<!--
    导出卡券记录表格
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
        <!--<el-table-column-->
            <!--slot="column2"-->
            <!--show-overflow-tooltip-->
            <!--slot-scope="row"-->
            <!--:label="row.title"-->
            <!--:width="row.width"-->
            <!--:min-width="row.minWidth">-->
            <!--<template slot-scope="scope">-->
                <!--<ul class="operate-list">-->
                    <!--&lt;!&ndash; 删除 &ndash;&gt;-->
                    <!--<li @click="delete(scope.row)">{{$t('del')}}</li>-->
                <!--</ul>-->
            <!--</template>-->
        <!--</el-table-column>-->
    </table-com>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import { exportCouponRecordHead } from '../couponRecordConfig';
    import ajax from '@/api/index';
    export default {
        props : {
            dateTime : {
                type : Array,
                default () {
                    return [new Date(), new Date().addDays(-7)]
                }
            }
        },
        components : {
            tableCom
        },
        data () {
            return {
                //表头数据
                columnData : exportCouponRecordHead,
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
                ajax.post('queryCouponsLogs', {
                    optType : 'download',
                    startTime : this.dateTime[0].format('yyyy-MM-dd'),
                    endTime : this.dateTime[1].format('yyyy-MM-dd'),
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
                })
            }
        },
        watch : {
            dateTime : {
                handler (newVal) {
                    this.queryList();
                },
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
