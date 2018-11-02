<!--
内容：业主卡 - 实体卡
作者：djc
日期：
-->

<template>
    <div class="">
        <h3>{{$t('entityCardInfo')}}</h3>
        <table-com
            :show-pagination="false"
            :column-data="columnData"
            :table-data="tableData"
            :table-com-min-height="250"
            :border="true">
            <!--<el-table-column
                slot="column1"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">

                </template>
            </el-table-column>-->

            <el-table-column
                slot="column4"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="">{{$t('读取实体卡')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>
<script type="text/ecmascript-6">
    import { entityCardHead } from './newCardConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        components: {
            tableCom
        },
        props: {
            idType: Array
        },
        data() {
            return {
                // 表头配置
                columnData: entityCardHead,
                // 表格数据
                tableData: [

                ],
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {}
    };
</script>

<style lang="scss">

</style>
