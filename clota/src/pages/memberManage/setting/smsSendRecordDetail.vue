<!--短信发送记录详情-->

<template>
	<div class="sms-send-detail">
		<bread-crumb-head
			locale-router="详情"
			:before-router-list="beforeRouterList">
		</bread-crumb-head>
		<Form ref="formInline">
			<i-row>
				<i-col style="width: auto;display: inline-block">
					<FormItem prop="user" label="发送状态" :label-width="80">
						<Select v-model="formData.status"
								style="width: 280px"
								@on-change="queryList">
							<Option :value="item.value"
									v-for="(item,index) in statusList"
									:key="index">
								{{$t(item.label)}}
							</Option>
						</Select>
					</FormItem>
				</i-col>
				<i-col style="width: auto;display: inline-block;margin-left: 10px;top : -2px;">
					<Button type="primary"
							:disabled="selectedSmsRecord.length < 1"
							@click="reSendSms">
						{{$t('重发短信')}}
					</Button>
				</i-col>
				<i-col style="display: inline-block;width:auto;float: right">
                    <span class="sms-count">
					发送短信总量：{{totalCount | contentFilter}}条
                    </span>
				</i-col>
			</i-row>
		</Form>
		<div class="content">
			<table-com
				v-if="tableShow"
				:column-data="columnData"
				:table-data="tableData"
				:border="true"
				:page-no-d.sync="pageNo"
				:show-pagination="true"
				:page-size-d.sync="pageSize"
				:total-count="totalCount"
				:ofset-height="170"
				@selection-change="handleSelectionChange"
				@query-data="queryList">
				<el-table-column
					slot="column0"
					:label="row.title"
					:prop="row.field"
					:key="row.index"
					:width="row.width"
					:min-width="row.minWidth"
                    :selectable="checkIsValid"
					type="selection"
					slot-scope="row">
				</el-table-column>
				<el-table-column
					slot="column5"
					:label="row.title"
					:prop="row.field"
					:key="row.index"
					:width="row.width"
					:min-width="row.minWidth"
					slot-scope="row">
					<template slot-scope="scoped">
						{{$t(getStatusText(scoped.row))}}
					</template>
				</el-table-column>
			</table-com>
		</div>
	</div>
</template>

<script>
	import tableCom from '@/components/tableCom/tableCom.vue';
	import { columnData } from './smsSendRecordDetailConfig';
	import ajax from '@/api/index.js';
	import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
	import breadCrumbHead from '@/components/breadCrumbHead/index.vue';

	export default {
		mixins : [lifeCycleMixins],
		components : {
			tableCom,
			breadCrumbHead
		},
		data () {
			return {
				//表单数据
				formData : {
					//短信发送状态
					status : 'all'
				},
				// 短信发送状态列表
				statusList : [
					{
						label : 'all',
						value : 'all'
					},
					{
						label : '发送中',
						value : 'wait,doing,req_success'
					},
					{
						label : '发送成功',
						value : 'success'
					},
					{
						label : '发送失败',
						value : 'req_failure,failure'
					}
				],
				//表头配置
				columnData : columnData,
				//表格数据
				tableData : [],
				//总条数
				totalCount : 0,
				//页码
				pageNo : 1,
				//每页条数
				pageSize : 10,
				//短信业务id
				bizId : '',
				//表格是否显示
				tableShow : false,
				//上级路由列表
				beforeRouterList : [
					{
						name : 'memberActivity',
						router : {
							name : 'memberActivity'
						}
					},
					{
						name : 'smsSendRecord',
						router : {
							name : 'smsSendRecord'
						}
					}
				],
				//选择的短信发送记录详情
				selectedSmsRecord : []
			};
		},
		methods : {
			/**
			 * 查询短信发送记录详情
			 */
			queryList () {
				let status = this.getSelectedStatus();
				ajax.post('querySmsQueues',{
					pageNo : this.pageNo,
					pageSize : this.pageSize,
					bizId : this.bizId,
					statuses : status
				}).then(res =>{
					if (res.success) {
						this.tableData = res.data ? res.data.data.map(item => {
						    let extraData = item.extraData ? JSON.parse(item.extraData) : {};
						    return {
                                ...item,
                                receiver : extraData.receiver,
                                idCardNum : extraData.idCardNum
                            };
                        }) : [];
						this.totalCount = res.data ? res.data.totalRow : 0;
					} else {
						this.tableData = [];
						this.totalCount = 0;
					}
				});
			},
			/**
			 * 获取路由参数
			 * @param{Object} params
			 */
			getParams (params) {
				if (params && params.id) {
					this.bizId = params.id;
					this.tableShow = true;
				} else {
					this.$router.push({
						name : 'smsSendRecord'
					});
				}
			},
			/**
			 * 获取选择的状态
			 * @return{String} 下拉框选择的状态
			 */
			getSelectedStatus () {
				if (this.formData.status === 'all') {
					return '';
				} else {
					return this.formData.status;
				}
			},
			/**
			 * 获取选择的短信发送记录详情
			 * @param{Array} data
			 */
			handleSelectionChange (data) {
				this.selectedSmsRecord = data;
			},
			/**
			 * 重新发送短信
			 */
			reSendSms () {
				ajax.post('reSendSms',{
					queueIds : JSON.stringify(this.selectedSmsRecord.map(item => item.id))
				}).then(res => {
					if (res.success) {
						this.$Message.success(this.$t('successTip',{ tip : this.$t('sending') }));
						this.queryList();
					} else {
						this.$Message.error(this.$t('failureTip',{ tip : this.$t('sending') }));
					}
				});
			},
			/**
			 * 获取状态对应的文案
			 * @param{Object} rowData
			 * @return{String} 状态对应的翻译配置键值
			 */
			getStatusText (rowData) {
				if ( ['wait','doing','req_success'].includes(rowData.status) ) {
					return 'isRending';
				} else if ( rowData.status === 'success' ) {
					return 'success';
				} else if ( ['req_failure','failure'].includes(rowData.status) ) {
					return 'failure';
				}
			},
            /**
             * 校验是否可以选择短信发送记录
             * @param{Object} row 短信发送记录信息
             */
            checkIsValid (row) {
                if ( ['wait','doing','req_success'].includes(row.status) ) {
                    return false;
                }
                return true;
            }
		},
	};
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
	.sms-send-detail{
		@include block_outline();

		.ivu-form{
			@include block_outline($height : 60px);
			padding: 13px 20px;
		}

		.ivu-form-item{
			margin-bottom: 0;
		}

		.content{
			@include block_outline($height : unquote('calc(100% - 110px)'));
		}

        .sms-count{
            display: inline-block;
            line-height: 32px;
            font-size: $font_size_14px;
            color: $color_333;
        }
	}
</style>
