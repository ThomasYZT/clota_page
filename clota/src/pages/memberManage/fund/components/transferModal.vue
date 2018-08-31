<template>
    <!--转账-->
    <Modal
        v-model="visible"
        :title="$t('transfer')"
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
                      <Form-item :label="$t('transferAccount')" class="no-marg-bottom"><!--转出账户-->
                        <span style="color:#666666;">{{orgInfo.orgName}}</span>
                    </Form-item>
                </div>
                  <div class="ivu-form-item-wrap">
                      <Form-item :label="$t('availableAccBalance')"
                                class="no-marg-bottom"
                                style="margin-bottom:5px!important;"><!--账户可用余额-->
                        <span class="num">{{orgInfo.balance | moneyFilter}}</span> {{$t('yuan')}}
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('transferToSelection')" prop="toOrgId"><!--转入账户选择-->
                        <Select v-model.trim="data.toOrgId"
                                :placeholder="$t('selectField', {msg: ''})"
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
                    <Form-item :label="$t('transferAmount')" prop="amount"><!--转出金额-->
                        <Input v-model.trim="data.amount"
                               :placeholder="$t('inputField', {field: ''})"
                               style="width: 240px"/>
                        <span style="padding-left: 10px;">{{$t('yuan')}}
                        </span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('fee')" prop="commission"><!--手续费-->
                        <Input v-model.trim="data.commission"
                               :placeholder="$t('inputField', {field: ''})"
                               style="width: 240px" />
                                <span style="padding-left: 10px;">{{$t('yuan')}}
                                </span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('remark') + '：'" prop="remark"><!--备注-->
                        <Input v-model.trim="data.remark"
                               type="textarea"
                               :placeholder="$t('inputField', {field: ''})"
                               style="width: 240px" />
                    </Form-item>
                </div>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    :loading="btnLoading"
                    @click="formValidateFunc" >{{$t("save")}}</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="hide" >{{$t("cancel")}}</Button>
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
                        callback(this.$t('errorGreaterThan',{small : this.$t('transferAmount'),big : this.$t('validAmount')}));
                    }else{
                        if(validator.isNumber(this.data.commission)){
                            if(Number(value) + Number(this.data.commission) > this.orgInfo.balance){
                                callback(this.$t('transferError'));
                            }else{
                                callback();
                            }
                        }else{
                            callback();
                        }
                    }
                }).catch(err => {
                    if(err === 'errorMaxLength'){
                        callback(this.$t('errorMaxLength',{field : this.$t('transferAmount'),length : 10}));
                    }else{
                        callback(this.$t(err,{field : this.$t('transferAmount')}));
                    }
                });
            };
            //校验手续费是否正确
            const validateCommission = (rule,value,callback) => {
                common.validateMoney(value).then(() => {
                    if(value > this.orgInfo.balance){
                        callback(this.$t('errorGreaterThan',{small : this.$t('fee'),big : this.$t('validAmount')}));
                    }else{
                        if(validator.isNumber(this.data.amount)){
                            if(Number(value) + Number(this.data.amount) > this.orgInfo.balance){
                                callback(this.$t('transferError'));
                            }else{
                                callback();
                            }
                        }else{
                            callback();
                        }
                    }
                }).catch(err => {
                    if(err === 'errorMaxLength'){
                        callback(this.$t('errorMaxLength',{field : this.$t('fee'),length : 10}));
                    }else{
                        callback(this.$t(err,{field : this.$t('fee')}));
                    }
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
                        {required : true,message : this.$t('inputField',{field : this.$t('transferAmount')}),trigger : 'blur'},
                        {validator : validateeAmount,trigger : 'blur'}
                    ],
                    toOrgId : [
                        {required : true,message : this.$t('selectField',{msg : this.$t('transferToAccount')}),trigger : 'change'}
                    ],
                    commission : [
                        {required : true,message : this.$t('inputField',{field : this.$t('fee')}),trigger : 'blur'},
                        {required : true,validator : validateCommission,trigger : 'blur'}
                    ],
                    remark : [
                        {max : 100,message : this.$t('errorMaxLength',{field : this.$t('remark'),length : 100}),trigger : 'blur'}
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
                        this.$Message.success(this.$t('successTip', {tip: this.$t('transfer')}));    // '转账成功'
                        this.$emit('fresh-data');
                    }else{
                        this.$Message.error(this.$t('failureTip', {tip: this.$t('transfer')}));      // '转账失败'
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

