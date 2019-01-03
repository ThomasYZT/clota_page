<template>
    <!--会员管理--成长值设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="content-item">
                <div class="title">{{$t('growthSetting')}}</div>
                <div class="main">
                    <span class="text">{{$t('consume')}}
                        <span :class="{'ivu-form-item-error': error.growthSetError}">
                            <Input v-model.trim="settingData.growthRateWhileConsume.growthSet"
                                 type="text"
                                 @on-blur="checkInputBlurFunc(settingData.growthRateWhileConsume.growthSet,'growthSetError')"
                                 class="single-input"
                                 :placeholder="$t('inputField', {field: ''})"/>{{$t('yuanSaved')}}
                            <span class="ivu-form-item-error-tip"
                                style="left: 40px;"
                                v-if="error.growthSetError">{{error.growthSetError}}</span>
                        </span>
                        <span> {{settingData.growthRateWhileConsume.growthSetValue}} {{$t('growth')}}</span>
                    </span>
                </div>
            </div>

            <!--成长值生效设置-->
            <div class="content-item">
                <div class="title">{{$t('growthValidSetting')}}</div>
                <div class="main">
                    <RadioGroup v-model="settingData.growthEffectiveMode.growthType" vertical>
                        <Radio label="immediately">
                            <span>{{$t('effectAfterPayed')}}</span>
                        </Radio>
                        <Radio label="checkout">
                            <span>{{$t('effectAfterConsumption')}}</span>
                        </Radio>
                        <Radio label="checkout_after" :class="{'ivu-form-item-error': error.growthTimeError}">
                            <span>{{$t('afterConsumption')}}
                            <Input v-model.trim="settingData.growthEffectiveMode.growthTime"
                                   :disabled="settingData.growthEffectiveMode.growthType !== 'checkout_after' ? true : false"
                                   @on-blur="checkInputBlurFunc(settingData.growthEffectiveMode.growthTime,'growthTimeError')"
                                   type="text"
                                   class="single-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                                {{$t('hourLaterEffective')}}</span>
                            <span class="ivu-form-item-error-tip"
                                  style="left: 153px;"
                                  v-if="error.growthTimeError">{{error.growthTimeError}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <!--储值获得成长值比例设置-->
            <div class="content-item">
                <div class="title">{{$t('storeGetGrowthSetting')}}</div>
                <div class="main">
                    <RadioGroup v-model="settingData.growthFromCharging.chargingAddGrowth" vertical>
                        <Radio label="false">
                            <span>{{$t('storeGrowthSetting1')}}</span>
                        </Radio>
                        <Radio label="true">
                            <span>{{$t('storeGrowthSetting2')}}</span>
                        </Radio>
                    </RadioGroup>
                    <div class="check-group-wrap">{{$t('recharge')}}
                        <span :class="{'ivu-form-item-error': error.moneyToGgowthError}">
                            <Input v-model.trim="settingData.growthFromCharging.moneyToGgowth"
                                   :disabled="settingData.growthFromCharging.chargingAddGrowth !== 'true'"
                                   @on-blur="checkInputBlurFunc(settingData.growthFromCharging.moneyToGgowth,'moneyToGgowthError')"
                                   type="text"
                                   class="single-input"
                                   :placeholder="$t('inputField', {field: ''})"/> {{$t('yuanSaved')}}
                            <span class="ivu-form-item-error-tip"
                                  style="left: 92px;"
                                  v-if="error.moneyToGgowthError">{{error.moneyToGgowthError}}</span>
                        </span>
                        <span> {{settingData.growthFromCharging.growth}} {{$t('growth')}}</span>
                    </div>
                </div>
            </div>

            <!--储值获得成长值生效设置-->
            <div class="content-item">
                <div class="title">{{$t('storeGetGrowthSettingValidateTime')}}</div>
                <div class="main">
                    <RadioGroup v-model="settingData.growthEffModeWhileCharging.storedType" vertical>
                        <Radio label="immediately">
                            <span>{{$t('rechartSucEffective')}}</span>
                        </Radio>
                        <Radio label="checkout_after" :class="{'ivu-form-item-error': error.storeTimeError}">
                            <span>{{$t('rechartSuc')}}</span>
                            <Input v-model.trim="settingData.growthEffModeWhileCharging.storedTime"
                                   :disabled="settingData.growthEffModeWhileCharging.storedType !== 'checkout_after' ? true : false"
                                   @on-blur="checkInputBlurFunc(settingData.growthEffModeWhileCharging.storedTime,'storeTimeError')"
                                   type="text"
                                   class="single-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{$t('hourLaterInvalid')}}</span>
                            <span class="ivu-form-item-error-tip"
                                  style="left: 113px;"
                                  v-if="error.storeTimeError">{{error.storeTimeError}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

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

    export default {
        components : {
            headerTabs,
        },
        data () {
            return {
                //设置id
                id : '',
                //当前页面路由名称
                routerName : 'growthSetting',
                //设置数据
                settingData : {
                    //储值获得积分、成长值生效设置
                    growthEffModeWhileCharging : {
                        storedType : '',
                        storedTime : '',//Number
                    },
                    //储值成长值比例设置
                    growthFromCharging : {
                        chargingAddGrowth : '',//Boolean
                        moneyToGgowth : '',//储值额-积分 Number
                        growth : 1,//积分
                    },
                    //成长值设置
                    growthRateWhileConsume : {
                        growthSet : '',//Number
                        growthSetValue : 1,
                    },
                    //成长值生效设置
                    growthEffectiveMode : {
                        storedType : '',
                        storedTime : '',//Number
                    },
                },
                //copy数据，用于数据重置
                copySetData : {},
                //输入框校验错误显示
                error : {
                    moneyToGgowthError : '',//储值获得成长值生效设置
                    growthSetError : '',//成长值设置--消费值
                    growthTimeError : '',//成长值生效设置
                    storeTimeError : '',//储值获得积分生效设置
                },
                //Number型
                numberProps : ['growthSet','storedTime'],
                //String型
                stringProps : ['growthSet','storedTime','chargingAddGrowth'],
            };
        },
        watch : {

            //储值获得成长值生效设置
            'settingData.growthEffModeWhileCharging.storedType' : function (newVal, oldVal) {
                if (newVal !== 'checkout_after') {
                    this.error.moneyToGgowthError = '';
                }
            },

            //成长值生效设置
            'settingData.growthEffectiveMode.growthType' : function (newVal, oldVal) {
                if (newVal !== 'checkout_after') {
                    this.error.growthTimeError = '';
                }
            },

            //储值获得成长值比例设置
            'settingData.growthFromCharging.chargingAddGrowth' : function (newVal, oldVal) {
                if (newVal === 'false') {
                    this.error.moneyToGgowthError = '';
                }
            },

        },
        created () {
            //查询会员基础设置
            this.findBasicSet();
        },
        methods : {

            //数据转换，数据查询后转成string进入input，保存时转成相应类型
            transPropsType ( data, type ) {
                switch (type) {
                    case 'number':
                        return data ? Number(data) : 0;
                        break;
                    case 'boolean':
                        return data === 'true' ? true : false;
                        break;
                    case 'string':
                        return data !== null ? String(data) : '';
                        break;
                }
            },

            //查询会员基础设置
            findBasicSet () {
                ajax.post('findBasicSet', {}).then(res => {
                    if ( res.success) {
                        if (res.data && Object.keys(res.data).length > 0) {
                            this.id = res.data.id;
                            //处理数据
                            let params = {
                                growthEffModeWhileCharging : res.data.growthEffModeWhileCharging ?
                                    JSON.parse(res.data.growthEffModeWhileCharging) : this.settingData.growthEffModeWhileCharging,
                                growthFromCharging : res.data.growthFromCharging ?
                                    JSON.parse(res.data.growthFromCharging) : this.settingData.growthFromCharging,
                                growthRateWhileConsume : JSON.parse(res.data.growthRateWhileConsume),
                                growthEffectiveMode : JSON.parse(res.data.growthEffectiveMode),
                            };
                            for ( let key in params) {
                                if (key && Object.keys(params[key]).length > 0) {
                                    for ( let ckey in params[key]) {
                                        if (this.stringProps.indexOf(ckey) > -1) {
                                            params[key][ckey] = this.transPropsType(params[key][ckey], 'string');
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
                            }
                        }
                    }
                    setParam.id = this.id;

                    let params = {
                        id : this.id,
                        growthRateWhileConsume : JSON.stringify(this.settingData.growthRateWhileConsume),
                        growthEffectiveMode : JSON.stringify(this.settingData.growthEffectiveMode),
                        growthFromCharging : JSON.stringify(setParam.growthFromCharging),
                        growthEffModeWhileCharging : JSON.stringify(setParam.growthEffModeWhileCharging),
                    };
                    this.basicSet(params);

                }
            },
            //会员成长值设置-保存/修改
            basicSet ( params ) {
                ajax.post('basicSet', params).then(res => {
                    if ( res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('saveGrowthSetting') }));
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

                if (this.settingData.growthEffModeWhileCharging.storedType === 'checkout_after' &&
                    !this.checkInputBlurFunc(this.settingData.growthEffModeWhileCharging.storedTime, 'storedTimeError') ) {
                    return false;
                }

                if (this.settingData.growthFromCharging.chargingAddGrowth === 'true' &&
                    !this.checkInputBlurFunc(this.settingData.growthFromCharging.moneyToGgowth, 'moneyToGgowthError') ) {
                    return false;
                }

                if (!this.checkInputBlurFunc(this.settingData.growthRateWhileConsume.growthSet, 'growthSetError')) {
                    return false;
                }

                if (this.settingData.growthEffectiveMode.growthType === 'checkout_after' &&
                    !this.checkInputBlurFunc(this.settingData.growthEffectiveMode.growthTime, 'growthTimeError')) {
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

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .setting{
        @include block_outline();
        min-width: $content_min_width;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        /deep/ .ivu-input-wrapper{
            vertical-align: sub;
            &.single-input{
                margin: 0 10px;
                width: 100px !important;
            }
        }

        .content{
            padding: 30px 60px;
            height: calc(100% - 144px);
            overflow: auto;

            .content-item{
                margin-bottom: 30px;

                .title{
                    font-size: $font_size_16px;
                    color: $color_333;
                    line-height: 24px;
                    margin-bottom: 15px;
                }
                .main{
                    position: relative;

                    .check-group-wrap{
                        padding-left: 50px;
                        margin-bottom: 0 !important;
                        position: relative;
                        margin-top : 5px;

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
                }
            }

        }

        .btn-wrap{
            height: 56px;
            width: 100%;
            line-height: 56px;
            text-align: center;
            background: #FFFFFF;

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
