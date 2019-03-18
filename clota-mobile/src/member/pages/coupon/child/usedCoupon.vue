<!--已使用优惠券-->

<template>
    <div class="used-coupon">
        <div class="search-area">
        </div>
        <template v-if="couponList.length > 0">
            <!--优惠券详情-->
            <coupon-item status="used"
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
        components : {
            couponItem,
            noData
        },
        data () {
            return {
                //优惠券列表
                couponList : []
            };
        },
        methods : {
            /**
             * 查询已使用的优惠券信息
             */
            queryMemberCouponsList () {
                ajax.post('queryMemberCouponsList',{
                    cardId : this.cardInfo.id,
                    status : 'used',
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
        created () {
            this.queryMemberCouponsList();
        },
        computed : {
            ...mapGetters([
                'cardInfo',
                'lang',
            ])
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .used-coupon{
        @include block_outline();
        background: #f2f3f4;
        overflow: auto;
        padding: 0 14px;
        .search-area{
            height: 60px;
        }

        .page-no-data{
            @include block_outline($height : unquote('calc(100% - 60px)'));
        }
    }
</style>
