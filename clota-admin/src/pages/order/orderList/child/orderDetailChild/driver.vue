<!--司机信息-->

<template>
    <div class="driver-info">
        <table-com
            :table-data="tableData"
            :column-data="driverHead"
            :is-pack-up="true"
            :title="$t('司机信息')"
            :show-page="true"
            :total="totalCount"
            @get-new-data="getSubCompany">
        </table-com>
    </div>
</template>

<script>
    import { driverHead } from './driverConfig.js';
    import tableCom from '@/components/tableCom/tableCom';
    export default {
        components : {
            tableCom,
        },
        data () {
            return {
                //司机信息表头配置
                driverHead : driverHead,
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
            };
        },
        methods : {
            /**
             * 获取下属景区信息
             */
            getSubCompany () {

            }
        },
        created () {
            this.getSubCompany();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .driver-info{
        @include block_outline($height : auto);
    }
</style>
