<!--
    兑换券类型表单
    作者：杨泽涛
-->
<template>
    <Form ref="formValidate"
          :model="formData"
          :rules="ruleValidate"
          label-position="top">
        <i-row>
            <!-- 会员权益型要填的信息 -->
            <template v-if="scene === 'right'">
                <i-col span="12">
                    <!--有效期-->
                    <Form-item :label="$t('effectiveTime')" prop="effDays">
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
            <!-- 传播型要填的信息 -->
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
                <!--选择商品-->
                <Form-item :label="$t('selectField', { msg : $t('goods') })" prop="goodId">
                    <Select v-model.trim="formData.conditionGoodId"
                            transfer
                            :clearable="true"
                            style="width: 280px;height: 34px;"
                            :disabled="type !== 'add'"
                            :placeholder="$t('selectField', {msg: ''})">
                        <Option v-for="(item,index) in productList"
                                :key="index"
                                :value="item.outCode">
                            {{item.productName}}
                        </Option>
                    </Select>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--可用渠道-->
                <Form-item :label="$t('availableChannels')" prop="conditionChannelId">
                    <treeSelector v-model="formData.conditionChannelId"
                                  nodeKey="partnerId"
                                  :disabled="type !== 'add'"
                                  :defaultProps="{ label : 'channelName' }"
                                  :data="channelSetList"></treeSelector>
                </Form-item>
            </i-col>
            <i-col span="12">
                <!--可用店铺-->
                <Form-item :label="$t('availableShop')" prop="conditionOrgId">
                    <treeSelector v-model="formData.conditionOrgId"
                                  nodeKey="id"
                                  :disabled="type !== 'add'"
                                  :defaultProps="{ label : 'orgName' }"
                                  :data="listAmountRange"></treeSelector>
                </Form-item>
            </i-col>
        </i-row>
    </Form>
</template>

<script>
    import treeSelector from './treeSelector';
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
            //商品列表数据
            productList : {
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
                    //商品
                    conditionGoodId : '',
                    //可用渠道
                    conditionChannelId : [],
                    //可用店铺
                    conditionOrgId : [],
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
                    //有效期
                    effDays : [
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('effectiveDays') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur', customField : 'effectiveDays' }
                    ],
                    //有效开始日期
                    effectiveTime : [
                        { required : true, type : 'date', message : this.$t('inputField',{ field : this.$t('effectiveStartDate') }), trigger : 'blur' },
                    ],
                    //有效结束日期
                    expireTime : [
                        { required : true, type : 'date', message : this.$t('inputField',{ field : this.$t('effectiveEndDate') }), trigger : 'blur' },
                        { validator : validateEndTime , startTime : this.formData.effectiveTime }
                    ],
                    //生成数量
                    quantity : [
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('generationNum') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur', customField : 'generationNum' }
                    ],
                    //单日可领取数量
                    dayGain : [
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('amountSingleDay') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur', customField : 'amountSingleDay' }
                    ],
                    //可领取数量上限
                    totalGain : [
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('amountLimit') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur', customField : 'amountLimit' }
                    ],
                    //商品
                    conditionGoodId : [
                        { required : true, message : this.$t('selectField',{ msg : this.$t('good') }), trigger : 'blur' },
                    ],
                    //可用渠道
                    conditionChannelId : [
                        { required : true, type : 'array', min : 1, message : this.$t('selectField',{ msg : this.$t('availableChannels') }), trigger : 'blur' },
                    ],
                    //可用店铺
                    conditionOrgId : [
                        { required : true, type : 'array', min : 1, message : this.$t('selectField',{ msg : this.$t('shop') }), trigger : 'blur' },
                    ],
                }
            }
        },
        methods : {
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
                            resultForm.remark = this.getDiscountRemark();
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
             * 获取兑换券的使用条件
             */
            getDiscountRemark () {
                let remark = [];
                this.productList.forEach(item => {
                    if (this.formData.conditionGoodId === item.id) {
                        remark.push(item.productName);
                    }
                });
                return remark.join(',');
            },
            /**
             * 初始化数据
             */
            initData (rowData) {
                for (let key in this.formData) {
                    if (key !== 'conditionChannelId' && key !== 'conditionOrgId') {
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
                }, 500)
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
