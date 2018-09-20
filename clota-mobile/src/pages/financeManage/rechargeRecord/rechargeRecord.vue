<!--
内容：充值记录
作者：djc
日期：
-->

<template>
    <div class="recharge-record">
        <div class="filter-box">
            <Input class="input-field"
                   v-model.trim="filterParam.name"
                   icon="ios-search"
                   :placeholder="$t('请输入任意信息进行查询')"
                   @on-enter="handleSearch"
                   @on-click="handleSearch" />
        </div>
        <table-com
            :ofsetHeight="120"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            @query-data="queryList">
            <el-table-column
                slot="column6"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Tooltip placement="bottom" :transfer="true">
                        <div v-html="statusFilter(scope.row.status)"></div>
                        <div slot="content">
                            <Timeline>
                                <TimelineItem color="green">发布1.0版本</TimelineItem>
                                <TimelineItem color="green">发布2.0版本</TimelineItem>
                                <TimelineItem color="red">严重故障</TimelineItem>
                                <TimelineItem color="blue">发布3.0版本</TimelineItem>
                            </Timeline>
                        </div>
                    </Tooltip>
                </template>
            </el-table-column>
            <el-table-column
                slot="column7"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span v-if="scope.row.status=='rejected'">{{'-'}}
                    </span>
                    <span v-else-if="scope.row.status=='valid'">{{'-'}}
                    </span>
                    <span class="operate"
                          v-else
                          @click="handleAudit(scope.row)">{{$t('审核')}}
                    </span>
                </template>
            </el-table-column>
        </table-com>

        <!--审核充值 - 弹窗-->
        <audit-recharge-modal ref="auditModal"
                              @update-list="queryList"></audit-recharge-modal>
        <!--撤回充值申请 - 弹窗-->
        <recall-modal ref="recallModal"></recall-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import auditRechargeModal from './components/auditModal.vue';
    import recallModal from './components/recallModal.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import {rechargeHead} from '../financeManageConfig';
    import ajax from '@/api/index';

    export default {
        components: {tableCom, auditRechargeModal ,recallModal},
        props: {},
        data() {
            return {
                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    name: '',
                },
                // 表格表头字段名
                columnData: rechargeHead,
                // 列表数据
                tableData: [],
                // 数据总条数
                totalCount: 0,
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        filters: {

        },
        methods: {
            /**
             * 查询充值记录列表
             **/
            queryList() {
                ajax.post('queryRechargeList', this.queryParams).then((res) => {
                    if (res.data && res.data.data) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },

            /**
             * 充值状态过滤器
             * params  status - 状态code
             **/
            statusFilter: function(status) {
                let statusHtml = ``;
                switch (status) {
                    case 'valid' :
                        statusHtml = `<span class="status-recharge pass">${this.$t('审核通过')}</span>`;
                        break;
                    case 'pending_audit' :
                        statusHtml = `<span class="status-recharge pending">${this.$t('待审核')}</span>`;
                        break;
                    case 'rejected' :
                        statusHtml = `<span class="status-recharge reject">${this.$t('已驳回')}</span>`;
                        break;
                }
                return statusHtml;
            },

            // 搜索信息
            handleSearch() {
                this.queryParams.pageNo = 1;
                Object.assign(this.queryParams, this.filterParam);
                this.queryList();
            },
            /**
             * 显示审核弹窗，并传入当前被操作的行数据
             * @param scopeRow - 行数据
             */
            handleAudit(scopeRow) {
                this.$refs.auditModal.show({item: scopeRow});
            },
            /**
             * 显示撤回弹窗，并传入当前被操作的行数据
             * @param scopeRow - 行数据
             */
            handleRecall(scopeRow) {
                this.$refs.recallModal.show({item: scopeRow});
            },
        }
    };
</script>

<style lang="scss">
    @import "~@/assets/scss/base";

    .recharge-record {
        .status-recharge {
            position: relative;
            padding-left: 14px;
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 6px;
                height: 6px;
                border-radius: 50px;
            }
        }
        .pass:after {
            background: $color_green;
        }
        .pending:after {
            background: $color_BBC5D5;
        }
        .reject:after {
            background: $color_red;
        }
    }

    .operate {
        color: $color_blue;
        cursor: pointer;
    }

    .filter-box {
        padding: 15px 30px 15px;
        overflow: hidden;
        .input-field {
            width: 350px;
            float: right;
        }
    }
</style>
