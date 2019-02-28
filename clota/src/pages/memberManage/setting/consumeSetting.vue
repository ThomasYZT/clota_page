<template>
    <!--会员管理--积分消费管理-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <Form ref="formDynamic" :model="formDynamic">

            <!--储值积分比例设置-->
            <div class="content-item" v-if="showMemberRecharge">
                <div class="title">{{$t('storeIntegetSetting')}}</div>
                <div class="main">
                    <RadioGroup v-model="settingData.scoreFromCharging.chargingAddScore" vertical>
                        <Radio label="false">
                            <span>{{$t('storeWithouIntegetAGrowth')}}</span>
                        </Radio>
                        <Radio label="true">
                            <span>{{$t('storeAndScoreSetting')}}</span>
                        </Radio>
                    </RadioGroup>
                    <div class="check-group-wrap">{{$t('recharge')}}
                        <span :class="{'ivu-form-item-error': error.moneyToIntegrateError}">
                            <Input v-model.trim="settingData.scoreFromCharging.moneyToIntegrate"
                                   :disabled="settingData.scoreFromCharging.chargingAddScore !== 'true' ? true : false"
                                   @on-blur="checkInputBlurFunc(settingData.scoreFromCharging.moneyToIntegrate,'moneyToIntegrateError')"
                                   type="text"
                                   class="single-input"
                                   :placeholder="$t('inputField', {field: ''})"/> {{$t('yuanSaved')}}
                            <span class="ivu-form-item-error-tip"
                                  style="left: 92px;"
                                  v-if="error.moneyToIntegrateError">{{error.moneyToIntegrateError}}</span>
                        </span>
                        <span> {{settingData.scoreFromCharging.integrate}} {{$t('integral')}}</span>
                    </div>
                </div>
            </div>

            <!--储值获得积分生效设置-->
            <div class="content-item" v-if="showMemberRecharge">
                <div class="title">{{$t('storeIntegetRatioSetting')}}</div>
                <div class="main">
                    <RadioGroup v-model="settingData.scoreEffModeWhileCharging.storedType" vertical>
                        <Radio label="immediately">
                            <span>{{$t('rechartSucEffective')}}</span>
                        </Radio>
                        <Radio label="checkout_after" :class="{'ivu-form-item-error': error.growthTimeError}">
                            <span>{{$t('rechartSuc')}}</span>
                            <Input v-model.trim="settingData.scoreEffModeWhileCharging.storedTime"
                                   :disabled="settingData.scoreEffModeWhileCharging.storedType !== 'checkout_after' ? true : false"
                                   @on-blur="checkInputBlurFunc(settingData.scoreEffModeWhileCharging.storedTime,'growthTimeError')"
                                   type="text"
                                   class="single-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{$t('hourLaterInvalid')}}</span>
                            <span class="ivu-form-item-error-tip"
                                  style="left: 113px;"
                                  v-if="error.growthTimeError">{{error.growthTimeError}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <!--会员积分生效设置-->
            <div class="content-item">
                <div class="title">{{$t('memberIntegralSetting')}}</div>
                <div class="main">
                    <RadioGroup v-model="settingData.scoreEffectiveMode.isIntegralType" vertical>
                        <Radio label="immediately">
                            <span>{{$t('effectAfterPayed')}}</span><!--付款成功后立即生效-->
                        </Radio>
                        <Radio label="checkout">
                            <span>{{$t('effectAfterConsumption')}}</span><!--消费、核销成功后立即生效-->
                        </Radio>
                        <Radio label="checkout_after">
                            <span :class="{'ivu-form-item-error': error.isNoIntegralTimeError}">{{$t('afterConsumption')}}<!--消费、核销成功后-->
                                <Input v-model.trim="settingData.scoreEffectiveMode.isNoIntegralTime"
                                       :disabled="settingData.scoreEffectiveMode.isIntegralType !== 'checkout_after'"
                                       @on-blur="checkInputBlurFunc(settingData.scoreEffectiveMode.isNoIntegralTime, 'isNoIntegralTimeError')"
                                       type="text"
                                       :placeholder="$t('inputField', {field: ''})"
                                       class="single-input"/>
                                {{$tc('effectAfterTime',settingData.scoreEffectiveMode.isNoIntegralTime > 1 ? 2 : 1)}}</span><!--时后生效-->
                            <div class="ivu-form-item-error-tip"
                                 style="left: 153px;"
                                 v-if="error.isNoIntegralTimeError">{{error.isNoIntegralTimeError}}</div>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <!--会员生日积分多倍积分-->
            <div class="content-item" >
                <div class="title">{{$t('multiIntegralForBirth')}}</div>
                <div :class="{'ivu-form-item-error': error.multipleError, 'main': true}">
                    <i-switch v-model="settingData.scoreMultipleOnBirthday.isSwitch"></i-switch>
                    <span class="text">{{$t('gainOnBirthday')}}<!--会员生日当天消费可获得-->
                        <Input v-model.trim="settingData.scoreMultipleOnBirthday.multiple"
                               :disabled="!settingData.scoreMultipleOnBirthday.isSwitch"
                               @on-blur="checkInputBlurFunc(settingData.scoreMultipleOnBirthday.multiple, 'multipleError')"
                               type="text"
                               class="single-input"
                               :placeholder="$t('inputField', {field: ''})"/>
                        {{$t('timesIntegral')}}</span><!--倍积分-->
                    <div class="ivu-form-item-error-tip"
                         style="left: 230px;"
                         v-if="error.multipleError">{{error.multipleError}}</div>
                </div>
            </div>

            <!--会员积分有效期设置-->
            <div class="content-item">
                <div class="title">{{$t('integralValiditySet')}}</div>
                <div class="main form-bottom">
                    <RadioGroup v-model="settingData.scoreValidityPeriod.validityType"
                                vertical
                                :class="{'ivu-form-item-error': error.validityTimeError}">
                        <Radio label="perpetual">
                            <span>{{$t('permanentValidity')}}</span><!--永久有效-->
                        </Radio>
                        <Radio label="months_effective">
                                <span>{{$t('gainIntegral')}}<!--获得积分-->
                                    <Input v-model.trim="settingData.scoreValidityPeriod.validityTime"
                                           :disabled="settingData.scoreValidityPeriod.validityType !== 'months_effective'"
                                           @on-blur="checkInputBlurFunc(settingData.scoreValidityPeriod.validityTime, 'validityTimeError')"
                                           type="text"
                                           class="single-input"
                                           :placeholder="$t('inputField', {field: ''})"/>
                                    {{$t('invalidAfterMonths')}}</span><!--个月后失效，清除-->
                        </Radio>
                        <span class="ivu-form-item-error-tip"
                              style="left: 153px;left: 95px;top: 60px;"
                              v-if="error.validityTimeError">{{error.validityTimeError}}</span>
                    </RadioGroup>
                    <div class="check-group-wrap" :class="{'ivu-form-item-error': error.remindError}">
                        <Checkbox v-model="settingData.scoreValidityPeriod.checked"
                                  :disabled="settingData.scoreValidityPeriod.validityType !== 'months_effective'">
                        </Checkbox>{{$t('clearIntegral')}}<!--清除积分前-->
                        <Input v-model.trim="settingData.scoreValidityPeriod.remind"
                               :disabled="!settingData.scoreValidityPeriod.checked"
                               @on-blur="checkInputBlurFunc(settingData.scoreValidityPeriod.remind, 'remindError')"
                               type="text"
                               class="single-input"
                               :placeholder="$t('inputField', {field: ''})"/>
                        {{$t('smsRemindsBeforeDays')}}<!--天短信提醒-->
                        <div class="ivu-form-item-error-tip"
                             style="left: 155px;"
                             v-if="error.remindError">{{error.remindError}}</div>
                    </div>

                </div>
            </div>

            <!--会员3期暂时去掉-->
            <!--会员积分交易抵扣规则设置-->
            <!--<div class="content-item">-->
                <!--<div class="title">{{$t('setRulesForMemberPointTransactionDeduction')}}</div>-->
                <!--<div class="main">-->
                    <!--<div>-->
                        <!--<i-switch v-model="settingData.scoreOffsetInConsumption.type"></i-switch>-->
                        <!--<span class="text">{{$t('allowsCreditTradingWhenCreditIsUsed')}}</span>-->
                    <!--</div>-->
                    <!--<div class="check-group-wrap">-->
                        <!--<Checkbox v-model="settingData.scoreOffsetInConsumption.columns.integrateToMoney"-->
                                  <!--:disabled="!settingData.scoreOffsetInConsumption.columns.integrateToMoney">{{$t('consumeSettingPer')}}</Checkbox>-->
                        <!--<span :class="{'ivu-form-item-error': error.integrateError}">-->
                             <!--<Input v-model.trim="settingData.scoreOffsetInConsumption.columns.integrate"-->
                                    <!--:disabled="!settingData.scoreOffsetInConsumption.columns.integrateToMoney"-->
                                    <!--@on-blur="checkInputBlurFunc(settingData.scoreOffsetInConsumption.columns.integrate,'integrateError')"-->
                                    <!--type="text"-->
                                    <!--class="single-input"-->
                                    <!--:placeholder="$t('inputField', {field: ''})"/>-->
                             <!--<span class="ivu-form-item-error-tip"-->
                                   <!--style="left: 296px;"-->
                                   <!--v-if="error.integrateError">{{error.integrateError}}</span>-->
                        <!--</span>-->
                        <!--<span>{{$t('pointsDeduction')}}</span>-->
                        <!--<span :class="{'ivu-form-item-error': error.moneyError}">-->
                             <!--<Input v-model.trim="settingData.scoreOffsetInConsumption.columns.money"-->
                                    <!--:disabled="!settingData.scoreOffsetInConsumption.columns.integrateToMoney"-->
                                    <!--@on-blur="checkInputBlurFunc(settingData.scoreOffsetInConsumption.columns.money,'moneyError')"-->
                                    <!--type="text"-->
                                    <!--:placeholder="$t('inputField', {field: ''})"-->
                                    <!--class="single-input"/>-->
                             <!--<span class="ivu-form-item-error-tip"-->
                                   <!--style="left: 485px;"-->
                                   <!--v-if="error.moneyError">{{error.moneyError}}</span>-->
                        <!--</span>-->
                        <!--<span>{{$t('deductionToOrder')}}</span>-->
                        <!--<span :class="{'ivu-form-item-error': error.highProportionError}">-->
                             <!--<Input v-model.trim="settingData.scoreOffsetInConsumption.columns.highProportion"-->
                                    <!--:disabled="!settingData.scoreOffsetInConsumption.columns.integrateToMoney"-->
                                    <!--@on-blur="checkInputBlurFunc(settingData.scoreOffsetInConsumption.columns.highProportion,'highProportionError')"-->
                                    <!--type="text"-->
                                    <!--:placeholder="$t('inputField', {field: ''})"-->
                                    <!--class="single-input"/>-->
                             <!--<span class="ivu-form-item-error-tip"-->
                                   <!--style="left: 795px;"-->
                                   <!--v-if="error.highProportionError">{{error.highProportionError}}</span>-->
                        <!--</span>-->
                        <!--<span>%</span>-->
                    <!--</div>-->
                    <!--<div class="check-group-wrap">-->
                        <!--<Checkbox v-model="settingData.scoreOffsetInConsumption.meanwhile"-->
                                  <!--:disabled="!settingData.scoreOffsetInConsumption.columns.integrateToMoney">{{$t('canUseItTogetherWithCoupons')}}</Checkbox>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->

            <!--会员积分交易抵扣规则设置-->
            <integer-rule-setting class="content-item"
                                  :rule-data="settingData.scoreOffsetInConsumption"
                                  @add-integer-rule="addIntegerRule"
                                  @edit-integer-rule="editIntegetRule"
                                  @del-rule="delIntegerRule">
            </integer-rule-setting>
            <!--<div class="content-item">-->
                <!--<div class="title">{{$t('setRulesForMemberPointTransactionDeduction')}}</div>-->
                <!--<div class="main">-->
                    <!--<integer-rule-setting :rule-data="settingData.scoreOffsetInConsumption">-->
                    <!--</integer-rule-setting>-->
                <!--</div>-->
            <!--</div>-->

            <!--会员4期暂时去掉-->
            <!--<div class="content-item">-->
                <!--<div class="title">{{$t('canAllIntegerToMoney')}}</div>-->
                <!--<div class="main">-->
                    <!--<div>-->
                        <!--<i-switch v-model="settingData.scoreExToCharge.donateType"></i-switch>-->
                        <!--<span class="text">{{$t('allIntegerToMoney')}}</span>-->
                    <!--</div>-->
                    <!--<div class="check-group-wrap">-->
                        <!--{{$t('setTheExchangeRate')}}：-->
                        <!--<span :class="{'ivu-form-item-error': error.donateIntegrateError}">-->
                            <!--<Input v-model.trim="settingData.scoreExToCharge.donateIntegrate"-->
                                   <!--:disabled="!settingData.scoreExToCharge.donateType"-->
                                   <!--@on-blur="checkInputBlurFunc(settingData.scoreExToCharge.donateIntegrate,'donateIntegrateError')"-->
                                   <!--type="text"-->
                                   <!--:placeholder="$t('inputField', {field: ''})"-->
                                   <!--class="single-input"/>-->
                            <!--<span class="ivu-form-item-error-tip"-->
                               <!--style="left: 176px;"-->
                               <!--v-if="error.donateIntegrateError">{{error.donateIntegrateError}}</span>-->
                        <!--</span>-->
                        <!--{{$t('integral')}}-->
                        <!--<span> {{settingData.scoreExToCharge.donateMoney}} {{$t('yuan')}}</span>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->

            <!--会员4期暂时去掉-->
            <!--<div class="content-item">-->
                <!--<div class="title">{{$t('pointsReturnedForRefund')}}</div>-->
                <!--<div class="main">-->
                    <!--<i-switch v-model="settingData.scoreInsufficientNotification"></i-switch>-->
                    <!--<span class="text">{{$t('consumeSettingTips')}}</span>-->
                <!--</div>-->
            <!--</div>-->

            <div class="content-item">
                <div class="title">{{$t('isReturnIntegral')}}</div><!--用户退款时积分是否退还用户-->
                <div class="main">
                    <RadioGroup :value="String(settingData.handingWithScoreGrowthWhileRefund.score)"
                                @input="settingData.handingWithScoreGrowthWhileRefund.score = Boolean($event === 'true')"
                                vertical>
                        <Radio label="false">
                            <span>{{$t('noReturnIntegral')}}</span><!--用户退款时积分不退-->
                        </Radio>
                        <Radio label="true">
                            <span>{{$t('returnIntegral')}}</span><!--用户退款时积分退回用户积分账户中-->
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <!--新开卡会员积分赠送设置-->
            <div class="content-item">
                <div class="title">
                    {{$t('newCardMenberFreeScoreSetting')}}
                    <!--<Tooltip placement="top" transfer>-->
                        <!--<span class="iconfont icon-note"></span>-->
                        <!--<div slot="content">-->
                            <!--<div class="tip-trade">{{$t('新注册的会员在注册成功时是否要赠送积分，以及如果赠送的话赠送的积分数。')}}</div>-->
                        <!--</div>-->
                    <!--</Tooltip>-->
                </div>
                <div :class="{'ivu-form-item-error': error.memberDonateIntegerErr, 'main': true}">
                    <i-switch v-model="settingData.openCardSendScore.isSwitch"
                              @on-change="settingData.openCardSendScore.score = ''">
                    </i-switch>
                    <span class="text">{{$t('newCardDonate')}}<!--会员生日当天消费可获得-->
                        <Input v-model.trim="settingData.openCardSendScore.score"
                               :disabled="!settingData.openCardSendScore.isSwitch"
                               @on-blur="checkInputBlurFunc(settingData.openCardSendScore.score, 'memberDonateIntegerErr')"
                               type="text"
                               class="single-input"
                               :placeholder="$t('inputField', {field: ''})"/>
                        {{$t('integral')}}</span><!--倍积分-->
                    <div class="ivu-form-item-error-tip"
                         style="left: 173px;"
                         v-if="error.memberDonateIntegerErr">{{error.memberDonateIntegerErr}}
                    </div>
                </div>
            </div>

            <!--修改会员积分余额设置-->
            <div class="content-item">
                <div class="title">{{$t('scoreModifyReasons')}}</div><!--修改会员积分余额设置-->
                <div class="main">
                    <RadioGroup v-model="settingData.allowAdjustScoreAccount" vertical>
                        <Radio label="false">
                            <span>{{$t('notAllowScore')}}</span><!--不允许修改会员的积分账户-->
                        </Radio>
                        <Radio label="true">
                            <span>{{$t('allowModifyScore')}}<!--允许修改会员的积分账户，如允许修改，请设置修改原因-->
                                <span class="add-span blue-color"
                                      v-if="settingData.allowAdjustScoreAccount === 'true'"
                                      @click="handleAddReason"><Icon type="android-add"></Icon> {{$t('addModifyReason')}}</span><!--新增修改原因-->
                            </span>
                        </Radio>
                    </RadioGroup>
                    <div class="ivu-form-item-wrap margin-left-50"
                         v-show="settingData.allowAdjustScoreAccount === 'true' ? true : false">
                        <FormItem
                            v-for="(item, index) in formDynamic.reason"
                            v-if="item._status"
                            :key="index"
                            label=""
                            :prop="'reason.' + index + '.reason'"
                            :rules="[{required: true, message: $t('errorEmpty', {msg: $t('modifyReason')}), trigger: 'blur'},
                                 { validator: emoji, trigger: 'blur' }]"><!--修改原因不能为空-->
                            <Input type="text"
                                   :disabled="item.disabled"
                                   v-model.trim="item.reason" :maxlength="100"
                                   style="width: 290px"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span class="span-bottom red-color" v-if="item.active && index > 0"
                                  @click="deleteReason(item,index)">{{$t('del')}}</span><!--删除-->
                            <span class="span-bottom blue-color" v-if="!item.active"
                                  @click="handleSubmitForReason(item,index)">{{$t("save")}}</span>
                            <span class="span-bottom grey-color" v-if="!item.active"
                                  @click="handleResetReason(item,index)">{{$t('cancel')}}</span><!--取消-->
                        </FormItem>
                    </div>

                </div>
            </div>

            </Form>

        </div>

        <div class="btn-wrap">
            <Button type="primary" @click="save">{{$t("save")}}</Button>
            <Button type="ghost" @click="resetFieldFunc">{{$t("cancel")}}</Button>
        </div>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';
    import headerTabs from './components/headerTabs.vue';
    import { validator } from 'klwk-ui';
    import integerRuleSetting from './components/integerRuleSetting';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            headerTabs,
            integerRuleSetting
        },
        data () {
            return {
                //设置id
                id : '',
                //当前页面路由名称
                routerName : 'consumeSetting',
                //设置数据
                settingData : {
                    //修改会员积分、虚拟账户余额设置
                    allowAdjustScoreAccount : '',
                    //用户退款时积分是否退还用户
                    handingWithScoreGrowthWhileRefund : {
                        score : false,//Boolean
                        coupon : false,//Boolean
                    },
                    // 新开卡会员积分赠送设置
                    openCardSendScore : {
                        isSwitch : false,
                        score : ''
                    },
                    //储值获得成长值生效设置
                    scoreEffModeWhileCharging : {
                        storedType : '',
                        storedTime : '',//Number
                    },
                    //储值积分、成长值比例设置
                    scoreFromCharging : {
                        chargingAddScore : '',//Boolean
                        moneyToIntegrate : '',//储值额-积分 Number
                        integrate : 1,//积分
                    },
                    //会员积分有效期设置
                    scoreValidityPeriod : {
                        validityType : '',
                        validityTime : '',//number
                        checked : false,
                        remind : '',//number
                    },
                    //会员生日积分多倍积分
                    scoreMultipleOnBirthday : {
                        isSwitch : false,
                        multiple : '',//number
                    },

                    //积分交易抵扣规则
                    scoreOffsetInConsumption : [],
                    // 会员3期暂时去掉
                    // //积分交易抵扣规则
                    // scoreOffsetInConsumption : {
                    //     type : false,//Boolean
                    //     columns : {
                    //         integrateToMoney : false,//Boolean
                    //         integrate : '',//多少积分 Number
                    //         money : '',//多少金额 Number
                    //         highProportion : '',//最多能抵多少 Number
                    //     },
                    //     meanwhile : false,//Boolean
                    // },
                    //是否允许积分兑换成为储值账户金额
                    scoreExToCharge : {
                        donateType : false,//Boolean
                        donateIntegrate : '',//Number
                        donateMoney : 1,
                    },
                    // 会员4期暂时去掉
                    //退款时积分退回设置
                    // scoreInsufficientNotification : false,
                    //积分生效设置
                    scoreEffectiveMode : {
                        isIntegralType : '',
                        isNoIntegralTime : ''//number
                    },
                },
                //copy数据，用于数据重置
                copySetData : {},
                //输入框校验错误显示
                error : {
                    growthTimeError : '',//成长值生效设置
                    moneyToIntegrateError : '',//储值获得积分生效设置
                    validityTimeError : '',//会员积分有效期设置
                    multipleError : '',//会员生日积分多倍积分
                    integrateError : '',//积分交易抵扣规则--多少积分
                    moneyError : '',//积分交易抵扣规则--多少金额
                    highProportionError : '',//积分交易抵扣规则--最多能抵多少
                    donateIntegrateError : '',
                    isNoIntegralTimeError : '',//会员积分生效设置
                    memberDonateIntegerErr : '',//新开卡会员积分赠送设置
                },
                //Number型
                numberProps : ['integrate','money','highProportion','donateIntegrate','growthSet','growthTime'],
                //String型
                stringProps : ['integrate','money','highProportion','donateIntegrate','growthSet','growthTime','chargingAddScore'],
                //动态表单数据
                reasonIndex : 1,
                formDynamic : {
                    reason : [],
                },
                //用于动态表单校验(特殊字符)
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error(this.$t('errorIrregular'))); // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
            };
        },
        watch : {

            //储值获得积分、成长值生效设置
            'settingData.scoreEffModeWhileCharging.storedType' : function (newVal, oldVal) {
                if (newVal !== 'checkout_after') {
                    this.error.storedTimeError = '';
                }
            },

            //会员积分有效期设置
            'settingData.scoreValidityPeriod.validityType' : function (newVal, oldVal) {
                if (newVal === 'perpetual') {
                    this.settingData.scoreValidityPeriod.checked = false;
                    this.error.validityTimeError = '';
                    this.error.remindError = '';
                }
                if (newVal === 'months_effective') {
                    this.settingData.scoreValidityPeriod.checked = true;
                }
            },
            'settingData.scoreValidityPeriod.checked' : function (newVal, oldVal) {
                if (!newVal) {
                    this.error.remindError = '';
                }
            },

            //会员生日积分多倍积分
            'settingData.scoreMultipleOnBirthday.isSwitch' : function (newVal, oldVal) {
                if (!newVal) {
                    this.error.multipleError = '';
                }
            },

            //积分生效设置
            'settingData.scoreEffectiveMode.isIntegralType' : function (newVal, oldVal) {
                if (newVal !== 'checkout_after') {
                    this.error.isNoIntegralTimeError = '';
                }
            },

            // 会员3期暂时去掉
            // //会员积分有效期设置
            // 'settingData.scoreOffsetInConsumption.type' : function (newVal, oldVal) {
            //     if (newVal) {
            //         this.settingData.scoreOffsetInConsumption.columns.integrateToMoney = true;
            //         this.settingData.scoreOffsetInConsumption.meanwhile = true;
            //     } else {
            //         this.settingData.scoreOffsetInConsumption.columns.integrateToMoney = false;
            //         this.settingData.scoreOffsetInConsumption.meanwhile = false;
            //         this.error.integrateError = '';
            //         this.error.moneyError = '';
            //         this.error.highProportionError = '';
            //     }
            // },

            // 会员3期暂时去掉
            // //会员积分有效期设置复选框
            // 'settingData.scoreOffsetInConsumption.columns.integrateToMoney' : function (newVal, oldVal) {
            //     if (!newVal) {
            //         this.settingData.scoreOffsetInConsumption.type = false;
            //         this.settingData.scoreOffsetInConsumption.meanwhile = false;
            //         this.error.integrateError = '';
            //         this.error.moneyError = '';
            //         this.error.highProportionError = '';
            //     }
            // },

            //会员积分有效期设置
            'settingData.scoreExToCharge.donateType' : function (newVal, oldVal) {
                if (!newVal) {
                    this.error.donateIntegrateError = '';
                }
            },

        },
        created () {
            //查询会员基础设置
            this.findBasicSet();
            //查询修改原因
            this.listAdjustReason();
        },
        methods : {

            //数据转换，数据查询后转成string进入input，保存时转成相应类型
            transPropsType ( data, type ) {
                switch (type) {
                    case 'number':
                        return data ? Number(data) : 0;
                    case 'boolean':
                        return data === 'true' ? true : false;
                    case 'string':
                        return data !== null ? String(data) : '';
                }
            },

            //查询会员基础设置
            findBasicSet () {
                ajax.post('findBasicSet', {}).then(res => {
                    if ( res.success) {
                        if (res.data) {
                            this.id = res.data.id;
                            //处理数据
                            let params = {
                                scoreEffModeWhileCharging : res.data.scoreEffModeWhileCharging ?
                                    JSON.parse(res.data.scoreEffModeWhileCharging) : this.settingData.scoreEffModeWhileCharging,
                                scoreFromCharging : res.data.scoreFromCharging ?
                                    JSON.parse(res.data.scoreFromCharging) : this.settingData.scoreFromCharging,
                                scoreValidityPeriod : JSON.parse(res.data.scoreValidityPeriod),
                                scoreMultipleOnBirthday : JSON.parse(res.data.scoreMultipleOnBirthday),
                                scoreEffectiveMode : JSON.parse(res.data.scoreEffectiveMode),
                                // scoreOffsetInConsumption : JSON.parse(res.data.scoreOffsetInConsumption),//会员3期暂时去掉
                                scoreOffsetInConsumption : res.data.scoreOffsetInConsumption ? JSON.parse(res.data.scoreOffsetInConsumption) : [],
                                scoreExToCharge : JSON.parse(res.data.scoreExToCharge),
                                // 会员4期暂时去掉
                                // scoreInsufficientNotification : res.data.scoreInsufficientNotification === 'true' ?
                                // Boolean(res.data.scoreInsufficientNotification) : false,
                                openCardSendScore : res.data.openCardSendScore ? JSON.parse(res.data.openCardSendScore) : {
                                    isSwitch : false,
                                    score : ''
                                },
                                allowAdjustScoreAccount : res.data.allowAdjustScoreAccount,
                                handingWithScoreGrowthWhileRefund : res.data.handingWithScoreGrowthWhileRefund ? JSON.parse(res.data.handingWithScoreGrowthWhileRefund) : {
                                    score : false,//Boolean
                                    coupon : false,//Boolean
                                },
                            };
                            for ( let key in params) {
                                if (key && Object.keys(params[key]).length > 0) {
                                    for ( let ckey in params[key]) {
                                        if (this.stringProps.indexOf(ckey) > -1) {
                                            params[key][ckey] = this.transPropsType(params[key][ckey], 'string');
                                        }
                                        if (ckey === 'columns') {
                                            params[key][ckey].integrate = this.transPropsType(params[key][ckey].integrate, 'string');
                                            params[key][ckey].money = this.transPropsType(params[key][ckey].money, 'string');
                                            params[key][ckey].highProportion = this.transPropsType(params[key][ckey].highProportion, 'string');
                                        }
                                    }
                                }
                            }
                            this.settingData = params;
                            //复制数据
                            this.copySetData = defaultsDeep({}, params);
                        } else {
                            this.copySetData = defaultsDeep({}, this.settingData);
                        }
                    }
                });
            },
            //点击保存，校验信息，数据处理
            save () {
                if (this.checkInputFunc()) {

                    let setParam = defaultsDeep({}, this.settingData);
                    for ( let key in setParam) {
                        if (key && Object.keys(setParam[key]).length > 0) {
                            for ( let ckey in setParam[key]) {
                                if (this.numberProps.indexOf(ckey) > -1) {
                                    setParam[key][ckey] = this.transPropsType(setParam[key][ckey], 'number');
                                }
                                if (ckey === 'columns') {
                                    setParam[key][ckey].integrate = this.transPropsType(setParam[key][ckey].integrate, 'number');
                                    setParam[key][ckey].money = this.transPropsType(setParam[key][ckey].money, 'number');
                                    setParam[key][ckey].highProportion = this.transPropsType(setParam[key][ckey].highProportion, 'number');
                                }
                            }
                        }
                    }
                    setParam.id = this.id;

                    let params = {
                        id : this.id,
                        scoreEffModeWhileCharging : JSON.stringify(setParam.scoreEffModeWhileCharging),
                        scoreFromCharging : JSON.stringify(setParam.scoreFromCharging),
                        scoreMultipleOnBirthday : JSON.stringify(setParam.scoreMultipleOnBirthday),
                        scoreOffsetInConsumption : JSON.stringify(setParam.scoreOffsetInConsumption),
                        scoreExToCharge : JSON.stringify(setParam.scoreExToCharge),
                        // 会员4期暂时去掉
                        // scoreInsufficientNotification : String(setParam.scoreInsufficientNotification),
                        scoreEffectiveMode : JSON.stringify(setParam.scoreEffectiveMode),
                        scoreValidityPeriod : JSON.stringify(setParam.scoreValidityPeriod),
                        openCardSendScore : JSON.stringify(this.settingData.openCardSendScore),
                        handingWithScoreGrowthWhileRefund : JSON.stringify(this.settingData.handingWithScoreGrowthWhileRefund),
                        allowAdjustScoreAccount : this.settingData.allowAdjustScoreAccount,
                    };
                    this.basicSet(params);

                }
            },
            //会员积分消费设置-保存/修改
            basicSet ( params ) {
                ajax.post('basicSet', params).then(res => {
                    if ( res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('saveCreditConsumptionSettings') }));
                        this.findBasicSet();
                    }
                });
            },
            //点击取消重置数据
            resetFieldFunc () {
                if (this.copySetData !== {}) {
                    this.settingData = defaultsDeep({}, this.copySetData);
                }
            },

            //校验选项勾选是输入框是否填写，返回true/false
            checkInputFunc () {
                if (this.settingData.openCardSendScore.isSwitch === true &&
                    !this.checkInputBlurFunc(this.settingData.openCardSendScore.score, 'memberDonateIntegerErr')) {
                    return false;
                }

                if (this.settingData.scoreEffModeWhileCharging.storedType === 'checkout_after' &&
                    !this.checkInputBlurFunc(this.settingData.scoreEffModeWhileCharging.storedTime, 'storedTimeError') ) {
                    return false;
                }

                if (this.settingData.scoreValidityPeriod.validityType === 'months_effective' &&
                    !this.checkInputBlurFunc(this.settingData.scoreValidityPeriod.validityTime,'validityTimeError')) {
                    return false;
                }

                if (this.settingData.scoreFromCharging.chargingAddScore === 'true' &&
                    !this.checkInputBlurFunc(this.settingData.scoreFromCharging.moneyToIntegrate, 'moneyToIntegrateError') ) {
                    return false;
                }

                if (this.settingData.scoreValidityPeriod.checked &&
                    !this.checkInputBlurFunc(this.settingData.scoreValidityPeriod.validityTime,'remindError')) {
                    return false;
                }
                if (this.settingData.scoreMultipleOnBirthday.isSwitch &&
                    !this.checkInputBlurFunc(this.settingData.scoreMultipleOnBirthday.multiple,'multipleError')) {
                    return false;
                }
                // 会员3期暂时去掉
                // if (this.settingData.scoreOffsetInConsumption.columns.integrateToMoney &&
                //     !this.checkInputBlurFunc(this.settingData.scoreOffsetInConsumption.columns.integrate, 'integrateError')) {
                //     return false;
                // }

                // 会员3期暂时去掉
                // if (this.settingData.scoreOffsetInConsumption.columns.integrateToMoney &&
                //     !this.checkInputBlurFunc(this.settingData.scoreOffsetInConsumption.columns.money, 'moneyError')) {
                //     return false;
                // }

                // 会员3期暂时去掉
                // if (this.settingData.scoreOffsetInConsumption.columns.integrateToMoney &&
                //     !this.checkInputBlurFunc(this.settingData.scoreOffsetInConsumption.columns.highProportion, 'highProportionError')) {
                //     return false;
                // }

                if (this.settingData.scoreExToCharge.donateType &&
                    !this.checkInputBlurFunc(this.settingData.scoreExToCharge.donateIntegrate, 'donateIntegrateError')) {
                    return false;
                }

                return true;
            },

            /**
             * 输入框失焦校验
             * @param val 值
             * @param errorField 校验错误显示字段
             */
            checkInputBlurFunc ( val, errorField ) {

                //校验不为空
                if (common.isNotEmpty(val)) {
                    this.error[errorField] = '';
                } else {
                    this.error[errorField] = this.$t('inputField', { field : '' });
                    return false;
                }

                //校验表情符号
                if (val && String(val).isUtf16()) {
                    this.error[errorField] = this.$t('errorIrregular'); // 输入内容不合规则
                    return false;
                } else {
                    this.error[errorField] = '';
                }
                //正整数，长度校验
                if (validator.isNumber(val)) {
                    let numStr = String(val);
                    if (numStr.length < 1) {
                        this.error[errorField] = this.$t('errorMinLength',{ field : '',length : 1 });
                        return false;
                    } else if (numStr.length > 10) {
                        this.error[errorField] = this.$t('errorMaxLength', { field : '',length : 10 });
                        return false;
                    } else {
                        if (Number.parseInt(val) === Number.parseFloat(val)) {
                            if (val < 0 || val == 0) {
                                this.error[errorField] = this.$t('fieldTypeError', { field : '' });
                                return false;
                            } else {
                                this.error[errorField] = '';
                            }
                        } else {
                            this.error[errorField] = this.$t('integetError', { field : '' });
                            return false;
                        }
                    }
                } else {
                    this.error[errorField] = this.$t('integetError', { field : '' });
                    return false;
                }

                return true;
            },

            /**
             * 获取新增的积分规则信息
             * @param ruleData
             */
            addIntegerRule (ruleData) {
                this.settingData.scoreOffsetInConsumption.push(ruleData);
            },
            /**
             * 删除积分兑换规则
             * @param index
             */
            delIntegerRule (index) {
                this.settingData.scoreOffsetInConsumption.splice(index,1);
            },

            /**
             * 编辑积分兑换规则
             * @param data
             * @param index
             */
            editIntegetRule ({ data,index }) {
                this.$set(this.settingData.scoreOffsetInConsumption,index,data);
            },
            //新增修改原因
            handleAddReason () {
                this.reasonIndex++;
                this.formDynamic.reason.push({
                    reason : '',
                    index : this.reasonIndex,
                    _status : 1,
                    disabled : false,
                });
            },

            //查询修改原因
            listAdjustReason () {
                this.formDynamic.reason = [];
                ajax.post('listAdjustReason',{
                    reasonType : 'score'
                }).then(res => {
                    if (res.success) {
                        if (res.data && res.data.length > 0) {
                            res.data.forEach((item, index) => {
                                item.index = index;
                                item._status = 1;
                                item.active = true;
                                item.disabled = true;
                                this.formDynamic.reason.push(item);
                            });
                        }
                    }
                });
            },
            //修改原因表单校验
            handleSubmitForReason (data, index) {
                this.$refs.formDynamic.validateField('reason.' + index + '.reason', (valid) => {
                    if (valid === '') {
                        this.updateReason(data, index);
                    }
                });
            },
            //增加/修改原因
            updateReason (data, index) {
                ajax.post('addAdjustReason', {
                    reason : data.reason,
                    reasonType : 'score'
                }).then(res => {
                    if (res.success) {
                        this.formDynamic.reason[index].disabled = true;
                        this.formDynamic.reason[index].active = true;
                        this.$Message.success(this.$t('successTip', { tip : this.$t('addReason') })); // 新增原因成功
                    }
                });
            },
            //删除原因
            deleteReason (data, index) {
                ajax.post('deleteAdjustReason', {
                    reasonId : data.id,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('delReason') })); // 删除原因成功
                        this.formDynamic.reason[index]._status = 0;
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('delReason') })); // 删除原因成功
                    }
                });
            },
            //取消原因表单校验
            handleResetReason (data, index) {
                this.$refs.formDynamic.resetFields('reason.' + index + '.reason');
                this.formDynamic.reason[index]._status = 0;
            },

        },
        computed : {
            ...mapGetters([
                'memberConfigInfo'
            ]),
            //是否可以显示会员储值相关信息
            showMemberRecharge () {
                return this.memberConfigInfo && this.memberConfigInfo['memberRecharge'] && this.memberConfigInfo['memberRecharge'] === 'true';
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .setting{
        @include block_outline();
        min-width: $content_min_width;
        background: $color-fff;
        border-radius: 4px;

        .content{
            padding: 30px 60px;
            height: calc(100% - 124px);
            overflow: auto;

            .content-item{
                position: relative;
                margin-bottom: 30px;

                .add-span {
                    font-size: $font_size_14px;
                    margin-left: 20px;
                }

                .blue-color {
                    font-size: $font_size_14px;
                    color: $color_blue;
                    cursor: pointer;
                }

                .red-color {
                    font-size: $font_size_14px;
                    color: $color_red;
                    cursor: pointer;
                }
                .grey-color {
                    font-size: $font_size_14px;
                    color: $color_999;
                    cursor: pointer;
                }
                .span-bottom {
                    vertical-align: bottom;
                }

                /deep/ .title{
                    font-size: $font_size_16px;
                    color: $color_333;
                    line-height: 24px;
                    margin-bottom: 15px;
                }

                /deep/ .ivu-form-item-wrap {
                    position: relative;
                    /*display: inline-block;*/
                    min-width: 495px;
                    padding-right: 55px;
                    width: 40%;
                    text-align: center;
                    vertical-align: middle;

                    .ivu-form-item {
                        width: 520px;
                        text-align: left;
                        margin-bottom: 10px;
                    }

                    &.short-wrap {
                        min-width: 360px;
                        .ivu-form-item {
                            width: 360px;
                        }
                    }
                    &.margin-left-50 {
                        margin-left: 50px;
                    }
                }
            }

        }

        /deep/ .ivu-input-wrapper{
            vertical-align: middle;

            &.single-input {
                margin: 0 10px;
                width: 100px !important;
            }
        }

        .check-group-wrap{
            padding-left: 50px;
            margin-bottom: 0 !important;
            position: relative;
            margin-top : 10px;

            &:nth-child(1){
                margin-top: 10px;
            }

            /deep/ .ivu-checkbox-wrapper{
                margin-right: 0px;
            }

            /deep/ .ivu-checkbox{
                margin-right: 5px;
            }
        }

        .btn-wrap{
            height: 56px;
            width: 100%;
            line-height: 56px;
            text-align: center;
            background: #FFFFFF;
            box-shadow: 0 -5px 3px 0 rgba(0, 0, 0, 0.03);

            /deep/ .ivu-btn{
                width: 108px;
                padding: 5px 30px;
            }
            .ivu-btn + .ivu-btn{
                margin-left: 20px;
            }
        }

    }
</style>

