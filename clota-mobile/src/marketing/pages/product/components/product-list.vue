<!--产品列表信息-->

<template>
    <div class="product-list-info" >
        <div class="product-title">
            <div class="product-name">{{productInfo.productName | contentFilter}}</div>
            <div class="product-price">{{productInfo.salePrice | moneyFilter(2,'¥') | contentFilter}}</div>
        </div>
        <ul class="label-input">
            <li class="label-list" v-if="cannotReturn">不可退</li>
            <li class="label-list" v-else>可退</li>
            <li class="label-list" v-if="cannotAlter">不可改</li>
            <li class="label-list" v-else>可改</li>
        </ul>
        <div class="ticket-notick" @click="$emit('show-notice',productInfo)">购票须知</div>
        <div class="price-info">
            {{$t('colonSetting',{ key : $t('佣金') })}}{{ productInfo.salary | moneyFilter(2,'¥') | contentFilter }}
        </div>
    </DIV>
</template>

<script>
    export default {
        props : {
            //产品明细
            'product-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {};
        },
        methods : {

        },
        computed : {
            //产品不可退
            cannotReturn () {
                if (this.productInfo && this.productInfo.returnRuleModel) {
                    return this.productInfo.returnRuleModel.type === 'notAllow';
                }
                return false;
            },
            //产品不可改签
            cannotAlter () {
                if (this.productInfo && this.productInfo.alterRuleModel) {
                    return this.productInfo.alterRuleModel.type === 'notAllow';
                }
                return false;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .product-list-info{
        background: $color_fff;
        margin-bottom: 8px;
        padding: 14px 14px 0;

        &:nth-last-of-type(1){
            margin-bottom: 0;
        }

        .product-title{
            @include block_outline($height : 23px);
            line-height: 23px;
            display: flex;
            flex-direction: row;
            font-size: $font_size_16px;

            .product-name{
                color: $color_333;
                flex: 1;
                @include overflow_tip();
            }

            .product-price{
                @include block_outline(80px);
                @include overflow_tip();
                text-align: right;
                color: #F15B40;
            }
        }

        .label-input{
            @include block_outline($height : 29px);
            padding: 2.5px 0;

            .label-list{
                font-size: $font_size_11px;
                display: inline-block;
                border: 1px solid #EB6751;
                padding: 1px 5px;
                margin: 0;
                line-height: 15px;
                border-radius: 4px;
                color: #EB6751;
            }
        }

        .ticket-notick{
            display: inline-block;
            @include block_outline(auto, 26px);
            padding-bottom: 10px;
            font-size: $font_size_12px;
            color: $color_999;
            @include overflow_tip();
        }

        .price-info{
            @include block_outline($height : 35px);
            line-height: 35px;
            font-size: $font_size_14px;
            color: #F7981C;
            border-top: 0.5px solid #E8E8E8;

        }
    }
</style>
