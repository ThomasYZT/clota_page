<!--
内容：退票/改签日志
作者：
日期：
-->

<template>
    <div class="">
        <div class="block-title">{{$t('退票日志')}}</div>
        <!--退票/改签 日志-->
        <table-com
            :table-com-min-height="300"
            :ofsetHeight="170"
            :show-pagination="false"
            :column-data="columnData"
            :table-data="moduleInfo"
            :border="true"
            :column-check="false">
            <el-table-column
                slot="column1"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.reqAccOrg | contentFilter}}</span>
                    <span>{{scope.row.reqAccName | contentFilter}}/{{scope.row.reqTime | contentFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.auditAccOrg | contentFilter}}</span>
                    <span>{{scope.row.auditAccName | contentFilter}}/{{scope.row.auditTime | contentFilter}}</span>
                </template>
            </el-table-column>
        </table-com>

    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {refundAlterLogHead} from '../auditCenter/auditConfig';
    import {transRefundStatus} from '../commFun';

    export default {
        components: {tableCom},
        props: {
            moduleInfo: Array,
        },
        data() {
            return {
                //表头配置
                columnData : refundAlterLogHead,
            }
        },
        methods: {
            // 退票
            transRefundStatus: transRefundStatus,
        },

    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .block-title {
        margin: 15px 0;
        @include info-block-title(20px, 20px, 18px, 14px, $color_blue, 4px);
        /*margin-bottom: 10px;*/
    }

</style>
