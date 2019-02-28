<template>
    <!--会员储值账户余额修改-->
    <Modal
        v-model="visible"
        :title="$t('storageBalanceModification')"
        class-name="modify-balance-modal vertical-center-modal"
        :width="lang === 'zh-CN' ? 560  : 690"
        :mask-closable="false"
        @on-cancel="hide"><!--会员储值账户余额修改-->

        <div class="modal-body">

            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="lang === 'zh-CN' ? 190 : 330">

                <div class="ivu-form-item-wrap bottom-5px">
                    <Form-item :label="$t('userName') + '：'"><!--用户姓名-->
                        {{detail.custName | contentFilter}}
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap bottom-5px">
                    <Form-item :label="$t('selectModifyingAccount') + '：'" prop="accountTypeId"><!--选择要修改的账户-->
                        <Select v-model="formData.accountTypeId" :placeholder="$t('selectField', {msg: ''})" @on-change="changeAccount">
                            <Option v-for="(item,index) in store"
                                    :key="index"
                                    :value="item.id">
                                {{$t(item.accountName)}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap bottom-5px">
                    <Form-item :label="$t('PrincipalAccBalance') + '：'"><!--本金账户余额-->
                        <span class="yellow-color">{{accountInfo.corpusBalance | moneyFilter | contentFilter}}</span>
                        {{(accountInfo.accountDefineId === '1' || accountInfo.accountDefineId === '4') ? $t('yuan') : $t(accountInfo.unit)}}
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap bottom-5px">
                    <Form-item :label="$t('giftAccBalance') + '：'"><!--赠送账户余额-->
                        <span class="yellow-color">{{accountInfo.donateBalance | moneyFilter | contentFilter}}</span>
                        {{accountInfo.accountDefineId === '1' ? $t('yuan') : $t(accountInfo.unit)}}
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap double-input">
                    <Form-item :label="$t('adjustPrincipalAccBalance') + '：'" prop="corpusAmount"><!--本金账户余额调整-->
                        <RadioGroup v-model="formData.corpusOptSign">
                            <Radio label="add">
                                <span  class="adjust-type" :style="{width : lang === 'zh-CN' ? 'auto' : '52px'}">
                                    {{$t("increase")}}
                                </span>
                                <template v-if="formData.corpusOptSign === 'sub'">
                                    <Input placeholder=" " disabled/>
                                </template>
                                <template v-else>
                                    <Input v-model.trim="formData.corpusAmount" :placeholder="$t('inputField', {field: ''})"/>
                                </template>
                                {{(accountInfo.accountDefineId === '1' || accountInfo.accountDefineId === '4') ? $t('yuan') : $t(accountInfo.unit)}}
                            </Radio>
                            <Radio label="sub">
                                <span  class="adjust-type" :style="{width : lang === 'zh-CN' ? 'auto' : '52px'}">
                                    {{$t("reduce")}}
                                </span>
                                <template v-if="formData.corpusOptSign === 'add'">
                                    <Input placeholder=" " disabled/>
                                </template>
                                <template v-else>
                                    <Input v-model.trim="formData.corpusAmount" :placeholder="$t('inputField', {field: ''})"/>
                                </template>
                                {{accountInfo.accountDefineId === '1' ? $t('yuan') : $t(accountInfo.unit)}}
                            </Radio>
                        </RadioGroup>
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap double-input" v-if="showDonateAccount">
                    <Form-item :label="$t('adjustGiftAccBalance') + '：'" prop="donateAmount"><!--赠送账户余额调整-->
                        <RadioGroup v-model="formData.donateOptSign">
                            <Radio label="add">
                                <span  class="adjust-type" :style="{width : lang === 'zh-CN' ? 'auto' : '52px'}">
                                    {{$t("increase")}}
                                </span>
                                <template v-if="formData.donateOptSign === 'sub'">
                                <Input placeholder=" " disabled/>
                            </template>
                            <template v-else>
                                <Input v-model.trim="formData.donateAmount" :placeholder="$t('inputField', {field: ''})"/>
                            </template>
                                {{(accountInfo.accountDefineId === '1' || accountInfo.accountDefineId === '4') ? $t('yuan') : $t(accountInfo.unit)}}
                            </Radio>
                            <Radio label="sub">
                                <span  class="adjust-type" :style="{width : lang === 'zh-CN' ? 'auto' : '52px'}">
                                    {{$t("reduce")}}
                                </span>
                                <template v-if="formData.donateOptSign === 'add'">
                                <Input placeholder=" " disabled/>
                            </template>
                            <template v-else>
                                <Input v-model.trim="formData.donateAmount" :placeholder="$t('inputField', {field: ''})"/>
                            </template>
                                {{accountInfo.accountDefineId === '1' ? $t('yuan') : $t(accountInfo.unit)}}
                            </Radio>
                        </RadioGroup>
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('selectModifyReason') + '：'" prop="reasonId"><!--请选择修改原因-->
                        <Select v-model="formData.reasonId" :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="(item,index) in reason"
                                    :key="index"
                                    :value="item.id">
                                <div class="option-label" v-w-title="item.reason" >
                                    {{item.reason}}
                                </div>
                            </Option>
                        </Select>
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('remark') + '：'" prop="remark">    <!--备注-->
                        <Input v-model.trim="formData.remark" type="textarea" :placeholder="$t('inputField', {field: ''})" />    <!--请输入-->
                    </Form-item>
                </div>

            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >{{$t("save")}}</Button> <!--保存-->
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>   <!--取消-->
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';
    import { mapGetters } from 'vuex';

    export default {
        props : ['detail','card-info'],
        components : {},
        data () {

            const validateMethod = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular')) ); // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
            };

            //校验正整数
            const validateNumber = (rule,value,callback) => {
                common.validateMoney(value).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t('errorMaxLength',{ field : this.$t(rule.field),length : 10 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t(rule.field) }));
                    }
                });
            };

            //校验本金额不可大于总本金余额
            const validateMaxCorpus = (rule,value,callback) => {
                if (value && this.formData.corpusOptSign === 'sub' && Number(value) > this.accountInfo.corpusBalance ) {
                    callback(new Error( this.$t('errorGreaterThan', { small : this.$t('corpusAmount'), big : this.$t('totalPrincipalBalance') }) )); // 本金余额不可大于总本金余额
                } else {
                    callback();
                }
            };

            //校验赠送金额不可大于总赠送金额
            const validateMaxDonate = (rule,value,callback) => {
                if (value && this.formData.donateOptSign === 'sub' && Number(value) > this.accountInfo.donateBalance ) {
                    callback(new Error( this.$t('errorGreaterThan', { small : this.$t('giftSum'), big : this.$t('totalGiftSum') }) )); // 赠送金额不可大于总赠送金额
                } else {
                    callback();
                }
            };

            return {
                visible : false,
                //会员信息的账户数据
                accountInfo : {},
                //表单数据
                formData : {
                    accountId : '',
                    accountTypeId : '',//账户类型id
                    corpusOptSign : 'add',//本金操作类型 -add -sub
                    corpusAmount : '0',//本金金额
                    donateOptSign : 'add',//赠送金额操作类型 -add -sub
                    donateAmount : '0',//赠送金额
                    reasonId : '',//原因id
                    remark : '',
                },
                //表单校验
                ruleValidate : {
                    accountTypeId : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('modifiedAccount') }), trigger : 'change' }, // 修改的账户不能为空
                    ],
                    corpusAmount : [
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        // { max: 10, message: this.$t('errorMaxLength', {field: this.$t('principalBalance'), length: 10}), trigger: 'blur' },  // 本金余额不能超过10字符
                        { validator : validateNumber, trigger : 'blur' },
                        { validator : validateMaxCorpus, trigger : 'blur' },
                    ],
                    donateAmount : [
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { max : 10, message : this.$t('errorMaxLength', { field : this.$t('giftSum'), length : 10 }), trigger : 'blur' }, // 赠送金额不能超过10字符
                        { validator : validateNumber, trigger : 'blur' },
                        { validator : validateMaxDonate, trigger : 'blur' },
                    ],
                    reasonId : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('modifyReason') }), trigger : 'change' }, // '修改原因不能为空'
                    ],
                    remark : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('remark') }), trigger : 'blur' }, // 备注不能为空
                        { max : 100, message : this.$t('errorMaxLength', { field : this.$t('remark'), length : 100 }), trigger : 'blur' }, // 备注不能超过100字符
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ],
                },
                //账户数据
                store : [],
                //修改原因
                reason : []
            };
        },
        methods : {

            show ( list ) {
                if (list && list.length > 0) {
                    let _store = defaultsDeep([], list);
                    _store.forEach( item => {
                        if (item.id === null || typeof item.id === 'undefined') {
                            item.id = "null";
                        }
                    } );
                    this.store = defaultsDeep([], _store);
                }
                setTimeout( () => {
                    this.visible = true;
                }, 300);
                this.listAdjustReason();
            },

            //要修改的账户--监听改变
            changeAccount ( val ) {
                if (val) {
                    this.accountInfo = this.store.find((item) => val === item.id);
                }
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        let params = {
                            memberId : this.detail.id,
                            cardId : this.cardInfo ? this.cardInfo.id : '',
                            accountId : this.accountInfo.id === "null" ? null : this.accountInfo.id,
                            accountTypeId : this.accountInfo.accountDefineId,
                            amount : this.formData.corpusOptSign === 'sub' ? '-' + this.formData.corpusAmount : this.formData.corpusAmount,
                            donateAmount : this.formData.donateOptSign === 'sub' ? '-' + this.formData.donateAmount : this.formData.donateAmount,
                            reasonId : this.formData.reasonId,
                            remark : this.formData.remark,
                        };
                        this.adjustAmount(params);
                    }
                });
            },

            //调储值账户余额
            adjustAmount ( params ) {
                ajax.post('adjustAmount', params).then(res => {
                    if ( res.success ) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('operate') }) + '！'); // 操作成功
                        this.$emit('add-success');
                        this.hide();
                    } else {
                        this.$Message.warning(res.message ? this.$t(res.message) :
                            'adjustAmount ' + this.$t('failure') + '！');
                    }
                });
            },

            //关闭模态框
            hide () {
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.accountInfo = {};
                this.formData = {
                    accountId : '',
                    accountTypeId : '',
                    corpusOptSign : 'add',
                    corpusAmount : '0',
                    donateOptSign : 'add',
                    donateAmount : '0',
                    reasonId : '',
                    remark : '',
                };
            },
            //查询修改原因
            listAdjustReason () {
                ajax.post('listAdjustReason',{
                    reasonType : 'recharge'
                }).then(res => {
                    if (res.success) {
                        this.reason = res.data || [];
                    } else {
                        this.reason = [];
                    }
                });
            },

        },
        computed : {
            ...mapGetters({
                lang : 'lang'
            }),
            //是否显示赠送账户余额调整
            showDonateAccount () {
                for (let i = 0,j = this.store.length; i < j; i++) {
                    if (this.formData.accountTypeId === this.store[i]['id']) {
                        return this.store[i]['accountDefineId'] === '1';
                    }
                }
                return false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .modify-balance-modal{

        .yellow-color{
            font-size: $font_size_18px;
            color: $color_yellow;
            margin-right: 5px;
        }

        .ivu-form-item-wrap{

            .adjust-type{
                display: inline-block;
            }

            &.bottom-5px /deep/ .ivu-form-item{
                margin-bottom: 5px;
            }

            /deep/ .ivu-select{
                width: 260px;
            }

            /deep/ .ivu-input-wrapper{
                width: 260px;
            }

            /deep/ .ivu-form-item-label{
                word-break: break-all;
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

        .option-label{
            @include overflow_tip();
        }
    }
</style>


