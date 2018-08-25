<template>
    <!--新增储值-->
    <Modal
        v-model="visible"
        title="新增储值"
        class-name="add-fund-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="form-item-wrap">
                <label>用户姓名：</label>
                <span>{{detail.custName || '-'}}</span>
            </div>
            <div class="form-item-wrap">
                <label>储值账户名称：</label>
                <span>{{accountInfo.accountName || '-'}}</span>
            </div>
            <div class="form-item-wrap">
                <label>本金账户余额：</label>
                <span>
                    <span class="yellow-color">
                        {{accountInfo.corpusBalance ? accountInfo.corpusBalance.toCurrency() : '0'}}
                    </span>{{accountInfo.unit || ''}}</span>
            </div>
            <div class="form-item-wrap">
                <label>赠送账户余额：</label>
                <span>
                    <span class="yellow-color">
                        {{accountInfo.donateBalance ? accountInfo.donateBalance.toCurrency() : '0'}}
                    </span>{{accountInfo.unit || ''}}</span>
            </div>

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                <div class="ivu-form-item-wrap double-input">
                    <Form-item label="增加储值金额：" prop="actAmount">
                        <Input v-model.trim="formData.actAmount" placeholder="请输入" :maxlength="10"/>
                        <span class="font">实际增加</span>
                        <Input v-model.trim="formData.totalAmount" placeholder="请输入" :maxlength="10"/>
                        <span>元</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="收款方式：" prop="paymentTypeId">
                        <Select v-model="formData.paymentTypeId" placeholder="请选择">
                            <Option v-for="(item,index) in paymentList" :key="index" :value="item.id">
                                {{item.payment}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="备注：" prop="remark">
                        <Input v-model.trim="formData.remark" type="textarea" placeholder="请输入" :maxlength="100"/>
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
        props: ['payment-list','detail'],
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
                    callback();
                }).catch(err => {
                    callback(err);
                });
            };

            //校验实际增加金额
            const validateToTotalAmount = (rule,value,callback) => {
                if(this.formData.totalAmount === ''){
                    callback(new Error('输入实际增加金额'));
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
                    actAmount: '',//储值金额
                    totalAmount: '',//实际增加金额
                    paymentTypeId: '',//支付方式
                    remark: '',
                },
                //表单校验
                ruleValidate: {
                    actAmount: [
                        { required: true, message: '储值金额不能为空', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                        { validator: validateToTotalAmount, trigger: 'blur' },
                    ],
                    paymentTypeId: [
                        { required: true, message: '收款方式不能为空', trigger: 'change' },
                    ],
                    remark: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
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

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        let params = {
                            memberId: this.detail.id,
                            cardId: this.detail.cardId,
                            accounId: this.accountInfo.id,
                            actAmount: this.formData.actAmount,
                            totalAmount: this.formData.totalAmount,
                            paymentTypeId: this.formData.paymentTypeId,
                            remark: this.formData.remark,
                        };
                        console.log(params)
                        this.addAmount(params);
                    }
                })
            },

            //新增储值
            addAmount ( params ) {
                ajax.post('addAmount', params).then(res => {
                    if( res.success ) {
                        this.$Message.success('新增储值成功！');
                        this.$emit('add-success');
                        this.hide();
                    } else {
                        this.$Message.warning(res.message|| 'addAmount 失败！');
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.accountInfo = {};
                this.formData = {
                    actAmount: '',
                    totalAmount: '',
                    paymentTypeId: '',
                    remark: '',
                };
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-fund-modal{

        .modal-body{
            padding: 20px 30px;
        }

        .form-item-wrap{
            width: 100%;
            float: left;
            margin-right: 10px;
            margin-bottom: 5px;
            height: 30px;
            line-height: 30px;
            font-size: $font_size_14px;
            color: $color-666;
            >label{
                width: 130px;
                display: inline-block;
                text-align: right;
                padding-right: 10px;
                color: $color-333;
            }
        }

        .ivu-form-item-wrap{

            /deep/ .ivu-select{
                width: 315px;
            }

            /deep/ .ivu-input-wrapper{
                width: 315px;
            }

            &.double-input{
                /deep/ .ivu-input-wrapper{
                    width: 120px;
                    margin-right: 5px;
                }
                .font{
                    margin-right: 5px;
                }
            }
        }

        .yellow-color{
            color: $color_yellow;
            font-size: $font_size_18px;
            margin-right: 5px;
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>

