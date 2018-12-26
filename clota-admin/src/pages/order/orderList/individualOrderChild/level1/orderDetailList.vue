<!--
    散客一级订单详情--订单明细列表
    作者：杨泽涛
-->
<template>
    <div class="order-particular">
        <div class="title">{{$t('orderDetailInformation')}}</div>
        <table-com
            :column-data="columnData"
            :table-data="orderDetailList"
            :table-com-min-height="350"
            :border="true"
            :auto-height="true">
            <!--订单明细编号-->
            <el-table-column
                slot="columnorderDetailNo"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="to-one-level" @click="toSecondLevelOrderDetail(scope.row)">{{scope.row.orderDetailNo | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--产品名称/预定数量-->
            <el-table-column
                slot="columnproductNameAndReserveNum"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.productName | contentFilter}} / {{scope.row.quantity | contentFilter}}</span>
                </template>
            </el-table-column>

            <!--产品单价/小计金额-->
            <el-table-column
                slot="columnproductUnitPriceAndSubTotal"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.price | moneyFilter | contentFilter}} / {{scope.row.totalPrice | moneyFilter | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--取票数量-->
            <el-table-column
                slot="columnquantityPicked"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">{{$t('haveTickets')}}：{{scope.row.quantityPicked ? scope.row.quantityPicked : 0}}</span>
                    <span class="not-token-ticket">{{$t('noHaveTickets')}}：{{scope.row.quantity - scope.row.quantityPicked}}</span>
                </template>
            </el-table-column>
            <!--核销数量-->
            <el-table-column
                slot="columnquantityVerified"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">{{$t('consumed')}}：{{scope.row.quantityVerified ? scope.row.quantityVerified : 0}}</span>
                    <span class="not-token-ticket">{{$t('noConsumed')}}：{{scope.row.quantity - scope.row.quantityVerified}}</span>
                </template>
            </el-table-column>
            <!--退票数量-->
            <el-table-column
                slot="columnquantityRefunded"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">{{$t('retired')}}：{{scope.row.quantityRefunded ? scope.row.quantityRefunded : 0}}</span>
                    <span class="not-token-ticket">{{$t('pendingTrial')}}：{{scope.row.quantityAuditRefunded ? scope.row.quantityAuditRefunded : 0}}</span>
                </template>
            </el-table-column>
            <!--改签数量-->
            <el-table-column
                slot="columnquantityRescheduled"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">{{$t('hasChanged')}}：{{scope.row.quantityRescheduled ? scope.row.quantityRescheduled : 0}}</span>
                    <span class="not-token-ticket">{{$t('pendingTrial')}}：{{scope.row.quantityAuditRescheduled ? scope.row.quantityAuditRescheduled : 0}}</span>
                </template>
            </el-table-column>
            <!--短信发送状态-->
            <el-table-column
                slot="columnsmsStatus"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{$t(transSMSStatus(scope.row.smsStatus)) | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--同步状态-->
            <el-table-column
                slot="columnsyncStatus"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{$t(transSyncStatus(scope.row.syncStatus)) | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--操作-->
            <el-table-column
                slot="columnoperate"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                fixed="right">
                <template slot-scope="scope">
                    <ul class="operate-info">
                        <li class="normal" @click="toSecondLevelOrderDetail(scope.row)">{{$t('check')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './orderDetailListConfig.js';
    import { transSyncStatus, transSMSStatus } from '../../../commFun.js';

    export default {
        props : {
            //产品信息
            orderDetailList : {
                type : Array,
                default () {
                    return [];
                }
            },
        },
        data () {
            return {
                //表头配置
                columnData : columnData,
                //同步状态转换
                transSyncStatus : transSyncStatus,
                //短信发送状态转换
                transSMSStatus : transSMSStatus
            };
        },
        components : {
            tableCom
        },
        methods : {
            /**
             * 进去散客二级订单详情
             * @param data
             */
            toSecondLevelOrderDetail (data) {
                this.$router.push({
                    name : 'individualOrderDetail2Level',
                    params : {
                        orderDetailInfo : data
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .order-particular{
        clear: both;

        .title{
            position: relative;
            padding: 15px 0;
            @include block_outline($height : 52px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 14px;
                vertical-align: middle;
            }
        }

        /deep/ .ivu-form-item{
            margin-bottom: 10px;
        }


        .not-token-ticket{
            color: $color_999;
            margin-left: 15px;
        }

        .status-suc,
        .token-ticket,
        .to-one-level{
            color: $color_blue;
        }

        .status-wait{
            color: $color_yellow;
        }

        .status-fail{
            color: $color_err;
        }

        .to-one-level{
            color: $color_blue;
            cursor: pointer;
        }
    }
</style>

