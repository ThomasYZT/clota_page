<template>
    <div>
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
                            <!--<Radio label="zfb">{{$t('ailiPay')}}</Radio>&lt;!&ndash;支付宝&ndash;&gt;-->
                            <!--<Radio label="wx">{{$t('wechatPay')}}</Radio>&lt;!&ndash;微信支付&ndash;&gt;-->
                            <Radio v-for="(item, index) in payTypeList"
                                   :key="index"
                                   :label="item.accountType">{{$t('payType.' + item.accountType)}}</Radio>
                        </RadioGroup>
                    </Form-item>

                </Form>

            </div>

            <div slot="footer" class="modal-footer">
                <Button type="primary" @click="buyNow(formData)" >{{$t('buyNow')}}</Button>
            </div>


        </Modal>
        <!--查询支付结果模态框-->
        <loop-for-pay-result v-model="payModalShow"
                             ref="payResultModal"
                             :transaction-id="transactionId"
                             :resultLocation="'smsBuyRecord'"
                             @search-success="paySuccess">
        </loop-for-pay-result>
    </div>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import loopForPayResult from '../../../../components/loopForPayResult/loopForPayResult';

    export default {
        props: ['row-data'],
        components: {
            loopForPayResult
        },
        data () {
            return {
                visible: false,
                //表单数据
                formData: {
                    packageName: '',
                    price: '',
                    smsCount: 0,
                    provider: '',
                    payType: '',
                },
                //校验规则
                ruleValidate: {

                },
                //支付方式列表数据
                payTypeList : [],
                //支付方式附带信息
                payInfo : {},
                //是否显示支付状态模态框
                payModalShow : false,
                transactionId : ''
            }
        },
        watch: {

        },
        methods: {

            show ( data ) {
                if( data ){
                    this.formData = defaultsDeep({}, data.item, this.formData);
                    this.queryOnlineAccount();
                }
                this.visible = true;
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.formData = {
                    packageName: '',
                    price: '',
                    smsCount: 0,
                    provider: '',
                    payType: '',
                };

            },

            //
            onTypeChanged(data) {
                this.payInfo = this.payTypeList.find(item => {
                    return item.accountType === data;
                });
            },

            // 立即购买
            buyNow ( params ) {
                ajax.post('orderBuySmsPackage', {
                    smsPackageId: params.id,
                    payType : this.formData.payType,
                }).then(res => {
                    if( res.success ) {
                        if (res.data) {
                            this.payNow({
                                bizId : res.data,
                                merchantId : this.payInfo.merchantId,
                                partnerId : this.payInfo.partnerId,
                                payType : this.formData.payType,
                                payMoney : this.formData.price
                            });
                        } else {
                            this.$Message.error(this.$t('failureTip',{'tip' : this.$t('buy')}));
                        }
                    } else {
                        this.$Message.error(this.$t('failureTip',{'tip' : this.$t('buy')}));
                    }
                })
            },

            /**
             * 支付接口调用
             */
            payNow ({bizId, payType, payMoney, merchantId, partnerId}) {
                ajax.post('getPayQRCodePageForPc', {
                    merchantId : merchantId,
                    partnerId : partnerId,
                    bizScene : 'sms',
                    bizType : 'buy_sms_package',
                    bizId : bizId,
                    channelId : payType,
                    txnAmt : payMoney,
                    //redirectUrl : ''
                    //redirectUrl : encodeURI('https://www.baidu.com/')/*encodeURI(location.origin + '/#/systemSetting/smsManage/payStatus')*/,
                }).then(res => {
                    if (res.success) {
                        const { href } = this.$router.resolve({
                            name : 'smsPay',
                            params : {
                                payFormData : res.data
                            }
                        });
                        sessionStorage.setItem('smsPay', JSON.stringify({ payFormData : res.data }));
                        window.open(href);
                        this.payModalShow = true;
                        this.hide();
                        this.startSearchForPayResult({ transctionId : res.data && res.data.transactionId ? res.data.transactionId : '' });
                    } else {
                        this.$Message.error(this.$t('failureTip',{'tip' : this.$t('buy')}));
                    }
                })
            },
            queryOnlineAccount () {
                ajax.post('queryOnlineAccount', {
                    isPlatformAcc : true,
                    PageNo : 1,
                    PageSize : 100
                }).then(res => {
                    if (res.success && res.data && res.data.length > 0) {
                        this.payTypeList = res.data;
                        this.formData.payType = this.payTypeList[0].accountType;
                        this.payInfo = this.payTypeList[0];
                    } else {
                        this.payTypeList = [];
                    }
                })
            },
            /**
             * 开启查询支付结果
             * @param{Object} transctionId 内部交易id
             */
            startSearchForPayResult ({ transctionId }) {
                this.transactionId = transctionId;
                this.$refs.payResultModal.startSearchPayResult();
            },
            /**
             * 支付成功
             */
            paySuccess () {
                this.$emit('add-success');
                this.hide();
            },
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
