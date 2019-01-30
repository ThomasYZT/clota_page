<!--
    产品有效性模版元素
    作者：杨泽涛
-->
<template>
    <div class="product-effect">
        <Form ref="effectForm"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
            <!--产品有效性-->
            <title-temp title="productEffect"></title-temp>
            <div class="form-content">
                <div class="ivu-form-item-wrap hasIcon">
                    <Form-item :label="$t('productEffSet')" prop="productEffSet"><!--产品有效性设置-->
                        <Select v-model="formData.productEffSet"
                                :disabled="!productEffSetEnable"
                                :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="(item,index) in enumData.productEffSet"
                                    :key="index"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                        <div style="position: absolute;right: -20px;top: 0px;">
                            <Tooltip transfer>
                                <div slot="content" style="width: 200px;">
                                    游玩日期之日起M天有效：是指产品必须在下单时指定的游玩日期核销，
                                    在首次核销之后的M天可多次入园游玩。
                                    <br>
                                    同销售政策适用游玩期限：
                                    在销售政策指定游玩期限内，任意一天均可核销。不适用于团队产品，不可限定每日库存
                                </div>
                                <i class="iconfont icon-note"></i>
                            </Tooltip>
                        </div>
                    </Form-item>
                </div>
                <!--空字段站位用-->
                <div class="ivu-form-item-wrap">
                    <Form-item label=""></Form-item>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
    import { validateProductEffSet } from '../../../../validateMethods';
    import { productEffectSet } from '@/assets/js/constVariable';
    import titleTemp from '../../../../components/titleTemp';
    export default {
        props : {
            //产品有效性是否可设置
            productEffSetEnable : {
                type : Boolean,
                default : false
            }
        },
        components : {
            titleTemp
        },
        data () {
            return {
                //表单数据 -- 产品有效性设置
                formData : {
                    productEffSet : 'since_the_play',
                },
                //枚举数据
                enumData : {
                    //产品有效性设置
                    productEffSet : productEffectSet,
                },
            };
        },
        computed : {
            ruleValidate () {
                return {
                    productEffSet : [
                        { validator : validateProductEffSet, trigger : 'change' }
                    ],
                }
            }
        },
        methods : {
            /**
             * 基本信息表单校验
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.effectForm.validate((valid) => {
                        if (valid) {
                            resolve(this.formData);
                        } else {
                            reject('effectFormErr');
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
            productEffSetEnable : {
                handler () {
                    this.formData.productEffSet = 'since_the_play';
                },
                immediate : true,
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .product-effect {
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
