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
    import { columnData1 } from './productInfoConfig';
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
                columnData : columnData1
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
