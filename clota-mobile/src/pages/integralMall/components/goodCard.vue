<!--
    商品卡片
    作者：杨泽涛
-->
<template>
    <div class="good-card" @click="toDetail">
        <div class="img-wrapper">
            <div :style="{backgroundImage:'url('+info.pics+')'}"></div>
        </div>

        <div class="content-wrapper">
            <p class="good-name">{{info.name | contentFilter}}</p>
            <span class="price">{{$t('marketPrice')}} : {{info.marketPrice | moneyFilter}}</span>
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
                  return {}
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
                })
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
