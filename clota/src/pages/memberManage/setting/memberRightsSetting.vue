<!--会员权益设置-->

<template>
	<div class="member-right-setting">
		<!--头部tab组件-->
		<header-tabs router-name="memberRights">
		</header-tabs>
		<div class="content-area">
			<table-com
				:column-data="columnData"
				:table-data="tableData"
				:border="true"
				:show-pagination="true"
				:total-count="totalCount"
				:ofset-height="150"
				@query-data="queryList">
				<el-table-column
					slot="column2"
					show-overflow-tooltip
					slot-scope="row"
					:label="row.title"
					:width="row.width"
					:min-width="row.minWidth">
					<template slot-scope="scope">
						<ul class="operate-list">
							<li @click="checkDetail(scope.row)">{{$t('check')}}</li>
						</ul>
					</template>
				</el-table-column>
			</table-com>
		</div>
        <!--显示会员权益详情模态框-->
        <member-right-detail-modal v-model="showDetailModal"
                                   :detail-info="currentData"
                                   @fresh-data="queryList">
        </member-right-detail-modal>
	</div>
</template>

<script>
	import headerTabs from './components/headerTabs.vue';
	import tableCom from '@/components/tableCom/tableCom.vue';
	import ajax from '@/api/index.js';
	import memberRightDetailModal from './components/memberRightDetailModal';

	export default {
		components : {
			headerTabs,
			tableCom,
            memberRightDetailModal
		},
		data () {
			return {
				//表头配置
				columnData : [
					{
						title : 'levelCode',
						minWidth : 100,
						field : 'id'
					},
					{
						title : '级别名称',
						minWidth : 100,
						field : 'levelDesc'
					},
					{
						title : '会员权益',
						width : 150,
						field : ''
					}
				],
				//表格数据
				tableData : [],
				//页面
				pageNo : 1,
				//每页条数
				pageSize : 10,
				//总条数
				totalCount : 0,
                //显示会员权益详情模态框
                showDetailModal : false,
                //当前操作的会员权益数据
                currentData : {}
			};
		},
		methods : {
			/**
			 * 获取会员权益信息
			 */
			queryList () {
				ajax.post('queryMemberLevels',{
					pageNo : this.pageNo,
					pageSize : this.pageSize,
					status : 'valid'
				}).then(res => {
					if (res.success) {
						this.tableData = res.data ? res.data.data : [];
						this.totalCount = res.data ? res.data.totalRow : 0;
					} else {
						this.tableData = [];
						this.totalCount = 0;
					}
				});
			},
			/**
			 * 查看订单详情
			 * @param rowData 行数据
			 */
			checkDetail (rowData) {
			    this.currentData = rowData;
				this.showDetailModal = true;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
	.member-right-setting{
		@include block_outline();

		.content-area{
			padding: 20px 30px 0;
			height: calc(100% - 68px);
			overflow: auto;
		}
	}
</style>
