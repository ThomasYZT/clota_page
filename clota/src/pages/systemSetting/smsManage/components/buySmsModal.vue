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
                <template v-if="onlineAccountList.length > 0">
                    <Form ref="formValidate"
                          :model="formData"
                          :rules="ruleValidate"
                          :label-width="lang === 'zh-CN' ? 130 : 220">
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
                        <Form-item :label="$t('payType') + '：'" prop="payType">
                            <RadioGroup v-model="formData.payType" @on-change="onTypeChanged">
                                <Radio v-for="(item,index) in onlineAccountList"
                                       :key="index"
                                       :label="item.value">
                                    {{$t('onlineAccount.' + item.value)}}
                                </Radio>
                            </RadioGroup>
                        </Form-item>
                    </Form>
                </template>
                <template v-else>
                    <div class="warn-tip">平台暂未配置在线收款账户，请联系客服</div>
                </template>
            </div>

            <div slot="footer" class="modal-footer">
                <Button v-if="onlineAccountList.length > 0" type="primary" @click="buyNow(formData)" >{{$t('buyNow')}}</Button>
                <Button v-else type="primary" @click="hide()">{{$t('close')}}</Button>
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
    import { mapGetters } from 'vuex';

    export default {
        props : ['row-data'],
        components : {
            loopForPayResult
        },
        data () {
            return {
                visible : false,
                //表单数据
                formData : {
                    packageName : '',
                    price : '',
                    smsCount : 0,
                    provider : '',
                    payType : '',
                },
                //校验规则
                ruleValidate : {
                    payType : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('payType') }),
                            trigger : 'blur'
                        }
                    ]
                },
                //支付方式附带信息
                payInfo : {},
                //是否显示支付状态模态框
                payModalShow : false,
                transactionId : '',
                //平台在线支付账户列表
                onlineAccountList : []
            };
        },
        watch : {

        },
        methods : {

            show ( data ) {
                if ( data ) {
                    this.formData = defaultsDeep({}, data.item, this.formData);
                    if (this.onlineAccountList.length > 0) {
                        this.formData.payType = this.onlineAccountList[0].accountType;
                    }
                }
                this.queryAccountList();
            },

            //关闭模态框
            hide () {
                this.visible = false;
                this.formData = {
                    packageName : '',
                    price : '',
                    smsCount : 0,
                    provider : '',
                    payType : '',
                };

            },

            //
            onTypeChanged (data) {
                this.payInfo = this.onlineAccountList.find(item => {
                    return item.accountType === data;
                });
            },

            // 立即购买
            buyNow ( params ) {
                let newWindow = window.open();
                ajax.post('orderBuySmsPackage', {
                    smsPackageId : params.id,
                    payType : this.formData.payType,
                }).then(res => {
                    if ( res.success ) {
                        if (res.data) {
                            this.payNow({
                                bizId : res.data,
                                merchantId : this.payInfo.merchantId,
                                partnerId : this.payInfo.partnerId,
                                payType : this.formData.payType,
                                payMoney : this.formData.price,
                                newWindow : newWindow,
                            });
                        } else {
                            this.$Message.error(this.$t('failureTip',{ 'tip' : this.$t('buy') }));
                        }
                    } else {
                        this.$Message.error(this.$t('failureTip',{ 'tip' : this.$t('buy') }));
                    }
                });
            },

            /**
             * 支付接口调用
             */
            payNow ({ bizId, payType, payMoney, merchantId, partnerId, newWindow }) {
                let paymentChannel = this.onlineAccountList.find(item => item.accountType === payType)['payType'];
                ajax.post('getPayQRCodePageForPc', {
                    merchantId : merchantId,
                    partnerId : partnerId,
                    bizScene : 'sms',
                    bizType : 'buy_sms_package',
                    bizId : bizId,
                    channelId : payType,
                    txnAmt : payMoney,
                    paymentChannel : paymentChannel
                }).then(res => {
                    if (res.success) {
                        const { href } = this.$router.resolve({
                            name : 'smsPay',
                            params : {
                                payFormData : res.data
                            }
                        });
                        localStorage.setItem('smsPay', JSON.stringify({ payFormData : res.data }));
                        newWindow.location.href = location.href.replace(location.hash, href);
                        this.payModalShow = true;
                        this.hide();
                        this.startSearchForPayResult({ transctionId : res.data && res.data.transactionId ? res.data.transactionId : '' });
                    } else {
                        this.$Message.error(this.$t('failureTip',{ 'tip' : this.$t('buy') }));
                    }
                });
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
            /**
             * 查询在线支付账户列表
             */
            queryAccountList () {
                ajax.post('queryOnlineAccount',{
                    isPlatformAcc : true,
                }).then(res => {
                    if (res.success) {
                        this.onlineAccountList = res.data ? res.data.filter(item => item.useStatus === 'enabled').map(item => {
                            return {
                                ...item,
                                value : item.accountType,
                                label : item.accountType,
                                payType : item.paymentChannel === 'wxorali' ? 'zhilian' : 'yinshi'
                            };
                        }) : [];
                    } else {
                        this.onlineAccountList = [];
                    }
                }).finally(() => {
                    this.visible = true;
                });
            }
        },
        computed : {
            ...mapGetters([
                'lang'
            ])
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            min-height: 200px;
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

            .warn-tip {
                @include div_center();
                font-size: 18px;
                white-space: nowrap;
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>
