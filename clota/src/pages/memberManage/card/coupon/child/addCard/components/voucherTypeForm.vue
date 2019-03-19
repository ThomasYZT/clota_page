<!--
    代金券类型表单
    作者：杨泽涛
-->
<template>
    <Form ref="formValidate"
          :model="formData"
          :rules="ruleValidate"
          label-position="top">
        <i-row>
            <i-col span="12">
                <!--卡券面值-->
                <Form-item :label="$t('couponFaceValue')" prop="nominalValue">
                    <Input v-model.trim="formData.nominalValue"
                           style="width: 280px;"
                           :disabled="type !== 'add'"
                           :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--消费满多少可用(最低消费金额后可用)-->
                <Form-item :label="$t('spendOver')" prop="conditionLowerLimtation">
                    <Input v-model.trim="formData.conditionLowerLimtation"
                           style="width: 280px;"
                           :disabled="type !== 'add'"
                           :placeholder="$t('inputField', {field: ''})"/>
                    <span class="label-used">{{$t('available')}}</span><!--可用-->
                </Form-item>
            </i-col>

            <!-- 权益型 要填的信息 -->
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

            <!-- 传播型 要填的信息 -->
            <template v-else>
                <i-col span="12">
                    <!--有效开始日期-->
                    <Form-item :label="$t('effectiveStartDate')" prop="effectiveTime">
                        <Date-picker
                            type="date"
                            transfer
                            :editable="false"
                            :options="pickerOptions"
                            v-model.trim="formData.effectiveTime"
                            style="width: 280px;"
                            :disabled="type !== 'add'"
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
                            :options="pickerOptions"
                            v-model.trim="formData.expireTime"
                            style="width: 280px;"
                            :disabled="type !== 'add'"
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
                                :disabled="type !== 'add'"
                                @on-change="discountTypeChange">
                        <Radio label="true">{{$t('useSameTime')}}</Radio><!--可同时使用-->
                        <Radio label="false">{{$t('noUseSameTime')}}</Radio><!--不可同时使用-->
                    </RadioGroup>
                </Form-item>
            </i-col>
            <template  v-if="formData.isDiscountCoexist === 'true'">
                <i-col span="12">
                    <!--代金券在折扣前后使用设置-->
                    <Form-item :label="$t('isUsedBeforeOrAfterDiscount')" prop="isEffectBeforeDiscount">
                        <RadioGroup v-model="formData.isEffectBeforeDiscount"
                                    :disabled="type !== 'add'">
                            <Radio label="true">{{$t('availableBeforeDiscount')}}</Radio><!--折扣前可用-->
                            <Radio label="false">{{$t('availableAfterDiscount')}}</Radio><!--折扣后可用-->
                        </RadioGroup>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <div class="placeholder-block"></div>
                </i-col>
            </template>
            <i-col span="12">
                <!--可用渠道-->
                <Form-item :label="$t('availableChannels')" prop="conditionChannelId">
                    <treeSelector v-model="formData.conditionChannelId"
                                  nodeKey="id"
                                  :defaultProps="{ label : 'channelName' }"
                                  :data="channelSetList"
                                  :disabled="type !== 'add'"
                                  @on-change="resetField('conditionChannelId')"></treeSelector>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--可用店铺-->

                <Form-item :label="$t('availableShop')" prop="conditionOrgId">
                    <treeSelector v-model="formData.conditionOrgId"
                                  nodeKey="id"
                                  :defaultProps="{ label : 'orgName' }"
                                  :data="listAmountRange"
                                  :disabled="type !== 'add'"
                                  @on-change="resetField('conditionOrgId')"></treeSelector>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--可用产品类别-->
                <Form-item :label="$t('availableProductCategories')" prop="conditionProductId">
                    <treeSelector v-model="formData.conditionProductId"
                                  nodeKey="id"
                                  :defaultProps="{ label : 'typeName' }"
                                  :data="productTypeList"
                                  :disabled="type !== 'add'"
                                  @on-change="resetField('conditionProductId')"></treeSelector>
                </Form-item>
            </i-col>

        </i-row>
    </Form>
</template>

<script>
    import treeSelector from '../components/treeSelector';
    import defaultsDeep from 'lodash/defaultsDeep';
    import { validateMoney, validateNum, validateEndTime } from '../../../../validateMethods';
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
                //表单数据
                formData : {
                    //卡券面值
                    nominalValue : '',
                    //最低消费金额后可用
                    conditionLowerLimtation : '',
                    //有效天数
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
                    //能否和会员折扣同时使用
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
            //表单验证规则
            ruleValidate () {
                return {
                    nominalValue : [ //卡券面值
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('couponFaceValue') }), trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur', customField : 'couponFaceValue' },
                    ],
                    conditionLowerLimtation : [ //最低消费金额后可用
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('consumption') }), trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur', customField : 'money' },
                    ],
                    effDays : [ //有效天数
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('effectiveDays') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur', customField : 'effectiveDays' }
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
                        { validator : validateNum, trigger : 'blur', customField : 'amountSingleDay' }
                    ],
                    totalGain : [ //可领取数量上限
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('amountLimit') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur', customField : 'amountLimit' }
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
                }
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
                            reject('err');
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
             * 初始化数据
             */
            initData (rowData) {
                for (let key in this.formData) {
                    if (key !== 'conditionChannelId' && key !== 'conditionOrgId' && key !== 'conditionProductId') {
                        this.formData[key] = String(rowData[key]) ? String(rowData[key]) : '';
                    }
                }
                this.initSelector(rowData);

            },
            /**
             * 初始化树形选择器
             */
            initSelector (rowData) {
                setTimeout(() => {
                    this.formData.conditionChannelId = rowData.conditionChannelId.split(',');
                    this.formData.conditionChannelId = this.channelSetList.filter(item => {
                        return this.formData.conditionChannelId.includes(item.partnerId);
                    });
                    this.formData.conditionOrgId = rowData.conditionOrgId.split(',');
                    this.formData.conditionOrgId = this.listAmountRange.filter(item => {
                        return this.formData.conditionOrgId.includes(item.id);
                    });
                    this.formData.conditionProductId = rowData.conditionProductId.split(',');
                    this.formData.conditionProductId = this.productTypeList.filter(item => {
                        return this.formData.conditionProductId.includes(item.id);
                    });
                }, 500)
            }
        },
        created () {
            // setTimeout(() => {
            //     this.formData.conditionChannelId = [{label : '111'}, {label : '333'}];
            // },500);
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .placeholder-block {
        margin-bottom: 18px;
        height: 60px;
    }
</style>
