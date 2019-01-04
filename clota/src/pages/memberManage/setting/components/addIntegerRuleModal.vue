<!--新增积分兑换规则-->

<template>
	<Modal
		v-model="value"
		:title="$t(title)"
		class-name="add-integer-rule vertical-center-modal"
		:width="lang === 'zh-CN' ? 540 : 580"
		:mask-closable="false"
		@on-visible-change="visibleChange"
		@on-cancel="hide">
		<div class="modal-body">
			<Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="lang === 'zh-CN' ? 135 : 160">
				<i-row>
					<i-col>
						<Form-item :label="$t('ruleName')" prop="ruleName">
							<Input v-model.trim="formData.ruleName"
                                   style="width: 320px;"
                                   :placeholder="$t('inputPlaceholder')"/>
						</Form-item>
					</i-col>
				</i-row>
				<i-row>
					<i-col span="13">
						<Form-item :label="$t('subscriptionRatio')" prop="integrate">
							<Input v-model.trim="formData.integrate"
                                   :placeholder="$t('inputPlaceholder')"/>
						</Form-item>
					</i-col>
					<i-col span="8">
						<div class="integral-rate">
							<span class="font">{{$t('scoreToMoney', { money : $t(formData.money) })}}</span>
						</div>
					</i-col>
				</i-row>
				<i-row>
					<i-col>
						<Form-item :label="$t('validityPeriod')" prop="date">
							<DatePicker v-model="formData.date"
										:editable="false"
										:options="dateOptions"
										type="daterange"
										style="width: 320px">
							</DatePicker>
						</Form-item>
					</i-col>
				</i-row>
				<i-row>
					<i-col >
						<Form-item :label-width="235"
                                   :label="$t('discountRateMostIs')"
                                   prop="highProportion">
							<i-input v-model.trim="formData.highProportion"
                                     style="width : 223px;"
                                     :placeholder="$t('inputPlaceholder')">
								<span slot="append">%</span>
							</i-input>
						</Form-item>
					</i-col>
				</i-row>
				<i-row>
					<i-col>
						<Form-item :label="$t('isStarted')" >
							<i-switch v-model="formData.isSwitch"></i-switch>
						</Form-item>
					</i-col>
				</i-row>
			</Form>
		</div>
		<div slot="footer" class="modal-footer">
			<Button type="primary"
					:btnLoading="btnLoading"
					@click="confirm">{{$t('confirm')}}</Button>
			<Button type="ghost" @click="hide">{{$t('cancel')}}</Button>
		</div>
	</Modal>
</template>

