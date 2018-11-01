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
                <Button class="tool-btn left" type="primary">新增商品入库</Button>
                <Button class="ivu-btn-108px tool-btn right" type="primary">批量下架</Button>
            </div>
            <div slot="tool1" class="button-tool">
                <Button class="ivu-btn-108px tool-btn" type="primary">导出</Button>
            </div>
            <div slot="tool2" class="button-tool">
                <Input class="input-field"
                       v-model.trim="queryParams.keyword"
                       icon="ios-search"
                       :placeholder="$t('inputAnywordForSearch')"/>
            </div>
        </tool-box>

        <!-- 表格 -->
        <tableCom :column-data="tableColumn"
                  :table-data="tableData"
                  :border="true"
                  :show-pagination="true"
                  :total-count="totalCount"
                  :page-no-d.sync="queryParams.pageNo"
                  :page-size-d.sync="queryParams.pageSize"
                  @query-data="getListData">

        </tableCom>
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
                }
			});
		},

	},
	created () {

	}
};
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .button-tool {
        text-align: left;
        .tool-btn {
            margin: 0 20px;
        }

    }
</style>
