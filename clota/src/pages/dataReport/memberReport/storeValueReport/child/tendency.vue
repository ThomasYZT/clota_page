<!--
    会员储值报表--趋势表
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
                <h5 class="title">{{$t('memberStoreValueTendency')}}</h5>
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

                <!-- 会员类型下拉列表 -->
                <span class="label">{{$t('memberType')}}</span>
                <Select v-model="filterData.cardType"
                        :placeholder="$t('selectField', { msg : $t('memberType') })"
                        @on-change="getData"
                        style="width:160px" >
                    <Option v-for="item in cardTypeList" :value="item.value" :key="item.value">
                        {{ item.label === 'memberTypeAll' ? $t(item.label) : item.label }}
                    </Option>
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
    import { getLineConfig, barSeries } from '../../chartConfig';
    import defaultsDeep from 'lodash/defaultsDeep';
    import headInfo from '../../components/headInfo';
    export default {
        props : {
            cardTypeList : {
                type : Array,
                default () {
                    return [];
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
                    //会员类型
                    cardType : 'all',
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
                        let time = params[0].data.params.createdTime + ' ' + this.$t(common.getWeekDay(new Date(params[0].data.params.createdTime)));
                        html += time;
                        params.forEach(item => {
                            let account = item.name + ': ' + (item.data.value ? item.data.value.toFixed(2) : '0.00') + ' ';
                            let spot = '<span style="display:inline-block;vertical-align:middle;width:6px;height:6px;border-radius:50%;background-color:' + item.color + ';"></span> ';
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
            getData () {
                this.seriesData = [];
                this.xAxisData = [];
                this.legendData = [];
                this.headInfo = [];
                //会员储值记录报表--会员储值趋势图
                ajax.post('listRechargeByDate', {
                    startTime : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endTime : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    cardTypeId : this.filterData.memberType === 'all' ? '' : this.filterData.memberType,
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
                                        //组装seriesData 每根曲线数据
                                        _dataOfSeries.push({
                                            value : item.money,
                                            name : key,
                                            params : item
                                        });
                                    });
                                    isxAxis = true;
                                    //组装legendData数据
                                    this.legendData.push({
                                        name : key
                                    });
                                    this.seriesData.push(defaultsDeep({ data : _dataOfSeries }, barSeries));
                                }
                            }
                            this.sumCorpusRecharge();
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
            sumCorpusRecharge () {
                ajax.post('sumCorpusRecharge', {
                    startTime : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endTime : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    cardTypeId : this.filterData.memberType === 'all' ? '' : this.filterData.memberType,
                }).then(res => {
                    if (res.success) {
                        if (res.data) {
                            for (let key in res.data) {
                                if (key === 'total') {
                                    this.headInfo.push({
                                        label : 'memberValueStoreTotal',
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
            }
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
