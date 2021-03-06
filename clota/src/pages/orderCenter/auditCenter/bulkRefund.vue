<!--
内容：散客退票审核
作者：djc
日期：
-->

<template>
    <div class="group-order">
        <!--筛选条件-->
        <audit-filter :audit-name="'bulk'"
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
            :ofsetHeight="240"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            :column-check="true"
            @query-data="queryList"
            @selection-change="changeSelection">
            <el-table-column
                slot="column0"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="order-num blue" @click="goBulkLevel1Detail(scope.row)">{{scope.row.orderNo}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column5"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{ $t(transOrderOrg(scope.row.orderChannel)) }}
                </template>
            </el-table-column>
            <el-table-column
                slot="column7"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.productName | contentFilter}}</span> |
                    <span>{{scope.row.quantity | contentFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column8"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <!--单价-->
                    <span>{{$t('unitPrice')}}：{{scope.row.price | moneyFilter}}</span> |
                    <!--小计-->
                    <span>{{$t('subtotal')}}：{{scope.row.amount | moneyFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column9"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.visitorName | contentFilter}} | {{scope.row.phoneNumber | contentFilter}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column12"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{ $t(transSyncStatus(scope.row.syncStatus)) }}
                </template>
            </el-table-column>

            <el-table-column
                slot="column13"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="showAuditModal(scope.row, false, 'pass')">{{$t('passed')}}</li>
                        <li class="red-label" @click="showAuditModal(scope.row, false, 'reject')">{{$t('reject')}}</li>
                        <li @click="goBulkDetail(scope.row)">{{$t('details')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--批量（通过/驳回）模态框-->
        <bulk-batch-audit-modal ref="bulkBatchAuditModal" @on-audited="queryList"></bulk-batch-audit-modal>
        <!--单个（通过/驳回）模态框-->
        <bulk-single-audit-modal ref="bulkSingleAuditModal" @on-audited="queryList"></bulk-single-audit-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import auditFilter from './components/auditFilter.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { bulkRefundHead, batchAudit } from './auditConfig';
    import ajax from '@/api/index';
    import { configVariable } from '@/assets/js/constVariable';
    import bulkBatchAuditModal from './components/bulkBatchAuditModal.vue';
    import bulkSingleAuditModal from './components/bulkSingleAuditModal.vue';
    import { transOrderOrg, transSyncStatus } from '../commFun';

    export default {
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
                columnData : bulkRefundHead.filter(item => {
                    return item.field !== 'afterAlterDate';
                }),
                //表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                // 获取数据的请求参数
                queryParams : {
                    reqType : 'refund',
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                },
                // 已勾选的数据
                chosenRowData : [],
                //是否显示预定模态框
                showReserveModal : false,
                //选择的产品列表
                productList : [],
                //批量审核
                batchAudit : batchAudit
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
                ajax.post('queryOrderRefundAlterAuditList',{
                    ...this.queryParams
                }).then(res => {
                    if (res.success && res.data) {
                        this.tableData = res.data.data || [];
                        this.totalCount = res.data.totalRow;
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
                switch (dropItem.value) {
                    case 'success' :
                        this.showAuditModal(this.chosenRowData, true, 'pass');
                        break;
                    case 'reject' :
                        this.showAuditModal(this.chosenRowData, true, 'reject');
                        break;
                }
            },
            /**
             * 下单渠道的code转换
             */
            transOrderOrg : transOrderOrg,
            /**
             * 同步状态的code转换
             */
            transSyncStatus : transSyncStatus,
            /**
             * 按筛选条件获取审核列表数据
             * @param paramsObj   筛选条件
             */
            filterAuditList (paramsObj) {
                Object.assign(this.queryParams, paramsObj);
                this.queryList();
            },
            /**
             * 单个/批量 通过审核（驳回申请）的模态框
             * @param data - 被审核的行数据
             * @param isBatch - 是否批量操作  Boolean
             * @param type - 类型  'pass' | 'reject'
             **/
            showAuditModal (data, isBatch, type) {
                let auditModal = '';
                auditModal = isBatch ? 'bulkBatchAuditModal' : 'bulkSingleAuditModal';
                this.$refs[auditModal].show({
                    items : isBatch ? data : [data],
                    isBatch : isBatch,
                    type : type
                });
            },
            /**
             * 跳转至散客退票审核详情
             * @param scopeRow
             */
            goBulkDetail (scopeRow) {
                this.$router.push({
                    name : 'bulkRefundDetail',
                    query : { reqType : 'refund' },
                    params : { rowData : scopeRow }
                });
            },
            /**
             * 跳转至散客一级订单详情
             * @param scopeRow
             */
            goBulkLevel1Detail (scopeRow) {
                this.$router.push({
                    name : 'individualFirstLevel',
                    params : { orderId : scopeRow.orderId },
                });
            },
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
            @include block_outline();
            margin-bottom: 10px;
            padding-left: 20px;
            line-height: 1;
        }

        .operate-btn {
            cursor: pointer;
        }

        .order-num {
            text-decoration: underline;
            cursor: pointer;
        }

        /*.col-ellipsis-name {
            float: left;
            max-width: 75px;
            @include overflow_tip();
        }

        .col-ellipsis-number {
            display: inline-block;
            max-width: 46px;
            @include overflow_tip();
        }*/

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
