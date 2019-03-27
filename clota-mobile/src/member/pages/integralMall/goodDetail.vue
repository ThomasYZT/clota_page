<!--
    商品详情
    作者：杨泽涛
-->
<template>
    <div class="good-detail">
        <div class="img-board">
            <div v-if="detail.goodsType === 'ierp'" class="zoom-img" :style="{backgroundImage:'url('+detail.pics+')'}"></div>
            <div class="coupon-info" v-else-if="detail.goodsType === 'coupon'"
                 :class="{ 'cash' : detail.couponType === 'cash_coupon','discount' : detail.couponType === 'discount_coupon','exchange' : detail.couponType === 'exchange_coupon' }">
                <!--代金券-->
                <template v-if="detail.couponType === 'cash_coupon'">
                    <div class="face-value">{{$t('couponValue',{ num : detail.nominalValue })}}</div>
                    <div class="use-condition">{{$t('cashUseItem',{ num : detail.conditionLowerLimtation })}}</div>
                </template>
                <!--折扣券-->
                <template v-else-if="detail.couponType === 'discount_coupon'">
                    <div class="face-value">{{$t('discountNum',{ num : discountNum })}}</div>
                </template>
                <!--兑换券-->
                <template v-else-if="detail.couponType === 'exchange_coupon'">
                    <div class="face-value">{{$t('exchangeTxt')}}</div>
                </template>
            </div>
        </div>

        <div class="info-board">
            <p class="good-name">{{detail.name | contentFilter}}</p>
            <span class="price">{{$t('marketPrice')}}: {{detail.marketPrice | moneyFilter}}</span>
            <p class="score">{{detail.requiredCredits | contentFilter}}<span> {{$t('score')}}</span></p>
        </div>

        <div class="good-more-info">
            <div class="tab">
                <div class="tab-label" ><p>{{$t('goodInfo')}}</p></div>
            </div>
            <!--商品-->
            <div class="tab-pane" v-if="detail.goodsType === 'ierp'">
                <div class="decs-item">
                    <div class="desc-title">{{$t('goodDesc')}} : </div>
                    <div class="desc-content">{{detail.goodsDesc}}</div>
                </div>
            </div>
            <!--卡券-->
            <div class="tab-pane" v-else-if="detail.goodsType === 'coupon'">
                <div class="decs-item">
                    <div class="coupon-title">{{$t('explainWithColon')}}</div>
                    <ul class="scope-wrap">
                        <li class="usage-item"> <span class="key">{{$t('useRulesOne')}}</span><span class="value">{{detail.conditionChannelNames | contentFilter}}</span></li>
                        <li class="usage-item"> <span class="key">{{$t('useRuleTwo')}}</span><span class="value">{{detail.conditionOrgNames | contentFilter}}</span></li>
                        <li class="usage-item" v-if="detail.couponType === 'exchange_coupon'">
                            <span class="key">{{$t('canUseGoods')}}</span><span class="value">{{detail.conditionGoodNames | contentFilter}}</span>
                        </li>
                        <li class="usage-item" v-else> <span class="key">{{$t('useRuleThree')}}</span><span class="value">{{detail.conditionProductNames | contentFilter}}</span></li>
                        <li class="usage-item"> <span class="key">{{$t('couponValidateDate')}}</span><span class="value">{{detail.effectiveTime | contentFilter}} - {{detail.expireTime | contentFilter}}</span></li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="button" :class="{ disabled : cardInfo.status === 'frozen' }" @click="toExchangeGood">{{$t('immediatelyChange')}}</div>
    </div>
</template>

