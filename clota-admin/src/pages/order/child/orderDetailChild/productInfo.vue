<!--产品信息-->

<template>
    <div class="product-info">
        <table-com
            :table-data="tableData"
            :column-data="productHead"
            :is-pack-up="true"
            :title="$t('产品信息')"
            :show-page="true"
            :total="totalCount"
            @get-new-data="getSubCompany">
        </table-com>
    </div>
</template>

<script>
    import {productHead} from './productConfig';
    import tableCom from '../../../lessee/child/organization/tableCom';
    export default {
        components : {
            tableCom,
        },
        data() {
            return {
                //下属景区表头配置
                productHead : productHead,
                //表格数据
                tableData : [
                    {
                        examName : 'examName',
                        status : 'open'
                    },
                    {
                        examName : 'examName',
                        status : 'close'
                    },
                    {
                        examName : 'examName',
                        status : 'pause'
                    }
                ],
                //下属景区总数
                totalCount : 100,
            }
        },
        methods: {
            /**
             * 获取下属景区信息
             */
            getSubCompany () {

            }
        },
        created () {
            this.getSubCompany();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .product-info{
        @include block_outline($height : auto);

        .operate-info{
            @include table_operate();

            .custome{
                color: $color_blue;
            }
        }
    }
</style>
