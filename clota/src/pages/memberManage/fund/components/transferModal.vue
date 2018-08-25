<template>
    <!--转账-->
    <Modal
        v-model="visible"
        title="转账"
        class-name="transfer-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="form-item-wrap"><label>转出账户：</label><span>{{orgInfo.orgName}}</span></div>
            <div class="form-item-wrap"><label>账户可用余额：</label><span class="num">{{orgInfo.balance}}</span> 元</div>

            <Form ref="formValidate"
                  :model="data"
                  :rules="ruleValidate"
                  :label-width="130">
                <div class="ivu-form-item-wrap">
                    <Form-item label="转入账户选择" prop="toOrgId">
                        <Select v-model="data.toOrgId"
                                placeholder="请选择"
                                style="width: 240px;">
                            <Option value="">账户</Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="转出金额" prop="amount">
                        <Input v-model="data.amount"
                               placeholder="请输入"
                               style="width: 240px"
                               @input.native="amountChange($event)"/>
                        <span style="padding-left: 10px;">元
                        </span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="手续费" prop="commission">
                        <Input disabled
                               v-model="data.commission"
                               placeholder="请输入"
                               style="width: 240px" />
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="备注：">
                        <Input v-model="data.remark"
                               type="textarea"
                               placeholder="请输入"
                               :maxlength="100"
                               style="width: 240px" />
                    </Form-item>
                </div>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary"
                    :loading="btnLoading"
                    @click="formValidateFunc" >保存</Button>
            <Button type="ghost" @click="hide" >取消</Button>
        </div>

    </Modal>
</template>

<script>
    import common from '@/assets/js/common.js';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //账户信息
            'org-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            //校验转出余额
            const validateeAmount = (rule,value,callback) => {
                common.validateMoney(value).then(() => {
                    callback();
                }).catch(err => {
                    callback(this.$t(err,{field : rule.field}));
                });
            };
            //校验手续费是否正确
            const validateCommission = (rule,value,callback) => {
                if(!common.isNotEmpty(this.commissionOfTransfermation)){
                    callback('请先设置手续费率');
                }else{
                    callback();
                }
            };
            return {
                //手续费
                commissionOfTransfermation : '',
                //模态框是否显示
                visible: false,
                //表单数据
                data: {
                    //转入金额
                    amount: '',
                    //备注
                    remark: '',
                    //转入的机构id
                    toOrgId : '',
                    //手续费
                    commission : ''
                },
                //校验方法
                ruleValidate: {
                    amount : [
                        {required : true,validator : validateeAmount,trigger : 'blur'}
                    ],
                    toOrgId : [
                        {require : true,message : '请选择转入账户',trigger : 'change'}
                    ],
                    commission : [
                        {validator : validateCommission,trigger : 'change'}
                    ]
                },
                //btn是否在保存中
                btnLoading : false
            }
        },
        methods: {

            /**
             * 模态框显示
             */
            show () {
                this.visible = true;
            },

            /**
             * 表单校验
             */
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        this.btnLoading = true;
                        this.transfer();
                    }
                })
            },

            /**
             * 关闭模态框
             */
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.resetFormData();
            },
            /**
             * 获取基础设置
             */
            findBasicSet () {
                ajax.post('findBasicSet').then(res => {
                    if(res.success){
                        this.commissionOfTransfermation = res.data.commissionOfTransfermation;
                    }else{
                        this.commissionOfTransfermation = '';
                    }
                }).catch(err => {
                    this.commissionOfTransfermation = '';
                });
            },
            /**
             * 转出金额计算手续费
             * @param e
             */
            amountChange (e) {
                let val = e.target.value;
                if(common.isNotEmpty(this.commissionOfTransfermation)){
                    common.validateMoney(this.data.amount).then(() => {
                        this.data.commission = Number(val * this.commissionOfTransfermation / 100).toFixed(2);
                    }).catch(err => {
                        this.data.commission = '-';
                    });
                }else{
                    this.data.commission = '-';
                }
            },
            /**
             * 确认转账
             */
            transfer () {
                ajax.post('transfer',{
                    toOrgId : this.data.toOrgId,
                    amount : this.data.amount,
                    fee : this.data.commission,
                    remark : this.data.remark
                }).then(res => {
                    if(res.success){
                        this.$Message.success('转账成功');
                        this.$emit('fresh-data');
                    }else{
                        this.$Message.error('转账失败');
                    }
                }).finally(() => {
                    this.btnLoading = false;
                    this.hide();
                });
            },
            /**
             * 重置表单数据
             */
            resetFormData () {
                this.data.remark = '';
                this.data.amount = '';
            }

        },
        created () {
            this.findBasicSet();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .transfer-modal{
        .form-item-wrap{
            width: 100%;
            float: left;
            margin-right: 10px;
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
            .num{
                font-size: $font_size_18px;
                color: $color_yellow;
            }
        }
    }
</style>

