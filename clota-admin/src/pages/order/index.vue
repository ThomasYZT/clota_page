<!--订单列表-->

<template>
    <div class="order-list">
        <!--订单筛选器-->
        <filter-head>
        </filter-head>
        <div class="content">
            <div class="order-info">
                <Icon type="ios-help"></Icon>
                <span class="note-tips">共计订单数：<span class="icon-weight">1280条</span></span>
                <span class="note-tips">共计金额：<span class="icon-weight">1280元</span></span>
            </div>
            <table-com
                :table-data="tableData"
                :table-height="tableHeight"
                :column-data="orderHead"
                :auto-height="true"
                :row-click="true"
                @row-click="toOrderDetail">
                <el-table-column
                    slot="column11"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    fixed="right"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span
                            class="status resolve">已审核</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column12"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    fixed="right"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span
                            class="status resolve">已审核</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column13"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    fixed="right"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span
                            class="status resolve">已审核</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column14"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    fixed="right"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>
                            <span
                                class="status resolve">已核销：2；</span>
                            <span
                                class="status reject">未核销：0</span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column15"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    fixed="right"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>
                            <span
                                class="status resolve">已核销：2；</span>
                            <span
                                class="status reject">未核销：0</span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column16"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    fixed="right"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span
                            class="status resolve">已同步</span>
                    </template>
                </el-table-column>
            </table-com>
            <div class="page-area" v-if="tableData.length > 0">
                <el-pagination
                    :current-page="pageNo"
                    :page-sizes="pageSizeConfig"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="40">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import filterHead from './child/filterHead';
    import tableCom from '../index/child/tableCom';
    import tableMixins from '../lessee/tableMixins';
    import {orderHead} from './orderConfig';
    export default {
        mixins : [tableMixins],
        components : {
            filterHead,
            tableCom
        },
        data() {
            return {
                //订单列表表头
                orderHead : orderHead,
                tableData : [
                    {
                        orderType : 'team'
                    },
                    {
                        orderType : 'custom'
                    },
                ]
            }
        },
        methods: {
            /**
             * 跳转到订单详情
             * @param data
             */
            toOrderDetail (data) {
                this.$router.push({
                    name : 'orderDetail',
                    params : {
                        orderType : data.orderType
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-list{
        @include block_outline($height : auto);
        min-height: 100%;
        background: $color_fff;
        overflow: auto;

        .content{
            padding: 0 30px;

            .order-info{
                @include block_outline($height : 30px);
                background: $color_E8F7FF;
                border: 1px solid rgba(0,130,213,0.50);
                border-radius: 4px;
                line-height: 27px;
                font-size: $font_size_14px;
                color: rgba($color_000,0.65);
                padding-left: 15px;
                margin-bottom: 10px;

                .ivu-icon-ios-help{
                    font-size: $font_size_17px;
                    color:  $color_0082D5;
                    vertical-align: text-top;
                    margin-right: 10px;
                    margin-top: 1px;
                }

                .note-tips{
                    margin-right: 20px;

                    .icon-weight{
                        color: $color_000;
                    }
                }
            }
        }

        .page-area {
            @include block_outline($height: 57px);
            text-align: right;

            /deep/ .el-pagination {
                display: inline-block;
                padding-top: 15px;
            }
        }

        .status{
            font-size: $font_size_14px;

            &.resolve{
                color: $color_22BB5F;
            }

            &.reject{
                color: $color_00002A;
            }
        }
    }
</style>
