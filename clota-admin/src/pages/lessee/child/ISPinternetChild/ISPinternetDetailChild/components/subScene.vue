<!--下属景区-->

<template>
    <div class="sub-scene">
        <table-com
            :table-data="tableData"
            :column-data="region"
            :is-pack-up="true"
            :title="$t('subScene')"
            :show-page="true"
            :total="totalCount"
            @get-new-data="getSubCompany">
        </table-com>
    </div>
</template>

<script>
    import {region} from './subSceneConfig';
    import tableCom from '../../../organization/tableCom';
    export default {
        components : {
            tableCom,
        },
        data() {
            return {
                //下属景区表头配置
                region : region,
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
    .sub-scene{
        @include block_outline($height : auto);

        .operate-info{
            @include table_operate();

            .custome{
                color: $color_blue;
            }
        }
    }
</style>
