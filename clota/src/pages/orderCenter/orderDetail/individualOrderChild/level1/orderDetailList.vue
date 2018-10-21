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
            <!--订单号-->
            <el-table-column
                slot="column0"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="to-one-level" @click="toOrderDetail(scope.row)">{{scope.row.orderNo}}</span>
                </template>
            </el-table-column>
            <!--订单明细编号-->
            <el-table-column
                slot="column1"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="to-one-level" @click="toOrderDetail(scope.row)">{{scope.row.orderDetailNo}}</span>
                </template>
            </el-table-column>
            <!--游玩日期-->
            <el-table-column
                slot="column2"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="to-one-level" @click="toOrderDetail(scope.row)">{{scope.row.visitDate}}</span>
                </template>
            </el-table-column>
            <!--下单时间-->
            <el-table-column
                slot="column3"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="to-one-level" @click="toOrderDetail(scope.row)">{{scope.row.orderTime}}</span>
                </template>
            </el-table-column>
            <!--所属景区-->
            <el-table-column
                slot="column4"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="to-one-level" @click="toOrderDetail(scope.row)">{{scope.row.scenic}}</span>
                </template>
            </el-table-column>

            <!--下单渠道-->
            <el-table-column
                slot="column5"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="to-one-level" @click="toOrderDetail(scope.row)">{{scope.row.orderChannel}}</span>
                </template>
            </el-table-column>
            <!--所属企业-->
            <el-table-column
                slot="column6"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="to-one-level" @click="toOrderDetail(scope.row)">{{scope.row.channel}}</span>
                </template>
            </el-table-column>
            <!--第三方订单号-->
            <el-table-column
                slot="column7"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="to-one-level" @click="toOrderDetail(scope.row)">{{scope.row.thirdOrderNo | contentFilter}}</span>
                </template>
            </el-table-column>
            <!--操作-->
            <el-table-column
                slot="column8"
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

    export default {
        props :{
            //产品信息
            orderDetailList : {
                type : Array,
                default: []
            }
        },
        data() {
            return {
                //表头配置
                columnData : columnData,
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
    }
</style>

