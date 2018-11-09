<!--在线交易记录-->

<template>
	<div class="trade-record">
		<!--头部tab组件-->
		<header-tabs
			router-name="tradeRecord">
		</header-tabs>
		<Form ref="formValidate" :model="formData" inline>
			<FormItem prop="tradeType">
				<Select v-model="formData.tradeType"
                        style="width : 150px"
                        @on-change="queryList">
					<Option v-for="item in tradeTypeList"
							:key="item.value"
							:value="item.value">{{$t(item.label)}}</Option>
				</Select>
			</FormItem>
			<FormItem prop="startTime">
				<DatePicker type="date"
                            :editable="false"
							style="width : 150px"
							placeholder="请选择开始时间"
							v-model="formData.startTime"
                            @on-change="queryList">
				</DatePicker>
			</FormItem>
			<FormItem prop="endTime">
				<DatePicker type="date"
                            :editable="false"
							style="width : 150px"
							placeholder="请选择结束时间"
							v-model="formData.endTime"
                            @on-change="queryList">
				</DatePicker>
			</FormItem>
			<FormItem prop="endTime">
				<Input v-model.trim="formData.keyWord"
					   style="width : 300px"
					   placeholder="请输入姓名、证件编号、手机号、卡面号"/>
			</FormItem>
			<FormItem>
				<Button class="ivu-btn-90px" type="primary" @click="queryList">{{$t('搜索')}}</Button>
				<Button class="ivu-btn-90px" type="primary" @click="reset">{{$t('reset')}}</Button>
			</FormItem>
		</Form>
		<table-com
			:column-data="columnData"
			:table-data="tableData"
			:border="true"
			:page-no-d.sync="pageNo"
			:page-size-d.sync="pageSize"
			:row-click-able="true"
			:show-pagination="true"
			:total-count="totalCount"
			:ofset-height="188"
			@query-data="queryList">
			<el-table-column
				slot="column0"
				:label="row.title"
				:prop="row.field"
				:key="row.index"
				:width="row.width"
				:min-width="row.minWidth"
				show-overflow-tooltip
				slot-scope="row">
				<template slot-scope="scoped">
					{{scoped.row.bizType ? $t('tradeType.' + scoped.row.bizType) : '' | contentFilter}}
				</template>
			</el-table-column>
			<el-table-column
				slot="column4"
				:label="row.title"
				:prop="row.field"
				:key="row.index"
				:width="row.width"
				:min-width="row.minWidth"
				show-overflow-tooltip
				slot-scope="row">
				<template slot-scope="scoped">
					{{scoped.row.memberName | contentFilter}}/{{scoped.row.mobile | contentFilter}}
				</template>
			</el-table-column>
			<el-table-column
				slot="column5"
				:label="row.title"
				:prop="row.field"
				:key="row.index"
				:width="row.width"
				:min-width="row.minWidth"
				show-overflow-tooltip
				slot-scope="row">
				<template slot-scope="scoped">
					{{scoped.row.payType ? $t('payType.' + scoped.row.payType) : '' | contentFilter}}
				</template>
			</el-table-column>
			<el-table-column
				slot="column6"
				:label="row.title"
				:prop="row.field"
				:key="row.index"
				:width="row.width"
				:min-width="row.minWidth"
				show-overflow-tooltip
				slot-scope="row">
				<template slot-scope="scoped">
					{{$t('txnStatus.' + scoped.row.txnStatus)}}
				</template>
			</el-table-column>
			<el-table-column
				slot="column7"
				:label="row.title"
				:prop="row.field"
				:key="row.index"
				:width="row.width"
				:min-width="row.minWidth"
				show-overflow-tooltip
				slot-scope="row">
				<template slot-scope="scoped">
					<span :class="{'status-abnormal' : scoped.row.txnStatus === 'abnormal'}">
						{{$t('bizStatus.' + scoped.row.txnStatus)}}
					</span>
				</template>
			</el-table-column>
			<el-table-column
				slot="column9"
				slot-scope="row"
				show-overflow-tooltip
				:label="row.title"
				:width="row.width"
				fixed="right"
				:min-width="row.minWidth">
				<template slot-scope="scope">
					<ul class="operate-list">
						<li v-if="canReOpenCard(scope.row)" @click="reOpenCard(scope.row)">{{$t('重新开卡')}}</li>
						<li v-if="canReFundCard(scope.row)" @click="reFundCard(scope.row)">{{$t('重新补卡')}}</li>
						<li @click="showModal(scope.row)">{{$t('more')}}</li>
					</ul>
				</template>
			</el-table-column>
		</table-com>
	</div>
