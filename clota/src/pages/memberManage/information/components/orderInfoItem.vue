<template>
    <div class="order-info">
        <h3>{{$t('产品子表')}}</h3>
        <Row :gutter="16" v-for="(pItem,index) in infoData" :key="index">
            <Col span="8">
            <ul>
                <li>
                    <span class="field-name">{{$t('产品ID')}}：</span>{{pItem.itemId | contentFilter}}
                </li>
                <li>
                    <span class="field-name">{{$t('产品编号')}}：</span>{{pItem.itemCode}}
                </li>
                <li>
                    <span class="field-name">{{$t('商品名称')}}：</span>{{pItem.itemName}}
                </li>
                <li>
                    <span class="field-name">{{$t('销售数量')}}：</span>{{pItem.amount}}
                </li>
                <li>
                    <!--<span class="field-name">{{$t('原单号')}}：</span>{{infoData.saler}}-->
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li>
                    <!--<span class="field-name">{{$t('产品类别')}}：</span>{{pItem.status | orderStatus}}-->
                </li>
                <li>
                    <span class="field-name">{{$t('规格单位')}}：</span>{{pItem.unit}}
                </li>
                <li>
                    <span class="field-name">{{$t('售价')}}：</span>{{pItem.price}}
                </li>
                <li>
                    <span class="field-name">{{$t('会员折扣价')}}：</span>{{pItem.discountPrice}}
                </li>
                <li>
                    <span class="field-name">{{$t('产品有效期')}}：</span>
                    {{new Date(pItem.itemValidFrom).format('yyyy.MM.dd hh:mm:ss')}}--{{new Date(pItem.itemValidTo).format('yyyy.MM.dd hh:mm:ss')}}
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li>
                    <span class="field-name">{{$t('折扣率')}}：</span>{{pItem.discountRate}}
                </li>
                <li>
                    <span class="field-name">{{$t('交易号')}}：</span>{{pItem.tradeNo}}
                </li>
                <li>
                    <span class="field-name">{{$t('会员交易号')}}：</span>{{pItem.orderId}}
                </li>
                <li>
                    <span class="field-name">{{$t('销售顺序号')}}：</span>{{pItem.saleNum}}
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
