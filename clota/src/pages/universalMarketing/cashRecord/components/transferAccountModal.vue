<!--
内容：提交/修改 转账流水
作者：djc
日期：
-->

<template>
    <div>
        <Modal
            v-model="visible"
            class-name="vertical-center-modal"
            :mask-closable="false"
            :width="lang === 'zh-CN' ? 560 : 660"
            :title="$t('fillTransferNumber')"
            @on-cancel="hide">

            <!--内容区域-->
            <Form ref="formValidate"
                  :model="transferParams"
                  :rules="ruleValidate"
                  :label-width="lang === 'zh-CN' ? 180 : 295"
                  style="padding-right: 30px;"
                  @submit.native.prevent>
                <!--订单号-->
                <Form-item :label="$t('colonSetting', { key: $t('orderId') })">
                    <div>{{withdrawInfo.orderId | contentFilter}}</div>
                </Form-item>
                <!--销售用户姓名-->
                <Form-item :label="$t('colonSetting', { key: $t('saleUserName') })">
                    <div>{{withdrawInfo.userName | contentFilter}}</div>
                </Form-item>
                <!--收款账户类型-->
                <Form-item :label="$t('colonSetting', { key: $t('collectionAccountType') })">
                    <div>{{ $t(transAccountType(withdrawInfo.accountType)) | contentFilter }}</div>
                </Form-item>
                <!--收款账号/卡号-->
                <Form-item :label="$t('colonSetting', { key: $t('gatheringAccountAndCardNo') })">
                    <div>{{withdrawInfo.accountInfo | contentFilter}}</div>
                </Form-item>
                <!--订单金额-->
                <Form-item :label="$t('colonSetting', { key: $t('orderAmount') })">
                    <div>{{withdrawInfo.checkAmount | contentFilter}}</div>
                </Form-item>
                <!--佣金-->
                <Form-item :label="$t('colonSetting', { key: $t('commission') })">
                    <div>{{withdrawInfo.orderSalary | contentFilter}}</div>
                </Form-item>
                <!--付款方式-->
                <Form-item :label="$t('colonSetting', { key: $t('modeOfPayment') })">
                    <AutoComplete
                        v-model.trim="transferParams.salaryPayment"
                        :disabled="isProxyBank"
                        :placeholder="$t('inputField', { field : $t('modeOfPayment') })"><!--请输入付款方式-->
                        <Option v-for="item in paymentTypeList"
                                :value="$t(item.salaryPayment)"
                                :key="item.id">{{ item.salaryPayment === 'wxPay' || item.salaryPayment === 'aliPay' ? $t(item.salaryPayment) : item.salaryPayment }}</Option>
                    </AutoComplete>
                    <!--<Select class="field-item"
                            v-model="transferParams.salaryPayment"
                            @on-change="">
                        <Option v-for="item in paymentTypeList"
                                :key="item.value"
                                :value="item.value">
                            {{$t(item.label)}}
                        </Option>
                    </Select>-->
                </Form-item>
                <!--付款方姓名-->
                <Form-item :label="$t('colonSetting', { key: $t('payerName') })" prop="payName">
                    <Input v-model.trim="transferParams.payName"
                           :placeholder="$t('inputField', { field : $t('payerName') })" />
                </Form-item>
                <!--付款账号/卡号-->
                <Form-item :label="$t('colonSetting', { key: $t('payAccountAndCardNo') })" prop="payAccount">
                    <Input v-model.trim="transferParams.payAccount"
                           :placeholder="$t('inputField', { field : $t('payAccountAndCardNo') })" />
                </Form-item>
                <!--备注-->
                <Form-item :label="$t('colonSetting', { key: $t('remark') })" prop="remark">
                    <Input v-model.trim="transferParams.remark"
                           type="textarea"
                           :rows="4"
                           :placeholder="$t('inputField', {field: $t('transactionSNOrRemark')})"/>
                </Form-item>

            </Form>
            <!--自定义页脚-->
            <div slot="footer">
                <template>
                    <i-button type="primary" @click="handleSubmit()">{{$t('submit')}}</i-button>
                    <i-button type="ghost" @click="hide()">{{$t('cancel')}}</i-button>
                </template>
            </div>
        </Modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import { proxyBankList } from '@/assets/js/constVariable.js';
    import { transAccountType } from '../cashRecordFun';
    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                visible : false, //显示模态框变量
                // 提交、修改转账流水的传参
                transferParams : {
                    marketOrderId : '', //营销订单id
                    salaryPayment : '', //付款方式
                    payAccount : '', //付款账号/卡号
                    payName : '', //付款方姓名
                    remark : ''
                },
                // 被审核的提现信息数据
                withdrawInfo : {},
                // 付款方式列表
                paymentTypeList : [],

                // 校验规则
                ruleValidate : {
                    payName : {
                        required : true,
                        message : this.$t('inputField', { field : this.$t('payerName') }),
                        trigger : 'blur'
                    },
                    payAccount : {
                        required : true,
                        message : this.$t('inputField', { field : this.$t('payAccountAndCardNo') }),
                        trigger : 'blur'
                    },
                    remark : [
                        {
                            required : true,
                            message : this.$t('inputField', { field : this.$t('transactionSNOrRemark') }),
                            trigger : 'blur'
                        },
                        {
                            max : 100,
                            message : this.$t('errorMaxLength', { field : this.$t('remark'), length : 100 }), // 备注不能超过100字符
                            trigger : 'blur'
                        },
                    ]
                },
                //最近n次使用的银行卡付款账号类型
                recentPayTypes : [],
            };
        },
        computed : {
            //是否微信、支付宝付款方式
            isProxyBank () {
                return this.withdrawInfo.accountType === 'wxPay' || this.withdrawInfo.accountType === 'aliPay';
            },
            ...mapGetters([
                'lang'
            ])
        },
        watch : {
            /*'withdrawInfo.accountType' : {
                handler (val, oldVal) {
                    if (this.isProxyBank) {
                        this.paymentTypeList = proxyBankList.filter(item => {
                            return item.value == this.withdrawInfo.accountType;
                        });
                    } else {
                        this.paymentTypeList = [...proxyBankList, ...this.recentPayTypes];
                    }
                },
                immediate : true
            }*/
        },
        methods : {
            /**
             * 显示模态框   1. 获取最近n次使用的银行卡付款账号类型，并处理   2. 展示销售用户信息
             * @param data
             */
            show (data) {
                this.getRecentlyPayTypes(3);
                this.withdrawInfo = data;
                this.transferParams.payAccount = data.accountInfo ? data.accountInfo : ''; //付款账号/卡号
                this.transferParams.payName = data.payName ? data.payName : ''; //付款方姓名
                this.transferParams.remark = data.transferRemark ? data.transferRemark : ''; //备注
                this.transferParams.marketOrderId = data.id;
                this.transferParams.salaryPayment = this.isProxyBank ? this.$t('marketing.cashRecord.' + data.accountType) : data.accountType;

                //测试代码
                /*this.withdrawInfo.accountType = 'aliPay';
                this.transferParams.salaryPayment = this.$t('payType.alipay');*/
                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.$refs.formValidate.resetFields();
                this.visible = false;
                this.recentPayTypes = [];
                this.paymentTypeList = [];
            },
            /**
             * 点击提交转账流水
             **/
            handleSubmit () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        if (this.isProxyBank) {
                            this.transferParams.salaryPayment = this.withdrawInfo.accountType;
                        }
                        ajax.post('marketing-fillInTransferInfo',{
                            ...this.transferParams
                        }).then(res => {
                            if (res.success) {
                                this.$Message.success(this.$t('successTip', { tip : this.$t('submit') }));
                                this.hide();

                                this.$emit('on-submit-success');
                            } else {
                                this.$Message.error(this.$t('failureTip', { tip : this.$t('submit') }));
                            }
                        });
                    }
                });
            },
            /**
             * 收付款方式的code转换
             */
            transAccountType : transAccountType,

            /**
             * 获取最近n次使用的银行卡付款账号类型
             * @param n
             */
            getRecentlyPayTypes (n) {
                ajax.post('marketing-getRecentlyPayTypes',{
                    limit : n
                }).then(res => {
                    if (res.success) {
                        this.recentPayTypes = res.data || [];
                        // 付款方式列表的组装 --- 付款方式为微信支付、支付宝，则只能选各自的支付方式；若付款方式是银行，则微信支付、支付宝、银行都可选
                        if (this.isProxyBank) {
                            this.paymentTypeList = proxyBankList.filter(item => {
                                return item.value === this.withdrawInfo.accountType;
                            });
                        } else {
                            this.paymentTypeList = this.recentPayTypes;
                        }
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    /deep/ .ivu-btn {
        width: 88px;
    }
    /deep/ .ivu-form-item {
        margin-bottom: 15px;
    }
</style>
