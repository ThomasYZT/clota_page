<!--产品列表-->

<template>
    <div class="product-list">
        <div class="title">产品信息</div>
        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :table-com-min-height="280"
            :auto-height="true">
            <el-table-column
                slot="column5"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.num * scope.row.settlePrice | moneyFilter}}
                </template>
            </el-table-column>
        </table-com>
        <div class="total-info">
            合计：<span class="total-amount">{{totalPrice | moneyFilter}}</span>
        </div>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './productInfoConfig';
    export default {
        props :{
            //选择的产品列表
            'product-list' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom
        },
        data() {
            return {
                //表头配置
                columnData : columnData,
                //表格数据
                tableData : []
            }
        },
        methods: {
        },
        watch : {
            productList (newVal) {
                if(newVal){
                    this.tableData = JSON.parse(JSON.stringify(newVal));
                }else{
                    this.tableData = [];
                }
            }
        },
        computed : {
            //总价
            totalPrice () {
                let amount = 0;
                return this.tableData.reduce((price,item) => {
                   return  price += item.settlePrice * item.num;
                },0)
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .product-list{

        .title{
            position: relative;
            padding: 18px 30px;
            @include block_outline($height : 60px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 10px;
                vertical-align: middle;
            }
        }

        .total-info{
            @include block_outline($height :50px);
            line-height: 50px;
            padding-right: 40px;
            text-align: right;
            font-size: $font_size_16px;
            border-bottom: 1px solid $color_eee;
            color: #303133;

            .total-amount{
                color: $color_yellow;
            }
        }
    }
</style>
