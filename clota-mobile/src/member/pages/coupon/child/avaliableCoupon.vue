<!--可用优惠券-->

<template>
    <div class="avaliable-coupon">
        <div class="search-area">
            <x-input class="coupon-word" v-model.trim="couponWord"></x-input>
            <x-button class="add-btn" @click.native="addCoupon">{{$t('添加')}}</x-button>
        </div>
        <!--优惠券详情-->
        <coupon-item status="avaliable">
        </coupon-item>
        <coupon-item status="avaliable">
        </coupon-item>
        <coupon-item status="avaliable">
        </coupon-item>
        <coupon-item status="avaliable">
        </coupon-item>
        <coupon-item status="avaliable">
        </coupon-item>
        <coupon-item status="avaliable">
        </coupon-item>
        <coupon-item status="avaliable">
        </coupon-item>
        <coupon-item status="avaliable">
        </coupon-item>
    </div>
</template>

<script>
    import couponItem from '../components/couponItem';

    export default {
        //优惠券状态
        'status' : {
            type : String,
            default : 'used'
        },
        components : {
            couponItem
        },
        data () {
            return {
                //优惠券代码
                couponWord : ''
            };
        },
        methods : {
            /**
             * 新增优惠券
             */
            addCoupon () {
                this.validateCoupon().then(() => {

                });
            },
            /**
             * 校验优惠券码
             * @return{Function} promise函数
             */
            validateCoupon () {
                return new Promise((resolve,reject) => {
                    if (this.couponWord) {
                        resolve();
                    } else {
                        this.$vux.toast.text(this.$t('pleaseInput', { field : this.$t('优惠券码') }));
                        reject();
                    }
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .avaliable-coupon{
        @include block_outline();
        background: #f2f3f4;
        overflow: auto;
        padding: 0 14px;

        .search-area{
            padding-top: 61px;
            @include block_outline($height : 115px);

            .coupon-word{
                width: calc(100% - 78px);
                height: 39px;
                float: left;
                background: $color_fff;
            }

            .add-btn{
                @include block_outline(78px,39px);
                background: #0073EB;
                border-radius: 0 4px 4px 0;
                float: right;
                font-size: $font_size_14px;
                color: $color_fff;

                &:after{
                    display: none;
                }
            }
        }
    }
</style>
