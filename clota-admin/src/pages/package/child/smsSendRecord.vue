<!--短信发送记录-->

<template>
    <div class="operation-log">
        <!--筛选表头-->
        <filter-head @search-data="searchData">
        </filter-head>
        <div class="table-area">
            <div class="order-info">
                <Icon type="ios-help"></Icon>
                <span class="note-tips">共发送：<span class="icon-weight">{{totalSend | contentFilter}}条</span></span>
            </div>
            <table-com
                :column-data="smsSendRecord"
                :table-data="tableData"
                :border="true"
                :page-no-d.sync="pageNo"
                :show-pagination="true"
                :page-size-d.sync="pageSize"
                :total-count="totalCount"
                :ofset-height="245"
                @query-data="getSmsSendRecord">
                <el-table-column
                    slot="columnoperate"
                    fixed="right"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-info">
                            <li class="normal" @click="watchDetail(scope.row)">查看</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="columnstatus"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                       {{$t(scope.row.status)}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="columninvokeType"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{$t(scope.row.invokeType)}}
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>

<script>
    import filterHead from './smsSendRecordChild/filterHead';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {smsSendRecord} from './smsSendRecordConfig';
    import ajax from '@/api/index.js';

    export default {
        components : {
            filterHead,
            tableCom
        },
        data() {
            return {
                //表头配置
                smsSendRecord : smsSendRecord,
                //表格数据
                tableData : [],
                //总共条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //总共发送条数
                totalSend : '',
                //筛选条件
                filterData : {
                    //租户id
                    orgId : '',
                    //手机号
                    phone : '',
                    //发送开始时间
                    startTime : '',
                    //发送结束时间
                    endTime : '',
                    //发送状态
                    status : '',
                    //订单编号
                    orderNo : '',
                    //短信供应商
                    provider : ''
                }
            }
        },
        methods: {
            /**
             * 查看发送短信详情
             * @param data
             */
            watchDetail(data) {
                this.$router.push({
                    name : 'smsSendRecordDetail',
                    params : {
                        id : data.id
                    }
                });
            },
            /**
             * 获取短信发送记录
             */
            getSmsSendRecord () {
                ajax.post('getSmsSendRecord',{
                    orderNo : this.filterData.orderNo,
                    provider : this.filterData.provider,
                    orgId : this.filterData.orgId,
                    phone : this.filterData.phone,
                    status : this.filterData.status,
                    startTime : this.filterData.startTime,
                    endTime : this.filterData.endTime,
                    page : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                   if(res.status === 200){
                       this.tableData = res.data.list ? res.data.list : [];
                       this.totalCount = Number(res.data.totalRecord);
                       this.totalSend = res.data.other.sendSmsTotals;
                   } else{
                       this.tableData = [];
                       this.totalCount = 0;
                       this.totalSend = '';
                   }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams(params){
                this.getSmsSendRecord();
            },
            /**
             * 根据过滤条件筛选短信发送记录
             * @param filterData
             */
            searchData (filterData) {
                this.filterData.orgId = filterData.orgId;
                this.filterData.provider = filterData.provider;
                this.filterData.phone = filterData.phone;
                this.filterData.status = filterData.status;
                this.filterData.orderNo = filterData.orderNo;
                this.filterData.startTime = filterData.sendTime[0] ? new Date(filterData.sendTime[0]).format('yyyy-MM-dd 00:00:00') : '' ;
                this.filterData.endTime = filterData.sendTime[1] ? new Date(filterData.sendTime[1]).format('yyyy-MM-dd 23:59:59') : '' ;
                this.getSmsSendRecord();
            }
        },
        beforeRouteEnter(to,from,next){
            next(vm => {
                vm.getParams(to.params);
            });
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
