<!--优惠券-->

<template>
    <div class="member-coupon">
        <div class="tab-wrap">
            <!--卡包tap列表-->
            <tab v-model="tabSelected">
                <tab-item
                    v-for="(item,i) in tapInfo"
                    :key="i">
                    {{$t(item)}}
                </tab-item>
            </tab>
        </div>
        <swiper dots-position="center"
                v-model="tabSelected"
                :threshold="100"
                :aspect-ratio="10"
                :show-dots="false">
            <swiper-item class="swiper-item-list">
                <!--可用优惠券-->
                <avaliable-coupon>
                </avaliable-coupon>
            </swiper-item>
            <swiper-item class="swiper-item-list">
                <!--已使用优惠券-->
                <used-coupon>
                </used-coupon>
            </swiper-item>
            <swiper-item class="swiper-item-list">
                <!--已过期优惠券-->
                <overdue-coupon>
                </overdue-coupon>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import avaliableCoupon from './child/avaliableCoupon';
    import usedCoupon from './child/usedCoupon';
    import overdueCoupon from './child/overdueCoupon';

    export default {
        components : {
            avaliableCoupon,
            usedCoupon,
            overdueCoupon
        },
        data () {
            return {
                //tab列表
                tapInfo : ['可使用','已使用','已过期'],
                //选择的tab
                tabSelected : 0
            };
        },
        methods : {
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-coupon {
        @include block_outline();
        overflow: auto;
        background: rgba(242,243,244,1);

        /deep/ .vux-slider{
            height: 100%;
        }

        .tab-wrap{
            position: fixed;
            width: 100%;
            top : 0;
            z-index: 9;
        }

        /deep/ .vux-swiper{
            height: 100%!important;
        }
    }
</style>
