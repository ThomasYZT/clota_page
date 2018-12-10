<!--
内容：营销产品管理
作者：djc
日期：
-->

<template>
    <div class="marketing-product">
        <!--列表数据筛选器-->
        <marketing-product-filter @on-search="searchMarketProducts"></marketing-product-filter>
        <!--营销产品列表-->
        <table-com
            :ofsetHeight="120"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            @query-data="queryList"
            @row-click="handleRowClick">
            <el-table-column
                slot="column1"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t('stockType.' + scope.row.stockType) | contentFilter}}
                    {{$t(scope.row.stockNum) | contentFilter}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column4"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <i-input v-model.trim="modifiedSalePrice"
                             ref="salePriceInput"
                             v-if="currRowIndex==scope.$index"></i-input>
                    <span v-else>{{scope.row.salePrice | contentFilter}}</span>
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
                            <li @click="cancelModifyPrice()">{{$t('cancel')}}</li>
                            <li @click="modifySalePrice(scope.row)">{{$t('save')}}</li>
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
                currRowIndex : null,
                //提现记录传参
                queryParams : {
                    marketTypeId : 'all',
                    marketLevelId : 'all',
                    policyId : '',
                    pageNo : 1,
                    pageSize : 10,
                },
                //修改后的终端售价
                modifiedSalePrice : '',
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
                let params = Object.assign({}, this.queryParams);
                ['marketTypeId', 'marketLevelId'].forEach((key, i) => {
                    if (params[key].includes('all')) {
                        params[key] = '';
                    }
                });
                ajax.post('marketing-queryMarketProductList',{
                    ...params
                }).then(res => {
                    if (res.success && res.data) {
                        this.tableData = res.data.data || [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
                this.cancelModifyPrice();
            },
            /**
             * 搜索提现记录
             * @param params  Object
             */
            searchMarketProducts (params) {
                Object.assign(this.queryParams, params);
                this.queryList();
            },
            /**
             * 行点击事件
             * @param data
             */
            handleRowClick (data) {
                //TODO 查看营销产品详情
            },
            /**
             * 修改终端售价
             * @param scopeData  行数据，row  column  $index  store
             */
            modifyPrice (scopeData) {
                this.currRowIndex = scopeData.$index;
            },
            /**
             * 取消修改终端售价
             **/
            cancelModifyPrice () {
                this.currRowIndex = null;
                this.modifiedSalePrice = '';
            },
            /**
             * 保存修改的终端售价
             * @param scopeRow
             */
            modifySalePrice (scopeRow) {
                ajax.post('marketing-updateSalePrice', {
                    id : scopeRow.id,
                    salePrice : this.modifiedSalePrice
                }).then(res => {
                    if (res.success) {
                        scopeRow.salePrice = this.modifiedSalePrice;
                        this.$Message.success(this.$t('successTip', { tip : this.$t('modify') }));
                        this.cancelModifyPrice();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('modify') }));
                    }
                });
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
