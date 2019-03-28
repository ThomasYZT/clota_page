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

            <div class="table-wrap" >
                <div class="title-wrap">{{$t('privalige.member-right')}}</div><!--会员权益-->
                <ul class="member-rights" v-if="memberRights.length > 0">
                    <template v-for="(item,index) in memberRights">
                        <li class="member-rights-list"
                            v-if="item.type === 'birthday'"
                            v-w-title="$t('birthdayRights',{ num : item.rule.num,discount : item.rule.discount })"
                            :key="index">
                            {{$t('birthdayRights',{ num : item.rule.num,discount : item.rule.discount })}}
                        </li>
                        <li class="member-rights-list"
                            v-else-if="item.type === 'ticket'"
                            v-w-title="$t('ticketRights',{ num : item.rule.num,discount : item.rule.discount,scene : item.rule.scenicName })"
                            :key="index">
                            {{$t('ticketRights',{ num : item.rule.num,discount : item.rule.discount,scene : item.rule.scenicName })}}
                        </li>
                        <li class="member-rights-list"
                            v-w-title="item.content"
                            v-else-if="item.type === 'desc'"
                            :key="index">{{item.content}}
                        </li>
                    </template>
                </ul>
                <no-data v-else class="no-data-wrap">
                </no-data>
            </div>
            <template v-if="showIntegerInfo">
                <div class="general-discount-title">{{$t('memberRightDescription')}}</div>
                <div class="rights-wrap">
                    <div class="table-wrap" :class="{'width-500' : lang === 'zh-CN' , 'width-660' : lang === 'en'}">
                        <div class="title-normal">{{$t('enjoyCouponByMemberLevel')}}</div><!--按会员级别享受积分、折扣率信息-->
                        <table-com
                            :column-data="cardColumnData"
                            :table-data="cardData"
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

                    <div class="table-wrap width-660">
                        <div class="title-normal">{{$t('enjoyCouponByShop')}}</div><!--按店铺享受积分、折扣率信息-->
                        <table-com
                            :column-data="storeColumnData"
                            :table-data="storeData"
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

                    <div class="table-wrap width-1100">
                        <div class="title-normal">{{$t('enjoyCouponByProduct')}}</div><!--按产品享受积分、折扣率信息-->
                        <table-com
                            :column-data="productColumnData"
                            :table-data="productData"
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
            <template v-if="activityCanShow && showIntegerInfo">
                <div class="general-discount-title">{{$t('specialActivityMemberRight')}}</div>
                <special-activity-info :activity-card-data="activityCardData"
                                       :activity-store-data="activityStoreData"
                                       :activity-product-data="activityProductData">
                </special-activity-info>
            </template>

            <div class="general-discount-title" v-if="specialDiscountInfo.length > 0">{{$t('specialDiscountRate')}}</div>
            <template v-for="(item,index) in specialDiscountInfo">
                <ul class="discount-title" :key="'ul' + index">
                    <li class="desc-info">
                        <span class="key">{{$t('colonSetting',{ key : $t('startAndEndTime') })}}</span>
                        <span class="value">{{item.startDate | timeFormat('yyyy-MM-dd') | contentFilter}} ~ {{item.endDate | timeFormat('yyyy-MM-dd') | contentFilter}}</span>
                    </li>
                    <li class="desc-info">
                        <span class="key">{{$t('colonSetting',{ key : $t('validDate') })}}</span>
                        <span class="value">{{item.effDateTxt | contentFilter}}</span>
                    </li>
                    <li class="desc-info">
                        <span class="key">{{$t('colonSetting',{ key : $t('validDateEveryDay') })}}</span>
                        <span class="value">{{item.startTime | contentFilter}} ~ {{item.endTime | contentFilter}}</span>
                    </li>
                </ul>
                <special-integer-info :key="'div' + index"
                                       :special-discount-info="item.discountRateVo.memberVos"
                                       :special-discount-store-data="item.discountRateVo.storeVos"
                                       :activity-product-map="item.discountRateVo.productMap">
                </special-integer-info>
            </template>
        </div>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { mapGetters } from 'vuex';
    import specialActivityInfo from './specialActivityInfo';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import specialIntegerInfo from './specialIntegerInfo';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            tableCom,
            specialActivityInfo,
            noData,
            specialIntegerInfo
        },
        computed : {
            ...mapGetters({
                lang : 'lang',
                memberConfigInfo : 'memberConfigInfo'
            }),
            //会员权益
            memberRights () {
                let result = [];
                if (this.memberInfo && this.memberInfo.rights) {
                    result = JSON.parse(this.memberInfo.rights);
                }
                return result.filter(item => item.isEnable);
            },
            //特殊活动积分折扣率是否需要显示
            activityCanShow () {
                return (this.activityCardData && this.activityCardData.length > 0)
                        || (this.activityStoreData && this.activityStoreData.length > 0)
                        || (this.activityProductData && this.activityProductData.length > 0);
            },
            //是否显示积分折扣信息
            showIntegerInfo () {
                return this.memberConfigInfo && this.memberConfigInfo['memberPoint'] && this.memberConfigInfo['memberPoint'] === 'true';
            },
            //面包屑信息
            localeRouter () {
                if (this.showIntegerInfo) {
                    return 'enjoyIntegraAndDiscount';// 享受积分、折扣率信息
                } else {
                    return 'privalige.member-right'; //会员权益
                }
            }
        },
        data () {
            return {
                beforeRouterList : [
                    {
                        name : 'memberInfo', // 会员信息
                        router : {
                            name : 'memberInfo'
                        },
                    },
                    {
                        name : 'memberDetail', // 会员详情
                        router : {
                            name : 'infoDetail'
                        },
                    },
                ],
                //会员详情数据
                detail : {},
                //会员卡的积分折扣率
                cardData : [],
                //特定活动会员卡的积分折扣率
                activityCardData : [],
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
                //店铺的积分折扣率
                storeData : [],
                //特定活动店铺的积分折扣率
                activityStoreData : [],
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
                //产品的积分折扣率
                productData : [],
                //特定活动产品的积分折扣率
                activityProductData : [],
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
                //会员信息
                memberInfo : {},
                //特殊积分折扣率信息
                specialDiscountInfo : []
            };
        },
        methods : {

            //根据会员卡id获取折扣率说明
            queryList ( params ) {
                ajax.post('listMemberCardRate', {
                    cardId : params.id,
                }).then(res => {
                    if (res.success && res.data) {
                        let commonDiscountInfo = res.data ? res.data.common : {};
                        let activityDiscountInfo = res.data ? res.data.activity : {};
                        this.memberInfo = commonDiscountInfo.levelModel;
                        this.cardData = commonDiscountInfo.memberVos;
                        this.activityCardData = activityDiscountInfo.memberVos;
                        this.storeData = commonDiscountInfo.storeVos;
                        this.activityStoreData = activityDiscountInfo.storeVos;
                        this.specialDiscountInfo = res.data.activity.map(item => {
                            let effDateTxt = item.effDate.split(',').map(day => {
                                if (day === '0') {
                                    return this.$t('Sunday');
                                } else if (day === '1') {
                                    return this.$t('Monday');
                                } else if (day === '2') {
                                    return this.$t('Tuesday');
                                } else if (day === '3') {
                                    return this.$t('Wednesday');
                                } else if (day === '4') {
                                    return this.$t('Thursday');
                                } else if (day === '5') {
                                    return this.$t('Friday');
                                } else if (day === '6') {
                                    return this.$t('Saturday');
                                }
                            }).join('、');
                            return {
                                ...item,
                                effDateTxt
                            };
                        });
                        for (let key in commonDiscountInfo.productMap) {
                            if ( commonDiscountInfo.productMap[key] && commonDiscountInfo.productMap[key].length > 0) {
                                commonDiscountInfo.productMap[key].forEach( item => {
                                    this.productData.push(item);
                                });
                            }
                        }
                        for (let key in activityDiscountInfo.productMap) {
                            if ( activityDiscountInfo.productMap[key] && activityDiscountInfo.productMap[key].length > 0) {
                                activityDiscountInfo.productMap[key].forEach( item => {
                                    this.activityProductData.push(item);
                                });
                            }
                        }
                    } else {
                        this.memberInfo = {};
                        this.cardData = [];
                        this.storeData = [];
                    }
                });
            },

            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    for (let item in params) {
                        this[item] = params[item];
                    }
                    //根据会员卡id获取折扣率说明
                    this.queryList(params.detail);
                } else {
                    this.$router.push({
                        name : 'memberInfo'
                    });
                }
            },

        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-rate{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;
        position: relative;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            background: $color_F4F6F8;
        }

        .rate-content{
            padding: 20px 30px;

            .general-discount-title{
                font-size: $font_size_16px;
                color: $color_333;
                margin-bottom: 15px;
            }

            .rights-wrap{
                padding: 0 10px;
            }

            /deep/ .title-normal{
                font-size: $font_size_14px;
                color: $color_666;
                margin-bottom: 5px;
            }

            /deep/ .table-wrap{
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

                .member-rights{
                    overflow: auto;

                    .member-rights-list{
                        @include block_outline($height : 25);
                        @include overflow_tip();
                        padding: 6px 0 6px 15px;
                        line-height: 13px;
                        font-size: $font_size_12px;
                        color: $color_666;
                        position: relative;

                        &::before{
                            content: '';
                            @include block_outline(4px,4px,false);
                            background: $color_yellow;
                            border-radius: 2px;
                            @include absolute_pos(absolute,$top : 10px,$left : 0);
                        }
                    }
                }
            }

            .title-wrap{
                font-size: $font_size_16px;
                color: $color_333;
                margin-bottom: 15px;
            }

        }

        .no-data-wrap{
            position: relative;
            @include block_outline(500px,200px);
        }

        .discount-title{
            padding: 0 10px;
            font-size: 14px;
            color: #666666;
            margin-bottom: 20px;
        }
    }
</style>


