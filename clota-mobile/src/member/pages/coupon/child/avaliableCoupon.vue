<!--可用优惠券-->

<template>
    <div class="avaliable-coupon">
        <div class="search-area">
            <x-input class="coupon-word" v-model.trim="couponWord"></x-input>
            <x-button class="add-btn" @click.native="addCoupon">{{$t('添加')}}</x-button>
        </div>
        <template v-if="couponList.length > 0">
            <!--优惠券详情-->
            <coupon-item status="avaliable"
                         v-for="item in couponList"
                         :key="item.id"
                         :data="item">
            </coupon-item>
        </template>
        <!--无数据显示-->
        <no-data class="page-no-data" v-else>
        </no-data>
    </div>
</template>

<script>
    import couponItem from '../components/couponItem';
    import ajax from '@/member/api/index.js';
    import { mapGetters } from 'vuex';
    import noData from '@/components/noData/index.vue';

    export default {
        //优惠券状态
        'status' : {
            type : String,
            default : 'used'
        },
        components : {
            couponItem,
            noData
        },
        data () {
            return {
                //优惠券代码
                couponWord : '',
                //优惠券列表
                couponList : []
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
            },
            /**
             * 查询可用优惠券信息
             */
            queryMemberCouponsList () {
                ajax.post('queryMemberCouponsList',{
                    cardId : this.cardInfo.id,
                    status : 'noUse',
                    pageNo : 1,
                    pageSize : 9999
                }).then(res => {
                    if (res.success && res.data && res.data.data) {
                        this.couponList = res.data.data;
                    } else {
                        this.couponList = [];
                    }
                });
            }
        },
        computed : {
            ...mapGetters([
                'cardInfo'
            ])
        },
        created () {
            this.queryMemberCouponsList();
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

        .page-no-data{
            @include block_outline($height : unquote('calc(100% - 61px)'));
        }
    }
</style>
