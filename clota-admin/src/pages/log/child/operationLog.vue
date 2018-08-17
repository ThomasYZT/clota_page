<!--运维后台操作日志-->

<template>
    <div class="operation-log">
        <!--筛选表头-->
        <filter-head @fresh-data="getFilterInfo">
        </filter-head>
        <table-com
            :table-data="tableData"
            :table-height="tableHeight"
            :column-data="columns">
        </table-com>
        <div class="page-area" v-if="tableData.length > 0">
            <el-pagination
                :current-page="pageNo"
                :page-sizes="pageSizeConfig"
                :page-size="pageSize"
                :layout="pageLayout"
                :total="totalCount"
                @size-change="sizeChange"
                @current-change="pageNoChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import filterHead from './operationLogChild/filterHead';
    import tableCom from '../../index/child/tableCom';
    import tableMixins from '../../lessee/tableMixins';
    import {operationLogHead,saasLogHead} from './operationLogConfig';
    import ajax from '@/api/index.js';
    export default {
        mixins :[tableMixins],
        components : {
            filterHead,
            tableCom
        },
        data() {
            return {
                //表格数据
                tableData : [],
                //总共条数
                totalCount : 0,
                //日志类型
                logType : '',
                spaceOffset : 140,
                //筛选条件
                filterData : {}
            }
        },
        methods: {
            /**
             * 获取日志类型
             */
            getLogData () {
                if(this.logType === 'operate'){
                   this.maintainBackgroundOPLog('maintainBackgroundOPLog');
                }else if(this.logType === 'sass'){
                    this.maintainBackgroundOPLog('saaSPlatformOPLog');
                }
            },
            /**
             * 获取操作日志
             * @param url 查询接口
             */
            maintainBackgroundOPLog (url) {
                ajax.post(url,Object.assign({
                    pageSize : this.pageSize,
                    page : this.pageNo,
                },this.filterData)).then(res => {
                    if(res.status === 200){
                        this.totalCount = res.data.totalRecord;
                        this.tableData = res.data.list ? res.data.list : [];
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                        this.$Message.error(res.message || this.$t('dataError'));
                    }
                }).finally(() => {
                    this.setTableHeight();
                });
            },
            /**
             * 获取筛选条件
             * @param data
             */
            getFilterInfo (data) {
                this.logType = data.type;
                this.filterData = data.data;
                this.getLogData();
            },
            /**
             * 改变每页的条数
             * @param pageSize
             */
            sizeChange (pageSize) {
                this.pageSize = pageSize;
                this.getLogData();
            },
            /**
             * 页码改变
             * @param pageNo
             */
            pageNoChange (pageNo) {
                this.pageNo = pageNo;
                this.getLogData();
            }
        },
        watch : {
            // '$route':{
            //     handler (newVal,oldVal) {
            //         if(newVal && newVal.meta){
            //             this.logType = newVal.meta.subMenuType;
            //             this.getLogData();
            //         }
            //     },
            //     immediate : true
            // }
        },
        computed :{
            //表头配置
            columns () {
                if(this.logType === 'operate'){
                    return operationLogHead;
                }else if(this.logType === 'sass'){
                    return saasLogHead;
                }else{
                    return [];
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
