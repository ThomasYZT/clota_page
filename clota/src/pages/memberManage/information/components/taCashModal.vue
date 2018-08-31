<template>
    <!--兑现-->
    <Modal
        v-model="visible"
        :title="$t('cash')"
        class-name="to-cash-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="120">
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('cashAmount') + '：'" prop="fromAmount">
                        <Input v-model.trim="formData.fromAmount" :maxlength="30" :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('amountAfterConversion') + '：'" prop="toAmount">
                        <Input v-model.trim="formData.toAmount" disabled :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <FormItem label=" " prop="accountBizType">
                        <RadioGroup v-model="formData.accountBizType">
                            <Radio label="to_cash">{{$t("convertToCash")}}</Radio>
                            <Radio label="transfer_in">{{$t("convertToAccount")}}</Radio>
                        </RadioGroup>
                    </FormItem>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.accountBizType === 'transfer_in'">
                    <Form-item :label="$t('transferToAccount') + '：'" prop="toAccountId">
                        <Select v-model="formData.toAccountId"
                                :placeholder="$t('selectField', {msg: ''})"
                                @on-change="changeToAccountId">
                            <Option v-for="(item,index) in store"
                                    :key="index"
                                    :value="item.id">
                                {{item.accountName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >{{$t('save')}}</Button>
            <Button type="ghost" @click="hide" >{{$t('cancel')}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';

    export default {
        props: ['store','detail'],
        components: {},
        data () {

            const validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
            };

            //校验正整数
            const validateNumber = (rule,value,callback) => {
                common.validateMoney(value).then(() => {
                    this.toAmountFunc();
                    callback();
                }).catch(err => {
                    if(err === 'errorMaxLength'){
                        callback(this.$t('errorMaxLength',{field : this.$t('cashAmount'),length : 10}));
                    }else{
                        callback(this.$t(err,{field : this.$t('cashAmount')}));
                    }
                });
            };


            //校验兑换后数量不可大于本金余额
            const validateMaxNum = (rule,value,callback) => {
                if(value && Number(value) > this.accountInfo.corpusBalance ){
                    callback(new Error( this.$t('errorGreaterThan', {small: this.$t('amountAfterConversion'), big: this.$t('corpusAmount')}) ));       // 兑换后数量不可大于本金余额
                } else {
                    callback();
                }
            };

            //校验转入账户
            const validateToAccount = (rule,value,callback) => {
                if(this.formData.accountBizType === 'transfer_in' && value == ''){
                    callback(new Error( this.$t('selectField', {msg: this.$t('transferToAccount')}) ));     // 请选择转入账户
                } else {
                    callback();
                }
            };

            //校验转入账户不可选自己
            const validateCheckSelf= (rule,value,callback) => {
                if( value === this.accountInfo.accountDefineId ){
                    callback(new Error( this.$t('selectField', {msg: this.$t('otherAccount')}) ));    // 请选择其它账户
                } else {
                    callback();
                }
            };

            return {
                visible: false,
                //会员信息的账户数据
                accountInfo: {},
                //表单数据
                formData: {
                    accountBizType: 'to_cash',
                    fromAccountId: '',//调出账户
                    fromAmount: '',//兑现数量
                    toAccountId: '',//转入账户
                    toAmount: '',//兑换后数量
                    toAccountTypeId: '',
                },
                //转入账户
                toAccountInfo: {},
                //表单校验
                ruleValidate: {
                    fromAmount: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('cashAmount')}), trigger: 'blur'},    // 兑现数量不能为空
                        // { max: 30, message: this.$t('errorMaxLength', {field: this.$t('cashAmount'), length: 30}), trigger: 'blur' },      // 兑现数量不能超过30字符
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                        { validator: validateMaxNum, trigger: 'blur' },
                    ],
                    accountBizType: [
                        {required: true},
                    ],
                    toAccountId: [
                        { required :true,validator: validateToAccount, trigger: 'change' },
                        { validator: validateCheckSelf, trigger: 'change' },
                    ],
                },
            }
        },
        methods: {

            show ( data ) {
                if( data ){
                    this.accountInfo = data;
                }
                this.visible = true;
            },

            //计算兑换后数量
            toAmountFunc () {
                this.formData.toAmount = Number(this.formData.fromAmount)*this.accountInfo.rate;
            },

            //转入账户改变
            changeToAccountId ( val ) {
                this.toAccountInfo = this.store.find( item => item.id === val );
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        let params = {
                            memberId: this.detail.id,
                            cardId: this.detail.cardId,
                            accountId: this.accountInfo.id,
                            accountTypeId: this.accountInfo.accountDefineId,
                            amount: '-'+this.formData.fromAmount,
                            accountBizType: this.formData.accountBizType,
                            toAmount: this.formData.toAmount,
                            toAccountTypeId: '',
                        };
                        if(this.formData.accountBizType === 'transfer_in'){
                            params.toAccountTypeId = this.toAccountInfo.id;
                        }
                        console.log(params)
                        this.transferAccountBalance(params);
                    }
                })
            },

            //兑现
            transferAccountBalance ( params ) {
                ajax.post('transferAccountBalance', params).then(res => {
                    if( res.success ) {
                        this.$Message.success(this.$t('successTip', {tip: this.$t('cash')}) + '！');     // 兑现成功
                        this.$emit('add-success');
                        this.hide();
                    } else {
                        this.$Message.warning(res.message|| 'transferAccountBalance '+ this.$t('failure') +'！');
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.accountInfo = {};
                this.formData = {
                    accountBizType: 'to_cash',
                    fromAccountId: '',
                    fromAmount: '',
                    toAccountId: '',
                    toAmount: '',
                };
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .to-cash-modal{

        .modal-body{
            padding: 50px 70px;
        }

        .ivu-form-item-wrap{

            /deep/ .ivu-select{
                width: 260px;
            }

            /deep/ .ivu-input-wrapper{
                width: 260px;
            }

        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>
