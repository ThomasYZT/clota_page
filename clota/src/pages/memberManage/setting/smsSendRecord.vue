<!--短信发送记录-->

<template>
	<div class="sms-send-record">
		<bread-crumb-head
			:locale-router="$t('smsSendRecord')"
			:before-router-list="beforeRouterList">
		</bread-crumb-head>
		<div class="hr"></div>
		<table-com
			:column-data="columnData"
			:table-data="tableData"
			:border="true"
			:page-no-d.sync="pageNo"
			:show-pagination="true"
			:page-size-d.sync="pageSize"
			:total-count="totalCount"
			:ofset-height="130"
			@query-data="queryList">
			<el-table-column
				slot="column4"
				slot-scope="row"
				show-overflow-tooltip
				:label="row.title"
				:width="row.width"
				:min-width="row.minWidth">
				<template slot-scope="scope">
					<ul class="operate-list">
						<li @click="toDetail(scope.row)">{{$t('detail')}}</li>
					</ul>
				</template>
			</el-table-column>
		</table-com>
	</div>
</template>

<script>
	import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
	import ajax from '@/api/index.js';
	import tableCom from '@/components/tableCom/tableCom.vue';

	export default {
		components : {
			breadCrumbHead,
			tableCom
		},
		data () {
			return {
				//上级路由列表
				beforeRouterList : [
					{
						name : 'memberActivity',
						router : {
							name : 'memberActivity'
						}
					}
				],
				//表头配置
				columnData : [
					{
						title : 'smsContent',
						minWidth : 100,
						field : 'content'
					},
					{
						title : 'sendTime',
						width : 180,
						field : 'sendTime'
					},
					{
						title : 'sendNum',
                        width : 110,
						field : 'count'
					},
					{
						title : 'memberType',
						minWidth : 100,
						field : 'sendRangeText'
					},
					{
						title : 'more',
						width : 100,
						field : ''
					}
				],
				//全部条数
				totalCount : 0,
				//页码
				pageNo : 1,
				//每页条数
				pageSize : 10,
				//表格数据
				tableData : []
			};
		},
		methods : {
			/**
			 * 查询短信发送记录
			 */
			queryList () {
				ajax.post('querySmsBizModels',{
					pageNo : this.pageNo,
					pageSize : this.pageSize,
					scene : 'member_mass_sms'
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
			 * 跳转到发送记录详情
			 * @param{Object} rowData
			 */
			toDetail (rowData) {
				this.$router.push({
					name : 'smsSendRecordDetail',
					params : {
						id : rowData.id
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
	.sms-send-record{
		@include block_outline();

		.hr{
			@include block_outline($height : 20px);
		}
	}
</style>
