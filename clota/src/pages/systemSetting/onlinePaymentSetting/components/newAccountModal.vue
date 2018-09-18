<template>
    <!--增加账户-->
    <Modal
        v-model="visible"
        :title="$t(modalTitle)"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                <!--账户类型-->
                <Form-item :label="$t('accountType')" prop="accountType">
                    <Select v-model="formData.accountType" @on-change="handleAccountChanged">
                        <Option v-for="(item, index) in accountList"
                                :value="item.accountType"
                                :key="index">
                            {{ item.payTypeName }}
                        </Option>
                    </Select>
                </Form-item>
                <!--商户号-->
                <Form-item :label="$t('merchantNum')" prop="merchantNumber">
                    <Input v-model.trim="formData.merchantNumber" :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>
                <!--appID-->
                <Form-item :label="$t('appID')" prop="appId">
                    <Input v-model.trim="formData.appId" :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>
                <!--appKEY-->
                <Form-item :label="$t('appKEY')" prop="appKey">
                    <Input v-model.trim="formData.appKey" :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>
                <!--appSECRET-->
                <Form-item :label="$t('appSECRET')" prop="appSecret">
                    <Input v-model.trim="formData.appSecret" :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>
                <!--备注-->
                <Form-item :label="$t('remark')" prop="remark" style="margin-bottom: 0;">
                    <Input type="textarea" v-model.trim="formData.remark" :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>
            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc()" >{{$t('save')}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import defaultsDeep from 'lodash/defaultsDeep';
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        props: ['length','modal-title','has-paytype-list'],
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


            return {
                visible: false,
                //步骤
                step: 0,
                //表单数据
                index: null,
                formData: {
                    accountType: '',
                    merchantNum: '',
                    appId: '',
                    appKey: '',
                    appSecret: '',
                    remark: '',
                },
                //校验规则
                ruleValidate: {
                    accountType: [
                        { required: true, message: this.$t('selectField',{msg : this.$t('accountOwnership')}), trigger: 'change' },
                    ],
                    merchantNumber: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('merchantNum')}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                    appId: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('appID')}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                    appKey: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('appKEY')}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                    appSecret: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('appSECRET')}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                    remark: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 20, message: this.$t('errorMaxLength',{field : this.$t('remark'),length : 20}), trigger: 'blur' },
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
                accountList: []
            }
        },
        watch: {

        },
        methods: {

            show ( data ) {
                this.index = this.length;
                this.accountList = [
                    {accountType: 'alipay', payTypeName: '支付宝支付账户'},
                    {accountType: 'weixin', payTypeName: '微信支付账户'}
                ]
                if( data ){
                    this.formData = defaultsDeep({}, data.item);
                    this.index = data.index;
                }

                //获取未添加过的账户类型信息
                if(data.item) {
                    //console.log(this.hasPaytypeList)
                    this.accountList.forEach((item, index) => {
                        if(item.accountType == data.item.accountType) {
                            this.accountList.splice( index-1,1)
                        }
                    })
                }else {
                    //console.log(this.hasPaytypeList)
                    for(let i=0, len=this.accountList.length; i<len;) {
                        if(this.hasPaytypeList.indexOf(this.accountList[i].accountType) > -1){
                            this.accountList.splice(i,1);
                            len -= 1;
                        }else {
                            i++;
                        }
                    }
                }

                this.visible = true;
            },

            //账户类型信息改变
            handleAccountChanged (val) {

            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if(valid){
                        //校验成功，触发新增账户接口
                        this.saveAccountInfo()
                    }
                })
            },
            /**
             * 提交账户信息
             */
            saveAccountInfo() {
                ajax.post('addOnlineAccount', {
                    ...this.formData
                }).then((res) => {
                    if(res.success) {
                        this.$emit('updata-list');
                        this.hide();
                        this.$Message.success(this.$t(this.title)+ this.$t('successTip', {tip: ''}) + '！');
                    } else {
                        this.$Message.warning('queryChannelSet '+ this.$t('failureTip', {tip: 'del'}) +'！');
                    }
                })
            },
            //关闭模态框
            hide(){
                this.visible = false;
                this.formData = {
                    accountType: '',
                    merchantNumber: '',
                    appId: '',
                    appKey: '',
                    appSecret: '',
                    remark: '',
                };
                this.selectData = [];
                this.index = null;
                this.step = null;
                if( this.$refs.moneyMultiTablePlug ){
                    this.$refs.moneyMultiTablePlug.clearSelection();
                }
                if( this.$refs.sendMultiTablePlug ){
                    this.$refs.sendMultiTablePlug.clearSelection();
                }
                this.$refs.formValidate.resetFields();

            },


            //保存
            save () {
                this.formData.corpusAppliedOrgId = [];
                this.formData.donateAppliedOrgId = [];
                if(this.selectData && this.selectData.length > 0 ){
                    this.selectData[0].forEach( (item) => {
                        this.formData.corpusAppliedOrgId.push(item.id);
                    })

                    this.selectData[1].forEach( (item) => {
                        this.formData.donateAppliedOrgId.push(item.id);
                    });
                }
                this.updateOnlinePaymentDefine(this.formData);
            },

            //保存在线支付账户
            updateOnlinePaymentDefine ( params ) {
                /*ajax.post('updateMemberAccountDefine', params).then(res => {
                    if( res.success ) {
                        this.$Message.success(this.$t('successTip',{'tip' : this.$t('add')}));
                        this.hide();
                        this.$emit('updata-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.warning(res.message || this.$t('failureTip',{'tip' : this.$t('add')}));
                    }
                })*/
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 14px;

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
