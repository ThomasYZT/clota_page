<template>
    <div class="order-info">
        <h3>{{$t('支付方式子表')}}</h3>
        <Row :gutter="16" v-for="(pItem,index) in infoData" :key="index">
            <Col span="8">
            <ul>
                <li>
                    <!--<span class="field-name">{{$t('交易流水号')}}：</span>{{pItem.itemId | contentFilter}}-->
                </li>
                <li>
                    <span class="field-name">{{$t('交易方式顺序号')}}：</span>{{pItem.tradeSort}}
                </li>
                <li>
                    <span class="field-name">{{$t('交易方式编号')}}：</span>{{pItem.tradeNo}}
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li>
                    <span class="field-name">{{$t('支付金额')}}：</span>{{pItem.amount}}
                </li>
                <li>
                    <span class="field-name">{{$t('支付方式名称')}}：</span>{{pItem.tradeTypeName}}
                </li>
                <li>
                    <!--<span class="field-name">{{$t('是否撤销')}}：</span>{{pItem.status}}-->
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li>
                    <!--<span class="field-name">{{$t('支付流水号')}}：</span>{{pItem.discountRate}}-->
                </li>
                <li>
                    <!--<span class="field-name">{{$t('会员卡号')}}：</span>{{pItem.tradeNo}}-->
                </li>
                <li>
                    <!--<span class="field-name">{{$t('支付时间')}}：</span>{{pItem.saleNum}}-->
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
            return {
            }
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
