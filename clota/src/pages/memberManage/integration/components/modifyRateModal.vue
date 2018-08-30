'<template>
    <!--会员管理--会员积分--总体积分率折扣率设置-->
    <Modal
        v-model="visible"
        :title="title"
        class-name="set-rate-modal vertical-center-modal"
        width="520"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="110">
                <slot></slot>
                <div class="ivu-form-item-wrap">
                    <i-row>
                        <i-col span="20">
                            <Form-item :label="$t('IntegralRate')" prop="scoreRate">
                                <Input v-model.trim="formData.scoreRate"
                                       style="width: 190px"
                                       :placeholder="$t('inputPlaceholder')"/>
                                <span class="font">{{$t('yuan')}}  <span class="equil">=</span></span>
                            </Form-item>
                        </i-col>
                        <i-col span="2">
                            <div class="integral-rate">
                                <span class="font">{{formData.integRate}}{{$t('integral')}}</span>
                            </div>
                        </i-col>
                    </i-row>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('discountRate')" prop="discountRate">
                        <Input v-model.trim="formData.discountRate"
                               style="width: 320px;"
                               :placeholder="$t('inputPlaceholder')"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap textarea-wrap">
                    <Form-item :label="$t('remark')" prop="remark">
                        <Input v-model.trim="formData.remark"
                               type="textarea"
                               style="width: 320px;"
                               :placeholder="$t('inputPlaceholder')"/>
                    </Form-item>
                </div>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary"
                    :btnLoading="btnLoading"
                    @click="formValidateFunc">{{$t('save')}}</Button>
            <Button type="ghost" @click="hide">{{$t('cancel')}}</Button>
        </div>

    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    import {validator} from 'klwk-ui';
    import common from '@/assets/js/common';

    export default {
        props : {
            //成功回调函数
            'confirm-operate' : {
                type : Function,
                default : new Function ()
            },
            //标题
            'title' : {
                type : String,
                default : ''
            },
            //当前操作的积分、折扣率信息
            'integra-data':{
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components: {},
        data () {
            //校验消费金额是否正确
            const validateConsumption = (rule,value,callback) =>{
                common.validateMoney(value).then(() => {
                    callback();
                }).catch(err => {
                    if(err === 'errorMaxLength'){
                        callback(this.$t('errorMaxLength',{field : this.$t('IntegralRate'),length : 10}));
                    }else{
                        callback(this.$t(err,{field : this.$t('IntegralRate')}));
                    }
                });
            };
            //校验折扣率是否正确
            const validateDiscount = (rule,value,callback) => {
                if(this.notEmpty(value)){
                    if(validator.isNumber(value)){
                        if(value > 0 && value < 1){
                            callback();
                        }else{
                            callback(this.$t('discountError'));
                        }
                    }else{
                        callback(this.$t('numError',{field : this.$t('discountRate')}));
                    }
                }else{
                    callback(this.$t('inputField',{field : this.$t('discountRate')}));
                }
            };
            return {
                //模态框是否显示
                visible: false,
                //表单数据
                formData: {
                    //兑换1积分需要的钱
                    scoreRate : '',
                    //兑换积分
                    integRate: '1',
                    //折扣率
                    discountRate: '',
                    //备注
                    remark: '',
                },
                //表单校验规则
                ruleValidate: {
                    discountRate: [
                        { required: true, validator : validateDiscount, trigger: 'blur' },
                    ],
                    scoreRate : [
                        {required : true, validator : validateConsumption,trigger : 'blur'}
                    ],
                    remark : [
                        {max : 100,message : this.$t('errorMaxLength',{field : this.$t('remark'),length : 100}),trigger : 'blur'}
                    ]
                },
                //会员级别对应的id
                levelIds : '',
                //按钮在加载中
                btnLoading : false
            }
        },
        methods: {

            /**
             * 模态框显示
             * @param levelIds 会员级别id
             */
            show (levelIds) {
                this.levelIds = levelIds;
                this.visible = true;
                this.formData.discountRate = this.integraData.discountRate;
                this.formData.remark = this.integraData.remark;
                this.formData.scoreRate = this.integraData.scoreRate;
            },

            /**
             * 表单校验
             */
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        if(this.confirmOperate){
                            this.btnLoading = true;
                            this.confirmOperate({
                                levelIds : this.levelIds,
                                discountRate : this.formData.discountRate,
                                scoreRate : this.formData.scoreRate,
                                remark : this.formData.remark,
                            },() => {
                                this.btnLoading = false;
                                this.hide();
                            });
                        }
                    }
                })
            },

            /**
             * 关闭模态框
             */
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
            },


            /**
             * 判断val是否为空
             * @param val
             */
            notEmpty(val) {
                return val !== null && val !== '' && val !== undefined;
            }
        },
        watch : {
            //实时监测当前操作的积分率和折扣率信息，并且赋值给当前的组件
            integraData (newVal,oldVal) {
                if(newVal && Object.keys(newVal).length > 0){
                    this.formData.discountRate = newVal.discountRate;
                    this.formData.remark = newVal.remark;
                    this.formData.scoreRate = newVal.scoreRate;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .set-rate-modal{

        .integral-rate{
            height: 32px;
            line-height: 32px;
            font-size: 14px;
        }

        .modal-body{
            padding: 20px 25px 0 25px;
            min-height: 260px;
            display: flex;
            align-items: center;

            /deep/ .ivu-input-wrapper{
                width: 160px;
                margin-right: 5px;
            }
            .equil{
                margin-left: 10px;
            }

            .textarea-wrap{
                /deep/ .ivu-input-wrapper{
                    width: 320px;
                }
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

        /deep/ .ivu-modal-body{
            min-height: 300px;
            display: flex;
            align-items: center;
        }
    }
</style>
