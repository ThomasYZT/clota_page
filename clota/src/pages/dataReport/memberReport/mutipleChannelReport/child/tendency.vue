<!--
    各渠道会员数据报表--趋势表
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
                <h5 class="title">{{$t('MemberSourceTrendChart')}}</h5>
            </div>
            <div slot="right-filter" class="right-bar">
                <!-- 日期选择器 -->
                <DatePicker v-model="filterData.date"
                            type="daterange"
                            :editable="false"
                            transfer
                            :clearable="false"
                            :placeholder="$t('selectField', { msg : $t('date') })"
                            @on-change="getData"
                            style="width: 280px">
                </DatePicker>
            </div>
        </filterHead>

        <div class="chart-wrapper">
            <span class="y-axix-unit">{{$t('bracketSetting', { content : $t('paper') })}}</span>
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
                default : ''
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
                //会员卡类型
                cardTypeId : '',
                formatter : (params) => {
                    if (params && params.length > 0) {
                        let html = '<div class="chart-tooltip">';
                        let time = params[0].data.params.createdTime + ' ' + this.$t(common.getWeekDay(new Date(params[0].data.params.createdTime)));
                        html += time;
                        params.forEach(item => {
                            let spot = '<p><span style="margin-right:10px;display:inline-block;vertical-align:middle;width:6px;height:6px;border-radius:50%;background-color:' +
                            item.color + '"></span>' + this.$t('online') + ' ' + (item ? item.data.value : 0).toFixed(2);

                            html += spot;
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
                    color : ['#0055B8','#FBC826'],
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
                this.headInfo = [];
                //获取会员渠道折线图数据
                ajax.post('listCardSourceByDate', {
                    startTime : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endTime : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    cardTypeId : this.cardType === 'all' ? '' : this.cardType,
                }).then(res => {
                    if (res.success) {
                        if (res.data && Object.keys(res.data).length > 0) {
                            let data = res.data;

                            let isxAxis = false;
                            for (let key in data) {
                                if (data[key] && data[key].length > 0) {
                                    let _dataOfSeries = [];
                                    data[key].forEach(item => {

                                        //组装xAxisData 横坐标时间数据
                                        if (!isxAxis) {
                                            this.xAxisData.push(item.createdTime);
                                        }

                                        //组装seriesDat 每根曲线数据
                                        _dataOfSeries.push({
                                            value : item.quantity,
                                            name : this.$t(key),
                                            params : item
                                        });
                                    });
                                    isxAxis = true;
                                    //组装legend数据
                                    this.legendData.push({
                                        name : this.$t(key)
                                    });
                                    this.seriesData.push(defaultsDeep({ data : _dataOfSeries, name : this.$t(key) }, defaultSeries));
                                }
                            }
                            this.countGroupBySource();
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
            //获取会员来源渠道数据
            countGroupBySource () {
                ajax.post('countGroupBySource', {
                    cardTypeId : this.cardType === 'all' ? '' : this.cardType
                }).then(res => {
                    if (res.success) {
                        this.headInfo = res.data && res.data.length > 0 ? res.data.map(item => {
                            if (item.source === 'off_line') {
                                return {
                                    label : 'offline',
                                    value : item.quantity ? item.quantity : 0
                                };
                            } else if (item.source === 'on_line') {
                                return {
                                    label : 'online',
                                    value : item.quantity ? item.quantity : 0
                                };
                            } else {
                                return {
                                    label : 'totalMembers',
                                    value : item.quantity ? item.quantity : 0
                                };
                            }
                        }) : [];
                    } else {
                        this.headInfo = [];
                    }
                });
            }
        },
        created () {
            this.getData();
        },
        watch : {
            /**
             * 监听cardType
             * @param {*} newVal
             */
            cardType (newVal) {
                this.cardTypeId = newVal;
                this.getData();
            }
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
            height: calc(100% - 170px);
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
