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
            <Form ref="formValidate"
                  :model="data"
                  :rules="ruleValidate"
                  :label-width="190">

                <div class="ivu-form-item-wrap">
                      <Form-item label="转出账户" class="no-marg-bottom">
                        <span style="color:#666666;">{{orgInfo.orgName}}</span>
                    </Form-item>
                </div>
                  <div class="ivu-form-item-wrap">
                      <Form-item label="账户可用余额"
                                class="no-marg-bottom"
                                style="margin-bottom:5px!important;">
                        <span class="num">{{orgInfo.balance | moneyFilter}}</span> 元
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="转入账户选择" prop="toOrgId">
                        <Select v-model="data.toOrgId"
                                placeholder="请选择"
                                style="width: 240px;">
                            <Option :value="item.id"
                                    v-for="(item,i) in inOrgList"
                                    :key="i">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="转出金额" prop="amount">
                        <Input v-model="data.amount"
                               placeholder="请输入"
                               style="width: 240px"/>
                        <span style="padding-left: 10px;">元
                        </span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="手续费" prop="commission">
                        <Input v-model="data.commission"
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
                    class="ivu-btn-90px"
                    :loading="btnLoading"
                    @click="formValidateFunc" >保存</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="hide" >取消</Button>
        </div>

    </Modal>
</template>

<script>
    import common from '@/assets/js/common.js';
    import ajax from '@/api/index.js';
    import {validator} from 'klwk-ui';
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
                    if(value > this.orgInfo.balance){
                        callback('转出金额不可大于可用余额');
                    }else{
                        if(validator.isNumber(this.data.commission)){
                            if(value + this.data.commission > this.orgInfo.balance){
                                callback('转出金额加手续费不可大于可用余额');
                            }else{
                                callback();
                            }
                        }else{
                            callback();
                        }
                    }
                }).catch(err => {
                    callback(this.$t(err,{field : rule.field}));
                });
            };
            //校验手续费是否正确
            const validateCommission = (rule,value,callback) => {
                common.validateMoney(value).then(() => {
                    if(value > this.orgInfo.balance){
                        callback('手续费不可大于可用余额');
                    }else{
                        if(validator.isNumber(this.data.amount)){
                            if(value + this.data.amount > this.orgInfo.balance){
                                callback('转出金额加手续费不可大于可用余额');
                            }else{
                                callback();
                            }
                        }else{
                            callback();
                        }
                    }
                }).catch(err => {
                    callback(this.$t(err,{field : rule.field}));
                });
            };
            return {
                //模态框是否显示
                visible: false,
                //表单数据
                data: {
                    //转出金额
                    amount: '',
                    //备注
                    remark: '',
                    //转入的机构id
                    toOrgId : '',
                    //手续费
                    commission : ''
                },
                //转入账户列表
                inOrgList : [],
                //校验方法
                ruleValidate: {
                    amount : [
                        {required : true,validator : validateeAmount,trigger : 'blur'}
                    ],
                    toOrgId : [
                        {required : true,message : '请选择转入账户',trigger : 'change'}
                    ],
                    commission : [
                        {required : true,validator : validateCommission,trigger : 'blur'}
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
            },
            /**
             * 获取转入账户信息
             */
            getUpperlevelOrgList () {
                ajax.post('getUpperlevelOrgList').then(res => {
                   if(res.success){
                       this.inOrgList = res.data ? res.data : [];
                   }else{
                       this.inOrgList = [];
                   }
                }).catch(err => {
                    this.inOrgList = [];
                });
            }

        },
        created () {
            this.getUpperlevelOrgList();
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/scss/base';
    .transfer-modal{

        .num{
            font-size: $font_size_18px;
            color: $color_yellow;
        }

        .no-marg-bottom{
            margin-bottom : 0!important;
        }
    }
</style>

