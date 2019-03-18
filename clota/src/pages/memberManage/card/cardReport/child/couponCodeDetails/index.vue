<!--
    优惠券券码详情页面
    作者：杨泽涛
-->
<template>
    <div class="coupon-code-details">
        <!-- 面包屑导航 -->
        <breadCrumbHead :locale-router="'couponCodeDetails'"
                        :before-router-list="beforeRouterList"></breadCrumbHead>

        <div class="head-toolbox">
            <div class="left-tool">
                <div class="button-wrapper">
                    <ButtonGroup>
                        <!-- 生成数量 -->
                        <Button type="default"
                                @click="changeType('generationNum')"
                                :class="{'selected' : type === 'generationNum'}"
                                class="tab-btn">{{$t('generationNum')}}</Button>
                        <!-- 剩余数量 -->
                        <Button type="default"
                                @click="changeType('remainingAmount')"
                                :class="{'selected' : type === 'remainingAmount'}"
                                class="tab-btn">{{$t('remainingAmount')}}</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>

        <div class="head-info">
            <div class="info-item">
                <span class="label-title">{{$t('colonSetting', { key : $t('couponType') })}}</span>
                <span class="info">{{$t(couponInfo.couponType) | contentFilter}}</span>
            </div>
            <div class="info-item">
                <span class="label-title">{{$t('colonSetting', { key : $t('applicationScenario') })}}</span>
                <span class="info">{{couponInfo.appScene ? $t('coupon.' + couponInfo.appScene) : '-'}}</span>
            </div>
            <div class="info-item">
                <span class="label-title">{{$t('colonSetting', { key : $t('validityPeriod') })}}</span>
                <span class="info" v-if="couponInfo.appScene === 'spread'">
                    {{couponInfo.effectiveTime | timeFormat('yyyy-MM-dd')}}--{{couponInfo.expireTime | timeFormat('yyyy-MM-dd')}}
                </span>
                <span class="info" v-else>{{couponInfo.effDays | contentFilter}}</span>
            </div>
            <div class="info-item">
                <span class="label-title">{{$t('colonSetting', { key : $t('wetherEffective') })}}</span>
                <span class="info">{{couponInfo.status === 'valid' ? '有效' : '无效'  | contentFilter}}</span>
            </div>
        </div>

        <div class="table-wrapper">
            <table-com v-if="Object.keys(couponInfo).length > 0"
                       :column-data="columnData"
                       :table-data="tableData"
                       :border="true"
                       :show-pagination="true"
                       :total-count="totalCount"
                       :ofset-height="200"
                       :page-no-d.sync="pageNo"
                       :page-size-d.sync="pageSize"
                       @query-data="queryList">
            </table-com>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins';
    import tableCom from '@/components/tableCom/tableCom';
    import { couponCodeDetailsHead } from './couponCodeDetailsConfig';
    import ajax from '@/api/index';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            lifeCycleMixins,
            tableCom
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'cardReport',
                        router : {
                            name : 'cardReport',
                        }
                    }
                ],
                //优惠券券码详情类型
                type : '',
                //优惠券信息
                couponInfo : {},
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页记录数
                pageSize : 10
            };
        },
        computed : {
            //卡券状态
            couponStatus () {
                if (this.type === 'generationNum') {
                    return '';
                } else if (this.type === 'remainingAmount') {
                    return 'wait';
                } else {
                    return '';
                }
            },
            //表头数据
            columnData () {
                let baseColoum = Array.from(couponCodeDetailsHead);
                //代金券 cash_coupon 兑换券 exchange_coupon 折扣券 discount_coupon
                if (this.couponInfo.couponType === 'cash_coupon') {
                    baseColoum.unshift({
                        title : '卡券面值',
                        minWidth : 150,
                        field : 'nominalValue',
                    });
                    return baseColoum
                } else if (this.couponInfo.couponType === 'exchange_coupon') {
                    baseColoum.unshift({
                        title : '可兑换商品',
                        minWidth : 150,
                        field : 'conditionGoodNames',
                    });
                    return baseColoum;
                } else if (this.couponInfo.couponType === 'discount_coupon') {
                    baseColoum.unshift({
                        title : '卡券折扣',
                        minWidth : 150,
                        field : 'nominalValue',
                    });
                    return baseColoum;
                } else {
                    baseColoum.unshift({
                        title : '卡券面值',
                        minWidth : 150,
                        field : 'nominalValue',
                    });
                    return baseColoum;
                }
            }
        },
        methods : {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && params.type && params.couponInfo) {
                    this.type = params.type;
                    this.couponInfo = params.couponInfo;
                } else {
                    this.$router.push({
                        name : 'cardReport'
                    });
                }
            },
            /**
             * 优惠券券码详情类型切换
             * @param type
             */
            changeType (type) {
                this.type = type;
                this.queryList();
            },
            /**
             * 列表查询
             */
            queryList () {
                ajax.post('queryReportDetail', {
                    couponId : this.couponInfo.id,
                    batchId : this.couponInfo.batchId,
                    couponStatus : this.couponStatus,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .coupon-code-details {
        .head-toolbox {
            display: flex;
            height: 60px;
            line-height: 60px;
            .left-tool {
                flex: 1 1;
                flex-basis: 60%;
                padding: 0 20px;
            }
            .right-tool {
                flex: 0 1;
                flex-basis: 40%;
                padding: 0 30px;
                text-align: right;
            }
        }

        .button-wrapper {
            display: inline-block;
            /deep/ .selected {
                border: 1px solid #2F70DF !important;
                z-index: 10;
                color: #2F70DF;
            }

            /deep/ .tab-btn {
                padding-right: 40px;
                padding-left: 40px;
                background-color: #fff;
                outline: none;
            }
        }

        .head-info {
            margin: 0 20px;
            padding-left: 10px;
            height: 50px;
            line-height: 50px;
            background: rgba(4,111,219,0.05);

            .info-item {
                display: inline-block;
                margin-right: 30px;
                .label-title {
                    font-size: 14px;
                    color: #333333;
                }
                .info {
                    font-size: 14px;
                    color: #666666;
                }
            }
        }

        .table-wrapper {
            margin-top: 10px;
            padding: 0 20px;
        }
    }
</style>
