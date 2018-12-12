<!--订单详情-->

<template>
    <div class="order-detail">
        <div class="content">
            <div class="order-info">
                <div class="order-base-info">
                    <span class="order-name">{{orderDetail.scenicName | contentFilter}}</span>
                    <span class="order-type">{{orderDetail.productName | contentFilter}}</span>
                </div>
                <div class="detail-list">
                    <span class="key">{{$t('colonSetting',{ key : $t('订单明细编号') })}}</span>
                    <span class="value">{{orderDetail.orderId | contentFilter}}</span>
                </div>
                <div class="detail-list">
                    <span class="key">{{$t('colonSetting',{ key : $t('使用日期') })}}</span>
                    <span class="value">{{orderDetail.playDate | timeFormat('yyyy-MM-dd') | contentFilter}}</span>
                </div>
            </div>
            <div class="preorder-info">
                <div class="title">{{$t('预定信息')}}</div>
                <div class="info-list">
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('产品单价') })}}</span>
                        <span class="value">{{orderDetail.itemSalePrice | moneyFilter(2,'￥') | contentFilter}}</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('预定数量') })}}</span>
                        <span class="value">{{orderDetail.productNum | contentFilter}}</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('订单金额') })}}</span>
                        <span class="value">{{orderDetail.orderAmount | moneyFilter(2,'￥') | contentFilter}}</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('下单日期') })}}</span>
                        <span class="value">{{orderDetail.createdTime | contentFilter}}</span>
                    </div>
                </div>
            </div>
            <!--核销信息-->
            <div class="preorder-info">
                <div class="title">{{$t('核销信息')}}</div>
                <div class="info-list">
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('已核销数量') })}}</span>
                        <span class="value">{{orderDetail.verifiedNum | contentFilter}}</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('已退票数量') })}}</span>
                        <span class="value">{{orderDetail.refundNum | contentFilter}}</span>
                    </div>
                </div>
            </div>
            <!--佣金-->
            <div class="preorder-info">
                <div class="title">{{$t('佣金')}}</div>
                <div class="info-list">
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('佣金总额') })}}</span>
                        <span class="value">{{orderDetail.orderSalary | moneyFilter(2,'￥') | contentFilter}}</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('申请提现日期') })}}</span>
                        <span class="value">{{orderDetail.reqWithdrawTime | contentFilter}}</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('景区审核日期') })}}</span>
                        <span class="value">{{orderDetail.auditTime | contentFilter}}</span>
                    </div>
                    <div class="detail-list">
                        <span class="key">{{$t('colonSetting',{ key : $t('佣金支付方式') })}}</span>
                        <span class="value">{{$t(orderDetail.salaryPayment) | contentFilter}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="deposit" v-if="orderDetail.withdrawStatus !== 'success'">
            <div class="commission">
                {{$t('colonSetting',{ key : $t('可提现佣金') })}}
                <span class="money">{{orderDetail.expectedSalary | moneyFilter(2,'￥') | contentFilter}}</span>
            </div>
            <div v-if="canApplyDeposit"
                 class="apply-deposit"
                 @click="deposit">{{$t('申请提现')}}</div>
            <div v-else-if="orderDetail.withdrawStatus === 'reject_no_req'"
                 class="apply-deposit" :class="{ 'disabled' : true }">{{$t('申请被驳回')}}</div>
            <div v-else
                 class="apply-deposit" :class="{ 'disabled' : true }">{{$t('申请提现')}}</div>
        </div>
    </div>
</template>

<script>
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/marketing/api/index';

    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //订单详情
                orderDetail : {}
            };
        },
        methods : {
            /**
             * 跳转到提现申请结果
             */
            deposit () {
                this.applyDeposit();
            },
            /**
             * 获取路由信息
             * @param{Object} params 路由参数
             */
            getParams (params) {
                if (params && params.orderDtail) {
                    this.orderDetail = params.orderDtail;
                } else {
                    this.$router.push({
                        name : 'marketingOrder'
                    });
                }
            },
            /**
             * 申请提现
             */
            applyDeposit () {
                ajax.post('market_singleOrderSalaryWithdrawApply',{
                    orderIds : this.orderDetail.orderId,
                    amount : this.orderDetail.expectedSalary
                }).then(res => {
                    if (res.success) {
                        this.$router.push({
                            name : 'marketingDepositResult',
                            params : {
                                fromRegister : true
                            }
                        });
                    } else if (res.code && res.code !== '300') {
                        this.$vux.toast.show({
                            text : this.$t('errorMsg.' + res.code),
                            type : 'cancel'
                        });
                    } else {
                        this.$vux.toast.show({
                            text : this.$t('operateFail',{ msg : this.$t('申请提现') }),
                            type : 'cancel'
                        });
                    }
                });
            }
        },
        computed : {
            //是否可以申请提现
            canApplyDeposit () {
                //未审核或已拒绝可再次申请,佣金大于0，并且订单全部核销的才可以申请提现
                if (this.orderDetail &&
                    this.orderDetail.verifiedNum > 0 &&
                    (this.orderDetail.withdrawStatus === 'unaudit' || this.orderDetail.withdrawStatus === 'reject') &&
                    this.orderDetail.verifiedNum === this.orderDetail.productNum) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .order-detail{
        @include block_outline();
        background: #f2f3f4;

        .content{
            @include block_outline($height : unquote('calc(100% - 44px)'));
            @include padding_place(100%,8px);
            overflow: auto;

            .preorder-info{
                background: $color_fff;
                margin-bottom: 8px;

                &:nth-last-of-type(1){
                    margin-bottom: 0;
                }

                .title{
                    position: relative;
                    @include block_outline($height : 40px);
                    border-bottom: 0.5px solid #E8E8E8;
                    line-height: 40px;
                    padding: 0 30px;
                    @include overflow_tip();

                    &:after{
                        content : '';
                        @include block_outline(4px,15px);
                        background: #0073EB;
                        @include absolute_pos(absolute,$left : 20px,$top : 12px);
                    }
                }

                .info-list{
                    padding: 10px 0;
                }
            }

            .detail-list{
                @include block_outline($height : 26px);
                padding: 4.5px 14px;
                line-height: 17px;
                display: flex;
                font-size: $font_size_12px;

                .key{
                    color: #8E9091;
                }

                .value{
                    @include overflow_tip();
                    flex: 1;
                    color: #353B48;
                }
            }

            .order-info{
                background: $color_fff;
                padding-bottom: 15px;
                margin-bottom: 8px;

                .order-base-info{
                    @include block_outline($height : 38px);
                    display: flex;
                    padding: 12px 14px 6px;

                    .order-name{
                        @include overflow_tip();
                        font-size: $font_size_14px;
                        color: $color_333;
                        flex: 1;
                    }

                    .order-type{
                        color: #F7981C;
                        font-size: $font_size_14px;
                        text-align: right;
                    }
                }
            }
        }

        .deposit{
            @include block_outline($height : 44px);
            background: $color_fff;
            border-top: 0.5px solid #E1E1E1;
            display: flex;
            flex-direction: row;
            line-height: 44px;
            padding-left: 20px;

            .apply-deposit{
                height: 100%;
                padding: 0 20px;
                font-size: $font_size_16px;
                background: #F17E40;
                color: $color_fff;

                &.disabled{
                    background: #E1E1E1;
                }
            }

            .commission{
                flex: 1;
                font-size: $font_size_12px;

                .money{
                    color: #F7981C;
                }
            }
        }
    }
</style>
