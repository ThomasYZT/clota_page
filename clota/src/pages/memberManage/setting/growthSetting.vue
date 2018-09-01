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

            <div class="content-item">
                <div class="title">{{$t('parentCardGrowthValueSetting')}}</div>
                <div class="main">
                    <RadioGroup v-model="settingData.growthFromFamilies" vertical>
                        <Radio label="true">
                            <span>{{$t('childCardGrowthValueSetting')}}</span>
                        </Radio>
                        <Radio label="false">
                            <span>{{$t('childCardGrowthSettingDesc')}}</span>
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
    import {validator} from 'klwk-ui';

    export default {
        components: {
            headerTabs,
        },
        data () {
            return {
                //设置id
                id:'',
                //当前页面路由名称
                routerName: 'growthSetting',
                //设置数据
                settingData: {
                    //成长值设置
                    growthRateWhileConsume: {
                        growthSet: '',//Number
                        growthSetValue: 1,
                    },
                    //成长值生效设置
                    growthEffectiveMode: {
                        growthType: '',
                        growthTime: '',//Number
                    },
                    //子母卡成长值归属设置
                    growthFromFamilies: '',
                },
                //copy数据，用于数据重置
                copySetData: {},
                //输入框校验错误显示
                error: {
                    growthSetError: '',//成长值设置--消费值
                    growthTimeError: '',//成长值生效设置
                },
                //Number型
                numberProps: ['growthSet','growthTime'],
                //String型
                stringProps: ['growthSet','growthTime'],
            }
        },
        watch: {

            //成长值生效设置
            'settingData.growthEffectiveMode.growthType' : function (newVal, oldVal) {
                if(newVal !== 'checkout_after'){
                    this.error.growthTimeError = '';
                }
            },

        },
        created() {
            //查询会员基础设置
            this.findBasicSet();
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
                            if(res.data.growthFromFamilies){
                                //处理数据
                                let params = {
                                    growthRateWhileConsume: JSON.parse(res.data.growthRateWhileConsume),
                                    growthEffectiveMode: JSON.parse(res.data.growthEffectiveMode),
                                    growthFromFamilies: res.data.growthFromFamilies,
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
                        growthRateWhileConsume: JSON.stringify(this.settingData.growthRateWhileConsume),
                        growthEffectiveMode: JSON.stringify(this.settingData.growthEffectiveMode),
                        growthFromFamilies:this.settingData.growthFromFamilies,
                    };
                    console.log(params)
                    this.basicSet(params);

                }
            },
            //会员成长值设置-保存/修改
            basicSet ( params ) {
                ajax.post('basicSet', params).then(res => {
                    if( res.success){
                        this.$Message.success(this.$t('successTip',{tip : this.$t('saveGrowthSetting')}));
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

                if(!this.checkInputBlurFunc(this.settingData.growthRateWhileConsume.growthSet, 'growthSetError')){
                    return false
                }

                if(this.settingData.growthEffectiveMode.growthType === 'checkout_after' &&
                    !this.checkInputBlurFunc(this.settingData.growthEffectiveMode.growthTime, 'growthTimeError')){
                    return false
                }

                return true
            },

            /**
             * 输入框失焦校验
             * @param val 值
             * @param errorField 校验错误显示字段
             */
            checkInputBlurFunc ( val, errorField ) {

                //校验不为空
                if(common.isNotEmpty(val)){
                    this.error[errorField] = '';
                }else{
                    this.error[errorField] = this.$t('inputField', {msg: ''});
                    return false
                }

                //校验表情符号
                if (val && val.isUtf16()) {
                    this.error[errorField] = this.$t('errorIrregular'); // 输入内容不合规则
                    return false
                } else {
                    this.error[errorField] = '';
                }
                //正整数，长度校验
                if(validator.isNumber(val)){
                    let numStr = String(val);
                    if(numStr.length < 1){
                        this.error[errorField] = this.$t('errorMinLength',{field : '',length : 1});
                        return false
                    }else if(numStr.length > 10){
                        this.error[errorField] = this.$t('errorMaxLength', {field : '',length : 10});
                        return false
                    }else{
                        if(Number.parseInt(val) === Number.parseFloat(val)){
                            if(val < 0){
                                this.error[errorField] = this.$t('fieldTypeError', {msg: ''});
                                return false
                            }else{
                                this.error[errorField] = '';
                            }
                        }else{
                            this.error[errorField] = this.$t('integetError', {msg: ''});
                            return false
                        }
                    }
                }else{
                    this.error[errorField] = this.$t('integetError', {msg: ''});
                    return false
                }

                return true

            },

        },
    }
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
                    div{
                        /*margin-bottom: 10px;*/
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
