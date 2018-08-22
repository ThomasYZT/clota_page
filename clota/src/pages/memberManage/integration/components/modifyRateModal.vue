'<template>
    <!--会员管理--会员积分--总体积分率折扣率设置-->
    <Modal
        v-model="visible"
        :title="title"
        class-name="set-rate-modal vertical-center-modal"
        width="600"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="80">
                <div class="ivu-form-item-wrap">
                    <i-row>
                        <i-col span="14">
                            <Form-item :label="$t('IntegralRate')" prop="consumption">
                                <Input v-model.trim="formData.consumption" :placeholder="$t('inputPlaceholder')"/>
                                <span class="font">{{$t('yuan')}}  <span class="equil">=</span></span>
                            </Form-item>
                        </i-col>
                        <i-col span="10">
                            <Form-item prop="integRate" :label-width="10">
                                <Input v-model.trim="formData.integRate" :placeholder="$t('inputPlaceholder')"/>
                                <span class="font">{{$t('integral')}}</span>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('discountRate')" prop="discountRate">
                        <Input v-model.trim="formData.discountRate" :placeholder="$t('inputPlaceholder')"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap textarea-wrap">
                    <Form-item :label="$t('remark')" prop="remark">
                        <Input v-model.trim="formData.remark"
                               type="textarea"
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
            }
        },
        components: {},
        data () {
            //校验兑换积分数是否合法
            const validateIntegRate = (rule,value,callback) => {
                if(this.notEmpty(value)){
                    if(validator.isNumber(value)){
                        if(value > 0){
                            callback();
                        }else{
                            callback('积分数必须大于0');
                        }
                    }else{
                        callback(this.$t('errorFormat',{filed : this.$t('integral')}));
                    }
                }else{
                    callback(this.$t('inputField',{filed : this.$t('integral')}));
                }
            };
            //校验消费金额是否正确
            const validateConsumption = (rule,value,callback) =>{
                if(this.notEmpty(value)){
                    if(validator.isNumber(value)){
                        if(value > 0){
                            callback();
                        }else{
                            callback(this.$t('mustBigThenZero',{filed : this.$t('consumption')}));
                        }
                    }else{
                        callback(this.$t('errorFormat',{filed : this.$t('consumption')}));
                    }
                }else{
                    callback(this.$t('inputField',{filed : this.$t('integral')}));
                }
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
                        callback(this.$t('errorFormat',{filed : this.$t('discountRate')}));
                    }
                }else{
                    callback(this.$t('inputField',{filed : this.$t('discountRate')}));
                }
            };
            return {
                //模态框是否显示
                visible: false,
                //表单数据
                formData: {
                    //消费
                    consumption : '',
                    //兑换积分
                    integRate: '',
                    //折扣率
                    discountRate: '',
                    //备注
                    remark: '',
                },
                //表单校验规则
                ruleValidate: {
                    integRate: [
                        { required: true, validator : validateIntegRate, trigger: 'blur' },
                    ],
                    discountRate: [
                        { required: true, validator : validateDiscount, trigger: 'blur' },
                    ],
                    consumption : [
                        {required : true, validator : validateConsumption,trigger : 'blur'}
                    ],
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
                                scoreRate : this.scoreRate,
                            },() => {
                                this.btnLoading = false;
                                this.hide();
                            });
                        }
                        // this.setMemberDiscountOfMember();
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
        computed : {
            //积分率
            scoreRate () {
                if(this.notEmpty(this.formData.integRate) && this.notEmpty(this.formData.consumption)){
                    return Number.parseFloat(Number(this.formData.integRate / this.formData.consumption).toFixed(2));
                }else{
                    return '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .set-rate-modal{

        .modal-body{
            padding: 64px 25px;

            /deep/ .ivu-input-wrapper{
                width: 160px;
                margin-right: 5px;
            }
            .equil{
                margin-left: 10px;
            }

            .textarea-wrap{
                /deep/ .ivu-input-wrapper{
                    width: 390px;
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