<script>
    import ajax from '@/member/api/index.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins';
    import { mapGetters } from 'vuex';
    export default {
        mixins : [lifeCycleMixins],
        components : {},
        data () {
            return {
                //商品详情数据--接口获取
                detail : {},
            };
        },
        methods : {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && params.goodsId) {
                    //根据商品id查询商品详情
                    this.getData(params.goodsId);
                } else {
                    this.$router.push({
                        name : 'integralMall'
                    });
                }
            },
            /**
             * 获取接口数据
             */
            getData (id) {
                ajax.post('queryGoodsInfo', {
                    goodsId : id
                }).then(res => {
                    if (res.success) {
                        this.detail = res.data ? res.data : [];
                    } else {
                        this.$vux.toast.text(this.$t(res.code));
                    }
                })
            },
            /**
             * 前往兑换商品界面
             */
            toExchangeGood () {
                if (this.cardInfo.status === 'frozen') return;
                this.$router.push({
                    name : 'exchangeGood',
                    params : {
                        detail : this.detail
                    }
                })
            }
        },
        computed : {
            ...mapGetters({
                cardInfo : 'cardInfo'
            }),
            //折扣率
            discountNum () {
                if (this.detail) {
                    return Number.parseInt(this.detail.nominalValue * 10,10);
                } else {
                    return '-';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .good-detail {
        height: 100%;
        overflow: auto;
        background-color: #F4F6F9;

        .img-board {
            position: relative;
            width: 100%;
            height: 340px;
            z-index: 0;

            .zoom-img {
                position: relative;
                top: 0;
                width:100%;
                height:0;
                padding-bottom: 100%;
                overflow:hidden;
                background-position: center center;
                background-repeat: no-repeat;
                background-size:cover;
            }

            .coupon-info{
                width: 100%;
                height: 100%;
                position: relative;
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
                    height: 48px;
                    line-height: 48px;
                    color: #ffffff;
                    font-size: 30px;
                }
                .use-condition{
                    height: 24px;
                    line-height: 24px;
                    color: #ffffff;
                    font-size: $font_size_14px;
                }
            }
        }

        .info-board {
            position: relative;
            padding: 16px 19px;
            width: 100%;
            height: 105.5px;
            background-color: $color_fff;
            z-index: 10;

            .good-name {
                width: 100%;
                font-size: 16px;
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
                font-size: 20px;
                color: #E73357;

                span {
                    font-size: 12px;
                }
            }
        }

        .good-more-info {
            margin-top: 8px;

            .tab {
                display: flex;
                justify-content: center;
                height: 44px;
                background-color: $color_fff;

                .tab-label {
                    display: inline-block;
                    position: relative;
                    color: #666;
                    white-space: nowrap;
                    p {
                        position: relative;
                        display: inline-block;
                        line-height: 44px;

                        &:after {
                            content: ' ';
                            height: 1px;
                            width: 20px;
                            position: absolute;
                            left: -30px;
                            top: 50%;
                            margin-top: -2px;
                            border-bottom: 1px solid #C5C5C5;
                        }
                        &:before {
                            content: ' ';
                            height: 1px;
                            width: 20px;
                            position: absolute;
                            right: -30px;
                            top: 50%;
                            margin-top: -2px;
                            border-bottom: 1px solid #C5C5C5;
                        }
                    }
                }
            }

            .tab-pane {
                width: 100%;
                padding: 24px;

                .decs-item {
                    width: 100%;
                    margin-bottom: 12.5px;

                    .desc-content {
                        margin-top: 5px;
                        font-size: 12px;
                        line-height: 16px;
                    }

                    .desc-title,
                    .coupon-title{
                        line-height: 15px;
                        font-size: 12px;
                    }

                    .scope-wrap{
                        font-size: 12px;
                        margin-top: 5px;
                        color: #666;
                        line-height: 13px;

                        .usage-item{
                            line-height: 16px;
                        }
                    }
                }
            }

            .tab-label.active {
                color: #E73357;
            }
        }

        .button {
            position: sticky;
            bottom: 0;
            width: 100%;
            height: 49px;
            line-height: 49px;
            color: $color_fff;
            font-size: 16px;
            text-align: center;
            background: linear-gradient(to left,#FE4021, #FB4A6E);

            &.disabled{
                background: $color_gray;
            }
        }
    }
</style>
