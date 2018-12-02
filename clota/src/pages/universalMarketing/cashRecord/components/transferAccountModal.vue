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
                    <div>{{withdrawInfo.accountType | contentFilter}}</div>
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
                    <Select v-model="transferParams.salaryPayment" class="field-item">
                        <Option v-for="item in paymentTypeList"
                                :key="item.value"
                                :value="item.value">
                            {{$t(item.label)}}
                        </Option>
                    </Select>
                </Form-item>


                <!--备注-->
                <Form-item :label="$t('colonSetting', { key: $t('remark') })" prop="remark">
                    <Input v-model="transferParams.remark"
                           type="textarea"
                           :rows="4"
                           :placeholder="$t('inputField', {field: $t('备注信息或驳回理由')})"/>
                </Form-item>

            </Form>
            <!--自定义页脚-->
            <div slot="footer">
                <template>
                    <i-button type="primary" @click="handlePass()">{{$t('submit')}}</i-button>
                    <i-button type="error" @click="hide()">{{$t('cancel')}}</i-button>
                </template>
            </div>
        </Modal>
        <!--驳回提示框-->
        <reject-modal ref="rejectModal" @on-allow="rejectWithdraw"></reject-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import rejectModal from './rejectModal.vue';
    import ajax from '@/api/index';

    export default {
        components : { rejectModal },
        props : {},
        data () {
            let self = this;
            const validateMethod = {
                remark (rule,value,callback) {
                    if (!value) {
                        callback(new Error( self.$t('errorEmpty', { msg : self.$t('remark') }) )); // 备注不能为空
                    } else {
                        callback();
                    }
                }
            };

            return {
                visible : false, //显示模态框变量
                // 提交、修改转账流水的传参
                transferParams : {
                    marketOrderId : '',
                    salaryPayment : '',
                    paySerialNum : '',
                    payName : '',
                    remark : ''
                },
                // 被审核的提现信息数据
                withdrawInfo : {},
                // 付款方式列表
                paymentTypeList : [],

                // 校验规则
                ruleValidate : {
                    remark : [
                        {
                            max : 100,
                            message : this.$t('errorMaxLength', { field : this.$t('remark'), length : 100 }), // 备注不能超过100字符
                        },
                        { validator : validateMethod.remark, trigger : 'change' }
                    ]
                },
            }
        },
        computed : {},
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.withdrawInfo = data;
                this.transferParams.ids = data.id;
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
             * 点击通过
             **/
            handlePass () {
                this.transferParams.auditStatus = 'pass';
                this.handleAudit();
            },
            /**
             * 点击驳回
             **/
            handleReject () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.hide();
                        setTimeout(() => {
                            this.$refs.rejectModal.show();
                        } ,500);
                    }
                });
            },
            /**
             * 审核提现 调接口
             **/
            handleAudit () {
                ajax.post('marketing-auditWithdrawRecord',{
                    ...this.transferParams
                }).then(res => {
                    if (res.success) {
                        if (this.transferParams.auditStatus == 'pass') {
                            this.$Message.success(this.$t('提现审核通过'));
                            this.hide();
                        } else {
                            this.$Message.success(this.$t('提现审核驳回'));
                            this.$refs.rejectModal.hide();
                        }

                        this.$emit('on-audited');
                    } else {
                        this.$Message.error(this.$t('提现审核失败'));
                    }
                });
            },
            /**
             * 是否允许驳回后，再次申请提现。
             * auditStatus --- reject 表示允许驳回后再次申请提现；reject_no_req 表示不允许
             * @param auditStatus
             */
            rejectWithdraw (auditStatus) {
                this.transferParams.auditStatus = auditStatus;
                this.handleAudit();
            }
        }
    };
</script>

<style lang="scss" scoped>
    /deep/ .ivu-btn {
        width: 88px;
    }
</style>
