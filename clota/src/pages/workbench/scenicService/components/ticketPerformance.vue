<!--
内容：门票业绩指标
作者：djc
日期：
-->

<template>
    <div class="ticket-performance">
        <div class="header-box">
            <span class="title">{{$t('ticketPerformance')}}</span>
            <RadioGroup v-model="quotaType"
                        type="button"
                        style="float: right;"
                        @on-change="getPerformanceData">
                <Radio v-for="item in quotaList" :key="item.value"
                       :label="item.value"
                       :true-value="item.value">{{$t(item.label)}}</Radio>
            </RadioGroup>
        </div>
        <div class="chart-area">
            <line-chart :line-data="lineData" @on-change="getLineChartData"></line-chart>
        </div>
    </div>
</template>
<script>
    import ajax from '@/api/index.js';
    import lineChart from '../../components/line.vue';

    export default {
        components : {
            lineChart
        },
        props : {},
        data () {
            return {
                //指标类型：入园人数、订单数量、订单金额
                quotaType : 'checkVisitorNum',
                //日期
                date : [],
                //业绩指标类型
                quotaList : [
                    { label : 'checkVisitorNum', value : 'checkVisitorNum' }, //入园人数
                    { label : 'orderNum', value : 'orderNum' }, //订单数量
                    { label : 'orderAmount', value : 'orderAmount' }, //订单金额
                ],
                //折线图数据
                lineChartData : {
                    series : [],
                    xAxisData : []
                    /*"series":[
                        {
                            "data":[
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                7
                            ],
                            "name":"奇趣乐园",
                            "smooth":"true",
                            "stack":"总量",
                            "type":"line"
                        }
                    ],
                    "xAxisData":[
                        "09-18周二",
                        "09-19周三",
                        "09-20周四",
                        "09-21周五",
                        "09-22周六",
                        "09-23周日",
                        "09-24周一",
                        "09-25周二",
                        "09-26周三",
                        "09-27周四",
                        "09-28周五"
                    ]*/
                }
            }
        },
        computed : {
            lineData () {
                let selectedLegend = this.quotaList.find(item => {
                    return item.value == this.quotaType;
                });
                return Object.assign({}, this.lineChartData, { legend : [this.$t(selectedLegend.label)] });
            }
        },
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 查询业绩指标数据
             */
            getPerformanceData () {
                ajax.post('workbench-getScenicEchartOptionData',{
                    queryType : this.quotaType,
                    startDate : this.date[0] ? this.date[0].format('yyyy-MM-dd') : '',
                    endDate : this.date[1] ? this.date[1].format('yyyy-MM-dd') : ''
                }).then(res => {
                    if (res.success && res.data) {
//                        this.lineChartData.series = this.lineChartData.xAxisData = [];

                        this.$set(this.lineChartData, 'series', res.data.series || []);
                        this.$set(this.lineChartData, 'xAxisData', res.data.xAxisData || []);
                    } else {
                        this.lineChartData = { series : [], xAxisData : [] };
                    }
                });
            },
            /**
             * 改变日期时获取新的业绩指标数据
             * @param daterange  Object   { startDate: 'yyyy-MM-dd', endDate: 'yyyy-MM-dd' }
             */
            getLineChartData (daterange) {
                this.date = [new Date(daterange.startDate), new Date(daterange.endDate)];
                this.getPerformanceData();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .ticket-performance {
        position: relative;
        float: left;
        @include block_outline($width: unquote('calc(100% - 425px)'));
        background: $color_fff;
        border: 1px solid $color_DFE2E5;
        border-radius: 4px;

        .header-box {
            @include block_outline($height: 45px);
            border-bottom: 1px solid $color_E1E1E1;
            line-height: 45px;
            padding: 0 20px;

            .title {
                font-size: $font_size_18px;
                color: $color_353B5E;
            }

        }

        .chart-area {
            height: calc(100% - 45px);
        }
    }

    /deep/ .ivu-radio-group-button .ivu-radio-wrapper {
        height: 30px;
        line-height: 30px;
    }
</style>
