<template>
    <!--会员管理--会员主页-->
    <div class="member-manage-home">

        <div class="home-data-show">

            <!--会员数据概览-->
            <div class="data-show-left">
                <data-total :member-sum-count="memberSumCount">
                </data-total>
            </div>

            <!--会员分布数据-->
            <div class="data-show-right">
                <!--会员3期暂时去掉-->
                <!--<chart-pie>-->
                <!--</chart-pie>-->
                <member-type-distribution>
                </member-type-distribution>
            </div>

        </div>

        <!--个人会员卡分布信息-->
        <div class="home-chart">
            <div class="chart-header">{{$t("personelMemberCardNum")}}</div>
            <div class="chart-content">
                <personal-card-info>
                </personal-card-info>
            </div>
        </div>

        <!--会员消费数据概览-->
        <div class="home-chart" v-if="showMemberRecharge">
            <div class="chart-header">{{$t("memberConsumptionOverview")}}</div>
            <div class="chart-content">
                <chart-line :data="vipPlace" type="money">
                </chart-line>
            </div>
        </div>

        <!--会员积分数据概览-->
        <div class="home-chart" v-if="showMemberPoint">
            <div class="chart-header">{{$t("memberIntergralOverview")}}</div>
            <div class="chart-content">
                <chart-line :data="integrationPlace" type="integra">
                </chart-line>
            </div>
        </div>

    </div>
</template>

