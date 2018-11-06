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
                <div class="detail-item">
                    <div>{{todayMemberIncreaseCount | contentFilter}}</div>
                    <div class="detail-label">{{$t("increase_today")}}</div>
                </div>
                <div class="split-line"></div>
                <div class="detail-item">
                    <div>{{yesterdayMemberIncreaseCount | contentFilter}}</div>
                    <div class="detail-label">{{$t("increase_yesterday")}}</div>
                </div>
                <div class="split-line"></div>
                <div class="detail-item">
                    <div>{{monthMemberIncreeaseCount | contentFilter}}</div>
                    <div class="detail-label">{{$t("increase_this_month")}}</div>
                </div>
            </div>
        </div>

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
        components: {},
        data () {
            return {
                //会员今日增长数量
                todayMemberIncreaseCount : '',
                //会员昨日增长数量
                yesterdayMemberIncreaseCount : '',
                //获取本月新增数量
                monthMemberIncreeaseCount : ''
            }
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
                    if(res.success){
                        this.todayMemberIncreaseCount = res.data;
                    }else{
                        this.todayMemberIncreaseCount = '';
                    }
                }).catch(err => {
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
                    if(res.success){
                        this.yesterdayMemberIncreaseCount = res.data;
                    }else{
                        this.yesterdayMemberIncreaseCount = '';
                    }
                }).catch(err => {
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
                    if(res.success){
                        this.monthMemberIncreeaseCount = res.data;
                    }else{
                        this.monthMemberIncreeaseCount = '';
                    }
                }).catch(err => {
                    this.monthMemberIncreeaseCount = '';
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
    }
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
            padding: 25px 0;

            .total{
                height: 50px;
                line-height: 50px;
                color: $color_353B5E;
                font-size: $font_size_28px;
                text-align: center;
                margin-bottom: 25px;

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
    }
</style>
