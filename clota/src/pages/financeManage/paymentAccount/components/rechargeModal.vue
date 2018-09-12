<template>
    <!--重置密码-->
    <Modal
        v-model="visible"
        :title="'充值'"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                <!--合作伙伴-->
                <Form-item :label="$t('partner') + ':'" prop="">
                    <span>{{formData.partner}}</span>
                </Form-item>
                <!--充值金额-->
                <Form-item :label="$t('充值金额')" prop="rechargeAmount">
                    <Input v-model.trim="formData.rechargeAmount" :placeholder="$t('inputField', {field: $t('充值金额')})" />
                    <span style="margin-left: 10px;">{{$t('yuan')}}</span>
                </Form-item>
                <!--支付方式-->
                <Form-item :label="$t('支付方式')" prop="">
                    <RadioGroup v-model="formData.payType">
                        <Radio label="zfb">{{$t('ailiPay')}}</Radio><!--支付宝-->
                        <Radio label="wx">{{$t('微信支付')}}</Radio><!--微信支付-->
                    </RadioGroup>
                </Form-item>
                <!--备注-->
                <Form-item :label="$t('remark')" prop="remark" style="margin-bottom: 0;">
                    <Input type="textarea" v-model.trim="formData.remark" :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>

            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="confirm()" >{{$t('confirm')}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import defaultsDeep from 'lodash/defaultsDeep';
    import pick from 'lodash/pick';

    export default {
        props: ['row-data'],
        components: {
        },
        data () {
            let self = this;
            const validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
            };

            return {
                visible: false,
                //表单数据
                formData: {
                    partner: '',
                    rechargeAmount: 0,
                    payType: 'zfb',
                    remark: '',
                },
                //校验规则
                ruleValidate: {
                    rechargeAmount: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('充值金额')}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],

                },
            }
        },
        watch: {

        },
        methods: {

            show ( data ) {
                if( data ){
                    this.formData = defaultsDeep({}, pick(data.item, Object.keys(this.formData)), this.formData);
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
                    partner: '',
                    rechargeAmount: 0,
                    payType: '',
                    remark: '',
                };

            },


            // 确定
            confirm () {
                this.confirmRecharge(this.formData);
            },

            // 确认充值
            confirmRecharge ( params ) {
                /*ajax.post('updateMemberAccountDefine', params).then(res => {
                    if( res.success ) {
                        this.$Message.success(this.$t('操作成功',{'tip' : this.$t('add')}));
                        this.hide();
                        this.$emit('updata-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.error(res.message || this.$t('操作失败',{'tip' : this.$t('add')}));
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
            padding: 4px 14px;

            /deep/ .ivu-from{
                padding-top: 15px;
            }

            /deep/ .ivu-form-item {
                margin-bottom: 10px;

                .ivu-form-item-label {
                    padding: 8px 10px 8px 12px;
                }
                .ivu-form-item-content {
                    line-height: 30px;
                }
            }

            /deep/ .ivu-input-wrapper{
                width: 240px;
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