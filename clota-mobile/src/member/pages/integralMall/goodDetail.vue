<!--
    商品详情
    作者：杨泽涛
-->
<template>
    <div class="good-detail">
        <div class="img-board">
            <div class="zoom-img" :style="{backgroundImage:'url('+detail.pics+')'}"></div>
        </div>

        <div class="info-board">
            <p class="good-name">{{detail.name | contentFilter}}</p>
            <span class="price">{{$t('marketPrice')}}: {{detail.marketPrice | moneyFilter}}</span>
            <p class="score">{{detail.requiredCredits | contentFilter}}<span> {{$t('score')}}</span></p>
        </div>

        <div class="good-more-info">
            <div class="tab">
                <div class="tab-label" @click="tabClick(1)"><p>{{$t('goodInfo')}}</p></div>
                <!--<div class="tab-label" @click="tabClick(2)"><p>{{$t('specificationParameter')}}</p></div>-->
            </div>
            <div class="tab-pane" v-if='tabIndex === 1'>
                <div class="decs-item">
                    <div class="desc-title">{{$t('goodDesc')}} : </div>
                    <div class="desc-content">{{detail.goodsDesc}}</div>
                </div>
            </div>
            <!--<div class="tab-pane" v-else-if="tabIndex === 2"></div>-->
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
                //tab索引
                tabIndex : 1
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
                    })
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
             * tab栏切换
             * @param index
             */
            tabClick (index) {
                this.tabIndex = index;
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
            })
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
                height: 44px;
                background-color: $color_fff;

                .tab-label {
                    position: relative;
                    width: 50%;
                    flex: 1 0;
                    text-align: center;
                    color: #666;
                    p {
                        position: relative;
                        display: inline-block;
                        width: 20%;
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
                    display: flex;
                    margin-bottom: 12.5px;

                    .desc-title {
                        flex: 1 0;
                        flex-basis: 20%;
                    }

                    .desc-content {
                        flex: 1 0;
                        flex-basis: 80%;
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
