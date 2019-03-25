<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               :title="$t('topUp')"
               class-name="vertical-center-modal recharge-modal"
               transfer
               width="560"
               @on-cancel="hide"
               :mask-closable="false">

            <div class="form-wrapper">
                <Form ref="modalForm"
                      :model="formData"
                      :rules="ruleValidate"
                      label-position="top">
                    <!-- 合作伙伴名称 -->
                    <FormItem :label="$t('colonSetting', { key : $t('合作伙伴名称') })">
                        <span>{{rowData.orgName | contentFilter}}</span>
                    </FormItem>
                    <!-- 充值金额 -->
                    <FormItem :label="$t('colonSetting', { key : $t('充值金额') })" prop="amount">
                        <Input v-model.trim="formData.amount"></Input>
                    </FormItem>
                    <!-- 备注 -->
                    <FormItem :label="$t('colonSetting', { key : $t('备注') })" prop="remark">
                        <Input v-model.trim="formData.remark"></Input>
                    </FormItem>
                </Form>
            </div>

            <div slot="footer">
                <Button class="ivu-btn-90px" type="primary" @click="topUp">{{$t('topUp')}}</Button>
                <Button class="ivu-btn-90px" type="default" @click="hide">{{$t('cancel')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    import common from '@/assets/js/common';
    export default {
        data () {
            //表单校验方法
            const validateMethods = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error(this.$t('errorIrregular'))); // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
                //校验钱
                validateMoney : (rule,value,callback) => {
                    if (value) {
                        common.validateMoney(value).then(() => {
                            callback();
                        }).catch(err => {
                            if (err === 'errorMaxLength') {
                                callback(this.$t('errorMaxLength',{ field : this.$t('money'),length : 10 }));
                            } else {
                                callback(this.$t(err,{ field : this.$t('money') }));
                            }
                        });
                    } else {
                        callback();
                    }
                }
            };
            return {
                //控制模态框是否显示
                visible : false,
                //首款账户信息
                rowData : {},
                //表单数据
                formData : {
                    //金额
                    amount : '',
                    //备注
                    remark : ''
                },
                //表单校验方法
                validateMethods : validateMethods,
            };
        },
        computed : {
            //表单校验规则
            ruleValidate () {
                return {
                    amount : [ //充值金额
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('money') }), trigger : 'blur' },
                        { validator : this.validateMethods.validateMoney, trigger : 'blur' }
                    ],
                    remark : [ //备注
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('remark') }), trigger : 'blur' },
                        { validator : this.validateMethods.emoji, trigger : 'blur' },
                        { max : 50, message : this.$t('errorMaxLength', { field : this.$t('remark'), length : 50 }), trigger : 'blur' },
                    ],
                };
            }
        },
        methods : {
            /**
             * 显示模态框
             * @param rowData 行数据
             */
            show (rowData) {
                this.rowData = rowData;
                this.visible = true;
            },
            //隐藏模态框
            hide () {
                this.$refs.modalForm.resetFields();
                this.rowData = {};
                this.visible = false;
            },
            /**
             * 表单校验
             */
            formValidate () {
                this.$refs.modalForm.validate((valid) => {
                    if (valid) {
                        this.topUp();
                    }
                });
            },
            //充值
            topUp () {
                ajax.post('manualRecharge', {
                    //账户id
                    orgAccountId : this.rowData.id,
                    //支付方式
                    paymentType : 'manual',
                    ...this.formData
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('topUp') }));
                        this.hide();
                        this.$emit('updateList');
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('topUp') }));
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    /deep/ .ivu-modal-body {
        position: relative;
        min-height: 168px;
    }

    .recharge-modal {
        .form-wrapper {
            width: 50%;
            margin: 0 auto;
        }
    }
</style>
