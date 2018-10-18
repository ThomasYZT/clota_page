<!--
内容：团队订单预审核
作者：djc
日期：
-->

<template>
    <div class="group-order">
        <!--筛选条件-->
        <audit-filter :audit-name="'group'"
                      @on-filter="filterAuditList">
        </audit-filter>
        <!--批量审核-->
        <div class="batch-audit">
            <el-dropdown trigger="click"
                         placement="bottom-start"
                         @command="handleCommand">
                <Button type="primary" style="float: left" size="default">{{$t('批量审核')}}</Button>

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
            :ofsetHeight="170"
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
                slot="column4"
                slot-scope="row"
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
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.orderAmount | moneyFilter}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column8"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{ $t(transPaymentStatus(scope.row.paymentStatus)) }}
                </template>
            </el-table-column>
            <el-table-column
                slot="column9"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="operate-btn blue" @click="showAuditModal(scope.row, false, 'pass')">{{$t('通过')}}</span>
                    <span class="divide-line"></span>
                    <span class="operate-btn red" @click="showAuditModal(scope.row, false, 'reject')">{{$t('reject')}}</span>
                    <span class="divide-line"></span>
                    <span class="operate-btn blue" @click="">{{$t('details')}}</span>
                </template>
            </el-table-column>
        </table-com>

        <!--通过模态框-->
        <audit-pass-modal ref="auditPassModal" @on-audit-pass="queryList"></audit-pass-modal>
        <!--驳回模态框-->
        <audit-reject-modal ref="auditRejectModal" @on-audit-pass="queryList"></audit-reject-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import auditFilter from './components/auditFilter.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {groupOrderHead, orderChannelEnum, paymentStatusEnum, batchAudit} from './auditConfig';
    import ajax from '@/api/index.js';
    import {configVariable} from '@/assets/js/constVariable.js';
    import auditPassModal from './components/groupAuditPassModal.vue';
    import auditRejectModal from './components/groupAuditRejectModal.vue';

    export default {
        components: {
            auditFilter,
            tableCom,
            auditPassModal,
            auditRejectModal
        },
        props: {},
        data() {
            return {
                //表头配置
                columnData : groupOrderHead,
                //表格数据
                tableData: [],
                //总条数
                totalCount : 0,
                //表格是否显示
//                tableShow : false,
                // 获取数据的请求参数
                queryParams: {
                    auditStatus: 'audit',   // 只查询待审核的订单
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                // 已勾选的数据
                chosenRowData: [],
                //是否显示预定模态框
                showReserveModal : false,
                //选择的产品列表
                productList: [],
                //批量审核
                batchAudit: batchAudit
            }
        },
        computed: {},
        created() {
        },
        methods: {
            /**
             * 查询所有团队订单审核信息
             */
            queryList () {
                ajax.post('queryTeamOrder',{
                    ...this.queryParams
                }).then(res => {
                    if(res.success && res.data){
                        this.tableData = res.data.data || [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection(selection) {
                this.chosenRowData = selection;
            },
            handleCommand(dropItem) {
                if (this.chosenRowData.length<=0) {
                    this.$Message.warning(this.$t('selectChannelOperate'));
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
             * @param value 下单渠道code
             * @returns {string}
             */
            transOrderOrg(value) {
                let orderChannel = orderChannelEnum.find((channel, i) => {
                    return value === channel.value;
                });

                return orderChannel ? orderChannel.label : '-';
            },
            /**
             * 支付状态的code转换
             * @param status  支付状态code
             * @returns {string}
             */
            transPaymentStatus(status) {
                let paymentStatus = paymentStatusEnum.find((payment, i) => {
                    return status === payment.value;
                });

                return paymentStatus ? paymentStatus.label : '-';
            },
            /**
             * 按筛选条件获取审核列表数据
             * @param paramsObj   筛选条件
             */
            filterAuditList(paramsObj) {
                Object.assign(this.queryParams, paramsObj);
                this.queryList();
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
            @include block_outline($height : 50px);
            padding-top: 10px;
            padding-left: 30px;
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
</style>
