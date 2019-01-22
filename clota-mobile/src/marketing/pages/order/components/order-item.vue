<!--订单模板-->

<template>
    <div class="order-item" @click="choseOrderItem">
        <div class="radio-wrap" v-if="showRadio" :class="{ 'choosed' : choosed }">
            <span class="iconfont icon-checked"
                  v-if="(orderDetail.withdrawStatus === 'reject' || orderDetail.withdrawStatus === 'unaudit') && orderDetail.expectedSalary > 0"></span>
            <span class="iconfont icon-not-allow-select" v-else></span>
        </div>
        <div class="content">
            <div class="order-title">
                <div class="order-name">{{orderDetail.productName | contentFilter}}</div>
                <div class="order-num">{{$t('colonSetting',{ key : $t('数量') })}}{{orderDetail.productNum | contentFilter}}</div>
            </div>
            <div class="order-detail">
                <div class="time-info">{{$t('colonSetting',{ key : $t('使用日期') })}}{{orderDetail.playDate | timeFormat('yyyy-MM-dd') | contentFilter}}</div>
                <div class="commission">{{$t('colonSetting',{ key : $t('佣金') })}}{{orderDetail.expectedSalary | moneyFilter | contentFilter}}</div>
            </div>
            <div class="detail-footer">
                <div class="order-date">{{orderDetail.createdTime | contentFilter}}</div>
                <div class="for-detail" @click="toDetail">{{$t('查看详情')}}</div>
            </div>
            <div class="wait-audit" v-if="orderDetail.withdrawStatus === 'auditing'">
                <span class="text-label">{{$t('审核中')}}</span>
            </div>
            <div class="wait-audit err" v-if="orderDetail.withdrawStatus === 'reject_no_req'">
                <span class="text-label">{{$t('已驳回')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import ajax from '@/marketing/api/index';
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
                //未审核和驳回可以再申请的可以申请提现,已核销的和已退票和退票已核销的总和必须等于预定数量
                if (this.showRadio &&
                    this.orderDetail.expectedSalary > 0 &&
                    (this.orderDetail.verifiedNum + this.orderDetail.refundNum + this.orderDetail.overdueNum === this.orderDetail.productNum) &&
                    (this.orderDetail.withdrawStatus === 'reject' ||
                    this.orderDetail.withdrawStatus === 'unaudit')) {
                    this.checkCanWithdrawApply();
                } else if (!this.showRadio) {
                    this.toDetail();
                }
            },
            /**
             * 跳转到订单详情
             */
            toDetail () {
                this.$router.push({
                    name : 'marketingOrderDetail',
                    params : {
                        orderDtail : this.orderDetail
                    }
                });
            },
            /**
             * 提现申请校验
             */
            checkCanWithdrawApply () {
                ajax.post('market_checkCanWithdrawApply',{
                    orderId : this.orderDetail.orderId,
                    amount : this.orderDetail.expectedSalary
                }).then(res => {
                    if (res.success) {
                        this.$emit('chose-item',this.orderDetail);
                    }
                });
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
        margin-top : 8px;
        padding: 14px 14px 0;
        display: flex;
        flex-direction: row;
        /*float: left;*/
        overflow: hidden;

        .radio-wrap{
            @include block_outline(20px);

            .iconfont{
                font-size: $font_size_16px;
                line-height: 22px;
                border: 0.5px solid #C5C5C5;
                border-radius: 12px;

                .icon-not-allow-select{
                    background: #F1F4FB;
                }
            }

            &.choosed{

                .icon-checked{
                    font-size: $font_size_16px;
                    line-height: 22px;
                    color: $color_blue;
                }
            }

            .icon-checked{
                color: #C5C5C5;
            }
        }

        .content{
            /*display: none;*/
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

            &.err{
                border-right: 22px solid $color_err;
                border-top: 22px solid $color_err;
            }

            .text-label{
                @include absolute_pos(absolute,$top : -17px,$left : -26px);
                width: 64px;
                text-align: center;
                font-size: $font_size_11px;
                transform: rotate(43deg) translate(3px,2px);
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
