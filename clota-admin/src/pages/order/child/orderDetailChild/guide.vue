<!--导游信息-->

<template>
    <div class="product-info">
        <table-com
            :table-data="tableData"
            :column-data="guidHead"
            :is-pack-up="true"
            :title="$t('导游信息')"
            :show-page="true"
            :total="totalCount"
            @get-new-data="getSubCompany">
        </table-com>
    </div>
</template>

<script>
    import {guidHead} from './guidConfig';
    import tableCom from '../../../lessee/child/organization/tableCom';
    export default {
        components : {
            tableCom,
        },
        data() {
            return {
                //导游信息表头配置
                guidHead : guidHead,
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
                //导游总数
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
    }
</style>
