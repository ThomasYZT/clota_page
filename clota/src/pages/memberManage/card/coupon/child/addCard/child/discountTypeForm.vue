<!--
    折扣类型优惠券表单
    作者：杨泽涛
-->
<template>
    <i-col span="12">
        <Form-item :label="$t('couponFaceValue')" prop="nominalValue">
            <Input v-model.trim="formData.nominalValue" :placeholder="$t('inputField', {field: ''})"/>
        </Form-item>
    </i-col>
</template>

<script>

    export default {
        components : {},
        data () {
            return {
                formData : {
                    nominalValue : '',
                },
            };
        },
        methods : {
            getFormData () {
                return this.formData;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
