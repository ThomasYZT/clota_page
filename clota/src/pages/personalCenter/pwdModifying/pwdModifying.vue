<!--
内容：修改密码
作者：djc
日期：
-->

<template>
    <div class="pwd-modifying">
        <h3>{{$t('pwdModifying')}}</h3><!--修改密码-->

        <div class="form-container">
            <Form ref="formValidate"
                  :model="pwdForm"
                  :rules="ruleValidate"
                  label-position="top">

                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('旧密码')" prop="oldPassword"><!--旧密码-->
                        <Input v-model.trim="pwdForm.oldPassword"
                               type="password"
                               :placeholder="$t('inputField', {field: $t('旧密码')})"/>
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('新密码')" prop="newPassword"><!--新密码-->
                        <Input v-model.trim="pwdForm.newPassword"
                               type="password"
                               :placeholder="$t('inputField', {field: $t('password')})"/>
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('确认密码')" prop="rePassword"><!--确认密码-->
                        <Input v-model.trim="pwdForm.rePassword"
                               type="password"
                               :placeholder="$t('请再次输入密码')"/>
                    </Form-item>
                </div>

            </Form>
        </div>

        <div class="content-footer">
            <Button type="primary"
                    :loading="loading"
                    @click="formValidateFunc">
                {{$t('提交')}}
            </Button>
            <Button type="ghost"
                    @click="resetField()">
                {{$t("reset")}}
            </Button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        components: {},
        props: {},
        data() {
            let self = this;
            const validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
                // 校验再次输入的密码是否与新密码相同
                isEqNewPwd: (rule, value, callback) => {
                    if (value != self.pwdForm.newPassword) {
                        callback(new Error( this.$t('再次输入的密码与新密码不同') ));    // 输入的密码与新密码不同
                    } else {
                        callback();
                    }
                },

            };

            return {
                // 表单数据绑定
                pwdForm: {
                    oldPassword: '',
                    newPassword: '',
                    rePassword: '',
                },
                loading: false,
                // 校验规则
                ruleValidate: {
                    oldPassword: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('旧密码')}), trigger: 'blur'},     // 旧密码不能为空
                        {validator: validateMethod.emoji, trigger: 'blur'}
                    ],
                    newPassword: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('新密码')}), trigger: 'blur'},     // 新密码不能为空
                        {validator: validateMethod.emoji, trigger: 'blur'}
                    ],
                    rePassword: [
                        { required: true, message: this.$t('请再次输入密码'), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateMethod.isEqNewPwd, trigger: 'blur' },
                    ],

                },

                // 空的表单字段内容
                emptyPwdForm: {},
            }
        },
        computed: {},
        created() {
            this.emptyPwdForm = JSON.stringify(this.pwdForm);
        },
        mounted() {
        },
        watch: {},
        methods: {
            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if(valid){

                    }
                })
            },

            // 重置表单字段内容
            resetField() {
                Object.assign(this.pwdForm, JSON.parse(this.emptyPwdForm));
            },
        }
    };
</script>

<style lang="scss" scoped>

    .pwd-modifying {
        > h3 {
            font-family: PingFangSC-Medium;
            margin: 18px 0;
            font-size: 20px;
            color: rgba(0, 0, 0, 0.85);
        }
    }

    .form-container {
        margin: 40px 0 60px 0;

        .ivu-form-item-wrap{
            position: relative;
            /*min-width: 495px;*/
            /*width: 49%;*/
            text-align: left;
            vertical-align: middle;

            .ivu-form-item{
                width: 280px;
                text-align: left;
            }
        }
    }

    .content-footer{

        /deep/ .ivu-btn{
            width: 108px;
            &:nth-child(1){
                margin-right: 20px;
            }
        }

    }

</style>
