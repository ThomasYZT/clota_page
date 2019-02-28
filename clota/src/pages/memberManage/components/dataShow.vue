<template>
    <!--会员数据概览-->
    <div class="member-data-show">

        <div class="data-header">
            <div class="title">{{$t("memberDataOverview")}}</div><!--会员数据概览-->
        </div>

        <div class="data-content">
            <div class="total">
                <span class="img"><img src="@/assets/images/crown.svg"/></span>
                <span class="total-label">{{$t("totalMembers")}}</span>
                <span>{{memberSumCount | contentFilter}}</span>
            </div>

            <div class="detail">
                <div class="detail-item"
                     @mouseout="addDetailShow = false">
                    <div
                        @mouseover="showIncreaseDetail(0)">{{todayMemberIncreaseCount | contentFilter}}</div>
                    <div class="detail-label">{{$t("increase_today")}}</div>
                </div>
                <div class="split-line"></div>
                <div class="detail-item"
                     @mouseout="addDetailShow = false">
                    <div
                        @mouseover="showIncreaseDetail(1)">{{yesterdayMemberIncreaseCount | contentFilter}}</div>
                    <div class="detail-label">{{$t("increase_yesterday")}}</div>
                </div>
                <div class="split-line"></div>
                <div class="detail-item"
                     @mouseout="addDetailShow = false">
                    <div
                        @mouseover="showIncreaseDetail(2)">{{monthMemberIncreeaseCount | contentFilter}}</div>
                    <div class="detail-label">{{$t("increase_this_month")}}</div>
                </div>
            </div>
        </div>

        <transition name="fade">
            <div class="add-member-detail"
                 :style="addDetailStyle"
                 v-loading="loadingMore"
                 v-if="addDetailShow">
                <ul class="detail-list-wrap">
                    <li v-for="(item,index) in addMemberDetailInfo"
                        :key="index"
                        class="detail-list">
                        {{$t('colonSetting',{ key : (item.typeName + '-' +  item.levelDesc) })}}{{item.quantity}}
                    </li>
                </ul>
                <span class="empty-text"
                      v-if="addMemberDetailInfo.length < 1">
                {{$t('noData')}}
            </span>
            </div>
        </transition>

    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    export default {
        props : {
            //会员总数
            'member-sum-count' : {
                type : [String,Number],
                default : ''
            }
        },
        components : {},
        data () {
            return {
                //会员今日增长数量
                todayMemberIncreaseCount : '',
                //会员昨日增长数量
                yesterdayMemberIncreaseCount : '',
                //获取本月新增数量
                monthMemberIncreeaseCount : '',
                //新增详情样式
                addDetailStyle : {
                    left : '',
                    minWidth : ''
                },
                //是否显示新增详情
                addDetailShow : false,
                //新增会员详情
                addMemberDetailInfo : [],
                //是否在加载中
                loadingMore : false
            };
        },
        methods : {
            /**
             * 获取今日增长数量
             */
            getTodayIncreaseMemberCount () {
                ajax.post('getIncreaseMemberCount',{
                    startDate : new Date().format('yyyy-MM-dd'),
                    endDate : new Date().format('yyyy-MM-dd'),
                }).then(res => {
                    if (res.success) {
                        this.todayMemberIncreaseCount = res.data;
                    } else {
                        this.todayMemberIncreaseCount = '';
                    }
                }).catch(() => {
                    this.todayMemberIncreaseCount = '';
                });
            },
            /**
             * 获取昨日增长数量
             */
            getYesterdayIncreaseMemberCount () {
                ajax.post('getIncreaseMemberCount',{
                    startDate : new Date().addDays(-1).format('yyyy-MM-dd'),
                    endDate : new Date().addDays(-1).format('yyyy-MM-dd'),
                }).then(res => {
                    if (res.success) {
                        this.yesterdayMemberIncreaseCount = res.data;
                    } else {
                        this.yesterdayMemberIncreaseCount = '';
                    }
                }).catch(() => {
                    this.yesterdayMemberIncreaseCount = '';
                });
            },
            /**
             * 获取本月
             */
            getMonthIncreaseMemberCount () {
                ajax.post('getIncreaseMemberCount',{
                    startDate : new Date().addDays(-new Date().getDate() + 1).format('yyyy-MM-dd'),
                    endDate : new Date().addDays(-new Date().getDate()).addMonths(1).format('yyyy-MM-dd'),
                }).then(res => {
                    if (res.success) {
                        this.monthMemberIncreeaseCount = res.data;
                    } else {
                        this.monthMemberIncreeaseCount = '';
                    }
                }).catch(() => {
                    this.monthMemberIncreeaseCount = '';
                });
            },
            /**
             * 鼠标浮动到新增上显示新增的各种会员的个个数
             * @param{Number} index 新增的类型
             */
            showIncreaseDetail (index) {
                let eleParentWidth = this.$el.querySelector('.detail').offsetWidth;
                this.addDetailStyle.left = eleParentWidth * index / 3 + 'px';
                this.addDetailStyle.minWidth = eleParentWidth / 3 + 'px';
                if (index === 0) {
                    this.getMemberIncreaseDetail({
                        startDate : new Date().format('yyyy-MM-dd'),
                        endDate : new Date().format('yyyy-MM-dd'),
                    });
                } else if (index === 1) {
                    this.getMemberIncreaseDetail({
                        startDate : new Date().addDays(-1).format('yyyy-MM-dd'),
                        endDate : new Date().addDays(-1).format('yyyy-MM-dd'),
                    });
                } else if (index === 2) {
                    this.getMemberIncreaseDetail({
                        startDate : new Date().addDays(-new Date().getDate() + 1).format('yyyy-MM-dd'),
                        endDate : new Date().addDays(-new Date().getDate()).addMonths(1).format('yyyy-MM-dd'),
                    });
                }
            },
            /**
             * 获取增长数量详情
             * @param{String} startDate 开始时间
             * @param{String} endDate 结束时间
             */
            getMemberIncreaseDetail ({ startDate,endDate }) {
                this.loadingMore = true;
                ajax.post('getIncreaseMemberCountDetail',{
                    startDate,
                    endDate
                },null,false).then(res => {
                    if (res.success) {
                        this.addMemberDetailInfo = res.data ? res.data : [];
                        this.addDetailShow = true;
                    } else {
                        this.addMemberDetailInfo = [];
                    }
                }).catch(() => {
                    this.addMemberDetailInfo = [];
                }).finally(() => {
                    this.loadingMore = false;
                });
            }

        },
        created () {
            //获取今日增长数量
            this.getTodayIncreaseMemberCount();
            //获取昨日增长数量
            this.getYesterdayIncreaseMemberCount();
            //获取本月增长数量
            this.getMonthIncreaseMemberCount();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-data-show{
        @include block_outline();
        background: $color_fff;
        border: 1px solid $color_DFE2E5;
        border-radius: 4px;

        .data-header{
            height: 50px;
            line-height: 48px;
            padding: 0 20px;
            border-bottom: 1px solid $color_E1E1E1;
            @include clearfix();

            .title{
                display: inline-block;
                color: $color_353B5E;
                font-size: $font_size_18px;
            }
        }

        .data-content{
            padding: 30px 0;

            .total{
                height: 50px;
                line-height: 50px;
                color: $color_353B5E;
                font-size: $font_size_28px;
                text-align: center;
                margin-bottom: 40px;

                .img{
                    width: 52px;
                    height: 52px;
                    margin-right: 5px;
                    display: inline-block;
                }
                .total-label{
                    margin-right: 15px;
                    font-size: $font_size_18px;
                }
            }

            .detail{

                .detail-item{
                    display: inline-block;
                    width: 31.5%;
                    color: $color_000_085;
                    font-size: $font_size_28px;
                    text-align: center;
                    @include clearfix();

                    .detail-label{
                        color: $color_999;
                        font-size: $font_size_14px;
                    }
                }
                .split-line{
                    position: relative;
                    top: -10px;
                    display: inline-block;
                    width: 1px;
                    height: 40px;
                    background-color: $color_eee;
                }
            }
        }

        .add-member-detail{
            @include absolute_pos(absolute,240px);
            background: $color_fff;
            border: 1px solid #eee;
            box-shadow: 0 2px 6px 0 rgba(0,0,0,.1);
            transition: all 0.3s;
            z-index: 9;

            &::before{
                @include absolute_pos(absolute,-4.5px,0,auto,0);
                margin: 0 auto;
                content : '';
                display: block;
                @include block_outline(10px,10px);
                transform: rotate(45deg) ;
                background: $color_fff;
                border-top: 1px solid #eee;
                border-left: 1px solid #eee;
                /*box-shadow: 0 2px 6px 0 rgba(0,0,0,.1);*/
            }

            .detail-list-wrap{
                min-height: 100px;
                max-height: 300px;
                overflow: auto;
            }

            .detail-list{
                @include block_outline($height : 30px);
                line-height: 30px;
                @include overflow_tip();
                padding: 0 10px;
            }

            .empty-text{
                color: $color_999;
                @include center_center();
            }
        }
    }
</style>
