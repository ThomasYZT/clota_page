<template>
    <!--会员管理--基础设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <Form ref="formDynamic" :model="formDynamic">

                <div class="content-item">
                    <div class="title">会员积分生效设置</div>
                    <div class="main">
                        <RadioGroup v-model="settingData.scoreEffectiveMode.isIntegralType" vertical>
                            <Radio label="immediately">
                                <span>付款成功后立即生效</span>
                            </Radio>
                            <Radio label="checkout">
                                <span>消费、核销成功后立即生效</span>
                            </Radio>
                            <Radio label="checkout_after">
                            <span :class="{'ivu-form-item-error': error.isNoIntegralTimeError}">消费、核销成功后
                                <Input v-model.trim="settingData.scoreEffectiveMode.isNoIntegralTime"
                                       :disabled="settingData.scoreEffectiveMode.isIntegralType !== 'checkout_after' ? true : false"
                                       @on-blur="checkInputBlurFunc(settingData.scoreEffectiveMode.isNoIntegralTime, 'isNoIntegralTimeError')"
                                       type="text"
                                       :placeholder="$t('inputField', {field: ''})"
                                       class="single-input"/>
                                时后生效</span>
                                <div class="ivu-form-item-error-tip"
                                     style="left: 153px;"
                                     v-if="error.isNoIntegralTimeError">{{error.isNoIntegralTimeError}}</div>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">会员生日积分多倍积分</div>
                    <div :class="{'ivu-form-item-error': error.multipleError, 'main': true}">
                        <i-switch v-model="settingData.scoreMultipleOnBirthday.isSwitch"></i-switch>
                        <span class="text">会员生日当天消费可获得
                        <Input v-model.trim="settingData.scoreMultipleOnBirthday.multiple"
                               :disabled="!settingData.scoreMultipleOnBirthday.isSwitch"
                               @on-blur="checkInputBlurFunc(settingData.scoreMultipleOnBirthday.multiple, 'multipleError')"
                               type="text"
                               class="single-input"
                               :placeholder="$t('inputField', {field: ''})"/>
                        倍积分</span>
                        <div class="ivu-form-item-error-tip"
                             style="left: 230px;"
                             v-if="error.multipleError">{{error.multipleError}}</div>
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">会员积分有效期设置</div>
                    <div class="main form-bottom">
                        <RadioGroup v-model="settingData.scoreValidityPeriod.validityType"
                                    vertical
                                    :class="{'ivu-form-item-error': error.validityTimeError}">
                            <Radio label="perpetual">
                                <span>永久有效</span>
                            </Radio>
                            <Radio label="months_effective">
                                <span>获得积分
                                    <Input v-model.trim="settingData.scoreValidityPeriod.validityTime"
                                           :disabled="settingData.scoreValidityPeriod.validityType !== 'months_effective' ? true : false"
                                           @on-blur="checkInputBlurFunc(settingData.scoreValidityPeriod.validityTime, 'validityTimeError')"
                                           type="text"
                                           class="single-input"
                                           :placeholder="$t('inputField', {field: ''})"/>
                                    个月后失效，清除</span>
                            </Radio>
                            <span class="ivu-form-item-error-tip"
                                 style="left: 153px;left: 95px;top: 60px;"
                                 v-if="error.validityTimeError">{{error.validityTimeError}}</span>
                        </RadioGroup>
                        <div class="check-group-wrap" :class="{'ivu-form-item-error': error.remindError}">
                            <Checkbox v-model="settingData.scoreValidityPeriod.checked"
                                      :disabled="settingData.scoreValidityPeriod.validityType !== 'months_effective' ? true : false">
                            </Checkbox>清除积分前
                            <Input v-model.trim="settingData.scoreValidityPeriod.remind"
                                   :disabled="!settingData.scoreValidityPeriod.checked"
                                   @on-blur="checkInputBlurFunc(settingData.scoreValidityPeriod.remind, 'remindError')"
                                   type="text"
                                   class="single-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                                天短信提醒，
                                <span class="blue-color">短信设置</span>
                            <div class="ivu-form-item-error-tip"
                                 style="left: 155px;"
                                 v-if="error.remindError">{{error.remindError}}</div>
                        </div>

                    </div>
                </div>

                <div class="content-item">
                    <div class="title">会员卡有效期设置</div>
                    <div class="main margin-radio-group form-bottom">
                        <RadioGroup v-model="settingData.memberValidPeriod.type" vertical>
                            <Radio label="perpetual">
                                <span>永久有效</span>
                            </Radio>
                            <Radio label="vipValidityTime" :class="{'ivu-form-item-error': error.vipValidityTimeError}">
                                <span>最后一次消费
                                <Input v-model.trim="settingData.memberValidPeriod.vipValidityTime"
                                        :disabled="settingData.memberValidPeriod.type !== 'vipValidityTime' ? true : false"
                                        @on-blur="checkInputBlurFunc(settingData.memberValidPeriod.vipValidityTime,'vipValidityTimeError')"
                                        type="text"
                                        class="single-input"
                                       :placeholder="$t('inputField', {field: ''})"/>
                                    天后如未使用，冻结该会员卡</span>
                                <div class="ivu-form-item-error-tip"
                                     style="left: 123px;"
                                     v-if="error.vipValidityTimeError">{{error.vipValidityTimeError}}</div>
                            </Radio>
                            <Radio label="vipValidity" :class="{'ivu-form-item-error': error.vipValidityError}">
                            <span>开卡
                             <Input v-model.trim="settingData.memberValidPeriod.vipValidityType"
                                    :disabled="settingData.memberValidPeriod.type !== 'vipValidity' ? true : false"
                                    @on-blur="checkInputBlurFunc(settingData.memberValidPeriod.vipValidityType,'vipValidityError')"
                                    type="text"
                                    class="single-input"
                                    :placeholder="$t('inputField', {field: ''})"/>
                                天后冻结该会员卡</span>
                                <div class="ivu-form-item-error-tip"
                                     style="left: 68px;"
                                     v-if="error.vipValidityError">{{error.vipValidityError}}</div>
                            </Radio>
                            <Radio label="vipNumber" :class="{'ivu-form-item-error': error.vipNumberError}">
                            <span>会员卡使用
                             <Input v-model.trim="settingData.memberValidPeriod.vipNumber"
                                    :disabled="settingData.memberValidPeriod.type !== 'vipNumber' ? true : false"
                                    @on-blur="checkInputBlurFunc(settingData.memberValidPeriod.vipNumber,'vipNumberError')"
                                    type="text"
                                    class="single-input"
                                    :placeholder="$t('inputField', {field: ''})"/>
                                天后冻结该会员卡</span>
                                <div class="ivu-form-item-error-tip"
                                     style="left: 110px;"
                                     v-if="error.vipNumberError">{{error.vipNumberError}}</div>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">卡券过期提醒设置</div>
                    <div :class="{'ivu-form-item-error': error.dayError, 'main': true}">
                        <i-switch v-model="settingData.notificationBeforeCouponExpire.isSwitch"></i-switch>
                        <span class="text">卡券过期前
                            <Input v-model.trim="settingData.notificationBeforeCouponExpire.day"
                                   :disabled="!settingData.notificationBeforeCouponExpire.isSwitch"
                                   @on-blur="checkInputBlurFunc(settingData.notificationBeforeCouponExpire.day,'dayError')"
                                   type="text"
                                   class="single-input"
                                   :placeholder="$t('inputField', {field: ''})"/> 天短信提醒，
                            <span class="blue-color">短信设置</span>
                        </span>
                        <div class="ivu-form-item-error-tip"
                             style="left: 145px;"
                             v-if="error.dayError">{{error.dayError}}</div>
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">用户退款时积分是否退还用户</div>
                    <div class="main">
                        <RadioGroup v-model="settingData.handingWithScoreGrowthWhileRefund.score" vertical>
                            <Radio label="true">
                                <span>用户退款时积分不退</span>
                            </Radio>
                            <Radio label="false">
                                <span>用户退款时积分退回用户积分账户中</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">用户退款时卡券是否退还用户</div>
                    <div class="main">
                        <RadioGroup v-model="settingData.handingWithScoreGrowthWhileRefund.coupon" vertical>
                            <Radio label="true">
                                <span>用户退款时卡券不退</span>
                            </Radio>
                            <Radio label="false">
                                <span>用户退款时卡券退回用户会员卡中</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">修改会员储值、积分、虚拟账户余额设置</div>
                    <div class="main">
                        <RadioGroup v-model="settingData.allowAdjustAccount" vertical>
                            <Radio label="false">
                                <span>不允许修改会员的储值、积分、虚拟账户</span>
                            </Radio>
                            <Radio label="true">
                                <span>允许修改会员的储值、积分、虚拟账户,如允许修改，请设置修改原因
                                    <span class="add-span blue-color"
                                          v-if="settingData.allowAdjustAccount === 'true'"
                                          @click="handleAddReason">+ 新增修改原因</span>
                                </span>
                            </Radio>
                        </RadioGroup>
                        <div class="ivu-form-item-wrap margin-left-50"  v-show="settingData.allowAdjustAccount === 'true' ? true : false" >
                            <FormItem
                                v-for="(item, index) in formDynamic.reason"
                                v-if="item._status"
                                :key="index"
                                label=""
                                :prop="'reason.' + index + '.reason'"
                                :rules="[{required: true, message: '修改原因不能为空', trigger: 'blur'},
                                 { validator: emoji, trigger: 'blur' }]">
                                <Input type="text" :disabled="item.disabled" v-model.trim="item.reason" :maxlength="100" :placeholder="$t('inputField', {field: ''})"/>
                                <span class="span-bottom red-color" v-if="item.active && index > 0" @click="deleteReason(item,index)">删除</span>
                                <span class="span-bottom blue-color" v-if="!item.active" @click="handleSubmitForReason(item,index)">{{$t("save")}}</span>
                                <span class="span-bottom grey-color" v-if="!item.active" @click="handleResetReason(item,index)">取消</span>
                            </FormItem>
                        </div>

                    </div>
                </div>

                <div class="content-item">
                    <div class="title">证件类型设置   <span class="blue-color add-span" @click="handleAddIdType">+ 新增证件类型</span></div>
                    <div class="main">

                        <div class="ivu-form-item-wrap short-wrap margin-left-50">
                            <FormItem
                                v-for="(item, index) in formDynamic.idType"
                                v-if="item._status"
                                :key="index"
                                label=""
                                :prop="'idType.' + index + '.name'"
                                :rules="[{required: true, message: '证件类型不能为空', trigger: 'blur'},
                                        { validator: emoji, trigger: 'blur' }]">
                                <Input type="text" :disabled="item.disabled" v-model.trim="item.name" :maxlength="10" :placeholder="$t('inputField', {field: ''})"/>
                                <span class="span-bottom red-color" v-if="item.active && index > 0" @click="deleteDocument(item,index)">删除</span>
                                <span class="span-bottom blue-color" v-if="!item.active" @click="handleSubmitForIdType(item,index)">{{$t("save")}}</span>
                                <span class="span-bottom grey-color" v-if="!item.active" @click="handleResetDocument(item,index)">取消</span>
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

    export default {
        components: {
            headerTabs,
        },
        data () {
            return {
                //用于动态表单校验(特殊字符)
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error('输入内容不合规则'));
                    } else {
                        callback();
                    }
                },
                //设置id
                id:'',
                //当前页面路由名称
                routerName: 'memberSetting',
                //设置数据
                settingData: {
                    //积分生效设置
                    scoreEffectiveMode: {
                        isIntegralType: '',
                        isNoIntegralTime: ''//number
                    },
                    //会员生日积分多倍积分
                    scoreMultipleOnBirthday: {
                        isSwitch: false,//Boolean
                        multiple: '',//number
                    },
                    //会员积分有效期设置
                    scoreValidityPeriod: {
                        validityType: '',
                        validityTime: '',//number
                        checked: false,//Boolean
                        remind: '',//number
                    },
                    //会员卡有效期设置
                    memberValidPeriod: {
                        type: '',//类型
                        vipValidity: '',//number
                        vipValidityTime: '',//number
                        vipNumber: '',//number
                    },
                    //卡券过期提醒设置
                    notificationBeforeCouponExpire: {
                        isSwitch: false,//Boolean
                        day: '',//number
                    },
                    //用户退款时积分是否退还用户
                    handingWithScoreGrowthWhileRefund: {
                        score: '',//Boolean
                        coupon: '',//Boolean
                    },
                    //修改会员储值、积分、虚拟账户余额设置
                    allowAdjustAccount: '',
                },
                //copy数据，用于数据重置
                copySetData: {},
                //动态表单数据
                reasonIndex: 1,
                idTypeIndex: 1,
                formDynamic: {
                    reason: [],
                    idType: [],
                },
                //输入框校验错误显示
                error: {
                    isNoIntegralTimeError: '',//会员积分生效设置
                    multipleError: '',//会员生日积分多倍积分
                    validityTimeError: '',//会员积分有效期设置
                    remindError: '',//会员积分有效期设置
                    vipValidityError: '',//会员卡有效期设置
                    vipValidityTimeError: '',//会员卡有效期设置
                    vipNumberError: '',//会员卡有效期设置
                    dayError: '',//卡券过期提醒设置
                },
                //布尔型
                boolProps: ['isSwitch','checked','score','coupon'],
                //Number型
                numberProps: ['isNoIntegralTime','multiple','validityTime','remind','vipValidity',
                'vipValidityTime','vipNumber','day'],
                //String型
                stringProps: ['isNoIntegralTime','multiple','validityTime','remind','vipValidity',
                    'vipValidityTime','vipNumber','day','score','coupon'],
            }
        },
        watch: {

            //积分生效设置
            'settingData.scoreEffectiveMode.isIntegralType' : function (newVal, oldVal) {
                if(newVal !== 'checkout_after'){
                    this.error.isNoIntegralTimeError = '';
                }
            },

            //会员生日积分多倍积分
            'settingData.scoreMultipleOnBirthday.isSwitch' : function (newVal, oldVal) {
                if(!newVal){
                    this.error.multipleError = '';
                }
            },

            //会员积分有效期设置
            'settingData.scoreValidityPeriod.validityType' : function (newVal, oldVal) {
                if(newVal === 'perpetual'){
                    this.settingData.scoreValidityPeriod.checked = false;
                    this.error.validityTimeError = '';
                    this.error.remindError = '';
                }
                if(newVal === 'months_effective'){
                    this.settingData.scoreValidityPeriod.checked = true;
                }
            },
            'settingData.scoreValidityPeriod.checked' : function (newVal, oldVal) {
                if(!newVal){
                    this.error.remindError = '';
                }
            },

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
                if(!newVal){
                    this.error.dayError = '';
                }
            },

        },
        created() {
            //查询会员基础设置
            this.findBasicSet();
            //查询证件类型
            this.queryDocument();
            //查询修改原因
            this.listAdjustReason();
        },
        methods: {

            //数据转换，数据查询后转成string进入input，保存时转成相应类型
            transPropsType ( data, type ) {
                switch (type) {
                    case 'number':
                        return data ? Number(data) : 0;
                        break;
                    case 'boolean':
                        return Boolean(data);
                        break;
                    case 'string':
                        return data!==null ? String(data) : '';
                        break;
                }
            },

            //查询会员基础设置
            findBasicSet () {
                ajax.post('findBasicSet', {}).then(res => {
                    if( res.success){
                        if(res.data){
                            this.id = res.data.id;
                            if(res.data.allowAdjustAccount){
                                //处理数据
                                let params = {
                                    scoreEffectiveMode: JSON.parse(res.data.scoreEffectiveMode),
                                    scoreMultipleOnBirthday: JSON.parse(res.data.scoreMultipleOnBirthday),
                                    scoreValidityPeriod: JSON.parse(res.data.scoreValidityPeriod),
                                    memberValidPeriod: JSON.parse(res.data.memberValidPeriod),
                                    notificationBeforeCouponExpire: JSON.parse(res.data.notificationBeforeCouponExpire),
                                    handingWithScoreGrowthWhileRefund: JSON.parse(res.data.handingWithScoreGrowthWhileRefund),
                                    allowAdjustAccount: res.data.allowAdjustAccount,
                                };
                                for( let key in params){
                                    if(key && Object.keys(params[key]).length > 0){
                                        for( let ckey in params[key]){
                                            if(this.stringProps.indexOf(ckey) > -1){
                                                params[key][ckey] = this.transPropsType(params[key][ckey], 'string');
                                            }
                                        }
                                    }
                                }
                                console.log(params)
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
                })
            },
            //点击保存，校验信息，数据处理
            save () {
                if(this.checkInputFunc()){

                    let setParam = defaultsDeep({}, this.settingData);
                    for( let key in setParam){
                        if(key && Object.keys(setParam[key]).length > 0){
                            for( let ckey in setParam[key]){
                                if(this.boolProps.indexOf(ckey) > -1){
                                    setParam[key][ckey] = this.transPropsType(setParam[key][ckey], 'boolean');
                                }
                                if(this.numberProps.indexOf(ckey) > -1){
                                    setParam[key][ckey] = this.transPropsType(setParam[key][ckey], 'number');
                                }
                            }
                        }
                    }
                    setParam.id = this.id;
                    console.log(setParam)

                    let params = {
                        id: this.id,
                        scoreEffectiveMode: JSON.stringify(setParam.scoreEffectiveMode),
                        scoreMultipleOnBirthday: JSON.stringify(setParam.scoreMultipleOnBirthday),
                        scoreValidityPeriod: JSON.stringify(setParam.scoreValidityPeriod),
                        memberValidPeriod: JSON.stringify(setParam.memberValidPeriod),
                        notificationBeforeCouponExpire: JSON.stringify(setParam.notificationBeforeCouponExpire),
                        handingWithScoreGrowthWhileRefund: JSON.stringify(setParam.handingWithScoreGrowthWhileRefund),
                        allowAdjustAccount: setParam.allowAdjustAccount,
                    };
                    console.log(params)
                    this.basicSet(params);

                }
            },
            //会员基础设置-保存/修改
            basicSet ( params ) {
                ajax.post('basicSet', params).then(res => {
                    if( res.success){
                        this.$Message.success('保存基础设置成功!');
                        this.findBasicSet();
                    }
                })
            },
            //点击取消重置数据
            resetFieldFunc () {
                if(this.copySetData !== {}){
                    this.settingData = defaultsDeep({}, this.copySetData);
                }
            },
            //校验选项勾选是输入框是否填写，返回true/false
            checkInputFunc () {
                if(this.settingData.scoreEffectiveMode.isIntegralType === 'checkout_after' && !this.validateInput(this.settingData.scoreEffectiveMode.isNoIntegralTime)){
                    this.checkInputBlurFunc(this.settingData.scoreEffectiveMode.isNoIntegralTime, 'isNoIntegralTimeError');
                    return false
                }

                if(this.settingData.scoreMultipleOnBirthday.isSwitch && !this.validateInput(this.settingData.scoreMultipleOnBirthday.multiple)){
                    this.checkInputBlurFunc(this.settingData.scoreMultipleOnBirthday.isSwitch, 'multipleError');
                    return false
                }

                if(this.settingData.scoreValidityPeriod.validityType === 'months_effective' && !this.validateInput(this.settingData.scoreValidityPeriod.validityTime)){
                    this.checkInputBlurFunc(this.settingData.scoreValidityPeriod.validityType, 'validityTimeError');
                    return false
                }

                if(this.settingData.scoreValidityPeriod.checked && !this.validateInput(this.settingData.scoreValidityPeriod.validityTime)){
                    this.checkInputBlurFunc(this.settingData.scoreValidityPeriod.checked, 'remindError');
                    return false
                }

                if(this.settingData.memberValidPeriod.type === 'vipValidityType' && !this.validateInput(this.settingData.memberValidPeriod.vipValidity)){
                    this.checkInputBlurFunc(this.settingData.memberValidPeriod.vipValidity, 'vipValidityError');
                    return false
                }

                if(this.settingData.memberValidPeriod.type === 'vipValidityTime' && !this.validateInput(this.settingData.memberValidPeriod.vipValidityTime)){
                    this.checkInputBlurFunc(this.settingData.memberValidPeriod.vipValidityTime, 'vipValidityTimeError');
                    return false
                }

                if(this.settingData.memberValidPeriod.type === 'vipNumber' && !this.validateInput(this.settingData.memberValidPeriod.vipNumber)){
                    this.checkInputBlurFunc(this.settingData.memberValidPeriod.vipNumber, 'vipNumberError');
                    return false
                }

                if(this.settingData.notificationBeforeCouponExpire.isSwitch && !this.validateInput(this.settingData.notificationBeforeCouponExpire.day)){
                    this.checkInputBlurFunc(this.settingData.notificationBeforeCouponExpire.day, 'dayError');
                    return false
                }

                return true
            },
            //校验input输入
            validateInput ( value ) {
                if( value === '' || value === 'null' || value == 0 || !value ){
                    return false
                } else if( value && value.length > 10 ){
                    return false
                } else if( value && value.isUtf16() ){
                    return false
                } else {
                    return true
                }
            },


            //查询证件类型
            queryDocument () {
                this.formDynamic.idType = [];
                ajax.post('queryDocument',{
                    isDeleted: 'false',
                    pageNo: 1,
                    pageSize: 99999,
                }).then(res => {
                    if(res.success){
                        if(res.data.data && res.data.data.length > 0){
                            res.data.data.forEach( (item, index) => {
                                item.index = index;
                                item._status = 1;
                                item.active = true;
                                item.disabled = true;
                                this.formDynamic.idType.push(item);
                            })
                        }
                    }
                })
            },
            //增加/修改证件
            updateDocument ( data, index ) {
                ajax.post('updateDocument',{
                    name: data.name,
                }).then(res => {
                    if(res.success){
                        this.formDynamic.idType[index].disabled = true;
                        this.formDynamic.idType[index].active = true;
                        this.$Message.success('新增证件类型成功!');
                    }
                })
            },
            //删除证件类型
            deleteDocument ( data, index ) {
                ajax.post('updateDocument',{
                    id: data.id,
                    isDeleted: 'true',
                }).then(res => {
                    if(res.success){
                        this.$Message.success('删除证件类型成功!');
                        this.formDynamic.idType[index]._status = 0;
                    }
                })
            },
            //新增证件类型
            handleAddIdType() {
                this.idTypeIndex++;
                this.formDynamic.idType.push({
                    name: '',
                    index: this.idTypeIndex,
                    _status: 1,
                    disabled: false,
                });
            },
            //证件类型校验
            handleSubmitForIdType ( data, index ) {
                this.$refs.formDynamic.validateField( 'idType.' + index + '.name',  (valid) => {
                    if (valid === '') {
                        this.updateDocument(data, index);
                    }
                } );
            },
            //取消证件类型校验
            handleResetDocument (data, index) {
                this.$refs.formDynamic.resetFields('idType.' + index + '.name' );
                this.formDynamic.idType[index]._status = 0;
            },


            //查询修改原因
            listAdjustReason () {
                ajax.post('listAdjustReason',{}).then(res => {
                    if(res.success){
                        if(res.data && res.data.length > 0){
                            res.data.forEach( (item, index) => {
                                item.index = index;
                                item._status = 1;
                                item.active = true;
                                item.disabled = true;
                                this.formDynamic.reason.push(item);
                            })
                        }
                    }
                })
            },
            //增加/修改原因
            updateReason ( data, index ) {
                ajax.post('addAdjustReason',{
                    reason: data.reason,
                }).then(res => {
                    if(res.success){
                        this.formDynamic.reason[index].disabled = true;
                        this.formDynamic.reason[index].active = true;
                        this.$Message.success('新增原因成功!');
                    }
                })
            },
            //删除原因
            deleteReason ( data, index ) {
                ajax.post('deleteAdjustReason',{
                    reasonId: data.id,
                }).then(res => {
                    if(res.success){
                        this.$Message.success('删除原因成功!');
                        this.formDynamic.reason[index]._status = 0;
                    }
                })
            },
            //新增修改原因
            handleAddReason () {
                this.reasonIndex++;
                this.formDynamic.reason.push({
                    reason: '',
                    index: this.reasonIndex,
                    _status: 1,
                    disabled: false,
                });
            },
            //修改原因表单校验
            handleSubmitForReason ( data, index ) {
                this.$refs.formDynamic.validateField( 'reason.' + index + '.reason', (valid) => {
                    if (valid === '') {
                        this.updateReason(data, index);
                    }
                });
            },
            //取消原因表单校验
            handleResetReason (data, index) {
                this.$refs.formDynamic.resetFields('reason.' + index + '.reason' );
                this.formDynamic.reason[index]._status = 0;
            },

            /**
             * 输入框失焦校验
             * @param val 值
             * @param errorField 校验错误显示字段
             */
            checkInputBlurFunc ( val, errorField ) {

                //为空校验
                if( val === '' || val === 'null' || val == 0 || !val){
                    this.error[errorField] = '不能为空';
                    return
                } else {
                    this.error[errorField] = '';
                }

                //长度校验
                if (val && val.length > 10) {
                    this.error[errorField] = '不能超过10个';
                    return
                } else {
                    this.error[errorField] = '';
                }

                //校验表情符号
                if (val && val.isUtf16()) {
                    this.error[errorField] = '输入内容不合规则';
                    return
                } else {
                    this.error[errorField] = '';
                }

                //校验正整数
                if(val){
                    common.validateInteger(val).then(() => {
                        this.error[errorField] = '';
                    }).catch(err => {
                        this.error[errorField] = err;
                        return
                    });
                }

            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .setting{
        @include block_outline();
        min-width: $content_min_width;
        overflow: hidden;
        background: $color-fff;
        border-radius: 4px;

        .content{
            padding: 25px 60px;
            height: calc(100% - 124px);
            overflow: auto;

            .content-item{
                margin-bottom: 30px;

                /deep/ .ivu-form-item-wrap{
                    position: relative;
                    /*display: inline-block;*/
                    min-width: 495px;
                    padding-right: 55px;
                    width: 40%;
                    text-align: center;
                    vertical-align: middle;

                    .ivu-form-item{
                        width: 520px;
                        text-align: left;
                    }

                    &.short-wrap{
                        min-width: 360px;
                        .ivu-form-item{
                            width: 360px;
                        }
                    }
                    &.margin-left-50{
                        margin-left: 50px;
                    }
                }

                /deep/ .ivu-form-item-content{
                    width: 100%;
                }

                /deep/ .ivu-input-wrapper{
                    margin-bottom: 0px !important;
                    margin-right: 5px;
                    width: 80%;
                }

                .title{
                    font-size: $font_size_16px;
                    color: $color_333;
                    line-height: 24px;
                    margin-bottom: 15px;
                }
                .main{
                    position: relative;
                    div{
                        margin-bottom: 10px;
                    }
                    &.form-bottom{
                        /deep/ .ivu-radio-group{
                            margin-bottom: 18px;
                        }
                    }
                    &.margin-radio-group{
                        /deep/ .ivu-radio-wrapper{
                           margin-bottom: 18px;
                        }
                    }
                }
            }

            .add-span{
                font-size: $font_size_14px;
                margin-left: 20px;
            }

            .blue-color{
                font-size: $font_size_14px;
                color: $color_blue;
                cursor: pointer;
            }
            .red-color{
                font-size: $font_size_14px;
                color: $color_red;
                cursor: pointer;
            }
            .grey-color{
                font-size: $font_size_14px;
                color: $color-3F3F3F;
                cursor: pointer;
            }
            .span-bottom{
                vertical-align: bottom;
            }

        }

        /deep/ .ivu-input-wrapper{
            vertical-align: sub;

            &.single-input{
                margin: 0 10px;
                width: 100px !important;
            }
        }

        .check-group-wrap{
            padding-left: 50px;
        }

        .btn-wrap{
            height: 56px;
            width: 100%;
            line-height: 56px;
            text-align: center;
            background: #FFFFFF;
            box-shadow: 0 -5px 3px 0 rgba(0,0,0,0.03);

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
