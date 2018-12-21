<!--
    团队订单退单审核
    作者：杨泽涛
-->
<template>
    <div class="charge-back">
        <backAuditFilter :audit-name="'bulk'"
                         @on-filter="filterList"></backAuditFilter>

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
                slot="column10"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="operate-btn blue" @click="showAuditModal(scope.row, false, 'pass')">{{$t('passed')}}</span><!--通过-->
                    <span class="divide-line"></span>
                    <span class="operate-btn red" @click="showAuditModal(scope.row, false, 'reject')">{{$t('reject')}}</span>
                    <span class="divide-line"></span>
                    <span class="operate-btn blue" @click="goTeamOrderDetail(scope.row)">{{$t('details')}}</span>
                </template>
            </el-table-column>
        </table-com>

        <!--通过模态框-->
        <audit-pass-modal ref="auditPassModal" @on-audit-pass="queryList"></audit-pass-modal>
        <!--驳回模态框-->
        <audit-reject-modal ref="auditRejectModal" @on-audit-pass="queryList"></audit-reject-modal>
    </div>
</template>

<script>
    import backAuditFilter from './components/backAuditFilter';
    import tableCom from '@/components/tableCom/tableCom';
    import {teamOrderChargeBack, batchAudit} from './auditConfig';
    import auditPassModal from './components/groupAuditPassModal.vue';
    import auditRejectModal from './components/groupAuditRejectModal.vue';
    import ajax from '@/api/index';
    export default {
        components: {
            tableCom,
            backAuditFilter,
            auditPassModal,
            auditRejectModal
        },
        data() {
            return {
                //表头数据
                columnData : teamOrderChargeBack,
                // 获取数据的请求参数
                queryParams: {
                    auditStatus: 'audit',   // 只查询待审核的订单
                    pageNo: 1,
                    pageSize: 10,
                },
                tableData : [],
                totalCount : 0,
                // 已勾选的数据
                chosenRowData: [],
                //批量审核
                batchAudit: batchAudit
            }
        },
        methods: {
            /**
             * 过滤列表数据
             * @param {object} paramsObj
             */
            filterList (paramsObj) {
                Object.assign(this.queryParams, paramsObj);
                this.queryList();
            },
            /**
             * 获取列表数据
             */
            queryList () {
                ajax.post('queryTeamOrder', {
                    ...this.queryParams
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            handleCommand(dropItem) {
                if (this.chosenRowData.length<=0) {
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
             * 表格项被选中
             * @param {array} rows
             */
            changeSelection (rows) {
                this.chosenRowData = rows;
            },
            /**
             * 单个/批量 通过审核（驳回申请）的模态框
             * @param data - 被审核的行数据
             * @param isBatch - 是否批量操作  Boolean
             * @param type - 类型  'pass' | 'reject'
             **/
            showAuditModal(data, isBatch, type) {
                let auditModal = '';
                switch (type) {
                    case 'pass' :
                        auditModal = 'auditPassModal';
                        break;
                    case 'reject' :
                        auditModal = 'auditRejectModal';
                        break;
                }

                this.$refs[auditModal].show({
                    items: isBatch ? data : [data],
                    isBatch: isBatch
                });
            },
            /**
             * 跳转至团队订单详情
             * @param scopeRow
             */
            goTeamOrderDetail(scopeRow) {
                this.$router.push({
                    name: 'teamOrderDetail',
                    params: {orderId: scopeRow.id},
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .charge-back {

        .divide-line {
            display: inline-block;
            width: 1px;
            height: 14px;
            margin: 0 5px;
            margin-bottom: -2px;
            background: #E1E1E1;
        }
        .operate-btn {
            cursor: pointer;
        }

        .order-num {
            text-decoration: underline;
            cursor: pointer;
        }
        .blue {
            color: $color_blue;
        }
        .red {
            color: $color_red;
        }
        .batch-audit {
            @include block_outline();
            margin-bottom: 10px;
            padding-left: 20px;
            line-height: 1;
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
