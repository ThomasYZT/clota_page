<template>
    <div class="order-info">
        <h3>{{$t('paySubTable')}}</h3><!--支付方式子表-->
        <Row :gutter="16" v-for="(pItem,index) in infoData" :key="index">
            <Col span="8">
            <ul>
                <li><!--交易流水号-->
                    <span class="field-name">{{$t('transactionSN')}}：</span>{{pItem.id | contentFilter}}
                </li>
                <li><!--交易方式顺序号-->
                    <span class="field-name">{{$t('tradeSerialNum')}}：</span>{{pItem.tradeSort | contentFilter}}
                </li>
                <li><!--交易方式编号-->
                    <span class="field-name">{{$t('tradeTypeNum')}}：</span>{{pItem.tradeType | contentFilter}}
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li><!--支付金额-->
                    <span class="field-name">{{$t('payFund')}}：</span>{{pItem.amount | contentFilter}}
                </li>
                <li><!--支付方式名称-->
                    <span class="field-name">{{$t('payTypeName')}}：</span>{{pItem.tradeTypeName | contentFilter}}
                </li>
                <li><!--是否撤销-->
                    <span class="field-name">{{$t('isRevoke')}}：</span>{{pItem.status.includes('cancel') ? $t('yes') : $t('no')}}
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li><!--支付流水号-->
                    <span class="field-name">{{$t('paymentSN')}}：</span>{{pItem.tradeNo | contentFilter}}
                </li>
                <li><!--会员卡号-->
                    <span class="field-name">{{$t('cardNo')}}：</span>{{pItem.cardCode | contentFilter}}
                </li>
                <li><!--支付时间-->
                    <span class="field-name">{{$t('paymentTime')}}：</span>{{pItem.createdTime | contentFilter}}
                </li>
            </ul>
            </Col>
        </Row>
    </div>
</template>

<script>

    export default {
        props : {
            infoData : {
                type : Array,
                default : []
            }
        },
        data () {
            return {
            };
        },
        methods : {}
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
