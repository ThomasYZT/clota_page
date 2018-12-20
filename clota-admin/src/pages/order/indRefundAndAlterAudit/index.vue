<!--散客退票审核-->
<template>
    <div class="group-order">
        <!--筛选条件-->
        <audit-filter :audit-name="'group'"
                      :params-default="paramsDefault"
                      @on-filter="filterAuditList">
        </audit-filter>
        <!--批量审核-->
        <div class="batch-audit">
            <el-dropdown trigger="click"
                         placement="bottom-start"
                         @command="handleCommand">
                <Button type="primary" style="float: left" size="default">{{$t('batchAudit')}}</Button><!--批量审核-->

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in batchAudit"
                                      :key="index"
                                      :disabled="chosenRowData.length <= 0"
                                      :command="item">{{$t(item.label)}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!--审核列表-->
        <table-com
            :ofsetHeight="250"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.page"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            :column-check="true"
            @query-data="queryList"
            @selection-change="changeSelection">
            <!--下单渠道-->
            <el-table-column
                slot="columnorderChannel"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{ $t(transOrderOrg(scope.row.orderChannel)) }}
                </template>
            </el-table-column>
            <!--产品名称/数量-->
            <el-table-column
                slot="columnpNameAndReverseNum"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{getProductName(scope.row) | contentFilter}}</span> |
                    <span>{{scope.row.quantity | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--单价/小计-->
            <el-table-column
                slot="columnunitPriceAndSubtotal"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{$t('unitPrice')}}：{{scope.row.price | moneyFilter}}</span> |
                    <span>{{$t('subtotal')}}：{{scope.row.totalPrice | moneyFilter}}</span>
                </template>
            </el-table-column>
            <!--游客/手机号-->
            <el-table-column
                slot="columnvisitorAndMobilePhone"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.visitorName | contentFilter}} | {{scope.row.phoneNumber | contentFilter}}
                </template>
            </el-table-column>
            <!--同步状态-->
            <el-table-column
                slot="columnsyncStatus"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span :class="{'red-lable' : scope.row.syncStatus === 'failure'}">
                        {{$t(transSyncStatus(scope.row.syncStatus))}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                slot="columnoperate"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <!--通过-->
                    <span class="operate-btn blue" @click="showAuditModal(scope.row, false, 'pass')">{{$t('passed')}}</span>
                    <span class="divide-line"></span>
                    <!--驳回-->
                    <span class="operate-btn red" @click="showAuditModal(scope.row, false, 'reject')">{{$t('reject')}}</span>
                    <span class="divide-line"></span>
                    <span class="operate-btn blue" @click="goTeamOrderDetail(scope.row)">{{$t('details')}}</span>
                </template>
            </el-table-column>
        </table-com>

        <!--批量（通过/驳回）模态框-->
        <bulk-batch-audit-modal ref="bulkBatchAuditModal"
                                @on-audited="queryList">
        </bulk-batch-audit-modal>

        <!--单个（通过/驳回）模态框-->
        <bulk-single-audit-modal ref="bulkSingleAuditModal"
                                 @on-audited="queryList">
        </bulk-single-audit-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import auditFilter from './components/auditFilter.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { bulkRefundHead, batchAudit } from './indRefundAuditConfig';
    import ajax from '@/api/index';
    import { configVariable, notDistributorChannelList, payStatusList } from '@/assets/js/constVariable';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import bulkBatchAuditModal from './components/bulkBatchAuditModal.vue';
    import bulkSingleAuditModal from './components/bulkSingleAuditModal.vue';
    import { transSyncStatus } from '../commFun';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            auditFilter,
            tableCom,
            bulkBatchAuditModal,
            bulkSingleAuditModal
        },
        props : {},
        data () {
            return {
                //表头配置
                columnData : bulkRefundHead,
                //表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                // 获取数据的请求参数
                queryParams : {
                    auditStatus : 'audit', // 只查询待审核的订单
                    page : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                },
                // 已勾选的数据
                chosenRowData : [],
                //是否显示预定模态框
                showReserveModal : false,
                //选择的产品列表
                productList : [],
                //批量审核
                batchAudit : batchAudit,
                //默认筛选条件信息
                paramsDefault : {}
            };
        },
        computed : {},
        created () {
        },
        methods : {
            /**
             * 查询所有团队订单审核信息
             */
            queryList () {
                let params = {
                    createdStartTime : this.queryParams.orderStartDate ? this.queryParams.orderStartDate.format('yyyy-MM-dd 00:00:00') : '',
                    createdEndTime : this.queryParams.orderEndDate ? this.queryParams.orderEndDate.format('yyyy-MM-dd 23:59:59') : '',
                    startOriginVisitDate : this.queryParams.visitStartDate ? this.queryParams.visitStartDate.format('yyyy-MM-dd 00:00:00') : '',
                    endOriginVisitDate : this.queryParams.visitEndDate ? this.queryParams.visitEndDate.format('yyyy-MM-dd 23:59:59') : '',
                    keyword : this.queryParams.keyword,
                    page : this.queryParams.page,
                    pageSize : this.queryParams.pageSize,
                    orderType : 'individual',
                    refundStatus : 'wait',
                    refundAlter : 'refund',
                };
                if (this.queryParams.orderChannel) {
                    Object.assign(params,{ orderChannel : this.queryParams.orderChannel });
                }
                if (this.queryParams.paymentStatus) {
                    Object.assign(params,{ paymentStatus : this.queryParams.paymentStatus });
                }
                if (this.queryParams.productType) {
                    Object.assign(params,{ productType : this.queryParams.productType });
                }
                if (this.queryParams.scenicOrgId && this.queryParams.scenicOrgId !== 'all') {
                    Object.assign(params,{ orgId : this.queryParams.scenicOrgId });
                }
                if (this.queryParams.channelId) {
                    Object.assign(params,{ placeOrderOrgId : this.queryParams.channelId });
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
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection (selection) {
                this.chosenRowData = selection;
            },
            handleCommand (dropItem) {
                if (this.chosenRowData.length <= 0) {
                    this.$Message.error(this.$t('selectChannelOperate'));
                    return;
                }
                if (dropItem.value === 'success') {
                    this.$refs['bulkBatchAuditModal'].show({
                        items : this.chosenRowData,
                        isBatch : true,
                        type : 'pass'
                    });
                } else if (dropItem.value === 'reject') {
                    this.$refs['bulkBatchAuditModal'].show({
                        items : this.chosenRowData,
                        isBatch : true,
                        type : 'reject'
                    });
                }
            },
            /**
             * 下单渠道的code转换
             * @param value 下单渠道code
             * @returns {string}
             */
            transOrderOrg (value) {
                let orderChannel = notDistributorChannelList.find((channel, i) => {
                    return value === channel.value;
                });

                return orderChannel ? `order.${orderChannel.label}` : '-';
            },
            /**
             * 按筛选条件获取审核列表数据
             * @param paramsObj   筛选条件
             */
            filterAuditList (paramsObj) {
                Object.assign(this.queryParams, paramsObj);
                this.updateStorgeInfo(paramsObj);
                this.queryList();
            },
            /**
             * 单个/批量 通过审核（驳回申请）的模态框
             * @param data - 被审核的行数据
             * @param isBatch - 是否批量操作  Boolean
             * @param type - 类型  'pass' | 'reject'
             **/
            showAuditModal (data, isBatch, type) {
                this.$refs['bulkSingleAuditModal'].show({
                    items : isBatch ? data : [data],
                    isBatch : isBatch,
                    type : type
                });
            },
            /**
             * 跳转至散客订单详情
             * @param{Object} scopeRow 订单详情数据
             */
            goTeamOrderDetail (scopeRow) {
                this.$router.push({
                    name : 'indOrderAuditDetail',
                    params : {
                        productDetail : scopeRow
                    },
                });
            },
            /**
             * 获取产品名称
             * @param{Object} rowData 订单详情数据
             */
            getProductName (rowData) {
                if (rowData.productName) {
                    if (rowData.productName.slice(0,1) === '[') {
                        return JSON.parse(rowData.productName).join(',');
                    } else {
                        return rowData.productName;
                    }
                }
                return '';
            },
            /**
             * 获取路由参数
             * @param{Object} params 路由参数
             * @param{Object} toRoute 去的路由
             * @param{Object} fromRoute 来的路由
             */
            getParams (params,toRoute,fromRoute) {
                if (params && Object.keys(params).length > 0 &&
                    (fromRoute.name === 'preAduitTeamOrderDetail')) {
                    this.paramsDefault = params;
                }
            },
            //同步状态
            transSyncStatus : transSyncStatus,
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .group-order {

        .divide-line {
            display: inline-block;
            width: 1px;
            height: 14px;
            margin: 0 5px;
            margin-bottom: -2px;
            background: #E1E1E1;
        }
        .batch-audit {
            overflow: auto;
            margin-bottom: 10px;
            padding-left: 20px;
        }

        .operate-btn {
            cursor: pointer;
        }

        .blue {
            color: $color_blue;
        }
        .red {
            color: $color_red;
        }
    }

    /deep/.el-dropdown-menu__item {
        width: 88px;
        text-align: center;

        &:not(.is-disabled) {
            color: $color_333;
        }
        &:not(.is-disabled):hover, &:focus {
            background-color: #f1f4f8;
            color: $color_blue;
        }
    }
</style>
