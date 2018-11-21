<template>
    <!--购买短信套餐-->
    <Modal
        v-model="visible"
        :title="$t('buySmsMeal')"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                <!--短信套餐名称-->
                <Form-item :label="$t('smsPackageName') + '：'" prop="">
                    <span>{{formData.packageName}}</span>
                </Form-item>
                <!--套餐价格-->
                <Form-item :label="$t('packagePrice') + '：'" prop="">
                    <span>￥{{formData.price | moneyFilter}}</span>
                </Form-item>
                <!--短信数量-->
                <Form-item :label="$t('smsCount') + '：'" prop="">
                    <span>{{formData.smsCount | contentFilter}}{{$t('item')}}</span>
                </Form-item>
                <!--短信供应商-->
                <Form-item :label="$t('smsProvider') + '：'" prop="">
                    <span>{{formData.provider | contentFilter}}</span>
                </Form-item>
                <!--支付方式-->
                <Form-item :label="$t('payType') + '：'" prop="">
                    <RadioGroup v-model="formData.payType" @on-change="onTypeChanged">
                        <Radio label="zfb">{{$t('ailiPay')}}</Radio><!--支付宝-->
                        <Radio label="wx">{{$t('wechatPay')}}</Radio><!--微信支付-->
                    </RadioGroup>
                </Form-item>

            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="buyNow(formData)" >{{$t('buyNow')}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        props: ['row-data'],
        components: {},
        data () {
            return {
                visible: false,
                //表单数据
                formData: {
                    packageName: '',
                    price: '',
                    smsCount: 0,
                    provider: '',
                    payType: 'zfb',
                },
                //校验规则
                ruleValidate: {

                },

            }
        },
        watch: {

        },
        methods: {

            show ( data ) {
                if( data ){
                    this.formData = defaultsDeep({}, data.item, this.formData);
                }
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if(valid){

                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.formData = {
                    packageName: '',
                    price: '',
                    smsCount: 0,
                    provider: '',
                    payType: 'zfb',
                };

            },

            //
            onTypeChanged() {},

            // 立即购买
            buyNow ( params ) {
                ajax.post('orderBuySmsPackage', {
                    smsPackageId: params.id,
                    payType : this.formData.payType === 'zfb' ? 'alipay' : 'weixin',
                }).then(res => {
                    if( res.success ) {
                        if (res.data) {
                            this.payNow({
                                bizId : res.data,
                                payType : this.formData.payType === 'zfb' ? 'alipay' : 'weixin',
                                payMoney : this.formData.price
                            });
                        } else {
                            this.$Message.error(res.message || this.$t('failureTip',{'tip' : this.$t('add')}));
                        }
                    } else {
                        this.$Message.error(res.message || this.$t('failureTip',{'tip' : this.$t('add')}));
                    }
                })
            },

            /**
             * 支付接口调用
             */
            payNow ({bizId, payType, payMoney}) {
                ajax.post('getPayQRCodePageForPc', {
                    bizScene : 'sms',
                    bizType : 'buy_sms_package',
                    bizId : bizId,
                    channelId : payType,
                    txnAmt : payMoney,
                    redirectUrl : location.origin + '/#/systemSetting/smsManage/payStatus'
                }).then(res => {
                    if (res.success) {
                        this.$router.replace({
                            name : 'smsPay',
                            params : {
                                payFormData : res.data
                            }
                        })
                        // this.$Message.success(this.$t('successTip',{'tip' : this.$t('add')}));
                        // this.hide();
                        // this.$emit('updata-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.error(res.message || this.$t('failureTip',{'tip' : this.$t('add')}));
                    }
                })
            }

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 4px 14px;

            .steps-wrap{
                padding-top: 5px;
                margin-left: 100px;
                margin-bottom: 18px;

                /deep/ .ivu-steps .ivu-steps-head-inner > .ivu-steps-icon.ivu-icon {
                    font-size: 12px;
                    transform: scale(0.7);
                }
                /deep/ .ivu-steps .ivu-steps-tail > i{
                    height: 2px;
                    border-radius: 2px;
                }
            }

            /deep/ .ivu-from{
                padding-top: 15px;
            }

            /deep/ .ivu-select{
                width: 280px;
            }

            /deep/ .ivu-input-wrapper{
                width: 280px;
                &.single-input{
                    width: 130px !important;
                }
            }

        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>
