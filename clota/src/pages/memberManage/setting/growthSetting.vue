<template>
    <!--会员管理--成长值设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="content-item">
                <div class="title">成长值设置</div>
                <div class="main">
                    <span class="text">消费
                        <Input v-model.trim="settingData.growthRateWhileConsume.growthSet"
                               type="text"
                               :maxlength="10"
                               @on-blur="validateInput(settingData.growthRateWhileConsume.growthSet)"
                               class="single-input"
                               placeholder="请输入"/>
                        元获取
                        <Input v-model.trim="settingData.growthRateWhileConsume.growthSetValue"
                               :maxlength="10"
                               @on-blur="validateInput(settingData.growthRateWhileConsume.growthSetValue)"
                               type="text"
                               class="single-input"
                               placeholder="请输入"/>
                        成长值</span>
                </div>
            </div>

            <div class="content-item">
                <div class="title">成长值生效设置</div>
                <div class="main">
                    <RadioGroup v-model="settingData.growthEffectiveMode.growthType" vertical>
                        <Radio label="immediately">
                            <span>付款成功后立即生效</span>
                        </Radio>
                        <Radio label="checkout">
                            <span>消费、核销成功后立即生效</span>
                        </Radio>
                        <Radio label="checkout_after">
                            <span>消费、核销成功后
                            <Input v-model.trim="settingData.growthEffectiveMode.growthTime"
                                   :disabled="settingData.growthEffectiveMode.growthType !== 'checkout_after' ? true : false"
                                   :maxlength="10"
                                   @on-blur="validateInput(settingData.growthEffectiveMode.growthTime)"
                                   type="text"
                                   class="single-input"
                                   placeholder="请输入"/>
                                小时后生效</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">子母卡成长值归属设置</div>
                <div class="main">
                    <RadioGroup v-model="settingData.growthFromFamilies" vertical>
                        <Radio label="true">
                            <span>子卡产生的成长值累加在母卡上</span>
                        </Radio>
                        <Radio label="false">
                            <span>子卡产生的成长值不累加在母卡上，累加在子卡上，子卡可单独升级</span>
                        </Radio>
                    </RadioGroup>
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
                routerName: 'growthSetting',
                //设置数据
                settingData: {
                    //成长值设置
                    growthRateWhileConsume: {
                        growthSet: '1',
                        growthSetValue: '1',
                    },
                    //成长值生效设置
                    growthEffectiveMode: {
                        growthType: 'checkout',
                        growthTime: '24',
                    },
                    //子母卡成长值归属设置
                    growthFromFamilies: 'false',
                },
                //copy数据，用于数据重置
                copySetData: {},
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
                            if(res.data.growthFromFamilies){
                                //处理数据
                                let params = {
                                    growthRateWhileConsume: JSON.parse(res.data.growthRateWhileConsume),
                                    growthEffectiveMode: JSON.parse(res.data.growthEffectiveMode),
                                    growthFromFamilies: res.data.growthFromFamilies,
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
                })
            },
            //会员基础设置-保存/修改
            basicSet () {
                if(this.checkInputFunc()){
                    ajax.post('basicSet', {
                        id: this.id,
                        growthRateWhileConsume: JSON.stringify(this.settingData.growthRateWhileConsume),
                        growthEffectiveMode: JSON.stringify(this.settingData.growthEffectiveMode),
                        growthFromFamilies:this.settingData.growthFromFamilies,
                    }).then(res => {
                        if( res.success){
                            this.$Message.success('保存成长值设置成功!');
                            this.findBasicSet();
                        }
                    })
                } else {
                    this.$Message.warning("输入框不能为空");
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
                if(!this.validateInput(this.settingData.growthRateWhileConsume.growthSet)){
                    return false
                }

                if(!this.validateInput(this.settingData.growthRateWhileConsume.growthSetValue)){
                    return false
                }

                if(this.settingData.growthEffectiveMode.growthType === 'checkout_after' && !this.validateInput(this.settingData.growthEffectiveMode.growthTime)){
                    return false
                }

                return true
            },
            //校验input输入
            validateInput ( value ) {
                if( value === '' || value === 'null' || value == 0 || !value){
                    this.$Message.warning("输入框不能为空");
                    return false
                } else if( value && value.length > 10){
                    this.$Message.warning("当前输入字符不能超过10个");
                    return false
                } else if ( value && ( parseInt(value) < 0 || parseInt(value) + '' !== value + '' ) ) {
                    this.$Message.warning("当前输入只能是非负整数");
                    return false
                } else {
                    return true
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
                    div{
                        margin-bottom: 10px;
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
