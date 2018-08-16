<!--修改密码-->

<template>
    <div class="change-pass">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              :label-width="120">
            <FormItem :label="$t('validateError.pleaseInput',{msg : $t('password',{msg : $t('now')})})"
                      prop="password">
                <Input type="password" v-model.trim="formData.password"/>
            </FormItem>
            <FormItem :label="$t('validateError.pleaseInput',{msg : $t('password',{msg : $t('new')})})"
                      prop="newPassword">
                <Input  type="password" v-model.trim="formData.newPassword"/>
            </FormItem>
            <FormItem :label="$t('passwordAgainInput')" prop="newPasswordAgain">
                <Input  type="password" v-model.trim="formData.newPasswordAgain"/>
            </FormItem>
        </Form>
        <div class="footer">
            <Button type="primary"
                    :loading="isSaving"
                    class="ivu-btn-90px"
                    @click="save">
                {{$t('save')}}
            </Button>
        </div>
    </div>
</template>

<script>
    import {validator} from 'klwk-ui';
    export default {
        data() {
            //校验新密码
            const validatePass = (rule,value,callback) => {
                if(value){
                    let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/;
                    if(reg.test(value)){
                        callback();
                    }else{
                        callback(this.$t('passwordError'));
                    }
                }else{
                    callback(this.$t('validateError.pleaseInput',{msg : this.$t('password',{msg : this.$t('new')})}));
                }
            };
            //校验再次输入的密码
            const validateNpassAgain = (rule,value,callback) => {
                if(value){
                    if(value !== this.formData.newPassword){
                        if(this.formData.newPassword){
                            callback(this.$t('newPassError'));
                        }else{
                            this.$refs.formValidate.validateField('newPassword');
                            callback(this.$t('newPassError'));
                        }
                    }else{
                        callback();
                    }
                }else{
                    callback(this.$t('passwordAgainInput'));
                }
            };
            return {
                //表单数据
                formData : {
                    //当前密码
                    password : '',
                    //新密码
                    newPassword : '',
                    //再次输入密码
                    newPasswordAgain : '',
                },
                //表单校验规则
                ruleValidate : {
                    password : [
                        {required : true,message : this.$t('validateError.pleaseInput',{msg : this.$t('password',{msg : this.$t('now')})}),trigger : 'blur'}
                    ],
                    newPassword : [
                        {required : true,validator : validatePass ,trigger :'blur'}
                    ],
                    newPasswordAgain : [
                        {required : true,validator : validateNpassAgain ,trigger :'blur'}
                    ]
                },
                //是否在保存中
                isSaving : false
            }
        },
        methods: {
            /**
             * 保存基本信息
             */
            save () {
                this.isSaving = true;
                this.$refs.formValidate.validate(valid => {
                    if(valid){
                        this.$Message.success('保存成功');
                        this.resetFormData();
                    }
                    this.isSaving = false;
                });
            },
            /**
             * 保存信息到后台
             */
            saveInfo () {

            },
            /**
             * 重置表单信息
             */
            resetFormData () {
                for(let item in this.formData){
                    this.formData[item] = '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .change-pass{
        @include block_outline(500px,auto);
        margin: 0 auto;

        .footer{
            text-align: center;
        }
    }
</style>
