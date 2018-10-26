<!--
    散客一级订单详情--订单明细列表
    作者：杨泽涛
-->
<template>
    <div class="order-particular">
        <div class="title">订单明细信息</div>
        <table-com
            :column-data="columnData"
            :table-data="orderDetailList"
            :table-com-min-height="250"
            :border="true"
            :auto-height="true">
            <!--订单明细编号-->
            <el-table-column
                slot="column0"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="to-one-level" @click="toSecondLevelOrderDetail(scope.row)">{{scope.row.orderDetailNo | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--游玩日期-->
            <el-table-column
                slot="column1"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.visitDate | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--第三方订单编号-->
            <el-table-column
                slot="column2"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.thirdOrderNo | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--游客手机号-->
            <el-table-column
                slot="column3"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.phoneNumber | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--产品名称/预定数量-->
            <el-table-column
                slot="column4"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.productName}} / {{scope.row.quantity}}</span>
                </template>
            </el-table-column>

            <!--产品单价/小计金额-->
            <!-- 该数据中间分销商不可见 -->
            <el-table-column
                v-if="orderOrgType !== 'allocation'"
                slot="column5"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.price | moneyFilter}} / {{scope.row.amount | moneyFilter}}</span>
                </template>
            </el-table-column>
            <!--串码-->
            <el-table-column
                slot="column6"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.serialNo | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--取票数量-->
            <el-table-column
                slot="column7"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">已取票：{{scope.row.quantityPicked ? scope.row.quantityPicked : 0}}</span>
                    <span class="not-token-ticket">未取票：{{scope.row.quantity - scope.row.quantityPicked}}</span>
                </template>
            </el-table-column>
            <!--核销数量-->
            <el-table-column
                slot="column8"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">已核销：{{scope.row.quantityVerified ? scope.row.quantityVerified : 0}}</span>
                    <span class="not-token-ticket">未核销：{{scope.row.quantity - scope.row.quantityVerified}}</span>
                </template>
            </el-table-column>
            <!--退票数量-->
            <el-table-column
                slot="column9"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">已退：{{scope.row.quantityRefunded ? scope.row.quantityRefunded : 0}}</span>
                    <span class="not-token-ticket">待审：{{scope.row.quantityAuditRefunded ? scope.row.quantityAuditRefunded : 0}}</span>
                </template>
            </el-table-column>
            <!--改签数量-->
            <el-table-column
                slot="column10"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="token-ticket">已改：{{scope.row.quantityRescheduled ? scope.row.quantityRescheduled : 0}}</span>
                    <span class="not-token-ticket">待审：{{scope.row.quantityAuditRescheduled ? scope.row.quantityAuditRescheduled : 0}}</span>
                </template>
            </el-table-column>
            <!--短信发送状态-->
            <!--该数据只有景区可见-->
            <el-table-column
                v-if="orderOrgType === 'scenic'"
                slot="column11"
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
            <!--该数据只有景区可见-->
            <el-table-column
                v-if="orderOrgType === 'scenic'"
                slot="column12"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{$t(transSyncStatus(scope.row.syncStatus)) | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--进货单价/小计金额-->
            <!--该数据只有中间分销商可见-->
            <el-table-column
                v-if="orderOrgType === 'allocation'"
                slot="column13"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.inPrice | moneyFilter}} / {{scope.row.inAmount | moneyFilter}}</span>
                </template>
            </el-table-column>
            <!--分销单价/小计金额-->
            <!--该数据只有中间分销商可见-->
            <el-table-column
                v-if="orderOrgType === 'allocation'"
                slot="column14"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.settlePrice | moneyFilter}} / {{scope.row.settleAmount | moneyFilter}}</span>
                </template>
            </el-table-column>
            <!--预计分销佣金-->
            <!--该数据只有中间分销商可见-->
            <el-table-column
                v-if="orderOrgType === 'allocation'"
                slot="column15"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.allocationCommission | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--操作-->
            <el-table-column
                slot="column16"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                fixed="right">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="toSecondLevelOrderDetail(scope.row)">{{$t('查看')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './orderDetailListConfig.js';
    import {transSyncStatus, transSMSStatus} from '../../../commFun.js'

    export default {
        props :{
            //产品信息
            orderDetailList : {
                type : Array,
                default: []
            },
            //机构对应订单角色
            orderOrgType : {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                //表头配置
                columnData : columnData,
                //同步状态转换
                transSyncStatus: transSyncStatus,
                //短信发送状态转换
                transSMSStatus: transSMSStatus
            }
        },
        components :{
            tableCom
        },
        methods: {
            /**
             * 进去散客二级订单详情
             * @param data
             */
            toSecondLevelOrderDetail(data) {
                this.$router.push({
                    name: 'individualSecondLevel',
                    params: {
                        productDetail: data
                    }
                })
            }
        }
    }
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

