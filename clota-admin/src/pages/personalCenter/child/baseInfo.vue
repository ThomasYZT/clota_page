<!--基本信息-->

<template>
    <div class="base-info">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              :label-width="80">
            <FormItem :label="$t('accountName')">
                {{formData.account}}
            </FormItem>
            <FormItem :label="$t('name')" prop="name">
                <Input v-model.trim="formData.name"/>
            </FormItem>
            <FormItem :label="$t('phone')" prop="phone">
                <Input v-model.trim="formData.phone"/>
            </FormItem>
            <FormItem :label="$t('mail')" prop="mail">
                <Input v-model.trim="formData.mail"/>
            </FormItem>
            <FormItem :label="$t('role')">
                {{formData.roles}}
            </FormItem>
        </Form>
        <div class="footer">
            <Button type="primary"
                    :loading="isSaving"
                    class="ivu-btn-90px"
                    @click="handleSubmit">
                {{$t('save')}}
            </Button>
        </div>
    </div>
</template>

<script>
    import { validator } from 'klwk-ui';
    import ajax from '@/api/index.js';
    export default {
        data () {
            //校验姓名格式
            const validateName = (rule,value,callback) => {
                if (value) {
                    let nameStr = String(name);
                    if (nameStr.length > 20) {
                        callback(this.$t('validateError.lengthError',{
                            name : this.$t('name'),
                            length : 20
                        }));
                    } else {
                        callback();
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput',{ msg : this.$t('name') }));
                }
            };
            //校验联系电话
            const validatePhone = (rule,value,callback) => {
                if (value) {
                    if (validator.isMobile(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.formatError',{ field : this.$t('phone') }));
                    }
                } else {
                    callback();
                }
            };
            //校验邮箱
            const validateMail = (rule,value,callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.formatError',{ field : this.$t('mail') }));
                    }
                } else {
                    callback();
                }
            };
            return {
                //表单数据
                formData : {
                    //账号
                    account : '',
                    //姓名
                    name : '',
                    //电话
                    phone : '',
                    //邮箱
                    mail : '',
                    //角色
                    roleId : '',
                    //角色
                    roles : '',
                    id : ''
                },
                loginName : '',
                //表单校验规则
                ruleValidate : {
                    name : [
                        { required : true,validator : validateName ,trigger : 'blur' }
                    ],
                    phone : [
                        { required : true,validator : validatePhone ,trigger : 'blur' }
                    ],
                    mail : [
                        { required : false,validator : validateMail ,trigger : 'blur' }
                    ]
                },
                //是否在保存中
                isSaving : false
            };
        },
         created () {
            this.getSysAccountByToken();
        },
        methods : {
            /**
             * 保存基本信息
             */
               getSysAccountByToken () {
                return ajax.post('getSysAccountByToken',).then(res => {
                    if (res.status === 200) {
                        this.formData.id = res.data.id;
                        this.formData.account = res.data.loginName;
                        this.formData.name = res.data.nickName;
                        this.formData.phone = res.data.phone;
                        this.formData.mail = res.data.email;
                        this.formData.roleId = res.data.roleId;
                        this.formData.roles = res.data.roleName;
                    }
                });
            },
            handleSubmit () {
                 this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.save();
                    }
                });
            },
            save () {
                this.isSaving = true;
                let AccountInformation = {
                      id : this.formData.id,
                      nickName : this.formData.name,
                      phone : this.formData.phone,
                      email : this.formData.mail,
                      roleId : this.formData.roleId
                 };
                 ajax.post('updateAccountInfo',AccountInformation).then(res => {
                    if (res.status === 200) {
                        this.$Message.success('修改基本信息成功');
                        this.resetFormData();
                    } else {
                        this.$Message.error(res.message || '修改基本信息失败');
                    }
                }).finally(() => {
                     this.isSaving = false;
                 });
            },
            /**
             * 保存信息到后台
             */
            saveInfo () {

            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .base-info{
        @include block_outline(500px,auto);
        margin: 0 auto;

        .footer{
            text-align: center;
        }
    }
</style>
