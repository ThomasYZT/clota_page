<!--代金券-->

<template>
    <div class="voucher-detail"
         :class="{ 'available-status' : status === 'avaliable','used-status' : status === 'used','overdue-status' : status === 'overdue' }">
        <img v-if="status === 'used'"
             class="used-image"
             src="../../../../assets/images/icon-coupon-used.svg" alt="">
        <div class="head"
             :class="{ 'cash' : data.couponType === 'cash_coupon','discount' : data.couponType === 'discount_coupon','exchange' : data.couponType === 'exchange_coupon' }">
            <!--代金券-->
            <template v-if="data.couponType === 'cash_coupon'">
                <div class="face-value">{{$t('couponValue',{ num : data.nominalValue })}}</div>
                <div class="use-condition">{{$t('cashUseItem',{ num : data.conditionLowerLimtation })}}</div>
            </template>
            <!--折扣券-->
            <template v-else-if="data.couponType === 'discount_coupon'">
                <div class="face-value">{{$t('discountNum',{ num : data.nominalValue * 10 })}}</div>
            </template>
            <!--兑换券-->
            <template v-else-if="data.couponType === 'exchange_coupon'">
                <div class="face-value">{{$t('exchangeTxt')}}</div>
            </template>
        </div>
        <div class="demo-info">
            <div class="coupon-title">
                <span class="title">{{data.couponName | contentFilter}}</span>
                <span class="label">{{couponName}}</span>
            </div>
            <div class="validate-date">
                {{$t('colonSetting',{ key : $t('validateTime') })}}{{data.expTime | contentFilter}}
            </div>
            <div class="coupon-code">
                {{$t('colonSetting',{ key : this.$t('couponCode') })}}<span :id="'_' + data.id">{{data.couponCode | contentFilter}}</span>
                <span class="copy-btn"
                      ref="copyBtn"
                      data-clipboard-action="copy"
                      v-if="status === 'avaliable'"
                      :data-clipboard-target="'#_' + data.id"
                      @click="copyCode($event)">
                    {{$t('copyCouponCode')}}
                </span>
            </div>
            <div class="use-rule" @click="getConditionNames" :class="{ 'upload' : showDetail }">
                <span class="rule-title">{{$t('useRules')}}</span>
                <span class="iconfont icon-arrow" :class="{ 'reverse' : showDetail }"></span>
            </div>
        </div>
        <transition name="fade">
            <ul class="useage-detail" v-if="showDetail">
                <li class="conditon">{{$t('useRulesOne')}}{{avaliableChannel | contentFilter}}</li>
                <li class="conditon">{{$t('useRuleTwo')}}{{avaliableStore | contentFilter}}</li>
                <li class="conditon">{{$t('useRuleThree')}}{{avaliableProductType | contentFilter}}</li>
            </ul>
        </transition>
    </div>
</template>

