<!--删除模态框-->

<template>
    <Modal
        title="Title"
        v-model="modalShow"
        :mask-closable="false"
        @on-visible-change="visibleChange"
        class="del-node"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >
                {{title}}
            </span>
        </div>
        <div class="warn-info">
            <slot>
                <Form :model="formData" ref="formRef" label-position="top" :rules="ruleValidate" :label-width="0">
                    <FormItem :label="title" prop="passWord">
                        <Input v-model="formData.passWord" type="password" style="width: 280px"/>
                    </FormItem>
                </Form>
            </slot>
        </div>
        <div slot="footer">
            <Button type="primary" class="ivu-btn-90px" @click="confirm">{{confirmBtn}}</Button>
            <Button class="ivu-btn-90px" @click="cancel">{{cancelBtn}}</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props : {
        },
        data () {
            //校验密码
            const validatePass = (rule,value,callback) => {
                if (value) {
                    let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(this.$t('passwordError'));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput',{ msg : this.title }));
                }
            };
            return {
                //标题信息
                title : '',
                //是否显示模态框
                modalShow : false,
                //确认执行的回调函数
                confirmCallback : null,
                //取消执行的回调函数
                cancelCallback : null,
                //表单数据
                formData : {
                    passWord : ''
                },
                //校验规则
                ruleValidate : {
                    passWord : [
                        { required : true,validator : validatePass ,trigger : 'blur' }
                    ]
                },
                //确认文本
                confirmBtn : '',
                //取消文本
                cancelBtn : '',
            };
        },
        methods : {
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange (type) {
                if (type === false) {
                    if (this.$refs.formRef) {
                        this.$refs.formRef.resetFields();
                        this.formData.passWord = '';
                    }
                    if (this.cancelCallback) {
                        this.cancelCallback();
                    }
                }
            },
            /**
             * 取消删除
             */
            cancel () {
                this.hide();
            },
            /**
             * 确认删除
             */
            confirm () {
                if (this.$refs.formRef) {
                    this.$refs.formRef.validate(valid => {
                        if (valid) {
                            this.modalShow = false;
                            if (this.confirmCallback) {
                                this.confirmCallback(this.formData.passWord);
                            }
                        }
                    });
                } else {
                    if (this.confirmCallback) {
                        this.confirmCallback(this.formData.passWord);
                    } else {
                        this.cancel();
                    }
                }
            },
            /**
             * 显示 模态框
             * @param msg
             * @param confirmCallback
             * @param cancelCallback
             */
            show ({ title,confirmCallback = null,cancelCallback,confirmBtn = this.$t('confirm'),cancelBtn = this.$t('cancel') }) {
                this.modalShow = true;
                this.title = title;
                this.confirmBtn = confirmBtn;
                this.cancelBtn = cancelBtn;
                if (confirmCallback && typeof confirmCallback == 'function') {
                    this.confirmCallback = confirmCallback;
                }
                if (cancelCallback && typeof cancelCallback == 'function') {
                    this.cancelCallback = cancelCallback;
                }
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.modalShow = false;
                if (this.cancelCallback) {
                    this.cancelCallback();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .del-node {
        & /deep/ .ivu-modal {
            width: 420px !important;
            height: 280px;
        }

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

        .warn-info {
            @include center_center();
            font-size: $font_size_14px;
            color: $color_333;
            text-align: left;

            .red-label {
                color: $color_err;
            }

            /deep/ .ivu-form-item{
                margin-bottom: 0!important;
            }
        }
    }
</style>
