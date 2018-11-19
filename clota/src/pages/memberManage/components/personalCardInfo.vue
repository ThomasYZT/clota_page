<!--个人会员卡-->

<template>
    <div class="personal-card-info">
        <div class="filter-head">
            <!--时间范围选择-->
            <span :class="{'active': timeType === 'all'}"
                  class="date-range"
                  @click="changeTimeType('all')">{{$t("all")}}</span>
            <span :class="{'active': timeType === 'today'}"
                  class="date-range"
                  @click="changeTimeType('today')">{{$t("今日")}}</span>
            <span :class="{'active': timeType === 'week'}"
                  class="date-range"
                  @click="changeTimeType('week')">{{$t("本周")}}</span>
            <span :class="{'active': timeType === 'month'}"
                  class="date-range"
                  @click="changeTimeType('month')">{{$t("本月")}}</span>
            <div class="date-range-filter">
                <DatePicker v-model="autoDefTIme"
                            format="yyyy-MM-dd"
                            type="daterange"
                            :clearable="false"
                            :editable="false"
                            transfer
                            placement="bottom-end"
                            style="width: 320px"
                            @on-change="dateChange">
                </DatePicker>
            </div>
        </div>
        <div class="line-chart-area">
            <vue-echarts
                :options="chartConfig"
                auto-resize
                ref="vueCharts">
            </vue-echarts>
        </div>
    </div>
</template>

<script>
    import { getConfig } from './histogramConfig';
    import vueEcharts from '../../../components/vueEcharts/eCharts.vue';
    import ajax from '@/api/index.js';

    export default {
        components : {
            vueEcharts
        },
        data () {
            return {
                //时间范围
                timeType : 'all',
                //自定义时间
                autoDefTIme : [],
                //横坐标轴数据
                xAxis : [],
                //图表数据
                seriesData : [],
            };
        },
        methods : {
            /**
             * 获取对应时间的消费数据
             * @param{String} timeType 时间类型
             */
            changeTimeType (timeType) {
                this.autoDefTIme = [];
                this.timeType = timeType;
                this.countCardsByTyeId();
            },
            /**
             * 自定义查看时间范围
             */
            dateChange () {
                this.timeType = 'autoDefTIme';
                this.countCardsByTyeId();
            },
            /**
             * 获取个人卡和业主卡数量信息
             */
            countCardsByTyeId () {
                Promise.all([
                    ajax.post('countCardsByTyeId',{
                        ...this.serachParams,
                        cardTypeId : 1 //业主卡-1 个人会员卡-2 企业卡-3
                    }),
                    ajax.post('countCardsByTyeId',{
                        ...this.serachParams,
                        cardTypeId : 2 //业主卡-1 个人会员卡-2 企业卡-3
                    })
                ]).then(([personData,ownerData]) => {
                    if (personData.success && ownerData.success) {
                        let result = [...(personData.data ? personData.data : []),...(ownerData.data ? ownerData.data : [])];
                        this.xAxis = [];
                        this.seriesData = [];
                        result.map(item => {
                            this.xAxis.push(item.levelDesc);
                            this.seriesData.push({
                                name : item.levelDesc,
                                value : item.quantity
                            });
                        });
                    } else {
                        this.xAxis = [];
                        this.seriesData = [];
                    }
                }).catch(() => {
                    this.xAxis = [];
                    this.seriesData = [];
                }).finally(() => {
                    this.$nextTick(() => {
                        if (this.$refs.vueChart) {
                            this.$refs.vueChart.refresh();
                        }
                    });
                });
            }
        },
        created () {
            this.countCardsByTyeId();
        },
        computed : {
            //图表配置
            chartConfig () {
                return getConfig(this.xAxis,this.seriesData);
            },
            //筛选时间参数
            serachParams () {
                if (this.timeType === 'all') {//全部
                    return {
                        startTime : '1990-01-01',
                        endTime : '9999-12-31'
                    };
                } else if (this.timeType === 'today') {//当天
                    return {
                        startTime : new Date().format('yyyy-MM-dd'),
                        endTime : new Date().format('yyyy-MM-dd')
                    };
                } else if (this.timeType === 'week') {//本周
                    return {
                        startTime : new Date().addDays(-new Date().getDay() === 0 ? -new Date().getDay() - 6 : -new Date().getDay() + 1).format('yyyy-MM-dd'),
                        endTime : new Date().addDays(new Date().getDay() === 0 ? 0 : 7 - new Date().getDay()).format('yyyy-MM-dd'),
                    };
                } else if (this.timeType === 'month') {//本月
                    return {
                        startTime : new Date().format('yyyy-MM-01'),
                        endTime : new Date().addDays(-new Date().getDate()).addMonths(1).addDays(-1).format('yyyy-MM-dd'),
                    };
                } else if (this.timeType === 'autoDefTIme') {//自定义事件
                    return {
                        startTime : this.autoDefTIme[0] ? this.autoDefTIme[0].format('yyyy-MM-dd') : '',
                        endTime : this.autoDefTIme[1] ? this.autoDefTIme[1].format('yyyy-MM-dd') : '',
                    };
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .personal-card-info{
        @include block_outline($height : 255px);

        .filter-head{
            @include block_outline($height : 40px);
            padding: 10px 20px 0 0;
            text-align: right;

            .date-range{
                display: inline-block;
                height: 30px;
                line-height: 30px;
                font-size: $font_size_14px;
                color: $color_7F8FA4;
                letter-spacing: 1px;
                margin-right: 10px;
                cursor: pointer;
                &.active{
                    color: $color_blue;
                }
            }

            .date-range-filter{
                vertical-align: middle;
                position: relative;
                display: inline-block;
                height: 30px;

                /deep/ .ivu-input{
                    cursor: pointer;
                }
            }
        }

        .line-chart-area{
            @include block_outline($height : unquote('calc(100% - 40px)'));

            .echarts {
                @include block_outline();
                margin: 0 auto;
            }
        }
    }
</style>
