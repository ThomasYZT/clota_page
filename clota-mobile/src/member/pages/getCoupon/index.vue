<!--领取优惠券-->

<template>
    <div class="get-coupon">
        <transition name="fade" mode="out-in">
            <!--领取-->
            <div class="coupon-inner" v-if="stage === 'notGet'">
                <div class="congratuation">{{$t('恭喜你')}}</div>
                <div class="get-coupon-label">{{$t('获得一张优惠券')}}</div>
                <div class="coupon-info">
                    <div class="circle circle-left-top"></div>
                    <div class="circle circle-left-bottom"></div>
                    <div class="circle circle-right-bottom"></div>
                    <div class="circle circle-right-top"></div>
                    <div class="title">
                        {{$t('100元代金券')}}
                    </div>
                    <div class="fu-title">{{$t('满200可用')}}</div>
                </div>
                <x-input class="member-phone"
                         :placeholder="$t('请输入手机号领取')"
                         v-model.trim="phone">
                </x-input>
                <x-input class="member-code"
                         v-model.trim="code"
                         :placeholder="$t('请输入验证码')" >
                    <div slot="right-full-height"
                         class="validate"
                         @click="getValidCode">
                        {{$t('getValidCode')}}
                        <!--<countdown-->
                        <!--v-if="isTiming"-->
                        <!--v-model="time"-->
                        <!--:start="isTiming"-->
                        <!--@on-finish="timeFinish">-->
                        <!--</countdown>-->
                    </div>
                </x-input>
                <x-button class="get-btn"
                          :class="{ 'disabled' : !(phone && code) }"
                          @click.native="getCoupon">
                    {{$t('领取优惠券')}}
                </x-button>
            </div>
            <!--领取完成-->
            <div class="coupon-get-result" v-else-if="stage === 'getted'">
                <img class="get-suc-img" src="../../../assets/images/icon-getted-coupon.png" alt="">
                <div class="get-suc-title">{{$t('领取成功！')}}</div>
                <x-button class="look-btn"
                          @click.native="getCoupon">
                    {{$t('查看我的优惠券')}}
                </x-button>
                <span class="to-my">{{$t('去会员主页')}}&nbsp;&gt;</span>
            </div>
        </transition>
        <!--未注册会员提示-->
        <confirm v-model="confirmShow"
                 v-transfer-dom
                 :title="$t('notice')"
                 :confirm-text="$t('register')"
                 :cancel-text="$t('cancel')"
                 @on-confirm="onConfirm">
            <p style="text-align:center;">{{ $t('您还未注册会员，请前往注册') }}</p>
        </confirm>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //手机号
                phone : '',
                //验证码
                code : '',
                //当前阶段
                stage : 'notGet',
                //提示框是否显示
                confirmShow : true
            };
        },
        methods : {
            /**
             * 获取验证码
             */
            getValidCode () {

            },
            /**
             * 领取优惠券
             */
            getCoupon () {
                this.stage = 'getted';
            },
            /**
             * 确认注册
             */
            onConfirm () {

            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .get-coupon {
        @include block_outline();
        opacity: 0.8;
        background-image: linear-gradient(0deg, #FFA52A 0%, #F06E25 49%, #FFE26A 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 550px;

        .coupon-get-result {
            padding: 80px 35px 25px!important;
            text-align: center;

            .get-suc-img{
                width: 100%;
            }

            .get-suc-title{
                height: 35px;
                line-height: 35px;
                margin-top: 22px;
                text-align: center;
                font-size: 25px;
                color: #000000;
            }

            .look-btn{
                margin-top: 74px;
            }

            .to-my {
                display: inline-block;
                font-size: $font_size_12px;
                color: #EF6D48;
                letter-spacing: -0.86px;
                margin-top: 17px;
            }
        }
        .coupon-inner,
        .coupon-get-result{
            width: calc(100% - 35px);
            min-height: 500px;
            background: $color_fff;
            box-shadow: 0 5px 50px 0 rgba(247,102,72,0.50);
            border-radius: 10px;
            padding: 25px 35px;

            .congratuation{
                @include block_outline($height : 42px);
                line-height: 42px;
                color: #4D4D4D;
                font-size: 30px;
                text-align: center;
                margin-bottom: 5px;
            }

            .get-coupon-label{
                font-size: $font_size_15px;
                color: $color_999;
                text-align: center;
                margin-bottom: 25px;
            }

            .coupon-info{
                position: relative;
                @include block_outline($height : 126px);
                background-image: linear-gradient(-180deg, #EF6C47 0%, #EC9052 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                margin-bottom: 30px;

                .circle{
                    width: 30px;
                    height: 30px;
                    background: $color_fff;
                    border-radius: 50%;
                }

                .circle-left-top{
                    @include absolute_pos(absolute,$left : -15px,$top : -15px);
                }
                .circle-left-bottom {
                    @include absolute_pos(absolute,$left : -15px,$bottom : -15px);
                }
                .circle-right-bottom {
                    @include absolute_pos(absolute,$right : -15px,$bottom : -15px);
                }
                .circle-right-top {
                    @include absolute_pos(absolute,$right : -15px,$top : -15px);
                }

                .title {
                    color: $color_fff;
                    font-size: $font_size_24px;
                }

                .fu-title {
                    color: $color_fff;
                    font-size: $font_size_15px;
                    margin-top: 5px;
                }
            }
        }

        .member-phone,
        .member-code{
            background: #FFF7ED;
            border-radius: 4px;
            height: 47.5px;

            &:before{
                display: none;
            }
        }

        .member-code{
            margin-top: 10px;

            .validate{
                height: 47.5px;
                line-height: 47.5px;
                font-size: $font_size_12px;
                color: #EF6D48;
                padding: 0 10px;
            }
        }

        .get-btn,
        .look-btn{
            @include block_outline($height : 50px);
            font-size: $font_size_20px;
            color: $color_fff;
            margin-top: 40px;
            background-image: linear-gradient(-180deg, #F88D56 0%, #E56746 100%);
            box-shadow: 0 5px 10px 0 rgba(246,93,72,0.50);
            border-radius: 8px;
            transition: all 0.3s;

            &.disabled{
                background: #E1E1E1;
                box-shadow: 0 0 0 0 rgba(246,93,72,0.50);
                transition: all 0.3s;
            }

            &:after{
                display: none;
            }
        }
    }
</style>
