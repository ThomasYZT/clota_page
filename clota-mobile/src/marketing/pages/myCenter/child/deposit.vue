<!--可提现金额-->

<template>
    <div class="deposit">
        <div class="head">
            <div class="deposit-num">
                {{accountDetail.canApplyWithdrawAmount | moneyFilter | contentFilter}}
            </div>
            <div class="tips">{{$t('可提现金额(元)')}}</div>
        </div>
        <div class="money-detail-box">
            <div class="top">
                <div class="detail-box border-right">
                    <div class="num-info">{{accountDetail.haveWithdrawAmount | moneyFilter | contentFilter}}</div>
                    <div class="des">{{$t('已提现(元)')}}</div>
                </div>
                <div class="detail-box">
                    <div class="num-info">{{accountDetail.auditWithdrawAmount | moneyFilter | contentFilter}}</div>
                    <div class="des">{{$t('已冻结(元)')}}</div>
                </div>
            </div>
            <div class="bottom">
                <div class="detail-box border-right">
                    <div class="num-info">{{accountDetail.totalEarnAmount | moneyFilter | contentFilter}}</div>
                    <div class="des">{{$t('累计赚取(元)')}}</div>
                </div>
                <div class="detail-box">
                    <div class="num-info">{{accountDetail.totalMarketAmount | moneyFilter | contentFilter}}</div>
                    <div class="des">{{$t('累计销售(元)')}}</div>
                </div>
            </div>
        </div>

        <x-button class="button"
                  :disabled="!canDeposit"
                  @click.native="deposit">{{$t('全部提现')}}</x-button>
        <!--未设置账户提示框-->
        <confirm v-model="confirmShow"
                 v-transfer-dom
                 :title="$t('提示')"
                 :confirm-text="$t('立即设置')"
                 @on-cancel="onCancel"
                 @on-confirm="toSetAccount">
            <p style="text-align:center;">{{ $t('您还未设置佣金收款账户。') }}</p>
        </confirm>
        <!--提现金额以及收款方式确认模态框-->
        <confirm v-model="depositConfirmModalShow"
                 class="deposit-type-confirm-modal"
                 v-transfer-dom
                 @on-cancel="onCancel"
                 @on-confirm="onConfirm">
            <template>
                <div class="receipt-money">
                    您申请提现<span class="num">{{accountDetail.canApplyWithdrawAmount | moneyFilter | contentFilter}}</span>元
                </div>
                <div class="receipt-type">
                    <span class="key">{{$t('colonSetting',{ key : $t('收款方式') })}}</span>
                    <span class="value">{{accountDetail.accountType}}</span>
                </div>
                <div class="receipt-type">
                    <span class="key">{{$t('colonSetting',{ key : $t('收款账户名') })}}</span>
                    <span class="value">{{$t(accountDetail.accountInfo)}}</span>
                </div>
            </template>
        </confirm>
    </div>
</template>

