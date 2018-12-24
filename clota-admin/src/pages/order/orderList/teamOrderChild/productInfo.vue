<!--产品信息-->

<template>
    <div class="product-info">
        <!--产品信息-->
        <div class="title">{{$t('productInfo')}}</div>
        <table-com
            :column-data="columnData"
            :table-data="productInfoList"
            :border="true"
            :table-com-min-height="250"
            :auto-height="true">
            <el-table-column
                slot="columnproductName"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{getProductName(scope.row)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="columnfirstAllocationPrice"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{getSettlePrice(1,scope.row)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="columnsecondAllocationPrice"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{getSettlePrice(2,scope.row)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="columnthirdAllocationPrice"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{getSettlePrice(3,scope.row)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="columndocumentInfo"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.thirdAllocation}} {{scope.row.thirdAllocationPrice | moneyFilter}}
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData2 } from './productInfoConfig';
    export default {
        props : {
            //产品信息
            'product-info-list' : {
              type : Array,
              default () {
                  return [];
              }
            },
        },
        components : {
            tableCom
        },
        data () {
            return {
                columnData : columnData2
            };
        },
        methods : {
            /**
             * 获取产品名称
             * @param{Object} rowData 行数据
             * @return{String} 产品名称字符串值
             */
            getProductName (rowData) {
                if (rowData.productName) {
                    return JSON.parse(rowData.productName).join(',');
                } else {
                    return '';
                }
            },
            /**
             * 获取分销商价格
             * @param{Number} level 级别
             * @param{Object} rowData 行数据
             */
            getSettlePrice (level,rowData) {
                let orderSettleList = rowData.orderSettleList ? rowData.orderSettleList : [];
                for (let i = 0,j = orderSettleList.length; i < j; i++) {
                    if (orderSettleList[i]['settleLevel'] === level) {
                        return (orderSettleList[i]['orgName'] ? orderSettleList[i]['orgName'] : '-') +
                            '/' +
                            (orderSettleList[i]['settlePrice'] ? orderSettleList[i]['settlePrice'] : '-');
                    }
                }
                return '-/-';
            }
        },
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .product-info{

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
    }
</style>
