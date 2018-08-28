<template>
    <!--会员管理--积分消费管理-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="content-item">
                <div class="title">会员积分交易抵扣规则设置</div>
                <div class="main">
                    <div>
                        <i-switch v-model="settingData.scoreOffsetInConsumption.type"></i-switch>
                        <span class="text">允许积分交易时抵现使用</span>
                    </div>
                    <div class="check-group-wrap">
                        <Checkbox v-model="settingData.scoreOffsetInConsumption.columns.integrateToMoney">交易时，积分可抵扣订单金额，每</Checkbox>
                        <span :class="{'ivu-form-item-error': error.integrateError}">
                             <Input v-model.trim="settingData.scoreOffsetInConsumption.columns.integrate"
                                    :disabled="!settingData.scoreOffsetInConsumption.columns.integrateToMoney"
                                    @on-blur="checkInputBlurFunc(settingData.scoreOffsetInConsumption.columns.integrate,'integrateError')"
                                    type="text"
                                    class="single-input"
                                    placeholder="请输入"/>
                             <span class="ivu-form-item-error-tip"
                                   style="left: 296px;"
                                   v-if="error.integrateError">{{error.integrateError}}</span>
                        </span>
                        <span>积分抵扣</span>
                        <span :class="{'ivu-form-item-error': error.moneyError}">
                             <Input v-model.trim="settingData.scoreOffsetInConsumption.columns.money"
                                    :disabled="!settingData.scoreOffsetInConsumption.columns.integrateToMoney"
                                    @on-blur="checkInputBlurFunc(settingData.scoreOffsetInConsumption.columns.money,'moneyError')"
                                    type="text"
                                    placeholder="请输入"
                                    class="single-input"/>
                             <span class="ivu-form-item-error-tip"
                                   style="left: 485px;"
                                   v-if="error.moneyError">{{error.moneyError}}</span>
                        </span>
                        <span>元，抵扣比例最多是此订单的</span>
                        <span :class="{'ivu-form-item-error': error.highProportionError}">
                             <Input v-model.trim="settingData.scoreOffsetInConsumption.columns.highProportion"
                                    :disabled="!settingData.scoreOffsetInConsumption.columns.integrateToMoney"
                                    @on-blur="checkInputBlurFunc(settingData.scoreOffsetInConsumption.columns.highProportion,'highProportionError')"
                                    type="text"
                                    placeholder="请输入"
                                    class="single-input"/>
                             <span class="ivu-form-item-error-tip"
                                   style="left: 795px;"
                                   v-if="error.highProportionError">{{error.highProportionError}}</span>
                        </span>
                        <span>%</span>
                    </div>
                    <div class="check-group-wrap">
                        <Checkbox v-model="settingData.scoreOffsetInConsumption.meanwhile">消费时可和优惠券同时使用</Checkbox>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">是否允许积分兑换成为储值账户金额</div>
                <div class="main">
                    <div>
                        <i-switch v-model="settingData.scoreExToCharge.donateType"></i-switch>
                        <span class="text">允许积分兑换储值账户金额</span>
                    </div>
                    <div class="check-group-wrap">
                        请设置兑换比例：
                        <span :class="{'ivu-form-item-error': error.donateIntegrateError}">
                            <Input v-model.trim="settingData.scoreExToCharge.donateIntegrate"
                                   :disabled="!settingData.scoreExToCharge.donateType"
                                   @on-blur="checkInputBlurFunc(settingData.scoreExToCharge.donateIntegrate,'donateIntegrateError')"
                                   type="text"
                                   placeholder="请输入"
                                   class="single-input"/>
                            <span class="ivu-form-item-error-tip"
                               style="left: 176px;"
                               v-if="error.donateIntegrateError">{{error.donateIntegrateError}}</span>
                        </span>
                        积分
                        <span> 1 元</span>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">退款时积分退回设置</div>
                <div class="main">
                    <i-switch v-model="settingData.scoreInsufficientNotification"></i-switch>
                    <span class="text">当用户退款时积分同步扣除，如账户剩余积分不足以扣除，用户系统发出提示</span>
                </div>
            </div>

        </div>

        <div class="btn-wrap">
            <Button type="primary" @click="basicSet">保存</Button>
            <Button type="ghost" @click="resetFieldFunc">取消</Button>
        </div>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import headerTabs from './components/headerTabs.vue';

    export default {
        components: {
            headerTabs,
        },
        data () {
            return {
                //设置id
                id:'',
                //当前页面路由名称
                routerName: 'consumeSetting',
                //设置数据
                settingData: {
                    //积分交易抵扣规则
                    scoreOffsetInConsumption: {
                        type: true,
                        columns: {
                            integrateToMoney: true,
                            integrate: 100,//多少积分
                            money: 5,//多少金额
                            highProportion: 10,//最多能抵多少
                        },
                        meanwhile: true,
                    },
                    //是否允许积分兑换成为储值账户金额
                    scoreExToCharge: {
                        donateType: true,
                        donateIntegrate: '',
                        donateMoney: '1',
                    },
                    //退款时积分退回设置
                    scoreInsufficientNotification: true,
                },
                //copy数据，用于数据重置
                copySetData: {},
                //输入框校验错误显示
                error: {
                    integrateError: '',//积分交易抵扣规则--多少积分
                    moneyError: '',//积分交易抵扣规则--多少金额
                    highProportionError: '',//积分交易抵扣规则--最多能抵多少
                    donateIntegrateError: '',
                },
            }
        },
        watch: {

            //会员积分有效期设置
            'settingData.scoreOffsetInConsumption.type' : function (newVal, oldVal) {
                if(newVal){
                    this.settingData.scoreOffsetInConsumption.columns.integrateToMoney = true;
                    this.settingData.scoreOffsetInConsumption.meanwhile = true;
                } else {
                    this.settingData.scoreOffsetInConsumption.columns.integrateToMoney = false;
                    this.settingData.scoreOffsetInConsumption.meanwhile = false;
                    this.error.integrateError = '';
                    this.error.moneyError = '';
                    this.error.highProportionError = '';
                }
            },

            //会员积分有效期设置复选框
            'settingData.scoreOffsetInConsumption.columns.integrateToMoney' : function (newVal, oldVal) {
                if(!newVal){
                    this.error.integrateError = '';
                    this.error.moneyError = '';
                    this.error.highProportionError = '';
                }
            },

            //会员积分有效期设置
            'settingData.scoreExToCharge.donateType' : function (newVal, oldVal) {
                if(!newVal){
                    this.error.donateIntegrateError = '';
                    this.error.donateMoneyError = '';
                }
            },

        },
        created() {
            //查询会员基础设置
            this.findBasicSet();
        },
        methods: {

            //查询会员基础设置
            findBasicSet () {
                ajax.post('findBasicSet', {}).then(res => {
                    if( res.success){
                        if(res.data){
                            this.id = res.data.id;
                            if(res.data.scoreInsufficientNotification){
                                //处理数据
                                let params = {
                                    scoreOffsetInConsumption: JSON.parse(res.data.scoreOffsetInConsumption),
                                    scoreExToCharge: JSON.parse(res.data.scoreExToCharge),
                                    scoreInsufficientNotification: res.data.scoreInsufficientNotification,
                                };
                                params.scoreInsufficientNotification = Boolean(res.data.scoreInsufficientNotification);
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
            //会员基础设置-保存/修改
            basicSet () {
                if(this.checkInputFunc()){
                    ajax.post('basicSet', {
                        id: this.id,
                        scoreOffsetInConsumption: JSON.stringify(this.settingData.scoreOffsetInConsumption),
                        scoreExToCharge: JSON.stringify(this.settingData.scoreExToCharge),
                        scoreInsufficientNotification: this.settingData.scoreInsufficientNotification,
                    }).then(res => {
                        if( res.success){
                            this.$Message.success('保存积分消费设置成功!');
                            this.findBasicSet();
                        }
                    })
                }
            },
            //点击取消重置数据
            resetFieldFunc () {
                if(this.copySetData !== {}){
                    this.settingData = defaultsDeep({}, this.copySetData);
                }
            },

            //校验选项勾选是输入框是否填写，返回true/false
            checkInputFunc () {

                if(this.settingData.scoreOffsetInConsumption.columns.integrateToMoney &&
                    !this.validateInput(this.settingData.scoreOffsetInConsumption.columns.integrate)){
                    this.checkInputBlurFunc(this.settingData.scoreOffsetInConsumption.columns.integrate, 'integrateError');
                    return false
                }

                if(this.settingData.scoreOffsetInConsumption.columns.integrateToMoney &&
                    !this.validateInput(this.settingData.scoreOffsetInConsumption.columns.money)){
                    this.checkInputBlurFunc(this.settingData.scoreOffsetInConsumption.columns.money, 'moneyError');
                    return false
                }

                if(this.settingData.scoreOffsetInConsumption.columns.integrateToMoney &&
                    !this.validateInput(this.settingData.scoreOffsetInConsumption.columns.highProportion)){
                    this.checkInputBlurFunc(this.settingData.scoreOffsetInConsumption.columns.highProportion, 'highProportionError');
                    return false
                }

                if(this.settingData.scoreExToCharge.donateType &&
                    !this.validateInput(this.settingData.scoreExToCharge.donateIntegrate)
                ){
                    this.checkInputBlurFunc(this.settingData.scoreOffsetInConsumption.donateIntegrate, 'donateIntegrateError');
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
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

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
                    div{
                        margin-bottom: 6px;
                    }
                }
            }

        }

        /deep/ .ivu-input-wrapper{
            vertical-align: inherit;
            &.single-input{
                margin: 0 10px;
                width: 100px !important;
            }
        }

        .check-group-wrap{
            padding-left: 50px;
            margin-bottom: 0 !important;
            position: relative;
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

