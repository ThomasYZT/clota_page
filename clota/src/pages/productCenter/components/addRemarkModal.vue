<template>
    <!--新增备注弹窗-->
    <Modal
        v-model="visible"
        :title="$t('add')+$t('remark')"
        class-name="add-remark-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="110">
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('remark') + '：'" prop="remark"><!--备注-->
                        <Input v-model.trim="formData.remark" type="textarea" :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="confirm" >{{$t("save")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        components: {},
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

            return {
                visible: false,
                //确认执行的回调函数
                confirmCallback : null,
                //取消执行的回调函数
                cancelCallback : null,
                //表单数据
                formData: {
                    remark: '',
                },
                // 表单校验
                ruleValidate: {
                    remark: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 100, message: this.$t('errorMaxLength', {field: this.$t('remark'), length: 100}), trigger: 'blur' },     // 备注不能超过100字符
                    ],
                }
            }
        },
        methods: {

            /**
             * 显示 模态框
             * @param data
             * @param confirmCallback
             * @param cancelCallback
             */
            show ({data,confirmCallback = null,cancelCallback}) {
                this.visible = true;
                if(data){
                    this.formData = defaultsDeep({}, data);
                }
                if(confirmCallback && typeof confirmCallback == 'function'){
                    this.confirmCallback = confirmCallback;
                }
                if(cancelCallback && typeof cancelCallback == 'function'){
                    this.cancelCallback = cancelCallback;
                }
            },


            /**
             * 确认
             */
            confirm() {
                //表单校验
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        if(this.confirmCallback){
                            this.confirmCallback( this.formData.remark );
                            this.hide();
                        }
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.formData = { remark: '' };
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-remark-modal{

        .modal-body{
            padding: 50px 40px;

            /deep/ .ivu-input-wrapper{
                width: 280px;
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }
    }
</style>

