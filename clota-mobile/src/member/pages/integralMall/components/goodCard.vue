<!--
    商品卡片
    作者：杨泽涛
-->
<template>
    <div class="good-card" @click="toDetail">
        <div class="img-wrapper" v-if="info.goodsType === 'ierp'">
            <div :style="{backgroundImage:'url('+info.pics+')'}"></div>
        </div>
        <div class="coupon-wrap"
             v-else-if="info.goodsType === 'coupon'"
             :class="{ 'cash' : info.couponType === 'cash_coupon','discount' : info.couponType === 'discount_coupon','exchange' : info.couponType === 'exchange_coupon' }">
            <!--代金券-->
            <template v-if="info.couponType === 'cash_coupon'">
                <div class="face-value">{{$t('couponValue',{ num : info.nominalValue })}}</div>
                <div class="use-condition">{{$t('cashUseItem',{ num : info.conditionLowerLimtation })}}</div>
            </template>
            <!--折扣券-->
            <template v-else-if="info.couponType === 'discount_coupon'">
                <div class="face-value">{{$t('discountNum',{ num : discountNum })}}</div>
            </template>
            <!--兑换券-->
            <template v-else-if="info.couponType === 'exchange_coupon'">
                <div class="face-value">{{$t('exchangeTxt')}}</div>
            </template>
        </div>

        <div class="content-wrapper">
            <p class="good-name">{{info.name | contentFilter}}</p>
            <span class="price">{{$t('marketPrice')}} : {{info.marketPrice | moneyFilter | contentFilter}}</span>
            <p class="score">{{info.requiredCredits | contentFilter}}<span>{{$t('score')}}</span></p>
        </div>
    </div>
</template>

<script>

    export default {
        props : {
          info : {
              type : Object,
              default () {
                  return {};
              }
          }
        },
        components : {},
        data () {
            return {};
        },
        methods : {
            /**
             * 前往商品详情页面
             */
            toDetail () {
                this.$router.push({
                    name : 'goodDetail',
                    params : {
                        goodsId : this.info.id
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .good-card {
        height: 252.5px;
        width: 48%;
        border-radius: 5px;
        margin-bottom: 12px;
        background: #fff;
        &:nth-child(even) {
            margin-left: 10px;
        }

        .coupon-wrap{
            height: 166px;
            width: 100%;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            position: relative;
            @include block_outline(100%,166px);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            float: left;
            overflow: hidden;
            text-align: center;

            &.cash{
                background: linear-gradient(to bottom,#ee6723, #eb8f52);
            }

            &.discount{
                background: linear-gradient(to bottom,#6c70cc,#9dc6ed);
            }

            &.exchange{
                background: linear-gradient(to bottom,#478aee,#7ac6ed);
            }

            .face-value{
                height: 28px;
                line-height: 28px;
                color: #ffffff;
                font-size: $font_size_20px;
            }
            .use-condition{
                height: 14px;
                line-height: 14px;
                color: #ffffff;
                font-size: $font_size_10px;
            }
        }

        .img-wrapper {
            height: 166px;
            width: 100%;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;

            div {
                width:100%;
                height:0;
                padding-bottom: 100%;
                overflow:hidden;
                background-position: center center;
                background-repeat: no-repeat;
                background-size:cover;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
            }
        }

        .content-wrapper {
            height: 86.5px;
            width: 100%;
            padding: 12px 10px;

            .good-name {
                width: 100%;
                font-size: 14px;
                color: #333;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .price {
                font-size: 12px;
                color: #999;
            }

            .score {
                font-size: 17px;
                color: #E73357;

                span {
                    font-size: 12px;
                }
            }
        }
    }
</style>
