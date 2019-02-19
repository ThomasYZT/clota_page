<!--
    购买限制模版元素
    作者：杨泽涛
-->
<template>
    <!--购买限制-->
    <div class="buy-limit">
        <Form ref="buyLimitForm"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
            <title-temp title="buyLimit"></title-temp>
            <div class="form-content">
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('isGroup')"><!--是否团队产品-->
                        <Select v-model="formData.isGroup"
                                :placeholder="$t('selectField', {msg: ''})"
                                @on-change="isGroupChange">
                            <Option v-for="(item,index) in enumData.isTeamProduct"
                                    :key="index"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('inNum')" prop="inNum"><!-- 可入园人数-->
                        <Input :disabled="formData.isGroup === 'true' ? true : false "
                               v-model.trim="formData.inNum"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('minOrderNum')" prop="minNum"><!--每订单最小起订数-->
                        <Input v-model.trim="formData.minNum"
                               :placeholder="$t('inputField', {field: $t('minOrderNum')})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('maxOrderNum')" prop="maxNum"><!--每订单最大限订数-->
                        <Input v-model.trim="formData.maxNum"
                               :placeholder="$t('inputField', {field: $t('maxOrderNum')})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('needId')"><!--预定时提交身份信息-->
                        <Select v-model="formData.needId"
                                :disabled="formData.isGroup === 'true' ? true : false "
                                :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="(item,index) in enumData.orderInfo"
                                    :key="index"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <!--空字段站位用-->
                <div class="ivu-form-item-wrap"></div>
                <div class="ivu-form-item-wrap single" v-if="formData.needId !== 'noRequired'">
                    <Form-item :label="$t('idType')"><!--可接受证件类型-->
                        <CheckboxGroup v-model="formData.acceptIdType">
                            <Checkbox v-for="(item,index) in enumData.idType"
                                      :key="index"
                                      :label="item.value">
                                {{$t(item.label)}}</Checkbox>
                        </CheckboxGroup>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.needId === 'more'">
                    <Form-item :label="$t('limitByIdDay')" prop="limitByIdDay"><!--身份证购票限制-->
                        <Input v-model.trim="formData.limitByIdDay"
                               class="short-input"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label">{{$t('maxBuy')}}</span>
                        <Input v-model.trim="formData.limitByIdNum"
                               class="short-input"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span>{{$t('paper')}}</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.needId === 'more'">
                    <Form-item :label="$t('limitByMobileDay')" prop="limitByMobileDay"><!--手机号购票限制-->
                        <Input v-model.trim="formData.limitByMobileDay"
                               class="short-input"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label">{{$t('maxBuy')}}</span>
                        <Input v-model.trim="formData.limitByMobileNum"
                               class="short-input"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span>{{$t('paper')}}</span>
                    </Form-item>
                </div>
                <!--<div class="ivu-form-item-wrap">-->
                <!--<Form-item :label="$t('stockType')">&lt;!&ndash;限制库存&ndash;&gt;-->
                <!--<Select v-model="formData.stockType"-->
                <!--:placeholder="$t('selectField', {msg: ''})">-->
                <!--<Option v-for="(item,index) in enumData.stockType"-->
                <!--:key="index"-->
                <!--:value="item.value">-->
                <!--{{$t(item.label)}}-->
                <!--</Option>-->
                <!--</Select>-->
                <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap">-->
                <!--<Form-item :label="$t('stockNum')" prop="stockNum">&lt;!&ndash; 库存数量&ndash;&gt;-->
                <!--<template v-if="formData.stockType !== 'is_no_limit'">-->
                <!--<Input v-model.trim="formData.stockNum"-->
                <!--:placeholder="$t('inputField', {field: ''})"/>-->
                <!--</template>-->
                <!--<span v-else>-->
                <!--{{$t('disableSet')}}-->
                <!--</span>-->
                <!--</Form-item>-->
                <!--</div>-->
            </div>
        </Form>
    </div>
</template>

<script>
    import { validateNumber, emoji, validateIdBuyTicket, validateMobileBuyTicket } from '../../../../validateMethods';
    import titleTemp from '../../../../components/titleTemp';
    import { isTeamProduct, orderInfo, idType } from '@/assets/js/constVariable';
    export default {
        props : {
            //产品有效性是否可设置
            productEffSetEnable : {
                type : Boolean,
                default : false,
            }
        },
        components : {
            titleTemp
        },
        data () {
            return {
                //表单数据 -- 购买限制
                formData : {
                    //是否团队产品
                    isGroup : 'true',
                    //可入园人数
                    inNum : '',
                    //每订单最小起订数
                    minNum : '',
                    //每订单最大限订数
                    maxNum : '',
                    //预定时提交游客身份信息
                    needId : 'noRequired',
                    //可接受证件类型
                    acceptIdType : ['identity','passport'],
                    //身份证件购票限制
                    limitByIdDay : '',
                    //身份证件购票限制
                    limitByIdNum : '',
                    //手机号购票限制
                    limitByMobileDay : '',
                    //手机号购票限制
                    limitByMobileNum : '',
                },
                //枚举数据
                enumData : {
                    //是否团队产品
                    isTeamProduct : isTeamProduct,
                    //预定时提交游客身份信息
                    orderInfo : orderInfo,
                    //证件类型
                    idType : idType,
                },
            };
        },
        computed : {
            ruleValidate () {
                return {
                    inNum : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('inNum') }), trigger : 'blur' },
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('inNum'), length : 10 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' }
                    ],
                    minNum : [
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('minOrderNum'), length : 10 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' }
                    ],
                    maxNum : [
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('maxOrderNum'), length : 10 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' }
                    ],
                    // stockNum : [
                    //     { validator : validateMethod.emoji, trigger : 'blur' },
                    //     { validator : validateNumber, trigger : 'blur' }
                    // ],
                    limitByIdDay : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('limitByIdDay') }), trigger : 'blur' },
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('limitByIdDay'), length : 10 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' },
                        { validator : validateIdBuyTicket, trigger : 'blur', limitByIdNum : this.formData.limitByIdNum }
                    ],
                    limitByMobileDay : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('limitByMobileDay') }), trigger : 'blur' },
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('limitByMobileDay'), length : 10 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' },
                        { validator : validateMobileBuyTicket, trigger : 'blur', limitByMobileNum : this.formData.limitByMobileNum }
                    ],
                }
            }
        },
        methods : {
            /**
             * 团队产品默认无需证件
             * @param val
             */
            isGroupChange ( val ) {
                if (val === 'true') {
                    this.formData.needId = 'noRequired';
                    this.formData.inNum = '1';
                    this.$emit('update:productEffSetEnable', false);
                    this.$refs.buyLimitForm.validateField('inNum');
                } else {
                    this.formData.inNum = '';
                    this.$emit('update:productEffSetEnable', true);
                }
            },
            /**
             * 票面信息表单校验
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.buyLimitForm.validate((valid) => {
                        if (valid) {
                            resolve(this.formData);
                        } else {
                            reject('buyLimitFormErr');
                        }
                    });
                });
            },
            /**
             * 编辑时初始化表单数据
             */
            initData (formData) {
                this.formData = formData;
                if (this.formData.isGroup === 'true') {
                    this.$emit('update:productEffSetEnable', false);
                } else {
                    this.$emit('update:productEffSetEnable', true);
                }
            }
        },
        watch : {
            //是否团队产品设置变更时初始化可入园人数
            'formData.isGroup' : {
                handler () {
                    if (this.formData.isGroup === 'true') {
                       this.formData.inNum = '1';
                    }
                },
                immediate : true,
            },
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
    .buy-limit {
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
