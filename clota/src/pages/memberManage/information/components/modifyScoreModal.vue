<template>
    <!--会员积分账户修改-->
    <Modal
        v-model="visible"
        :title="$t('integraModification')"
        class-name="modify-score-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide"><!--会员积分账户修改-->

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="160">

                <div class="form-item-wrap">
                    <label>{{$t("userName")}}：</label>
                    <span>{{detail.custName || '-'}}</span>
                </div>

                <div class="form-item-wrap">
                    <label>目前积分账户：</label>
                    <span class="yellow-color">{{account.accountBalance ? account.accountBalance.toCurrency() : '0'}}</span>
                    {{$t('integral')}}<!--积分-->
                </div>

                <div class="ivu-form-item-wrap double-input">
                    <Form-item label=" 账户余额调整：" prop="corpusAmount">
                        <RadioGroup v-model="formData.corpusOptSign">
                            <Radio label="add">
                                {{$t("increase")}}<!--增加-->
                                <template v-if="formData.corpusOptSign === 'sub'">
                                <Input placeholder=" " disabled/>
                            </template>
                                <template v-else>
                                    <Input v-model.trim="formData.corpusAmount" :placeholder="$t('inputField', {field: ''})"/>
                                </template>
                                {{accountInfo.unit || ''}}
                            </Radio>
                            <Radio label="sub">
                                {{$t("reduce")}}<!--减少-->
                                <template v-if="formData.corpusOptSign === 'add'">
                                <Input placeholder=" " disabled/>
                            </template>
                                <template v-else>
                                    <Input v-model.trim="formData.corpusAmount" :placeholder="$t('inputField', {field: ''})"/>
                                </template>
                                {{accountInfo.unit || ''}}
                            </Radio>
                        </RadioGroup>
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap">
                    <Form-item label="请选择修改原因：" prop="reasonId">
                        <Select v-model="formData.reasonId" placeholder="请选择">
                            <Option v-for="(item,index) in reason"
                                    :key="index"
                                    :value="item.id">
                                {{item.reason}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('remark') + '：'" prop="remark"><!--备注-->
                        <Input v-model.trim="formData.remark" type="textarea" :placeholder="$t('inputField', {field: ''})" />
                    </Form-item>
                </div>

            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >{{$t("save")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';

    export default {
        props: ['account','reason','detail'],
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


            //校验本金额不可大于总本金余额
            const validateMaxCorpus = (rule,value,callback) => {
                if(value && this.formData.corpusOptSign === 'sub' && Number(value) > this.accountInfo.accountBalance ){
                    callback(new Error('本金额不可大于总本金余额'));
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
                    accountId: '',
                    accountTypeId: '',//账户类型id
                    corpusOptSign: 'add',//本金操作类型 -add -sub
                    corpusAmount: '0',//本金金额
                    reasonId: '',//原因id
                    remark: '',
                },
                //表单校验
                ruleValidate: {
                    accountTypeId: [
                        { required: true, message: '修改的账户不能为空', trigger: 'change' },
                    ],
                    corpusAmount: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 10, message: '账户余额不能超过10字符', trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                        { validator: validateMaxCorpus, trigger: 'blur' },
                    ],
                    reasonId: [
                        { required: true, message: '修改原因不能为空', trigger: 'change' },
                    ],
                    remark: [
                        { required: true, message: '备注不能为空', trigger: 'blur' },
                        { max: 100, message: '备注不能超过100字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {

            show () {
                this.visible = true
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        let params = {
                            memberId: this.detail.id,
                            cardId: this.detail.cardId,
                            accountId: this.account.id,
                            accountTypeId: this.account.accountDefineId,
                            amount: this.formData.corpusOptSign==='sub' ? '-'+this.formData.corpusAmount : this.formData.corpusAmount,
                            donateAmount: '0',
                            reasonId: this.formData.reasonId,
                            remark: this.formData.remark,
                        };
                        console.log(params)
                        this.adjustScore(params);
                    }
                })
            },

            //调积分账户余额
            adjustScore ( params ) {
                ajax.post('adjustScore', params).then(res => {
                    if( res.success ) {
                        this.$Message.success('操作成功！');
                        this.$emit('add-success');
                        this.hide();
                    } else {
                        this.$Message.warning(res.message|| 'adjustAmount 失败！');
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.accountInfo = {};
                this.formData = {
                    accountId: '',
                    accountTypeId: '',
                    corpusOptSign: 'add',
                    corpusAmount: '0',
                    reasonId: '',
                    remark: '',
                };
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .modify-score-modal{

        .yellow-color{
            font-size: $font_size_18px;
            color: $color_yellow;
            margin-right: 5px;
        }

        .modal-body{
            padding: 0px 30px;
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
                width: 160px;
                display: inline-block;
                text-align: right;
                padding-right: 10px;
                color: $color-333;
            }
        }

        .ivu-form-item-wrap{

            /deep/ .ivu-select{
                width: 260px;
            }

            /deep/ .ivu-input-wrapper{
                width: 260px;
            }

            &.double-input{
                /deep/ .ivu-input-wrapper{
                    width: 170px;
                    margin-right: 10px;
                    margin-left: 6px;
                }
            }

            /deep/ .ivu-radio-wrapper{
                margin-top: 5px;
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }
    }
</style>


