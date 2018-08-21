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
                        <Input v-model="growthRateWhileConsume.growthSet"
                           type="text"
                           class="single-input"
                           placeholder="请输入"/>
                        元获取
                        <Input v-model="growthRateWhileConsume.growthSetValue"
                               type="text"
                               class="single-input"
                               placeholder="请输入"/>
                        成长值</span>
                </div>
            </div>

            <div class="content-item">
                <div class="title">成长值生效设置</div>
                <div class="main">
                    <RadioGroup v-model="growthEffectiveMode.growthType" vertical>
                        <Radio label="immediately">
                            <span>付款成功后立即生效</span>
                        </Radio>
                        <Radio label="checkout">
                            <span>消费、核销成功后立即生效</span>
                        </Radio>
                        <Radio label="checkout_after">
                            <span>消费、核销成功后
                            <Input v-model="growthEffectiveMode.growthTime"
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
                    <RadioGroup v-model="growthFromFamilies" vertical>
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
            <Button type="primary">保存</Button>
            <Button type="ghost">取消</Button>
        </div>

    </div>
</template>

<script>

    import headerTabs from './components/headerTabs.vue'

    export default {
        components: {
            headerTabs,
        },
        data () {
            return {
                //当前页面路由名称
                routerName: 'growthSetting',
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
            }
        }
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
