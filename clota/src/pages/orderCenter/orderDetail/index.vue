<!--订单详情-->

<template>
    <div class="order-detail">
        <!--过滤表头-->
        <filter-head :params-default="paramsDefault"
                     @set-params="setParams"
                     @search-product="searchProduct">
        </filter-head>
        <table-com
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
                    <span :class="{ 'to-one-level' : canShowOrderDetail }" @click="toOrderDetail(scope.row)">{{scope.row.orderNo}}</span>
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
                slot="column7"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{getProductName(scope.row)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column9"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.orderOrgType === 'allocation' ? scope.row.settleAmount : scope.row.amount | moneyFilter | contentFilter}}
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
                    <span
                        :class="{ 'status-suc' : scope.row.smsStatus === 'success' ,
                        'status-wait' : scope.row.smsStatus === 'wait' || scope.row.smsStatus === 'doing',
                        'status-fail' : scope.row.smsStatus === 'failure'}">
                        {{$t(transSMSStatus(scope.row.smsStatus))}}
                    </span>
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
                    <span :class="{'status-suc' : scope.row.syncStatus === 'success', 'status-fail' : scope.row.syncStatus === 'failure'}">
                        {{$t(transSyncStatus(scope.row.syncStatus))}}
                    </span>
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
                    <span :class="{'status-suc' : scope.row.paymentStatus === 'true','status-fail' : scope.row.paymentStatus !== 'true'}">
                        {{$t(transPaymentStatus(scope.row.paymentStatus))}}
                    </span>
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
                    <!--预审核通过-->
                    <span class="status-suc" v-if="scope.row.auditStatus === 'success'">{{$t('checkPass')}}</span>
                    <!--预定待审核-->
                    <span class="status-wait" v-else-if="scope.row.auditStatus === 'audit'">{{$t('waitChecking')}}</span>
                    <!--预审核不通过-->
                    <span class="status-fail" v-else-if="scope.row.auditStatus === 'reject'">{{$t('checkNoPass')}}</span>
                    <!--退单待审-->
                    <span class="status-wait" v-else-if="scope.row.auditStatus === 'cancel_audit'">{{$t('cancelWaitChecking')}}</span>
                    <!--退单审核通过-->
                    <span class="status-suc" v-else-if="scope.row.auditStatus === 'cancel_success'">{{$t('cancelPass')}}</span>
                    <span v-else>-</span>
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
                    <!--已取票-->
                    <span class="token-ticket">{{$t('haveTickets')}}：{{scope.row.quantityPicked ? scope.row.quantityPicked : 0}}</span>
                    <!--未取票-->
                    <span class="not-token-ticket">{{$t('noHaveTickets')}}：{{scope.row.quantity - scope.row.quantityPicked}}</span>
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
                    <!--已核销-->
                    <span class="token-ticket">{{$t('consumed')}}：{{(scope.row.quantityVerified ? scope.row.quantityVerified : 0) +
                        (scope.row.quantityOverdue ? scope.row.quantityOverdue : 0)}}</span>
                    <!--过期核销-->
                    <!--<span class="token-ticket">{{$t('expiredVerify')}}：{{scope.row.quantityOverdue ? scope.row.quantityOverdue : 0}}</span>-->
                    <!--未核销 (为核销数量 = 订单产品总数 - 已退票 - 已核销 - 已过期核销)-->
                    <span class="not-token-ticket">{{$t('noConsumed')}}：{{(scope.row.quantity ? scope.row.quantity : 0) -
                        (scope.row.quantityRefunded ? scope.row.quantityRefunded : 0) -
                        (scope.row.quantityVerified ? scope.row.quantityVerified : 0) -
                        (scope.row.quantityOverdue ? scope.row.quantityOverdue : 0) }}</span>
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
                    <!--已退-->
                    <span class="token-ticket">{{$t('retired')}}：{{scope.row.quantityRefunded ? scope.row.quantityRefunded : 0}}</span>
                    <!--待审-->
                    <span class="not-token-ticket">{{$t('pendingTrial')}}：{{scope.row.quantityAuditRefunded ? scope.row.quantityAuditRefunded : 0}}</span>
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
                    <!--已改-->
                    <span class="token-ticket">{{$t('hasChanged')}}：{{scope.row.quantityRescheduled ? scope.row.quantityRescheduled : 0}}</span>
                    <span class="not-token-ticket">{{$t('pendingTrial')}}：{{scope.row.quantityAuditRescheduled ? scope.row.quantityAuditRescheduled : 0}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column18"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="(returnTicketMenuShow.show || returnTeamMenuShow.show) ? (lang === 'zh-CN' ? 170 : 230) : 80">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li v-if="returnTicketMenuShow.show && scope.row.orderType === 'individual' && canApplyRefund"
                            :class="{disabled : !judgeCanReturn(scope.row)}"
                            @click="refundTicket(scope.row)">{{$t('return')}}</li><!--退票-->
                        <li v-if="returnTicketMenuShow.show  && scope.row.orderType === 'individual' && canApplyAlter"
                            :class="{disabled : !judgeCanAlter(scope.row)}"
                            @click="alterTicket(scope.row)">{{$t('alter')}}</li><!--改签-->
                        <li v-if="returnTeamMenuShow.show && scope.row.orderType === 'team'"
                            :class="{disabled : !judgeCanCancelOrder(scope.row)}"
                            @click="cancelOrder(scope.row)">{{$t('cancelOrder')}}</li><!--取消订单-->
                        <li v-if="canShowOrderDetail" @click="toDetail(scope.row)">{{$t('details')}}</li><!--详情-->
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--申请退票-->
        <apply-refund-ticket v-model="refundTicketModalShow"
                             :product-info="orderProductInfo"
                             :orderDetail="currentData"
                             @fresh-data="queryList">
        </apply-refund-ticket>
        <!--申请改签-->
        <apply-alter-ticket-modal v-model="alterTicketModalShow"
                                  :product-info="orderProductInfo"
                                  :orderDetail="currentData"
                                  @fresh-data="queryList">
        </apply-alter-ticket-modal>

        <!-- 申请取消订单 -->
        <applyCancelOrderModal ref="applyCancelOrderModal" @applySuccess="queryList">

        </applyCancelOrderModal>
    </div>
</template>

<script>
    import filterHead from './child/filterHead';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './orderConfig';
    import applyRefundTicket from './child/applyRefundTicketModal';
    import ajax from '@/api/index.js';
    import applyAlterTicketModal from './child/applyAlterTicketModal';
    import { transSyncStatus,transSMSStatus,transPaymentStatus } from '../commFun.js';
    import debounce from 'lodash/debounce';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { mapGetters } from 'vuex';
    import applyCancelOrderModal from './child/applyCancelOrderModal';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            filterHead,
            tableCom,
            applyRefundTicket,
            applyAlterTicketModal,
            applyCancelOrderModal
        },
        data () {
            return {
                //表头配置
                columnData : columnData,
                //表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                //筛选条件
                queryParams : {
                    pageNo : 1,
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
                    scenicId : '',
                    channelId : '',
                    orderChannel : '',
                    productType : '',
                    syncStatus : '',
                    auditStatus : '',
                    paymentStatus : '',
                    abnormalStatus : '',
                    marketTypeId : '',
                    marketLevelId : '',
                    //关键字
                    keyword : ''
                },
                //退款模态框是否显示
                refundTicketModalShow : false,
                //当前操作的订单信息
                currentData : {},
                //订单下产品信息
                orderProductInfo : [],
                //改签模态框是否显示
                alterTicketModalShow : false,
                //默认筛选条件信息
                paramsDefault : {}
            };
        },
        methods : {
            /**
             * 查询所有订单
             */
            queryList () {

            },
            /**
             * 查询订单ajax请求
             */
            queryListAjax () {
                ajax.post('getOrderList',{
                    ...this.queryParams
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
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
                Object.assign(this.queryParams,params.searchParams);
                this.updateStorgeInfo(params.formData);
                this.queryList();
            },
            /**
             * 手动触发查询
             * @param params
             */
            searchProduct (params) {
                Object.assign(this.queryParams,params.searchParams);
                this.updateStorgeInfo(params.formData);
                this.queryList();
            },
            /**
             * 获取订单详情
             * @param data
             */
            toOrderDetail (data) {
                if (!this.canShowOrderDetail) return;
                if (data['orderType'] === 'individual') {
                    // 散客订单详情
                    this.$router.push({
                        name : 'individualFirstLevel',
                        params : {
                            orderId : data.orderId
                        }
                    });
                } else {
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
                if (!this.judgeCanReturn(data) || !this.canApplyRefund) return;
                this.currentData = data;
                this.queryOrderTicketList(data).then((res) => {
                    if (res.success) {
                        this.orderProductInfo = res.data;
                        this.refundTicketModalShow = true;
                    } else {
                        this.orderProductInfo = {};
                    }
                });
            },
            /**
             * 查询订单详情
             * @param  data 订单信息
             */
            queryOrderTicketList (data) {
                return ajax.post('queryRefundAndAlterTicketList',{
                    visitorProductId : data.visitorProductId
                });
            },
            /**
             * 改签
             * @param  data 订单信息
             */
            alterTicket (data) {
                if (!this.judgeCanAlter(data) || !this.canApplyAlter) return;
                this.currentData = data;
                this.queryOrderTicketList(data).then((res) => {
                    if (res.success) {
                        this.orderProductInfo = res.data;
                        this.alterTicketModalShow = true;
                    } else {
                        this.orderProductInfo = {};
                    }
                });
            },
            /**
             * 判断是否可以退票
             * @param rowData
             */
            judgeCanReturn (rowData) {
                return rowData.returnRule === 'true';
            },
            /**
             * 判断是否可以改签
             * @param rowData
             */
            judgeCanAlter (rowData) {
                return rowData.alterRule === 'true';
            },
            /**
             *  判断是否可以取消订单
             */
            judgeCanCancelOrder (rowData) {
                return rowData.canCancle === 'true';
            },
            /**
             * 跳转到订单详情
             * @param rowData
             */
            toDetail (rowData) {
                if (!this.canShowOrderDetail) return;
                if (rowData.orderType === 'team') {
                    this.$router.push({
                        name : 'teamOrderDetail',
                        params : {
                            orderId : rowData.orderId
                        }
                    });
                } else if (rowData.orderType === 'individual') {
                    this.$router.push({
                        name : 'individualSecondLevel',
                        params : {
                            productDetail : rowData
                        }
                    });
                }
            },
            //同步状态状态过滤
            transSyncStatus : transSyncStatus,
            //短信发送状态过滤
            transSMSStatus : transSMSStatus,
            //支付状态过滤
            transPaymentStatus : transPaymentStatus,
            /**
             * 获取产品名称
             * @param rowData 订单详情数据
             */
            getProductName (rowData) {
                if (rowData.orderType === 'team') {
                    return rowData.productName ? JSON.parse(rowData.productName).join(',') : '';
                } else {
                    return rowData.productName;
                }
            },
            /**
             * 获取路由参数
             * @param{Object} params 路由参数
             * @param{Object} toRoute 去的路由
             * @param{Object} fromRoute 来的路由
             */
            getParams (params,toRoute,fromRoute) {
                if (params && Object.keys(params).length > 0 &&
                    (fromRoute.name === 'individualSecondLevel' ||
                    fromRoute.name === 'individualFirstLevel' ||
                    fromRoute.name === 'teamOrderDetail')) {
                    this.paramsDefault = params;
                }
            },
            /**
             * 取消订单
             * @param {object} rowData
             */
            cancelOrder (rowData) {
                if (!this.judgeCanCancelOrder(rowData)) return;
                this.$refs.applyCancelOrderModal.toggle(rowData);
            }
        },
        computed : {
            ...mapGetters([
                'permissionInfo',
                'lang',
            ]),
            //权限是否允许申请退票操作
            canApplyRefund () {
                return this.permissionInfo && 'applyRefund' in this.permissionInfo;
            },
            //权限是否允许申请改签操作
            canApplyAlter () {
                return this.permissionInfo && 'applyAlter' in this.permissionInfo;
            },
            //是否可以查看订单明细
            canShowOrderDetail () {
                return this.permissionInfo && 'orderDetail' in this.permissionInfo;
            },
            //是否可以显示退票按钮和改签按钮，
            returnTicketMenuShow () {
                //散客非分销订单
                if ((this.queryParams.orderType === 'individual' || this.queryParams.orderType === '')
                    && this.queryParams.allocationStatus === 'false') {
                    return {
                        show : true,
                        width : 170,
                    };
                } else if ((this.queryParams.orderType === 'individual' || this.queryParams.orderType === '')
                    && this.queryParams.orderChannel === 'market') {
                    return {
                        show : true,
                        width : 170,
                    };
                } else {
                    return {
                        show : false,
                        width : 80,
                    };
                }
            },
            //是否显示取消团队订单按钮
            returnTeamMenuShow () {
                if (this.permissionInfo && 'applyRefund' in this.permissionInfo) {
                    if ((this.queryParams.orderType === '' || this.queryParams.orderType === 'team') &&
                        this.queryParams.allocationStatus === 'false') {
                        return {
                            show : true,
                            width : 170
                        };
                    } else {
                        return {
                            show : false,
                            width : 80,
                        };
                    }
                } else {
                    return {
                        show : false,
                        width : 80,
                    };
                }
            }
        },
        created () {
            this.queryList = debounce(this.queryListAjax,300);
        }
    };
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
        .token-ticket:not(:first-child) {
            margin-left: 15px;
        }

        .to-one-level{
            cursor: pointer;
            text-decoration: underline;
        }
    }
</style>
