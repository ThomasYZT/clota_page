<!--短信购买记录-->

<template>
    <div class="operation-log">
        <!--筛选表头-->
        <filter-head @search-data="searchData">
        </filter-head>
        <div class="table-area">
            <div class="order-info">
                <Icon type="ios-help"></Icon>
                <span class="note-tips">共购买：<span class="icon-weight">{{smsTotal | contentFilter}}条</span></span>
            </div>
            <table-com
                :column-data="smsBuyHead"
                :table-data="tableData"
                :border="true"
                :page-no-d.sync="pageNo"
                :show-pagination="true"
                :page-size-d.sync="pageSize"
                :total-count="totalCount"
                :ofset-height="210"
                @query-data="getSmsBuyRecord">
                <el-table-column
                    slot="columnprice"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row['price'] | moneyFilter}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="columntotalPrice"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row['totalPrice'] | moneyFilter}}
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>

<script>
    import filterHead from './smsBuyRecordChild/filterHead';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { smsBuyHead } from './smsBuyRecordConfig';
    import ajax from '@/api/index.js';
    export default {
        components : {
            filterHead,
            tableCom
        },
        data () {
            return {
                //表头配置
                smsBuyHead : smsBuyHead,
                //表格数据
                tableData : [],
                //总共条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //筛选条件
                filterData : {
                    startTime : '',
                    endTime : '',
                    smsPackageId : '',
                    orgId : ''
                },
                //共购买的短信条数
                smsTotal : ''
            };
        },
        methods : {
            /**
             * 获取短信购买记录
             */
            getSmsBuyRecord () {
                ajax.post('purchaseRecordList',{
                    orgId : this.filterData.orgId,
                    smsPackageId : this.filterData.smsPackageId,
                    startTime : this.filterData.startTime,
                    endTime : this.filterData.endTime,
                    page : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                    if (res.status === 200) {
                        this.tableData = res.data.list ? res.data.list : [];
                        this.totalCount = Number(res.data.totalRecord);
                        this.smsTotal = res.data.other.totals;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                        this.smsTotal = '';
                    }
                });
            },
            /**
             * 根据筛选条件查询购买记录
             * @param filterData
             */
            searchData (filterData) {
                this.filterData.smsPackageId = filterData.smsPackageId;
                this.filterData.orgId = filterData.orgId;
                this.filterData.startTime = filterData.purchaseTime[0] ? new Date(filterData.purchaseTime[0]).format('yyyy-MM-dd 00:00:00') : '';
                this.filterData.endTime = filterData.purchaseTime[1] ? new Date(filterData.purchaseTime[1]).format('yyyy-MM-dd 23:59:59') : '';
                this.getSmsBuyRecord();
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .operation-log{
        @include block_outline();
        min-height: 100%;
        background: $color_fff;
        overflow: auto;

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

            .order-info{
                @include block_outline($height : 30px);
                background: $color_E8F7FF;
                border: 1px solid rgba(0,130,213,0.50);
                border-radius: 4px;
                line-height: 27px;
                font-size: $font_size_14px;
                color: rgba($color_000,0.65);
                padding-left: 15px;
                margin-bottom: 10px;

                .ivu-icon-ios-help{
                    font-size: $font_size_17px;
                    color:  $color_0082D5;
                    vertical-align: text-top;
                    margin-right: 10px;
                    margin-top: 1px;
                }

                .note-tips{
                    margin-right: 20px;

                    .icon-weight{
                        color: $color_000;
                    }
                }
            }
        }
    }
</style>
