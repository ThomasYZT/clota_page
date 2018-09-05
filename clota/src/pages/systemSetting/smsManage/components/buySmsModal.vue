<template>
    <!--购买短信套餐-->
    <Modal
        v-model="visible"
        :title="'购买短信套餐'"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                <!--短信套餐名称-->
                <Form-item :label="$t('短信套餐名称') + '：'" prop="">
                    <span>{{formData.packageName}}</span>
                </Form-item>
                <!--套餐价格-->
                <Form-item :label="$t('套餐价格') + '：'" prop="">
                    <span>￥{{formData.packagePrice | moneyFilter}}</span>
                </Form-item>
                <!--短信数量-->
                <Form-item :label="$t('短信数量') + '：'" prop="">
                    <span>{{formData.smsCount | contentFilter}}条</span>
                </Form-item>
                <!--短信供应商-->
                <Form-item :label="$t('短信供应商') + '：'" prop="">
                    <span>{{formData.smsProvider | contentFilter}}</span>
                </Form-item>
                <!--支付方式-->
                <Form-item :label="$t('支付方式') + '：'" prop="">
                    <RadioGroup v-model="formData.payType" @on-change="onTypeChanged">
                        <Radio label="zfb">{{$t('ailiPay')}}</Radio><!--支付宝-->
                        <Radio label="wx">{{$t('微信支付')}}</Radio><!--微信支付-->
                    </RadioGroup>
                </Form-item>

            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="buyNow()" >{{$t('立即购买')}}</Button>
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
                formData: {
                    packageName: '',
                    packagePrice: '',
                    smsCount: 0,
                    smsProvider: '',
                    payType: 'zfb',
                },
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
                    this.formData = defaultsDeep({}, data.item, this.formData);
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
                    packageName: '',
                    packagePrice: '',
                    smsCount: 0,
                    smsProvider: '',
                    payType: 'zfb',
                };

            },

            //
            onTypeChanged() {},

            // 立即购买
            buyNow ( params ) {
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
