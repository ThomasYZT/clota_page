<!--
    基本信息模版元素
    作者：杨泽涛
-->
<template>
    <!-- 基本信息 -->
    <div class="base-info">
        <Form ref="baseInfoForm"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
            <title-temp title="basicInfo"></title-temp>
            <div class="form-content">
                <!--产品名称-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('productName')" prop="productName">
                        <Input v-model.trim="formData.productName"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <!--景区成本价-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('standardPrice')" prop="standardPrice">
                        <Input v-model.trim="formData.standardPrice"
                               @on-blur="standardPriceChange"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <!--第三方产品编码-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('thirdCode')" prop="thirdCode">
                        <Input v-model.trim="formData.thirdCode"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <!--空字段站位用-->
                <div class="ivu-form-item-wrap"></div>
                <!--产品描述-->
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('productDes')" prop="productDes">
                        <Input v-model.trim="formData.productDes"
                               type="textarea"
                               :rows="3"
                               :placeholder="$t('inputField', {msg: ''})"/>
                    </Form-item>
                </div>
                <!--空字段站位用-->
                <div class="ivu-form-item-wrap"></div>
            </div>
        </Form>
    </div>
</template>

<script>
    import { validateMoney, emoji, validateNumber } from '../../../validateMethods';
    import titleTemp from '../../../components/titleTemp';
    export default {
        props : {
            //景区成本价
            standardPrice : {
                type : String,
                default : '',
            }
        },
        components : {
            titleTemp
        },
        data () {
            return {
                //表单数据 -- 基本信息
                formData : {
                    productName : '',//产品名称
                    standardPrice : '',//景区成本价
                    thirdCode : '',//第三方产品编码
                    productDes : '',//产品描述
                }
            };
        },
        computed : {
            //校验规则
            ruleValidate () {
                return {
                    //产品名称
                    productName : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('productName') }), trigger : 'blur' }, // 不能为空
                        { type : 'string', max : 50, message : this.$t('errorMaxLength', { field : this.$t('productName'), length : 50 }), trigger : 'blur' }, // 不能多于15个字符
                        { validator : emoji, trigger : 'blur' }
                    ],
                    //景区成本价
                    standardPrice : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('standardPrice') }), trigger : 'blur' },
                        { max : 10, message : this.$t('errorMaxLength', { field : this.$t('standardPrice'), length : 10 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur' }
                    ],
                    //第三方产品编码
                    thirdCode : [
                        { max : 50, message : this.$t('errorMaxLength', { field : this.$t('thirdCode'), length : 50 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' }
                    ],
                    //产品描述
                    productDes : [
                        { type : 'string', max : 500, message : this.$t('errorMaxLength', { field : this.$t('productDes'), length : 500 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                    ],
                };
            }
        },
        methods : {
            /**
             * 基本信息表单校验
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.baseInfoForm.validate((valid) => {
                        if (valid) {
                            resolve(this.formData);
                        } else {
                            reject('baseInfoFormErr');
                        }
                    })
                })
            },
            /**
             * 景区成本价改变
             * @param val
             */
            standardPriceChange () {
                this.$emit('update:standardPrice', this.formData.standardPrice);
            },
            /**
             * 编辑时初始化表单数据
             */
            initData (formData) {
                this.formData = formData;
                this.$emit('update:standardPrice', this.formData.standardPrice);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-form{
        padding: 10px 0 20px;
        text-align: center;
    }
    .form-content{
        width: 1000px;
        margin: 0 auto;

        .ivu-input-icon{
            z-index: 2;
        }

        /deep/ .ivu-form-item-label{
            padding-left: 0;
        }

        .ivu-form-item-wrap{
            position: relative;
            display: inline-block;
            min-width: 340px;
            width: 49%;
            text-align: left;
            vertical-align: middle;

            .ivu-form-item{
                width: 340px;
                margin: 0 auto 18px;
                text-align: left;

                /deep/ .ivu-date-picker {
                    display: block;
                }

                /deep/ .ivu-select-selected-value,
                /deep/ .ivu-input{
                    font-size: $font_size_14px;
                }

                /deep/ .ivu-select-item{
                    font-size: $font_size_14px !important;
                }

                /deep/ .ivu-input-wrapper{
                    &.short-input{
                        width: 123px;
                        display: inline-block;
                        margin-right: 10px;
                    }
                }

                /deep/ .ivu-checkbox-wrapper{
                    margin-right: 24px;
                    &:last-child{
                        margin-right: 0;
                    }
                }

                /deep/ .ivu-checkbox{
                    margin-right: 5px;
                }

                .label{
                    margin-right: 10px;
                }

                /deep/ .ivu-form-item-content {
                    line-height: 22px;
                }
            }
        }

        .single {
            width: calc(49% + 340px);
            /deep/ .ivu-form-item{
                width: 100%;
            }
        }

        .icon-note {
            color: $color_gray;
        }
    }
</style>
