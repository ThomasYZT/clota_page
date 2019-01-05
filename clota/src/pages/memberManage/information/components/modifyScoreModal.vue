<template>
    <!--会员积分账户修改-->
    <Modal
        v-model="visible"
        :title="$t('integraModification')"
        class-name="modify-score-modal vertical-center-modal"
        :width="lang === 'zh-CN' ? 560 : 650"
        :mask-closable="false"
        @on-cancel="hide"><!--会员积分账户修改-->

        <div class="modal-body">

            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="lang === 'zh-CN' ? 190 : 330">

                <div class="ivu-form-item-wrap bottom-5px">
                    <Form-item :label="$t('userName') + '：'"><!--会员姓名-->
                        {{detail.custName | contentFilter}}
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap bottom-5px">
                    <Form-item :label="$t('currentIntegralAcc') + '：'"><!--会员姓名-->
                        <span class="yellow-color">{{account.accountBalance}}</span>
                        {{$t('integral')}}<!--积分-->
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap double-input">
                    <Form-item :label="$t('integAdjust') + '：'" prop="corpusAmount"><!--账户余额调整-->
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
                                {{$t(accountInfo.unit) | contentFilter}}
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
                                {{accountInfo.unit || ''}}
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
    import { mapGetters } from 'vuex';

    export default {
        props : ['account','detail','card-info'],
        components : {},
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
                        callback(this.$t(err,{ field : this.$t('integAdjust'),length : 10 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('integAdjust') }));
                    }
                });
            };


            //校验积分调整值不可大于总积分
            const validateMaxCorpus = (rule,value,callback) => {
                if (value && this.formData.corpusOptSign === 'sub' && Number(value) > this.account.accountBalance ) {
                    callback(new Error( this.$t('errorGreaterThan', { small : this.$t('integAdjust'), big : this.$t('accountInteg') }) )); // 本金余额不可大于总本金余额
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
                    reasonId : '',//原因id
                    remark : '',
                },
                //表单校验
                ruleValidate : {
                    accountTypeId : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('modifiedAccount') }), trigger : 'change' }, // 修改的账户不能为空
                    ],
                    corpusAmount : [
                        { validator : validateMethod.emoji, trigger : 'blur' }, // 账户余额不能超过10字符
                        { validator : validateNumber, trigger : 'blur' },
                        { validator : validateMaxCorpus, trigger : 'blur' },
                    ],
                    reasonId : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('modifyReason') }), trigger : 'change' }, // 修改原因不能为空
                    ],
                    remark : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('remark') }), trigger : 'blur' }, // 备注不能为空
                        { max : 100, message : this.$t('errorMaxLength', { field : this.$t('remark'), length : 100 }), trigger : 'blur' }, // 备注不能超过100字符
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ],
                },
                //修改原因
                reason : []
            };
        },
        methods : {

            show () {
                this.visible = true;
                this.listAdjustReason();
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        let params = {
                            memberId : this.detail.id,
                            cardId : this.cardInfo ? this.cardInfo.id : '',
                            accountId : this.account.id,
                            accountTypeId : this.account.accountDefineId,
                            amount : this.formData.corpusOptSign === 'sub' ? '-' + this.formData.corpusAmount : this.formData.corpusAmount,
                            donateAmount : '0',
                            reasonId : this.formData.reasonId,
                            remark : this.formData.remark,
                        };
                        this.adjustScore(params);
                    }
                });
            },

            //调积分账户余额
            adjustScore ( params ) {
                ajax.post('adjustScore', params).then(res => {
                    if ( res.success ) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('operate') }) + '！'); // 操作成功
                        this.$emit('add-success');
                        this.hide();
                    } else {
                        this.$Message.warning(res.message ? this.$t(res.message) :
                            'adjustScore ' + this.$t('failure') + '！');
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
                    reasonId : '',
                    remark : '',
                };
            },
            //查询修改原因
            listAdjustReason () {
                ajax.post('listAdjustReason',{
                    reasonType : 'score'
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
            })
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .modify-score-modal{

        .yellow-color{
            font-size: $font_size_18px;
            color: $color_yellow;
            margin-right: 5px;
        }

        .ivu-form-item-wrap{

            &.bottom-5px /deep/ .ivu-form-item{
                margin-bottom: 5px;
            }

            .adjust-type{
                display: inline-block;
            }

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

        .option-label{
            @include overflow_tip();
        }
    }
</style>


