<!--订单详情-->

<template>
    <div class="order-detail">
        <!--过滤表头-->
        <filter-head :tableShow.sync="tableShow"
                     @set-params="setParams"
                     @search-product="searchProduct">
        </filter-head>
        <table-com
            v-if="tableShow"
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="315"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            @query-data="queryList">
            <el-table-column
                slot="column0"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="to-one-level" @click="toOrderDetail(scope.row)">{{scope.row.orderNo}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column2"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.visitDate | timeFormat('yyyy-MM-dd')}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column5"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t('order.' + scope.row.orderChannel)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column10"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="status-suc" v-if="scope.row.smsStatus === 'success'">已发送</span>
                    <span class="status-wait" v-else-if="scope.row.smsStatus === 'wait'">未发送</span>
                    <span class="status-wait" v-else-if="scope.row.smsStatus === 'doing'">发送中</span>
                    <span class="status-fail" v-else>发送失败</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column11"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="status-suc" v-if="scope.row.syncStatus === 'success'">已同步</span>
                    <span class="status-wait" v-else-if="scope.row.syncStatus === 'wait'">同步中</span>
                    <span class="status-fail" v-else>同步失败</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column12"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="status-suc" v-if="scope.row.paymentStatus === 'true'">已支付</span>
                    <span class="status-fail" v-else>未支付</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column13"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="status-suc" v-if="scope.row.auditStatus === 'success'">审核通过</span>
                    <span class="status-wait" v-else-if="scope.row.auditStatus === 'audit'">待审核</span>
                    <span class="status-fail" v-else>审核不通过</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column14"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">已取票：{{scope.row.quantityPicked ? scope.row.quantityPicked : 0}}</span>
                    <span class="not-token-ticket">未取票：{{scope.row.quantity - scope.row.quantityPicked}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column15"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">已核销：{{scope.row.quantityVerified ? scope.row.quantityVerified : 0}}</span>
                    <span class="not-token-ticket">未核销：{{scope.row.quantity - scope.row.quantityVerified}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column16"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">已退：{{scope.row.quantityRefunded ? scope.row.quantityRefunded : 0}}</span>
                    <span class="not-token-ticket">待审：{{scope.row.quantityAuditRefunded ? scope.row.quantityAuditRefunded : 0}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column17"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">已改：{{scope.row.quantityRescheduled ? scope.row.quantityRescheduled : 0}}</span>
                    <span class="not-token-ticket">待审：{{scope.row.quantityAuditRescheduled ? scope.row.quantityAuditRescheduled : 0}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column18"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="returnTicketMenuShow.width">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li v-if="returnTicketMenuShow.show" @click="refundTicket(scope.row)">{{$t('退票')}}</li>
                        <!--<li @click="refundTicket(scope.row)">{{$t('退票')}}</li>-->
                        <li v-if="returnTicketMenuShow.show" @click="reserve(scope.row)">{{$t('改签')}}</li>
                        <li @click="reserve(scope.row)">{{$t('详情')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--申请退票-->
        <apply-refund-ticket v-model="refundTicketModalShow"
                             :orderDetail="currentData">
        </apply-refund-ticket>
    </div>
</template>

<script>
    import filterHead from './child/filterHead';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './orderConfig';
    import applyRefundTicket from './child/applyRefundTicketModal';
    import ajax from '@/api/index.js';

    export default {
        components : {
            filterHead,
            tableCom,
            applyRefundTicket
        },
        data() {
            return {
                //表格是否显示
                tableShow : false,
                //表头配置
                columnData : columnData,
                //表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                //筛选条件
                queryParams : {
                    pageNo :1,
                    pageSize : 10,
                    orderStartDate : '',
                    orderEndDate : '',
                    visitStartDate : '',
                    visitEndDate : '',
                    orderType : '',
                    allocationStatus : '',
                    pickStatus : '',
                    refundStatus : '',
                    verifyStatus : '',
                    rescheduleStatus : '',
                    scenicOrgId : '',
                    channelId : '',
                    orderChannel : '',
                    productType : '',
                    syncStatus : '',
                    auditStatus : '',
                    paymentStatus : '',
                    abnormalStatus : '',
                    marketTypeId : '',
                    marketLevelId : '',
                },
                //退款模态框是否显示
                refundTicketModalShow : false,
                //当前操作的订单信息
                currentData : {}
            }
        },
        methods: {
            /**
             * 查询所有订单
             */
            queryList () {
                ajax.post('getOrderList',{
                    ...this.queryParams
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 设置查询参数
             * @param params
             */
            setParams (params) {
                Object.assign(this.queryParams,params);
                this.tableShow = true;
            },
            /**
             * 手动触发查询
             * @param params
             */
            searchProduct (params) {
                Object.assign(this.queryParams,params);
                this.queryList();
            },
            /**
             * 获取订单详情
             * @param data
             */
            toOrderDetail (data) {
                if(data['orderType'] === 'individual') {
                    // 散客订单详情
                    this.$router.push({
                        name : 'individualFirstLevel',
                        params : {
                            orderId : data.orderId
                        }
                    });
                }else {
                    // 团队订单详情
                    this.$router.push({
                        name : 'teamOrderDetail',
                        params : {
                            orderId : data.orderId
                        }
                    });
                }

            },
            /**
             * 退票
             * @param data
             */
            refundTicket (data) {
                this.currentData = data;
                this.refundTicketModalShow = true;
            }
        },
        computed : {
            //是否可以显示退票按钮和改签按钮，
            returnTicketMenuShow () {
                //散客非分销订单
                if(this.queryParams.orderType === 'individual' && this.queryParams.allocationStatus === 'false'){
                    return {
                        show : true,
                        width : 170,
                    };
                }else if(this.queryParams.orderType === 'individual' && this.queryParams.orderChannel === 'market'){
                    return {
                        show : true,
                        width : 170,
                    };
                }else{//散客全民营销订单
                    return {
                        show : false,
                        width : 80,
                    };
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-detail{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;

        .status-suc,
        .token-ticket,
        .to-one-level{
            color: $color_blue;
        }

        .status-wait{
            color: $color_yellow;
        }

        .status-fail{
            color: $color_err;
        }

        .not-token-ticket{
            color: $color_999;
            margin-left: 15px;
        }

        .to-one-level{
            cursor: pointer;
        }
    }
</style>
