<template>
    <!--编辑城市-->
    <Modal
        v-model="visible"
        :title="$t(title)"
        class-name="edit-city-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">
        <div slot="header" class="target-class">
            <span class="title" >
                {{title}}
            </span>
        </div>

        <div class="modal-body">

            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="100">
                <i-row>
                    <i-col span="22">
                        <div class="">
                            <label class="ivu-form-item-label" style="width: 100px;">{{$t('fatherProvince')}}</label>
                            <div class="ivu-form-item-content">{{operateData.province}}</div>
                        </div>
                    </i-col>
                    <i-col span="22">
                        <FormItem :label="$t('cityName')" prop="name">
                            <Input v-model.trim="formData.name"
                                   :placeholder="$t('inputPlaceholder')"/>
                        </FormItem>
                    </i-col>
                </i-row>
            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >{{$t("confirm")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        props: ['operateData'],
        data () {

            const validateMethod = {
                // 输入内容不合规则
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));
                    } else {
                        callback();
                    }
                }
            };

            return {
                visible: false,
                //标题信息
                title : '',
                //表单数据
                formData: {
                    name: '',
                },
                // 表单校验
                ruleValidate: {
                    name : [
                        {required: true, message : this.$t('validateError.pleaseInput', {msg: this.$t('cityName')}), trigger: 'blur'},
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('cityName'), length: 10}), trigger: 'blur' },
                    ],
                },
                //确认执行的回调函数
                confirmCallback : null,
                //取消执行的回调函数
                cancelCallback : null,
            }
        },
        methods: {

            /**
             * 显示 模态框
             * @param data
             * @param title
             * @param confirmCallback
             * @param cancelCallback
             */
            show ({data,title,confirmCallback = null,cancelCallback}) {
                this.visible = true;
                this.title = title;
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

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if(valid){
                        if(this.confirmCallback){
                            this.confirmCallback( this.formData );
                            this.hide();
                        }
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.formData = { name: '' };
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-city-modal{

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                display: inline-block;
                width: 100%;
                @include overflow_tip(100%);
            }
        }
        & /deep/ .ivu-modal-header {
            padding: 12px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 7px;
        }

        & /deep/ .ivu-modal-body {
            padding: 0;
            position: relative;
            @include block_outline($height: 164px);
        }

        /deep/ .ivu-modal-footer {
            text-align: center;
        }

        .modal-body{
            padding: 50px 40px;

            /deep/ .ivu-input-wrapper{
                width: 280px;
            }
        }

        .modal-footer{
            text-align: center;
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }
    }
</style>

