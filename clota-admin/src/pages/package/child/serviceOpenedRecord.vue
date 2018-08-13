<!--服务开通记录-->

<template>
    <div class="operation-log">
        <!--筛选表头-->
        <filter-head>
        </filter-head>
        <div class="table-area">
            <table-com
                :table-data="tableData"
                :table-height="tableHeight"
                :column-data="serviceOpenHead"
                :auto-height="true">
            </table-com>
            <div class="page-area" v-if="tableData.length > 0">
                <el-pagination
                    :current-page="pageNo"
                    :page-sizes="pageSizeConfig"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import filterHead from './serviceOpenedRecordChild/filterHead';
    import tableCom from '../../index/child/tableCom';
    import tableMixins from '../../lessee/tableMixins';
    import {serviceOpenHead} from './serviceOpenedRecordChild/serviceOpenedRecordConfig';
    export default {
        mixins :[tableMixins],
        components : {
            filterHead,
            tableCom
        },
        data() {
            return {
                //表头配置
                serviceOpenHead : serviceOpenHead,
                //表格数据
                tableData : [
                    {
                        time : '20180615 12:26:56'
                    },
                    {
                        time : '20180615 12:26:56'
                    },
                    {
                        time : '20180615 12:26:56'
                    },
                    {
                        time : '20180615 12:26:56'
                    },
                ],
                //总共条数
                totalCount : 100,
            }
        },
        methods: {
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .operation-log{
        @include block_outline();
        min-height: 100%;
        background: $color_fff;
        overflow: auto;
        @include padding_place();

        .page-area {
            @include block_outline($height: 57px);
            text-align: right;

            /deep/ .el-pagination {
                display: inline-block;
                padding-top: 15px;
            }
        }

        .table-area{
            padding: 0 30px;
        }
    }
</style>
