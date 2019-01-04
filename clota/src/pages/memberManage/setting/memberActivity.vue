<!--会员活动-->

<template>
	<div class="member-activity">
		<!--头部tab组件-->
		<header-tabs router-name="memberActivity"></header-tabs>
		<div class="content">
			<div class="btn-wrap">
				<Button type="primary" @click="showRecord">{{$t('sendRecord')}}</Button>
			</div>
			<Form ref="formValidate"
                  :model="formData"
                  label-position="left"
                  :rules="ruleValidate"
                  :label-width="110">
				<FormItem :label="$t('colonSetting', { key : $t('smsContent') })" prop="content">
					<i-input v-model.trim="formData.content"
                             type="textarea"
                             style="width: 480px" >
					</i-input>
				</FormItem>
				<FormItem :label="$t('colonSetting', { key : $t('membershipCard') })" prop="sendRange">
					<Select v-model="formData.sendRange"
							multiple
							style="width: 480px"
							@on-change="countMemberInLevel">
						<Option :value="item.id"
								v-for="item in memberLevels"
								:key="item.id">
							{{$t(item.typeName)}}-{{$t(item.levelDesc)}}
						</Option>
					</Select>
				</FormItem>
				<FormItem :label="$t('colonSetting', { key : $t('smsNumRecieve') })">{{formData.smsCount | contentFilter}}</FormItem>
				<FormItem >
					<Button type="primary" :loading="sending" class="ivu-btn-90px" @click="send">{{$t('sending')}}</Button>
				</FormItem>
			</Form>
		</div>
	</div>
</template>

<script>
	import headerTabs from './components/headerTabs.vue';
	import ajax from '@/api/index';
	export default {
		components : {
			headerTabs
		},
		data () {
			return {
				//表单数据
				formData : {
					//短信内容
					content : '',
					//会员级别id
					sendRange : [],
					//发送短信数量
					smsCount : ''
				},
				//校验规则
				ruleValidate : {
					content : [
						{
							required : true,
							message : this.$t('inputField',{ field : this.$t('smsContent') }),
							trigger : 'blur'
						},
						{
							max : 100,
							message : this.$t('errorMaxLength',{ field : this.$t('smsContent'),length : 100 }) ,
							trigger : 'blur'
						}
					],
					sendRange : [
						{
							required : true,
							message : this.$t('selectField',{ msg : this.$t('memberCardLevel') }),
							trigger : 'change',
							type : 'array'
						}
					]
				},
				//会员级别信息
				memberLevels : [],
				//是否在发送中
				sending : false
			};
		},
		methods : {
			/**
			 * 获取所有会员类别以及级别信息
			 */
			getMemberLevelsInType () {
				ajax.post('queryMemberLevels',{
					pageNo : 1,
					pageSize : 99999,
					status : 'valid'
				}).then(res => {
					if (res.success) {
						this.memberLevels = res.data ? res.data.data : [];
					} else {
						this.memberLevels = [];
					}
				});
			},
			/**
			 * 发送短信
			 */
			sendMassSms () {
			this.sending = true;
				ajax.post('sendMassSms',{
					sendRange : this.formData.sendRange.join(','),
					sendRangeText : this.sendRangeText,
					content : this.formData.content,
					count : this.formData.smsCount,
					// sendTime : new Date().format('yyyy-MM-dd')
				}).then(res => {
					if (res.success) {
						this.$Message.success(this.$t('successTip',{ tip : this.$t('sending') }));
					} else {
						this.$Message.error(this.$t('failureTip',{ tip : this.$t('sending') }));
					}
				}).finally(() => {
					this.sending = false;
				});
			},
			/**
			 * 获取发送会员短信数量
			 * @param{Boolean} type 显示或隐藏
			 */
			countMemberInLevel (type) {
				ajax.post('countMemberInLevel',{
					memberLevelIds : this.formData.sendRange.join(','),
				}).then(res => {
					if (res.success) {
						this.formData.smsCount = res.data ? res.data : 0;
					} else {
						this.formData.smsCount = 0;
					}
				});
			},
			/**
			 * 发送短信
			 */
			send () {
				this.$refs.formValidate.validate(valid => {
					if (valid) {
						this.sendMassSms();
					}
				});
			},
			/**
			 * 查看短信发送记录
			 */
			showRecord () {
				this.$router.push({
					name : 'smsSendRecord'
				});
			}
		},
		created () {
			this.getMemberLevelsInType();
		},
		computed : {
			//发送短信景区名字列表
			sendRangeText () {
				return this.memberLevels.filter(item => this.formData.sendRange.includes(item.id)).map(item => item.levelDesc).join(',');
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
	.member-activity{
		@include block_outline();

		.content{
			padding: 0 30px;
			height: calc(100% - 68px);

			.btn-wrap{
				padding: 14px 0;
				@include block_outline($height : 60px);
			}

			/deep/ .ivu-form-item-label{
				padding-left: 0;
			}

			/deep/ textarea.ivu-input{
				height: 200px;
			}
		}

	}
</style>
