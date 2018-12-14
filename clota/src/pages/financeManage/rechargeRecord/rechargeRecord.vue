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
                   :placeholder="$t('inputAnywordForSearch')"
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
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t(scope.row.paymentType ? 'payType.' + scope.row.paymentType : '-')}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column6"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Tooltip placement="bottom" :transfer="true">
                        <span :class="[scope.row.txnStatus]">{{scope.row.txnStatus ? $t('txnStatus.' + scope.row.txnStatus) : '-'}}</span>
                        <div slot="content">
                            <Timeline>
                                <TimelineItem v-for="(item, index) in scope.row.auditRecordVos"
                                              :key="index"
                                              :color="item.rechargeStatus === 'pending_audit' ? 'green' : item.rechargeStatus === 'rejected' ? 'red' : 'blue'">
                                    <span v-if="item.rechargeStatus === 'pending_audit'">{{$t('finance.pending_audit')}}</span>
                                    <span v-else-if="item.rechargeStatus === 'rejected'">{{$t('finance.rejected')}}</span>
                                    <span v-else-if="item.rechargeStatus === 'valid'">{{$t('finance.valid')}}</span>
                                    <span v-else>-</span>
                                    <span>{{item.orgName | contentFilter}}/{{item.updateUser | contentFilter}}</span>
                                    <p>{{item.updatedTime | contentFilter}}</p>
                                </TimelineItem>
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
                    <span :class="[scope.row.status]">{{scope.row.status ? $t('bizStatus.' + scope.row.status) : '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column8"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                fixed="right"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <!--<span class="operate"-->
                          <!--v-if="scope.row.status === 'pending_audit' && scope.row.peerOrgId === manageOrgs.id"-->
                          <!--@click="handleAudit(scope.row)">{{$t('checked')}}-->
                    <!--</span>-->
                    <!--<span v-else>{{'-'}}</span>-->
                    <ul class="operate-list" v-if="scope.row.txnStatus !=='success' && scope.row.txnStatus !=='fail' && scope.row.txnStatus !=='cancelled'">
                        <li class="operate" @click="query(scope.row)">{{$t('orgStructQuery')}}</li><!--查询-->
                    </ul>
                    <span v-else>-</span>
                </template>
            </el-table-column>
        </table-com>

        <!--审核充值 - 弹窗-->
        <!--<audit-recharge-modal ref="auditModal"-->
                              <!--@update-list="queryList"></audit-recharge-modal>-->
        <!--撤回充值申请 - 弹窗-->
        <!--<recall-modal ref="recallModal"></recall-modal>-->
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import auditRechargeModal from './components/auditModal.vue';
    import recallModal from './components/recallModal.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import {rechargeHead} from '../financeManageConfig';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

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
        computed: {
            ...mapGetters([
                'manageOrgs'
            ])
        },
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
            /**
             * 查询
             * @param {*} data
             */
            query (data) {
                ajax.post('queryConsumeUpdateBiz' , {
                    transactionId : data.transactionId
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('searchPayResult') }));
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('searchPayResult') }));
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
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

        /deep/ .input-field {
            width: 350px;
            float: right;
        }
    }
    /deep/ .ivu-timeline {
        margin-top: 12px;
    }
    /deep/ .ivu-timeline-item-head {
        background-color: #404040;
    }

    .doing {
        color: $color_yellow;
    }

    .success {
        color: $color_green;
    }

    .fail {
        color: $color_red;
    }
</style>