<script>
	import { mapGetters } from 'vuex';
	import common from '@/assets/js/common.js';
	import ajax from '@/api/index.js';

	export default {
		props : {
			//是否显示模态框
			value : {
				type : Boolean,
				default : false
			},
			//当前启用的规则
			'valid-rules' : {
				type : Array,
				default () {
					return [];
				}
			},
			//编辑时默认信息
			'default-info' : {
				type : Object,
				default () {
					return {};
				}
			}
		},
		data () {
			//校验是否为整数
			const validateIntegrate = (rule,value,callback) => {
				if (value) {
					common.validateInteger(value).then(() => {
						callback();
					}).catch(err => {
						if (err === 'errorMaxLength') {
							callback(this.$t(err,{ field : this.$t(rule._field),length : 10 }));
						} else {
							callback(this.$t(err,{ field : this.$t(rule._field) }));
						}
					});
				} else {
					callback(this.$t('inputField', { field : this.$t(rule._field) }));
				}
			};
			//校验选择的日期是否正确
			const validateDate = (rule,value,callback) => {
				if (value && value.length > 0 && value[0] && value[1]) {
					let startTime = value[0] ? value[0].valueOf() : 0;
					let endTime = value[1] ? value[1].valueOf() : 0;
					for (let i = 0,j = this.hasSelectedTime.length; i < j; i++) {
						if ( startTime >= this.hasSelectedTime[i]['startTime'] - 86400000 && startTime <= this.hasSelectedTime[i]['endTime'] ) {
							callback('timeZoneCoincideTip');
						} else if ( endTime >= this.hasSelectedTime[i]['startTime'] - 86400000 && endTime <= this.hasSelectedTime[i]['endTime'] ) {
							callback('timeZoneCoincideTip');
						} else if ( startTime <= this.hasSelectedTime[i]['startTime'] - 86400000 && endTime >= this.hasSelectedTime[i]['endTime'] ) {
							callback('timeZoneCoincideTip');
						} else {
							callback();
						}
					}
					callback();
				} else {
					callback(this.$t('inputField', { field : this.$t('validityPeriod') }));
				}
			};
			//校验占订单总额的百分比
			const validatePercent = (rule,value,callback) => {
				common.validateMoney(value,0,3).then(() => {
					if (value > 0 && value < 100) {
						callback();
					} else {
						callback(this.$t('rangeError',{ field : this.$t('rate'),min : 0,max : 100 }));
					}
				}).catch(err => {
					if (err === 'errorMaxLength') {
						callback(this.$t('errorMaxLength',{ field : this.$t('rate'),length : 3 }));
					} else {
						callback(this.$t(err,{ field : this.$t('rate') }));
					}
				});
			};
			//校验规则名称是否重复
			const validateRuleName = (rule,value,callback) => {
				if (value) {
                    if (this.hasSelectedTime.some(item => item['ruleName'] === value) ) {
                        callback('ruleNameHas');
                    } else {
                        callback();
                    }
				} else {
					callback(this.$t('inputField', { field : this.$t('ruleName') }));
				}
			};
			return {
				//表单数据
				formData : {
					//规则名称
					ruleName : '',
					//兑换积分
					integrate : '',
					//兑换可得金额
					money : 1,
					//可用日期
					date : [],
					// 抵扣比例最多是单笔订单总额的
					highProportion : '',
					//是否打开积分兑换规则
					isSwitch : false
				},
				//表单校验规则
				ruleValidate : {
					ruleName : [
						{
							required : true,
							message : this.$t('inputField', { field : this.$t('ruleName') }),
							trigger : 'blur'
						},
						{
							max : 20,
							message : this.$t('errorMaxLength',{ field : this.$t('ruleName'),length : 20 }),
							trigger : 'blur'
						},
						{
							validator : validateRuleName,
							trigger : 'blur'
						}
					],
					integrate : [
						{
							required : true,
							validator : validateIntegrate,
							trigger : 'blur',
							_field : 'integral'
						}
					],
					highProportion : [
						{
							required : true,
							validator : validatePercent,
							trigger : 'blur',
						},
					],
					date : [
						{
							required : true,
							validator : validateDate,
							trigger : 'change'
						}
					]
				},
				//按钮是否在加载中
				btnLoading : false,
			};
		},
		methods : {
			/**
			 * 确定新增或修改
			 */
			confirm () {
				this.$refs.formValidate.validate(valid => {
					if (valid) {
						let defaultInfo = this.defaultInfo['data'];
						if (defaultInfo && Object.keys(defaultInfo).length > 0) { //编辑规则
							this.$emit('edit-integer-rule',{
								index : this.defaultInfo['index'],
								data : {
									ruleName : this.formData.ruleName,
									integrate : this.formData.integrate,
									money : this.formData.money,
									highProportion : this.formData.highProportion,
									isSwitch : this.formData.isSwitch,
									startTime : this.formData.date[0]
										? this.formData.date[0].format('yyyy-MM-dd')
										: '',
									endTime : this.formData.date[1]
										? this.formData.date[1].format('yyyy-MM-dd')
										: '',
								}
							});
						} else { //新增规则
							this.$emit('add-integer-rule',{
								ruleName : this.formData.ruleName,
								integrate : this.formData.integrate,
								money : this.formData.money,
								highProportion : this.formData.highProportion,
								isSwitch : this.formData.isSwitch,
								startTime : this.formData.date.length > 0 ? this.formData.date[0].format('yyyy-MM-dd') : '',
								endTime : this.formData.date.length > 0 ? this.formData.date[1].format('yyyy-MM-dd') : '',
							});
						}
						this.hide();
					}
				});
			},
			/**
			 * 关闭模态框
			 */
			hide () {
				this.$emit('input',false);
				this.$refs.formValidate.resetFields();
			},
			/**
			 * 模态框显示或隐藏
			 * @param type
			 */
			visibleChange (type) {
				let defaultInfo = this.defaultInfo['data'];
				if (type === true && defaultInfo && Object.keys(defaultInfo).length > 0) {
					this.formData.ruleName = defaultInfo.ruleName;
					this.formData.integrate = defaultInfo.integrate;
					this.formData.money = defaultInfo.money;
					this.formData.date = [defaultInfo.startTime,defaultInfo.endTime];
					this.formData.highProportion = defaultInfo.highProportion;
					this.formData.isSwitch = defaultInfo.isSwitch;
				}
			}
		},
		computed : {
			//模态框标题
			title () {
				return 'modifyScoreExchangeRule';
			},
			...mapGetters({
				lang : 'lang'
			}),
			//日期配置
			dateOptions () {
				let self = this;
				return {
					disabledDate (date) {
						if (date) {
							let valueOfDate = date.valueOf();
							for (let i = 0,j = self.hasSelectedTime.length; i < j; i++) {
								if (valueOfDate >= self.hasSelectedTime[i]['startTime'] - 86400000 && valueOfDate <= self.hasSelectedTime[i]['endTime']) {
									return true;
								}
							}
							return false;
						} else {
							return true;
						}
					}
				};
			},
			//已经有设置积分抵扣规则的日期
			hasSelectedTime () {
				return this.validRules.map(item => {
					return {
						...item,
						startTime : new Date(item.startTime).valueOf(),
						endTime : new Date(item.endTime).valueOf(),
					};
				}).filter(item => item['ruleName'] != this.defaultInfo['data']['ruleName'] );
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
	.add-integer-rule{

		.modal-footer{
			/deep/ .ivu-btn{
				padding: 5px 30px;
			}
		}

		.modal-body{
			padding: 20px 0 0 10px;
			min-height: 260px;
			display: flex;
			align-items: center;

			.integral-rate{
				height: 30px;
				line-height: 30px;
				font-size: 14px;
				padding-left : 25px;
			}

			/deep/ .ivu-input-group-append{
				background : $color_fff;
				border-left : 0;
			}

			/deep/ .ivu-input:focus{
				border : 1px solid #e0e0e0;
				box-shadow : 0 0 ;
			}

			/deep/ .ivu-input-group .ivu-input{
				border-right : 0;
			}

			/deep/ .ivu-form{
				width : 100%;
			}

			/deep/ .ivu-input-wrapper{
				/*width: 160px;*/
				margin-right: 5px;
			}
			.equil{
				margin-left: 10px;
			}

			.textarea-wrap{
				/deep/ .ivu-input-wrapper{
					width: 320px;
				}
			}
		}
	}
</style>
