<!--基本信息-->

<template>
    <div class="base-info">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              :label-width="80">
            <FormItem :label="$t('accountName')">
                Server0200
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
            //校验姓名格式
            const validateName = (rule,value,callback) => {
                if(value){
                    let nameStr = String(name);
                    if(nameStr.length > 20){
                        callback(this.$t('validateError.lengthError',{
                            name  : this.$t('name'),
                            length : 20
                        }));
                    }else{
                        callback();
                    }
                }else{
                    callback(this.$t('validateError.pleaseInput',{msg : this.$t('name')}));
                }
            };
            //校验联系电话
            const validatePhone = (rule,value,callback) => {
                if(value){
                    if(validator.isMobile(value) ||  validator.isTelephone(value)){
                        callback();
                    }else{
                        callback(this.$t('validateError.formatError',{field : this.$t('phone')}));
                    }
                }else{
                    callback();
                }
            };
            //校验邮箱
            const validateMail = (rule,value,callback) => {
                if(value){
                    if(validator.isEmail(value)){
                        callback();
                    }else{
                        callback(this.$t('validateError.formatError',{field : this.$t('mail')}));
                    }
                }else{
                    callback();
                }
            };
            return {
                //表单数据
                formData : {
                    //账号
                    account : '测试账号',
                    //姓名
                    name : '',
                    //电话
                    phone : '',
                    //邮箱
                    mail : '',
                    //角色
                    roles : '董事长角色'
                },
                //表单校验规则
                ruleValidate : {
                    name : [
                        {required : true,validator : validateName ,trigger : 'blur'}
                    ],
                    phone : [
                        {required : false,validator : validatePhone ,trigger : 'blur'}
                    ],
                    mail : [
                        {required : false,validator : validateMail ,trigger : 'blur'}
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
                    }
                    this.isSaving = false;
                });
            },
            /**
             * 保存信息到后台
             */
            saveInfo () {

            }
        }
    }
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
