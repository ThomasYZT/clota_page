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
            :ofset-height="325"
            :page-no-d.sync="queryParams.page"
            :page-size-d.sync="queryParams.pageSize"
            @query-data="queryList">
            <el-table-column
                slot="columnorderNo"
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
                slot="columnoriginVisitDate"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.originVisitDate | timeFormat('yyyy-MM-dd')}}
                </template>
            </el-table-column>
            <el-table-column
                slot="columnorderChannel"
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
                slot="columnproductName"
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
                slot="columnsmsStatus"
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
                slot="columnsyncStatus"
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
                slot="columnpaymentStatus"
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
                slot="columnauditStatus"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <!--审核通过-->
                    <span class="status-suc" v-if="scope.row.auditStatus === 'success'">{{$t('checkPass')}}</span>
                    <!--待审核-->
                    <span class="status-wait" v-else-if="scope.row.auditStatus === 'audit'">{{$t('waitChecking')}}</span>
                    <!--审核不通过-->
                    <span class="status-fail" v-else>{{$t('checkNoPass')}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="columnquantityPicked"
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
                slot="columnquantityVerified"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <!--已核销-->
                    <span class="token-ticket">{{$t('consumed')}}：{{scope.row.quantityVerified ? scope.row.quantityVerified : 0}}</span>
                    <!--未核销-->
                    <span class="not-token-ticket">{{$t('noConsumed')}}：{{scope.row.quantity - scope.row.quantityVerified}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="columnquantityRefunded"
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
                slot="columnquantityRescheduled"
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
                slot="columnoperate"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="returnTicketMenuShow.width">
                <template slot-scope="scope">
                    <ul class="operate-info">
                        <li class="normal" v-if="returnTicketMenuShow.show && scope.row.orderType === 'individual'"
                            :class="{disabled : !judgeCanReturn(scope.row)}"
                            @click="refundTicket(scope.row)">{{$t('return')}}</li><!--退票-->
                        <li class="normal" v-if="returnTicketMenuShow.show  && scope.row.orderType === 'individual'"
                            :class="{disabled : !judgeCanAlter(scope.row)}"
                            @click="alterTicket(scope.row)">{{$t('alter')}}</li><!--改签-->
                        <li class="normal"  @click="toDetail(scope.row)">{{$t('details')}}</li><!--详情-->
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
    </div>
</template>

<script>
    import filterHead from './child/filterHead';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './orderConfig';
    import applyRefundTicket from './child/applyRefundTicketModal';
    import ajax from '@/api/index.js';
    import applyAlterTicketModal from './child/applyAlterTicketModal';
    import { transSyncStatus,transSMSStatus,transPaymentStatus } from './commFun.js';
    import debounce from 'lodash/debounce';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            filterHead,
            tableCom,
            applyRefundTicket,
            applyAlterTicketModal
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
                    page : 1,
                    pageSize : 10,
                    orderStartDate : '',
                    orderEndDate : '',
                    visitStartDate : '',
                    visitEndDate : '',
                    orderType : '',
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
                let params = {
                    createdStartTime : this.queryParams.orderStartDate,
                    createdEndTime : this.queryParams.orderEndDate,
                    startOriginVisitDate : this.queryParams.visitStartDate,
                    endOriginVisitDate : this.queryParams.visitEndDate,
                    keyword : this.queryParams.keyword,
                    page : this.queryParams.page,
                    pageSize : this.queryParams.pageSize,
                };
                if (this.queryParams.orderType) {
                    Object.assign(params,{ orderType : this.queryParams.orderType });
                }
                if (this.queryParams.pickStatus) {
                    Object.assign(params,{ pickStatus : this.queryParams.pickStatus });
                }
                if (this.queryParams.refundStatus) {
                    Object.assign(params,{ refundStatus : this.queryParams.refundStatus });
                }
                if (this.queryParams.scenicOrgId) {
                    Object.assign(params,{ orgId : this.queryParams.scenicOrgId });
                }
                if (this.queryParams.orderOrgId) {
                    Object.assign(params,{ placeOrderOrgId : this.queryParams.orderOrgId });
                }
                if (this.queryParams.orderChannel) {
                    Object.assign(params,{ orderChannel : this.queryParams.orderChannel });
                }
                if (this.queryParams.verifyStatus) {
                    Object.assign(params,{ verifyStatus : this.queryParams.verifyStatus });
                }
                if (this.queryParams.rescheduleStatus) {
                    Object.assign(params,{ rescheduleStatus : this.queryParams.rescheduleStatus });
                }
                if (this.queryParams.marketTypeId) {
                    Object.assign(params,{ typeId : this.queryParams.marketTypeId });
                }
                if (this.queryParams.marketLevelId) {
                    Object.assign(params,{ levelId : this.queryParams.marketLevelId });
                }
                if (this.queryParams.paymentStatus) {
                    Object.assign(params,{ paymentStatus : this.queryParams.paymentStatus });
                }
                if (this.queryParams.auditStatus) {
                    Object.assign(params,{ auditStatus : this.queryParams.auditStatus });
                }
                if (this.queryParams.syncStatus) {
                    Object.assign(params,{ syncStatus : this.queryParams.syncStatus });
                }
                if (this.queryParams.abnormalStatus === true) {
                    Object.assign(params,{ onlyAbnormalOrder : true });
                }
                ajax.post('querySecondOrder',{
                    ...params,
                }).then(res => {
                    if (res.status === 200) {
                        this.tableData = res.data ? res.data.list : [];
                        this.totalCount = res.data ? Number(res.data.totalRecord) : 0;
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
                if (data['orderType'] === 'individual') {
                    // 散客订单详情
                    this.$router.push({
                        name : 'individualOrderDetail1Level',
                        params : {
                            orderDetail : data
                        }
                    });
                } else {
                    // 团队订单详情
                    this.$router.push({
                        name : 'teamOrderDetail',
                        params : {
                            orderDetail : data
                        }
                    });
                }

            },
            /**
             * 退票
             * @param data
             */
            refundTicket (data) {
                if (!this.judgeCanReturn(data)) return;
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
                if (!this.judgeCanAlter(data)) return;
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
             * 跳转到订单详情
             * @param rowData
             */
            toDetail (rowData) {
                if (rowData.orderType === 'team') {
                    this.$router.push({
                        name : 'teamOrderDetail',
                        params : {
                            orderId : rowData.orderId
                        }
                    });
                } else if (rowData.orderType === 'individual') {
                    this.$router.push({
                        name : 'individualOrderDetail2Level',
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
                    if (rowData.productName && rowData.productName.slice(0,1) === '[') {
                        return JSON.parse(rowData.productName).join(',');
                    } else {
                        return rowData.productName;
                    }
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
                    (fromRoute.name === 'teamOrderDetail' ||
                        fromRoute.name === 'individualOrderDetail1Level' ||
                        fromRoute.name === 'individualOrderDetail2Level')) {
                    this.paramsDefault = params;
                }
            }
        },
        computed : {
            ...mapGetters([
                'permissionInfo'
            ]),
            //是否可以显示退票按钮和改签按钮，
            returnTicketMenuShow () {
                //散客非分销订单
                if (this.queryParams.orderType === 'individual' || this.queryParams.orderType === '') {
                    return {
                        show : true,
                        width : 170,
                    };
                } else {//散客全民营销订单
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

        .to-one-level{
            cursor: pointer;
            text-decoration: underline;
        }
    }
</style>
