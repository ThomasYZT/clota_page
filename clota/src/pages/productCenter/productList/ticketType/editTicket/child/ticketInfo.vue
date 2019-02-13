<!--
    票面信息模版元素
    作者：杨泽涛
-->
<template>
    <!--票面信息-->
    <div class="ticket-info">
        <Form ref="ticketInfoForm"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
            <title-temp title="ticketInfo"></title-temp>
            <div class="form-content">
                <!--打印名称-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('printName')" prop="printName">
                        <Input v-model.trim="formData.printName"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <!--票面价格-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('printPriceWithInfo')" prop="printPrice">
                        <Input v-model.trim="formData.printPrice"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <!--票面说明-->
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('ticketRemark')" prop="ticketRemark">
                        <Input v-model.trim="formData.ticketRemark"
                               type="textarea"
                               :rows="3"
                               :placeholder="$t('inputField', {msg: ''})"/>
                    </Form-item>
                </div>
                <!--打印说明-->
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('printRemark')" prop="printRemark">
                        <Input v-model.trim="formData.printRemark"
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
    import { validateMoney, emoji, validatePrintPrice } from '../../../../validateMethods';
    import titleTemp from '../../../../components/titleTemp';
    export default {
        props : {
            //景区成本价
            standardPrice : {
                type : String,
                default : ''
            }
        },
        components : {
            titleTemp
        },
        data () {
            return {
                //表单数据 -- 票面信息
                formData : {
                    printName : '',//打印名称
                    printPrice : '',//票面价格
                    ticketRemark : '',//票面说明
                    printRemark : '',//打印说明
                }
            };
        },
        computed : {
            ruleValidate () {
                return {
                    printName : [
                        { type : 'string', max : 50, message : this.$t('errorMaxLength', { field : this.$t('printName'), length : 50 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                    ],
                    printPrice : [
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('printPrice'), length : 10 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur' },
                        //票面价不得低于景区成本价
                        { validator : validatePrintPrice, trigger : 'blur', standardPrice : this.standardPrice }
                    ],
                    ticketRemark : [
                        { type : 'string', max : 500, message : this.$t('errorMaxLength', { field : this.$t('ticketRemark'), length : 500 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                    ],
                    printRemark : [
                        { type : 'string', max : 500, message : this.$t('errorMaxLength', { field : this.$t('printRemark'), length : 500 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                    ],
                }
            }
        },
        methods : {
            /**
             * 票面信息表单校验
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.ticketInfoForm.validate((valid) => {
                        if (valid) {
                            resolve(this.formData);
                        } else {
                            reject("ticketInfoFormErr");
                        }
                    });
                })
            },
            /**
             * 编辑时初始化表单数据
             */
            initData (formData) {
                this.formData = formData;
            }
        },
        watch : {
            //监听表单数据变化，向编辑页面传递模版表单数据
            formData : {
                handler (formData) {
                    this.$emit('updateFormData', formData);
                },
                deep : true,
                immediate : true,
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .ticket-info {
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
    }
</style>
