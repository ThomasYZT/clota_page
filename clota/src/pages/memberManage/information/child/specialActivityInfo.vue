<!--特殊活动期间积分折扣率查看-->

<template>
    <div class="rights-wrap">
        <div class="table-wrap"
             :class="{'width-500' : lang === 'zh-CN' , 'width-660' : lang === 'en'}"
             v-if="activityCardData && activityCardData.length > 0">
            <div class="title-normal">{{$t('enjoyCouponByMemberLevel')}}</div><!--按会员级别享受积分、折扣率信息-->
            <table-com
                :column-data="cardColumnData"
                :table-data="activityCardData"
                :border="false"
                :auto-height="true"
                :table-com-min-height="250">
                <el-table-column
                    slot="column0"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.scoreRate }} : 1</span>
                    </template>
                </el-table-column>
            </table-com>
        </div>

        <div class="table-wrap width-660"
             v-if="activityStoreData && activityStoreData.length > 0">
            <div class="title-normal">{{$t('enjoyCouponByShop')}}</div><!--按店铺享受积分、折扣率信息-->
            <table-com
                :column-data="storeColumnData"
                :table-data="activityStoreData"
                :border="false"
                :auto-height="true"
                :table-com-min-height="250">
                <el-table-column
                    slot="column1"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.deptScoreRate }} : 1</span>
                    </template>
                </el-table-column>
            </table-com>
        </div>

        <div class="table-wrap width-1100"
             v-if="activityProductData && activityProductData.length > 0">
            <div class="title-normal">{{$t('enjoyCouponByProduct')}}</div><!--按产品享受积分、折扣率信息-->
            <table-com
                :column-data="productColumnData"
                :table-data="activityProductData"
                :table-com-min-height="250"
                :border="false"
                :auto-height="true">
                <el-table-column
                    slot="column2"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.prodScoreRate }} : 1</span>
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import tableCom from '@/components/tableCom/tableCom.vue';
	export default {
        components : {
            tableCom,
        },
        props : {
            //按会员类型的积分折扣率设置信息
            'activity-card-data' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //按店铺的积分折扣率设置信息
            'activity-store-data' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //按店铺的积分折扣率设置信息
            'activity-product-data' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
		data () {
			return {
                cardColumnData : [
                    {
                        title : 'integralScale', // 积分率
                        minWidth : 100,
                        enMinWidth : 320,
                        field : 'scoreRate'
                    },
                    {
                        title : 'discountRate', // 折扣率
                        minWidth : 100,
                        enMinWidth : 150,
                        field : 'discountRate'
                    },
                ],
                storeColumnData : [
                    {
                        title : 'shop', // 店铺
                        minWidth : 90,
                        field : 'orgName'
                    },
                    {
                        title : 'integralScale', // 积分率
                        minWidth : 110,
                        enMinWidth : 280,
                        field : 'deptScoreRate'
                    },
                    {
                        title : 'discountRate', // 折扣率
                        minWidth : 100,
                        field : 'deptDiscountRate'
                    },
                ],
                productColumnData : [
                    {
                        title : 'shop',
                        minWidth : 100,
                        field : 'orgName'
                    },
                    {
                        title : 'productType',
                        minWidth : 100,
                        field : 'typeName'
                    },
                    {
                        title : 'integralScale',
                        minWidth : 100,
                        enMinWidth : 220,
                        field : 'prodScoreRate'
                    },
                    {
                        title : 'discountRate',
                        minWidth : 100,
                        field : 'prodDiscountRate'
                    },
                ],
            };
		},
		methods : {},
        computed : {
            ...mapGetters({
                lang : 'lang'
            }),
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
