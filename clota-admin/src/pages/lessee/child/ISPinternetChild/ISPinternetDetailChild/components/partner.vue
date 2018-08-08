<!--合作伙伴-->

<template>
    <div class="partner">
        <table-com
            :table-data="tableData"
            :column-data="paratner"
            :title="$t('partner')"
            :show-page="true"
            :total="totalCount"
            @get-new-data="getSubCompany">
        </table-com>
    </div>
</template>

<script>
    import {paratner} from './partnerConfig';
    import tableCom from '../../../organization/tableCom';
    export default {
        components : {
            tableCom,
        },
        data() {
            return {
                //合作伙伴表头配置
                paratner : paratner,
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
                //合作伙伴总数
                totalCount : 100,
            }
        },
        methods: {
            /**
             * 获取合作伙伴信息
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
    .partner{
        @include block_outline($height : auto);

        .operate-info{
            @include table_operate();

            .custome{
                color: $color_blue;
            }
        }
    }
</style>
