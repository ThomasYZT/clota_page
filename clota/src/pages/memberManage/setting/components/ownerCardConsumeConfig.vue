<!--房款返还至各业态账户的比例设置-->

<template>
    <div class="owner-account-percent">
        <div class="title">{{$t('业主使用已返还金额在各业态进行消费时单笔订单可用金额比例设置')}}</div>
        <Form ref="formInline"
              :label-width="60">
            <template v-for="(item,index) in formData['refundPercent']">
                <FormItem prop="percent"
                          v-if="item.show"
                          :key="item['accountTypeName']"
                          :label="$t(item['accountTypeName'])"
                          :rules="{ required : true,validator : validatePercent, trigger : 'blur',data : item['usableScale'] }">
                    <i-input type="text"
                             :value="item['usableScale']"
                             style="width : 100px;"
                             @on-change="changePercent($event,index)">
                        <span slot="append">%</span>
                    </i-input>
                </FormItem>
            </template>
            <i-row>
                <i-col style="display: inline-block;width : auto;">
                    <span>酒店消费时需额外支付</span>
                </i-col>
                <i-col style="display: inline-block;width : auto;">
                    <FormItem prop="hotelNeedPay"
                              :label-width="1"
                              :rules="{ required : true,validator : validateHotelNeedPay , trigger : 'blur', data : formData.hotelNeedPay }">
                        <i-input :value="formData.hotelNeedPay"
                                 type="text"
                                 style="width : 140px;"
                                 @on-change="changeNeedPay($event)">
                        </i-input>
                    </FormItem>
                </i-col>
                <i-col style="display: inline-block;width : auto;">
                    <span>元,其余可用业主卡内金额消费</span>
                </i-col>
            </i-row>
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
                let originalData = JSON.parse(JSON.stringify(this.formData.refundPercent));
                for (let i = 0,j = originalData.length; i < j; i++ ) {
                    let data = originalData[i];
                    if (index === i) {
                        data['usableScale'] = e.target.value;
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
                        if (rule.data > 100) {
                            callback('消费金额比例最多为100%');
                        } else {
                            callback();
                        }
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t('errorMaxLength',{ field : this.$t('返款比例'),length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t('返款比例') }));
                        }
                    });
                } else {
                    callback(this.$t('inputField', { field : this.$t('返款比例') }));
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
            },
            /**
             * 校验酒店消费时需要额外支付的费用
             * @param rule 校验规则
             * @param value 校验值
             * @param callback 回调函数
             */
            validateHotelNeedPay (rule,value,callback) {
                common.validateMoney(rule.data,0,10).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t('errorMaxLength',{ field : this.$t('支付费用'),length : 10 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('支付费用') }));
                    }
                });
            },
            /**
             * 修改酒店消费时需要支付的额外费用
             * @param e
             */
            changeNeedPay (e) {
                let originalData = JSON.parse(JSON.stringify(this.formData.refundPercent));
                for (let i = 0,j = originalData.length; i < j; i++ ) {
                    if ( originalData[i]['accountTypeName'] === 'hotel' ) {
                        originalData[i]['needPay'] = e.target.value;
                    }
                }
                this.$emit('updateOwnerData',JSON.stringify(originalData));
            }
        },
        computed : {
            //表单数据
            formData () {
                let result = {
                    //消费比例
                    refundPercent : [],
                    //酒店消费时，需要额外支付的费用
                    hotelNeedPay : '',
                };
                if (this.ownerData) {
                    let refundPercent = [];
                    let hotelNeedPay = '';
                    let tmpData = JSON.parse(this.ownerData);
                    for (let i = 0,j = tmpData.length; i < j; i++) {
                        if (tmpData[i]['accountTypeName'] !== 'hotel') {
                            refundPercent.push({
                                ...tmpData[i],
                                show : true
                            });
                        } else {
                            hotelNeedPay = tmpData[i]['needPay'];
                            refundPercent.push({
                                ...tmpData[i],
                                show : false
                            });
                        }
                    }
                    result = {
                        refundPercent : refundPercent,
                        hotelNeedPay : hotelNeedPay,
                    };
                }
                return result;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .owner-account-percent{

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
