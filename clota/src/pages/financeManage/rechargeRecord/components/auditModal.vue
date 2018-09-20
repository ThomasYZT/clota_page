<template>
    <!--充值审核-->
    <Modal
        v-model="visible"
        :title="'充值审核'"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                <!--付款方-->
                <Form-item :label="$t('付款方') + '：'" prop="">
                    <span>{{formData.peerOrgName}}</span>
                </Form-item>
                <!--支付方式-->
                <Form-item :label="$t('支付方式') + '：'" prop="">
                    <span>{{formData.paymentType | contentFilter}}</span>
                </Form-item>
                <!--充值金额-->
                <Form-item :label="$t('充值金额') + '：'" prop="">
                    <span>{{formData.amount | moneyFilter}}</span>
                </Form-item>
                <!--交易流水号-->
                <Form-item :label="$t('交易流水号') + '：'" prop="">
                    <span>{{formData.tpOrderNo | contentFilter}}</span>
                    <Tooltip placement="top">
                        <i class="iconfont icon-help"></i>
                        <div slot="content">
                            <div class="tip-trade">{{$t('仅当使用微信支付或支付宝时展示交易流水号。')}}</div>
                        </div>
                    </Tooltip>
                </Form-item>
                <!--备注-->
                <Form-item :label="$t('remark') + '：'" prop="">
                    <div>{{formData.remark}}</div>
                </Form-item>
            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="confirm()" >{{$t('审核通过')}}</Button>
            <Button type="error" @click="cancel()" >{{$t('驳回')}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        props: ['row-data'],
        components: {},
        data () {
            return {
                visible: false,
                //表单数据
                formData: {},
                //校验规则
                ruleValidate: {

                },

            }
        },
        watch: {

        },
        methods: {
            show ( data ) {
                if( data ){
                    this.formData = defaultsDeep(this.formData, data.item);
                }
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if(valid){

                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.formData = {
                    payer: '',
                    rechargeAmount: 0,
                    rechargeType: '',
                    transactionNo: '',
                    remark: '',
                };

            },

            // 确认
            confirm () {
                //审核通过
                this.passAudit(this.formData);

            },

            // 取消
            cancel() {
                //驳回
                this.rejectRecharge(this.formData);
            },

            //驳回
            rejectRecharge(params) {
                ajax.post('rejectRecharge', {
                    rechargeId: params.id,
                    remark: this.formData.remark
                }).then(res => {
                    if( res.success ) {
                        this.$Message.success(this.$t('操作成功',{'tip' : this.$t('add')}));
                        this.hide();
                        this.$emit('update-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.error(res.message || this.$t('操作失败',{'tip' : this.$t('add')}));
                    }
                })
            },

            //审核通过
            passAudit(params) {
                console.log(params)
                ajax.post('passRecharge', {
                    rechargeId: params.id,
                    remark: this.formData.remark
                }).then(res => {
                    console.log(res)
                    if( res.success ) {
                        this.$Message.success(this.$t('操作成功',{'tip' : this.$t('add')}));
                        this.hide();
                        this.$emit('update-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.error(res.message || this.$t('操作失败',{'tip' : this.$t('add')}));
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 14px 14px 24px 14px;

            /deep/ .ivu-from{
                padding-top: 15px;
            }

            /deep/ .ivu-form-item {
                margin-bottom: 0;

                .ivu-form-item-label {
                    padding: 8px 10px 8px 12px;
                }
                .ivu-form-item-content {
                    line-height: 24px;
                }
            }

            .tip-trade {
                width: 220px;
                white-space: normal;
            }

        }

        .modal-footer{
            /deep/ .ivu-btn{
                width: 88px;
            }
        }

    }
</style>
