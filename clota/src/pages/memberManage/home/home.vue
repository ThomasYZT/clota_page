<template>
    <!--会员管理--会员主页-->
    <div class="member-manage-home">

        <div class="home-data-show">

            <!--会员数据概览-->
            <div class="data-show-left">
                <data-total :member-sum-count="memberSumCount"></data-total>
            </div>

            <!--会员分布数据-->
            <div class="data-show-right">
                <chart-pie></chart-pie>
            </div>

        </div>

        <!--会员消费数据概览-->
        <div class="home-chart">
            <div class="chart-header">会员分布数据</div>
            <div class="chart-content">
                <chart-line :data="vipPlace"></chart-line>
            </div>
        </div>

        <!--会员积分数据概览-->
        <div class="home-chart">
            <div class="chart-header">会员积分数据概览</div>
            <div class="chart-content">
                <chart-line :data="vipPlace"></chart-line>
            </div>
        </div>

    </div>
</template>

<script>

    import dataTotal from '../components/dataShow.vue';
    import chartPie from '../components/chartPie.vue';
    import chartLine from '../components/chartLine.vue';
    import ajax from '@/api/index.js';

    export default {
        components: {
            dataTotal,
            chartPie,
            chartLine,
        },
        data () {
            return {
                // 会员分布数据
                vipPlace: {
                    startTime: '',
                    endTime: '',
                    type: 'week',
                    label1: '本周会员消费总额(元)',
                    label2: '本周会员消费总比数',
                    total1: '121,279.99',
                    total2: '21,278',
                    rate1: '2.90%',
                    rate2: '2.90%',
                },
                // 会员积分数据
                integrationPlace: {
                    startTime: '',
                    endTime: '',
                    type: 'week',
                    label1: '本周发放积分总数',
                    label2: '本周消费积分总数',
                    total1: '121,279.99',
                    total2: '21,278',
                    rate1: '2.90%',
                    rate2: '2.90%',
                },
                //会员总数数据
                memberSumCount : ''
            }
        },
        methods : {
            /**
             * 获取会员总量信息
             */
            getMemberSumCount () {
                ajax.post('getMemberSumCount').then(res => {
                    if(res.success){
                        this.memberSumCount = res.data;
                    }else{
                        this.memberSumCount = '';
                    }
                }).catch(err => {
                    this.memberSumCount = '';
                });
            }
        },
        created() {
            this.getMemberSumCount();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-manage-home{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();

        .home-data-show{
            width: 100%;
            height: 245px;
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
                border-bottom: 2px solid $color_E1E1E1;
                color: $color_353B5E;
                font-size: $font_size_18px;
            }

            .chart-content{
                height: 255px;
            }

        }

    }
</style>
