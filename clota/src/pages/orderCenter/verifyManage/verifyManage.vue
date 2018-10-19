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
                   :placeholder="$t('输入订单串码、多个串码用; 隔开')" /><!--输入订单串码、多个串码用；隔开-->
            <Button type="primary" :disabled="!filterParam.serialNos" @click="handleSearch">{{$t("search", {msg: ''})}}</Button>
            <!--<Button type="ghost" :disabled="!filterParam.serialNos" @click="reset">{{$t("reset")}}</Button>-->
        </div>
        <div class="wrapper">
            <!--取票串码查询结果列表-->
            <div class="result-container" v-if="tableData.orderTicketList && tableData.orderTicketList.length>0">
                <div class="list-sign">{{$t('取票串码查询结果列表')}}
                    <Button type="primary"
                            class="batch-verify"
                            :disabled="chosenRowData.ticket.length<=0"
                            @click="handleCommand('ticket')">{{$t('批量核销')}}</Button>
                </div>
                <table-com
                    :ofsetHeight="170"
                    :show-pagination="false"
                    :column-data="ticketColumnData"
                    :table-data="tableData.orderTicketList"
                    :column-check="true"
                    :border="true"
                    @selection-change="changeTicketSelection">

                    <el-table-column
                        slot="column17"
                        slot-scope="row"
                        :label="row.title"
                        fixed="right"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <span class="operate-btn blue" @click="showModal(scope.row, false, 'ticket')">{{$t('核销')}}</span>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
            <!--每张门票的核销串码查询结果列表-->
            <div class="result-container" v-if="tableData.orderInfoList && tableData.orderInfoList.length>0">
                <div class="list-sign">{{$t('每张门票的核销串码查询结果列表')}}
                    <Button type="primary"
                            class="batch-verify"
                            :disabled="chosenRowData.verify.length<=0"
                            @click="handleCommand('verify')">{{$t('批量核销')}}</Button>
                </div>
                <table-com
                    :ofsetHeight="170"
                    :show-pagination="false"
                    :column-data="verifyColumnData"
                    :table-data="tableData.orderInfoList"
                    :column-check="true"
                    :border="true"
                    @selection-change="changeVerifySelection">

                    <el-table-column
                        slot="column17"
                        slot-scope="row"
                        :label="row.title"
                        fixed="right"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <span class="operate-btn" @click="showModal(scope.row, false, 'verify')">{{$t('核销')}}</span>
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
                    if (res.success && res.data) {
                        this.tableData = res.data;
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
                    this.$Message.warning(this.$t('selectChannelOperate'));
                    return;
                }
                this.showModal(this.chosenRowData[type], true, type);
            },
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
    }

</style>
