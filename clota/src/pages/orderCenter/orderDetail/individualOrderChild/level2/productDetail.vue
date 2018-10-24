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
            <tableCom :column-data="tableColumn"
                      :table-data="ticketList"
                      :table-com-min-height="250"
                      :border="true"
                      :auto-height="true"
                      :columnCheck="true"
                      @selection-change="selectionChange">
                <el-table-column
                    slot="column2"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span>{{scope.row.pickStatus ? '已取票' : '未取票'}}</span>
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
                        <span>{{scope.row.verifyStatus ? '已核销' : '未核销'}}</span>
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
                        <span>{{scope.row.refundStatus ? '已退票' : '未退票'}}</span>
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
                        <span>{{scope.row.rescheduleStatus ? '已改签' : '未改签'}}</span>
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
                        <span>{{scope.row.rescheduleStatus ? '已改签' : '未改签'}}</span>
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
    import {productDetailInfo} from './secondLevelDetailConfig'
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
            //产品明细id
            visitorProductId: {
                type: String,
                default: ''
            },
            //订单基本信息
            baseInfo: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                //表格配置
                tableColumn: productDetailInfo,
                //已选择的行数据
                chosedData: [],
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
            }
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
