<template>
    <!--会员储值账户余额修改-->
    <Modal
        v-model="visible"
        title="会员储值账户余额修改"
        class-name="modify-balance-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="160">

                <div class="form-item-wrap">
                    <label>用户姓名：</label>
                    <span>{{detail.custName || '-'}}</span>
                </div>

                <div class="ivu-form-item-wrap">
                    <Form-item label="选择要修改的账户：" prop="accountTypeId">
                        <Select v-model="formData.accountTypeId" placeholder="请选择" @on-change="changeAccount">
                            <Option v-for="(item,index) in store"
                                    :key="index"
                                    :value="item.id">
                                {{item.accountName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>

                <div class="form-item-wrap">
                    <label>本金账户余额：</label>
                    <span class="yellow-color">{{accountInfo.corpusBalance ? accountInfo.corpusBalance.toCurrency() : '0'}}</span>
                    {{accountInfo.unit || ''}}
                </div>
                <div class="form-item-wrap">
                    <label>赠送账户余额：</label>
                    <span class="yellow-color">{{accountInfo.donateBalance ? accountInfo.donateBalance.toCurrency() : '0'}}</span>
                    {{accountInfo.unit || ''}}
                </div>

                <div class="ivu-form-item-wrap double-input">
                    <Form-item label="本金账户余额调整：" prop="corpusAmount">
                        <RadioGroup v-model="formData.corpusOptSign">
                            <Radio label="add">
                                增加
                                <template v-if="formData.corpusOptSign === 'sub'">
                                    <Input placeholder=" " disabled/>
                                </template>
                                <template v-else>
                                    <Input v-model.trim="formData.corpusAmount" placeholder="请输入"/>
                                </template>
                                {{accountInfo.unit || ''}}
                            </Radio>
                            <Radio label="sub">
                                减少
                                <template v-if="formData.corpusOptSign === 'add'">
                                    <Input placeholder=" " disabled/>
                                </template>
                                <template v-else>
                                    <Input v-model.trim="formData.corpusAmount" placeholder="请输入"/>
                                </template>
                                {{accountInfo.unit || ''}}
                            </Radio>
                        </RadioGroup>
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap double-input">
                    <Form-item label="赠送账户余额调整：" prop="donateAmount">
                        <RadioGroup v-model="formData.donateOptSign">
                            <Radio label="add">
                                增加
                                <template v-if="formData.donateOptSign === 'sub'">
                                <Input placeholder=" " disabled/>
                            </template>
                            <template v-else>
                                <Input v-model.trim="formData.donateAmount" placeholder="请输入"/>
                            </template>
                                {{accountInfo.unit || ''}}
                            </Radio>
                            <Radio label="sub">
                                减少
                                <template v-if="formData.donateOptSign === 'add'">
                                <Input placeholder=" " disabled/>
                            </template>
                            <template v-else>
                                <Input v-model.trim="formData.donateAmount" placeholder="请输入"/>
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
                    <Form-item label="备注：" prop="remark">
                        <Input v-model.trim="formData.remark" type="textarea" placeholder="请输入" />
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
        props: ['store','reason','detail'],
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
                if(value && this.formData.corpusOptSign === 'sub' && Number(value) > this.accountInfo.corpusBalance ){
                    callback(new Error('本金余额不可大于总本金余额'));
                } else {
                    callback();
                }
            };

            //校验赠送金额不可大于总赠送金额
            const validateMaxDonate = (rule,value,callback) => {
                if(value && this.formData.donateOptSign === 'sub' && Number(value) > this.accountInfo.donateBalance ){
                    callback(new Error('赠送金额不可大于总赠送金额'));
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
                    donateOptSign: 'add',//赠送金额操作类型 -add -sub
                    donateAmount: '0',//赠送金额
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
                        { max: 10, message: '本金余额不能超过10字符', trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                        { validator: validateMaxCorpus, trigger: 'blur' },
                    ],
                    donateAmount: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 10, message: '赠送金额不能超过10字符', trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                        { validator: validateMaxDonate, trigger: 'blur' },
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

            //要修改的账户--监听改变
            changeAccount ( val ) {
                if(val){
                    this.accountInfo = this.store.find((item) => val === item.id);
                    console.log(this.accountInfo)
                }
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        let params = {
                            cardId: this.detail.cardId,
                            accountId: this.accountInfo.id,
                            accountTypeId: this.accountInfo.accountDefineId,
                            corpusOptSign: this.formData.corpusOptSign,
                            corpusAmount: this.formData.corpusAmount,
                            donateOptSign: this.formData.donateOptSign,
                            donateAmount: this.formData.donateAmount,
                            reasonId: this.formData.reasonId,
                            remark: this.formData.remark,
                        };
                        console.log(params)
                        this.adjustAmount(params);
                    }
                })
            },

            //调储值账户余额
            adjustAmount ( params ) {
                ajax.post('adjustAmount', params).then(res => {
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
                    donateOptSign: 'add',
                    donateAmount: '0',
                    reasonId: '',
                    remark: '',
                };
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .modify-balance-modal{

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


