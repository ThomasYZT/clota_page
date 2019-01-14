<template>
    <!--会员管理--基础设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <Form ref="formDynamic" :model="formDynamic">

                <div class="content-item card-valid-time">
                    <div class="title">{{$t('memberCardValidity')}}</div><!--会员卡有效期-->
                    <template v-if='Object.keys(memberLevelsData).length > 0'>
                        <el-collapse :value="collapseOpened">
                            <el-collapse-item v-for="(item,title,index) in memberLevelsData"
                                              :key="index"
                                              :title="title"
                                              :name="title">
                                <table-com
                                    :column-data="getColumnData(item)"
                                    :table-data="getTableData(item)"
                                    :border="true"
                                    :auto-height="true"
                                    :height="95">
                                </table-com>
                            </el-collapse-item>
                        </el-collapse>
                    </template>
                    <no-data v-else class="no-data-wrap">
                    </no-data>
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

                <!--短信发送设置-->
                <div class="content-item" v-if="showMemberRecharge">
                    <div class="title">{{$t('smsSendSetting')}}</div>

                    <div class="main">
                        <div :class="{'ivu-form-item-error': error.tradeAmountErr, 'main': true}">
                            <span class="text">{{$t('tradeMoneyMoreThan')}}</span><!--交易金额大于-->
                            <Input v-model.trim="settingData.smsSend"
                                   @on-blur="checkInputIsMoney(settingData.smsSend,'tradeAmountErr')"
                                   type="text"
                                   class="single-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <div class="ivu-form-item-error-tip"
                                 style="left: 100px;"
                                 v-if="error.tradeAmountErr">{{error.tradeAmountErr}}
                            </div>
                            {{$t('whenSendSms')}}<!--时发送短信-->
                        </div>
                    </div>
                </div>
                <!--补卡收费标准-->
                <div class="content-item">
                    <div class="title">{{$t('cardReplacementCostStandard')}}</div>
                    <div :class="{'ivu-form-item-error': error.replaceCardFeeErr, 'main': true}">
                        <span class="text">{{$t('cardReplacementCost')}}</span><!--补卡收费-->
                        <Input v-model.trim="settingData.replacementCardFee"
                               @on-blur="checkInputIsMoney(settingData.replacementCardFee,'replaceCardFeeErr')"
                               type="text"
                               class="single-input"
                               :placeholder="$t('inputField', {field: ''})"/>
                        <div class="ivu-form-item-error-tip"
                             style="left: 70px;"
                             v-if="error.replaceCardFeeErr">{{error.replaceCardFeeErr}}
                        </div>
                        {{$t('yuan')}}
                    </div>
                </div>

                <!-- 微信端推送交易记录设置（仅配置了公众号信息才显示）-->
                <template  v-if="Object.keys(WxMpSetInfo).length !== 0 && showMemberRecharge">
                    <!--微信端推送交易记录设置-->
                    <div class="content-item">
                        <div class="title">{{$t('wxPushExchangeRecordSetting')}}</div>
                        <div :class="{'main': true}">
                            <div class="switcher">
                                <i-switch v-model="settingData.wxMpTemplateInfoSet.showStoreValue" ></i-switch><span>{{$t('whetherPushInfoOnWx')}}</span>
                            </div>
                            <!--<div class="switcher">-->
                            <!--<i-switch v-model="settingData.wxMpTemplateInfoSet.showIntegration" size="large"></i-switch><span>{{$t('是否在微信公众号推送积分账户交易信息')}}</span>-->
                            <!--</div>-->
                            <div class="text" :class="{'ivu-form-item-error': error.wxPushErr}">
                                <span class="text">{{$t('title')}}：</span>
                                <Input type="text"
                                       v-model="settingData.wxMpTemplateInfoSet.title"
                                       :disabled="!settingData.wxMpTemplateInfoSet.showStoreValue"
                                       @on-blur="checkInputMaxErr(settingData.wxMpTemplateInfoSet.title,'wxPushErr', 1, 10,
                                       settingData.wxMpTemplateInfoSet.showStoreValue)"
                                       style="margin: 0 10px;width: 300px;"></Input>
                                <div class="ivu-form-item-error-tip"
                                     v-if="error.wxPushErr">{{error.wxPushErr}}
                                </div>
                            </div>

                            <div class="text" :class="{'ivu-form-item-error': error.chargeTemplateIdErr}"
                                 v-if="memberConfigInfo.memberPoint === 'false'">
                                <span class="text">{{$t('会员充值通知模版ID：')}}</span>
                                <Input type="text"
                                       :disabled="!settingData.wxMpTemplateInfoSet.showStoreValue"
                                       v-model="settingData.wxMpTemplateInfoSet.chargeTemplateId"
                                       @on-blur="checkTemplateID(settingData.wxMpTemplateInfoSet.chargeTemplateId,'chargeTemplateIdErr',
                                       settingData.wxMpTemplateInfoSet.showStoreValue)"
                                       style="margin: 0 10px;width: 300px;"></Input>
                                <div class="ivu-form-item-error-tip"
                                     v-if="error.chargeTemplateIdErr">{{error.chargeTemplateIdErr}}
                                </div>
                            </div>
                            <div class="text" :class="{'ivu-form-item-error': error.consumeTemplateIdErr}">
                                <span class="text">{{$t('消费成功通知模版ID：')}}</span>
                                <Input type="text"
                                       :disabled="!settingData.wxMpTemplateInfoSet.showStoreValue"
                                       v-model="settingData.wxMpTemplateInfoSet.consumeTemplateId"
                                       @on-blur="checkTemplateID(settingData.wxMpTemplateInfoSet.consumeTemplateId,'consumeTemplateIdErr',
                                       settingData.wxMpTemplateInfoSet.showStoreValue)"
                                       style="margin: 0 10px;width: 300px;"></Input>
                                <div class="ivu-form-item-error-tip"
                                     v-if="error.consumeTemplateIdErr">{{error.consumeTemplateIdErr}}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--微信会员卡推送设置 (仅仅配置了公众号信息，并开通了支付即会员才显示)-->
                    <div class="content-item" v-if="Object.keys(WxMpSetInfo).length > 0 && WxMpSetInfo.payGiftCard === 'true'">
                        <div class="title">{{$t('微信会员卡推送设置')}}</div>
                        <div :class="{'main': true}">
                            <div class="switcher">
                                <Select v-model="wxPushMemberLevelConfig.id"
                                        style="width:200px"
                                        :placeholder="$t('selectField', { msg : '要推送的会员卡' } )">
                                    <Option v-for="item in levelsOfGrowthList"
                                            :value="item.id" :key="item.value">{{ item.levelDesc }}</Option>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <!--配置微信卡包的商户信息 (仅配置了公众号信息，并开通了微信卡包才显示)-->
                    <div class="content-item" v-if="Object.keys(WxMpSetInfo).length > 0 && WxMpSetInfo.openMembercard === 'true'">
                        <div class="title">{{$t('配置微信卡包的商户信息')}}</div>
                        <div :class="{'main': true}">
                            <div class="img-wrap">
                                <span class="width-150px-label">{{$t('会员卡logo：')}}</span>
                                <div class="inline-upload">
                                    <imgUpload :quantityLimit="1"
                                               :size="2"
                                               :format="['jpeg','png']"
                                               :defaultList="defaultMemberLogoImg"
                                               @upload-success="uploadSuc($event, 'card-logo')"
                                               @remove-img="removeIDimg($event, 'card-logo')"></imgUpload>
                                    <span class="warning-tip">建议像素300*300</span>
                                </div>
                            </div>
                            <div class="text" :class="{'ivu-form-item-error': error.brandNameErr}">
                                <span class="width-150px-label">{{$t('商户名称：')}}</span>
                                <Input type="text"
                                       v-model.trim="wxMpSettingData.brandName"
                                       @on-blur="checkWxPackageInfo(wxMpSettingData.brandName,'brandNameErr')"
                                       style="margin: 0 10px;width: 300px;"></Input>
                                <span class="warning-tip">保存后不可随意修改，请谨慎填写。</span>
                                <div class="fixed-error ivu-form-item-error-tip"
                                     v-if="error.brandNameErr">{{error.brandNameErr}}
                                </div>
                            </div>
                            <div class="img-wrap">
                                <span class="width-150px-label">{{$t('卡劵封面图片：')}}</span>
                                <div class="inline-upload">
                                    <imgUpload :quantityLimit="1"
                                               :size="2"
                                               :format="['jpeg','png']"
                                               :defaultList="defaultMemberBgImg"
                                               :imgUpload="api.uploadImage"
                                               @upload-success="uploadSuc($event, 'card-bg')"
                                               @remove-img="removeIDimg($event, 'card-bg')"></imgUpload>
                                    <span class="warning-tip">图片限制：1000*600像素、大小小于1M，仅支持jpg/png/jpeg格式</span>
                                </div>
                            </div>
                            <div class="text" :class="{'ivu-form-item-error': error.wxCardTitleErr}">
                                <span class="width-150px-label">{{$t('会员卡标题：')}}</span>
                                <Input type="text"
                                       v-model="wxMpSettingData.wxCardTitle"
                                       @on-blur="checkWxPackageInfo(wxMpSettingData.wxCardTitle,'wxCardTitleErr')"
                                       style="margin: 0 10px;width: 300px;"></Input>
                                <div class="fixed-error ivu-form-item-error-tip"
                                     v-if="error.wxCardTitleErr">{{error.wxCardTitleErr}}
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
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
    import api from '@/api/apiList';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';
    import headerTabs from './components/headerTabs.vue';
    import { validator } from 'klwk-ui';
    import tableCom from '@/components/tableCom/tableCom';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import imgUpload from '../../universalMarketing/posterInformation/components/uploadImg';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            headerTabs,
            tableCom,
            noData,
            imgUpload
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
                    //短信发送设置
                    smsSend : '',
                    //补卡收费标准
                    replacementCardFee : '' ,
                    //微信推送交易记录设置
                    wxMpTemplateInfoSet : {
                        showStoreValue : false,
                        // showIntegration : false,
                        title : '',
                        //重置模版id
                        chargeTemplateId : '',
                        //消费模板ID
                        consumeTemplateId : '',
                    },
                    //微信会员卡推送设置
                    wxMemberCardPushSetting : {
                        levelId : '',
                    },
                    //微信推送消息模板ID设置
                    // wxPushTemplateIds : {
                    //     rechargeTemplateId : '',
                    //     consumeTemplateID : '',
                    // }
                },
                //公众号配置信息
                WxMpSetInfo : {},
                //公众号配置编辑信息
                wxMpSettingData : {
                    //微信卡劵封面图片
                    wxCardBackgroundPic : [],
                    //卡套logo
                    wxCardLogo : [],
                    //商户名称
                    brandName : '',
                    //会员卡标题
                    wxCardTitle : '',
                },
                //卡包默认logo图片
                defaultMemberLogoImg : [],
                //卡包默认背景图片
                defaultMemberBgImg : [],
                //copy数据，用于数据重置
                copySetData : {},
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
                    tradeAmountErr : '',//交易金额错误
                    replaceCardFeeErr : '',//补卡收费金额错误,
                    wxPushErr : '',//微信端推送交易记录 标题设置错误
                    chargeTemplateIdErr : '',//微信端充值提醒模版id错误
                    consumeTemplateIdErr : '',//微信端消费提醒模版id错误
                    brandNameErr : '',//微信卡包商户名称错误
                    wxCardTitleErr : '',//微信卡包会员卡标题错误
                },
                //会员类别及会员级别数据
                memberLevelsData : {
                    id : '',
                },
                //成长型会员卡级别列表
                levelsOfGrowthList : [],
                //微信会员卡推送设置
                wxPushMemberLevelConfig : {},
                api : api,
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
            this.getMemberLevelsInType();
            //查询所有成长型的会员卡级别
            this.queryMemberWxMpSet();
            this.queryLevelsOfGrowth();
        },
        computed : {
            ...mapGetters([
               'manageOrgs',
               'memberConfigInfo'
            ]),
            //默认打开的折叠面板
            collapseOpened () {
                let result = [];
                for (let item in this.memberLevelsData) {
                    result.push(item);
                }
                return result;
            },
            //是否可以显示会员储值相关信息
            showMemberRecharge () {
                return this.memberConfigInfo && this.memberConfigInfo['memberRecharge'] && this.memberConfigInfo['memberRecharge'] === 'true';
            },
        },
        methods : {
            //查询会员基础设置
            findBasicSet () {
                ajax.post('findBasicSet', {}).then(res => {
                    if (res.success) {
                        if (res.data) {
                            this.id = res.data.id;
                            if (Object.keys(res.data).length > 0) {
                                //处理数据
                                let params = {
                                    memberValidPeriod : res.data.memberValidPeriod ? JSON.parse(res.data.memberValidPeriod) : {
                                        type : '',//类型
                                        vipValidity : '',//number
                                        vipValidityTime : '',//number
                                        vipNumber : '',//number
                                    },
                                    notificationBeforeCouponExpire : res.data.notificationBeforeCouponExpire ? JSON.parse(res.data.notificationBeforeCouponExpire) : {
                                        isSwitch : false,
                                        day : '',//number
                                    },
                                    smsSend : res.data.smsSend,
                                    replacementCardFee : res.data.replacementCardFee,
                                    wxMpTemplateInfoSet : res.data.wxMpTemplateInfoSet ? JSON.parse(res.data.wxMpTemplateInfoSet) : {
                                        showStoreValue : false,
                                        // showIntegration : false,
                                        title : '',
                                        chargeTemplateId : '',
                                        consumeTemplateId : '',
                                    }
                                };
                                params.wxMpTemplateInfoSet.showStoreValue = params.wxMpTemplateInfoSet.showStoreValue ? JSON.parse(params.wxMpTemplateInfoSet.showStoreValue) : false;
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
                    Promise.all([
                        this.checkInputIsMoney(this.settingData.smsSend, 'tradeAmountErr'),
                        this.checkInputIsMoney(this.settingData.replacementCardFee, 'replaceCardFeeErr'),
                        this.checkInputMaxErr(this.settingData.wxMpTemplateInfoSet.title,'wxPushErr', 1, 10, this.settingData.wxMpTemplateInfoSet.showStoreValue),
                        this.checkTemplateID(this.settingData.wxMpTemplateInfoSet.chargeTemplateId,'chargeTemplateIdErr', this.settingData.wxMpTemplateInfoSet.showStoreValue),
                        this.checkTemplateID(this.settingData.wxMpTemplateInfoSet.consumeTemplateId,'consumeTemplateIdErr', this.settingData.wxMpTemplateInfoSet.showStoreValue),
                        this.checkWxPackageInfo(this.wxMpSettingData.brandName,'brandNameErr'),
                        this.checkWxPackageInfo(this.wxMpSettingData.wxCardTitle,'wxCardTitleErr')
                    ]).then(() => {
                        Promise.all([
                            this.createOrModifyWxMpMemberCard(),
                            this.basicSet({
                                id : this.id,
                                memberValidPeriod : JSON.stringify(this.settingData.memberValidPeriod),
                                smsSend : this.settingData.smsSend,
                                replacementCardFee : this.settingData.replacementCardFee,
                                notificationBeforeCouponExpire : JSON.stringify(this.settingData.notificationBeforeCouponExpire),
                                wxMpTemplateInfoSet : JSON.stringify(this.settingData.wxMpTemplateInfoSet),
                            })
                        ]).then(() => {
                            this.$Message.success(this.$t('successTip', { tip : this.$t('saveBaseSetting') }) + '!'); // 保存基础设置成功
                        }).catch(() => {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('saveBaseSetting') }));
                        })
                    });
                }
            },
            //会员基础设置-保存/修改
            basicSet (params) {
                return new Promise((resolve, reject) => {
                    ajax.post('basicSet', params).then(res => {
                        if (res.success) {
                            this.findBasicSet();
                            this.queryDocument();
                            resolve()
                        } else {
                            reject()
                        }
                    }).catch(() => {
                        reject();
                    })
                });
            },
            //点击取消重置数据
            resetFieldFunc () {
                if (this.copySetData !== {}) {
                    this.settingData = defaultsDeep({}, this.copySetData);
                }
                if (this.WxMpSetInfo !== {}) {
                    this.wxMpSettingData = defaultsDeep({}, this.WxMpSetInfo);
                    if (this.WxMpSetInfo.wxCardBackgroundPic) {
                        this.defaultMemberBgImg = [
                            {
                                name : 'logo',
                                url : this.WxMpSetInfo.wxCardBackgroundPic
                            }
                        ];
                        this.wxMpSettingData.wxCardBackgroundPic = [this.WxMpSetInfo.wxCardBackgroundPic]
                    }
                    if (this.WxMpSetInfo.wxCardLogo) {
                        this.defaultMemberLogoImg = [
                            {
                                name : 'logo',
                                url : this.WxMpSetInfo.wxCardLogo
                            }
                        ]
                        this.wxMpSettingData.wxCardLogo = [this.wxMpSettingData.wxCardLogo]
                    }
                }
                this.error = {
                    remindError : '',//会员积分有效期设置
                    vipValidityError : '',//会员卡有效期设置
                    vipValidityTimeError : '',//会员卡有效期设置
                    vipNumberError : '',//会员卡有效期设置
                    dayError : '',//卡券过期提醒设置
                    tradeAmountErr : '',//交易金额错误
                    replaceCardFeeErr : '',//补卡收费金额错误,
                    wxPushErr : '',//微信端推送交易记录 标题设置错误
                    chargeTemplateIdErr : '',//微信端充值提醒模版id错误
                    consumeTemplateIdErr : '',//微信端消费提醒模版id错误
                    brandNameErr : '',//微信卡包商户名称错误
                    wxCardTitleErr : '',//微信卡包会员卡标题错误
                };
            },
            //校验选项勾选是输入框是否填写，返回true/false
            checkInputFunc () {

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
                ajax.post('queryDocument', {
                    isDeleted : 'false',
                    pageNo : 1,
                    pageSize : 99999,
                }).then(res => {
                    if (res.success) {
                        if (res.data.data && res.data.data.length > 0) {
                            this.formDynamic.idType = res.data.data.map((item,index) => {
                                return {
                                    ...item,
                                    index : index,
                                    _status : 1,
                                    active : true,
                                    disabled : true,
                                };
                            });
                            // res.data.data.forEach((item, index) => {
                            //     item.index = index;
                            //     item._status = 1;
                            //     item.active = true;
                            //     item.disabled = true;
                            //     this.formDynamic.idType.push(item);
                            // });
                        }
                    } else {
                        this.formDynamic.idType = [];
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
                        this.queryDocument();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('addCredentialsType') }) + '!'); // 新增证件类型失败
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
                        this.$Message.success(this.$t('successTip', { tip : this.$t('delCredentialsType') })); // 删除证件类型成功
                        this.formDynamic.idType[index]._status = 0;
                        this.queryDocument();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('delCredentialsType') })); // 删除证件类型失败
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
             * 校验输入的标题是否超过指定长度
             * @param data
             * @param errType
             */
            checkInputMaxErr (data, errType, minLen, maxLen, required) {
                return new Promise((resolve, reject) => {
                    if (required) {
                        if (String(data).length < minLen) {
                            this.error[errType] = this.$t('errorMinLength', { field : this.$t(''), length : minLen });
                            reject();
                        } else if (String(data).length > maxLen) {
                            this.error[errType] = this.$t('errorMaxLength', { field : this.$t(''), length : maxLen });
                            reject();
                        } else {
                            this.error[errType] = '';
                            resolve();
                        }
                    } else {
                        resolve();
                    }

                })
            },
            /**
             *  校验是否是数字或字母
             */
            checkInputOnlyNumOrLetter (data, errType) {
                let reg = /^[0-9a-zA-Z]*$/;
                return new Promise((resolve, reject) => {
                    if (reg.test(data)) {
                        this.error[errType] = '';
                        resolve();
                    } else {
                        this.error[errType] = this.$t('onlyNumOrLetter', { field : this.$t('') });
                        reject();
                    }
                })
            },
            /**
             *  校验输入的是否是汉字
             */
            checkInputOnlyCN (value, errType) {
              let reg = /^[\u4e00-\u9fa5]*$/;
              return new Promise((resolve, reject) => {
                  if (reg.test(value)) {
                      this.error[errType] = '';
                      resolve();
                  } else {
                      this.error[errType] = this.$t('onlyChineseCharactor');
                      reject();
                  }
              })
            },
            /**
             *  校验推送消息模版id字段 （不能超过20哥字符，只能为字母或数字）
             */
            checkTemplateID (value, errType, required) {
                return new Promise((resolve, reject) => {
                    if (required) {
                        this.checkInputMaxErr(value, errType, 1, 20, true).then(() => {
                            this.checkInputOnlyNumOrLetter (value, errType).then(() => {
                                resolve();
                            }).catch(() => {
                                reject();
                            })
                        }).catch(() => {
                            reject();
                        });
                    } else {
                        resolve()
                    }
                });
            },
            checkWxPackageInfo (value, errType) {
                return new Promise((resolve, reject) => {
                    this.checkInputMaxErr(value,errType, 1, 20, true).then(() => {
                        this.checkInputOnlyCN (value, errType).then(() => {
                            resolve();
                        }).catch(() => {
                            reject();
                        });
                    }).catch(() => {
                        reject();
                    })
                })
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
                    if (data[i]['effTime'] === null || data[i]['effTime'] === '') {
                        tableData[0][data[i]['levelDesc']] = this.$t('permanentValidity');
                    } else {
                        tableData[0][data[i]['levelDesc']] = data[i]['effTime'] + (data[i]['effTimeUnit'] ? this.$t('time.' + data[i]['effTimeUnit']) : '' );
                    }
                }
                return tableData;
            },
            /**
             * 查询所有成长型的会员卡级别
             */
            queryLevelsOfGrowth () {
                ajax.post('queryLevelsOfGrowth').then(res => {
                    if (res.success) {
                        this.levelsOfGrowthList = res.data ? res.data : [];
                    } else {
                        this.levelsOfGrowthList = [];
                    }
                });
            },
            /**
             * 查询会员管理微信公众号配置
             */
            queryMemberWxMpSet () {
                ajax.post('queryMemberWxMpSet').then(res => {
                    if (res.success) {
                        this.WxMpSetInfo = res.data ? defaultsDeep({}, res.data) : {};
                        this.wxMpSettingData = res.data ? defaultsDeep({}, res.data) : {};
                        if (this.WxMpSetInfo.wxCardBackgroundPic) {
                            this.defaultMemberBgImg = [
                                {
                                    name : 'logo',
                                    url : this.WxMpSetInfo.wxCardBackgroundPic
                                }
                            ];
                            this.wxMpSettingData.wxCardBackgroundPic = [this.WxMpSetInfo.wxCardBackgroundPic]
                        }
                        if (this.WxMpSetInfo.wxCardLogo) {
                            this.defaultMemberLogoImg = [
                                {
                                    name : 'logo',
                                    url : this.WxMpSetInfo.wxCardLogo
                                }
                            ]
                            this.wxMpSettingData.wxCardLogo = [this.wxMpSettingData.wxCardLogo]
                        }
                        //仅仅配置了公众号信息，并开通了支付即会员才显示
                        if (Object.keys(this.WxMpSetInfo).length > 0 && this.WxMpSetInfo.payGiftCard === 'true') {
                            this.queryDefaultDrawMemberLevel();
                        }
                    } else {
                        this.WxMpSetInfo = {};
                    }
                })
            },
            /**
             * 查询微信会员卡推送设置
             */
            queryDefaultDrawMemberLevel () {
                ajax.post('queryDefaultDrawMemberLevel').then(res => {
                    if (res.success && res.data) {
                        this.wxPushMemberLevelConfig.id = res.data.id ? res.data.id : '';
                    } else {
                        this.wxPushMemberLevelConfig.id = '';
                    }
                });
            },
            /**
             * @param {array} data
             * 上传图片成功
             */
            uploadSuc (data, type) {
                if (type === 'card-logo') {
                    this.wxMpSettingData.wxCardLogo = data.map((item) => {
                        return item.url
                    });
                    this.defaultMemberLogoImg = this.wxMpSettingData.wxCardLogo.map((url, index) => {
                        return {
                            name : index,
                            url : url,
                        };
                    });
                } else if (type === 'card-bg') {
                    this.wxMpSettingData.wxCardBackgroundPic = data.map((item) => {
                        return item.url
                    });
                    this.defaultMemberBgImg = this.wxMpSettingData.wxCardBackgroundPic.map((url, index) => {
                        return {
                            name : index,
                            url : url,
                        };
                    });
                }
            },
            /**
             * @param {array} data
             * 删除图片
             */
            removeIDimg (data, type) {
                if (type === 'card-logo') {
                    this.wxMpSettingData.wxCardLogo = data.map((item) => {
                        return item.url
                    });
                    this.defaultMemberLogoImg = this.wxMpSettingData.wxCardLogo.map((url, index) => {
                        return {
                            name : index,
                            url : url,
                        };
                    });
                } else if (type === 'card-bg') {
                    this.wxMpSettingData.wxCardBackgroundPic = data.map((item) => {
                        return item.url
                    });
                    this.defaultMemberBgImg = this.wxMpSettingData.wxCardBackgroundPic.map((url, index) => {
                        return {
                            name : index,
                            url : url,
                        };
                    });
                }
            },
            /**
             * 创建或修改微信卡包配置信息
             */
            createOrModifyWxMpMemberCard () {
                return new Promise((resolve, reject) => {
                    ajax.post('createOrModifyWxMpMemberCard', {
                        id : this.WxMpSetInfo.id,
                        wxCardId : this.WxMpSetInfo.wxCardId,
                        companyId : this.manageOrgs.manageCompanyId,
                        brandName : this.wxMpSettingData.brandName,
                        wxCardTitle : this.wxMpSettingData.wxCardTitle,
                        wxCardBackgroundPic : this.wxMpSettingData.wxCardBackgroundPic[0],
                        wxCardLogo : this.wxMpSettingData.wxCardLogo[0],
                    }).then(res => {
                        if (res.success) {
                            this.queryMemberWxMpSet();
                            resolve();
                        } else {
                            reject();
                        }
                    }).catch(() => {
                        reject();
                    })
                })
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

                &.card-valid-time{
                    position: relative;
                    min-height: 200px;

                    .no-data-wrap{
                        width:500px;
                    }
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
                        margin-bottom: 3px;
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
                color: $color_999;
                cursor: pointer;
            }
            .span-bottom {
                vertical-align: bottom;
            }

        }

        /deep/ .ivu-input-wrapper {
            vertical-align: sub;
            margin: 0px !important;

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

        .text {
            position: relative;
            padding: 5px 0;
            margin-bottom: 15px !important;

            .fixed-error {
                &.ivu-form-item-error-tip {
                    margin-left: 105px;
                }
            }

            .warning-tip {
                font-size: 12px;
                margin-left: 10px;
                color: $color_yellow;
            }
        }

        .width-150px-label {
            display: inline-block;
            min-width: 100px;
        }

        .img-wrap {
            position: relative;
            padding: 5px 0;
            margin-bottom: 15px !important;
        }
        .inline-upload {
            vertical-align: middle;
            display: inline-block;
            margin-bottom: 0 !important;
            /deep/ .upload-img {
                margin-bottom: 0px !important;
            }
        }

    }
</style>
