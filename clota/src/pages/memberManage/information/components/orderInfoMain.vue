<template>
    <div class="order-info">
        <h3>{{$t('mainTable')}}</h3><!--主表-->
        <Row :gutter="16">
            <Col span="8">
            <ul>
                <li><!--交易号-->
                    <span class="field-name">{{$t('tradeNo')}}：</span>{{infoData.outOrderNo | contentFilter}}
                </li>
                <li v-if="infoData.score !== null"><!--本单预计交易积分-->
                    <span class="field-name">{{$t('expectTradeIntegral')}}：</span>{{infoData.score | contentFilter}}
                </li>
                <li><!--景区-->
                    <span class="field-name">{{$t('scenic')}}：</span>{{infoData.outOrgName | contentFilter}}
                </li>
                <li><!--会员方交易流水号-->
                    <span class="field-name">{{$t('memberTradeNo')}}：</span>{{infoData.orderNo | contentFilter}}
                </li>
                <li><!--销售员-->
                    <span class="field-name">{{$t('salesperson')}}：</span>{{infoData.saler | contentFilter}}
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li><!--订单状态-->
                    <span class="field-name">{{$t('orderStatus')}}：</span>{{ $t(orderStatus(infoData.status)) }}
                </li>
                <li v-if="infoData.amount !== null"><!--整单交易金额-->
                    <span class="field-name">{{$t('tradeAmount')}}：</span>{{infoData.amount | contentFilter}}
                </li>
                <li><!--店铺-->
                    <span class="field-name">{{$t('shop')}}：</span>{{infoData.outDeptName | contentFilter}}
                </li>
                <li><!--会员系统交易时间-->
                    <span class="field-name">{{$t('vipsTradeTime')}}：</span>{{infoData.createdTime | contentFilter}}
                </li>
                <li><!--收银员-->
                    <span class="field-name">{{$t('receiver')}}：</span>{{infoData.cashier | contentFilter}}
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li><!--来源业态-->
                    <span class="field-name">{{$t('sourceState')}}：</span>{{ $t(transferProductType(infoData.productType)) }}
                </li>
                <li><!--会员卡号-->
                    <span class="field-name">{{$t('cardNo')}}：</span>{{infoData.cardNo | contentFilter}}
                </li>
                <li><!--款台-->
                    <span class="field-name">{{$t('cashDesk')}}：</span>{{infoData.outCashName | contentFilter}}
                </li>
                <li><!--交易时间-->
                    <span class="field-name">{{$t('transactionTime')}}：</span>{{infoData.tradeTime | contentFilter}}
                </li>
            </ul>
            </Col>
        </Row>
    </div>
</template>

<script>
    import { orderStatus } from '../infoListConfig';

    export default {
        props : {
            infoData : {
                type : Object,
                default () {
                    return  {};
                }
            }
        },
        data () {
            return {};
        },
        methods : {
            // 订单状态显示
            orderStatus : orderStatus,

            /**
             * 来源业态 - code转换
             * @param type - 来源业态类型code
             * @returns {string}
             */
            transferProductType (type) {
                let statusName = '-';
                switch (type) {
                    case 'ticket' :
                        statusName = 'ticket'; // 票
                        break;
                    case 'catering' :
                        statusName = 'repast'; // 餐饮
                        break;
                    case 'commodity' :
                        statusName = 'goods'; // 商品
                        break;
                    case 'hotel' :
                        statusName = 'hotel'; // 酒店
                        break;
                }
                return statusName;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .order-info {
        margin: 25px 30px;

        > h3 {
            font-family: PingFangSC-Medium;
            margin-bottom: 15px;
            font-size: 20px;
            color: rgba(0, 0, 0, 0.85);
        }

        ul li {
            margin-bottom: 8px;
            color: $color_666;

            .field-name {
                color: $color_333;
            }
        }
    }
</style>
