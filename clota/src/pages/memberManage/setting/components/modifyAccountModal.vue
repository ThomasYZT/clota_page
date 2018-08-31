<template>
    <!--编辑账户-->
    <Modal
        v-model="visible"
        title="编辑账户"
        class-name="modify-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                <div class="ivu-form-item-wrap">
                    <Form-item label="账户归属" prop="accountBelonging">
                        <!--默认账户-->
                        <template v-if="formData.defaultAccount === 'true'">
                            <Select v-model="formData.accountBelonging" disabled>
                                <Option v-for="(item, index) in allNode"
                                        :value="item.id"
                                        :key="index">
                                    {{ item.orgName }}
                                </Option>
                            </Select>
                        </template>
                        <!--默认账户-->
                        <template v-else>
                            <Select v-model="formData.accountBelonging">
                                <Option v-for="(item, index) in tableData"
                                        :value="item.id"
                                        :key="index">
                                    {{ item.orgName }}
                                </Option>
                            </Select>
                        </template>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="账户名称" prop="accountName">
                        <Input v-model.trim="formData.accountName"
                               :placeholder="$t('inputField', {field: ''})"
                               :disabled="formData.defaultAccount === 'true' ? true : false"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="单位" prop="unit">
                        <Input v-model.trim="formData.unit"
                               :placeholder="$t('inputField', {field: ''})"
                               :disabled="formData.defaultAccount === 'true' ? true : false"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="储值比率" prop="rateDenominator">
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
                    <FormItem label="是否允许兑现">
                        <RadioGroup v-model="formData.exchangeToCash">
                            <Radio label="true">允许兑现</Radio>
                            <Radio label="false">不允许兑现</Radio>
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
        props: ['length','table-data','all-node'],
        components: {},
        watch: {
            'formData.rateNumerator': function (newVal) {
                this.$refs.formValidate.validateField('rateDenominator');
            }
        },
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
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    callback(err);
                });
            };

            //校验分子
            const validateRateNumerator = (rule,value,callback) => {
                common.validateInteger( this.formData.rateNumerator ).then(() => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                }).catch(err => {
                    callback(err);
                });
            };

            return {
                visible: false,
                //表单数据
                index: null,
                formData: {
                    accountBelonging: '',
                    accountName: '',
                    unit: '',
                    rate: '',
                    rateNumerator: '',
                    rateDenominator: '',
                    exchangeToCash: '',
                    corpusAppliedOrgId: [],
                    donateAppliedOrgId: [],
                },
                //校验规则
                ruleValidate: {
                    accountBelonging: [
                        { required: true, message: '账户归属不能为空', trigger: 'change' },
                    ],
                    accountName: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 10, message: '账户名称不能超过10字符', trigger: 'blur' },
                    ],
                    unit: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 10, message: '单位不能超过10字符', trigger: 'blur' },
                    ],
                    rateDenominator: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 10, message: '储值比率不能超过10字符', trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                        { validator: validateRateNumerator, trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {

            show ( data ) {
                this.index = this.length;
                if( data ){
                    let formData = defaultsDeep({}, data.item);
                    formData.rateDenominator = data.item.rateDenominator ? data.item.rateDenominator+"" : "";
                    formData.rateNumerator = data.item.rateNumerator ? data.item.rateNumerator+"" : "";
                    this.formData = defaultsDeep({}, formData);
                    this.index = data.index;
                }
                this.visible = true;
                setTimeout( () => {
                    this.$refs.formValidate.validateField('rateDenominator');
                },300 )
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if(valid){
                        let params = {
                            id: this.formData.id || '',
                            accountBelonging: this.formData.accountBelonging,
                            accountName: this.formData.accountName,
                            unit: this.formData.unit,
                            rateDenominator: this.formData.rateDenominator,
                            rateNumerator: this.formData.rateNumerator,
                            rate: (Number(this.formData.rateDenominator)/Number(this.formData.rateNumerator)).toFixed(2),
                            exchangeToCash: this.formData.exchangeToCash,
                            corpusAppliedOrgId: this.formData.corpusAppliedOrgId,
                            donateAppliedOrgId: this.formData.donateAppliedOrgId,
                        };
                        console.log(params);
                        this.updateMemberAccountDefine(params);
                    }
                })
            },


            //保存/更改/储值账户设置
            updateMemberAccountDefine ( params ) {
                ajax.post('updateMemberAccountDefine', params).then(res => {
                    if( res.success ) {
                        this.$Message.success('修改成功！');
                        this.hide();
                        this.$emit('updata-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.warning(res.message || 'updateMemberAccountDefine 修改失败！');
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.formData = {accountBelonging: '',
                    accountName: '',
                    unit: '',
                    rate: '',
                    rateNumerator: '',
                    rateDenominator: '',
                    exchangeToCash: '',
                    corpusAppliedOrgId: [],
                    donateAppliedOrgId: [],
                };
                this.index = null;
                this.$refs.formValidate.resetFields();
            },

        },
    }
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
