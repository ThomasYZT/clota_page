<!--代金券-->

<template>
    <div class="voucher-detail"
         :class="{ 'available-status' : status === 'avaliable','used-status' : status === 'used','overdue-status' : status === 'overdue' }">
        <img v-if="status === 'used'"
             class="used-image"
             src="../../../../assets/images/icon-coupon-used.svg" alt="">
        <div class="head">
            <div class="face-value">{{56}}元</div>
            <div class="use-condition">满200元可用</div>
        </div>
        <div class="demo-info">
            <div class="coupon-title">
                <span class="title">满200减100代金</span>
                <span class="label">代金券</span>
            </div>
            <div class="validate-date">
                有效期至：2019-01-02
            </div>
            <div class="use-rule" @click="showUsageDetail" :class="{ 'upload' : showDetail }">
                <span class="rule-title">使用规则</span>
                <span class="iconfont icon-arrow" :class="{ 'reverse' : showDetail }"></span>
            </div>
        </div>
        <transition name="fade">
            <ul class="useage-detail" v-if="showDetail">
                <li class="conditon">1、可用渠道：官网、官微可用渠道：官网、官微可用渠道：官网、官微可用渠道：官网、官微可用渠道：官网、官微可用渠道：官网、官微</li>
                <li class="conditon">1、可用渠道：官网、官微</li>
                <li class="conditon">1、可用渠道：官网、官微</li>
            </ul>
        </transition>
    </div>
</template>

<script>
    export default {
        props : {
            //优惠券状态
            'status' : {
                type : String,
                default : 'used'
            }
        },
        data () {
            return {
                showDetail : false
            };
        },
        methods : {
            /**
             * 显示使用规则
             */
            showUsageDetail () {
                this.showDetail = !this.showDetail;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .voucher-detail {
        min-height: 90px;
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
                background: linear-gradient(to bottom,#ee6723, #eb8f52);
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
            @include block_outline(87px,90px);
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
            height: 90px;
            float: left;
            background: #ffffff;
            border-radius: 0 2px 2px 0;
            padding: 12px 0;
            width: calc(100% - 87px);

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
                margin-bottom: 12px;
                padding: 0 15px;
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
