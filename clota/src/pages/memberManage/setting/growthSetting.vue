<template>
    <!--会员管理--成长值设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">


            <div class="content-item">
                <div class="title">成长值设置</div>
                <div class="main">
                    <span class="text">消费 <Input value="2" type="text" placeholder="请输入" style="width: 100px;" /> 元获取
                        <Input value="2" type="text" placeholder="请输入" style="width: 100px;" />成长值</span>
                </div>
            </div>

            <div class="content-item">
                <div class="title">成长值生效设置</div>
                <div class="main">
                    <RadioGroup v-model="effect" vertical>
                        <Radio label="one">
                            <span>付款成功后立即生效</span>
                        </Radio>
                        <Radio label="two">
                            <span>消费、核销成功后立即生效</span>
                        </Radio>
                        <Radio label="three">
                            <span>消费、核销成功后 <Input value="24" disabled type="text" placeholder="请输入" style="width: 100px;" /> 小时后生效</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">子母卡成长值归属设置</div>
                <div class="main">
                    <RadioGroup v-model="effect" vertical>
                        <Radio label="one">
                            <span>子卡产生的成长值累加在母卡上</span>
                        </Radio>
                        <Radio label="two">
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
                routerName: 'growthSetting',
                effect: 'one',
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
        }

    }
</style>
