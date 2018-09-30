<template>
    <div class="order-info">
        <h3>{{$t('goodsSubTable')}}</h3><!--产品子表-->
        <Row :gutter="16" v-for="(pItem,index) in infoData" :key="index">
            <Col span="8">
            <ul>
                <li><!--产品ID-->
                    <span class="field-name">{{$t('productId')}}：</span>{{pItem.itemId | contentFilter}}
                </li>
                <li><!--产品编号-->
                    <span class="field-name">{{$t('productNum')}}：</span>{{pItem.itemCode | contentFilter}}
                </li>
                <li><!--商品名称-->
                    <span class="field-name">{{$t('goodsName')}}：</span>{{pItem.itemName | contentFilter}}
                </li>
                <li><!--销售数量-->
                    <span class="field-name">{{$t('salesQty')}}：</span>{{pItem.amount | contentFilter}}
                </li>
                <li><!--原单号-->
                    <span class="field-name">{{$t('originOrderNo')}}：</span>{{pItem.originOrderNo | contentFilter}}
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li><!--产品类别-->
                    <span class="field-name">{{$t('productType')}}：</span>{{pItem.typeName | contentFilter}}
                </li>
                <li><!--规格单位-->
                    <span class="field-name">{{$t('specUnit')}}：</span>{{pItem.unit | contentFilter}}
                </li>
                <li><!--售价-->
                    <span class="field-name">{{$t('salesPrice')}}：</span>{{pItem.price | contentFilter}}
                </li>
                <li><!--会员折扣价-->
                    <span class="field-name">{{$t('memberDiscount')}}：</span>{{pItem.discountPrice | contentFilter}}
                </li>
                <li><!--产品有效期-->
                    <span class="field-name">{{$t('expirationDate')}}：</span>
                    {{new Date(pItem.itemValidFrom).format('yyyy.MM.dd hh:mm:ss')}}--{{new Date(pItem.itemValidTo).format('yyyy.MM.dd hh:mm:ss')}}
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li><!--折扣率-->
                    <span class="field-name">{{$t('discountRate')}}：</span>{{pItem.discountRate | contentFilter}}
                </li>
                <li><!--交易号-->
                    <span class="field-name">{{$t('tradeNo')}}：</span>{{pItem.tradeNo | contentFilter}}
                </li>
                <li><!--会员交易号-->
                    <span class="field-name">{{$t('memberTradeNum')}}：</span>{{pItem.orderNo | contentFilter}}
                </li>
                <li><!--销售顺序号-->
                    <span class="field-name">{{$t('salesSerialNum')}}：</span>{{pItem.saleNum | contentFilter}}
                </li>
            </ul>
            </Col>
        </Row>
    </div>
</template>

<script>

    export default {
        props: {
            infoData: {
                type: Array,
                default: []
            }
        },
        data() {
            return {}
        },
        methods: {}
    }
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
