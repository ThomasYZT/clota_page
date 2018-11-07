<!--设置支付密码-->

<template>
    <Modal
        :title="$t('设置支付交易密码')"
        :mask-closable="false"
        :value="value"
        :width="500"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="set-pay-password"
        class-name="vertical-center-modal">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              :label-width="130">
            <FormItem label="支付密码" prop="password">
                <Input v-model.trim="formData.password"
                       style="width: 240px;"
                       type="password" />
            </FormItem>
            <FormItem label="请确认支付密码" prop="passwordAgain">
                <Input v-model.trim="formData.passwordAgain"
                       style="width: 240px;"
                       type="password" />
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="save">{{$t('save')}}</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            }
        },
        data () {
            //校验支付密码
            const validatePassword = (rule,value,callback) => {
                if (value) {
                    let reg = /^\d{6}$/g;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(this.$t('请输入6位数字支付密码'));
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('支付密码') }));
                }
            };
            //校验第二次输入的密码
            const validatePasswordAgain = (rule,value,callback) => {
                if (value) {
                    if (value !== this.formData.password) {
                        callback(this.$t('paswordMustBeEqual'));
                    } else {
                        let reg = /^\d{6}$/g;
                        if (reg.test(value)) {
                            callback();
                        } else {
                            callback(this.$t('请输入6位数字支付密码'));
                        }
                    }
                } else {
                    callback(this.$t('inputPasswordAgain'));
                }
            };
            return {
                //校验规则
                ruleValidate : {
                    password : [
                        {
                            required : true,
                            validator : validatePassword,
                            trigger : 'blur'
                        }
                    ],
                    passwordAgain : [
                        {
                            required : true,
                            validator : validatePasswordAgain,
                            trigger : 'blur'
                        }
                    ]
                },
                //表单数据
                formData : {
                    //第一次输入的密码
                    password : '',
                    //第二次输入的密码
                    passwordAgain : ''
                }
            };
        },
        methods : {
            /**
             * 绑定的value值改变
             * @param{Boolean} data  当前状态
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框状态改变
             * @param{Boolean} type 当前显示的zhuagnt
             */
            visibleChange (type) {
                if (type === false) {
                    this.$refs.formValidate.resetFields();
                }
            },
            /**
             * 取消操作，隐藏模态框
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 保存支付密码
             */
            save () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.$emit('set-pay-password',this.formData.password);
                        this.$emit('input', false);
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .set-pay-password{

        /deep/ .ivu-form{
            width: 400px;
            margin: 0 auto;
        }

        /deep/ .ivu-modal-body{
            display: flex;
            align-items: center;
            min-height: 200px;
            padding-top: 40px;
        }
    }
</style>
