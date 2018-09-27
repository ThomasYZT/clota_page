<!--订单详情-->

<template>
    <div class="order-detail">
        <div class="trade-info">
            <div class="title">{{$t('tradeInfo')}}</div>
            <ul class="info-detail detail-padding">
                <li class="field">
                    <span class="key">{{$t('orderId')}}：</span>
                    <span class="value">{{orderDetail.orderNo | contentFilter}}</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('tradeDate')}}：</span>
                    <span class="value">{{orderDetail.createdTime | contentFilter}}</span>
                </li>
            </ul>
        </div>
        <div class="product-info" v-if="productInfo.length > 0">
            <div class="title">{{$t('productInfo')}}</div>
            <div class="detail"
                 v-for="item in productInfo"
                 :key="item.id">
                <div class="product-name">{{item.itemName | contentFilter}}</div>
                <ul class="info-detail">
                    <li class="field">
                        <span class="key">{{$t('num')}}：</span>
                        <span class="value">{{item.amount | contentFilter}}{{item.unit}}</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('unitPrice')}}：</span>
                        <span class="value">{{item.price | moneyFilter(2,'￥') | contentFilter}}</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('totalPrice')}}：</span>
                        <span class="value">{{item.price * item.amount | moneyFilter(2,'￥') | contentFilter }}</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('actualPay')}}：</span>
                        <span class="value">{{item.discountPrice | moneyFilter(2,'￥') | contentFilter}}</span>
                    </li>
                    <li class="field">
                        <span class="key">{{$t('validateTime')}}：</span>
                        <span class="value">{{item.itemValidTo | contentFilter }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!--无数据显示-->
        <no-data class="page-no-data" v-else>
        </no-data>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import noData from '@/components/noData/index.vue';
    export default {
        components : {
            noData
        },
        mixins : [lifeCycleMixins],
        data() {
            return {
                //订单id
                orderId : '',
                //订单编号
                orderNo : '',
                //订单详情
                orderDetail : {},
                //购买产品信息
                productInfo : []
            }
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && 'orderId' in  params && 'orderNo' in  params){
                    this.orderId = params.orderId;
                    this.orderNo = params.orderNo;
                    this.queryOrderDetail();
                }else{
                    this.$router.push({
                        name: 'order'
                    });
                }
            },
            /**
             * 查询订单详情
             */
            queryOrderDetail () {
                ajax.post('queryOrderDetail',{
                    orderId : this.orderId,
                    orderNo : this.orderNo,
                }).then(res => {
                    if(res.success){
                        this.orderDetail =  res.data ? res.data.memberOrderModel : {};
                        this.productInfo = res.data ? res.data.itemModels : [];
                    }else{
                        this.orderDetail = {};
                        this.productInfo = [];
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-detail{
        @include block_outline();
        background: rgba(242,243,244,1);
        overflow: auto;

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

        .page-no-data{
            @include block_outline($height : unquote('calc(100% - 122px)'));
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
