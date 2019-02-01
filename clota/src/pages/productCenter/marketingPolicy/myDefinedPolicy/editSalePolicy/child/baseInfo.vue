<!--
    销售政策基础信息模版元素
    作者：杨泽涛
-->
<template>
    <div class="base-info">
        <!--基础信息表单-->
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
            <div class="form-content">
                <!--销售政策名称-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('salePolicyName')" prop="name">
                        <Input v-model.trim="formData.name"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <!--空字段站位用-->
                <div class="ivu-form-item-wrap"></div>
                <!--描述-->
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('desc')" prop="policyDesc">
                        <Input v-model.trim="formData.policyDesc"
                               type="textarea"
                               :rows="3"
                               :placeholder="$t('inputField', {msg: ''})"/>
                    </Form-item>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
    import { emoji } from '../validateMethods';

    export default {
        data () {
            return {
                //基础信息表单数据
                formData : {
                    //销售政策名称
                    name : '',
                    //描述
                    policyDesc : '',
                }
            };
        },
        computed : {
            ruleValidate () {
                return {
                    //销售政策名称
                    name : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('salePolicyName') }), trigger : 'blur' }, // 不能为空
                        { type : 'string', max : 50, message : this.$t('errorMaxLength', { field : this.$t('salePolicyName'), length : 50 }), trigger : 'blur' }, // 不能多于50个字符
                        { validator : emoji, trigger : 'blur' }
                    ],
                    //描述
                    policyDesc : [
                        { type : 'string', max : 500, message : this.$t('errorMaxLength', { field : this.$t('desc'), length : 500 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                    ],
                }
            }
        },
        methods : {
            /**
             * 校验表单
             * @return {Promise<any>}
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.formValidate.validate((valid) => {
                        if (valid) {
                            resolve(this.formData);
                        } else {
                            reject('baseInfoError');
                        }
                    })
                })
            },
            /**
             * 编辑时初始化表单数据
             */
            initData (formData) {
                Object.assign(this.formData, formData);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

</style>
