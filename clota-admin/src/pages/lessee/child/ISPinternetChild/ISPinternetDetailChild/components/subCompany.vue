<!--下属公司-->

<template>
    <div class="sub-company">
        <table-com
            :table-data="tableData"
            :column-data="companies"
            :title="$t('subCompany')"
            :show-page="true"
            :total="totalCount"
            @get-new-data="getSubCompany">
        </table-com>
    </div>
</template>

<script>
    import {companies} from './subCompanyConfig';
    import tableCom from '../../../organization/tableCom';
    export default {
        components : {
            tableCom,
        },
        data() {
            return {
                //下属公司表头配置
                companies : companies,
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
                //下属公司总数
                totalCount : 100,
            }
        },
        methods: {
            /**
             * 获取下属公司信息
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
    .sub-company{
        @include block_outline($height : auto);

        .operate-info{
            @include table_operate();

            .custome{
                color: $color_blue;
            }
        }
    }
</style>
