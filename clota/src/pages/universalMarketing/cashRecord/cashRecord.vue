<!--
内容：提现记录
作者：djc
日期：
-->

<template>
    <div class="cash-record">
        <!--列表数据筛选器-->
        <head-filter ref="headFilter" @on-search="searchCashRecords"></head-filter>
        <!--导出-->
        <Button type="primary" style="width: 88px; margin: 10px 30px;"
                @click="exportCashRecord()">{{$t("exporting")}}</Button>
        <!--提现记录列表-->
        <table-com
            :ofsetHeight="135"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            @query-data="queryList">
            <el-table-column
                slot="column10"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Tooltip placement="bottom" :transfer="true">
                        <span>{{$t(withdrawStatus[scope.row.withdrawStatus]) | contentFilter}}</span>
                        <div slot="content" class="content-box">
                            <div class="record-item"
                                 v-for="item in scope.row.operationRecordsVos || []"
                                 :key="item.id">
                                <span class="record-time">{{item.createdTime}}</span>
                                <div style="margin-left: 140px;">
                                    <span>{{$t(statusLog[item.operationStatus]) | contentFilter}}</span>
                                    <div class="remark-content" v-if="item.contents">
                                        {{$t('colonSetting', { key: $t('remark') })}} {{item.contents}}
                                    </div>
                                    <!--<div class="remark-content">
                                        {{$t('colonSetting', { key: $t('remark') })}} {{'ghir983409ifdjfio32908954fhgfhgfhghhihgkjdfhgkj'}}
                                    </div>-->
                                </div>
                            </div>
                        </div>
                    </Tooltip>
                </template>
            </el-table-column>

            <el-table-column
                slot="column12"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <!--审核状态为“待审核”时，操作按钮：审核-->
                        <li v-if="scope.row.withdrawStatus=='auditing' && canAuditWithdraw"
                            @click="showModal('auditCashModal', scope.row)">{{$t('checked')}}</li>
                        <!--审核状态为“已通过”时，操作按钮：提交转账流水-->
                        <li v-else-if="scope.row.withdrawStatus=='pass'"
                            @click="showModal('transferAccountModal', scope.row)">{{$t('submitTransferDetail')}}</li>
                        <!--审核状态为“已转账”时，操作按钮：修改转账流水-->
                        <li v-else-if="scope.row.withdrawStatus=='success'"
                            @click="showModal('transferAccountModal', scope.row)">{{$t('modifyTransferDetail')}}</li>
                        <!--审核状态为“已驳回”时，操作按钮：无-->
                        <li v-else>-</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--审核提现弹窗-->
        <audit-cash-modal ref="auditCashModal" @on-audited="queryList"></audit-cash-modal>
        <!--提交/修改转账流水弹窗-->
        <transfer-account-modal ref="transferAccountModal" @on-submit-success="queryList"></transfer-account-modal>
    </div>
</template>
<script>
    import headFilter from './components/headFilter.vue';
    import auditCashModal from './components/auditCashModal.vue';
    import transferAccountModal from './components/transferAccountModal.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index';
    import { cashRecordHead } from './cashRecordConfig';
    import ajaxConfig from '@/config/index.js';
    import apiList from '@/api/apiList.js';
    import querystring from 'querystring';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            headFilter,
            tableCom,
            auditCashModal,
            transferAccountModal
        },
        props : {},
        data () {
            return {
                //表头配置
                columnData : cashRecordHead,
                //表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                //提现记录传参
                queryParams : {
                    auditStatus : 'reject_no_req,reject,success,auditing,pass',// reject_no_req,reject,success,auditing,pass
                    marketTypeId : 'all',
                    marketLevelId : 'all',
                    pageNo : 1,
                    pageSize : 10,
                },
                //审核状态key-value
                withdrawStatus : {
                    auditing : 'waitChecking', //待审核
                    pass : 'hasPassed', //已通过
                    success : 'hasTransfer', //已转账
                    reject : 'rejected', //已驳回 - 此驳回含义：可再次申请提现
                    reject_no_req : 'rejected', //已驳回 - 此驳回含义：不可再次申请提现
                },
                //审核状态日志key-value
                statusLog : {
                    MARKET_WITHDRAW_REQ : 'withdrawReq', //申请提现
                    MARKET_WITHDRAW_REJECT : 'reject', //驳回
                    MARKET_WITHDRAW_PASS : 'passed', //通过
                    MARKET_WITHDRAW_SUCCESS : 'hasTransfer', //已转账
                },
            };
        },
        computed : {
            ...mapGetters([
                'permissionInfo',
            ]),
            //是否可以审核提现记录
            canAuditWithdraw () {
                return this.permissionInfo && 'auditWithdraw' in this.permissionInfo;
            }
        },
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 查询提现记录列表数据
             */
            queryList () {
                let params = Object.assign({}, this.queryParams);
                ['marketTypeId', 'marketLevelId'].forEach((key, i) => {
                    if (params[key].includes('all')) {
                        params[key] = '';
                    }
                });
                ajax.post('marketing-queryWithdrawRecord',{
                    ...params
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
             * 搜索提现记录
             * @param params  Object
             */
            searchCashRecords (params) {
                Object.assign(this.queryParams, params);
                this.queryList();
            },

            showModal (modalType,scopeRow) {
                this.$refs[modalType].show(scopeRow);
            },
            /**
             * 导出提现记录
             */
            exportCashRecord () {
                let stringifyPar = {
                    auditStatus : this.queryParams.auditStatus == 'reject_no_req,reject,success,auditing,pass' ? '' : this.queryParams.auditStatus,
                    marketTypeId : this.queryParams.marketTypeId.includes('all') ? '' : this.queryParams.marketTypeId,
                    marketLevelId : this.queryParams.marketLevelId.includes('all') ? '' : this.queryParams.marketLevelId,
                    pageNo : 1,
                    pageSize : 9999,
                    token : ajax.getToken()
                };
                window.location.href = `${ajaxConfig.HOST}${apiList['marketing-exportWithdrawRecord']}?${querystring.stringify(stringifyPar)}`;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .cash-record {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius: 4px;

    }

    .content-box {
        max-height: 150px;
        padding: 0 5px;
        overflow-y: auto;
    }

    .record-item {
        min-width: 280px;
        margin: 10px 0;

        .record-time {
            float: left;
            margin-right: 20px;
        }

        .remark-content {
            word-break: break-all;
        }
    }
</style>
