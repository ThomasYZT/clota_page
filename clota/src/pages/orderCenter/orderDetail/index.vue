<!--订单详情-->

<template>
    <div class="order-detail">
        <!--过滤表头-->
        <filter-head :tableShow.sync="tableShow"
                     @set-params="setParams"
                     @search-product="searchProduct">
        </filter-head>
        <table-com
            v-if="tableShow"
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="225"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            @query-data="queryList">
            <el-table-column
                slot="column19"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="reserve(scope.row)">{{$t('退票')}}</li>
                        <li @click="reserve(scope.row)">{{$t('改签')}}</li>
                        <li @click="reserve(scope.row)">{{$t('详情')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>

<script>
    import filterHead from './child/filterHead';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './orderConfig';
    import ajax from '@/api/index.js';
    export default {
        components : {
            filterHead,
            tableCom
        },
        data() {
            return {
                //表格是否显示
                tableShow : false,
                //表头配置
                columnData : columnData,
                //表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                //筛选条件
                queryParams : {
                    pageNo :1,
                    pageSize : 10
                },
            }
        },
        methods: {
            /**
             * 查询所有订单
             */
            queryList () {
                ajax.post('getOrderList',{
                    ...this.queryParams
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
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
                this.tableShow = true;
            },
            /**
             * 手动触发查询
             * @param params
             */
            searchProduct (params) {
                Object.assign(this.queryParams,params);
                this.queryList();
            },
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-detail{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;
    }
</style>
