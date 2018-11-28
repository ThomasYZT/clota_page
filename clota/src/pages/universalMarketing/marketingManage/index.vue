<!--
内容：营销产品管理
作者：djc
日期：
-->

<template>
    <div class="marketing-product">
        <!--列表数据筛选器-->
        <marketing-product-filter @on-search=""></marketing-product-filter>
        <!--营销产品列表-->
        <table-com
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :border="true"
            @query-data="queryList"
            @row-click="handleRowClick">
            <el-table-column
                slot="column4"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <i-input v-if="currRowIndex==scope.$index"></i-input>
                </template>
            </el-table-column>

            <el-table-column
                slot="column6"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <template v-if="currRowIndex==scope.$index">
                            <li @click="currRowIndex=null">{{$t('cancel')}}</li>
                            <li @click="currRowIndex=null">{{$t('save')}}</li>
                        </template>
                        <li v-else @click="modifyPrice(scope)">{{$t('modify')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>
<script>
    import marketingProductFilter from './components/marketingProductFilter.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index';
    import { marketingProductHead } from './marketingManageConfig';

    export default {
        components : {
            marketingProductFilter,
            tableCom,
        },
        props : {},
        data () {
            return {
                //表头配置
                columnData : marketingProductHead,
                //表格数据
                tableData : [{}],
                //总条数
                totalCount : 0,
                //当前被修改的行
                currRowIndex: null,
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
             * 查询营销产品列表数据
             */
            queryList () {

            },
            /**
             * 行点击事件
             * @param data
             */
            handleRowClick (data) {
                //TODO 查看营销产品详情
            },
            /**
             *
             * @param scopeData  行数据，row  column  $index  store
             */
            modifyPrice (scopeData) {
                console.log(scopeData);
                this.currRowIndex = scopeData.$index;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .marketing-product {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius: 4px;

    }
</style>
