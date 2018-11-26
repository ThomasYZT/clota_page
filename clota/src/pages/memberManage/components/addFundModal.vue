<template>
    <div>
        <!--新增储值-->
        <Modal
            v-model="visible"
            :title="$t('newStorageValue')"
            class-name="add-fund-modal vertical-center-modal"
            :width="lang === 'zh-CN' ? 560 : 680"
            :mask-closable="false"
            @on-visible-change="visibleChange"
            @on-cancel="hide">

            <div class="modal-body">

                <Form ref="formValidate"
                      :model="formData"
                      :rules="ruleValidate"
                      :label-width="lang === 'zh-CN' ? 150 : 240">
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('userName') + ':'">
                            {{detail.custName | contentFilter}}
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('storageAccount') + ':'">
                            {{accountInfo.accountName | contentFilter}}
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('PrincipalAccBalance') + ':'">
                      <span class="yellow-color">
                        {{accountInfo.corpusBalance ? accountInfo.corpusBalance.toCurrency() : '0'}}
                    </span>{{accountInfo.unit || ''}}
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('giftAccBalance') + ':'">
                        <span class="yellow-color">
                        {{accountInfo.donateBalance | moneyFilter | contentFilter }}
                        </span>{{accountInfo.unit}}
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap double-input">
                        <Form-item :label="$t('increaseStorageSum') + '：'" prop="amount">
                            <!--@on-blur="getTotalAmount"-->
                            <Input v-model.trim="formData.amount"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span class="font">{{$t('actualIncrease')}}</span>
                            <Input disabled :value="formData.totalAmount" :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{accountInfo.unit}}</span>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('paymentMethod') + '：'" prop="paymentTypeId">
                            <!--会员3期暂时去掉-->
                            <!--<Select v-model="formData.paymentTypeId" :placeholder="$t('selectField', {msg: ''})">-->
                            <!--<Option v-for="(item,index) in paymentList" :key="index" :value="item.id">-->
                            <!--{{item.payment}}-->
                            <!--</Option>-->
                            <!--</Select>-->
                            <RadioGroup v-model="formData.paymentTypeId">
                                <Radio label="weixin">{{$t('weChat')}}</Radio><!--微信-->
                                <Radio label="alipay">{{$t('ailiPay')}}</Radio><!--支付宝-->
                                <Radio label="cash">{{$t('_cash')}}</Radio><!--现金-->
                            </RadioGroup>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('remark') + '：'" prop="remark">
                            <Input v-model.trim="formData.remark" type="textarea" :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                </Form>
            </div>

            <div slot="footer" class="modal-footer">
                <Button type="primary" @click="formValidateFunc" >{{$t("save")}}</Button>
                <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
            </div>

        </Modal>
        <!--查询支付结果模态框-->
        <loop-for-pay-result v-model="payModalShow"
                             ref="payResultModal"
                             :transaction-id="transctionId"
                             @search-success="paySuccess"
                             @start-pay="statPay">
        </loop-for-pay-result>
    </div>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import { mapGetters } from 'vuex';
    import loopForPayResult from '../../../components/loopForPayResult/loopForPayResult';

    export default {
        props : ['payment-list','detail','card-info'],
        components : {
            loopForPayResult
        },
        data () {

            const validateMethod = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(this.$t('errorIrregular'));
                    } else {
                        callback();
                    }
                },
            };

            //校验正整数
            const validateNumber = (rule,value,callback) => {
                common.validateMoney(value).then(() => {
                    this.getTotalAmount();
                    if (value == 0) {
                        callback(this.$t('fieldTypeError',{ field : this.$t('storageSum') }));
                    } else {
                        callback();
                    }
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t('errorMaxLength',{ field : this.$t('storageSum'),length : 10 }));
                    } else if (err === 'moneyError') {
                        callback(this.$t('fieldTypeError',{ field : this.$t('storageSum') }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('storageSum') }));
                    }
                });
            };

            return {
                visible : false,
                //会员信息的账户数据
                accountInfo : {},
                //表单数据
                formData : {
                    amount : '',//储值金额
                    totalAmount : '',//实际增加金额
                    paymentTypeId : 'weixin',//支付方式
                    remark : '',
                },
                //表单校验
                ruleValidate : {
                    amount : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('storageSum') }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' },
                    ],
                    paymentTypeId : [
                        { required : true, message : this.$t('selectField',{ msg : this.$t('paymentMethod') }), trigger : 'change' },
                    ],
                    remark : [
                        { max : 100, message : this.$t('errorMaxLength',{ field : this.$t('remark'),length : 100 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ],
                },
                //支付模态框是否显示
                payModalShow : false,
                //交易id
                transctionId : ''
            };
        },
        methods : {

            show ( data ) {
                if ( data ) {
                    this.accountInfo = data;
                }
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        if (this.formData.paymentTypeId === 'cash') {
                            this.addAmount();
                        } else {
                            this.payModalShow = true;
                        }
                        // 会员3期暂时去掉
                        // let params = {
                        //     memberId : this.detail.id,
                        //     // 会员3期暂时去掉
                        //     // cardId : this.detail.cardId,
                        //     cardId : this.accountInfo.cardId,
                        //     amount : this.formData.amount,
                        //     paymentTypeId : this.formData.paymentTypeId,
                        //     accountTypeId : this.accountInfo.accountDefineId,
                        //     remark : this.formData.remark,
                        // };
                        // this.addAmount(params);
                    }
                });
            },

            //新增储值
            addAmount ( code ) {
                ajax.post('addAmount', {
                    memberId : this.detail.id,
                    memberLevelId : this.detail.levelId,
                    // 会员3期暂时去掉
                    // cardId : this.detail.cardId,
                    cardId : this.cardInfo.id,
                    amount : this.formData.amount,
                    // 会员3期暂时去掉
                    // paymentTypeId : this.formData.paymentTypeId,
                    accountTypeId : this.accountInfo.accountDefineId,
                    remark : this.formData.remark,
                    paymentType : this.formData.paymentTypeId,
                    qrCode : code ,
                    txnAmt : this.formData.amount,
                }).then(res => {
                    if ( res.success ) {
                        this.$refs.payResultModal.setStage('success');
                        this.payModalShow = true;
                        this.$emit('add-success');
                    } else if (res.code === 'P002') {
                        this.startSearchForPayResult({
                            ...(res.data ? res.data : {})
                        });
                    } else {
                        this.$refs.payResultModal.setStage('fail');
                    }
                }).finally(() => {
                    this.hide();
                });
            },

            //失焦获取实际金额
            getTotalAmount () {
                let params = {
                    accountTypeId : this.accountInfo.accountDefineId,
                    amount : this.formData.amount,
                    cardId : this.cardInfo.id,
                };
                this.getRechargeActMoney(params);
            },

            //充值时获取实际所得到的金额
            getRechargeActMoney ( params ) {
                ajax.post('getRechargeActMoney', params,null,false).then(res => {
                    if ( res.success ) {
                       this.formData.totalAmount = res.data;
                    } else {
                        this.$Message.warning(res.message || 'getRechargeActMoney ' + this.$t('failure') + '！');
                    }
                });
            },

            //关闭模态框
            hide () {
                this.visible = false;
            },
            /**
             * 支付成功
             */
            paySuccess () {
                this.$emit('add-success');
                this.hide();
            },
            /**
             * 开始支付
             * @param{String} code
             */
            statPay (code) {
                this.addAmount(code);
            },
            /**
             * 开启查询支付结果
             * @param{Object} transctionId 内部交易id
             */
            startSearchForPayResult ({ transctionId }) {
                this.transctionId = transctionId;
                this.$refs.payResultModal.startSearchPayResult();
            },
            /**
             * 模态框状态改变
             * @param type
             */
            visibleChange (type) {
                if (type === false) {
                    this.$refs.formValidate.resetFields();
                    this.accountInfo = {};
                    this.formData.totalAmount = '';
                }
            }

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
    .add-fund-modal{

        .modal-body{
            padding: 20px 0 ;
        }

        .ivu-form-item-wrap{

            /deep/ .ivu-select{
                width: 315px;
            }

            /deep/ .ivu-input-wrapper{
                width: 315px;
            }

            /deep/ .ivu-form-item-label{
                word-break: break-all;
            }

            &.double-input{
                /deep/ .ivu-input-wrapper{
                    width: 120px;
                    margin-right: 5px;
                }
                .font{
                    margin-right: 5px;
                }
            }
        }

        .yellow-color{
            color: $color_yellow;
            font-size: $font_size_18px;
            margin-right: 5px;
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>

