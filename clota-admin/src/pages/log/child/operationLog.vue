<!--运维后台操作日志-->

<template>
    <div class="operation-log">
        <!--筛选表头-->
        <filter-head>
        </filter-head>
        <table-com
            :table-data="tableData"
            :table-height="tableHeight"
            :column-data="operationLogHead"
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
</template>

<script>
    import filterHead from './operationLogChild/filterHead';
    import tableCom from '../../index/child/tableCom';
    import tableMixins from '../../lessee/tableMixins';
    import {operationLogHead} from './operationLogConfig';
    export default {
        mixins :[tableMixins],
        components : {
            filterHead,
            tableCom
        },
        data() {
            return {
                //表头配置
                operationLogHead : operationLogHead,
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
                //日志类型
                logType : ''
            }
        },
        methods: {
            /**
             * 获取日志类型
             */
            getLogData () {

            }
        },
        watch : {
            '$route' (newVal,oldVal) {
                if(newVal && newVal.meta){
                    this.logType = newVal.meta.logType;
                    this.getLogData();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .operation-log{
        @include block_outline();
        min-height: 100%;
        background: $color_fff;
        overflow: auto;
        padding: 0 30px;
        @include padding_place();

        .page-area {
            @include block_outline($height: 57px);
            text-align: right;

            /deep/ .el-pagination {
                display: inline-block;
                padding-top: 15px;
            }
        }
    }
</style>
