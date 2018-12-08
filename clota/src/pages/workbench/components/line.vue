<!--折线图-->

<template>
    <div class="line-chart">
        <div class="filter">
            <!--时间范围选择-->
            <span :class="{'active': timeType === 'week'}"
                  @click="changeTimeType('week')">{{$t("recent_days_7")}}</span>
            <span :class="{'active': timeType === 'month'}"
                  @click="changeTimeType('month')">{{$t("recent_days_30")}}</span>
            <span :class="{'active': timeType === 'year'}"
                  @click="changeTimeType('year')">{{$t("thisYear")}}</span>
            <div class="date-range-filter">
                <DatePicker v-model="autoDefTime"
                            format="yyyy-MM-dd"
                            type="daterange"
                            :clearable="false"
                            :editable="false"
                            transfer
                            placement="bottom-end"
                            style="width: 280px"
                            @on-change="changeDateCustom">
                </DatePicker>
            </div>
        </div>
        <vue-echarts
            :options="lineOptions"
            auto-resize>
        </vue-echarts>
    </div>
</template>

<script>
    import getLineConfig from './lineConfig';
    import vueEcharts from '@/components/vueEcharts/eCharts.vue';

    export default {
        props : {
            //饼图数据
            'line-data' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            vueEcharts
        },
        data () {
            return {
                //当前日期类型
                timeType : 'week',
                //自定义时间
                autoDefTime : [],
            };
        },
        created () {
            this.changeTimeType(this.timeType);
        },
        computed : {
            //获取日期信息
            getDateInfo () {
                if (this.timeType === 'week') {//近7天数据
                    return {
                        startDate : new Date().addDays(-7).format('yyyy-MM-dd'),
                        endDate : new Date().format('yyyy-MM-dd'),
                    };
                } else if (this.timeType === 'month') {//近30天数据
                    return {
                        startDate : new Date().addDays(-30).format('yyyy-MM-dd'),
                        endDate : new Date().format('yyyy-MM-dd'),
                    };
                } else if (this.timeType === 'year') {//本年数据
                    let year = String(new Date().getFullYear());
                    return {
                        startDate : new Date(year).format('yyyy-MM-dd'),
                        endDate : new Date().format('yyyy-MM-dd'),
                    };
                } else if (this.timeType === 'autoDefTime') {//自定义时间范围
                    return {
                        startDate : this.autoDefTime[0] ? this.autoDefTime[0].format('yyyy-MM-dd') : '',
                        endDate : this.autoDefTime[1] ? this.autoDefTime[1].format('yyyy-MM-dd') : '',
                    };
                }
            },
            //折线图配置
            lineOptions () {
                return getLineConfig(this.lineData.xAxisData, this.lineData.series, this.lineData.legend);
            }
        },
        methods : {
            /**
             * 获取对应时间的消费数据
             * @param timeType 时间类型
             */
            changeTimeType (timeType) {
                this.autoDefTIme = [];
                this.timeType = timeType;
                this.$emit('on-change', this.getDateInfo);
            },
            /**
             * 自定义查看时间范围
             */
            changeDateCustom () {
                this.timeType = 'autoDefTime';
                this.$emit('on-change', this.getDateInfo);
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .echarts {
        @include block_outline();
    }

    .line-chart {
        position: relative;
        height: 100%;

        .filter {
            position: absolute;
            padding: 17px 20px 0;
            z-index: 99;
            >span{
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

            .date-range-filter {
                display: inline-block;
            }
        }
    }
</style>
