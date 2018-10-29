<!--
内容：核销管理
作者：djc
日期：
-->

<template>
    <div class="verify-manage">
        <div class="filter-box">
            <Input v-model.trim="filterParam.serialNos"
                   class="input-field"
                   :placeholder="$t('orderSNPlaceholder')" /><!--输入订单串码、多个串码用；隔开-->
            <Button type="primary"
                    :disabled="!filterParam.serialNos"
                    @click="handleSearch">
                {{$t("searching", {msg: ''})}}
            </Button>
            <!--<Button type="ghost" :disabled="!filterParam.serialNos" @click="reset">{{$t("reset")}}</Button>-->
        </div>
        <div class="wrapper">
            <!--取票串码查询结果列表-->
            <div class="result-container" v-if="tableData.orderInfoList && tableData.orderInfoList.length>0">
                <div class="list-sign">{{$t('listForTicketSN')}}
                    <Button type="primary"
                            class="batch-verify"
                            :disabled="chosenRowData.ticket.length<=0"
                            @click="handleCommand('ticket')">{{$t('batchVerify')}}</Button><!--批量核销-->
                </div>
                <table-com
                    :ofsetHeight="170"
                    :show-pagination="false"
                    :column-data="ticketColumnData"
                    :table-data="tableData.orderInfoList"
                    :column-check="true"
                    :border="true"
                    @selection-change="changeTicketSelection">
                    <el-table-column
                        slot="column1"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{scope.row.visitDate | timeFormat('yyyy-MM-dd')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column5"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(transOrderOrg(scope.row.orderChannel))}}
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
                            <span>{{$t('quantity')}}：{{scope.row.quantity | contentFilter}}</span>
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
                            <span>{{$t('unitPrice')}}：{{scope.row.price | moneyFilter}}</span> |
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
                            <span>{{scope.row.visitorName | contentFilter}}</span> |
                            <span>{{scope.row.phoneNumber | contentFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column11"
                        slot-scope="row"
                        show-overflow-tooltip
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <!--已取票-->
                            <span class="blue" style="margin-right: 20px;">{{$t('haveTickets')}}：{{Number(scope.row.quantityPicked) | contentFilter}}</span>
                            <!--未取票-->
                            <span class="gray">{{$t('noHaveTickets')}}：{{Number(scope.row.quantity) - Number(scope.row.quantityPicked)}}</span>
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
                            <!--已核销-->
                            <span class="blue" style="margin-right: 20px;">{{$t('consumed')}}：{{Number(scope.row.quantityVerified) | contentFilter}}</span>
                            <!--未核销-->
                            <span class="gray">{{$t('noConsumed')}}：{{Number(scope.row.quantity) - Number(scope.row.quantityVerified)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column13"
                        slot-scope="row"
                        show-overflow-tooltip
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <!--已退-->
                            <span class="red" style="margin-right: 20px;">{{$t('retired')}}：{{Number(scope.row.quantityRefunded) | contentFilter}}</span>
                            <!--待审-->
                            <span class="yellow">{{$t('pendingTrial')}}：{{Number(scope.row.quantityAuditRefunded) | contentFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column14"
                        slot-scope="row"
                        show-overflow-tooltip
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <!--已改-->
                            <span class="blue" style="margin-right: 20px;">{{$t('hasChanged')}}：{{Number(scope.row.quantityRescheduled) | contentFilter}}</span>
                            <!--待审-->
                            <span class="yellow">{{$t('pendingTrial')}}：{{Number(scope.row.quantityAuditRescheduled) | contentFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column15"
                        slot-scope="row"
                        show-overflow-tooltip
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(transSMSStatus(scope.row.smsStatus))}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column16"
                        slot-scope="row"
                        show-overflow-tooltip
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(transSyncStatus(scope.row.syncStatus))}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        slot="column17"
                        slot-scope="row"
                        :label="row.title"
                        fixed="right"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <!--核销-->
                            <span class="operate-btn blue" @click="showModal(scope.row, false, 'ticket')">{{$t('verification')}}</span>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
            <!--每张门票的核销串码查询结果列表-->
            <div class="result-container" v-if="tableData.orderTicketList && tableData.orderTicketList.length>0">
                <div class="list-sign">{{$t('listForVerifySN')}}
                    <Button type="primary"
                            class="batch-verify"
                            :disabled="chosenRowData.verify.length<=0"
                            @click="handleCommand('verify')">{{$t('batchVerify')}}</Button><!--批量核销-->
                </div>
                <table-com
                    :ofsetHeight="170"
                    :show-pagination="false"
                    :column-data="verifyColumnData"
                    :table-data="tableData.orderTicketList"
                    :column-check="true"
                    :border="true"
                    @selection-change="changeVerifySelection">
                    <el-table-column
                        slot="column6"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(transOrderOrg(scope.row.orderChannel))}}
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
                            <span>{{scope.row.productName | contentFilter}}</span> |
                            <span>{{$t('quantity')}}：{{1}}</span> <!--每张门票的核销，故此处预定数量: 1-->
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
                            <span>{{$t('unitPrice')}}：{{scope.row.price | moneyFilter}}</span> |
                            <span>{{$t('subtotal')}}：{{scope.row.amount | moneyFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column10"
                        slot-scope="row"
                        show-overflow-tooltip
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <span>{{scope.row.visitorName | contentFilter}}</span> |
                            <span>{{scope.row.phoneNumber | contentFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column12"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(transPickStatus(scope.row.pickStatus))}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column13"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(transVerifyStatus(scope.row.verifyStatus))}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column14"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(transRefundStatus(scope.row.refundStatus))}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column15"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(transRescheduleStatus(scope.row.rescheduleStatus))}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column16"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(transSyncStatus(scope.row.syncStatus))}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        slot="column17"
                        slot-scope="row"
                        :label="row.title"
                        fixed="right"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <span class="operate-btn" @click="showModal(scope.row, false, 'verify')">{{$t('verification')}}</span>
                        </template>
                    </el-table-column>
                </table-com>
            </div>

            <!--核销列表无数据的提示-->
            <no-data-tip v-show="tableData.orderInfoList.length<1 && tableData.orderTicketList<1"></no-data-tip>
        </div>
        <!--核销提醒弹框-->
        <verify-modal ref="verifyModal"></verify-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import noDataTip from '@/components/noDataTip/noData-tip.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import {orderTicketHead, orderVerifyHead} from './verifyConfig';
    import ajax from '@/api/index'
    import verifyModal from './child/verifyModal.vue';
    import {transOrderOrg, transSyncStatus, transPickStatus, transRefundStatus, transRescheduleStatus, transVerifyStatus, transSMSStatus} from '../commFun';

    export default {
        components: {tableCom, noDataTip, verifyModal},
        props: {},
        data() {
            return {
                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    serialNos: '',
                },
                // 以取票串码查询的表格表头字段名
                ticketColumnData: orderTicketHead,
                // 以核销串码查询的表格表头字段名
                verifyColumnData: orderVerifyHead,
                // 根据串码搜索的结果数据
                tableData: {
                    orderInfoList: [],      // 以核销串码查询的结果
                    orderTicketList: [],    // 以取票串码查询的结果
                },
                // 已勾选的数据
                chosenRowData: {
                    ticket: [],
                    verify: []
                },
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            queryList() {
                ajax.post('queryOrderInfoBySerialNo', this.queryParams).then((res) => {
                    if (res.success) {
                        this.tableData = res.data || {orderInfoList: [], orderTicketList: []};
                    } else {
                        this.tableData.orderInfoList = [];
                        this.tableData.orderTicketList = [];
                    }
                })
            },
            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeVerifySelection(selection) {
                this.chosenRowData.verify = selection;
            },
            changeTicketSelection(selection) {
                this.chosenRowData.ticket = selection;
            },

            // 搜索核销列表
            handleSearch() {
                this.queryParams.pageNo = 1;
                Object.assign(this.queryParams, this.filterParam);
                this.queryList();
            },
            /**
             * 重置 - 清空输入框内容，并搜索
             */
            reset() {
                this.filterParam.serialNos = '';
                this.handleSearch();
            },
            /**
             * 弹出核销提醒的模态框
             * @param data - 待核销的行数据
             * @param isBatch - 是否批量操作  Boolean
             * @param type - 类型  'ticket'-根据取票串码核销 | 'verify'-根据核销串码核销
             **/
            showModal(data, isBatch, type) {
                this.$refs['verifyModal'].show({
                    list: isBatch ? data : [data],
                    isBatch: isBatch,
                    type: type
                });
            },
            handleCommand(type) {
                if (this.chosenRowData[type].length<=0) {
                    this.$Message.error(this.$t('selectChannelOperate'));
                    return;
                }
                this.showModal(this.chosenRowData[type], true, type);
            },
            // 下单渠道code转换
            transOrderOrg: transOrderOrg,
            // 同步状态code转换
            transSyncStatus: transSyncStatus,
            // 取票状态code转换
            transPickStatus: transPickStatus,
            // 退票状态code转换
            transRefundStatus: transRefundStatus,
            // 改签状态code转换
            transRescheduleStatus: transRescheduleStatus,
            // 短信发送状态code转换
            transSMSStatus: transSMSStatus,
            // 核销状态code转换
            transVerifyStatus: transVerifyStatus,
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .verify-manage{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;


    }

    .filter-box {
        padding: 15px 30px 15px;
        overflow: hidden;
        .input-field {
            width: 400px;
            margin-right: 20px;
        }
    }

    .operate-btn {
        cursor: pointer;
        color: $color_blue;
    }

    .wrapper {
        position: relative;
        height: calc(100% - 60px);
    }

    .result-container {
        margin-bottom: 20px;
        .list-sign {
            margin-bottom: 10px;
            padding: 0 30px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: $color_999;
            line-height: 30px;
        }
        .batch-verify {
            float: right;
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
    }

    .blue {
        color: $color_blue;
    }
    .red {
        color: $color_red;
    }
    .yellow {
        color: $color_yellow;
    }
    .gray {
        color: $color_999;
    }

</style>
