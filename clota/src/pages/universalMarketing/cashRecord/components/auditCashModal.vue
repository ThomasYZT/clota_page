<!--
内容：提现审核
作者：djc
日期：
-->

<template>
    <div>
        <Modal
            v-model="visible"
            class="addChannel"
            class-name="vertical-center-modal"
            :mask-closable="false"
            :width="lang === 'zh-CN' ? 560 : 700"
            :title="$t('auditCashInfo')"
            @on-cancel="hide">

            <!--内容区域-->
            <Form ref="formValidate"
                  :model="auditParams"
                  :rules="ruleValidate"
                  :label-width="lang === 'zh-CN' ? 140 : 290"
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
                <!--备注-->
                <Form-item :label="$t('colonSetting', { key: $t('remark') })" prop="remark">
                    <Input v-model="auditParams.remark"
                           type="textarea"
                           :rows="4"
                           :placeholder="$t('inputField', {field: $t('remarkOrRejectReason')})"/>
                </Form-item>

            </Form>
            <!--自定义页脚-->
            <div slot="footer">
                <i-button class="ivu-btn-90px"
                          type="primary"
                          @click="handlePass()">{{$t('passed')}}</i-button>
                <i-button class="ivu-btn-90px"
                          type="error"
                          @click="handleReject()">{{$t('reject')}}</i-button>
            </div>
        </Modal>
        <!--驳回提示框-->
        <reject-modal ref="rejectModal" @on-allow="rejectWithdraw"></reject-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import rejectModal from './rejectModal.vue';
    import ajax from '@/api/index';
    import { transAccountType } from '../cashRecordFun';
    import { mapGetters } from 'vuex';

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
                // 提现审核的传参
                auditParams : {
                    ids : '',
                    auditStatus : '', // pass 审核通过, reject 驳回, reject_no_req, 驳回不能申请
                    remark : ''
                },
                // 被审核的提现信息数据
                withdrawInfo : {},

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
            };
        },
        computed : {
            ...mapGetters([
                'lang'
            ])
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.$refs.formValidate.resetFields();
                this.withdrawInfo = data;
                this.auditParams.ids = data.id;
                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.visible = false;
            },
            /**
             * 点击通过
             **/
            handlePass () {
                this.auditParams.auditStatus = 'pass';
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
                    ...this.auditParams
                }).then(res => {
                    if (res.success) {
                        if (this.auditParams.auditStatus == 'pass') {
                            this.$Message.success(this.$t('pass', { field : this.$t('withdrawCashAudit') }));
                            this.hide();
                        } else {
                            this.$Message.success(this.$t('sthReject', { field : this.$t('withdrawCashAudit') }));
                            this.$refs.rejectModal.hide();
                        }
                        this.$emit('on-audited');
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('withdrawCashAudit') }));
                    }
                });
            },
            /**
             * 是否允许驳回后，再次申请提现。
             * auditStatus --- reject 表示允许驳回后再次申请提现；reject_no_req 表示不允许
             * @param auditStatus
             */
            rejectWithdraw (auditStatus) {
                this.auditParams.auditStatus = auditStatus;
                this.handleAudit();
            },
            /**
             * 收付款方式的code转换
             */
            transAccountType : transAccountType,
        }
    };
</script>

<style lang="scss" scoped>

    /deep/ .ivu-form-item {
        margin-bottom: 10px;
    }
</style>
