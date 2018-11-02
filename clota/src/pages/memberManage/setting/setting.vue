<template>
    <!--会员管理--基础设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <Form ref="formDynamic" :model="formDynamic">

                <div class="content-item">
                    <div class="title">{{$t('会员卡有效期')}}</div><!--会员卡有效期-->
                    <el-collapse :value="collapseOpened">
                        <el-collapse-item v-for="(item,title,index) in memberLevelsData"
                                          :key="index"
                                          :title="title"
                                          :name="title">
                            <table-com
                                :column-data="getColumnData(item)"
                                :table-data="getTableData(item)"
                                :border="true"
                                :height="95">
                            </table-com>
                        </el-collapse-item>
                    </el-collapse>
                </div>


                <!--会员3期暂时去掉-->
                <!--<div class="content-item">-->
                    <!--<div class="title">{{$t('memberCardValiditySet')}}</div>&lt;!&ndash;会员卡有效期设置&ndash;&gt;-->
                    <!--<div class="main margin-radio-group form-bottom">-->
                        <!--<RadioGroup v-model="settingData.memberValidPeriod.type" vertical>-->
                            <!--<Radio label="perpetual">-->
                                <!--<span>{{$t('permanentValidity')}}</span>&lt;!&ndash;永久有效&ndash;&gt;-->
                            <!--</Radio>-->
                            <!--<Radio label="vipValidityTime" :class="{'ivu-form-item-error': error.vipValidityTimeError}">-->
                                <!--<span>{{$t('lastTimeConsume')}}&lt;!&ndash;最后一次消费&ndash;&gt;-->
                                <!--<Input v-model.trim="settingData.memberValidPeriod.vipValidityTime"-->
                                       <!--:disabled="settingData.memberValidPeriod.type !== 'vipValidityTime' ? true : false"-->
                                       <!--@on-blur="checkInputBlurFunc(settingData.memberValidPeriod.vipValidityTime,'vipValidityTimeError')"-->
                                       <!--type="text"-->
                                       <!--class="single-input"-->
                                       <!--:placeholder="$t('inputField', {field: ''})"/>-->
                                    <!--{{$t('freezeUnusedForDays')}}</span>&lt;!&ndash;天后如未使用，冻结该会员卡&ndash;&gt;-->
                                <!--<div class="ivu-form-item-error-tip"-->
                                     <!--style="left: 123px;"-->
                                     <!--v-if="error.vipValidityTimeError">{{error.vipValidityTimeError}}-->
                                <!--</div>-->
                            <!--</Radio>-->
                            <!--<Radio label="vipValidity" :class="{'ivu-form-item-error': error.vipValidityError}">-->
                            <!--<span>{{$t('openCard')}}&lt;!&ndash;开卡&ndash;&gt;-->
                             <!--<Input v-model.trim="settingData.memberValidPeriod.vipValidityType"-->
                                    <!--:disabled="settingData.memberValidPeriod.type !== 'vipValidity' ? true : false"-->
                                    <!--@on-blur="checkInputBlurFunc(settingData.memberValidPeriod.vipValidityType,'vipValidityError')"-->
                                    <!--type="text"-->
                                    <!--class="single-input"-->
                                    <!--:placeholder="$t('inputField', {field: ''})"/>-->
                                <!--{{$t('freezeCardForDays')}}</span>&lt;!&ndash;天后冻结该会员卡&ndash;&gt;-->
                                <!--<div class="ivu-form-item-error-tip"-->
                                     <!--style="left: 68px;"-->
                                     <!--v-if="error.vipValidityError">{{error.vipValidityError}}-->
                                <!--</div>-->
                            <!--</Radio>-->
                            <!--<Radio label="vipNumber" :class="{'ivu-form-item-error': error.vipNumberError}">-->
                            <!--<span>{{$t('memberCardUsing')}}&lt;!&ndash;会员卡使用&ndash;&gt;-->
                             <!--<Input v-model.trim="settingData.memberValidPeriod.vipNumber"-->
                                    <!--:disabled="settingData.memberValidPeriod.type !== 'vipNumber' ? true : false"-->
                                    <!--@on-blur="checkInputBlurFunc(settingData.memberValidPeriod.vipNumber,'vipNumberError')"-->
                                    <!--type="text"-->
                                    <!--class="single-input"-->
                                    <!--:placeholder="$t('inputField', {field: ''})"/>-->
                                <!--{{$t('freezeCardForTimes')}}</span>&lt;!&ndash;次后冻结该会员卡&ndash;&gt;-->
                                <!--<div class="ivu-form-item-error-tip"-->
                                     <!--style="left: 110px;"-->
                                     <!--v-if="error.vipNumberError">{{error.vipNumberError}}-->
                                <!--</div>-->
                            <!--</Radio>-->
                        <!--</RadioGroup>-->
                    <!--</div>-->
                <!--</div>-->

                <!--会员3期暂时去掉-->
                <!--<div class="content-item">-->
                <!--<div class="title">{{$t('invalidCouponRemind')}}</div>&lt;!&ndash;卡券过期提醒设置&ndash;&gt;-->
                <!--<div :class="{'ivu-form-item-error': error.dayError, 'main': true}">-->
                <!--<i-switch v-model="settingData.notificationBeforeCouponExpire.isSwitch"></i-switch>-->
                <!--<span class="text">{{$t('beforeInvalidCoupon')}}&lt;!&ndash;卡券过期前&ndash;&gt;-->
                <!--<Input v-model.trim="settingData.notificationBeforeCouponExpire.day"-->
                <!--:disabled="!settingData.notificationBeforeCouponExpire.isSwitch"-->
                <!--@on-blur="checkInputBlurFunc(settingData.notificationBeforeCouponExpire.day,'dayError')"-->
                <!--type="text"-->
                <!--class="single-input"-->
                <!--:placeholder="$t('inputField', {field: ''})"/> {{$t('smsRemindsBeforeDays')}}，&lt;!&ndash;天短信提醒&ndash;&gt;-->
                <!--<span class="blue-color">{{$t('smsSetting')}}</span>&lt;!&ndash;短信设置&ndash;&gt;-->
                <!--</span>-->
                <!--<div class="ivu-form-item-error-tip"-->
                <!--style="left: 145px;"-->
                <!--v-if="error.dayError">{{error.dayError}}</div>-->
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

                <!--会员3期暂时去掉-->
                <!--<div class="content-item">-->
                <!--<div class="title">{{$t('isReturnCoupon')}}</div>&lt;!&ndash;用户退款时卡券是否退还用户&ndash;&gt;-->
                <!--<div class="main">-->
                <!--<RadioGroup :value="String(settingData.handingWithScoreGrowthWhileRefund.coupon)"-->
                <!--@input="settingData.handingWithScoreGrowthWhileRefund.coupon = Boolean($event === 'true')"-->
                <!--vertical>-->
                <!--<Radio label="false">-->
                <!--<span>{{$t('noReturnCoupon')}}</span>&lt;!&ndash;用户退款时卡券不退&ndash;&gt;-->
                <!--</Radio>-->
                <!--<Radio label="true">-->
                <!--<span>{{$t('returnCoupon')}}</span>&lt;!&ndash;用户退款时卡券退回用户会员卡中&ndash;&gt;-->
                <!--</Radio>-->
                <!--</RadioGroup>-->
                <!--</div>-->
                <!--</div>-->

                <div class="content-item">
                    <div class="title">{{$t('modifyAccBalanceSetting')}}</div><!--修改会员储值、积分、虚拟账户余额设置-->
                    <div class="main">
                        <RadioGroup v-model="settingData.allowAdjustAccount" vertical>
                            <Radio label="false">
                                <span>{{$t('notAllowModifyAcc')}}</span><!--不允许修改会员的储值、积分、虚拟账户-->
                            </Radio>
                            <Radio label="true">
                                <span>{{$t('allowModifyAccReason')}}<!--允许修改会员的储值、积分、虚拟账户,如允许修改，请设置修改原因-->
                                    <span class="add-span blue-color"
                                          v-if="settingData.allowAdjustAccount === 'true'"
                                          @click="handleAddReason">+ {{$t('addModifyReason')}}</span><!--新增修改原因-->
                                </span>
                            </Radio>
                        </RadioGroup>
                        <div class="ivu-form-item-wrap margin-left-50"
                             v-show="settingData.allowAdjustAccount === 'true' ? true : false">
                            <FormItem
                                v-for="(item, index) in formDynamic.reason"
                                v-if="item._status"
                                :key="index"
                                label=""
                                :prop="'reason.' + index + '.reason'"
                                :rules="[{required: true, message: $t('errorEmpty', {msg: $t('modifyReason')}), trigger: 'blur'},
                                 { validator: emoji, trigger: 'blur' }]"><!--修改原因不能为空-->
                                <Input type="text" :disabled="item.disabled" v-model.trim="item.reason" :maxlength="100"
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

                <div class="content-item">
                    <div class="title">{{$t('credentialsTypeSetting')}}<!--证件类型设置-->
                        <span class="blue-color add-span" @click="handleAddIdType">+ {{$t('addCredentialsType')}}</span>
                        <!--新增证件类型-->
                    </div>
                    <div class="main">

                        <div class="ivu-form-item-wrap short-wrap margin-left-50">
                            <FormItem
                                v-for="(item, index) in formDynamic.idType"
                                v-if="item._status"
                                :key="index"
                                label=""
                                :prop="'idType.' + index + '.name'"
                                :rules="[{required: true, message: $t('errorEmpty', {msg: $t('credentialsType')}), trigger: 'blur'},
                                        { validator: emoji, trigger: 'blur' }]"><!--证件类型不能为空-->
                                <Input type="text" :disabled="item.disabled" v-model.trim="item.name" :maxlength="10"
                                       :placeholder="$t('inputField', {field: ''})"/>
                                <span class="span-bottom red-color" v-if="item.active && index > 0"
                                      @click="deleteDocument(item,index)">{{$t('del')}}</span>
                                <span class="span-bottom blue-color" v-if="!item.active"
                                      @click="handleSubmitForIdType(item,index)">{{$t("save")}}</span>
                                <span class="span-bottom grey-color" v-if="!item.active"
                                      @click="handleResetDocument(item,index)">{{$t('cancel')}}</span>
                            </FormItem>
                        </div>

                    </div>
                </div>
                <!--会员3期暂时去掉-->
                <!--<div class="content-item">-->
                <!--<div class="title">{{$t('cardManagement')}}</div>-->
                <!--<div class="main">-->
                <!--<span class="a-link-el" @click="toEntityCardDetail">{{$t('cardManagement')}}</span>-->
                <!--</div>-->
                <!--</div>-->
                <div class="content-item">
                    <div class="title">{{$t('paymentSetting')}}</div>
                    <div class="main">
                        <span class="a-link-el" @click="toSetPayProtocol">{{$t('paymentSetting')}}</span>
                    </div>
                </div>

                <!--新开卡会员积分赠送设置-->
                <div class="content-item">
                    <div class="title">
                        {{$t('新开卡会员积分赠送设置')}}
                        <Tooltip placement="top" transfer>
                            <span class="iconfont icon-note"></span>
                            <div slot="content">
                                <div class="tip-trade">{{$t('新注册的会员在注册成功时是否要赠送积分，以及如果赠送的话赠送的积分数。')}}</div>
                            </div>
                        </Tooltip>
                    </div>
                    <div :class="{'ivu-form-item-error': error.memberDonateIntegerErr, 'main': true}">
                        <i-switch v-model="settingData.openCardSendScore.isSwitch"
                                  @on-change="settingData.openCardSendScore.score = ''">
                        </i-switch>
                        <span class="text">{{$t('新开卡会员赠送')}}<!--会员生日当天消费可获得-->
                        <Input v-model.trim="settingData.openCardSendScore.score"
                               :disabled="!settingData.openCardSendScore.isSwitch"
                               @on-blur="checkInputBlurFunc(settingData.openCardSendScore.score, 'memberDonateIntegerErr')"
                               type="text"
                               class="single-input"
                               :placeholder="$t('inputField', {field: ''})"/>
                        {{$t('积分')}}</span><!--倍积分-->
                        <div class="ivu-form-item-error-tip"
                             style="left: 173px;"
                             v-if="error.memberDonateIntegerErr">{{error.memberDonateIntegerErr}}
                        </div>
                    </div>
                </div>

                <!--短信发送设置-->
                <div class="content-item">
                    <div class="title">{{$t('短信发送设置')}}</div>
                    <div :class="{'ivu-form-item-error': error.tradeAmountErr, 'main': true}">
                        <span class="text">{{$t('交易金额大于')}}</span><!--交易金额大于-->
                        <Input v-model.trim="settingData.smsSend"
                               @on-blur="checkInputIsMoney(settingData.smsSend,'tradeAmountErr')"
                               type="text"
                               class="single-input"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <div class="ivu-form-item-error-tip"
                             style="left: 100px;"
                             v-if="error.tradeAmountErr">{{error.tradeAmountErr}}
                        </div>
                        {{$t('时发送短信')}}<!--时发送短信-->
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
    import tableCom from '@/components/tableCom/tableCom';

    export default {
        components : {
            headerTabs,
            tableCom
        },
        data () {
            return {
                //用于动态表单校验(特殊字符)
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error(this.$t('errorIrregular'))); // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
                //设置id
                id : '',
                //当前页面路由名称
                routerName : 'memberSetting',
                //设置数据
                settingData : {
                    // 新开卡会员积分赠送设置
                    openCardSendScore : {
                        isSwitch : false,
                        score : ''
                    },
                    //会员卡有效期设置
                    memberValidPeriod : {
                        type : '',//类型
                        vipValidity : '',//number
                        vipValidityTime : '',//number
                        vipNumber : '',//number
                    },
                    //卡券过期提醒设置
                    notificationBeforeCouponExpire : {
                        isSwitch : false,
                        day : '',//number
                    },
                    //用户退款时积分是否退还用户
                    handingWithScoreGrowthWhileRefund : {
                        score : false,//Boolean
                        coupon : false,//Boolean
                    },
                    //修改会员储值、积分、虚拟账户余额设置
                    allowAdjustAccount : '',
                    //短信发送设置
                    smsSend : ''
                },
                //copy数据，用于数据重置
                copySetData : {},
                // 支付协议内容
                paymentAgreement : '',
                //动态表单数据
                reasonIndex : 1,
                idTypeIndex : 1,
                formDynamic : {
                    reason : [],
                    idType : [],
                },
                //输入框校验错误显示
                error : {
                    remindError : '',//会员积分有效期设置
                    vipValidityError : '',//会员卡有效期设置
                    vipValidityTimeError : '',//会员卡有效期设置
                    vipNumberError : '',//会员卡有效期设置
                    dayError : '',//卡券过期提醒设置
                    memberDonateIntegerErr : '',//卡券过期提醒设置
                    tradeAmountErr : '',//交易金额错误
                },
                tableData : [{
                    date : '2016-05-02',
                    name : '王小虎',
                    address : '上海市普陀区金沙江路 1518 弄'
                }],
                //会员类别及会员级别数据
                memberLevelsData : {}
            };
        },
        watch : {

            //会员卡有效期设置
            'settingData.memberValidPeriod.type' : function (newVal, oldVal) {
                if (newVal === 'perpetual') {
                    this.error.vipValidityError = '';
                    this.error.vipValidityTimeError = '';
                    this.error.vipNumberError = '';
                }
                if (newVal === 'vipValidityType') {
                    this.error.vipValidityTimeError = '';
                    this.error.vipNumberError = '';
                }
                if (newVal === 'vipValidityTime') {
                    this.error.vipValidityError = '';
                    this.error.vipNumberError = '';
                }
                if (newVal === 'vipNumber') {
                    this.error.vipValidityError = '';
                    this.error.vipValidityTimeError = '';
                }
            },

            //卡券过期提醒设置
            'settingData.notificationBeforeCouponExpire.isSwitch' : function (newVal, oldVal) {
                if (!newVal) {
                    this.error.dayError = '';
                }
            },

        },
        created () {
            //查询会员基础设置
            this.findBasicSet();
            //查询证件类型
            this.queryDocument();
            //查询修改原因
            this.listAdjustReason();
            this.getMemberLevelsInType();
        },
        computed : {
            //默认打开的折叠面板
            collapseOpened () {
                let result = [];
                for (let item in this.memberLevelsData){
                    result.push(item);
                }
                return result;
            }
        },
        methods : {

            //查询会员基础设置
            findBasicSet () {
                ajax.post('findBasicSet', {}).then(res => {
                    if (res.success) {
                        if (res.data) {
                            this.id = res.data.id;
                            this.paymentAgreement = res.data.paymentAgreement;
                            if (Object.keys(res.data).length > 0) {
                                //处理数据
                                let params = {
                                    memberValidPeriod : res.data.memberValidPeriod ? JSON.parse(res.data.memberValidPeriod) : {
                                        type : '',//类型
                                        vipValidity : '',//number
                                        vipValidityTime : '',//number
                                        vipNumber : '',//number
                                    },
                                    openCardSendScore : res.data.openCardSendScore ? JSON.parse(res.data.openCardSendScore) : {
                                        isSwitch : false,
                                        score : ''
                                    },
                                    notificationBeforeCouponExpire : res.data.notificationBeforeCouponExpire ? JSON.parse(res.data.notificationBeforeCouponExpire) : {
                                        isSwitch : false,
                                        day : '',//number
                                    },
                                    handingWithScoreGrowthWhileRefund : res.data.handingWithScoreGrowthWhileRefund ? JSON.parse(res.data.handingWithScoreGrowthWhileRefund) : {
                                        score : false,//Boolean
                                        coupon : false,//Boolean
                                    },
                                    smsSend : res.data.smsSend,
                                    allowAdjustAccount : res.data.allowAdjustAccount,
                                };
                                this.settingData = params;
                                //复制数据
                                this.copySetData = defaultsDeep({}, params);
                            } else {
                                this.copySetData = defaultsDeep({}, this.settingData);
                            }
                        } else {
                            this.copySetData = defaultsDeep({}, this.settingData);
                        }
                    }
                });
            },
            //点击保存，校验信息，数据处理
            save () {
                if (this.checkInputFunc()) {
                    this.checkInputIsMoney(this.settingData.smsSend, 'tradeAmountErr').then(() => {
                        this.basicSet({
                            id : this.id,
                            memberValidPeriod : JSON.stringify(this.settingData.memberValidPeriod),
                            openCardSendScore : JSON.stringify(this.settingData.openCardSendScore),
                            smsSend : this.settingData.smsSend,
                            notificationBeforeCouponExpire : JSON.stringify(this.settingData.notificationBeforeCouponExpire),
                            handingWithScoreGrowthWhileRefund : JSON.stringify(this.settingData.handingWithScoreGrowthWhileRefund),
                            allowAdjustAccount : this.settingData.allowAdjustAccount,
                        });
                    });
                }
            },
            //会员基础设置-保存/修改
            basicSet (params) {
                ajax.post('basicSet', params).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('saveBaseSetting') }) + '!'); // 保存基础设置成功
                        this.findBasicSet();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('saveBaseSetting') }));
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

                if (this.settingData.memberValidPeriod.type === 'vipValidityType' &&
                    !this.checkInputBlurFunc(this.settingData.memberValidPeriod.vipValidity, 'vipValidityError')) {
                    return false;
                }

                if (this.settingData.memberValidPeriod.type === 'vipValidityTime' &&
                    !this.checkInputBlurFunc(this.settingData.memberValidPeriod.vipValidityTime, 'vipValidityTimeError')) {
                    return false;
                }

                if (this.settingData.memberValidPeriod.type === 'vipNumber' &&
                    !this.checkInputBlurFunc(this.settingData.memberValidPeriod.vipNumber, 'vipNumberError')) {
                    return false;
                }

                if (this.settingData.notificationBeforeCouponExpire.isSwitch &&
                    !this.checkInputBlurFunc(this.settingData.notificationBeforeCouponExpire.day, 'dayError')) {
                    return false;
                }

                return true;
            },

            //查询证件类型
            queryDocument () {
                this.formDynamic.idType = [];
                ajax.post('queryDocument', {
                    isDeleted : 'false',
                    pageNo : 1,
                    pageSize : 99999,
                }).then(res => {
                    if (res.success) {
                        if (res.data.data && res.data.data.length > 0) {
                            res.data.data.forEach((item, index) => {
                                item.index = index;
                                item._status = 1;
                                item.active = true;
                                item.disabled = true;
                                this.formDynamic.idType.push(item);
                            });
                        }
                    }
                });
            },
            //增加/修改证件
            updateDocument (data, index) {
                ajax.post('updateDocument', {
                    name : data.name,
                }).then(res => {
                    if (res.success) {
                        this.formDynamic.idType[index].disabled = true;
                        this.formDynamic.idType[index].active = true;
                        this.$Message.success(this.$t('successTip', { tip : this.$t('addCredentialsType') }) + '!'); // 新增证件类型成功
                    }
                });
            },
            //删除证件类型
            deleteDocument (data, index) {
                ajax.post('updateDocument', {
                    id : data.id,
                    isDeleted : 'true',
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('delCredentialsType') }) + '!'); // 删除证件类型成功
                        this.formDynamic.idType[index]._status = 0;
                    }
                });
            },
            //新增证件类型
            handleAddIdType () {
                this.idTypeIndex++;
                this.formDynamic.idType.push({
                    name : '',
                    index : this.idTypeIndex,
                    _status : 1,
                    disabled : false,
                });
            },
            //证件类型校验
            handleSubmitForIdType (data, index) {
                this.$refs.formDynamic.validateField('idType.' + index + '.name', (valid) => {
                    if (valid === '') {
                        this.updateDocument(data, index);
                    }
                });
            },
            //取消证件类型校验
            handleResetDocument (data, index) {
                this.$refs.formDynamic.resetFields('idType.' + index + '.name');
                this.formDynamic.idType[index]._status = 0;
            },


            //查询修改原因
            listAdjustReason () {
                ajax.post('listAdjustReason', {}).then(res => {
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
            //增加/修改原因
            updateReason (data, index) {
                ajax.post('addAdjustReason', {
                    reason : data.reason,
                }).then(res => {
                    if (res.success) {
                        this.formDynamic.reason[index].disabled = true;
                        this.formDynamic.reason[index].active = true;
                        this.$Message.success(this.$t('successTip', { tip : this.$t('addReason') }) + '！'); // 新增原因成功
                    }
                });
            },
            //删除原因
            deleteReason (data, index) {
                ajax.post('deleteAdjustReason', {
                    reasonId : data.id,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('delReason') }) + '！'); // 删除原因成功
                        this.formDynamic.reason[index]._status = 0;
                    }
                });
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
            //修改原因表单校验
            handleSubmitForReason (data, index) {
                this.$refs.formDynamic.validateField('reason.' + index + '.reason', (valid) => {
                    if (valid === '') {
                        this.updateReason(data, index);
                    }
                });
            },
            //取消原因表单校验
            handleResetReason (data, index) {
                this.$refs.formDynamic.resetFields('reason.' + index + '.reason');
                this.formDynamic.reason[index]._status = 0;
            },

            /**
             * 输入框失焦校验
             * @param val 值
             * @param errorField 校验错误显示字段
             */
            checkInputBlurFunc (val, errorField) {

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
                        this.error[errorField] = this.$t('errorMinLength', { field : '', length : 1 });
                        return false;
                    } else if (numStr.length > 10) {
                        this.error[errorField] = this.$t('errorMaxLength', { field : '', length : 10 });
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
             * 跳转到实体卡管理详情
             */
            toEntityCardDetail () {
                this.$router.push({
                    name : 'entityCard'
                });
            },
            /**
             * 跳转到支付协议设置
             */
            toSetPayProtocol () {
                this.$router.push({
                    name : 'paymentProtocol',
                    params : { paymentAgreement : this.paymentAgreement, id : this.id }
                });
            },

            /**
             * 校验输入的是否符合金钱的格式
             * @param data
             * @param errType
             */
            checkInputIsMoney (data, errType) {
                return new Promise((resolve, reject) => {
                    common.validateMoney(data, 0, 10).then(() => {
                        this.error[errType] = '';
                        resolve();
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            this.error[errType] = this.$t('errorMaxLength', { field : '', length : 10 });
                        } else {
                            this.error[errType] = this.$t(err, { field : '' });
                        }
                        reject();
                    });
                });
            },
            /**
             * 获取所有会员类别和类别下的所有级别数据
             */
            getMemberLevelsInType () {
                ajax.post('getMemberLevelsInType').then(res => {
                    if (res.success) {
                        this.memberLevelsData = res.data ? res.data : {};
                    } else {
                        this.memberLevelsData = {};
                    }
                });
            },
            /**
             * 获取表头数据
             * @param data 会员类别数据
             */
            getColumnData (data) {
                let columnData = [];
                for (let i = 0,j = data.length; i < j; i++) {
                    columnData.push({
                        title : data[i]['levelDesc'],
                        width : 180,
                        field : data[i]['levelDesc']
                    });
                }
                return columnData;
            },
            /**
             * 获取表格数据
             * @param data 会员类别数据
             */
            getTableData (data) {
                let tableData = [{}];
                for (let i = 0,j = data.length; i < j; i++) {
                    tableData[0][data[i]['levelDesc']] = data[i]['effTime'] + this.$t('time.' + data[i]['effTimeUnit']);
                }
                return tableData;
            }

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .setting {
        @include block_outline();
        min-width: $content_min_width;
        overflow: hidden;
        background: $color-fff;
        border-radius: 4px;

        .content {
            padding: 25px 60px;
            height: calc(100% - 124px);
            overflow: auto;

            .content-item {
                margin-bottom: 30px;

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

                /deep/ .ivu-form-item-content {
                    width: 100%;
                }

                /deep/ .ivu-input-wrapper {
                    margin-bottom: 0 !important;
                    width: 80%;
                }

                .title {
                    font-size: $font_size_16px;
                    color: $color_333;
                    line-height: 24px;
                    margin-bottom: 15px;

                    .icon-note {
                        font-size: $font_size_15px;
                        color: #9e9e9e;
                        vertical-align: middle;
                    }
                }
                .main {
                    position: relative;
                    div {
                        margin-bottom: 10px;
                    }
                    &.form-bottom {
                        /deep/ .ivu-radio-group {
                            margin-bottom: 18px;
                        }
                    }
                    &.margin-radio-group {
                        /deep/ .ivu-radio-wrapper {
                            margin-bottom: 18px;
                        }
                    }

                    .a-link-el {
                        cursor: pointer;
                        color: $color_blue;
                    }
                }
            }

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
                color: $color-3F3F3F;
                cursor: pointer;
            }
            .span-bottom {
                vertical-align: bottom;
            }

        }

        /deep/ .ivu-input-wrapper {
            vertical-align: sub;

            &.single-input {
                margin: 0 10px;
                width: 100px !important;
            }
        }

        .check-group-wrap {
            padding-left: 50px;
        }

        .btn-wrap {
            height: 56px;
            width: 100%;
            line-height: 56px;
            text-align: center;
            background: #FFFFFF;
            box-shadow: 0 -5px 3px 0 rgba(0, 0, 0, 0.03);

            /deep/ .ivu-btn {
                width: 108px;
                padding: 5px 30px;
            }
            .ivu-btn + .ivu-btn {
                margin-left: 20px;
            }
        }

    }
</style>
