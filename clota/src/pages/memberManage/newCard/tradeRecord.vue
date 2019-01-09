<!--在线交易记录-->

<template>
	<div class="trade-record">
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
							:placeholder="$t('selectField',{ msg : $t('startTime') })"
							v-model="formData.startTime"
                            @on-change="queryList">
				</DatePicker>
			</FormItem>
			<FormItem prop="endTime">
				<DatePicker type="date"
                            :editable="false"
							style="width : 150px"
							:placeholder="$t('selectField',{ msg : $t('endTime') })"
							v-model="formData.endTime"
                            @on-change="queryList">
				</DatePicker>
			</FormItem>
			<FormItem prop="endTime">
				<Input v-model.trim="formData.keyWord"
					   style="width : 300px"
					   :placeholder="$t('tradeSearchKeyword')"/>
			</FormItem>
			<FormItem>
				<Button  type="primary" @click="queryList">{{$t('searching')}}</Button>
				<Button  type="ghost" @click="reset">{{$t('reset')}}</Button>
			</FormItem>
		</Form>
		<table-com
			:column-data="columnData"
			:table-data="tableData"
			:border="true"
			:page-no-d.sync="pageNo"
			:page-size-d.sync="pageSize"
			:show-pagination="true"
			:total-count="totalCount"
			:ofset-height="122"
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
				slot="column5"
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
				slot="column6"
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
				slot="column7"
				:label="row.title"
				:prop="row.field"
				:key="row.index"
				:width="row.width"
				:min-width="row.minWidth"
				show-overflow-tooltip
				slot-scope="row">
				<template slot-scope="scoped">
					{{$t('txnStatus.' + scoped.row.txnStatus) | contentFilter}}
				</template>
			</el-table-column>
			<el-table-column
				slot="column8"
				:label="row.title"
				:prop="row.field"
				:key="row.index"
				:width="row.width"
				:min-width="row.minWidth"
				show-overflow-tooltip
				slot-scope="row">
				<template slot-scope="scoped">
					<span :class="{'status-abnormal' : scoped.row.bizStatus === 'abnormal'}">
						{{$t('bizStatus.' + scoped.row.bizStatus)}}
					</span>
				</template>
			</el-table-column>
			<el-table-column
				slot="column10"
				slot-scope="row"
				show-overflow-tooltip
				:label="row.title"
				:width="row.width"
				fixed="right"
				:min-width="row.minWidth">
				<template slot-scope="scope">
					<ul class="operate-list">
						<!--<li v-if="canReOpenCard(scope.row)" @click="reOpenCard(scope.row)">{{$t('reOpenCard')}}</li>-->
						<!--<li v-if="canReFundCard(scope.row)" @click="reFundCard(scope.row)">{{$t('reReissueCard')}}</li>-->
                        <!--未知状态以及正在进行中的支付状态需要重新查询结果-->
						<li v-if="scope.row.txnStatus === 'unknown' || scope.row.txnStatus === 'doing'"
                            @click="searchPayResult(scope.row)">{{$t('searchPayResult')}}</li>
						<li @click="showMoreData(scope.row)">{{$t('more')}}</li>
					</ul>
				</template>
			</el-table-column>
		</table-com>
        <!--确认会员信息模态框-->
        <confirm-member-info v-model="showConfirmModal"
                             :show-cancel="false"
                             @confirm-data="showConfirmModal = false">
            <Form :label-width="110">
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('type') })">
                        {{currentData.bizType ? $t('tradeType.' + currentData.bizType) : '' | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('date') })">
                        {{currentData.txnReqTime | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('selectCardAttribution') })">
                        {{currentData.cardLevelName | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('cardOwnerInfo') })">
                        {{currentData.memberName | contentFilter}},{{currentData.mobile | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('physicalCardNo') })">
                        {{currentData.tpCardNo | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('cardFaceNum') })">
                        {{currentData.tpNo | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('payType') })">
                        {{currentData.payType ? $t('payType.' + currentData.payType) : '' | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('paymentStatus') })">
                        {{$t('txnStatus.' + currentData.txnStatus) | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('memberSystemStatus') })">
                        <span :class="{'status-abnormal' : currentData.bizStatus === 'abnormal'}">
                            {{$t('bizStatus.' + currentData.bizStatus)}}
                        </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('operator') })">
                        {{currentData.operateUserName | contentFilter}}
                    </FormItem>
                </i-col>
            </Form>
        </confirm-member-info>
        <re-ressiue-card-modal v-model="showRessueModal"
                               :member-info="currentData">
        </re-ressiue-card-modal>
	</div>
</template>

<script>
	import { tradeTypeList } from '@/assets/js/constVariable.js';
	import tableCom from '@/components/tableCom/tableCom.vue';
	import { tradeRecordHead } from './tradeRecordConfig';
	import ajax from '@/api/index.js';
    import confirmMemberInfo from './components/confirmDetailModal';
    import reRessiueCardModal from './components/reRessiueCardModal';
    import { mapGetters } from 'vuex';

	export default {
		components : {
			tableCom,
            confirmMemberInfo,
            reRessiueCardModal
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
				//表头配置
				columnData : tradeRecordHead,
				tableData : [],
				pageNo : 1,
				pageSize : 10,
				totalCount : 0,
                //显示详细信息
                showConfirmModal : false,
                //当前查看的行数据
                currentData : {},
                //重新补卡是否显示
                showRessueModal : false
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
                this.$router.push({
                    name : ''
                });
            },
            /**
             * 重新补卡
             * @param{Object} rowData 记录数据
             */
            reFundCard (rowData) {
                this.currentData = rowData;
                this.showRessueModal = true;
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
            },
            /**
             * 显示详细信息
             * @param{Object} rowData
             */
            showMoreData (rowData) {
                this.showConfirmModal = true;
                this.currentData = rowData;
            },
            /**
             * 查询支付结果
             * @param{Object} rowData 支付数据
             */
            searchPayResult (rowData) {
                ajax.post('queryConsumeUpdateBiz',{
                    transactionId : rowData.id
                }).finally(() => {
                    this.queryList();
                });
            }
		},
        computed : {
            ...mapGetters([
                'memberConfigInfo'
            ]),
            //是否显示会员卡售卡信息
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //交易类型列表
            tradeTypeList () {
                if (this.cardIsSaling) {
                    return tradeTypeList;
                } else {
                    return tradeTypeList.slice(0,2);
                }
            },
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
