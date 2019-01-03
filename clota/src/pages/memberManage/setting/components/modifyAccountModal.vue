<template>
    <!--编辑账户-->
    <Modal
        v-model="visible"
        :title="$t('editAccount')"
        class-name="modify-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="130">
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('accountOwnership')" prop="accountBelonging">
                        <Select v-model="formData.accountBelonging"
                                @on-change="changeAccountBelonging"
                                :disabled="formData.defaultAccount === 'true' ? true : false">
                            <Option v-for="(item, index) in tableData"
                                    :value="item.id"
                                    :key="index">
                                {{ item.orgName }}
                                </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--账户名称-->
                    <Form-item :label="$t('accountName')" prop="accountName">
                        <Input v-model.trim="formData.accountName"
                               :placeholder="$t('inputField', {field: ''})"
                               :disabled="formData.defaultAccount === 'true' ? true : false"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--单位-->
                    <Form-item :label="$t('unit')" prop="unit">
                        <Input v-model.trim="formData.unit"
                               :placeholder="$t('inputField', {field: ''})"
                               :disabled="formData.defaultAccount === 'true' ? true : false"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--储值比率-->
                    <Form-item :label="$t('storedValueRatio')" prop="rateDenominator">
                        <Input v-model.trim="formData.rateNumerator"
                               :disabled="formData.defaultAccount === 'true' ? true : false"
                               :placeholder="$t('inputField', {field: ''})"
                               class="single-input"/>
                        <span style="padding: 0 13px;">:</span>
                        <Input v-model.trim="formData.rateDenominator"
                               :disabled="formData.defaultAccount === 'true' ? true : false"
                               :placeholder="$t('inputField', {field: ''})"
                               class="single-input"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--是否允许兑现-->
                    <FormItem :label="$t('whetherCashingIsAllowed')">
                        <RadioGroup v-model="formData.exchangeToCash">
                            <Radio label="true" :disabled="formData.defaultAccount === 'true' ? true : false">{{$t('allowCash')}}</Radio>
                            <Radio label="false" :disabled="formData.defaultAccount === 'true' ? true : false">{{$t('notAllowCash')}}</Radio>
                        </RadioGroup>
                    </FormItem>
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
    import defaultsDeep from 'lodash/defaultsDeep';


    export default {
        props : ['length','table-data'],
        components : {},
        // watch: {
        //     'formData.rateNumerator': function (newVal) {
        //         this.$refs.formValidate.validateField('rateDenominator');
        //     }
        // },
        data () {

            const validateMethod = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') )); // 输入内容不合规则
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
                    if (err === 'errorMaxLength') {
                        callback(this.$t(err,{ field : this.$t('storedValueRatio'),length : 10 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('storedValueRatio') }));
                    }
                });
            };

            //校验分子
            const validateRateNumerator = (rule,value,callback) => {
                common.validateInteger( this.formData.rateNumerator ).then(() => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') )); // 输入内容不合规则
                    } else {
                        callback();
                    }
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t(err,{ field : this.$t('storedValueRatio'),length : 10 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('storedValueRatio') }));
                    }
                });
            };

            //校验归属唯一性
            const validateOnly = (rule,value,callback) => {
                if (value && this.check === false) {
                    callback(new Error(this.$t('accountRepeat')));
                } else {
                    callback();
                }
            };

            return {
                visible : false,
                //表单数据
                index : null,
                formData : {
                    accountBelonging : '',
                    accountName : '',
                    unit : '',
                    rate : '',
                    rateNumerator : '',
                    rateDenominator : '',
                    exchangeToCash : '',
                    corpusAppliedOrgId : [],
                    donateAppliedOrgId : [],
                },
                //校验规则
                ruleValidate : {
                    accountBelonging : [
                        { required : true, message : this.$t('selectField',{ msg : this.$t('accountOwnership') }), trigger : 'change' },
                        { validator : validateOnly, trigger : 'blur' },
                    ],
                    accountName : [
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { max : 10, message : this.$t('errorMaxLength',{ field : this.$t('accountName'),length : 10 }), trigger : 'blur' },
                    ],
                    unit : [
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { max : 10, message : this.$t('errorMaxLength',{ field : this.$t('unit'),length : 10 }), trigger : 'blur' },
                    ],
                    rateDenominator : [
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' },
                        { validator : validateRateNumerator, trigger : 'blur' },
                    ],
                },
                //归属校验
                check : true,
            };
        },
        methods : {

            show ( data ) {
                this.index = this.length;

                if ( data ) {
                    let formData = defaultsDeep({}, data.item);
                    formData.rateDenominator = data.item.rateDenominator ? data.item.rateDenominator + "" : "";
                    formData.rateNumerator = data.item.rateNumerator ? data.item.rateNumerator + "" : "";
                    this.formData = defaultsDeep({}, formData);
                    this.index = data.index;
                }
                this.visible = true;
                setTimeout( () => {
                    this.$refs.formValidate.validateField('rateDenominator');
                },300 );
            },

            //账户归属信息改变
            changeAccountBelonging (val) {
                let obj = this.tableData.find( item => val === item.id );
                if (obj) {
                   let params = {
                       accountBelonging : obj.id,
                       accountTypeId : this.formData.id
                   };
                   this.existAccountBelong(params);
                }
            },

            //判断账户归属是否存在
            existAccountBelong ( params ) {
                ajax.post('existAccountBelong', params).then(res => {
                    if ( res.success ) {
                        this.check = !res.data;
                        this.$refs.formValidate.validateField('accountBelonging');
                    } else {
                        this.$Message.warning(res.message || this.$t('failureTip',{ tip : this.$t('modify') }));
                    }
                });
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid && this.check) {
                        let params = {
                            typeModelJson : JSON.stringify({
                                id : this.formData.id || '',
                                accountName : this.formData.accountName
                            }),
                            extModelJson : JSON.stringify({
                                accountBelonging : this.formData.accountBelonging,
                                unit : this.formData.unit,
                                rate : (Number(this.formData.rateNumerator) / Number(this.formData.rateDenominator)).toFixed(2),
                                exchangeToCash : this.formData.exchangeToCash,
                                corpusAppliedOrgId : this.formData.corpusAppliedOrgId,
                                donateAppliedOrgId : this.formData.donateAppliedOrgId,
                                rateDenominator : this.formData.rateDenominator,
                                rateNumerator : this.formData.rateNumerator
                            })

                        };
                        this.updateMemberAccountDefine(params);
                    }
                });
            },

            //保存/更改/储值账户设置
            updateMemberAccountDefine ( params ) {
                ajax.post('updateMemberAccountDefine', params).then(res => {
                    if ( res.success ) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('modify') }));
                        this.hide();
                        this.$emit('updata-list', { item : this.formData, index : this.index });
                    } else {
                        this.$Message.warning(res.message || this.$t('failureTip',{ tip : this.$t('modify') }));
                    }
                });
            },

            //关闭模态框
            hide () {
                this.visible = false;
                this.formData = { accountBelonging : '',
                    accountName : '',
                    unit : '',
                    rate : '',
                    rateNumerator : '',
                    rateDenominator : '',
                    exchangeToCash : '',
                    corpusAppliedOrgId : [],
                    donateAppliedOrgId : [],
                };
                this.index = null;
                this.$refs.formValidate.resetFields();
            },

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .modify-account-modal{

        .modal-body{
            padding: 40px 35px 20px;
        }

        .ivu-form-item-wrap{

            /deep/ .ivu-select{
                width: 260px;
            }

            /deep/ .ivu-input-wrapper{
                width: 260px;
                &.single-input{
                    width: 110px;
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
