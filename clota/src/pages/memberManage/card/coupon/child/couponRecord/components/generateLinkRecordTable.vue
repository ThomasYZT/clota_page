<!--
    生成链接记录表格
    作者：杨泽涛
-->
<template>
    <div class="">
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
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import { generateLinkRecordHead } from '../couponRecordConfig';
    export default {
        components : {
            tableCom
        },
        data () {
            return {

                //表头数据
                columnData : generateLinkRecordHead,
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
