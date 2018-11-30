<!--订单模板-->

<template>
    <div class="order-item" @click="choseOrderItem">
        <div class="radio-wrap" v-if="showRadio" :class="{ 'choosed' : choosed }">

        </div>
        <div class="content">
            <div class="order-title">
                <div class="order-name">不而退不而退不而退不</div>
                <div class="order-num">{{$t('colonSetting',{ key : $t('数量') })}}{{5}}</div>
            </div>
            <div class="order-detail">
                <div class="time-info">{{$t('colonSetting',{ key : $t('使用日期') })}}{{'2018-06-20'}}</div>
                <div class="commission">{{$t('colonSetting',{ key : $t('佣金') })}}{{5 | moneyFilter | contentFilter}}</div>
            </div>
            <div class="detail-footer">
                <div class="order-date">{{'2018-06-28 18:00:20'}}</div>
                <div class="for-detail">{{$t('查看详情')}}</div>
            </div>
            <div class="wait-audit">
                <span class="text-label">待审</span>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
        props : {
            //是否显示单选框
            'show-radio' : {
                type : Boolean,
                default : false
            },
            //订单详情
            'order-detail' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //订单是否被选择
            choosed : {
                type : Boolean,
                default : false
            }
        },
		data () {
			return {};
		},
		methods : {
            /**
             * 选择订单
             */
            choseOrderItem () {
                if (this.showRadio) {
                    this.$emit('chose-item',this.orderDetail);
                }
            }
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-item{
        position: relative;
        @include block_outline($height : 115px);
        background: $color_fff;
        margin-bottom : 8px;
        padding: 14px 14px 0;
        display: flex;
        flex-direction: row;
        /*float: left;*/

        .radio-wrap{
            @include block_outline(20px);

            &.choosed{
                background: red;
            }
        }

        .content{
            flex: 1;
        }

        .wait-audit{
            @include absolute_pos(absolute,$right : 0,$top : 0);
            @include block_outline(42px,42px);
            color: $color_fff;
            text-align: right;
            border-right: 22px solid #F9AD49;
            border-left: 22px solid transparent;
            border-top: 22px solid #F9AD49;
            border-bottom: 22px solid transparent;

            .text-label{
                @include absolute_pos(absolute,$top : -15px,$left : -26px);
                width: 50px;
                font-size: $font_size_12px;
            }
        }

        .order-title{
            @include block_outline($height : 23px);
            line-height: 23px;
            display: flex;
            flex-direction: row;
            font-size: $font_size_16px;

            .order-name{
                color: $color_333;
                flex: 1;
                @include overflow_tip();
                font-size: $font_size_14px;
            }

            .order-num{
                @include block_outline(80px);
                @include overflow_tip();
                text-align: right;
                color: #4A4A4A;
                font-size: $font_size_12px;
                padding-right: 10px;
            }
        }

        .order-detail{
            @include block_outline($height : 42px);
            padding-top: 9px;

            .time-info{
                width: 200px;
                float: left;
                font-size: $font_size_12px;
                color: #7A8FAC;
            }

            .commission{
                width: calc(100% - 200px);
                float: left;
                text-align: right;
                font-size: $font_size_14px;
                color: #F7981C;
            }
        }

        .detail-footer{
            @include block_outline($height : 35px);
            border-top: 0.5px solid #E8E8E8;
            padding: 7px 0;
            line-height: 21px;

            .order-date{
                width: 50%;
                float: left;
                color: #B3BDC2;
                font-size: $font_size_12px;
            }

            .for-detail{
                display: inline-block;
                float: right;
                height: 21px;
                border: 1px solid #046FDB;
                border-radius: 4px;
                font-size: $font_size_12px;
                color: #046FDB;
                padding: 0 5px;
            }
        }
    }
</style>
