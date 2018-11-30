<!--
内容：提现记录
作者：djc
日期：
-->

<template>
    <div class="cash-record">
        <!--列表数据筛选器-->
        <head-filter @on-search="searchCashRecords"></head-filter>
        <!--导出-->
        <Button type="primary" style="width: 88px; margin: 10px 30px;"
                @click="">{{$t("exporting")}}</Button>
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
                        <div slot="content" class="record-item"
                             v-for="item in scope.row.operationRecordsVos || []"
                             :key="item.id">
                            <span class="record-time">{{item.createdTime}}</span>
                            <div style="flex: 4;">
                                <span>{{$t(statusLog[item.operationStatus]) | contentFilter}}</span>
                                <div style="margin-top: 10px;" v-if="item.contents">
                                    {{$t('colonSetting', { key: $t('remark') })}} {{item.contents}}
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
                        <li v-if="scope.row.withdrawStatus=='auditing'">{{$t('checked')}}</li>
                        <!--审核状态为“已通过”时，操作按钮：提交转账流水-->
                        <li v-else-if="scope.row.withdrawStatus=='pass'">{{$t('提交转账流水')}}</li>
                        <!--审核状态为“已转账”时，操作按钮：修改转账流水-->
                        <li v-else-if="scope.row.withdrawStatus=='success'">{{$t('修改转账流水')}}</li>
                        <!--审核状态为“已驳回”时，操作按钮：无-->
                        <li v-else>-</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>
<script>
    import headFilter from './components/headFilter.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index';
    import { cashRecordHead } from './cashRecordConfig';

    export default {
        components : {
            headFilter,
            tableCom
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
                    auditStatus : '',// reject_no_req,reject,success,auditing
                    marketTypeId : 'all',
                    marketLevelId : 'all',
                    pageNo : 1,
                    pageSize : 10,
                },
                //审核状态key-value
                withdrawStatus : {
                    auditing : '待审核',
                    pass : '已通过',
                    success : '已转账',
                    reject : '已驳回',
                    reject_no_req : '已驳回',
                },
                //审核状态日志key-value
                statusLog : {
                    MARKET_WITHDRAW_REQ : '申请提现',
                    MARKET_WITHDRAW_REJECT : '驳回',
                    MARKET_WITHDRAW_PASS : '通过',
                    MARKET_WITHDRAW_SUCCESS : '已转账',
                },
            }
        },
        computed : {},
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
            searchCashRecords (params) {
                Object.assign(this.queryParams, params);
                this.queryList();
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

    .record-item {
        display: flex;

        .record-time {
            margin-right: 20px;
            flex: 2;
        }
    }
</style>
