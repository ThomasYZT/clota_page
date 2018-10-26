<!--
    散客二级订单--产品明细
    作者：杨泽涛
-->
<template>
    <div class="product-detail">
        <div class="title">产品明细</div>

        <div class="tool-box">
            <ul class="table-info">
                <li class="row">
                    <ul class="list">
                        <li class="col">产品名称： {{productName}}</li>
                        <li class="col">产品单价： {{productPrice | moneyFilter}}</li>
                    </ul>
                </li>
            </ul>

            <div class="btn-wrapper">
                <Button class="ivu-btn-88px" @click="applyChange()">申请改签</Button>
                <Button class="ivu-btn-88px" @click="applyRefund()">申请退票</Button>
            </div>
        </div>

        <div class="table-wrapper">
            <tableCom ref="productTable"
                      :column-data="tableColumn"
                      :table-data="ticketList"
                      :table-com-min-height="250"
                      :border="true"
                      :auto-height="true"
                      :columnCheck="true"
                      :selectable="selectable"
                      @selection-change="selectionChange">
                <el-table-column
                    slot="column2"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span>{{transPickStatus(scope.row.pickStatus) | contentFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column3"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span>{{transVerifyStatus(scope.row.verifyStatus) | contentFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column4"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span>{{transRefundStatus(scope.row.refundStatus) | contentFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column5"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span>{{transRescheduleStatus(scope.row.rescheduleStatus) | contentFilter}}</span>
                    </template>
                </el-table-column>
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
                <!--操作-->
                <el-table-column
                    slot="column7"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    fixed="right">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <li @click="thirdLevelOrderDetail(scope.row)">{{$t('查看')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </tableCom>

            <div class="data-pandect">
                <div class="left">
                    <span class="iconfont icon-note"></span>
                    <span>未取票：{{countData.noRefundNum}}</span>
                    <span>未核销：{{countData.noVerifyNum}}</span>
                    <span>已核销：{{countData.verifyNum}}</span>
                    <span>已退票：{{countData.refundNum}}</span>
                    <span>已改签：{{countData.rescheduleNum}}</span>
                </div>
                <div class="right">
                    <span class="warn">产品预定数量：{{baseInfo.quantity}}</span>
                </div>
            </div>
        </div>

        <!--散客产品明细模态框-->
        <productDetailModal ref="productDetailModal"></productDetailModal>
        <!--退票申请 模态框-->
        <refundModal ref="refundModal"></refundModal>
        <!--改签申请 模态框-->
        <ticketChangingModal ref="ticketChangingModal"></ticketChangingModal>
    </div>
</template>

<script>
    import productDetailModal from '../components/productDetailModal'
    import refundModal from '../components/refundModal';
    import ticketChangingModal from '../components/ticketChangingModal'
    import tableCom from '@/components/tableCom/tableCom';
    import {productDetailInfo} from './secondLevelDetailConfig';
    import {transPickStatus, transRefundStatus, transRescheduleStatus, transVerifyStatus} from '../../../commFun'
    export default {
        components: {
            tableCom,
            productDetailModal,
            refundModal,
            ticketChangingModal
        },
        props: {
            //产品明细列表数据
            ticketList: {
                type: Array,
                default: []
            },
            //产品价格
            productPrice: {
                type: Number,
                default: null
            },
            //产品名称
            productName: {
                type: String,
                default: ''
            },
            //订单基本信息
            baseInfo: {
                type: Object,
                default: {}
            },
            //机构对应订单角色
            orderOrgType: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                //表格配置
                tableColumn: productDetailInfo,
                //已选择的行数据
                chosedData: [],
                //取票状态转换
                transPickStatus: transPickStatus,
                //退票状态转换
                transRefundStatus: transRefundStatus,
                //改签状态转换
                transRescheduleStatus: transRescheduleStatus,
                //核销状态转换
                transVerifyStatus: transVerifyStatus,

            }
        },
        computed: {
            /**
             * 统计数据
             */
            countData() {
                //统计数据
                let _obj = {
                    //未取票数量
                    noRefundNum: 0,
                    //未核销数量
                    noVerifyNum: 0,
                    //已核销数量
                    verifyNum: 0,
                    //已退票数量
                    refundNum: 0,
                    //已改签数量
                    rescheduleNum: 0,
                };

                //计算未取票数量、未核销数量、已核销数量、已退票数量、已改签数量
                this.ticketList.forEach(item => {
                    //未取票
                    if(item.pickStatus == "false") {
                        _obj.noRefundNum += 1;
                    }
                    //未核销
                    if(item.verifyStatus == "false") {
                        _obj.noVerifyNum += 1;
                    }else {
                        _obj.verifyNum += 1;
                    }
                    //已退票
                    if(item.refundStatus == 'refunded') {
                        _obj.refundNum += 1;
                    }
                    //已改签
                    if(item.rescheduleStatus == 'altered') {
                        _obj.rescheduleNum += 1;
                    }
                });
                return _obj;
            }

        },
        methods: {
            /**
             * 查看散客订单三级详情
             * @param data
             */
            thirdLevelOrderDetail(data) {
                this.$refs.productDetailModal.toggle(data);
            },
            /**
             * 申请改签
             */
            applyChange() {
                if(this.chosedData.length > 0) {
                    this.$refs.ticketChangingModal.toggle({
                        chosedData: this.chosedData,
                        baseInfo: this.baseInfo
                    });
                }
            },
            /**
             * 申请退票
             */
            applyRefund() {
                if(this.chosedData.length > 0) {
                    this.$refs.refundModal.toggle({
                        chosedData: this.chosedData,
                        baseInfo: this.baseInfo
                    });
                }
            },
            /**
             * 表格选择
             */
            selectionChange(data) {
                this.chosedData = data;
            },
            /**
             *  table selectable属性
             * @return {boolean}
             */
            selectable: (data) => {
                //旅行社按销售政策的退改规则，只能勾选 已同步的 未取票或未核销 产品申请退改
                //景区可勾选所有产品明细申请退票或改签，包括已核销的产品
                if(this.orderOrgType === 'channel') {
                    // 未取票、未核销、已同步的能够被勾选
                    if(data.pickStatus == "false" && data.verifyStatus == "false" && data.syncStatus == 'success' ) {
                        return false;
                    }else {
                        return true;
                    }
                }else {
                    return true;
                }

            },
        },
        mounted() {

        }
    }
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
                        width: 310px;
                        color: $color_666;
                        @include overflow_tip();

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
            width: 88px;
            height: 32px;
            margin: 0 5px;
            border: 1px solid #2F70DF;
            background-color: $color_fff;
            color: #2F70DF;

            &:last-child {
                margin-right: 0;
            }
        }

    }
</style>
