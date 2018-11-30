<!--订单详情-->

<template>
    <div class="order-detail">
        <div class="content">
            <div class="order-info">
                <div class="order-base-info">
                    <span class="order-name">珠海长隆主题乐园珠海长隆</span>
                    <span class="order-type">成人平日票</span>
                </div>
                <div class="detail-list">
                    <span class="key">{{$t('colonSetting',{ key : $t('订单明细编号') })}}</span>
                    <span class="value">0187978739892</span>
                </div>
                <div class="detail-list">
                    <span class="key">{{$t('colonSetting',{ key : $t('使用日期') })}}</span>
                    <span class="value">2018-03-03</span>
                </div>
            </div>
            <div class="preorder-info">
                <div class="title">预定信息</div>
                <div class="info-list">
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('产品单价') })}}</span>
                        <span class="value">100.00</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('预定数量') })}}</span>
                        <span class="value">2</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('订单金额') })}}</span>
                        <span class="value">{{290 | moneyFilter(2,'￥') | contentFilter}}</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('游客姓名') })}}</span>
                        <span class="value">王</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('下单日期') })}}</span>
                        <span class="value">2018-06-15 19:22:10</span>
                    </div>
                </div>
            </div>
            <!--核销信息-->
            <div class="preorder-info">
                <div class="title">核销信息</div>
                <div class="info-list">
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('已核销数量') })}}</span>
                        <span class="value">2</span>
                    </div>
                </div>
            </div>
            <!--佣金-->
            <div class="preorder-info">
                <div class="title">佣金</div>
                <div class="info-list">
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('已核销数量') })}}</span>
                        <span class="value">2</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('佣金总额') })}}</span>
                        <span class="value">{{290 | moneyFilter(2,'￥') | contentFilter}}</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('申请提现日期') })}}</span>
                        <span class="value">2018.05.20 19:00:00</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('景区审核日期') })}}</span>
                        <span class="value">2018.05.20 19:00:00</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('到账日期') })}}</span>
                        <span class="value">2018.05.20 19:00:00</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('佣金支付方式') })}}</span>
                        <span class="value">{{'微信支付'}}</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('流水号') })}}</span>
                        <span class="value">{{'微信支付20184783647836433'}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="deposit">
            <div class="commission">
                {{$t('colonSetting',{ key : $t('可提现佣金') })}}<span class="money">{{15 | moneyFilter(2,'￥') | contentFilter}}</span>
            </div>
            <div class="apply-deposit" :class="{ 'disabled' : true }" @click="deposit">申请提现</div>
        </div>
    </div>
</template>

<script>
	export default {
		data () {
			return {};
		},
		methods : {
            /**
             * 跳转到提现申请结果
             */
            deposit () {
                this.$router.push({
                    name : 'marketingDepositResult',
                    params : {
                        fromRegister : true
                    }
                });
            }
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-detail{
        @include block_outline();
        background: #f2f3f4;

        .content{
            @include block_outline($height : unquote('calc(100% - 44px)'));
            @include padding_place(100%,8px);
            overflow: auto;

            .preorder-info{
                background: $color_fff;
                margin-bottom: 8px;

                &:nth-last-of-type(1){
                    margin-bottom: 0;
                }

                .title{
                    position: relative;
                    @include block_outline($height : 40px);
                    border-bottom: 0.5px solid #E8E8E8;
                    line-height: 40px;
                    padding: 0 30px;
                    @include overflow_tip();

                    &:after{
                        content : '';
                        @include block_outline(4px,15px);
                        background: #0073EB;
                        @include absolute_pos(absolute,$left : 20px,$top : 12px);
                    }
                }

                .info-list{
                    padding: 10px 0;
                }
            }

            .detail-list{
                @include block_outline($height : 26px);
                padding: 4.5px 14px;
                line-height: 17px;
                display: flex;
                font-size: $font_size_12px;

                .key{
                    color: #8E9091;
                }

                .value{
                    @include overflow_tip();
                    flex: 1;
                    color: #353B48;
                }
            }

            .order-info{
                background: $color_fff;
                padding-bottom: 15px;
                margin-bottom: 8px;

                .order-base-info{
                    @include block_outline($height : 38px);
                    display: flex;
                    padding: 12px 14px 6px;

                    .order-name{
                        @include overflow_tip();
                        font-size: $font_size_14px;
                        color: $color_333;
                        flex: 1;
                    }

                    .order-type{
                        color: #F7981C;
                        font-size: $font_size_14px;
                        text-align: right;
                    }
                }
            }
        }

        .deposit{
            @include block_outline($height : 44px);
            background: $color_fff;
            border-top: 0.5px solid #E1E1E1;
            display: flex;
            flex-direction: row;
            line-height: 44px;
            padding-left: 20px;

            .apply-deposit{
                height: 100%;
                padding: 0 20px;
                font-size: $font_size_16px;
                background: #F17E40;
                color: $color_fff;

                &.disabled{
                    background: #E1E1E1;
                }
            }

            .commission{
                flex: 1;
                font-size: $font_size_12px;

                .money{
                    color: #F7981C;
                }
            }
        }
    }
</style>
