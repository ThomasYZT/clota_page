<!--
    折扣类型优惠券表单
    作者：杨泽涛
-->
<template>
    <Form ref="formValidate"
          :model="formData"
          :rules="ruleValidate"
          label-position="top">
        <i-row>
            <i-col span="12">
                <!--卡券折扣-->
                <Form-item :label="$t('nominalValue')" prop="nominalValue">
                    <Input v-model.trim="formData.nominalValue"
                           style="width: 280px;"
                           :disabled="type !== 'add'"
                           :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--最低消费金额-->
                <Form-item :label="$t('minConsumptionAmount')" prop="conditionLowerLimtation">
                    <Input v-model.trim="formData.conditionLowerLimtation"
                           style="width: 280px;"
                           :disabled="type !== 'add'"
                           :placeholder="$t('inputField', {field: ''})"/>
                    <span class="label-used">{{$t('available')}}</span>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--最高消费金额-->
                <Form-item :label="$t('maxConsumptionAmount')" prop="conditionUpperLimtation">
                    <Input v-model.trim="formData.conditionUpperLimtation"
                           style="width: 280px;"
                           :disabled="type !== 'add'"
                           :placeholder="$t('inputField', {field: ''})"/>
                    <span class="label-used">{{$t('available')}}</span>
                </Form-item>
            </i-col>
            <!-- 会员权益型要填的信息 -->
            <template v-if="scene === 'right'">
                <i-col span="12">
                    <!--有效期-->
                    <Form-item :label="$t('validityPeriod')" prop="effDays">
                        <Input v-model.trim="formData.effDays"
                               style="width: 280px;"
                               :disabled="type !== 'add'"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label-used">{{$t('day')}}</span><!--天-->
                        <Tooltip transfer placement="right">
                            <span class="iconfont icon-note"></span>
                            <div style="width: 200px; word-break: break-all;"
                                 slot="content">
                                <p>{{$t('effdaysComputed')}}</p>
                            </div>
                        </Tooltip>
                    </Form-item>
                </i-col>
            </template>
            <template v-else>
                <i-col span="12">
                    <!--有效开始日期-->
                    <Form-item :label="$t('effectiveStartDate')" prop="effectiveTime">
                        <Date-picker
                            type="date"
                            transfer
                            :editable="false"
                            :readonly="type !== 'add'"
                            :disabled="type !== 'add'"
                            :options="pickerOptions"
                            v-model.trim="formData.effectiveTime"
                            style="width: 280px;"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--有效结束日期-->
                    <Form-item :label="$t('effectiveEndDate')" prop="expireTime">
                        <Date-picker
                            type="date"
                            :editable="false"
                            transfer
                            :readonly="type !== 'add'"
                            :disabled="type !== 'add'"
                            :options="pickerOptions"
                            v-model.trim="formData.expireTime"
                            style="width: 280px;"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--生成数量-->
                    <Form-item :label="$t('generationNum')" prop="quantity">
                        <Input v-model.trim="formData.quantity"
                               style="width: 280px;"
                               :disabled="type !== 'add'"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label-used">{{$t('paper')}}</span><!--张-->
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--单日可领取数量-->
                    <Form-item :label="$t('amountSingleDay')" prop="dayGain">
                        <Input v-model.trim="formData.dayGain"
                               style="width: 280px;"
                               :disabled="type !== 'add'"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label-used">{{$t('paper')}},{{$t('0MeansNoLimit')}}</span><!--张-->
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--可领取数量上限-->
                    <Form-item :label="$t('amountLimit')" prop="totalGain">
                        <Input v-model.trim="formData.totalGain"
                               style="width: 280px;"
                               :disabled="type !== 'add'"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label-used">{{$t('paper')}},{{$t('0MeansNoLimit')}}</span><!--张-->
                        <Tooltip transfer placement="right">
                            <span class="iconfont icon-note"></span>
                            <div style="width: 200px; word-break: break-all;"
                                 slot="content">
                                <p>{{$t('totalGainTip')}}</p>
                            </div>
                        </Tooltip>
                    </Form-item>
                </i-col>
            </template>
            <i-col span="12">
                <!--能否和会员折扣权益同时使用-->
                <Form-item :label="$t('isUsedTogether')" prop="isDiscountCoexist">
                    <RadioGroup v-model="formData.isDiscountCoexist"
                                @on-change="discountTypeChange">
                        <Radio label="true"
                               :disabled="type !== 'add'">{{$t('useSameTime')}}</Radio><!--可同时使用-->
                        <Radio label="false"
                               :disabled="type !== 'add'">{{$t('noUseSameTime')}}</Radio><!--不可同时使用-->
                    </RadioGroup>
                </Form-item>
            </i-col>
            <i-col span="12" v-if="formData.isDiscountCoexist === 'true'">
                <!--代金券在折扣前后使用设置-->
                <Form-item :label="$t('isUsedBeforeOrAfterDiscount')" prop="isEffectBeforeDiscount">
                    <RadioGroup v-model="formData.isEffectBeforeDiscount"
                                @on-change="isEffectBeforeDiscountChange">
                        <Radio label="true"
                               :disabled="type !== 'add'">{{$t('availableBeforeDiscount')}}</Radio><!--折扣前可用-->
                        <Radio label="false"
                               :disabled="type !== 'add'">{{$t('availableAfterDiscount')}}</Radio><!--折扣后可用-->
                    </RadioGroup>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--可用店铺-->
                <Form-item :label="$t('availableShop')" prop="conditionOrgId">
                    <treeSelector v-model="formData.conditionOrgId"
                                  nodeKey="id"
                                  :disabled="type !== 'add'"
                                  :defaultProps="{ label : 'orgName' }"
                                  :data="listAmountRange"
                                  @on-change="conditionOrgIdChange('conditionOrgId', $event)"></treeSelector>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--可用渠道-->
                <Form-item :label="$t('availableChannels')" prop="conditionChannelId">
                    <treeSelector v-model="formData.conditionChannelId"
                                  nodeKey="partnerId"
                                  :disabled="type !== 'add'"
                                  :defaultProps="{ label : 'orgChannelName' }"
                                  :data="channelSetList"
                                  @on-change="resetField('conditionChannelId')"></treeSelector>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--可用产品类别-->
                <Form-item :label="$t('availableProductCategories')" prop="conditionProductId">
                    <treeSelector v-model="formData.conditionProductId"
                                  nodeKey="id"
                                  :disabled="type !== 'add'"
                                  :defaultProps="{ label : 'typeName' }"
                                  :data="productTypeList"
                                  @on-change="resetField('conditionProductId')"></treeSelector>
                </Form-item>
            </i-col>
        </i-row>
    </Form>
