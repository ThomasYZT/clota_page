<!--
    会员积分数据报表--趋势表
    作者：杨泽涛
-->
<template>
    <div class="tendency">
        <!-- 总数据统计 -->
        <headInfo :info="headInfo">
        </headInfo>

        <!-- 头部过滤器 -->
        <filterHead>
            <div slot="left-filter" class="left-bar">
                <h5 class="title">{{$t('MembershipTrendChart')}}</h5>
            </div>
            <div slot="right-filter" class="right-bar">
                <!-- 日期选择器 -->
                <DatePicker v-model="filterData.date"
                            type="daterange"
                            transfer
                            :editable="false"
                            :clearable="false"
                            :placeholder="$t('selectField', { msg : $t('date') })"
                            @on-change="getData"
                            style="width: 280px">
                </DatePicker>
            </div>
        </filterHead>

        <!-- 图表 -->
        <div class="chart-wrapper">
            <eCharts auto-resize
                     :options="options">
            </eCharts>
        </div>
    </div>
</template>

<script>
    import common from '@/assets/js/common';
    import filterHead from '../../components/filterHead';
    import eCharts from '@/components/vueEcharts/eCharts';
    import ajax from '@/api/index';
    import { getLineConfig, defaultSeries } from '../../chartConfig';
    import defaultsDeep from 'lodash/defaultsDeep';
    import headInfo from '../../components/headInfo';
    export default {
        props : {
            cardType : {
                type : String,
                default () {
                    return '';
                }
            }
        },
        components : {
            filterHead,
            eCharts,
            headInfo
        },
        data () {
            return {
                //过滤条件数据
                filterData : {
                    //日期范围
                    date : [common.getDay(-6),common.getDay(0)],
                },
                seriesData : [],
                xAxisData : [],
                legendData : [],
                //头部信息
                headInfo : [],
                formatter : (params) => {
                    if (params && params.length > 0) {
                        let html = '<div class="chart-tooltip">';
                        let time = (params[0].axisValue ? params[0].axisValue : '-') + ' ' + this.$t(common.getWeekDay(new Date(params[0].axisValue)));
                        let statistics = '<p><span style="margin-right:10px;display:inline-block;vertical-align:middle;width:6px;height:6px;border-radius:50%;background-color:' +
                            params[0].color + '"></span>' + this.$t('pointAdd') + ' ' + (params[0] ? params[0].data.value : 0) +
                            '</br><span style="margin-right:10px;display:inline-block;vertical-align:middle;width:6px;height:6px;border-radius:50%;background-color:' +
                            params[1].color + '";></span>' + this.$t('pointReduce') + ' ' + (params[1] ? params[1].data.value : 0) + '</p>';
                        html += time + statistics;
                        html += '</div>';
                        return html;
                    } else {
                        return '';
                    }
                },
            };
        },
        computed : {
            //echart图标数据
            options () {
                return getLineConfig({
                    color : ['#0055B8', '#FBC92B'],
                    legendData : this.legendData,
                    seriesData : this.seriesData,
                    xAxisData : this.xAxisData,
                    formatter : this.formatter,
                });
            }
        },
        methods : {
            /**
             * 获取页面数据
             */
            getData () {
                this.seriesData = [];
                this.xAxisData = [];
                this.legendData = [];
                //获取会员卡销售数据趋势数据
                ajax.post('queryMemberScoreChangeRecord', {
                    startTime : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endTime : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    cardTypeId : this.cardType === 'all' ? '' : this.cardType,
                }).then(res => {
                    if (res.success) {
                        if (res.data && Object.keys(res.data).length > 0) {
                            let data = res.data;

                            for (let key in data) {
                                let _dataOfSeries = [];

                                for (let date in data[key]) {

                                    //组装seriesDat 每根曲线数据
                                    _dataOfSeries.push({
                                        value : data[key][date],
                                        name : this.$t('score_' + key),
                                    });
                                }

                                //组装legendData数据
                                this.legendData.push({
                                    name : this.$t('score_' + key)
                                });
                                this.seriesData.push(defaultsDeep({ data : _dataOfSeries, name : this.$t('score_' + key) }, defaultSeries));

                            }

                            //组装xAxisData 横坐标时间数据
                            for (let key in data) {
                                for (let date in data[key]) {
                                    this.xAxisData.push(date);
                                }
                                break;
                            }
                            this.queryTotalScoreChangeRecord();
                        } else {
                            this.seriesData = [];
                            this.xAxisData = [];
                            this.legendData = [];
                        }
                    } else {
                        this.seriesData = [];
                        this.xAxisData = [];
                        this.legendData = [];
                    }
                });
            },
            queryTotalScoreChangeRecord () {
                this.headInfo = [];
                ajax.post('queryTotalScoreChangeRecord', {
                    cardTypeId : this.cardType === 'all' ? '' : this.cardType
                }).then(res => {
                    if (res.success) {
                        if (res.data) {
                            for (let key in res.data) {
                                if (key === 'add') {
                                    this.headInfo.push({
                                        label : 'totalBonusPointsAdd',
                                        value : res.data[key] ? res.data[key] : 0
                                    });
                                } else if (key === 'reduce') {
                                    this.headInfo.push({
                                        label : 'totalBonusPointsReduce',
                                        value : res.data[key] ? (res.data[key] < 0 ? -res.data[key] : res.data[key]) : 0
                                    });
                                }
                            }
                        } else {
                            this.headInfo = [];
                        }
                    } else {
                        this.headInfo = [];
                    }
                });
            }
        },
        watch : {
            cardType : {
                handler (newVal) {
                    if (newVal !== '') {
                        this.getData();
                    }
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .tendency {
        padding-top: 20px;
        height: 100%;

        .left-bar {
            height: 100%;
            .title {
                height: 100%;
                font-size: 14px;
                color: #000;
                font-weight: bold;
                line-height: 30px;
            }
        }

        .right-bar {
            height: 100%;
        }

        .chart-wrapper {
            height: calc(100% - 180px);
            position: relative;

            .y-axix-unit {
                position: absolute;
                left: 3%;
                top: 20px;
            }
            .echarts {
                height: 100%;
            }
        }
    }
</style>

