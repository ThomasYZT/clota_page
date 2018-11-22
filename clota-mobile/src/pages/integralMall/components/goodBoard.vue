<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="good-board" :class="{isGet : info.drawStatus === 'true'}">
        <div class="left-board">
            <p class="good-name">{{info.goodsName}}</p>
            <template v-if="info.drawStatus === 'true'">
                <span class="price">{{$t('exchangeScore')}}: {{info.changeCredit | contentFilter}}</span>
                <p class="code">{{$t('exchangeCode')}}: {{info.exchangeSecurities | contentFilter}}</p>
                <p class="time">{{$t('exchangeTime')}}: {{info.createdTime | contentFilter}}</p>
                <p class="time">{{$t('getTime')}}: {{info.drawTime | contentFilter}}</p>
            </template>
            <template v-else>
                <span class="price">{{$t('totalPrice')}}: {{info.marketPrice | moneyFilter | contentFilter}}</span>
                <p class="code">{{$t('exchangeCode')}}: {{info.exchangeSecurities | contentFilter}}</p>
            </template>
        </div>
        <div class="right-board">
            <span v-if="info.drawStatus === 'true'" class="received">{{$t('received')}}</span>
            <span v-else class="unreceived">{{$t('unreceived')}}</span>
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
        components : {

        },
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .isGet {
        height: 120px !important;
    }
    .good-board {
        display: flex;
        width: 100%;
        height: 88px;
        margin-bottom: 8.5px;
        padding: 14px;
        background-color: $color_fff;

        .left-board {
            flex: 1 0;
            flex-basis: 80%;

            .good-name {
                width: 100%;
                font-size: 14px;
                color: #4A4A4A;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .price {
                font-size: 12px;
                color: #8E9091;
            }

            .code {
                font-size: 12px;
                color: #8E9091;
            }

            .time {
                font-size: 12px;
                color: #8E9091;
            }
        }

        .right-board {
            flex: 1 0;
            flex-basis: 20%;
            text-align: right;

            span.unreceived {
                color: #F7981C;
                font-size: 12px;
            }

            span.received {
                color: #909399;
                font-size: 12px;
            }
        }

    }
</style>