</template>

<script>
    import treeSelector from './treeSelector';
    import defaultsDeep from 'lodash/defaultsDeep';
    import { validateMoney, validateNum, validateDiscount, validateNaturalNumber,
            validateEndTime, validateConditionUpperLimtation, noBiggerValidate } from '../../../../validateMethods';
    export default {
        components : {
            treeSelector
        },
        props : {
            //应用场景
            scene : {
                type : String,
                default : '',
            },
            //可用渠道列表
            channelSetList : {
                type : Array,
                default () {
                    return [];
                }
            },
            //可用店铺列表
            listAmountRange : {
                type : Array,
                default () {
                    return [];
                }
            },
            //可用产品类别列表
            productTypeList : {
                type : Array,
                default () {
                    return [];
                }
            },
            //表单状态
            type : {
                type : String,
                default : '',
            }
        },
        data () {
            return {
                formData : {
                    //卡券折扣
                    nominalValue : '',
                    //最低消费金额
                    conditionLowerLimtation : '',
                    //最高消费金额
                    conditionUpperLimtation : '',
                    //有效期
                    effDays : '',
                    //有效开始日期
                    effectiveTime : '',
                    //有效结束日期
                    expireTime : '',
                    //生成数量
                    quantity : '',
                    //单日可领取数量
                    dayGain : '',
                    //可领取数量上限
                    totalGain : '',
                    //能否和会员折扣权益同时使用
                    isDiscountCoexist : '',
                    //代金券在折扣前后使用设置
                    isEffectBeforeDiscount : '',
                    //可用渠道
                    conditionChannelId : [],
                    //可用店铺
                    conditionOrgId : [],
                    //可用产品类别
                    conditionProductId : [],
                },
                //日期插件配置
                pickerOptions : {
                    disabledDate (time) {
                        return time.getTime() < new Date().addDays(-1).valueOf();
                    },
                },
            };
        },
        computed : {
            //表单校验规则
            ruleValidate () {
                return {
                    nominalValue : [ //卡券折扣
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('couponFaceValue') }), trigger : 'blur' },
                        { validator : validateDiscount, trigger : 'blur' },
                    ],
                    conditionLowerLimtation : [ //最低消费金额后可用
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('consumption') }), trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur', customField : 'money' },
                    ],
                    conditionUpperLimtation : [ //最高消费金额后可用
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('consumption') }), trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur', customField : 'money' },
                        { validator : validateConditionUpperLimtation, trigger : 'blur', conditionLowerLimtation : this.formData.conditionLowerLimtation },
                    ],
                    effDays : [ //有效天数
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('effectiveDays') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur', customField : 'effectiveDays' },
                    ],
                    effectiveTime : [ //有效开始日期
                        { required : true, type : 'date', message : this.$t('inputField',{ field : this.$t('effectiveStartDate') }), trigger : 'blur' },
                    ],
                    expireTime : [ //有效结束日期
                        { required : true, type : 'date', message : this.$t('inputField',{ field : this.$t('effectiveEndDate') }), trigger : 'blur' },
                        { validator : validateEndTime , startTime : this.formData.effectiveTime }
                    ],
                    quantity : [ //生成数量
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('generationNum') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur', customField : 'generationNum' }
                    ],
                    dayGain : [ //单日可领取数量
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('amountSingleDay') }), trigger : 'blur' },
                        { validator : validateNaturalNumber, trigger : 'blur', customField : 'amountSingleDay' },
                        { validator : noBiggerValidate, trigger : 'blur',
                          compareValue : this.formData.quantity,
                          customField : 'amountSingleDay',
                          compareFeild : 'generationNum' }
                    ],
                    totalGain : [ //可领取数量上限
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('amountLimit') }), trigger : 'blur' },
                        { validator : validateNaturalNumber, trigger : 'blur', customField : 'amountLimit' },
                        { validator : noBiggerValidate, trigger : 'blur',
                          compareValue : this.formData.quantity,
                          customField : 'amountLimit',
                          compareFeild : 'generationNum' }
                    ],
                    isDiscountCoexist : [ //能否和会员折扣同时使用
                        { required : true, type : 'string', message : this.$t('selectField',{ msg : '' }), trigger : 'blur' },
                    ],
                    isEffectBeforeDiscount : [ //代金券在折扣前后使用设置
                        { required : true, type : 'string', message : this.$t('selectField',{ msg : '' }), trigger : 'blur' },
                    ],
                    conditionChannelId : [ //可用渠道
                        { required : true, type : 'array', min : 1, message : this.$t('selectField',{ msg : this.$t('availableChannels') }), trigger : 'blur' },
                    ],
                    conditionOrgId : [ //可用店铺
                        { required : true, type : 'array', min : 1, message : this.$t('selectField',{ msg : this.$t('shop') }), trigger : 'blur' },
                    ],
                    conditionProductId : [ //可用产品类别
                        { required : true, type : 'array', min : 1, message : this.$t('selectField',{ msg : this.$t('productType') }), trigger : 'blur' },
                    ],
                };
            }
        },
        methods : {
            /**
             * 能否和会员折扣权益同时使用修改,如果设置为不可同时使用，
             * 那么代金券在折扣前后使用规则必须清除
             * @param data 代金券折扣前后是否可用
             */
            discountTypeChange (data) {
                if (data === 'false') {
                    this.formData.isEffectBeforeDiscount = '';
                }
                this.$refs.formValidate.validateField('isDiscountCoexist');
            },
            /**
             * 代金券在折扣前后使用设置修改
             */
            isEffectBeforeDiscountChange () {
                this.$refs.formValidate.validateField('isEffectBeforeDiscount');
            },
            /**
             * 表单校验
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.formValidate.validate(valid => {
                        if (valid) {
                            let resultForm = defaultsDeep({}, this.formData);
                            resultForm.effectiveTime = resultForm.effectiveTime ? resultForm.effectiveTime.format('yyyy-MM-dd') : '';
                            resultForm.expireTime = resultForm.expireTime ? resultForm.expireTime.format('yyyy-MM-dd') : '';
                            resultForm.conditionChannelId = resultForm.conditionChannelId.map(item => { return item.partnerId }).join(',');
                            resultForm.conditionOrgId = resultForm.conditionOrgId.map(item => { return item.id }).join(',');
                            resultForm.conditionProductId = resultForm.conditionProductId.map(item => { return item.id }).join(',');
                            resolve(resultForm);
                        } else {
                            reject();
                        }
                    })
                })
            },
            /**
             * 复原表单状态
             */
            formReset () {
                this.$refs.formValidate.resetFields();
            },
            /**
             * 重新校验表单域
             * @param field 表单域名
             */
            resetField (field) {
                this.$refs.formValidate.validateField(field);
            },
            /**
             * 可用店铺改变
             * @param field 表单域名
             */
            conditionOrgIdChange (field, val) {
                this.formData.conditionChannelId = [];
                this.$emit('conditionOrgChange', val);
                this.resetField(field);
            },
            /**
             * 初始化数据
             */
            initData (rowData) {
                for (let key in this.formData) {
                    if (key !== 'conditionChannelId' && key !== 'conditionOrgId' && key !== 'conditionProductId') {
                        if (key === 'effectiveTime' || key === 'expireTime') {
                            this.formData[key] = rowData[key] ? new Date(rowData[key]) : '';
                        } else {
                            this.formData[key] = String(rowData[key]) ? String(rowData[key]) : '';
                        }
                    }
                }
                this.initSelector(rowData);
            },
            initSelector (rowData) {
                let conditionOrgIds = rowData.conditionOrgId.split(',');
                this.formData.conditionOrgId = this.listAmountRange.filter(item => {
                    return conditionOrgIds.includes(item.id);
                });
                let conditionProductIds = rowData.conditionProductId.split(',');
                this.formData.conditionProductId = this.productTypeList.filter(item => {
                    return conditionProductIds.includes(item.id);
                });
                setTimeout(() => {
                    let conditionChannelIds = rowData.conditionChannelId.split(',');
                    this.formData.conditionChannelId = this.channelSetList.filter(item => {
                        return conditionChannelIds.includes(item.partnerId);
                    });
                }, 500);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
