<!--在线收款记录-->

<template>
    <div class="online-payment">
        <!--筛选表头-->
        <filter-head @params-change="getParams">
        </filter-head>
        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="170"
            :page-no-d.sync="pageNo"
            :page-size-d.sync="pageSize"
            @query-data="queryRecord">
            <el-table-column
                slot="column1"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <template v-if="scope.row.channelId === '2'">{{$t('weChat')}}</template>
                    <template v-else-if="scope.row.channelId === '6'">{{$t('ailiPay')}}</template>
                    <template v-else>-</template>
                </template>
            </el-table-column>
            <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <template v-if="scope.row.txnType === 'trade'">{{$t('trade')}}</template>
                    <template v-else-if="scope.row.txnType === 'refund'">{{$t('refund')}}</template>
                    <template v-else>-</template>
                </template>
            </el-table-column>
            <el-table-column
                slot="column4"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <template v-if="scope.row.channelId === '2'">
                        <template v-if="scope.row.txnType === 'trade'">
                            {{$t(scope.row.txnAmt)}}
                        </template>
                        <template v-if="scope.row.txnType === 'refund'">
                            {{$t(scope.row.extData.settlementRefundFee)}}
                        </template>
                    </template>
                    <template v-else-if="scope.row.channelId === '6'">{{$t(scope.row.txnAmt)}}</template>
                    <template v-else>-</template>
                </template>
            </el-table-column>
            <el-table-column
                slot="column6"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                fixed="right"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="toDetail(scope.row)">{{$t('details')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <div class="pull-desc">
            {{$t('colonSetting',{ key : $t('explain') })}}<br>
            {{$t('pullPaymentDesc')}}
        </div>
        <!--交易详情信息-->
        <trade-detail-modal v-model="showTradeDetail"
                            :trade-detail="tradeDetail">
        </trade-detail-modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import filterHead from './components/filterHead';
    import { columns } from './paymentRecordConfig';
    import ajax from '@/api/index.js';
    import tradeDetailModal from './components/tradeDetailModal';

    export default {
        components : {
            tableCom,
            filterHead,
            tradeDetailModal
        },
        data () {
            return {
                //表格数据
                tableData : [],
                //表头信息配置
                columnData : columns,
                //总共条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //开始时间
                startTime : '',
                //结束时间
                endTime : '',
                //订单id
                orderId : '',
                //是否显示交易明细模态框
                showTradeDetail : false,
                //交易明细信息
                tradeDetail : {}
            };
        },
        methods : {
            /**
             * 查询付款记录
             */
            queryRecord  () {
                ajax.post('queryBillRecordList',{
                    startTime : this.startTime,
                    endTime : this.endTime,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                    orderNo : this.orderId
                }).then(res => {
                    if (res.success && res.data && res.data.data) {
                        this.tableData = res.data.data.map(item => {
                            let extData = {};
                            try {
                                extData = JSON.parse(item.extData);
                            } catch (e) {
                                extData = {};
                            }
                            return {
                                ...item,
                                extData : extData
                            };
                        });
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 获取筛选信息
             * @param{Object} params 筛选信息
             */
            getParams (params) {
                if (params.timeRange && params.timeRange[0] && params.timeRange[1]) {
                    this.startTime = params.timeRange[0].format('yyyy-MM-dd 00:00:00');
                    this.endTime = params.timeRange[1].format('yyyy-MM-dd 23:59:59');
                }
                this.orderId = params.orderId;
                this.queryRecord();
            },
            /**
             * 查看交易详情
             * @param{Object} tradeDetail 交易详情
             */
            toDetail (tradeDetail) {
                this.showTradeDetail = true;
                this.tradeDetail = tradeDetail;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .online-payment{
        width: 100%;
        height: 100%;

        .pull-desc{
            width: 100%;
            height: 50px;
            color: #999999;
            font-size: 13px;
            padding:0 0 0 30px;
        }
    }
</style>
