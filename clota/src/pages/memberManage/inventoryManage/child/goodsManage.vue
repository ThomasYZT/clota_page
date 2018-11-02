<!--
    进销存管理--商品管理
    作者：杨泽涛
-->
<template>
    <div class="goods-manage">
        <!-- 面包屑导航 -->
        <breadCrumbHead
            :before-router-list="beforeRouterList"
            :locale-router="$t('goodsManage')"
        >
        </breadCrumbHead>

        <!-- 工具栏 -->
        <tool-box :toolNum="3">
            <div slot="tool0" class="button-tool">
                <!-- 新增商品入库 -->
                <Button class="tool-btn left" type="primary" @click="addGood()">{{$t('NewGoodsWarehousing')}}</Button>
                <!-- 导出 -->
                <Button class="ivu-btn-108px" type="primary">{{$t('exporting')}}</Button>
            </div>
            <div slot="tool1">
                <div class="placeholder"></div>
            </div>

            <div slot="tool2" class="button-tool">
                <!-- 搜索框 -->
                <Input class="input-field"
                       search
                       enter-button
                       v-model.trim="queryParams.keyword"
                       icon="ios-search"
                       :placeholder="$t('inputSpecificForSearch', { field : $t('goodsName') })"
                       @on-search="getListData"
                       @on-enter="getListData"/>
            </div>
        </tool-box>

        <!-- 表格 -->
        <div class="table-wrapper">
            <tableCom :column-data="tableColumn"
                      :table-data="tableData"
                      :border="true"
                      :show-pagination="true"
                      :total-count="totalCount"
                      :page-no-d.sync="queryParams.pageNo"
                      :page-size-d.sync="queryParams.pageSize"
                      @query-data="getListData">
                <!-- 库存数量 -->
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{ scope.row.stockNum + scope.row.undrawNum }}
                    </template>
                </el-table-column>
                <!-- 商品状态 -->
                <el-table-column
                    slot="column5"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{ scope.row.goodsStatus === 'down' ? $t('down') : $t('up') }}
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column
                    slot="column6"
                    slot-scope="row"
                    fixed="right"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <div class="operate">
                            <span class="operate-btn blue" @click="addGood(scope.row)">{{$t('continueStockIn')}}</span>
                            <span class="operate-btn blue" @click="stockDetail(scope.row)">{{$t('stockDetail')}}</span>
                        </div>
                    </template>
                </el-table-column>

            </tableCom>
        </div>
    </div>
</template>

<script>
import tableCom from '@/components/tableCom/tableCom';
import breadCrumbHead from '@/components/breadCrumbHead/index';
import toolBox from '../components/toolBox';
import { goodsListHead } from './tableConfig';
import ajax from '@/api/index';
export default {
	components : {
		tableCom,
		breadCrumbHead,
		toolBox
	},
	data () {
		return {
			//路由信息
			beforeRouterList : [
				{
					name : 'inventoryManage',
				}
			],
			//商品状态类型 选择列表
			goodsStatusList : [
				{
					label : '入库商品',
					value : '0'
				},
				{
					label : '入库商品',
					value : '1'
				},
			],
			//过滤信息
			queryParams : {
				pageNo : 1,
				pageSize : 10,
				keyword : ''
			},
			//表头配置
			tableColumn : goodsListHead,
			//表格数据
			tableData : [],
			//表格数据总条数
			totalCount : 0
		};
	},
	methods : {
		/**
         * 获取列表数据
         */
		getListData () {
			ajax.post('queryPagedGoods', this.queryParams).then(res => {
                if ( res.success ) {
                    this.tableData = res.data ? res.data.data : [];
                    this.totalCount = res.data.totalRow;
                } else {
                    this.$Message.error(this.$t('dataGetError'));
                }
			});
		},
        /**
         * 前往新增商品入库界面
         * @param {object} data
         */
        addGood (data) {
            this.$router.push({
                name : 'editGoodsWarehousing',
                params : {
                    listItem : data
                }
            });
        },
        /**
         * 前往库存详情页面
         * @param {object} data
         */
        stockDetail (data) {
            this.$router.push({
                name : 'stockInfo',
                params : {
                    listItem : data
                }
            });
        }
	}
};
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .goods-manage {
        .button-tool {
            text-align: left;
            .tool-btn {
                margin: 0 20px;
            }

            /deep/ .input-field {
                width: 350px;
                float: right;
            }
        }

        .table-wrapper {
            margin-top: 20px;

            .operate {
                .operate-btn {
                    cursor: pointer;
                    margin-right: 10px;
                }

                .blue {
                    color: #2F70DF;
                }
            }
        }

        .placeholder {
            width: 10px;
            height: 10px;
        }
    }

</style>
