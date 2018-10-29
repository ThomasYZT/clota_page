<!--
内容：核销日志
作者：
日期：
-->

<template>
    <div class="">
        <!--核销日志-->
        <div class="block-title">{{$t('verifyLog')}}</div>
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
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.orgName | contentFilter}}</span>
                    <span>{{scope.row.operator | contentFilter}}/{{scope.row.operatedTime | contentFilter}}</span>
                </template>
            </el-table-column>
        </table-com>

    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {verifyLogHead} from '../auditCenter/auditConfig';

    export default {
        components: {tableCom},
        props: {
            moduleInfo: Array
        },
        data() {
            return {
                //表头配置
                columnData : verifyLogHead,
            }
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