<script>
    import ajax from '@/member/api/index.js';

    export default {
        props : {
            //优惠券状态
            'status' : {
                type : String,
                default : 'used'
            },
            //优惠券信息
            data : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                showDetail : false,
                //可用渠道
                avaliableChannel : '',
                //可用店铺
                avaliableStore : '',
                //可用产品类别
                avaliableProductType : '',
                //存储初始化复制按钮事件
                copyBtn : null
            };
        },
        methods : {
            /**
             * 获取使用规则
             */
            getConditionNames () {
                if (!this.showDetail) {
                    ajax.post('getConditionNames',{
                        couponId : this.data.couponId
                    }).then(res => {
                        if (res.success && res.data) {
                            this.avaliableChannel = res.data.channelNames;
                            this.avaliableStore = res.data.orgNames;
                            this.avaliableProductType = res.data.typeNames;
                        }
                        this.showDetail = !this.showDetail;
                    });
                } else {
                    this.showDetail = false;
                }
            },
            /**
             * 复制券码到剪贴板
             */
            copyCode () {
                this.copyBtn.on('success', () => {
                   this.$vux.toast.text(this.$t('couponHadToClib'));
                });
                //复制到剪贴板失败
                this.copyBtn.on('error', () => {
                    this.$vux.toast.show({
                        text : this.$t('couponHadToClib'),
                        type : 'cancel'
                    });
                });
            }
        },
        computed : {
            //优惠券名称
            couponName () {
                if (this.data) {
                    switch (this.data.couponType) {
                        case 'exchange_coupon' : return this.$t('exchangeCoupon');
                        case 'discount_coupon' : return this.$t('discountCoupon');
                        case 'cash_coupon' : return this.$t('cashCoupon');
                        default : return '';
                    }
                } else {
                    return '-';
                }
            }
        },
        mounted () {
            this.$nextTick(() => {
                let btnEle = this.$el.querySelector('.copy-btn');
                if (btnEle) {
                    this.copyBtn = new this.Clipboard(btnEle);
                }
            });
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .voucher-detail {
        min-height: 100px;
        border-radius: 2px;
        margin-bottom: 14px;
        position: relative;

        .used-image{
            position: absolute;
            right: 0;
            top: 0;
            @include block_outline(50px,50px);
            z-index: 8;
        }

        &.available-status{
            .head{

                &.cash{
                    background: linear-gradient(to bottom,#ee6723, #eb8f52);
                }

                &.discount{
                    background: linear-gradient(to bottom,#6c70cc,#9dc6ed);
                }

                &.exchange{
                    background: linear-gradient(to bottom,#478aee,#7ac6ed);
                }
            }
        }
        &.used-status,
        &.overdue-status{
            .head{
                background: #C5C5C5;
            }
            .coupon-title .label {
                color: #999999!important;
                border-color: #999999!important;
            }
        }

        .head{
            position: relative;
            @include block_outline(97px,100px);
            border-radius: 2px 0 0 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            float: left;
            overflow: hidden;

            &:before,
            &:after{
                content : '';
                display: block;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #f2f3f4;
                position: absolute;
            }

            &:before{
                right : -7px;
                top : -7px;
            }

            &:after{
                right : -7px;
                bottom : -7px;
            }

            .face-value{
                height: 28px;
                line-height: 28px;
                color: #ffffff;
                font-size: $font_size_20px;
            }

            .use-condition{
                height: 14px;
                line-height: 14px;
                color: #ffffff;
                font-size: $font_size_10px;
            }
        }

        .demo-info{
            position: relative;
            height: 100px;
            float: left;
            background: #ffffff;
            border-radius: 0 2px 2px 0;
            padding: 12px 0;
            width: calc(100% - 97px);

            &:before{
                content : '';
                display: block;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #f2f3f4;
                position: absolute;
            }

            &:before{
                left : -7px;
                top : -7px;
            }

            .coupon-title{
                display: flex;
                align-items: center;
                padding: 0 7px 0 15px;

                .title{
                    flex: 1;
                    @include overflow_tip();
                    color: #000000;
                    font-weight: bold;
                    max-width: calc(100% - 50px);
                }

                .label{
                    position: relative;
                    @include block_outline(39px,15px);
                    border: 0.5px solid #ED7A4B;
                    border-radius: 7.5px;
                    color: #ED7A4B;
                    line-height: 14px;
                    font-size: 8px;
                    text-align: center;
                    z-index: 9;
                }
            }

            .validate-date{
                color: #9b9b9b;
                margin-top: 3px;
                font-size: $font_size_11px;
                padding: 0 15px;
            }

            .coupon-code{
                font-size: $font_size_11px;
                color: #9b9b9b;
                margin-bottom: 6px;
                padding: 0 15px;

                .copy-btn{
                    float: right;
                    color: $color_blue;
                }
            }

            .use-rule{
                position: relative;
                @include block_outline($height : 26px);
                border-top: 1px dashed #e8e8e8;
                padding : 0 15px;
                transition: all 0.3s;

                &.upload{
                    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                }

                &.upload:before{
                    background: #ffffff;
                    box-shadow: inset 0 1px 0 rgba(0,0,0,0.1);
                }

                &:before{
                    content : '';
                    display: block;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #f2f3f4;
                    position: absolute;
                }

                &:before{
                    left : -7px;
                    bottom : -7px;
                }

                .rule-title{
                    font-size: $font_size_12px;
                    color: #9b9b9b;
                    height: 100%;
                    line-height: 28px;
                }

                .icon-arrow{
                    float: right;
                    transform: rotate(90deg);
                    color: #9b9b9b;
                    font-size: $font_size_12px;
                    vertical-align: middle;
                    height: 100%;
                    line-height: 28px;
                    transition: all 0.3s;

                    &.reverse{
                        transition: all 0.3s;
                        transform: rotate(270deg);
                    }
                }
            }
        }

        .useage-detail{
            padding: 10px;
            background: #ffffff;
            clear: both;

            .conditon{
                color: #C5C5C5;
                font-size: $font_size_11px;
            }
        }
    }
</style>