</template>

<script>
	import headerTabs from './components/newCardTabs.vue';
	import { tradeTypeList } from '@/assets/js/constVariable.js';
	import tableCom from '@/components/tableCom/tableCom.vue';
	import { tradeRecordHead } from './tradeRecordConfig';
	import ajax from '@/api/index.js';

	export default {
		components : {
			headerTabs,
			tableCom
		},
		data () {
			return {
				//筛选条件
				formData : {
					//交易类型
					tradeType : 'all',
					//开始时间
					startTime : '',
					//结束时间
					endTime : '',
					//关键字
					keyWord : ''
				},
				//交易类型列表
				tradeTypeList : tradeTypeList,
				//表头配置
				columnData : tradeRecordHead,
				tableData : [],
				pageNo : 1,
				pageSize : 10,
				totalCount : 0
			};
		},
		methods : {
			/**
			 * 查询在线交易列表
			 */
			queryList () {
				ajax.post('queryPayTransactionRecordList',{
					bizScene : 'member',
					bizType : this.formData.tradeType === 'all' ? '' : this.formData.tradeType,
					bizStatus : '',
					txnStartTime : this.formData.startTime ? this.formData.startTime.format('yyyy-MM-dd 00:00:00') : '',
					txnEndTime : this.formData.endTime ? this.formData.endTime.format('yyyy-MM-dd 23:59:59') : '',
					keyword : this.formData.keyWord,
					pageNo : this.pageNo,
					pageSize : this.pageSize,
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
			 * 是否可以重新开卡
			 * @param{Object} rowData
             * @return{Boolean} 是否可以开卡的结果
			 */
			canReOpenCard (rowData) {
				//交易类型为开卡，支付状态为成功，会员系统状态为非成功可以重新开卡
				return rowData['bizType'] === 'open_card' && rowData['txnStatus'] === 'success' && rowData['bizStatus'] !== 'success';
			},
            /**
             * 是否可以重新补卡
             * @param{Object} rowData
             * @return{Boolean} 是否可以补卡的结果
             */
            canReFundCard (rowData) {
                //交易类型为开卡，支付状态为成功，会员系统状态为非成功可以重新开卡
                return rowData['bizType'] === 'reissue_card' && rowData['txnStatus'] === 'success' && rowData['bizStatus'] !== 'success';
            },
            /**
             * 重新开卡
             * @param{Object} rowData 记录数据
             */
            reOpenCard (rowData) {

            },
            /**
             * 重新补卡
             * @param{Object} rowData 记录数据
             */
            reFundCard (rowData) {

            },
            /**
             * 重置筛选条件
             */
            reset () {
                this.formData.tradeType = 'all';
                this.formData.startTime = '';
                this.formData.endTime = '';
                this.formData.keyWord = '';
                this.queryList();
            }
		}
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
	.trade-record {
		@include block_outline();
		min-width: $content_min_width;
		overflow: auto;
		background: $color_fff;
		border-radius : 4px;

		.ivu-form{
			padding: 14px 0 0 20px;
			@include block_outline($height : 60px);
		}

		.status-abnormal{
			color: $color_err;
		}
	}
</style>
