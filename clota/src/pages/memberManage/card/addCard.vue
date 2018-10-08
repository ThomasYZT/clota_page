<template>
    <!--新增/修改卡券信息-->
    <div class="add-card">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :locale-router="type === 'add' ? 'newCardCoupon' : 'modifyCardInfo'"
                :before-router-list="beforeRouterList">     <!--新增卡券 : 修改卡券信息-->
            </bread-crumb-head>
        </div>

        <!--折扣券-->
        <div class="form-container">
            <Form ref="discountFormValidate"
                  key="discountFormValidate"
                  v-if="formData.couponType === 'discount_coupon'"
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">
                <div class="ivu-form-item-wrap">
                    <!--卡券名称-->
                    <Form-item :label="$t('couponName')" prop="couponName"><!--卡券名称-->
                        <Input v-model.trim="formData.couponName"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--卡券类别-->
                    <Form-item :label="$t('couponType')" prop="couponType"><!--卡券类别-->
                        <Select v-model.trim="formData.couponType"
                                :placeholder="$t('selectField', {msg: ''})"
                                :disabled="type === 'modify'"
                                @on-change="typeChange('discountFormValidate')">
                            <Option v-for="(item,index) in couponTypeList"
                                    :key="index"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('nominalValue')" prop="nominalValue">
                        <Input v-model.trim="formData.nominalValue" :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--最低消费金额-->
                    <Form-item :label="$t('minConsumptionAmount')" prop="conditionLowerLimtation"><!--最低消费金额-->
                        <Input v-model.trim="formData.conditionLowerLimtation"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label-used"
                              :style="{right : lang === 'zh-CN' ? '-35px' : '-69px' }">{{$t('available')}}</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--最高消费金额-->
                    <Form-item :label="$t('maxConsumptionAmount')" prop="conditionUpperLimtation"><!--最高消费金额-->
                        <Input v-model.trim="formData.conditionUpperLimtation"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label-used"
                              :style="{right : lang === 'zh-CN' ? '-35px' : '-69px' }">{{$t('available')}}</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--有效开始日期-->
                    <Form-item :label="$t('effectiveStartDate')" prop="effectiveTime"><!--有效开始日期-->
                        <Date-picker
                            type="date"
                            transfer
                            :editable="false"
                            :options="pickerOptions"
                            v-model.trim="formData.effectiveTime"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--有效结束日期-->
                    <Form-item :label="$t('effectiveEndDate')" prop="expireTime"><!--有效结束日期-->
                        <Date-picker
                            type="date"
                            :editable="false"
                            transfer
                            :options="pickerOptions"
                            v-model.trim="formData.expireTime"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                </div>
                <!--折扣券和代金券店铺多选-->
                <div class="ivu-form-item-wrap">
                    <!--选择店铺-->
                    <Form-item :label="$t('chooseShop')" prop="conditionOrgId">
                        <Select v-model="formData.conditionOrgId"
                                :multiple="true"
                                :clearable="true"
                                :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="(item,index) in listAmountRange"
                                    :key="index"
                                    :value="item.id">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--可兑换积分为-->
                    <Form-item :label="$t('intergralExchangeCount')" prop="price"><!--积分兑换数量-->
                        <Input v-model="formData.price"  :placeholder="$t('inputField', {field: ''})" />
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--可用渠道-->
                    <Form-item :label="$t('availableChannels')" prop="conditionChannelId">
                        <Select v-model.trim="formData.conditionChannelId"
                                :multiple="true"
                                transfer
                                :clearable="true"
                                :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="(item,index) in channelSetList"
                                    :key="index"
                                    :value="item.id">
                                {{item.channelName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
            </Form>

            <!--代金券-->
            <Form ref="cashFormValidate"
                  v-if="formData.couponType === 'cash_coupon'"
                  :model="formData"
                  key="cashFormValidate"
                  :rules="ruleValidate"
                  label-position="top">
                <div class="ivu-form-item-wrap">
                    <!--卡券名称-->
                    <Form-item :label="$t('couponName')" prop="couponName"><!--卡券名称-->
                        <Input v-model.trim="formData.couponName"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--卡券类别-->
                    <Form-item :label="$t('couponType')" prop="couponType"><!--卡券类别-->
                        <Select v-model.trim="formData.couponType"
                                :placeholder="$t('selectField', {msg: ''})"
                                :disabled="type === 'modify'"
                                @on-change="typeChange('cashFormValidate')">
                            <Option v-for="(item,index) in couponTypeList"
                                    :key="index"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('couponFaceValue')" prop="nominalValue">
                        <Input v-model.trim="formData.nominalValue" :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--消费满-->
                    <Form-item :label="$t('spendOver')" prop="conditionLowerLimtation"><!--消费满-->
                        <Input v-model.trim="formData.conditionLowerLimtation"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <span class="label-used"
                              :style="{right : lang === 'zh-CN' ? '-35px' : '-69px' }">{{$t('available')}}</span><!--可用-->
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--有效开始日期-->
                    <Form-item :label="$t('effectiveStartDate')" prop="effectiveTime"><!--有效开始日期-->
                        <Date-picker
                            type="date"
                            transfer
                            :editable="false"
                            :options="pickerOptions"
                            v-model.trim="formData.effectiveTime"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--有效结束日期-->
                    <Form-item :label="$t('effectiveEndDate')" prop="expireTime"><!--有效结束日期-->
                        <Date-picker
                            type="date"
                            :editable="false"
                            transfer
                            :options="pickerOptions"
                            v-model.trim="formData.expireTime"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                </div>
                <!--折扣券和代金券店铺多选-->
                <div class="ivu-form-item-wrap">
                    <!--选择店铺-->
                    <Form-item :label="$t('chooseShop')" prop="conditionOrgId">
                        <Select v-model="formData.conditionOrgId"
                                :multiple="true"
                                :clearable="true"
                                :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="(item,index) in listAmountRange"
                                    :key="index"
                                    :value="item.id">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--可兑换积分为-->
                    <Form-item :label="$t('intergralExchangeCount')" prop="price"><!--积分兑换数量-->
                        <Input v-model="formData.price"  :placeholder="$t('inputField', {field: ''})" />
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--能否和会员折扣权益同时使用-->
                    <Form-item :label="$t('isUsedTogether')" prop="isDiscountCoexist">
                        <RadioGroup v-model="formData.isDiscountCoexist" @on-change="discountTypeChange">
                            <Radio label="true">{{$t('useSameTime')}}</Radio><!--可同时使用-->
                            <Radio label="false">{{$t('noUseSameTime')}}</Radio><!--不可同时使用-->
                        </RadioGroup>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.isDiscountCoexist === 'true'">
                    <!--代金券在折扣前后使用设置-->
                    <Form-item :label="$t('isUsedBeforeOrAfterDiscount')" prop="isEffectBeforeDiscount">
                        <RadioGroup v-model="formData.isEffectBeforeDiscount">
                            <Radio label="true">{{$t('availableBeforeDiscount')}}</Radio><!--折扣前可用-->
                            <Radio label="false">{{$t('availableAfterDiscount')}}</Radio><!--折扣后可用-->
                        </RadioGroup>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--可用渠道-->
                    <Form-item :label="$t('availableChannels')" prop="conditionChannelId">
                        <Select v-model.trim="formData.conditionChannelId"
                                :multiple="true"
                                transfer
                                :clearable="true"
                                :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="(item,index) in channelSetList"
                                    :key="index"
                                    :value="item.id">
                                {{item.channelName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.isDiscountCoexist === 'true'">
                </div>
            </Form>

            <!--兑换券-->
            <Form ref="exchangeFormValidate"
                  key="exchangeFormValidate"
                  v-if="formData.couponType === 'exchange_coupon'"
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">
                <div class="ivu-form-item-wrap">
                    <!--卡券名称-->
                    <Form-item :label="$t('couponName')" prop="couponName"><!--卡券名称-->
                        <Input v-model.trim="formData.couponName"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--卡券类别-->
                    <Form-item :label="$t('couponType')" prop="couponType"><!--卡券类别-->
                        <Select v-model.trim="formData.couponType"
                                :placeholder="$t('selectField', {msg: ''})"
                                :disabled="type === 'modify'"
                                @on-change="typeChange('cashFormValidate')">
                            <Option v-for="(item,index) in couponTypeList"
                                    :key="index"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--有效开始日期-->
                    <Form-item
                        :label="$t('effectiveStartDate')"
                        transfer
                        prop="effectiveTime"><!--有效开始日期-->
                        <Date-picker
                            type="date"
                            :editable="false"
                            transfer
                            :options="pickerOptions"
                            v-model.trim="formData.effectiveTime"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--有效结束日期-->
                    <Form-item :label="$t('effectiveEndDate')" prop="expireTime"><!--有效结束日期-->
                        <Date-picker
                            type="date"
                            :editable="false"
                            :options="pickerOptions"
                            transfer
                            v-model.trim="formData.expireTime"
                            :placeholder="$t('selectField', {msg: ''})">
                        </Date-picker>
                    </Form-item>
                </div>
                <!--兑换券店铺必须单选-->
                <div class="ivu-form-item-wrap">
                    <!--选择店铺-->
                    <Form-item :label="$t('chooseShop')" prop="singleStoreId"><!--选择店铺-->
                        <Select v-model="formData.singleStoreId"
                                :placeholder="$t('selectField', {msg: ''})"
                                :clearable="true"
                                @on-change="storeChange">
                            <Option v-for="(item,index) in listAmountRange"
                                    :key="index"
                                    :value="item.id">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--可兑换积分为-->
                    <Form-item :label="$t('intergralExchangeCount')" prop="price"><!--积分兑换数量-->
                        <Input v-model="formData.price"  :placeholder="$t('inputField', {field: ''})" />
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--可用渠道-->
                    <Form-item :label="$t('availableChannels')" prop="conditionChannelId">
                        <Select v-model.trim="formData.conditionChannelId"
                                :multiple="true"
                                transfer
                                :clearable="true"
                                :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="(item,index) in channelSetList"
                                    :key="index"
                                    :value="item.id">
                                {{item.channelName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--选择商品-->
                    <Form-item :label="$t('selectProduct')" prop="conditionProductId">
                        <Select v-model.trim="formData.conditionProductId"
                                :placeholder="$t('selectField', {msg: ''})">
                            <Option :value="item.id"
                                    v-for="item in productList"
                                    :key="item.id" >
                                {{item.productName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
            </Form>


            <!--<Form ref="formValidate"-->
                  <!--:model="formData"-->
                  <!--:rules="ruleValidate"-->
                  <!--label-position="top">-->
                <!--<div class="ivu-form-item-wrap">-->
                    <!--&lt;!&ndash;卡券名称&ndash;&gt;-->
                    <!--<Form-item :label="$t('couponName')" prop="couponName">&lt;!&ndash;卡券名称&ndash;&gt;-->
                        <!--<Input v-model.trim="formData.couponName"-->
                               <!--:placeholder="$t('inputField', {field: ''})"/>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap">-->
                    <!--&lt;!&ndash;卡券类别&ndash;&gt;-->
                    <!--<Form-item :label="$t('couponType')" prop="couponName">&lt;!&ndash;卡券类别&ndash;&gt;-->
                        <!--<Select v-model.trim="formData.couponType"-->
                                <!--:placeholder="$t('selectField', {msg: ''})"-->
                                <!--:disabled="type === 'modify'"-->
                                <!--@on-change="typeChange">-->
                            <!--<Option v-for="(item,index) in couponTypeList"-->
                                    <!--:key="index"-->
                                    <!--:value="item.value">-->
                                <!--{{$t(item.label)}}-->
                            <!--</Option>-->
                        <!--</Select>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap" v-if="formData.couponType === 'discount_coupon'">-->
                    <!--<Form-item :label="$t('nominalValue')" prop="nominalValue">-->
                        <!--<Input v-model.trim="formData.nominalValue" :placeholder="$t('inputField', {field: ''})"/>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon'">-->
                    <!--<Form-item :label="$t('couponFaceValue')" prop="nominalValue">-->
                        <!--<Input v-model.trim="formData.nominalValue" :placeholder="$t('inputField', {field: ''})"/>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon'">-->
                    <!--&lt;!&ndash;消费满&ndash;&gt;-->
                    <!--<Form-item :label="$t('spendOver')" prop="conditionLowerLimtation">&lt;!&ndash;消费满&ndash;&gt;-->
                        <!--<Input v-model.trim="formData.conditionLowerLimtation"-->
                               <!--:placeholder="$t('inputField', {field: ''})"/>-->
                        <!--<span class="label-used"-->
                              <!--:style="{right : lang === 'zh-CN' ? '-35px' : '-69px' }">{{$t('available')}}</span>&lt;!&ndash;可用&ndash;&gt;-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap" v-if="formData.couponType === 'discount_coupon'">-->
                    <!--&lt;!&ndash;最低消费金额&ndash;&gt;-->
                    <!--<Form-item :label="$t('minConsumptionAmount')" prop="conditionLowerLimtation">&lt;!&ndash;最低消费金额&ndash;&gt;-->
                        <!--<Input v-model.trim="formData.conditionLowerLimtation"-->
                               <!--:placeholder="$t('inputField', {field: ''})"/>-->
                        <!--<span class="label-used"-->
                              <!--:style="{right : lang === 'zh-CN' ? '-35px' : '-69px' }">{{$t('available')}}</span>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap" v-if="formData.couponType === 'discount_coupon'">-->
                    <!--&lt;!&ndash;最高消费金额&ndash;&gt;-->
                    <!--<Form-item :label="$t('maxConsumptionAmount')" prop="conditionUpperLimtation">&lt;!&ndash;最高消费金额&ndash;&gt;-->
                        <!--<Input v-model.trim="formData.conditionUpperLimtation"-->
                               <!--:placeholder="$t('inputField', {field: ''})"/>-->
                        <!--<span class="label-used"-->
                              <!--:style="{right : lang === 'zh-CN' ? '-35px' : '-69px' }">{{$t('available')}}</span>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap">-->
                    <!--&lt;!&ndash;有效开始日期&ndash;&gt;-->
                    <!--<Form-item :label="$t('effectiveStartDate')" prop="effectiveTime">&lt;!&ndash;有效开始日期&ndash;&gt;-->
                        <!--<Date-picker-->
                            <!--type="date"-->
                            <!--:editable="false"-->
                            <!--:options="pickerOptions"-->
                            <!--v-model.trim="formData.effectiveTime"-->
                            <!--:placeholder="$t('selectField', {msg: ''})">-->
                        <!--</Date-picker>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap">-->
                    <!--&lt;!&ndash;有效结束日期&ndash;&gt;-->
                    <!--<Form-item :label="$t('effectiveEndDate')" prop="expireTime">&lt;!&ndash;有效结束日期&ndash;&gt;-->
                        <!--<Date-picker-->
                            <!--type="date"-->
                            <!--:editable="false"-->
                            <!--:options="pickerOptions"-->
                            <!--v-model.trim="formData.expireTime"-->
                            <!--:placeholder="$t('selectField', {msg: ''})">-->
                        <!--</Date-picker>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--&lt;!&ndash;兑换券店铺必须单选&ndash;&gt;-->
                <!--<div class="ivu-form-item-wrap" v-if="formData.couponType === 'exchange_coupon'">-->
                    <!--&lt;!&ndash;选择店铺&ndash;&gt;-->
                    <!--<Form-item :label="$t('chooseShop')" prop="singleStoreId">&lt;!&ndash;选择店铺&ndash;&gt;-->
                        <!--<Select v-model="formData.singleStoreId"-->
                                <!--:placeholder="$t('selectField', {msg: ''})"-->
                                <!--:clearable="true"-->
                                <!--@on-change="storeChange">-->
                            <!--<Option v-for="(item,index) in listAmountRange"-->
                                    <!--:key="index"-->
                                    <!--:value="item.id">-->
                                <!--{{item.orgName}}-->
                            <!--</Option>-->
                        <!--</Select>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--&lt;!&ndash;折扣券和代金券店铺多选&ndash;&gt;-->
                <!--<div class="ivu-form-item-wrap" v-else>-->
                    <!--&lt;!&ndash;选择店铺&ndash;&gt;-->
                    <!--<Form-item :label="$t('chooseShop')" prop="conditionOrgId">-->
                        <!--<Select v-model="formData.conditionOrgId"-->
                                <!--:multiple="true"-->
                                <!--:clearable="true"-->
                                <!--:placeholder="$t('selectField', {msg: ''})">-->
                            <!--<Option v-for="(item,index) in listAmountRange"-->
                                    <!--:key="index"-->
                                    <!--:value="item.id">-->
                                <!--{{item.orgName}}-->
                            <!--</Option>-->
                        <!--</Select>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap">-->
                    <!--&lt;!&ndash;可兑换积分为&ndash;&gt;-->
                    <!--<Form-item :label="$t('intergralExchangeCount')" prop="price">&lt;!&ndash;积分兑换数量&ndash;&gt;-->
                        <!--<Input v-model="formData.price"  :placeholder="$t('inputField', {field: ''})" />-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon'">-->
                    <!--&lt;!&ndash;能否和会员折扣权益同时使用&ndash;&gt;-->
                    <!--<Form-item :label="$t('isUsedTogether')" prop="isDiscountCoexist">-->
                        <!--<RadioGroup v-model="formData.isDiscountCoexist" @on-change="discountTypeChange">-->
                            <!--<Radio label="true">{{$t('useSameTime')}}</Radio>&lt;!&ndash;可同时使用&ndash;&gt;-->
                            <!--<Radio label="false">{{$t('noUseSameTime')}}</Radio>&lt;!&ndash;不可同时使用&ndash;&gt;-->
                        <!--</RadioGroup>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon' && formData.isDiscountCoexist === 'true'">-->
                    <!--&lt;!&ndash;代金券在折扣前后使用设置&ndash;&gt;-->
                    <!--<Form-item :label="$t('isUsedBeforeOrAfterDiscount')" prop="isEffectBeforeDiscount">-->
                        <!--<RadioGroup v-model="formData.isEffectBeforeDiscount">-->
                            <!--<Radio label="true">{{$t('availableBeforeDiscount')}}</Radio>&lt;!&ndash;折扣前可用&ndash;&gt;-->
                            <!--<Radio label="false">{{$t('availableAfterDiscount')}}</Radio>&lt;!&ndash;折扣后可用&ndash;&gt;-->
                        <!--</RadioGroup>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap">-->
                    <!--&lt;!&ndash;可用渠道&ndash;&gt;-->
                    <!--<Form-item :label="$t('availableChannels')" prop="conditionChannelId">-->
                        <!--<Select v-model.trim="formData.conditionChannelId"-->
                                <!--:multiple="true"-->
                                <!--:clearable="true"-->
                                <!--:placeholder="$t('selectField', {msg: ''})">-->
                            <!--<Option v-for="(item,index) in channelSetList"-->
                                    <!--:key="index"-->
                                    <!--:value="item.id">-->
                                <!--{{item.channelName}}-->
                            <!--</Option>-->
                        <!--</Select>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon' || formData.couponType === 'discount_coupon'">-->
                    <!--&lt;!&ndash;可用店铺&ndash;&gt;-->
                    <!--<Form-item label="可用店铺" prop="useStore">-->
                        <!--<Select v-model.trim="formData.conditionOrgId"-->
                                <!--:multiple="true"-->
                                <!--:placeholder="$t('selectField', {msg: ''})">-->
                            <!--<Option v-for="(item,index) in listAmountRange"-->
                                    <!--:key="index"-->
                                    <!--:value="item.id">-->
                                <!--{{item.orgName}}-->
                            <!--</Option>-->
                        <!--</Select>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap" v-if="formData.couponType === 'exchange_coupon'">-->
                    <!--&lt;!&ndash;选择商品&ndash;&gt;-->
                    <!--<Form-item :label="$t('selectProduct')" prop="conditionProductId">-->
                        <!--<Select v-model.trim="formData.conditionProductId"-->
                                <!--:placeholder="$t('selectField', {msg: ''})">-->
                            <!--<Option :value="item.id"-->
                                    <!--v-for="item in productList"-->
                                    <!--:key="item.id" >-->
                                <!--{{item.productName}}-->
                            <!--</Option>-->
                        <!--</Select>-->
                    <!--</Form-item>-->
                <!--</div>-->
                <!--<div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon'"></div>-->

            <!--</Form>-->

            <div class="content-footer">
                <i-button type="primary"
                          class="ivu-btn-108px"
                          :loading="loading"
                          @click="formValidateFunc">{{$t('confirm')}}</i-button>
                <i-button type="ghost"
                          class="ivu-btn-108px"
                          @click="cancelEdit">
                    {{$t('cancel')}}
                </i-button>
            </div>
        </div>

    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import {couponTypeList} from '@/assets/js/constVariable.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import common from '@/assets/js/common.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import {mapGetters} from 'vuex';
    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead
        },
        data() {

            const validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
            };

            //校验卡券面值
            const validateCardFaceValue = (rule,value,callback) => {
                if(this.formData.couponType === 'discount_coupon'){
                    common.validateMoney(value,0,4).then(() => {
                        if(this.formData.couponType === 'discount_coupon'){
                            if(value <= 0 || value >= 10){
                                callback(this.$t('rangeError',{field : this.$t(rule.field),min : 0,max : 10}));
                            }else{
                                callback();
                            }
                        }else{
                            callback();
                        }
                    }).catch(err => {
                        if(err === 'errorMaxLength'){
                            callback(this.$t('errorMaxLength',{field : this.$t(rule.field),length : 4}));
                        }else{
                            callback(this.$t(err,{field : this.$t(rule.field)}));
                        }
                    });
                }else{
                    common.validateMoney(value,0,10).then(() => {
                        callback();
                    }).catch(err => {
                        if(err === 'errorMaxLength'){
                            callback(this.$t('errorMaxLength',{field : this.$t('couponFaceValue'),length : 10}));
                        }else{
                            callback(this.$t(err,{field : this.$t('couponFaceValue')}));
                        }
                    });
                }
            };

            //校验有效开始时间
            const validateStartTime = (rule,value,callback) => {
                if(common.isNotEmpty(value)){
                    if(this.formData.expireTime && value.valueOf() >  this.formData.expireTime.valueOf()){
                        // callback('有效开始时间不可大于结束时间');
                        callback(this.$t('sizeErrorB',{filed1 : this.$t('validStartTime'),filed2 : this.$t('validEndTime')}));
                    }else{
                        callback();
                    }
                }else{
                    callback(this.$t('selectField',{msg : this.$t('validStartTime')}));
                }
            };

            //校验有效结束时间
            const validateEndTime = (rule,value,callback) => {
                if(common.isNotEmpty(value)){
                    if(this.formData.effectiveTime && value.valueOf() <  this.formData.effectiveTime.valueOf()){
                        callback(this.$t('sizeErrorS',{filed1 : this.$t('validEndTime'),filed2 : this.$t('validStartTime')}));
                    }else{
                        callback();
                    }
                }else{
                    callback(this.$t('selectField',{msg : this.$t('validEndTime')}));
                }
            };

            //校验可兑换积分是否为正整数
            const validatePrice = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    if(err === 'errorMaxLength'){
                        callback(this.$t(err,{field : this.$t('intergralExchangeCount'),length : 10}));
                    }else{
                        callback(this.$t(err,{field : this.$t('intergralExchangeCount')}));
                    }
                });
            };

            //校验可用渠道
            const validateConditionChannelId = (rule,value,callback) => {
                if((this.formData.conditionOrgId && this.formData.conditionOrgId.length > 0) || this.formData.singleStoreId ){
                    callback();
                }else{
                    if(common.isNotEmpty(value)){
                        if(value.length > 0){
                            callback();
                        }else{
                            callback(this.$t('selectField',{msg : this.$t('validChannel')}));
                        }
                    }else{
                        callback(this.$t('selectField',{msg : this.$t('validChannel')}));
                    }
                }
            };

            //校验可用店铺
            const validateOrg = (rule,value,callback) => {
                if(this.formData.conditionChannelId && this.formData.conditionChannelId.length > 0){
                    callback();
                }else{
                    if(common.isNotEmpty(value)){
                        if(value.length > 0){
                            callback();
                        }else{
                            callback(this.$t('selectField',{msg : this.$t('shop')}));
                        }
                    }else{
                        callback(this.$t('selectField',{msg : this.$t('shop')}));
                    }
                }
            };

            //校验选择的商品
            const validateProduct = (rule,value,callback) => {
                if(this.formData.conditionProductId){
                    callback();
                }else{
                    if(common.isNotEmpty(value)){
                        if(value.length > 0){
                            callback();
                        }else{
                            callback(this.$t('selectField',{msg : this.$t('goods')}));
                        }
                    }else{
                        callback(this.$t('selectField',{msg : this.$t('goods')}));
                    }
                }
            };

            //校验单选店铺
            const validateSingleStore = (rule,value,callback) => {
                if(this.formData.conditionChannelId && this.formData.conditionChannelId.length > 0){
                    callback();
                }else{
                    if(common.isNotEmpty(value)){
                        if(value.length > 0){
                            callback();
                        }else{
                            callback(this.$t('selectField',{msg : this.$t('shop')}));
                        }
                    }else{
                        callback(this.$t('selectField',{msg : this.$t('shop')}));
                    }
                }
            };

            //校验最低消费金额
            const validateLowerMon = (rule,value,callback) => {
                common.validateMoney(value).then(() => {
                    if(common.isNotEmpty(this.formData.conditionUpperLimtation) && Number(value) > this.formData.conditionUpperLimtation){
                        callback(this.$t('sizeErrorB',{filed1 : this.$t('conditionLowerLimtation'),filed2 : this.$t('conditionUpperLimtation')}));
                    }else{
                        callback();
                    }
                }).catch(err => {
                    if(err === 'errorMaxLength'){
                        callback(this.$t('errorMaxLength',{field : this.$t(rule.field),length : 10}));
                    }else{
                        callback(this.$t(err,{field : this.$t(rule.field)}));
                    }
                });
            };

            //校验最高消费金额
            const validateUpperMon = (rule,value,callback) => {
                common.validateMoney(value).then(() => {
                    if(common.isNotEmpty(this.formData.conditionLowerLimtation) && Number(value) < this.formData.conditionLowerLimtation){
                        callback(this.$t('sizeErrorS',{filed1 : this.$t('conditionUpperLimtation'),filed2 : this.$t('conditionLowerLimtation')}));
                    }else{
                        callback();
                    }
                }).catch(err => {
                    if(err === 'errorMaxLength'){
                        callback(this.$t('errorMaxLength',{field : this.$t(rule.field),length : 10}));
                    }else{
                        callback(this.$t(err,{field : this.$t(rule.field)}));
                    }
                });
            };

            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: 'card',
                        router: {
                            name: 'card'
                        }
                    }
                ],
                //新增/修改
                type: '',
                loading: false,
                //卡券类别列表
                couponTypeList : couponTypeList,
                //渠道列表
                channelSetList : [],
                //可用店铺列表
                listAmountRange : [],
                //产品列表
                productList : [],
                // 表单数据
                formData: {
                    id : '',
                    status : 'valid',
                    //卡券名称
                    couponName: '',
                    //卡券类别
                    couponType: 'cash_coupon',
                    //卡券面值
                    nominalValue: '',
                    //最低消费金额后可用
                    conditionLowerLimtation: '',
                    // 最高消费金额内可用
                    conditionUpperLimtation: '',
                    //可兑换积分数
                    price : '',
                    // 有效开始时间
                    effectiveTime: '',
                    //有效结束时间
                    expireTime: '',
                    //可用店铺id
                    conditionOrgId : [],
                    //兑换券单选的店铺id
                    singleStoreId : '',
                    //可用渠道id
                    conditionChannelId: [],
                    //商品
                    conditionProductId: '',
                    //是否与会员折扣权益同时使用
                    isDiscountCoexist : 'false',
                    //代金券在折扣前后使用设置
                    isEffectBeforeDiscount : ''
                },
                //校验规则
                ruleValidate: {
                    couponName: [
                        { required: true, message: this.$t('inputField',{field : this.$t('couponName')}), trigger: 'blur' },
                        { type: 'string', max: 30, message: this.$t('errorMaxLength',{field : this.$t('couponName'),length : 30}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    couponType: [
                        { required: true, message: this.$t('selectField',{msg : this.$t('couponType')}), trigger: 'change' },
                    ],
                    nominalValue: [
                        { required: true, message: this.$t('inputField',{field : this.$t('couponFaceValue')}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateCardFaceValue, trigger: 'blur' },
                    ],
                    conditionLowerLimtation: [
                        { required: true, message: this.$t('inputField',{field : this.$t('conditionLowerLimtation')}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateLowerMon, trigger: 'blur' },
                    ],
                    conditionUpperLimtation: [
                        { required: true, message: this.$t('inputField',{field : this.$t('conditionUpperLimtation')}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateUpperMon, trigger: 'blur' },
                    ],
                    effectiveTime: [
                        { required: true, validator : validateStartTime, trigger: 'change' },
                    ],
                    expireTime: [
                        { required: true, validator : validateEndTime, trigger: 'change' },
                    ],
                    conditionOrgId: [
                        { required: true, validator : validateOrg, trigger: 'change' },
                    ],
                    price: [
                        { required: true, message: this.$t('inputField',{field : this.$t('pointsExchange')}), trigger: 'blur' },
                        { validator: validatePrice, trigger: 'blur' },
                    ],
                    conditionChannelId: [
                        { required: true, validator : validateConditionChannelId, trigger: 'change' },
                    ],
                    isDiscountCoexist : [
                        {required : true,trigger : 'change'}
                    ],
                    isEffectBeforeDiscount : [
                        {required : true,message : this.$t('selectField',{msg : this.$t('isEffectBeforeDiscount')}),trigger : 'change'}
                    ],
                    conditionProductId : [
                        {required :true ,validator : validateProduct ,trigger : 'change'}
                    ],
                    singleStoreId : [
                        {required : true,validator : validateSingleStore,trigger : 'change'}
                    ]
                },
                //日期插件配置
                pickerOptions : {
                    disabledDate(time) {
                        return time.getTime() < new Date().addDays(-1).valueOf();
                    },
                }
            }
        },
        methods: {

            /**
             * 表单校验
             */
            formValidateFunc () {
                let fromRef = '';
                if(this.formData.couponType === 'discount_coupon'){
                    fromRef = 'discountFormValidate'
                }else if(this.formData.couponType === 'cash_coupon'){
                    fromRef = 'cashFormValidate'
                }else if(this.formData.couponType === 'exchange_coupon'){
                    fromRef = 'exchangeFormValidate'
                }
                if(fromRef){
                    this.$refs[fromRef].validate((valid) => {
                        if ( valid ) {
                            this.loading = true;
                            this.updateCoupon();
                        }
                    })
                }
            },
            /**
             * 新增或编辑卡券
             */
            updateCoupon () {
                let params = this.getAddCouponParams();
                ajax.post('updateCoupon',params).then(res => {
                    if(res.success){
                        if(this.type === 'add'){
                            this.$Message.success(this.$t('successTip',{tip : this.$t('add')}));
                        }else{
                            this.$Message.success(this.$t('successTip',{tip : this.$t('modify')}));
                        }
                    }else{
                        if(this.type === 'add'){
                            this.$Message.error(this.$t('failureTip',{tip : this.$t('add')}));
                        }else{
                            this.$Message.error(this.$t('failureTip',{tip : this.$t('modify')}));
                        }
                    }
                }).finally(() => {
                    this.loading = false;
                    this.$router.push({
                        name : 'card'
                    });
                });
            },
            /**
             * 查询渠道
             */
            queryChannelSet () {
                ajax.post('querySelfOwnedChannel', {
                    pageNo: 1,
                    pageSize: 999
                }).then(res => {
                    if(res.success){
                        this.channelSetList = res.data ? res.data.data : [];
                    }else{
                        this.channelSetList =  [];
                    }
                }).catch(() => {
                    this.channelSetList =  [];
                });
            },
            /**
             * 查询所有店铺信息
             */
            queryListAmountRange () {
                ajax.post('getSubNode',{
                    orgType : 'scenic'
                }).then(res => {
                    if(res.success){
                        this.listAmountRange = res.data ? res.data : [];
                    }else{
                        this.listAmountRange =  [];
                    }
                }).catch(() => {
                    this.listAmountRange =  [];
                });
            },
            /**
             * 获取新增卡券的参数
             */
            getAddCouponParams () {
                if(this.formData.couponType === 'cash_coupon'){//新增代金券
                    return {
                        id : this.formData.id,
                        status : this.formData.status,
                        couponName : this.formData.couponName,
                        couponType : this.formData.couponType,
                        nominalValue : this.formData.nominalValue,
                        conditionLowerLimtation : this.formData.conditionLowerLimtation,
                        effectiveTime : this.formData.effectiveTime.format('yyyy-MM-dd'),
                        expireTime : this.formData.expireTime.format('yyyy-MM-dd'),
                        isDiscountCoexist : this.formData.isDiscountCoexist,
                        price : this.formData.price,
                        isEffectBeforeDiscount : this.formData.isEffectBeforeDiscount,
                        conditionChannelId : this.formData.conditionChannelId ? this.formData.conditionChannelId.join(',') : '',
                        conditionOrgId : this.formData.conditionOrgId.join(','),
                    }
                }else if(this.formData.couponType === 'exchange_coupon'){//新增兑换券
                    return {
                        id : this.formData.id,
                        status : this.formData.status,
                        couponName : this.formData.couponName,
                        couponType : this.formData.couponType,
                        effectiveTime : this.formData.effectiveTime.format('yyyy-MM-dd'),
                        expireTime : this.formData.expireTime.format('yyyy-MM-dd'),
                        price : this.formData.price,
                        conditionChannelId : this.formData.conditionChannelId ? this.formData.conditionChannelId.join(',') : '',
                        conditionProductId : this.formData.conditionProductId,
                        remark : this.getDiscountRemark(),
                        conditionOrgId : this.formData.singleStoreId,
                    }
                }else if(this.formData.couponType === 'discount_coupon'){//新增折扣券
                    return {
                        id : this.formData.id,
                        status : this.formData.status,
                        couponName : this.formData.couponName,
                        couponType : this.formData.couponType,
                        nominalValue : this.formData.nominalValue,
                        conditionLowerLimtation : this.formData.conditionLowerLimtation,
                        conditionUpperLimtation : this.formData.conditionUpperLimtation,
                        effectiveTime : this.formData.effectiveTime.format('yyyy-MM-dd'),
                        expireTime : this.formData.expireTime.format('yyyy-MM-dd'),
                        price : this.formData.price,
                        conditionOrgId : this.formData.conditionOrgId.length > 0 ? this.formData.conditionOrgId.join(',') : '',
                        conditionChannelId : this.formData.conditionChannelId ? this.formData.conditionChannelId.join(',') : '',
                    }
                }
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    for(let item in params){
                        if(item in this.formData){
                            if(['conditionChannelId','conditionOrgId'].includes(item)){
                                this.formData[item] = params[item] ? params[item].split(',') : '';
                            }else{
                                this.formData[item] = params[item];
                            }
                        }
                    }
                }
                this.type = this.$route.query.type;
            },
            /**
             * 卡券类别修改
             */
            typeChange (formRef) {
                this.$nextTick(() => {

                    let fromRef = '';
                    if(this.formData.couponType === 'discount_coupon'){
                        fromRef = 'discountFormValidate'
                    }else if(this.formData.couponType === 'cash_coupon'){
                        fromRef = 'cashFormValidate'
                    }else if(this.formData.couponType === 'exchange_coupon'){
                        fromRef = 'exchangeFormValidate'
                    }
                    if(fromRef){
                        this.$refs[fromRef].resetFields();
                    }
                });
            },
            /**
             * 获取兑换券的使用条件
             */
            getDiscountRemark () {
                let remark = [];
                let orgName = this.getSingleStore();
                this.channelSetList.forEach(item => {
                    if(this.formData.conditionChannelId.includes(item.id)){
                        remark.push(item.channelName);
                    }
                });
                this.productList.forEach(item => {
                    if(this.formData.conditionProductId === item.id){
                        remark.push(orgName + item.productName);
                    }
                    // if(this.formData.conditionProductId.includes(item.id)){
                    //     remark.push(orgName + item.productName);
                    // }
                });
                return remark.join(',');
            },
            /**
             * 能否和会员折扣权益同时使用修改,如果设置为不可同时使用，
             * 那么代金券在折扣前后使用规则必须清除
             */
            discountTypeChange (data) {
                if(data === 'false'){
                    this.formData.isEffectBeforeDiscount = '';
                }
            },
            /**
             * 取消编辑
             */
            cancelEdit () {
                this.$router.push({
                    name : 'card'
                });
            },
            /**
             * 查询商品信息
             * @param orgId
             */
            queryProduct (orgId) {
                ajax.post('queryProduct',{
                    orgId : orgId
                }).then(res => {
                    if(res.success){
                        this.productList = res.data.data ? res.data.data : [];
                    }else{
                        this.productList = [];
                    }
                }).catch(err => {
                    this.productList = [];
                });
            },
            /**
             * 选择店铺
             */
            storeChange (data) {
                this.queryProduct(data);
            },
            /**
             * 获取兑换券下选择店铺的名称
             */
            getSingleStore() {
                for(let i = 0,j = this.listAmountRange.length;i < j;i++){
                    if(this.formData.singleStoreId === this.listAmountRange[i].id){
                        return this.listAmountRange[i].orgName;
                    }
                }
                return '';
            }
        },
        created () {
            this.queryChannelSet();
            this.queryListAmountRange();
        },
        watch : {
            'formData.singleStoreId' (newVal,oldVal) {
                if(oldVal){
                    this.formData.conditionProductId  = '';
                }
                if(newVal){
                    this.queryProduct(newVal);
                }
            }
        },
        computed : {
            ...mapGetters({
                lang : 'lang'
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-card {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            background: $color_F4F6F8;
        }
        .form-container{
            width: 100%;
            background-color: #FFFFFF;
            border-radius: 4px;
            overflow: hidden;
            .ivu-input-icon{
                z-index: 2;
            }

            .ivu-form{
                padding: 40px 0 80px 65px;
                text-align: center;
                width: 1090px;
                margin: 0 auto;
            }

            .ivu-form-item-wrap{
                position: relative;
                display: inline-block;
                min-width: 405px;
                width: 48%;
                text-align: left;
                vertical-align: text-top;
                padding-right: 100px;

                /deep/ .ivu-radio-wrapper{
                    margin-right: 12px;
                }

                /deep/ .ivu-radio-group-item:nth-last-of-type(1){
                    margin-right: 0;
                }

                .btn-add-dept,
                .btn-add-position{
                    position: absolute;
                    left: calc(50% + 185px);
                    top: 5px;
                    font-size: 12px;
                    color: #1875F0;
                    letter-spacing: 0.75px;
                    cursor: pointer;
                }
            }

            .ivu-form-item{
                /*width: 395px;*/
                /*margin: 0 auto 20px;*/
                text-align: left;

                .ivu-date-picker {
                    display: block;
                }

                .ivu-select-selected-value,
                .ivu-input{
                    font-size: 14px;
                }

                .ivu-select-item{
                    font-size: 14px !important;
                }

                .label-used{
                    position: absolute;
                    @include absolute_pos(absolute,$right : -35px,$top : -1px);
                }
            }

            .register-info-footer{
                padding: 30px 20px;
                text-align: center;

                .ivu-btn{
                    width: 90px;
                    height: 30px;
                    padding: 4px 12px 3px;
                    font-size: 12px;
                    letter-spacing: 1.33px;
                }

                &.edit-footer .ivu-btn{
                    width: 90px;
                }

                .ivu-btn-ghost{
                    margin-left: 20px;
                    color: #666666;
                }
            }
        }

        .content-footer{
            text-align: center;

            /deep/ .ivu-btn-ghost{
                margin-left: 15px;;
            }
        }

    }
</style>


