<template>
    <div class="modal-wrapper">
        <!--重置密码-->
        <Modal
            v-model="visible"
            :title="$t(title)"
            class-name="add-account-modal vertical-center-modal"
            width="500"
            @on-visible-change="visibleChange"
            :mask-closable="false"
            @on-cancel="hide">

            <template v-if="showContent">
                <div class="modal-body">
                    <Form ref="formValidate"
                          :model="formData"
                          :rules="ruleValidate"
                          :label-width="lang === 'zh-CN' ? 130 : 150">
                        <!--合作伙伴-->
                        <Form-item :label="$tc('partner',1) + ':'" prop="">
                            <span>{{formData.orgName}}</span>
                        </Form-item>
                        <!--充值金额-->
                        <Form-item :label="$t('rechargeAmount')" prop="rechargeAmount">
                            <Input v-model.trim="formData.rechargeAmount" :placeholder="$t('inputField', {field: $t('rechargeAmount')})" />
                            <span style="margin-left: 10px;">{{$t('yuan')}}</span>
                        </Form-item>
                        <!--支付方式-->
                        <Form-item :label="$t('payType')" prop="payType">
                            <RadioGroup v-model="formData.payType"
                                        @on-change="payTypeChange">
                                <Radio v-for="(item,index) in onlineAccountList"
                                       :key="index"
                                       :label="item.value">
                                    {{$t('onlineAccount.' + item.value)}}
                                </Radio>
                            </RadioGroup>
                        </Form-item>
                        <!--备注-->
                        <Form-item :label="$t('remark')" prop="remark" style="margin-top: 20px;margin-bottom: 20px">
                            <Input type="textarea" v-model.trim="formData.remark" :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </Form>
                </div>
                <div slot="footer" class="modal-footer">
                    <Button type="primary" @click="confirm()" >{{$t('confirm')}}</Button>
                    <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
                </div>
            </template>

            <template v-else>
                <div class="no-account-tip">
                    <span>{{$t('thisPartnerHasNotSettingAccount')}}</span>
                </div>

                <div slot="footer" class="modal-footer">
                    <Button type="ghost" @click="hide" >{{$t("close")}}</Button>
                </div>
            </template>

        </Modal>
        <!--查询支付结果模态框-->
        <loopForPayResult v-model="payModalShow"
                         ref="payResultModal"
                         :transaction-id="transactionId"
                         :resultLocation="'rechargeRecord'"
                         @search-success="paySuccess">
        </loopForPayResult>

        <!--微信二维码支付-->
        <wx-qrcode :pay-link="wxSrc"
                   :transaction-id="transactionId"
                   v-model="wxPayShow"
                   @pay-success="wxPaySuccess"
                   @pay-fail="wxPayFail"
                   @pay-unknow="wxPayUnknown"
                   @cancel-success="cancelSuccess">
        </wx-qrcode>

        <!--支付错误提示框-->
        <notice-modal ref="noticeModal">
            {{$t('payResultError')}}
        </notice-modal>
    </div>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import loopForPayResult from '@/components/loopForPayResult/loopForPayResult';
    import { mapGetters } from 'vuex';
    import common from '@/assets/js/common';
    import wxQrcode from '@/components/weixinPay/index.vue';
    import noticeModal from '@/components/noticeModal/index.vue';

    export default {
        props : ['row-data','onlineAccountList','partner-info'],
        components : {
            loopForPayResult,
            wxQrcode,
            noticeModal
        },
        data () {
            const validateMethod = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') )); // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
                validateMoney : (rule,value,callback) => {
                    if (value) {
                        common.validateMoney(value).then(() => {
                            callback();
                        }).catch(err => {
                            if (err === 'errorMaxLength') {
                                callback(this.$t('errorMaxLength',{ field : this.$t(rule.field),length : 10 }));
                            } else {
                                callback(this.$t(err,{ field : this.$t(rule.field) }));
                            }
                        });
                    } else {
                        callback();
                    }
                },
            };

            return {
                visible : false,
                //表单数据
                formData : {
                    partner : '',
                    rechargeAmount : '',
                    payType : '',
                    remark : '',
                },
                //校验规则
                ruleValidate : {
                    rechargeAmount : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('rechargeAmount') }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateMethod.validateMoney, trigger : 'blur' },
                    ],
                    payType : [
                        { required : true, message : this.$t('selectField', { msg : this.$t('payType') }), trigger : 'blur' },
                    ]
                },
                //模态框标题
                title : '',
                //是否显示模态框内容
                showContent : false,
                //轮询模态框是否显示
                payModalShow : false,
                //订单交易号
                transactionId : '',
                //账户交易信息
                payInfo : {},
                //微信二维码链接
                wxSrc : '',
                //微信支付是否显示
                wxPayShow : false,
            };
        },
        watch : {

        },
        methods : {
            /**
             *  显示模态框
             */
            show ( data ) {
                this.visible = true;
                if ( data ) {
                    this.formData = defaultsDeep({
                        partner : '',
                        rechargeAmount : '',
                        payType : '',
                        remark : '',
                    }, data.item );
                }
                this.controlModal();
            },
            /**
             *  关闭模态框
             */
            hide () {
                if (this.$refs.formValidate) {
                    this.$refs.formValidate.resetFields();
                }
                this.visible = false;
                this.payInfo = {};
            },
            /**
             * 控制模态框状态
             */
            controlModal () {
                if (this.onlineAccountList.length > 0) {
                    this.title = 'topUp';
                    this.showContent = true;
                } else {
                    this.title = 'notice';
                    this.showContent = false;
                }
                this.visible = true;
            },
            /**
             *  确定
             */
            confirm () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.confirmRecharge(this.formData);
                    }
                });
            },
            /**
             *  确认充值
             */
            confirmRecharge ( params ) {
                let newWindow = '';
                let paymentChannel = this.onlineAccountList.find(item => item.accountType === this.formData.payType)['payType'];
                if (!(this.formData.payType === 'weixin' && paymentChannel === 'zhilian')) {
                    newWindow = window.open();
                }
                ajax.post('recharge', {
                    orgAccountId : params.id,
                    amount : this.formData.rechargeAmount,
                    paymentType : this.formData.payType,
                    remark : this.formData.remark
                }).then(res => {
                    if ( res.success && res.data ) {
                        this.payNow({
                            bizId : res.data,
                            merchantId : this.payInfo.merchantId,
                            partnerId : this.payInfo.partnerId,
                            payType : this.formData.payType,
                            payMoney : this.formData.rechargeAmount,
                            newWindow,
                            paymentChannel
                        });
                    } else {
                        this.$Message.error(res.message || this.$t('failureTip',{ 'tip' : this.$t('topUp') }));
                    }
                });
            },
            /**
             * 支付接口调用
             */
            payNow ({ bizId, payType, payMoney, merchantId, partnerId,newWindow,paymentChannel }) {
                ajax.post('getPayQRCodePageForPc', {
                    merchantId : merchantId,
                    partnerId : partnerId,
                    bizScene : 'org_account',
                    bizType : 'account_recharge',
                    bizId : bizId,
                    channelId : payType,
                    txnAmt : payMoney,
                    paymentChannel : paymentChannel,
                    orgId : this.partnerInfo.peerOrgId
                }).then(res => {
                    if (res.success && res.data) {
                        if (payType === 'weixin' && paymentChannel === 'zhilian') {
                            this.wxPayShow = true;
                            this.wxSrc = res.data.formContent;
                            this.transactionId = res.data.transactionId;
                            this.hide();
                        } else {
                            const { href } = this.$router.resolve({
                                name : 'financeRecharge',
                                params : {
                                    payFormData : res.data
                                },
                            });
                            localStorage.setItem('financeRecharge', JSON.stringify({ payFormData : res.data }));
                            newWindow.location.href = location.href.replace(location.hash, href);
                            this.payModalShow = true;
                            this.hide();
                            this.startSearchForPayResult({ transctionId : res.data && res.data.transactionId ? res.data.transactionId : '' });
                        }
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
                this.$emit('update-list');
                this.hide();
            },
            /**
             * 支付方式改变
             * @param { string } item
             */
            payTypeChange (payType) {
                this.payInfo = this.onlineAccountList.find((account) => {
                    return account.accountType === payType;
                });
            },
            /**
             * 模态框状态改变
             * @param{Boolean} status 模态框状态
             */
            visibleChange (status) {
                if (status === false && this.$refs.formValidate) {
                    this.$refs.formValidate.resetFields();
                }
            },
            /**
             * 微信支付完成
             */
            wxPaySuccess () {
                this.payModalShow = true;
                this.$refs.payResultModal.setStage('success');
                this.$emit('update-list');
            },
            /**
             * 微信支付失败
             */
            wxPayFail () {
                this.payModalShow = true;
                this.$refs.payResultModal.setStage('fail');
            },
            /**
             * 交易结果未知
             */
            wxPayUnknown () {
                this.$refs.noticeModal.show({
                    title : this.$t('notice'),
                    showCancel : false
                });
            },
            /**
             * 交易取消成功
             */
            cancelSuccess () {
                this.payModalShow = true;
                this.$refs.payResultModal.setStage('cancel');
            }
        },
        computed : {
            ...mapGetters([
                'lang',
            ])
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 4px 14px;

            /deep/ .ivu-from{
                padding-top: 15px;
            }

            /deep/ .ivu-form-item {
                margin-bottom: 10px;

                .ivu-form-item-label {
                    padding: 8px 10px 8px 12px;
                }
                .ivu-form-item-content {
                    line-height: 30px;
                }
            }

            /deep/ .ivu-input-wrapper{
                width: 240px;
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

        .no-account-tip {
            width: 100%;
            height: 200px;
            font-size: 18px;
            color: #000;
            line-height: 200px;
            text-align: center;
        }

    }
</style>
