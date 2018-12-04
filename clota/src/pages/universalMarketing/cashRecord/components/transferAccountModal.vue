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
            :width="560"
            :title="$t('填写转账流水号')"
            @on-cancel="hide">

            <!--内容区域-->
            <Form ref="formValidate"
                  :model="transferParams"
                  :rules="ruleValidate"
                  :label-width="140"
                  style="padding-right: 30px;"
                  @submit.native.prevent>
                <!--订单号-->
                <Form-item :label="$t('colonSetting', { key: $t('orderId') })">
                    <div>{{withdrawInfo.orderId | contentFilter}}</div>
                </Form-item>
                <!--销售用户姓名-->
                <Form-item :label="$t('colonSetting', { key: $t('销售用户姓名') })">
                    <div>{{withdrawInfo.userName | contentFilter}}</div>
                </Form-item>
                <!--收款账户类型-->
                <Form-item :label="$t('colonSetting', { key: $t('collectionAccountType') })">
                    <div>{{ $t(transAccountType(withdrawInfo.accountType)) | contentFilter }}</div>
                </Form-item>
                <!--收款账号/卡号-->
                <Form-item :label="$t('colonSetting', { key: $t('收款账号/卡号') })">
                    <div>{{withdrawInfo.accountInfo | contentFilter}}</div>
                </Form-item>
                <!--订单金额-->
                <Form-item :label="$t('colonSetting', { key: $t('orderAmount') })">
                    <div>{{withdrawInfo.checkAmount | contentFilter}}</div>
                </Form-item>
                <!--佣金-->
                <Form-item :label="$t('colonSetting', { key: $t('佣金') })">
                    <div>{{withdrawInfo.orderSalary | contentFilter}}</div>
                </Form-item>
                <!--付款方式-->
                <Form-item :label="$t('colonSetting', { key: $t('modeOfPayment') })">
                    <!--TODO 选择其他银行的交互，该如何做？？？-->
                    <!--<Input
                           v-model.trim="transferParams.payAccount"
                           :placeholder="$t('inputField', { field : $t('银行卡号') })" />-->
                    <AutoComplete
                        v-model.trim="transferParams.salaryPayment"
                        :disabled="isProxyBank"
                        :placeholder="$t('inputField', { field : $t('银行卡号') })">
                        <Option v-for="item in paymentTypeList"
                                :value="$t(item.salaryPayment)"
                                :key="item.id">{{ $t(item.salaryPayment) }}</Option>
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
                <Form-item :label="$t('colonSetting', { key: $t('付款方姓名') })" prop="payName">
                    <Input v-model.trim="transferParams.payName"
                           :placeholder="$t('inputField', { field : $t('付款方姓名') })" />
                </Form-item>
                <!--付款账号/卡号-->
                <Form-item :label="$t('colonSetting', { key: $t('付款账号/卡号') })" prop="payAccount">
                    <Input v-model.trim="transferParams.payAccount"
                           :placeholder="$t('inputField', { field : $t('付款账号/卡号') })" />
                </Form-item>
                <!--备注-->
                <Form-item :label="$t('colonSetting', { key: $t('remark') })" prop="remark">
                    <Input v-model.trim="transferParams.remark"
                           type="textarea"
                           :rows="4"
                           :placeholder="$t('inputField', {field: $t('交易流水号或备注说明')})"/>
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
    import { bankList, proxyBankList } from '@/assets/js/constVariable.js';
    import { transAccountType } from '../cashRecordFun';

    export default {
        components : {},
        props : {},
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
                        message : this.$t('inputField', { field : this.$t('付款方姓名') }),
                        trigger : 'blur'
                    },
                    payAccount : {
                        required : true,
                        message : this.$t('inputField', { field : this.$t('付款账号/卡号') }),
                        trigger : 'blur'
                    },
                    remark : [
                        {
                            required : true,
                            message : this.$t('inputField', { field : this.$t('交易流水号或备注说明') }),
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
            }
        },
        computed : {
            // 付款方式列表
            /*paymentTypeList () {
                let typeList = [];
                switch (this.withdrawInfo.accountType) {
                    case 'wx' :
                    case 'zfb' :
                        typeList = proxyBankList.filter(item => {
                            return item.value == this.withdrawInfo.accountType;
                        });
                        break;
                    default :
                        typeList = bankList;
                        break;
                }

                return typeList;
            }*/
            //是否微信、支付宝付款方式
            isProxyBank () {
                return this.withdrawInfo.accountType == 'wx' || this.withdrawInfo.accountType == 'zfb';
            }
        },
        created () {
            this.getRecentlyPayTypes(3);
        },
        mounted () {
        },
        watch : {
            'withdrawInfo.accountType' : {
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
            }
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.withdrawInfo = data;
                this.transferParams.marketOrderId = data.id;
                this.transferParams.salaryPayment = this.isProxyBank ? this.$t(data.accountType) : data.accountType;

                //测试代码
                /*this.withdrawInfo.accountType = 'zfb';
                this.transferParams.salaryPayment = 'zfb';*/
                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.$refs.formValidate.resetFields();
                this.visible = false;
            },
            /**
             * 点击提交转账流水
             **/
            handleSubmit () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        ajax.post('marketing-fillInTransferInfo',{
                            ...this.transferParams
                        }).then(res => {
                            if (res.success) {
                                this.$Message.success(this.$t('提交成功！'));
                                this.hide();

                                this.$emit('on-submit-success');
                            } else {
                                this.$Message.error(this.$t('提交失败！'));
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
</style>
