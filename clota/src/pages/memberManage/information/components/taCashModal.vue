<template>
    <!--兑现-->
    <Modal
        v-model="visible"
        title="兑现"
        class-name="to-cash-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="110">
                <div class="ivu-form-item-wrap">
                    <Form-item label="兑现数量：" prop="fromAmount">
                        <Input v-model.trim="formData.fromAmount" :maxlength="30" placeholder="请输入"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="兑换后数量：" prop="toAmount">
                        <Input v-model.trim="formData.toAmount" disabled placeholder="请输入"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <FormItem label=" " prop="channel">
                        <RadioGroup v-model="formData.channel">
                            <Radio label="cash">转化为现金</Radio>
                            <Radio label="account">转化至账户</Radio>
                        </RadioGroup>
                    </FormItem>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.channel === 'account'">
                    <Form-item label="转入账户：" prop="toAccountId">
                        <Select v-model="formData.toAccountId" placeholder="请选择">
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
            <Button type="primary" @click="formValidateFunc" >保存</Button>
            <Button type="ghost" @click="hide" >取消</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';

    export default {
        props: ['store'],
        components: {},
        data () {

            const validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error('输入内容不合规则'));
                    } else {
                        callback();
                    }
                },
            };

            //校验正整数
            const validateNumber = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    this.toAmountFunc();
                    callback();
                }).catch(err => {
                    callback(err);
                });
            };


            //校验兑换后数量不可大于本金余额
            const validateMaxNum = (rule,value,callback) => {
                if(value && Number(value) > this.accountInfo.corpusBalance ){
                    callback(new Error('兑换后数量不可大于本金余额'));
                } else {
                    callback();
                }
            };

            //校验转入账户
            const validateToAccount = (rule,value,callback) => {
                if(this.formData.channel === 'account' && value == ''){
                    callback(new Error('请选择转入账户'));
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
                    channel: 'cash',
                    fromAccountId: '',//调出账户
                    fromAmount: '',//兑现数量
                    toAccountId: '',//转入账户
                    toAmount: '',//兑换后数量
                },
                //表单校验
                ruleValidate: {
                    fromAmount: [
                        { required: true, message: '兑现数量不能为空', trigger: 'blur'},
                        { max: 30, message: '兑现数量不能超过30字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                    ],
                    channel: [
                        {required: true},
                    ],
                    toAmount: [
                        { validator: validateMaxNum, trigger: 'blur' },
                    ],
                    toAccountId: [
                        { validator: validateToAccount, trigger: 'change' },
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

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        let params = {
                            fromAccountId: this.accountInfo.id,
                            fromAmount: this.formData.fromAmount,
                            toAccountId: this.formData.toAccountId,
                            toAmount: this.formData.toAmount,
                        };
                        console.log(params)
                        this.transferAccountBalance(params);
                    }
                })
            },

            //兑现
            transferAccountBalance ( params ) {
                ajax.post('transferAccountBalance', params).then(res => {
                    if( res.success ) {
                        this.$Message.success('兑现成功！');
                        this.$emit('add-success');
                        this.hide();
                    } else {
                        this.$Message.warning(res.message|| 'transferAccountBalance 失败！');
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.accountInfo = {};
                this.formData = {
                    channel: 'cash',
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
