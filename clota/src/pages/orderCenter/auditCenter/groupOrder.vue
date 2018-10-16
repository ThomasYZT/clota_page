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
                    {{transOrderOrg(scope.row.orderChannel)}}
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
                    {{transPaymentStatus(scope.row.paymentStatus)}}
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
                    <span class="operate-btn blue" @click="auditPass(scope.row)">{{$t('通过')}}</span>
                    <span class="divide-line"></span>
                    <span class="operate-btn red" @click="">{{$t('reject')}}</span>
                    <span class="divide-line"></span>
                    <span class="operate-btn blue" @click="">{{$t('details')}}</span>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>
<script type="text/ecmascript-6">
    import auditFilter from './components/auditFilter.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {groupOrderHead, orderChannelEnum, paymentStatusEnum} from './auditConfig';
    import ajax from '@/api/index.js';
    import {configVariable} from '@/assets/js/constVariable.js';
    import auditPassModal from './components/auditPassModal.vue';

    export default {
        components: {
            auditFilter,
            tableCom,
            auditPassModal,
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
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                // 已勾选的数据
                chosenRowData: [],
                //是否显示预定模态框
                showReserveModal : false,
                //选择的产品列表
                productList : []
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
             * 单个/批量 通过审核
             * @param type - 通过审核 类型
             * @param scopeRow - 修改时的行数据
             **/
            auditPass(type, scopeRow) {
//                this.$refs.auditPassModal.show(obj);
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
