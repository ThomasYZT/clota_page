<!--
    会员消费数据报表--趋势表
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
                <h5 class="title">{{$t('memberConsumptionOverview')}}</h5>
            </div>
            <div slot="right-filter" class="right-bar">
                <!-- 日期选择器 -->
                <DatePicker v-model="filterData.date"
                            type="daterange"
                            :editable="false"
                            :clearable="false"
                            :placeholder="$t('selectField', { msg : $t('date') })"
                            @on-change="getData"
                            style="width: 280px">
                </DatePicker>

                <!-- 景区下拉列表 -->
                <span class="label">{{$t('order.scenic')}}</span>
                <Select v-model="filterData.orgId"
                        :placeholder="$t('selectField', { msg : $t('order.scenic') })"
                        @on-change="getData"
                        style="width:160px" >
                    <Option v-for="item in scenicList" :value="item.value" :key="item.value">{{ $t(item.label) }}</Option>
                </Select>
            </div>
        </filterHead>

        <!-- 图表 -->
        <div class="chart-wrapper">
            <span class="y-axix-unit">{{$t('bracketSetting', { content : $t('yuan') })}}</span>
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
            //景区列表
            'scenicList' : {
                type : Array,
                default () {
                    return [];
                }
            },
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
                    //景区id
                    orgId : 'all',
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
                        let time = params[0].data.params.date + ' ' + this.$t(common.getWeekDay(new Date(params[0].data.params.date)));
                        html += time;
                        params.forEach(item => {
                            let spot = '<span style="display:inline-block;vertical-align:middle;width:6px;height:6px;border-radius:50%;background-color:' +
                                        item.color + ';"></span> ';
                            let account = this.$t(item.data.name) + ' ' + item.value.toFixed(2);
                            html += '<p style="height:22px;line-height: 22px">' + spot + account + '</p>';
                        });
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
                    legendData : this.legendData,
                    seriesData : this.seriesData,
                    xAxisData : this.xAxisData,
                    formatter : this.formatter
                });
            }
        },
        methods : {
            /**
             * 获取页面数据
             */
            async getData () {
                this.seriesData = [];
                this.xAxisData = [];
                this.legendData = [];
                this.headInfo = [];
                await ajax.post('countGroupedMemberConsume', {
                    startDate : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endDate : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    orgId : this.filterData.orgId === 'all' ? '' : this.filterData.orgId,
                }).then(res => {
                    if (res.success) {
                        if (res.data && Object.keys(res.data).length > 0) {
                            let data = res.data;

                            let consumeAmountData = [];
                            let consumerNumData = [];

                            let isxAxis = false;
                            for (let key in data) {
                                if (data[key] && data[key].length > 0) {
                                    data[key].forEach( item => {
                                        //组装xAxisData 横坐标时间数据
                                        if (!isxAxis) {
                                            this.xAxisData.push(item.date);
                                        }
                                        //组装seriesData数据
                                        consumeAmountData.push({
                                            value : item.consumeAmount,
                                            name : 'consumption',
                                            params : item
                                        });
                                        consumerNumData.push({
                                            value : item.consumerNum,
                                            name : 'consumePeopleNum',
                                            params : item
                                        });
                                    });
                                    isxAxis = true;
                                    //组装legend数据
                                    this.legendData.push({
                                        name : key
                                    });
                                }
                            }
                            this.seriesData.push(defaultsDeep({ data : consumeAmountData }, defaultSeries));
                            this.seriesData.push(defaultsDeep({ data : consumerNumData }, defaultSeries));

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

                await ajax.post('countTotalMemberConsume', {
                    startDate : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endDate : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    orgId : this.filterData.orgId === 'all' ? '' : this.filterData.orgId,
                }).then(res => {
                    if (res.success) {
                        if (res.data) {
                            for (let key in res.data) {
                                if (key === 'consumeAmount') {
                                    this.headInfo.push({
                                        label : 'memberConsumeAmount',
                                        value : res.data[key] ? res.data[key] : 0
                                    });
                                } else if (key === 'consumerNum') {
                                    this.headInfo.push({
                                        label : 'memberConsumeNumOfPeople',
                                        value : res.data[key] ? res.data[key] : 0
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
            },

        },
        created () {
            this.getData();
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

            .label {
                margin-left: 20px;
            }
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
