<template>
    <!--新增账户-->
    <Modal
        v-model="visible"
        :title="$t('newAccount')"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <div class="steps-wrap">
                <Steps :current="step">
                    <Step title="" icon="record"></Step>
                    <Step title="" icon="record"></Step>
                    <Step title="" icon="record"></Step>
                </Steps>
            </div>

            <!--step 1-->
            <template v-if="step === 0">
                <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                    <div class="ivu-form-item-wrap">
                        <!--账户归属-->
                        <Form-item :label="$t('accountOwnership')" prop="accountBelonging">
                            <Select v-model="formData.accountBelonging"
                                    @on-change="changeAccountBelonging">
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
                            <Input v-model.trim="formData.accountName" :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <!--单位-->
                        <Form-item :label="$t('unit')" prop="unit">
                            <Input v-model.trim="formData.unit" :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap" >
                        <!--储值比率-->
                        <Form-item :label="$t('storedValueRatio')" prop="rateDenominator">
                            <Input v-model.trim="formData.rateNumerator"
                                   :placeholder="$t('inputField', {field: ''})"
                                   class="single-input"/>
                            <span style="padding: 0 5px;">:</span>
                            <Input v-model.trim="formData.rateDenominator"
                                   :placeholder="$t('inputField', {field: ''})"
                                   class="single-input"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <!--是否允许兑现-->
                        <FormItem :label="$t('whetherCashingIsAllowed')">
                            <RadioGroup v-model="formData.exchangeToCash">
                                <Radio label="true">{{$t('allowCash')}}</Radio>
                                <Radio label="false">{{$t('notAllowCash')}}</Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                </Form>
            </template>

            <!--step 2-->
            <template v-if="step === 1">
                <table-com
                    ref="moneyMultiTablePlug"
                    :table-com-min-height="380"
                    :column-data="moneyColumnData"
                    :table-data="tableData"
                    @selection-change="handleSelectionChangeToMoney"
                    :border="false">
                    <el-table-column
                        slot="column0"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        type="selection"
                        slot-scope="row">
                    </el-table-column>
                </table-com>
            </template>

            <!--step 3-->
            <template v-if="step === 2">
                <table-com
                    ref="sendMultiTablePlug"
                    :table-com-min-height="380"
                    :column-data="sendColumnData"
                    :table-data="sendData"
                    @selection-change="handleSelectionChangeToSend"
                    :border="false">
                    <el-table-column
                        slot="column0"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        type="selection"
                        slot-scope="row">
                    </el-table-column>
                </table-com>
            </template>

        </div>

        <div slot="footer" class="modal-footer">
            <template v-if="step === 0">
                <Button type="primary" @click="nextStep(true)" >{{$t('nextStep')}}</Button>
                <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
            </template>
            <template v-if="step === 1">
                <Button type="primary" @click="nextStep(false)" >{{$t('nextStep')}}</Button>
                <Button type="ghost" @click="prevStep" >{{$t('lastStep')}}</Button>
            </template>
            <template v-if="step === 2">
                <Button type="primary" @click="save" >{{$t("save")}}</Button>
                <Button type="ghost" @click="prevStep" >{{$t('lastStep')}}</Button>
            </template>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import defaultsDeep from 'lodash/defaultsDeep';
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        props: ['length','table-data','send-data'],
        components: {
            tableCom,
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
                    if(err === 'errorMaxLength'){
                        callback(this.$t(err,{field : this.$t('storedValueRatio'),length : 10}));
                    }else{
                        callback(this.$t(err,{field : this.$t('storedValueRatio')}));
                    }
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
                    if(err === 'errorMaxLength'){
                        callback(this.$t(err,{field : this.$t('storedValueRatio'),length : 10}));
                    }else{
                        callback(this.$t(err,{field : this.$t('storedValueRatio')}));
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
                visible: false,
                //步骤
                step: 0,
                //表单数据
                index: null,
                formData: {
                    accountBelonging: '',
                    accountName: '',
                    unit: this.$t('yuan'),
                    rate: '1',
                    rateNumerator: '1',
                    rateDenominator: '1',
                    exchangeToCash: 'false',
                    corpusAppliedOrgId: [],
                    donateAppliedOrgId: [],
                },
                //校验规则
                ruleValidate: {
                    accountBelonging: [
                        { required: true, message: this.$t('selectField',{msg : this.$t('accountOwnership')}), trigger: 'change' },
                        { validator: validateOnly, trigger: 'blur' },
                    ],
                    accountName: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 20, message: this.$t('errorMaxLength',{field : this.$t('accountName'),length : 20}), trigger: 'blur' },
                    ],
                    unit: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 10, message: this.$t('errorMaxLength',{field : this.$t('unit'),length : 20}), trigger: 'blur' },
                    ],
                    rateDenominator: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                        { validator: validateRateNumerator, trigger: 'blur' },
                    ],
                },
                //存储所选表格数据
                selectData: [],
                //表头信息
                moneyColumnData: [
                    {
                        title: '',
                        minWidth: 110,
                        field: '',
                    },
                    {
                        title: 'principalCanBeUsedInRangeSetting',
                        minWidth: 400,
                        field: 'orgName'
                    },
                ],
                sendColumnData: [
                    {
                        title: '',
                        minWidth: 110,
                        field: '',
                    },
                    {
                        title: 'complimentaryAmountCanBeUsedToSetTheRange',
                        minWidth: 400,
                        field: 'orgName'
                    },
                ],
                //归属校验
                check: true,
            }
        },
        watch: {
            'formData.rateNumerator': function (newVal) {
                this.$refs.formValidate.validateField('rateDenominator');
            },
        },
        methods: {

            show ( data ) {
                this.index = this.length;
                if( data ){
                    this.formData = defaultsDeep({}, data.item);
                    this.index = data.index;
                }
                this.visible = true;
            },

            //账户归属信息改变
            changeAccountBelonging (val) {
                let obj = this.tableData.find( item => val === item.id );
                if(obj){
                    var params = {
                        accountBelonging: obj.id,
                        accountTypeId: ''
                    };
                    this.existAccountBelong(params);
                }
                this.formData.accountName = obj ? obj.orgName : '';
            },

            //判断账户归属是否存在
            existAccountBelong ( params ) {
                ajax.post('existAccountBelong', params).then(res => {
                    if( res.success ) {
                        this.check = !res.data;
                        this.$refs.formValidate.validateField('accountBelonging');
                    } else {
                        this.$Message.warning(res.message || this.$t('failureTip',{tip : this.$t('modify')}));
                    }
                })
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if(valid && this.check){
                        this.step ++;
                        this.setSelectToTableForStep(this.step);
                    }
                })
            },

            //多选
            handleSelectionChangeToMoney(val) {
                this.selectData[0] = val;
            },
            handleSelectionChangeToSend(val) {
                this.selectData[1] = val;
            },

            //根据数据回填表格，设置勾选
            setSelectToTableForStep ( step ) {
                if( step === 1){
                    setTimeout( () => {
                        if(this.selectData[0] && this.selectData[0].length > 0){
                            this.selectData[0].forEach( item => {
                                this.tableData.forEach( (list,index) => {
                                    if(item.id === list.id){
                                        if(this.$refs.moneyMultiTablePlug){
                                            this.$refs.moneyMultiTablePlug.toggleRowSelection(this.tableData[index], true);
                                        }
                                    }
                                })
                            })
                        }
                    },300)
                }
                if( step === 2){
                    setTimeout( () => {
                        if(this.selectData[1] && this.selectData[1].length > 0){
                            this.selectData[1].forEach( item => {
                                this.sendData.forEach( (list,index) => {
                                    if(item.id === list.id){
                                        if(this.$refs.sendMultiTablePlug){
                                            this.$refs.sendMultiTablePlug.toggleRowSelection(this.sendData[index], true);
                                        }
                                    }
                                })
                            })
                        }
                    },300)
                }
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.formData = {
                    accountBelonging: '',
                    accountName: '',
                    unit: this.$t('yuan'),
                    rate: '1',
                    rateNumerator: '1',
                    rateDenominator: '1',
                    exchangeToCash: 'false',
                    corpusAppliedOrgId: [],
                    donateAppliedOrgId: [],
                };
                if(this.step === 0){
                    this.$refs.formValidate.resetFields();
                }
                this.selectData = [];
                this.index = null;
                this.step = 0;
                if( this.$refs.moneyMultiTablePlug ){
                    this.$refs.moneyMultiTablePlug.clearSelection();
                }
                if( this.$refs.sendMultiTablePlug ){
                    this.$refs.sendMultiTablePlug.clearSelection();
                }
            },

            //下一步
            nextStep ( data ) {
                if(data){
                    this.formValidateFunc();
                } else {
                    this.step ++;
                    this.setSelectToTableForStep(this.step);
                }
            },
            //下一步
            prevStep () {
                this.step --;
                this.setSelectToTableForStep(this.step);
            },

            //保存
            save () {
                this.formData.corpusAppliedOrgId = [];
                this.formData.donateAppliedOrgId = [];
                if(this.selectData && this.selectData.length > 0 ){
                    this.selectData[0].forEach( (item, index) => {
                        this.formData.corpusAppliedOrgId.push(item.id);
                    })

                    this.selectData[1].forEach( (item, index) => {
                        this.formData.donateAppliedOrgId.push(item.id);
                    });
                }
                let params = {
                    typeModelJson: JSON.stringify({
                        id:'',
                        accountName:this.formData.accountName
                    }),
                    extModelJson: JSON.stringify({
                        accountBelonging: this.formData.accountBelonging,
                        unit: this.formData.unit,
                        rate: (Number(this.formData.rateNumerator)/Number(this.formData.rateDenominator)).toFixed(2),
                        exchangeToCash: this.formData.exchangeToCash,
                        corpusAppliedOrgId: this.formData.corpusAppliedOrgId.join(','),
                        donateAppliedOrgId: this.formData.donateAppliedOrgId.join(','),
                        rateDenominator: this.formData.rateDenominator,
                        rateNumerator: this.formData.rateNumerator
                    })
                };
                console.log(params)
                this.updateMemberAccountDefine(params);
            },

            //保存储值账户设置
            updateMemberAccountDefine ( params ) {
                ajax.post('updateMemberAccountDefine', params).then(res => {
                    if( res.success ) {
                        this.$Message.success(this.$t('successTip',{'tip' : this.$t('add')}));
                        this.hide();
                        this.$emit('updata-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.warning(res.message || this.$t('failureTip',{'tip' : this.$t('add')}));
                    }
                })
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 0 14px;
            height: 430px;

            .steps-wrap{
                padding-top: 5px;
                margin-left: 100px;
                margin-bottom: 18px;

                /deep/ .ivu-steps .ivu-steps-head-inner > .ivu-steps-icon.ivu-icon {
                    font-size: 12px;
                    transform: scale(0.7);
                }
                /deep/ .ivu-steps .ivu-steps-tail > i{
                    height: 2px;
                    border-radius: 2px;
                }
            }

            /deep/ .ivu-from{
                padding-top: 15px;
            }

            /deep/ .ivu-select{
                width: 280px;
            }

            /deep/ .ivu-input-wrapper{
                width: 280px;
                &.single-input{
                    width: 130px !important;
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
