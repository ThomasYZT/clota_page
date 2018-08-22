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
                        <Input v-model.trim="settingData.scoreOffsetInConsumption.columns.integrate"
                               :disabled="!settingData.scoreOffsetInConsumption.columns.integrateToMoney"
                               type="text"
                               class="single-input"
                               placeholder="请输入"/>
                        <span>积分抵扣</span>
                        <Input v-model.trim="settingData.scoreOffsetInConsumption.columns.money"
                               :disabled="!settingData.scoreOffsetInConsumption.columns.integrateToMoney"
                               type="text"
                               placeholder="请输入"
                               class="single-input"/>
                        <span>元，抵扣比例最多是此订单的</span>
                        <Input v-model.trim="settingData.scoreOffsetInConsumption.columns.highProportion"
                               :disabled="!settingData.scoreOffsetInConsumption.columns.integrateToMoney"
                               type="text"
                               placeholder="请输入"
                               class="single-input"/> %
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
                        <Input v-model.trim="settingData.scoreExToCharge.donateIntegrate"
                               :disabled="!settingData.scoreExToCharge.donateType"
                               type="text"
                               placeholder="请输入"
                               class="single-input"/>
                        积分
                        <Input v-model.trim="settingData.scoreExToCharge.donateMoney"
                               :disabled="!settingData.scoreExToCharge.donateType"
                               type="text"
                               placeholder="请输入"
                               class="single-input"/>
                        元
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
                            highProportion: 0.1,//最多能抵多少
                        },
                        meanwhile: true,
                    },
                    //是否允许积分兑换成为储值账户金额
                    scoreExToCharge: {
                        donateType: true,
                        donateIntegrate: '',
                        donateMoney: '',
                    },
                    //退款时积分退回设置
                    scoreInsufficientNotification: true,
                },
                //copy数据，用于数据重置
                copySetData: {},
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
                }
            }
        },
        created() {
            //查询会员基础设置
            this.findBasicSet();
        },
        methods: {

            //查询会员基础设置
            findBasicSet () {
                ajax.post('findBasicSet', {
                    companyId: 1,
                    orgId: 101,
                } ).then(res => {
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
            },
            //点击取消重置数据
            resetFieldFunc () {
                if(this.copySetData !== {}){
                    this.settingData = defaultsDeep({}, this.copySetData);
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
                        margin-bottom: 10px;
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

