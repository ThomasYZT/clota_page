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
                <!--选择商品-->
                <Form-item :label="$t('选择商品')" prop="goodId">
                    <Select v-model.trim="formData.goodId"
                            :multiple="true"
                            transfer
                            :clearable="true"
                            style="width: 280px;"
                            :placeholder="$t('selectField', {msg: ''})">
                        <Option v-for="(item,index) in goodsList"
                                :key="index"
                                :value="item.id">
                            {{item.goodName}}
                        </Option>
                    </Select>
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
                //表单数据
                formData : {
                    effectiveTime : '',
                    expireTime : '',
                    generationNum : '',
                    amountSingleDay : '',
                    amountLimit : '',
                    goodId : '',
                    conditionChannelId : [],
                    conditionOrgId : [],
                },
                //商品列表
                goodsList : [],
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
                //日期插件配置
                pickerOptions : {
                    disabledDate (time) {
                        return time.getTime() < new Date().addDays(-1).valueOf();
                    },
                },
                defaultProps : {
                    label : 'label',
                }
            };
        },
        computed : {
            //表单校验规则
            ruleValidate () {

            }
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
