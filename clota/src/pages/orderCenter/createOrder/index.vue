<!--新建订单-->

<template>
    <div class="create-order">
        <filter-head @set-params="setParams"
                     @search-product="searchProduct">
        </filter-head>
        <div class="batch-reserve">
            <Button
                type="primary"
                :disabled="selectedProduct.length < 1"
                @click="batchReserve">{{$t('batchReserve')}}</Button>
        </div>
        <table-com
            v-if="queryParams.orderType !== ''"
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="204"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            @selection-change="handleSelectionChange"
            @query-data="queryList">
            <el-table-column
                slot="column0"
                slot-scope="row"
                :label="row.title"
                fixed="left"
                type="selection"
                :width="row.width"
                :min-width="row.minWidth">
            </el-table-column>
            <el-table-column
                slot="column8"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="reserve(scope.row)">{{$t('reserveRight')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--预定模态框-->
        <reserve-modal v-model="showReserveModal"
                       :search-params="queryParams"
                       :product-list="productList">
        </reserve-modal>
    </div>
</template>

<script>
    import filterHead from './child/filterHead';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './orderColumnConfig';
    import ajax from '@/api/index.js';
    import reserveModal from './child/reserveModal';
    export default {
        components : {
            filterHead,
            tableCom,
            reserveModal
        },
        data () {
            return {
                //表头配置
                columnData : columnData,
                //表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                //筛选条件
                queryParams : {
                    pageNo : 1,
                    pageSize : 10,
                    playDate : '',
                    orderType : '',
                    saleOrgId : '',
                    orderOrgId : '',
                    type : '',
                    productName : '',
                    scenicOrgId : '',
                    saleOrgName : '',
                    orderOrgName : '',
                },
                //选择的产品
                selectedProduct : [],
                //是否显示预定模态框
                showReserveModal : false,
                //选择的产品列表
                productList : []
            };
        },
        methods : {
            /**
             * 查询所有产品信息
             */
            queryList () {
                ajax.post('queryReserveProductList',{
                    ...this.queryParams
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 设置查询参数
             * @param params
             */
            setParams (params) {
                Object.assign(this.queryParams,params);
                this.queryList();
            },
            /**
             * 立即预定
             * @param rowData
             */
            reserve (rowData) {
                if (!this.queryParams.saleOrgId) {
                    this.$Message.warning(this.$t('selectField',{ msg : this.$t('sellingOrg') }));
                } else if (!this.queryParams.orderOrgId) {
                    this.$Message.warning(this.$t('selectField',{ msg : this.$t('orderOrg') }));
                } else {
                    this.productList = [rowData].map(item =>{
                        return {
                            ...item,
                            playDate : this.queryParams.playDate,
                            num : 0,
                        };
                    });
                    this.showReserveModal = true;
                }
            },
            /**
             * 产品多选改变
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedProduct = data;
            },
            /**
             * 手动触发查询
             * @param params
             */
            searchProduct (params) {
                Object.assign(this.queryParams,params);
                this.queryList();
            },
            /**
             * 批量预定
             */
            batchReserve () {
                if (!this.queryParams.saleOrgId) {
                    this.$Message.warning(this.$t('selectField',{ msg : this.$t('sellingOrg') }));
                } else if (!this.queryParams.orderOrgId) {
                    this.$Message.warning(this.$t('selectField',{ msg : this.$t('orderOrg') }));
                } else {
                    this.productList = this.selectedProduct.map(item =>{
                        return {
                            ...item,
                            playDate : this.queryParams.playDate,
                            num : 0,
                        };
                    });
                    this.showReserveModal = true;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .create-order{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;

        .batch-reserve{
            @include block_outline($height : 50px);
            padding-top: 8px;
            padding-left: 30px;
        }
    }
</style>
