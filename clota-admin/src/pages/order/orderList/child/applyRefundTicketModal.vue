<!--申请退票-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        :width="800"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="refund-ticket"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <!--申请退票-->
            <span class="title">{{$t('ApplyForRefund')}}</span>
        </div>
        <div class="target-body">
            <ul class="tourist-info">
                <!--您正在申请对以下产品进行退票-->
                <li><span class="key">{{$t('reqRefundForProducts')}}：</span></li>
            </ul>
            <table-com
                :column-data="columnData"
                :table-data="tableData"
                :height="224"
                @selection-change="handleSelectionChange">
                <el-table-column
                    slot="columncheck"
                    slot-scope="row"
                    :selectable="selectableFunc"
                    :label="row.title"
                    fixed="left"
                    type="selection"
                    :width="row.width"
                    :min-width="row.minWidth">
                </el-table-column>
                <!--游玩日期-->
                <el-table-column
                    slot="columnvisitDate"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row['visitDate'] | timeFormat('yyyy-MM-dd')}}
                    </template>
                </el-table-column>
                <!--取票状态-->
                <el-table-column
                    slot="columnpickStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{'blue-lable' : scope.row.pickStatus === 'true'}">
                            <!--{{scope.row.pickStatus === 'true' ? $t('已取票') : $t('未取票')}}-->
                            {{scope.row.pickStatus === 'true' ? $t('haveTickets') : $t('noHaveTickets')}}
                        </span>
                    </template>
                </el-table-column>
                <!--核销状态-->
                <el-table-column
                    slot="columnverifyStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{'blue-lable' : scope.row.verifyStatus === 'true'}">
                            <!--{{scope.row.verifyStatus === 'true' ? $t('已核销') : $t('未核销')}}-->
                            {{scope.row.verifyStatus === 'true' ? $t('consumed') : $t('noConsumed')}}
                        </span>
                    </template>
                </el-table-column>
                <!--退票状态-->
                <el-table-column
                    slot="columnrefundStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{'red-lable' : scope.row.refundStatus === 'refunded','yellow-lable' : scope.row.refundStatus === 'refund_audit'}">
                            {{$t('order.' + scope.row.refundStatus)}}
                        </span>
                    </template>
                </el-table-column>
                <!--改签状态-->
                <el-table-column
                    slot="columnrescheduleStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{'red-lable' : scope.row.rescheduleStatus === 'altered','yellow-lable' : scope.row.rescheduleStatus === 'alter_audit'}">
                            {{$t('order.' + scope.row.rescheduleStatus)}}
                        </span>
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
                        <span :class="{'red-lable' : scope.row.syncStatus === 'failure'}">
                            {{$t(transSyncStatus(scope.row.syncStatus))}}
                        </span>
                    </template>
                </el-table-column>
            </table-com>
            <!--退票手续费-->
            <div class="service-charge">{{$t('cancellationCharge')}}：<span class="charge">{{refundFee | moneyFilter}} {{$t('yuan')}}</span></div>
            <div class="err-message" v-if="errMsg">{{errMsg}}</div>
        </div>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirm">{{$t('confirm')}}</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './applyRefundTicketConfig';
    import ajax from '@/api/index.js';
    import { transSyncStatus } from '../../commFun';

    export default {
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default : false
            },
            //订单详情
            orderDetail : {
                type : Object,
                default () {
                    return '';
                }
            },
            //产品信息
            'product-info' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom
        },
        data () {
            return {
                //表头配置
                columnData : columnData,
                //选择的产品信息
                selectedTicket : [],
                //错误信息
                errMsg : '',
                //退票费
                refundFee : 0
            };
        },
        methods : {
            /**
             * 隐藏模态框
             */
            cancel () {
                this.changeValue(false);
            },
            /**
             * 模态框状态改变
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange (type) {

            },
            /**
             * 确定退票
             */
            confirm () {
                if (this.selectedTicket.length > 0) {
                    this.saveOrderProductRefundAlter();
                } else {
                    this.$Message.warning(this.$t('selectField', { sg : this.$t('productNeedsRefund') })); // 请选择需要退票的产品
                }
            },
            /**
             * 选择的产品信息
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedTicket = data;
                this.errMsg = '';
                for (let i = 0,j = data.length; i < j; i++) {
                    //如果景区退票的时候选择了已核销的产品需要给出提示
                    if (data[i]['verifyStatus'] === 'true') {
                        this.errMsg = this.$t('refundProductTip'); // 提示：您申请退票的产品中包含已核销的产品
                        break;
                    }
                }
            },
            /**
             * 判断一个产品是否可选
             * @param data
             * @returns {boolean}
             */
            selectableFunc (data) {
                return data.returnRule === 'true';
            },
            //同步状态
            transSyncStatus : transSyncStatus,
            /**
             * 发起退票申请
             */
            saveOrderProductRefundAlter () {
                ajax.post('saveOrderProductRefundAlter',{
                    orderId : this.orderDetail.orderId,
                    visitorProductId : this.orderDetail.visitorProductId,
                    productId : this.selectedTicket[0]['productId'],
                    reqOrderTicketIds : this.selectedTicket.map(item => item.id).join(','),
                    reqType : 'refund',
                    orgId : this.orderDetail.orgId
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('ApplicationForRefundSuccess')); // 发起退票申请成功
                        this.cancel();
                        this.$emit('fresh-data');
                    } else {
                        this.$Message.error(this.$t('ApplicationForRefundFail')); // 发起退票申请失败
                    }
                });
            },
            /**
             * 获取退票手续费
             */
            getRefundProcedureFee () {
                ajax.post('getRefundProcedureFee',{
                    orderProductId : this.selectedTicket[0]['orderProductId'],
                    orderId : this.orderDetail.orderId,
                    orderTicketIds : this.selectedTicket.map(item => item.id).join(','),
                }).then(res => {
                    if (res.status === 200) {
                        this.refundFee = res.data ? res.data : 0;
                    } else {
                        this.refundFee = 0;
                    }
                });
            }
        },
        computed : {
            //订单下的产品信息
            tableData () {
                if (this.productInfo && this.productInfo.length > 0) {
                    return this.productInfo;
                } else {
                    return [];
                }
            },
        },
        watch : {
            selectedTicket (newVal) {
                if (newVal && newVal.length > 0) {
                    this.getRefundProcedureFee();
                } else {
                    this.refundFee = 0;
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .refund-ticket{

        /deep/ .ivu-modal-body{
            padding: 0;
        }

        /deep/ .table-com{
            border-top: 1px solid #ebeef5;

            .el-table th{
                padding: 8px 0;
            }

            .ivu-form-item-content{
                line-height: 30px;
            }

            .el-table td{
                padding: 4px 0;

                .cell{
                    line-height: 31px;
                }
            }
        }

        .target-body{
            padding: 0 30px;

            .blue-lable{
                color: $color_blue;
            }

            .red-lable{
                color: $color_err;
            }

            .yellow-lable{
                color: $color_yellow;
            }

            .tourist-info{
                height: 60px;
                padding: 20px 0 20px 13px;
                line-height: 20px;
                font-size: $font_size_14px;

                li{
                    float: left;
                    margin-right: 100px;

                    .key{
                        color: #585858;
                    }

                    .value{
                        color: $color_333;
                    }
                }
            }

            .service-charge{
                height: 46px;
                padding: 15px 0;
                line-height: 16px;
                font-size: $font_size_12px;
                color: #353B48;

                .charge{
                    color: $color_yellow;
                }
            }

            .err-message{
                height: 56px;
                line-height: 16px;
                font-size: $font_size_12px;
                color: $color_err;
                padding: 20px 0;
                text-align: center;
            }
        }
    }
</style>