<script>

    import dataTotal from '../components/dataShow.vue';
    // 会员3期暂时去掉
    // import chartPie from '../components/chartPie.vue';
    import memberTypeDistribution from '../components/memberTypeDistribution';
    import chartLine from '../components/chartLine.vue';
    import ajax from '@/api/index.js';
    import memberDataOverview from '../components/memberDataOverview';
    import personalCardInfo from '../components/personalCardInfo';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            dataTotal,
            // 会员3期暂时去掉
            // chartPie,
            chartLine,
            memberDataOverview,
            memberTypeDistribution,
            personalCardInfo
        },
        data () {
            return {
                // 会员分布数据
                vipPlace : {
                    label1 : "totalConsumption_thisWeek",
                    label2 : "totalConsumption_lastWeek",
                    total1 : '',
                    total2 : '',
                },
                // 会员积分数据
                integrationPlace : {
                    label1 : 'sendIntegral_thisWeek',
                    label2 : 'consumeIntegral_thisWeek',
                    total1 : '',
                    total2 : '',
                },
                //会员总数数据
                memberSumCount : ''
            };
        },
        methods : {
            /**
             * 获取会员总量信息
             */
            getMemberSumCount () {
                ajax.post('getMemberSumCount').then(res => {
                    if (res.success) {
                        this.memberSumCount = res.data;
                    } else {
                        this.memberSumCount = '';
                    }
                }).catch(err => {
                    this.memberSumCount = '';
                });
            },
            /**
             * 获取本周会员消费金额
             */
            getNowWeekMemberConsumeSum () {
                ajax.post('getMemberConsumeSumGroupBy',{
                    startDate : new Date().addDays(-new Date().getDay() === 0 ? -new Date().getDay() - 6 : -new Date().getDay() + 1).format('yyyy-MM-dd'),
                    endDate : new Date().addDays(new Date().getDay() === 0 ? 0 : 7 - new Date().getDay()).format('yyyy-MM-dd'),
                    accountTypeId : '1',
                    accountType : 'charging',
                    operType : 'reduce',
                }).then(res => {
                    if (res.success) {
                        this.vipPlace.total1 = 0;
                        for (let item in res.data) {
                            this.vipPlace.total1 += res.data[item];
                        }
                        this.vipPlace.total1 = Number(this.vipPlace.total1 / 10000).toFixed(2);
                    } else {
                        this.vipPlace.total1 = '';
                    }
                }).catch(err => {
                    this.vipPlace.total1 = '';
                });
            },
            /**
             * 获取上周会员消费总金额
             */
            getLastWeekMemberConsumeSum () {
                ajax.post('getMemberConsumeSumGroupBy',{
                    startDate : new Date().addDays(new Date().getDay() === 0 ? -7 : -new Date().getDay()).addDays(-6).format('yyyy-MM-dd'),
                    endDate : new Date().addDays(new Date().getDay() === 0 ? -7 : -new Date().getDay()).format('yyyy-MM-dd'),
                    accountTypeId : '1',
                    accountType : 'charging',
                    operType : 'reduce',
                }).then(res => {
                    if (res.success) {
                        this.vipPlace.total2 = 0;
                        for (let item in res.data) {
                            this.vipPlace.total2 += res.data[item];
                        }
                        this.vipPlace.total2 = Number(this.vipPlace.total2 / 10000).toFixed(2);
                    } else {
                        this.vipPlace.total2 = '';
                    }
                }).catch(err => {
                    this.vipPlace.total2 = '';
                });
            },
            /**
             * 获取本周会员消费积分总数
             */
            getNowWeekMemberIntegraSum () {
                ajax.post('getMemberConsumeSumGroupBy',{
                    startDate : new Date().addDays(-new Date().getDay() === 0 ? -new Date().getDay() - 6 : -new Date().getDay() + 1).format('yyyy-MM-dd'),
                    endDate : new Date().addDays(new Date().getDay() === 0 ? 0 : 7 - new Date().getDay()).format('yyyy-MM-dd'),
                    accountTypeId : '2',
                    accountType : 'score',
                    operType : 'reduce',
                }).then(res => {
                    if (res.success) {
                        this.integrationPlace.total2 = 0;
                        for (let item in res.data) {
                            this.integrationPlace.total2 += res.data[item];
                        }
                    } else {
                        this.integrationPlace.total2 = '';
                    }
                }).catch(err => {
                    this.integrationPlace.total2 = '';
                });
            },
            /**
             * 获取本周发放积分总数
             */
            getLastWeekMemberSendIntegraSum () {
                ajax.post('getMemberConsumeSumGroupBy',{
                    startDate : new Date().addDays(-new Date().getDay() === 0 ? -new Date().getDay() - 6 : -new Date().getDay() + 1).format('yyyy-MM-dd'),
                    endDate : new Date().addDays(new Date().getDay() === 0 ? 0 : 7 - new Date().getDay()).format('yyyy-MM-dd'),
                    accountTypeId : '2',
                    accountType : 'score',
                    operType : 'add',
                }).then(res => {
                    if (res.success) {
                        this.integrationPlace.total1 = 0;
                        for (let item in res.data) {
                            this.integrationPlace.total1 += res.data[item];
                        }
                    } else {
                        this.integrationPlace.total1 = '';
                    }
                }).catch(err => {
                    this.integrationPlace.total1 = '';
                });
            },
        },
        created () {
            this.getMemberSumCount();
            this.getNowWeekMemberConsumeSum();
            this.getLastWeekMemberConsumeSum();
            this.getNowWeekMemberIntegraSum();
            this.getLastWeekMemberSendIntegraSum();
        },
        computed : {
            ...mapGetters([
                'memberConfigInfo'
            ]),
            //是否可以显示会员消费信息
            showMemberRecharge () {
                return this.memberConfigInfo && this.memberConfigInfo['memberRecharge'] && this.memberConfigInfo['memberRecharge'] === 'true';
            },
            //是否可以显示会员积分信息
            showMemberPoint () {
                return this.memberConfigInfo && this.memberConfigInfo['memberPoint'] && this.memberConfigInfo['memberPoint'] === 'true';
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-manage-home{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;

        .home-data-show{
            width: 100%;
            height: 270px;
            @include clearfix();

            .data-show-left{
                height: 100%;
                float: left;
                width: calc(50% - 8px);
                margin-right: 15px;
                display: inline-block;
            }

            .data-show-right{
                height: 100%;
                width: calc(50% - 8px);
                display: inline-block;
            }
        }

        .home-chart{
            width: 100%;
            height: 305px;
            margin-top: 15px;
            background: $color_fff;
            border-radius: 4px;

            .chart-header{
                height: 50px;
                line-height: 48px;
                padding: 0 20px;
                border-bottom: 1px solid $color_E1E1E1;
                color: $color_353B5E;
                font-size: $font_size_18px;
            }

            .chart-content{
                height: 255px;
            }

        }

    }
</style>
