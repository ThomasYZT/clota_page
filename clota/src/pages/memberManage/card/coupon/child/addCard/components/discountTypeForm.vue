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
                <Form-item :label="$t('卡券折扣')" prop="discount">
                    <Input v-model.trim="formData.discount"
                           style="width: 280px;"
                           :placeholder="$t('inputField', {field: ''})"/>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--最低消费金额-->
                <Form-item :label="$t('minConsumptionAmount')" prop="conditionLowerLimtation">
                    <Input v-model.trim="formData.conditionLowerLimtation"
                           style="width: 280px;"
                           :placeholder="$t('inputField', {field: ''})"/>
                    <span class="label-used">{{$t('available')}}</span>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--最高消费金额-->
                <Form-item :label="$t('maxConsumptionAmount')" prop="conditionUpperLimtation">
                    <Input v-model.trim="formData.conditionUpperLimtation"
                           style="width: 280px;"
                           :placeholder="$t('inputField', {field: ''})"/>
                    <span class="label-used">{{$t('available')}}</span>
                </Form-item>
            </i-col>
            <!-- 会员权益型要填的信息 -->
            <template v-if="scene === 'benefit'">
                <i-col span="12">
                    <!--有效期-->
                    <Form-item :label="$t('有效期')" prop="effectiveTime">
                        <Input v-model.trim="formData.effectiveTime"
                               style="width: 280px;"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label-used">{{$t('天')}}</span><!--天-->
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
                            :options="pickerOptions"
                            v-model.trim="formData.expireTime"
                            style="width: 280px;"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--生成数量-->
                    <Form-item :label="$t('generationNum')" prop="generationNum">
                        <Input v-model.trim="formData.generationNum"
                               style="width: 280px;"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label-used">{{$t('paper')}}</span><!--张-->
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--单日可领取数量-->
                    <Form-item :label="$t('amountSingleDay')" prop="amountSingleDay">
                        <Input v-model.trim="formData.amountSingleDay"
                               style="width: 280px;"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label-used">{{$t('paper')}},{{$t('0代表不限制')}}</span><!--张-->
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--可领取数量上限-->
                    <Form-item :label="$t('amountLimit')" prop="amountLimit">
                        <Input v-model.trim="formData.amountLimit"
                               style="width: 280px;"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label-used">{{$t('paper')}},{{$t('0代表不限制')}}</span><!--张-->
                    </Form-item>
                </i-col>
            </template>
            <i-col span="12">
                <!--能否和会员折扣权益同时使用-->
                <Form-item :label="$t('isUsedTogether')" prop="isDiscountCoexist">
                    <RadioGroup v-model="formData.isDiscountCoexist" @on-change="discountTypeChange">
                        <Radio label="true">{{$t('useSameTime')}}</Radio><!--可同时使用-->
                        <Radio label="false">{{$t('noUseSameTime')}}</Radio><!--不可同时使用-->
                    </RadioGroup>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--代金券在折扣前后使用设置-->
                <Form-item :label="$t('isUsedBeforeOrAfterDiscount')" prop="isEffectBeforeDiscount">
                    <RadioGroup v-model="formData.isEffectBeforeDiscount">
                        <Radio label="true">{{$t('availableBeforeDiscount')}}</Radio><!--折扣前可用-->
                        <Radio label="false">{{$t('availableAfterDiscount')}}</Radio><!--折扣后可用-->
                    </RadioGroup>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--可用渠道-->
                <Form-item :label="$t('availableChannels')" prop="conditionChannelId">
                    <treeSelector v-model="formData.conditionChannelId"
                                  nodeKey="label"
                                  :defaultProps="defaultProps"
                                  :data="channelSetList"></treeSelector>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--可用店铺-->

                <Form-item label="可用店铺" prop="useStore">
                    <treeSelector v-model="formData.conditionOrgId"
                                  nodeKey="label"
                                  :defaultProps="defaultProps"
                                  :data="listAmountRange"></treeSelector>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--可用产品类别-->
                <Form-item :label="$t('availableChannels')" prop="productTypeId">
                    <treeSelector v-model="formData.productTypeId"
                                  nodeKey="label"
                                  :defaultProps="defaultProps"
                                  :data="productTypeList"></treeSelector>
                </Form-item>
            </i-col>
        </i-row>
    </Form>
</template>

<script>
    import treeSelector from './treeSelector';
    export default {
        components : {
            treeSelector
        },
        props : {
            //应用场景
            scene : {
                type : String,
                default : '',
            }
        },
        data () {
            return {
                formData : {
                    //卡券折扣
                    discount : '',
                    //最低消费金额
                    conditionLowerLimtation : '',
                    //最高消费金额
                    conditionUpperLimtation : '',
                    //有效开始日期
                    effectiveTime : '',
                    //有效结束日期
                    expireTime : '',
                    //生成数量
                    generationNum : '',
                    //单日可领取数量
                    amountSingleDay : '',
                    //可领取数量上限
                    amountLimit : '',
                    //能否和会员折扣权益同时使用
                    isDiscountCoexist : '',
                    //代金券在折扣前后使用设置
                    isEffectBeforeDiscount : '',
                    //可用渠道
                    conditionChannelId : [],
                    //可用店铺
                    conditionOrgId : [],
                    //可用产品类别
                    productTypeId : [],
                },
                //日期插件配置
                pickerOptions : {
                    disabledDate (time) {
                        return time.getTime() < new Date().addDays(-1).valueOf();
                    },
                },
                defaultProps : {
                    label : 'label',
                },
                //可用渠道列表数据
                channelSetList : [
                    {
                        label : '111'
                    },
                    {
                        label : '222'
                    },
                    {
                        label : '333'
                    }
                ],
                //可用店铺列表数据
                listAmountRange : [
                    {
                        label : '111'
                    },
                    {
                        label : '222'
                    },
                    {
                        label : '333'
                    }
                ],
                //可用产品类别列表数据
                productTypeList : [
                    {
                        label : '111'
                    },
                    {
                        label : '222'
                    },
                    {
                        label : '333'
                    }
                ],
            };
        },
        computed : {
            //表单校验规则
            ruleValidate () {
                return {};
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
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
