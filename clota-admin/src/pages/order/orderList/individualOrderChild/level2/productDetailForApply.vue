<!--订单明细，包含申请退票和改签功能-->
<template>
    <div class="product-detail">
        <div class="title">{{$t('productDetail')}}</div>

        <div class="tool-box">
            <ul class="table-info">
                <li class="row">
                    <ul class="list">
                        <li class="col">{{$t('productName')}}： {{baseInfo.productName | contentFilter}}</li>
                        <!--中间分销商不可见产品单价-->
                        <li class="col" >{{$t('settlePrice')}}： {{baseInfo.price | moneyFilter | contentFilter}}</li>
                    </ul>
                </li>
            </ul>
            <div class="btn-wrapper" >
                <Button class="ivu-btn-88px ivu-hollow-out-blue"
                        :disabled="!canAlterTicket"
                        @click="applyChange()">{{$t('applyForUpgrade')}}</Button>
                <Button class="ivu-btn-88px ivu-hollow-out-blue"
                        :disabled="!canRefundTicket"
                        @click="applyRefund()">{{$t('ApplyForRefund')}}</Button>
            </div>
        </div>

        <div class="table-wrapper">
            <tableCom ref="productTable"
                      :column-data="tableColumn"
                      :table-data="ticketList"
                      :table-com-min-height="250"
                      :border="true"
                      :auto-height="true"
                      @selection-change="selectionChange">
                <el-table-column
                    slot="columncheck"
                    slot-scope="row"
                    :label="row.title"
                    fixed="left"
                    show-overflow-tooltip
                    type="selection"
                    :width="row.width"
                    :min-width="row.minWidth">
                </el-table-column>
                <el-table-column
                    slot="columnpickStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row.pickStatus === 'true' ? $t('haveTickets') : $t('noHaveTickets')}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="columnverifyStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span v-if="scope.row.verifyStatus === 'true'">{{$t('consumed')}}</span>
                        <span v-else-if="scope.row.verifyStatus === 'false'">{{$t('noConsumed')}}</span>
                        <span v-else-if="scope.row.verifyStatus === 'overdue'">{{$t('expiredVerify')}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="columnrefundStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="yellow-label" v-if="scope.row.refundStatus === 'refund_audit'">{{$t('refundToBeReviewed')}}</span>
                        <span class="red" v-else-if="scope.row.refundStatus === 'refunded'">{{$t('order.refunded')}}</span>
                        <span v-else-if="scope.row.refundStatus === 'no_refund'">{{$t('order.no_refund')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="columnrescheduleStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <!--改签待审核-->
                        <span class="yellow-label" v-if="scope.row.rescheduleStatus === 'alter_audit'">{{$t('ModificationToBeReviewed')}}</span>
                        <!--已改签-->
                        <span class="red" v-else-if="scope.row.rescheduleStatus === 'altered'">{{$t('order.altered')}}</span>
                        <!--未改签-->
                        <span v-else-if="scope.row.rescheduleStatus === 'no_alter'">{{$t('order.no_alter')}}</span>
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
                            <li class="normal" @click="thirdLevelOrderDetail(scope.row)">{{$t('check')}}</li>
                        </ul>
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
            </tableCom>

            <div class="data-pandect">
                <div class="left">
                    <span class="iconfont icon-note"></span>
                    <span>{{$t('noHaveTickets')}}：{{countData.noRefundNum  | contentFilter}}</span>
                    <span>{{$t('haveTickets')}}：{{countData.takenNum  | contentFilter}}</span>
                    <span>{{$t('noConsumed')}}：{{countData.noVerifyNum  | contentFilter}}</span>
                    <span>{{$t('consumed')}}：{{countData.verifyNum  | contentFilter}}</span>
                    <span>{{$t('order.refunded')}}：{{countData.refundNum  | contentFilter}}</span>
                    <span>{{$t('order.altered')}}：{{countData.rescheduleNum  | contentFilter}}</span>
                </div>
                <div class="right">
                    <span class="warn">{{$t('productReserveNum')}}：{{baseInfo.quantity}}</span>
                </div>
            </div>
        </div>

        <!--散客产品明细模态框-->
        <productDetailModal ref="productDetailModal"
                            :visitor-info="visitor"
                            :order-detail="baseInfo">
        </productDetailModal>
        <!--退票申请 模态框-->
        <refundModal ref="refundModal"
                     :refund-ticket-info="chosedData"
                     @fresh-data="$emit('fresh-data')">
        </refundModal>
        <!--改签申请 模态框-->
        <ticketChangingModal ref="ticketChangingModal"
                             :refund-ticket-info="chosedData"
                             @fresh-data="$emit('fresh-data')">
        </ticketChangingModal>
    </div>
</template>

<script>
    import productDetailModal from '../components/productDetailModal';
    import refundModal from '../components/refundModal';
    import ticketChangingModal from '../components/ticketChangingModal';
    import tableCom from '@/components/tableCom/tableCom';
    import { productDetailInfo } from './secondLevelDetailConfig';
    import { transRescheduleStatus, transVerifyStatus,transSyncStatus } from '../../../commFun';

    export default {
        components : {
            tableCom,
            productDetailModal,
            refundModal,
            ticketChangingModal
        },
        props : {
            //产品明细列表数据
            ticketList : {
                type : Array,
                default () {
                    return [];
                }
            },
            //订单基本信息
            baseInfo : {
                type : Object,
                default () {
                    return {};
                }
            },
            //游客信息
            visitor : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                //表格配置
                tableColumn : productDetailInfo,
                //已选择的行数据
                chosedData : [],
                //改签状态转换
                transRescheduleStatus : transRescheduleStatus,
                //核销状态转换
                transVerifyStatus : transVerifyStatus,

            };
        },
        computed : {
            /**
             * 统计数据
             */
            countData () {
                //统计数据
                let _obj = {
                    //未取票数量
                    noRefundNum : 0,
                    //已取票数据
                    takenNum : 0,
                    //未核销数量
                    noVerifyNum : 0,
                    //已核销数量
                    verifyNum : 0,
                    //已退票数量
                    refundNum : 0,
                    //已改签数量
                    rescheduleNum : 0,
                };

                //计算未取票数量、未核销数量、已核销数量、已退票数量、已改签数量
                this.ticketList.forEach(item => {
                    //未取票
                    if (item.pickStatus == "false") {
                        _obj.noRefundNum += 1;
                    } else if (item.pickStatus == "true") {//已取票
                        _obj.takenNum += 1;
                    }
                    //未核销
                    if (item.verifyStatus == "false") {
                        _obj.noVerifyNum += 1;
                    } else {
                        _obj.verifyNum += 1;
                    }
                    //已退票
                    if (item.refundStatus == 'refunded') {
                        _obj.refundNum += 1;
                    }
                    //已改签
                    if (item.rescheduleStatus == 'altered') {
                        _obj.rescheduleNum += 1;
                    }
                });
                return _obj;
            },
            //选择的票是否能退
            canRefundTicket () {
                if (!this.chosedData || this.chosedData.length < 1) {
                    return false;
                } else {
                    return this.chosedData.every(item => item.returnRule === 'true');
                }
            },
            //选择的票是否能改签
            canAlterTicket () {
                if (!this.chosedData || this.chosedData.length < 1) {
                    return false;
                } else {
                    return this.chosedData.every(item => item.alterRule === 'true');
                }
            },

        },
        methods : {
            /**
             * 查看散客订单三级详情
             * @param data
             */
            thirdLevelOrderDetail (data) {
                this.$refs.productDetailModal.toggle(data);
            },
            /**
             * 申请改签
             */
            applyChange () {
                if (this.chosedData.length > 0) {
                    this.$refs.ticketChangingModal.toggle({
                        chosedData : this.chosedData,
                        baseInfo : this.baseInfo
                    });
                }
            },
            /**
             * 申请退票
             */
            applyRefund () {
                if (this.chosedData.length > 0) {
                    this.$refs.refundModal.toggle({
                        chosedData : this.chosedData,
                        baseInfo : this.baseInfo
                    });
                }
            },
            /**
             * 表格选择
             */
            selectionChange (data) {
                this.chosedData = data;
            },
            /**
             * 转换同步状态
             */
            transSyncStatus : transSyncStatus
        },
        mounted () {

        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .product-detail{
        border-radius: 2px;
        margin: 10px 0 6px;
        padding: 2px 0 16px 0;
        position: relative;

        .title{
            position: relative;
            padding: 15px 0 0 0;
            @include block_outline($height : 45px);
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

        .table-wrapper {
            .data-pandect {
                display: flex;
                margin-top: 10px;
                padding-left: 16px;
                height: 30px;
                line-height: 30px;
                background-color: #E8F7FF;
                border-radius: 5px;

                .left {
                    width: auto;
                    flex: 1 1 70%;

                    span.icon-note {
                        color: #2F70DF;
                        margin-right: 15px;
                    }

                    span {
                        margin-right: 40px;
                    }
                }

                .right {
                    flex: 1 1;
                    margin-right: 30px;
                    text-align: right;

                    .warn {
                        color: #EB6751;
                    }
                }

            }
        }

        .tool-box {
            height: 50px;
            width: 100%;
            .table-info {
                float: left;
                display: inline-block;
                vertical-align: middle;
                padding-left: 28px;
                .list{
                    overflow: auto;

                    .col{
                        font-size: $font_size_14px;
                        height: 31px;
                        padding: 6px 0;
                        float: left;
                        color: $color_666;
                        @include overflow_tip();
                        margin-right: 40px;

                        .code{
                            color: $color_yellow;
                        }
                    }
                }
            }

            .btn-wrapper {
                float: right;
                display: inline-block;
                vertical-align: middle;
            }
        }

        .ivu-btn-88px{
            margin-left: 10px;
        }

        .red {
            color: $color_red;
        }

        .yellow-label{
            color: $color_yellow;
        }
    }
</style>