<script>
    import ajax from '@/marketing/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { validator } from 'klwk-ui';
    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //提现提醒模态框是否显示
                confirmShow : false,
                //提现金额以及方式确认模态框是否显示
                depositConfirmModalShow : false,
                //我的账户信息
                accountDetail : {}
            };
        },
        methods : {
            /**
             * 提现金额
             */
            deposit () {
                if (!this.canDeposit) return;
                if (validator.isEmpty(this.accountDetail.accountType) || validator.isEmpty(this.accountDetail.accountInfo) ) {
                    this.confirmShow = true;
                } else {
                    this.depositConfirmModalShow = true;
                }
            },
            /**
             * 取消提现
             */
            onCancel () {
                this.confirmShow = false;
                this.depositConfirmModalShow = false;
            },
            /**
             * 立即设置收款账户
             */
            onConfirm () {
                this.applyDeposit();
            },
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.accountDetail = params;
                    if (validator.isEmpty(this.accountDetail.accountType) || validator.isEmpty(this.accountDetail.accountInfo) ) {
                        this.confirmShow = true;
                    }
                } else {
                    this.$router.push({
                        name : 'marketingOwnerCenter'
                    });
                }
            },
            /**
             * 申请提现
             */
            applyDeposit () {
                if (!this.canDeposit) return;
                ajax.post('market_orderSalaryWithdrawApply',{
                    amount : this.accountDetail.canApplyWithdrawAmount,
                    orderIds : ''
                }).then(res => {
                    if (res.success) {
                        this.$vux.toast.show({
                            text : this.$t('operateSuc',{ msg : this.$t('申请提现') }),
                        });
                        //申请成功，重新查询提现信息
                        this.queryUserInfo();
                    } else {
                        this.$vux.toast.show({
                            text : this.$t('operateFail',{ msg : this.$t('申请提现') }),
                            type : 'cancel'
                        });
                    }
                });
            },
            /**
             * 查询用户信息
             */
            queryUserInfo () {
                ajax.post('market_getMarketUserMyInfo').then(res => {
                    if (res.success) {
                        this.accountDetail = res.data ? res.data : {};
                    } else {
                        this.userInfo = {};
                    }
                });
            },
            /**
             * 前去设置账户
             */
            toSetAccount () {
                this.$router.push({
                    name : 'marketingSetAccount',
                    params : {
                        accountInfo : {
                            account : this.accountDetail.accountInfo,
                            accountType : this.accountDetail.accountType,
                            name : this.accountDetail.name,
                            mobile : this.accountDetail.mobile
                        }
                    }
                });
            }
        },
        computed : {
            //提现按钮是否可以点击
            canDeposit () {
                return !!(this.accountDetail &&
                    this.accountDetail.canApplyWithdrawAmount &&
                    this.accountDetail.canApplyWithdrawAmount > 0 &&
                    !validator.isEmpty(this.accountDetail.accountType) &&
                    !validator.isEmpty(this.accountDetail.accountInfo) );
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    $img_base_url : '../../../../assets/images/';
    .deposit{
        @include block_outline();
        background: $color_fff;
        overflow: auto;
        position: relative;

        .head{
            @include block_outline($height : 158px);
            background: get_url('integrateDetialBg.png');
            background-size: cover;

            .deposit-num{
                @include block_outline($height : 74px);
                line-height: 38px;
                padding-top: 36px;
                color: $color_fff;
                font-size: 34px;
                text-align: center;
            }

            .tips{
                @include block_outline($height : 17px);
                line-height: 17px;
                color: $color_fff;
                text-align: center;
                margin-top: 5px;
                font-size: $font_size_12px;
            }
        }

        .money-detail-box{
            @include block_outline(unquote('calc(100% - 38px)'),210px);
            background: $color_fff;
            box-shadow: 0 5px 15px 0 rgba(43,82,154,0.10);
            border-radius: 0 0 8px 8px;
            @include absolute_pos(absolute,$left : 19px,$top : 115px);
            padding: 30px 20px;

            .top,.bottom{
                @include block_outline($height : 50%);

                .detail-box{
                    @include block_outline(50%,60px);
                    float: left;

                    &.border-right{
                        border-right: 0.5px solid $color_eee;
                    }

                    .num-info{
                        font-size: $font_size_19px;
                        color: $color_333;
                        text-align: center;
                        @include block_outline($height : 27px);
                        line-height: 27px;
                        margin-top: 5px;
                        @include overflow_tip();
                    }

                    .des{
                        @include block_outline($height : 17px);
                        line-height: 17px;
                        text-align: center;
                        font-size: $font_size_12px;
                        color: $color_999;
                        margin-top: 5px;
                        @include overflow_tip();
                    }
                }
            }

            .top{
                border-bottom: 0.5px solid $color_eee;
            }

            .bottom{
                padding-top: 15px;
            }
        }

        /deep/ .weui-btn{
            margin-top: 230px;
        }
    }
</style>
<style>
    .deposit-type-confirm-modal .weui-dialog__hd{
        display: none;
    }
    .deposit-type-confirm-modal .receipt-money {
        font-size: 18px;
        text-align: center;
        color: #353B48;
        height: 18px;
        line-height: 18px;
        margin-bottom: 12px;
    }

    .deposit-type-confirm-modal .num{
        color: #f7981c;
    }
    .deposit-type-confirm-modal .receipt-type{
        width: 100%;
        height: 25px;
        line-height: 25px;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .deposit-type-confirm-modal .receipt-type .key {
        color: #666666;
        max-width: 150px;
        display: inline-block;
    }
    .deposit-type-confirm-modal .receipt-type .value {
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        max-width: 150px;
        display: inline-block;
    }
</style>
