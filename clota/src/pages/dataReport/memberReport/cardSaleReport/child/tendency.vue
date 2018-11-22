<!--
    会员卡销售报表--趋势表
    作者：杨泽涛
-->
<template>
    <div class="tendency">
        <filterHead>
            <div slot="left-filter" class="left-bar">
                <h5 class="title">{{$t('cardSaleTendency')}}</h5>
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
                <Select v-model="filterData.memberType"
                        :placeholder="$t('selectField', { msg : $t('memberType') })"
                        @on-change="queryLevelsByCardType"
                        style="width:160px" >
                    <Option v-for="item in cardTypeList" :value="item.value" :key="item.value">
                        {{ item.label }}
                    </Option>
                </Select>

                <!-- 会员级别下拉列表 -->
                <span class="label">{{$t('member-level')}}</span>
                <Select v-model="filterData.memberLevel"
                        :placeholder="$t('selectField', { msg : $t('member-level') })"
                        @on-change="getData"
                        style="width:160px">
                    <Option v-for="item in memberLevellist" :value="item.value" :key="item.value">
                        {{ item.label === 'memberLevelAll' ? $t(item.label) : item.label }}
                    </Option>
                </Select>
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
    export default {
        props : {
            cardTypeList : {
                type : Array,
                default () {
                    return [];
                }
            },
        },
        components : {
            filterHead,
            eCharts
        },
        computed : {
            //echart图标数据
            options () {
                return getLineConfig({
                    color : ['#FBC92B', '#05B7C3', '#0155B8', '#0FBAC5'],
                    legendData : this.legendData,
                    seriesData : this.seriesData,
                    xAxisData : this.xAxisData,
                    formatter : this.formatter
                });
            },
        },
        data () {
            return {
                //会员级别下拉列表数据
                memberLevellist : [
                    {
                        value : 'all',
                        label : 'memberLevelAll'
                    }
                ],
                //过滤条件数据
                filterData : {
                    //会员类型
                    memberType : this.cardTypeList[0] ? this.cardTypeList[0].value : '',
                    //会员级别
                    memberLevel : 'all',
                    //日期范围
                    date : [common.getDay(-6),common.getDay(0)],
                },
                seriesData : [],
                xAxisData : [],
                legendData : [],
                formatter : (params) => {
                    if (params && params.length > 0) {
                        let html = '<div class="chart-tooltip">';
                        let time = params[0].data.params.createdTime + ' ' + this.$t(common.getWeekDay(new Date(params[0].data.params.createdTime)));
                        let statistics = '<p>' + this.$t('totalCount') + ' ' + params.reduce((total, cur) => {
                            return total + cur.data.value;
                        }, 0).toFixed(2) + ' ' + this.$t('totalMoney') + ' ' + params.reduce((total, cur) => {
                            return total + cur.data.params.money;
                        }, 0).toFixed(2) + '</p>';
                        html += time + statistics;
                        params.forEach(item => {
                            let account = item.name + ': ' + (item.data.value ? item.data.value : '0') + this.$t('paper') + ' ';
                            let money = this.$t('money') + ' ' + (item.data.params ? item.data.params.money.toFixed(2) : '0');
                            let spot = '<span style="display:inline-block;vertical-align:middle;width:6px;height:6px;border-radius:50%;background-color:' + item.color + ';"></span> ';
                            html += '<p style="height:22px;line-height: 22px">' + spot + account + money + '</p>';
                        });
                        html += '</div>';
                        return html;
                    } else {
                        return '';
                    }
                },
            };
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
                ajax.post('queryCardSaleReport', {
                    startTime : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endTime : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    cardTypeId : this.filterData.memberType === 'all' ? '' : this.filterData.memberType,
                    levelId : this.filterData.memberLevel === 'all' ? '' : this.filterData.memberLevel,
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
                                            name : key,
                                            params : item
                                        });
                                    });
                                    isxAxis = true;
                                    this.seriesData.push(defaultsDeep({ data : _dataOfSeries, name : key }, defaultSeries));

                                    //组装legendData数据
                                    this.legendData.push({
                                        name : key
                                    });
                                }
                            }

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
            /**
             * 获取卡级别列表数据
             */
            queryLevelsByCardType () {
                this.filterData.memberLevel = 'all';
                this.memberLevellist = [
                    {
                        value : 'all',
                        label : 'memberLevelAll'
                    }
                ];
                ajax.post('queryLevelsByCardType', {
                    cardTypeId : this.filterData.memberType
                }).then(res => {
                    if (res.success && res.data.length > 0) {
                        this.memberLevellist = this.memberLevellist.concat(res.data.map(item => {
                            return {
                                value : item.id,
                                label : item.levelDesc
                            };
                        }));
                        this.getData();
                    } else {
                        this.memberLevellist = [
                            {
                                value : 'all',
                                label : 'memberLevelAll'
                            }
                        ];
                    }
                });
            }
        },
        watch : {
            cardTypeList : {
                handler (newVal) {
                    if (newVal.length > 0) {
                        this.filterData.memberType = newVal[0].value;
                        this.queryLevelsByCardType();
                    } else {
                        this.filterData.memberType = '';
                    }
                },
                immediate : true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .tendency {
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
            height: calc(100% - 48px);
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
