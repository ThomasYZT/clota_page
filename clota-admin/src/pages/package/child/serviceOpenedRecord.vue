<!--服务开通记录-->

<template>
    <div class="operation-log">
        <!--筛选表头-->
        <filter-head @search-data="searchData">
        </filter-head>
        <div class="table-area">
            <table-com
                :column-data="serviceOpenHead"
                :table-data="tableData"
                :border="true"
                :page-no-d.sync="pageNo"
                :show-pagination="true"
                :page-size-d.sync="pageSize"
                :total-count="totalCount"
                :ofset-height="120"
                @query-data="getServiceRecord">
                <el-table-column
                    slot="columnterm"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row['term']}}个月
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>

<script>
    import filterHead from './serviceOpenedRecordChild/filterHead';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import tableMixins from '../../lessee/tableMixins';
    import {serviceOpenHead} from './serviceOpenedRecordConfig';
    import ajax from '@/api/index.js';
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
                tableData : [],
                //总共条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //筛选条件
                formData : {
                    //服务id
                    serviceId : '',
                    //开始时间
                    startTime : '',
                    //结束时间
                    endTime : ''
                },
            }
        },
        methods: {
            /**
             * 获取服务开通记录
             */
            getServiceRecord () {
                ajax.post('getServiceRecord',{
                    orgId : '',
                    serviceId : this.formData.serviceId,
                    startTime : this.formData.startTime,
                    endTime : this.formData.endTime,
                    page : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                    if(res.status === 200){
                        this.tableData = res.data.list  ? res.data.list : [];
                        this.totalCount =  Number(res.data.totalRecord);
                    }else{
                        this.tableData = [];
                        this.totalCount  = 0;
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.totalCount  = 0;
                });
            },
            /**
             * 根据筛选条件查询数据
             * @param formData
             */
            searchData (formData) {
                console.log(formData.operateTime[0])
                this.formData.serviceId = formData.serviceId;
                this.formData.startTime = formData.operateTime[0] ? new Date(formData.operateTime[0]).format('yyyy-MM-dd 00:00:00') : '' ;
                this.formData.endTime = formData.operateTime[1] ? new Date(formData.operateTime[1]).format('yyyy-MM-dd 23:59:59') : '' ;
                this.getServiceRecord();
            }
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
