<!--产品信息-->

<template>
    <div class="product-info">
        <div class="title">产品信息</div>
        <table-com
            :column-data="columnData"
            :table-data="productInfoList"
            :border="true"
            :table-com-min-height="250"
            :auto-height="true">
        </table-com>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData1,columnData3,columnData2} from './productInfoConfig';
    export default {
        props : {
            //产品信息
            'product-info-list' : {
              type : Array,
              default () {
                  return [];
              }
            },
            //视图类型
            'view-type' : {
                type : String,
                default : ''
            }
        },
        components :{
            tableCom
        },
        data() {
            return {
                //表头配置
                columnData : columnData
            }
        },
        methods: {},
        computed : {
            columnData () {
                //下单企业
                if(this.viewType === 'channel') {
                    return columnData1;
                }else if(this.viewType === 'scenic'){//景区
                    return columnData2;
                }else if(this.viewType === 'allocation'){//中间分销商
                    return columnData3;
                }
            }
        }
    }
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
