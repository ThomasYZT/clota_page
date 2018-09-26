<template>
    <div class="order-info">
        <h3>{{$t('主表')}}</h3>
        <Row :gutter="16">
            <Col span="8">
            <ul>
                <li>
                    <span class="field-name">{{$t('交易号')}}：</span>{{infoData.outOrderNo | contentFilter}}
                </li>
                <li>
                    <span class="field-name">{{$t('本单预计交易积分')}}：</span>{{infoData.score}}
                </li>
                <li>
                    <span class="field-name">{{$t('景区')}}：</span>{{infoData.outOrgName}}
                </li>
                <li>
                    <span class="field-name">{{$t('会员方交易流水号')}}：</span>{{infoData.orderNo}}
                </li>
                <li>
                    <span class="field-name">{{$t('销售员')}}：</span>{{infoData.saler}}
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li>
                    <span class="field-name">{{$t('订单状态')}}：</span>{{ $t(orderStatus(infoData.status)) }}
                </li>
                <li>
                    <span class="field-name">{{$t('整单交易金额')}}：</span>{{infoData.amount}}
                </li>
                <li>
                    <span class="field-name">{{$t('店铺')}}：</span>{{infoData.outDeptName}}
                </li>
                <li>
                    <span class="field-name">{{$t('会员系统交易时间')}}：</span>{{infoData.createdTime}}
                </li>
                <li>
                    <span class="field-name">{{$t('收银员')}}：</span>{{infoData.cashier}}
                </li>
            </ul>
            </Col>
            <Col span="8">
            <ul>
                <li>
                    <span class="field-name">{{$t('来源业态')}}：</span>{{ $t(transferProductType(infoData.productType)) }}
                </li>
                <li>
                    <span class="field-name">{{$t('会员卡号')}}：</span>{{infoData.cardNo}}
                </li>
                <li>
                    <span class="field-name">{{$t('款台')}}：</span>{{infoData.outCashName}}
                </li>
                <li>
                    <span class="field-name">{{$t('交易时间')}}：</span>{{infoData.tradeTime | contentFilter}}
                </li>
            </ul>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {orderStatus} from '../infoListConfig';

    export default {
        props: {
            infoData: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {}
        },
        methods: {
            // 订单状态显示
            orderStatus: orderStatus,

            /**
             * 来源业态 - code转换
             * @param type - 来源业态类型code
             * @returns {string}
             */
            transferProductType(type) {
                let statusName = '-';
                switch (type) {
                    case 'ticket' :
                        statusName = 'ticket';        // 票
                        break;
                    case 'catering' :
                        statusName = 'repast';        // 餐饮
                        break;
                    case 'commodity' :
                        statusName = 'goods';        // 商品
                        break;
                    case 'hotel' :
                        statusName = 'hotel';        // 酒店
                        break;
                }
                return statusName;
            },
        }
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
