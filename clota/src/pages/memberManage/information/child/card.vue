<template>
    <!--会员卡包-->
    <div class="member-info-card">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :before-router-list="breadRouterList"
                :locale-router="$t('memberCard')">
            </bread-crumb-head>
        </div>

        <div class="card-content" v-if="cardInfo.annual.length > 0 || cardInfo.times.length > 0">
            <!--优惠券信息-->
            <!--<div class="content-info">
                <div class="title">{{$t('couponInfo')}}</div>
                <div class="tabs-wrap">
                    <ButtonGroup>
                        <Button type="primary">{{$t('toBeUsed')}}</Button>
                        <Button type="ghost">{{$t('used')}}</Button>
                    </ButtonGroup>
                </div>
                <div class="table-wrap">
                    <el-table
                        :data="tableData"
                        :border="false"
                        style="width: 100%">
                        <el-table-column
                            prop="id"
                            :label="$t('SN')"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            :label="$t('productName')"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            :label="$t('amount')"
                            width="60">
                        </el-table-column>
                        <el-table-column
                            prop="content"
                            :label="$t('useCondition')">
                        </el-table-column>
                        <el-table-column
                            prop="range"
                            :label="$t('validityPeriod')"
                            width="330">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            :label="$t('ticketBuyingDate')"
                            width="180">
                        </el-table-column>
                    </el-table>
                </div>
            </div>-->

            <div class="content-info" v-for="annualCard in cardInfo.annual" :key="annualCard.id">
                <div class="title">{{$t('yearCardInfo')}}</div>
                <div class="form-wrap">
                    <div class="form-item-wrap"><label>{{$t('yearCardId')}}</label><span>{{annualCard.vipCardNo | contentFilter}}</span></div><!--年卡编号-->
                    <div class="form-item-wrap"><label>{{$t('yearCardName')}}</label><span>{{annualCard.vipCardName | contentFilter}}</span></div><!--年卡名称-->
                    <div class="form-item-wrap"><label>{{$t('physicalCardNo')}}：</label><span>{{annualCard.physicalCardNo | contentFilter}}</span></div><!--物理卡号-->
                    <div class="form-item-wrap"><label>{{$t('fingerRegister')}}：</label><span>{{annualCard.isFingerPrint=='true' ? $t('yes') : $t('no')}}</span></div><!--是否指纹注册-->
                    <div class="form-item-wrap"><label>{{$t('effectiveStartDate')}}：</label><span>{{annualCard.validFrom | contentFilter}}</span></div><!--有效开始日期-->
                    <div class="form-item-wrap"><label>{{$t('effectiveEndDate')}}：</label><span>{{annualCard.validTo | contentFilter}}</span></div><!--有效开结束日期-->
                    <div class="form-item-wrap"><label>{{$t('saleDate')}}：</label><span>{{annualCard.saleDate | contentFilter}}</span></div><!--销售日期-->
                    <div class="form-item-wrap"><label>{{$t('cardOpeningUnit')}}：</label><span>{{annualCard.issuser | contentFilter}}</span></div><!--开卡单位-->
                    <div class="form-item-wrap"><label>{{$t('annualCardStatus')}}：</label><span>{{cardStatus(annualCard.status)}}</span></div><!--年卡状态-->
                    <div class="form-item-wrap"><label>{{$t('annualCardRemark')}}：</label><span>{{annualCard.note | contentFilter}}</span></div><!--年卡备注-->
                </div>
                <div class="label"></div>
                <div class="table-wrap">
                    <table-com
                        :ofsetHeight="170"
                        :column-data="cardOwnerHead"
                        :table-data="annualCard.availPersons ? JSON.parse(annualCard.availPersons) : []"
                        :table-com-min-height="300"
                        :border="true">
                        <el-table-column
                            slot="column4"
                            slot-scope="row"
                            :label="row.title"
                            :width="row.width"
                            fixed="right"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">{{$t(scope.row.gender)}}</template>
                        </el-table-column>
                    </table-com>
                </div>
                <!--可使用范围-->
                <div class="label range"></div>
                <ul class="range-list">
                    <li v-for="(range,index) in annualCard.availOrgs ? JSON.parse(annualCard.availOrgs) : []" :key="index">{{range.orgName}}</li>
                </ul>
                <!--使用说明-->
                <div class="label instruction"></div>
                <div class="range-list">{{annualCard.instructions | contentFilter}}</div>
                <div class="table-wrap">
                    <table-com
                        :ofsetHeight="170"
                        :column-data="cardInfosHead"
                        :table-data="JSON.parse(annualCard.cardInfos) || []"
                        :table-com-min-height="300"
                        :border="true">
                    </table-com>
                </div>
            </div>

            <div class="content-info" v-for="timesCard in cardInfo.times" :key="timesCard.id">
                <div class="title">{{$t('timesCardInfo')}}</div><!--次卡信息-->
                <div class="form-wrap">
                    <div class="form-item-wrap"><label>{{$t('timesCardNo')}}：</label><span>{{timesCard.vipCardNo | contentFilter}}</span></div><!--次卡编号-->
                    <div class="form-item-wrap"><label>{{$t('timesCardName')}}：</label><span>{{timesCard.vipCardName | contentFilter}}</span></div><!--次卡名称-->
                    <div class="form-item-wrap"><label>{{$t('physicalCardNo')}}：</label><span>{{timesCard.physicalCardNo | contentFilter}}</span></div><!--物理卡号-->
                    <div class="form-item-wrap"><label>{{$t('fingerRegister')}}：</label><span>{{timesCard.isFingerPrint=='true' ? $t('yes') : $t('no')}}</span></div><!--是否指纹注册-->
                    <div class="form-item-wrap"><label>{{$t('effectiveStartDate')}}：</label><span>{{timesCard.validFrom | contentFilter}}</span></div><!--有效开始日期-->
                    <div class="form-item-wrap"><label>{{$t('effectiveEndDate')}}：</label><span>{{timesCard.validTo | contentFilter}}</span></div><!--有效开结束日期-->
                    <div class="form-item-wrap"><label>{{$t('saleDate')}}：</label><span>{{timesCard.saleDate | contentFilter}}</span></div><!--销售日期-->
                    <div class="form-item-wrap"><label>{{$t('cardOpeningUnit')}}：</label><span>{{timesCard.issuser | contentFilter}}</span></div><!--开卡单位-->
                    <div class="form-item-wrap"><label>{{$t('timesCardStatus')}}：</label><span>{{cardStatus(timesCard.status)}}</span></div><!--次卡状态-->
                    <div class="form-item-wrap"><label>{{$t('timesCardRemark')}}：</label><span>{{timesCard.note | contentFilter}}</span></div><!--次卡备注-->
                    <div class="form-item-wrap"><label>{{$t('totalTimes')}}：</label><span>{{timesCard.totalTimes | contentFilter}}</span></div><!--总次数-->
                    <div class="form-item-wrap"><label>{{$t('usableTimesNow')}}：</label><span>{{timesCard.leftTimes | contentFilter}}</span></div><!--现在可用次数-->
                </div>
                <div class="label"></div>
                <div class="table-wrap">
                    <table-com
                        :ofsetHeight="170"
                        :column-data="cardOwnerHead"
                        :table-data="timesCard.availPersons ? JSON.parse(timesCard.availPersons) : []"
                        :table-com-min-height="300"
                        :border="true">
                        <el-table-column
                            slot="column4"
                            slot-scope="row"
                            :label="row.title"
                            :width="row.width"
                            fixed="right"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">{{$t(scope.row.gender)}}</template>
                        </el-table-column>
                    </table-com>

                </div>
                <!--可使用范围-->
                <div class="label range"></div>
                <ul class="range-list">
                    <li v-for="(range,index) in timesCard.availOrgs ? JSON.parse(timesCard.availOrgs) : []" :key="index">{{range.orgName}}</li>
                </ul>
                <!--使用说明-->
                <div class="label instruction"></div>
                <div class="range-list">{{timesCard.instructions | contentFilter}}</div>
                <div class="table-wrap">
                    <table-com
                        :ofsetHeight="170"
                        :column-data="cardInfosHead"
                        :table-data="timesCard.cardInfos ? JSON.parse(timesCard.cardInfos) : []"
                        :table-com-min-height="300"
                        :border="true">
                    </table-com>
                </div>
            </div>
        </div>

        <div class="no-data-wrap" v-if="cardInfo.annual.length < 1 && cardInfo.times.length < 1">
            <!--无数据组件-->
            <no-data >
            </no-data>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import ajax from '@/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import {cardOwnerHead, cardInfosHead} from '../infoListConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import noData from '@/components/noDataTip/noData-tip.vue';

    export default {
        components: {breadCrumbHead, tableCom, noData},
        mixins : [lifeCycleMixins],
        data () {
            return {
                // 面包屑路由列表
                breadRouterList: [
                    {
                        name: 'memberInfo',
                        router: {
                            name : 'memberInfo'// 会员信息
                        }
                    },
                    {
                        name: 'memberDetail',
                        router: {
                            name : 'infoDetail'// 会员信息
                        }
                    }    // 会员详情
                ],

                // 年卡、次卡信息数据
                cardInfo: {
                    annual: [],
                    times: []
                },
                // 年卡、次卡可使用人表头
                cardOwnerHead: cardOwnerHead,
                // 年卡、次卡可使用的第三方卡表头
                cardInfosHead: cardInfosHead,
            }
        },
        created() {
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    this.getCardPackage(params.cardPkg ? params.cardPkg.cardId : '');
                }else{
                    this.$router.push({
                        name : 'infoDetail'
                    });
                }
            },
            /**
             * 获取卡包信息
             */
            getCardPackage(cardId) {
                ajax.post('getCardPackage', {
                    cardId: cardId
                }).then(res => {
                    if (res.success) {
                        if (res.data) {
                            // 年卡数据
                            this.cardInfo.annual = res.data.filter((item,i) => {
                                return item.vipType == 'annual';
                            }) || [];
                            // 次卡数据
                            this.cardInfo.times = res.data.filter((item,i) => {
                                return item.vipType == 'times';
                            }) || [];
                        }
                    } else {
                        this.$Message.error(res.message || '');
                    }

                });
            },
            /**
             * 年卡、次卡的状态
             * @param status -- 状态code
             * @returns {string}
             */
            cardStatus(status) {
                let statusName = '-';
                switch (status) {
                    case 'valid' :
                        statusName = 'activate';      // 激活
                        break;
                    case 'invalid' :
                        statusName = 'unactivated';        // 未激活
                        break;
                    case 'froze' :
                        statusName = 'memberStatusFrozen';        // 已冻结
                        break;
                    case 'expire' :
                        statusName = 'overdue';       // 已到期
                        break;
                }
                return this.$t(statusName);
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-info-card{
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

        .card-content{
            padding: 20px 30px;

            .content-info{
                margin-bottom: 30px;

                .title{
                    font-size: $font_size_16px;
                    color: $color-333;
                    line-height: 24px;
                }

                .tabs-wrap{
                    margin-top: 15px;
                    margin-bottom: 10px;
                    /deep/ .ivu-btn-group{
                        .ivu-btn{
                            width: 124px;
                            padding: 3px 15px
                        }
                    }
                }

                .form-wrap{
                    width: 100%;
                    margin-top: 10px;
                    @include clearfix();

                    .form-item-wrap{
                        width: 30%;
                        float: left;
                        margin-right: 10px;
                        height: 35px;
                        line-height: 35px;
                        font-size: $font_size_14px;
                        color: $color-666;
                        >label{
                            color: $color-333;
                        }
                    }
                }

                .label{
                    border-bottom: 1px dashed $color_E1E1E1;
                    margin-bottom: 20px;
                    margin-top: -5px;
                    &::before{
                        content: '可使用人信息';
                        top: 10px;
                        position: relative;
                        background: #FFFFFF;
                        padding-right: 10px
                    }
                    &.range{
                        margin-top: 0px;
                        &::before{
                            content: '可用范围';
                        }
                    }
                    &.instruction{
                        margin-top: 0px;
                        &::before{
                            content: '使用说明';
                        }
                    }
                }

                .range-list {
                    margin-bottom: 15px;
                    > li {
                        line-height: 20px;
                    }
                }

            }
        }

        .no-data-wrap {
            position: relative;
            height: calc(100% - 50px);
        }

    }
</style>
