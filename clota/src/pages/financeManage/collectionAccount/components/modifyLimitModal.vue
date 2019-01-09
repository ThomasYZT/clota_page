<template>
    <!--重置密码-->
    <Modal
        v-model="visible"
        :title="$t('ModifyLine')"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                <!--合作伙伴-->
                <Form-item :label="$t('partner') + ':'" prop="">
                    <span>{{formData.orgName}}</span>
                </Form-item>
                <!--信用额度-->
                <Form-item :label="$t('creditBalance')" prop="creditBalance">
                    <Input v-model.trim="formData.creditBalance" :placeholder="$t('inputField', {field: $t('creditBalance')})" />
                    <span style="margin-left: 10px;">{{$t('yuan')}}</span>
                </Form-item>
                <!--预警额度-->
                <Form-item :label="$t('warningLines')" prop="alarmValue">
                    <Input v-model.trim="formData.alarmValue" :placeholder="$t('inputField', {field: $t('warningLines')})" />
                    <span style="margin-left: 10px;">{{$t('yuan')}}</span>
                </Form-item>

            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="confirm()" >{{$t('confirm')}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        data () {
            const validateMethod = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') )); // 输入内容不合规则
                    } else {
                        callback();
                    }
                },

                //校验是否为正整数
                validateMoney : (rule,value,callback) => {
                    if (value) {
                        common.validateMoney(value).then(() => {
                            callback();
                        }).catch(err => {
                            if (err === 'errorMaxLength') {
                                callback(this.$t('errorMaxLength',{ field : rule.field === 'alarmValue' ? this.$t('warningLines') : this.$t(rule.field),length : 10 }));
                            } else {
                                callback(this.$t(err,{ field : rule.field === 'alarmValue' ? this.$t('warningLines') : this.$t(rule.field) }));
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
                    id : '',
                    //信用额度
                    creditBalance : '',
                    //预警额度
                    alarmValue : ''
                },
                //校验规则
                ruleValidate : {
                    //信用额度
                    creditBalance : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('creditBalance') }), trigger : 'blur' },
                        { validator : validateMethod.validateMoney, trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ],
                    //预警额度
                    alarmValue : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('warningLines') }), trigger : 'blur' },
                        { validator : validateMethod.validateMoney, trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ]

                },
            };
        },
        methods : {

            show ( data ) {
                if ( data ) {
                    this.formData = defaultsDeep({}, data.item );
                    this.formData.creditBalance = this.formData.creditBalance.toString();
                    this.formData.alarmValue = this.formData.alarmValue.toString();

                }
                this.visible = true;
            },

            //关闭模态框
            hide () {
                this.visible = false;
                this.$refs.formValidate.resetFields();
            },


            // 确定
            confirm () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.confirmRecharge(this.formData);
                    }
                });
            },

            // 确认充值
            confirmRecharge ( params ) {
                ajax.post('updatePartnerAccount', {
                    id : params.id,
                    creditBalance : params.creditBalance,
                    alarmValue : params.alarmValue
                }).then(res => {
                    if ( res.success ) {
                        this.$Message.success(this.$t('successTip',{ 'tip' : this.$t('modify') }));
                        this.hide();
                        this.$emit('updata-list', { item : this.formData, index : this.index });
                    } else {
                        this.$Message.error(res.message || this.$t('failureTip',{ 'tip' : this.$t('modify') }));
                    }
                });
            },

        },
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
                margin-bottom: 20px;

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

    }
</style>
