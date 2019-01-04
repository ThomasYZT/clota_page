<!--房款返还至各业态账户的比例设置-->

<template>
    <div class="owner-account-percent">
        <div class="title">{{$t('SettingOfhousingFundBackto')}}</div>
        <Form ref="formInline"
              :label-width="60">
            <template v-for="(item,index) in formData">
                <i-col span='12' :key="index">
                    <FormItem prop="percent"
                              :label="$t(item['accountTypeName'])"
                              :rules="{ required : true,validator : validatePercent, trigger : 'blur',data : item['refundScale'] }">
                        <i-input type="text"
                                 :value="item['refundScale']"
                                 style="width : 100px;"
                                 @on-change="changePercent($event,index)">
                            <span slot="append">%</span>
                        </i-input>
                    </FormItem>
                </i-col>
            </template>
        </Form>
    </div>
</template>

<script>
    import common from '@/assets/js/common.js';

	export default {
		props : {
			//业主返款数据
			'owner-data' : {
				type : String,
				default : ''
            }
        },
		data () {
			return {
            };
		},
		methods : {
            /**
             * 返款比例修改，重置数据
             * @param e
             * @param index
             */
            changePercent (e,index) {
                let result = [];
                for (let i = 0,j = this.formData.length; i < j; i++ ) {
                    let data = this.formData[i];
                    if (index === i) {
                        data['refundScale'] = e.target.value;
                    }
                    result.push({
                        ...data
                    });
                }
                this.$emit('updateOwnerData',JSON.stringify(result));
            },
            /**
             * 校验返款比例
             * @param rule
             * @param value
             * @param callback
             */
            validatePercent (rule,value,callback) {
                if (common.isNotEmpty(rule.data)) {
                    common.validateMoney(rule.data,0,10).then(() => {
                        let total = 0;
                        for (let i = 0,j = this.formData.length; i < j; i++ ) {
                            total += Number(this.formData[i]['refundScale']);
                        }
                        if (total === 100) {
                            callback();
                        } else {
                            callback(this.$t('FundBacktoTip'));
                        }
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t('errorMaxLength',{ field : this.$t('backMoneyRate'),length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t('backMoneyRate') }));
                        }
                    });
                } else {
                    callback(this.$t('inputField', { field : this.$t('backMoneyRate') }));
                }
            },
            /**
             * 校验表单数据
             */
            validateFormData () {
                return new Promise((resolve,reject) => {
                    this.$refs.formInline.validate(valid => {
                        if (valid) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });
            }
        },
        computed : {
	        //表单数据
	        formData () {
	            let result = [
                    {},
                    {},
                    {},
                    {},
                ];
                if (this.ownerData) {
                    result = JSON.parse(this.ownerData);
                }
                return result;
            }
        }
	};
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .owner-account-percent{

        /deep/ .ivu-form{
            overflow: hidden;
            width: 343px;
        }

        /deep/ .ivu-form-item-content{
            width: auto!important;
        }

        /deep/ .ivu-input-group-append{
            background : $color_fff;
            border-left : 0;
        }

        /deep/ .ivu-input:focus{
            border : 1px solid #e0e0e0;
            box-shadow : 0 0 ;
        }
    }
</style>
