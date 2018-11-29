<!--
内容：销售用户信息
作者：djc
日期：
-->

<template>
    <div class="sales-user-info">
        <!--列表数据筛选器-->
        <sales-user-filter @on-search=""></sales-user-filter>
        <!--销售用户信息列表-->
        <table-com
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :border="true"
            @query-data="queryList">

            <el-table-column
                slot="column9"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="showModal(scope.row)">{{$t('check')}}</li><!--查看-->
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--销售用户详细信息 - 弹窗-->
        <info-detail-modal ref="infoDetailModal"></info-detail-modal>
    </div>
</template>
<script>
    import salesUserFilter from './components/salesUserFilter.vue';
    import infoDetailModal from './components/infoDetailModal.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index';
    import { salesUserHead } from './salesUserConfig';

    export default {
        components : {
            salesUserFilter,
            tableCom,
            infoDetailModal
        },
        props : {},
        data () {
            return {
                //表头配置
                columnData : salesUserHead,
                //表格数据
                tableData : [{}],
                //总条数
                totalCount : 0,
            }
        },
        computed : {},
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 查询销售用户信息列表数据
             */
            queryList () {

            },
            /**
             * 显示销售用户信息模态框
             * @param scopeRow
             */
            showModal (scopeRow) {
                this.$refs.infoDetailModal.show(scopeRow);
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .sales-user-info {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius: 4px;

    }
</style>
