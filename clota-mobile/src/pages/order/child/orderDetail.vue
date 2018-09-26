<!--订单详情-->

<template>
    <div class="order-detail">
        <div class="trade-info">
            <div class="title">{{$t('tradeInfo')}}</div>
            <ul class="info-detail detail-padding">
                <li class="field">
                    <span class="key">{{$t('orderId')}}：</span>
                    <span class="value">0187978739892</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('tradeDate')}}：</span>
                    <span class="value">2018-03-03 08:00:11</span>
                </li>
            </ul>
        </div>
        <div class="product-info">
            <div class="title">{{$t('productInfo')}}</div>
            <div class="detail">
                <div class="product-name">北京欢乐谷七夕套餐，买一赠一</div>
                <ul class="info-detail">
                    <li class="field">
                        <span class="key">{{$t('num')}}：</span>
                        <span class="value">0187978739892</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('unitPrice')}}：</span>
                        <span class="value">¥293.33</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('totalPrice')}}：</span>
                        <span class="value">¥293.33</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('actualPay')}}：</span>
                        <span class="value">¥293.33</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('validateTime')}}：</span>
                        <span class="value">2018-03-03 08:00:11</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('tourist')}}：</span>
                        <span class="value">王嘉尔</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('idCard')}}：</span>
                        <span class="value">430392029931930088</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('phone')}}：</span>
                        <span class="value">2018-03-03 08:00:11</span>
                    </li>
                </ul>
            </div>
            <div class="detail">
                <div class="product-name">北京欢乐谷七夕套餐，买一赠一</div>
                <ul class="info-detail">
                    <li class="field">
                        <span class="key">{{$t('num')}}：</span>
                        <span class="value">0187978739892</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('unitPrice')}}：</span>
                        <span class="value">¥293.33</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('totalPrice')}}：</span>
                        <span class="value">¥293.33</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('actualPay')}}：</span>
                        <span class="value">¥293.33</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('validateTime')}}：</span>
                        <span class="value">2018-03-03 08:00:11</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('tourist')}}：</span>
                        <span class="value">王嘉尔</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('idCard')}}：</span>
                        <span class="value">430392029931930088</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('phone')}}：</span>
                        <span class="value">2018-03-03 08:00:11</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-detail{
        @include block_outline();
        background: rgba(242,243,244,1);

        .trade-info{
            @include block_outline($height : 122px);
            background: $color_fff;
        }

        .info-detail{

            &.detail-padding{
                padding: 9.5px 19px;
            }

            .field{
                @include block_outline($height : 26px);
                padding: 4.5px 0;
                line-height: 17px;
                font-size: $font_size_12px;

                .key{
                    color: #8E9091;
                }

                .value{
                    color: #353B48;
                }
            }
        }

        .title{
            position: relative;
            @include block_outline($height : 40px);
            border-bottom: 0.5px solid #e8e8e8;
            font-size: $font_size_15px;
            color: #353B48;
            line-height: 40px;
            padding-left: 33px;

            &:after{
                content : '';
                @include block_outline(4px,15px);
                background: #0073EB;
                @include absolute_pos(absolute,$left : 20px,$top : 12px);
            }
        }

        .product-info{
            background: $color_fff;
            margin-top: 8px;

            .detail{
                position: relative;
                padding: 7.5px 19px;

                .product-name{
                    font-size: $font_size_14px;
                    color: #4A4A4A;
                    @include block_outline($height : 33px);
                    line-height: 20px;
                    padding: 7.5px 0;
                }

                &:not(:nth-last-of-type(1)):after{
                    @include block_outline(unquote('calc(100% - 20px)'),0.5px);
                    content: '';
                    border-bottom: 0.5px dashed #e8e8e8;
                    @include absolute_pos(absolute,$bottom : 0);
                }
            }
        }
    }
</style>
