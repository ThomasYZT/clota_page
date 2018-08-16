<template>
    <!--会员管理--积分消费管理-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="content-item">
                <div class="title">会员积分交易抵扣规则设置</div>
                <div class="main">
                    <div><i-switch v-model="openInteg"></i-switch><span class="text">允许积分交易时抵现使用</span></div>
                    <div>
                        <Checkbox v-model="openInteg">交易时，积分可抵扣订单金额，每</Checkbox>
                        <Input value="2" type="text" placeholder="请输入" style="width: 100px;" />
                        <span>积分抵扣</span>
                        <Input value="2" type="text" placeholder="请输入" style="width: 100px;" />
                        <span>元，抵扣比例最多是此订单的</span>
                        <Input value="2" type="text" placeholder="请输入" style="width: 100px;" />%
                    </div>
                    <div>
                        <Checkbox v-model="openInteg">消费时可和优惠券同时使用</Checkbox>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">是否允许积分兑换成为储值账户金额</div>
                <div class="main">
                    <div><i-switch v-model="openInteg"></i-switch><span class="text">允许积分兑换储值账户金额</span></div>
                    <div>
                        请设置兑换比例：
                         <Input value="2" type="text" placeholder="请输入" style="width: 100px;" />
                        积分<Input value="2" type="text" placeholder="请输入" style="width: 100px;" />
                        元
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">退款时积分退回设置</div>
                <div class="main">
                    <i-switch v-model="openInteg"></i-switch><span class="text">当用户退款时积分同步扣除，如账户剩余积分不足以扣除，用户系统发出提示</span>
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
                routerName: 'consumeSetting',
                openInteg:true,
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

