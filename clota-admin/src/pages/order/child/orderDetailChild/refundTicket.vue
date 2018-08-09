<!--退票信息-->

<template>
    <div class="product-info">
        <table-com
            :table-data="tableData"
            :column-data="refundTicketHead"
            :is-pack-up="true"
            :title="$t('退票信息')"
            :show-page="true"
            :total="totalCount"
            @get-new-data="getSubCompany">
        </table-com>
    </div>
</template>

<script>
    import {refundTicketHead} from './refundTickConfig';
    import tableCom from '../../../lessee/child/organization/tableCom';
    export default {
        components : {
            tableCom,
        },
        data() {
            return {
                //退票信息表头配置
                refundTicketHead : refundTicketHead,
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
