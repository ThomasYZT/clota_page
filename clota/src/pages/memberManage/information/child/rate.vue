<template>
    <!--享受积分、折扣率信息-->
    <div class="member-rate">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :before-router-list="beforeRouterList"
                :locale-router="localeRouter">
            </bread-crumb-head>
        </div>

        <div class="rate-content">

            <div class="table-wrap width-500">
                <div class="title-wrap">{{$t('enjoyCouponByMemberLevel')}}</div><!--按会员级别享受积分、折扣率信息-->
                <table-com
                    :column-data="cardColumnData"
                    :table-data="cardData"
                    :border="false"
                    :ofset-height="170">
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

            <div class="table-wrap width-660">
                <div class="title-wrap">{{$t('enjoyCouponByShop')}}</div><!--按店铺享受积分、折扣率信息-->
                <table-com
                    :column-data="storeColumnData"
                    :table-data="storeData"
                    :border="false"
                    :ofset-height="335">
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
                            <span>{{ scoped.row.orgName || '-' }}</span>
                        </template>
                    </el-table-column>
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

            <div class="table-wrap width-1100">
                <div class="title-wrap">{{$t('enjoyCouponByProduct')}}</div><!--按产品享受积分、折扣率信息-->
                <table-com
                    :column-data="productColumnData"
                    :table-data="productData"
                    :border="false"
                    :ofset-height="545">
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
                            <span>{{ scoped.row.orgName || '-' }}</span>
                        </template>
                    </el-table-column>
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
                            <span>{{ scoped.row.productName || '-' }}</span>
                        </template>
                    </el-table-column>
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

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            tableCom,
        },
        computed: {
            show () {
               return false
            },
        },
        data () {
            return {
                beforeRouterList: [
                    {
                        name: 'memberInfo',   // 会员信息
                        router: 'info',
                    },
                    {
                        name: 'memberDetail',   // 会员详情
                        router: 'detail',
                    },
                ],
                localeRouter: 'enjoyIntegraAndDiscount',   // 享受积分、折扣率信息
                //会员详情数据
                detail: {},
                //会员卡的积分折扣率
                cardData: [],
                cardColumnData: [
                    {
                        title: 'IntegralRate',  // 积分率
                        minWidth: 100,
                        field: 'scoreRate'
                    },
                    {
                        title: 'discountRate',  // 折扣率
                        minWidth: 100,
                        field: 'discountRate'
                    },
                ],
                //店铺的积分折扣率
                storeData: [],
                storeColumnData: [
                    {
                        title: 'shop',  // 店铺
                        minWidth: 90,
                        field: 'orgName'
                    },
                    {
                        title: 'IntegralRate',  // 积分率
                        minWidth: 110,
                        field: 'deptScoreRate'
                    },
                    {
                        title: 'discountRate',  // 折扣率
                        minWidth: 100,
                        field: 'deptDiscountRate'
                    },
                ],
                //产品的积分折扣率
                productData: [],
                productColumnData: [
                    {
                        title: 'shop',
                        minWidth: 100,
                        field: 'orgName'
                    },
                    {
                        title: 'goods',
                        minWidth: 100,
                        field: 'productName'
                    },
                    {
                        title: 'IntegralRate',
                        minWidth: 100,
                        field: 'prodScoreRate'
                    },
                    {
                        title: 'discountRate',
                        minWidth: 100,
                        field: 'prodDiscountRate'
                    },
                ],
            }
        },
        methods: {

            //根据会员卡id获取折扣率说明
            queryList ( params ) {
                ajax.post('listMemberCardRate', {
                    cardId: params.cardId,
                }).then(res => {
                    if(res.success){
                        if(res.data){
                            this.cardData = res.data.memberVos || [];
                            this.storeData = res.data.storeVos || [];
                            for(let key in res.data.productMap){
                                res.data.productMap[key].forEach( item => {
                                    this.productData.push(item);
                                })
                            }
                        }
                    } else {
                        this.$Message.warning(res.message || 'listMemberCardRate '+ this.$t('failure') +'！');
                    }
                });
            },

            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    for(let item in params){
                        this[item] = params[item];
                    }
                    //根据会员卡id获取折扣率说明
                    this.queryList(params.detail);
                }else{
                    this.$router.push({
                        name : 'memberInfo'
                    });
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-rate{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        position: relative;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .rate-content{
            padding: 20px 30px;

            .table-wrap{
                margin-bottom: 25px;
                &.width-500{
                    width: 500px;
                }
                &.width-660{
                    width: 660px;
                }
                &.width-1100{
                    max-width: 1100px;
                }
            }

            .title-wrap{
                font-size: $font_size_16px;
                color: $color_333;
                margin-bottom: 15px;
            }

        }

    }
</style>


