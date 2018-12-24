<!--
内容：经营状况
作者：djc
日期：
-->

<template>
    <div class="operation-state">
        <div class="header-box">
            <span class="title">{{$t('operationState')}}</span>
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
            <line-chart :line-data="lineChartData" @on-change="getLineChartData"></line-chart>
        </div>
    </div>
</template>
<script>
    import ajax from '@/api/index.js';
    import lineChart from '../../components/line.vue';
    import forEach from 'lodash/forEach';

    export default {
        components : {
            lineChart
        },
        props : {},
        data () {
            return {
                //指标类型：入园人数、订单数量、订单金额
                quotaType : 'orderVisitorNum',
                //日期
                date : [],
                //业绩指标类型
                quotaList : [
                    { label : 'reservePeople', value : 'orderVisitorNum' }, //预定人数
                    { label : 'reserveNum', value : 'orderAuditedNum' }, //预定数量
                    { label : 'reserveAmount', value : 'orderAuditedAmount' }, //预定金额
                ],
                //折线图数据
                lineChartData : {
                    series : [],
                    xAxisData : [],
                    legend : []
                }
            }
        },
        methods : {
            /**
             * 查询经营状况数据
             */
            getPerformanceData () {
                this.lineChartData = {
                    series : [],
                        xAxisData : [],
                        legend : []
                };
                ajax.post('workbench-getPartnerEchartOptionData',{
                    queryType : this.quotaType,
                    startDate : this.date[0] ? this.date[0].format('yyyy-MM-dd') : '',
                    endDate : this.date[1] ? this.date[1].format('yyyy-MM-dd') : ''
                }).then(res => {
                    if (res.success && res.data) {
                        if (res.data.series) {
                            //serie数据
                            forEach(res.data.series, (scenicData, scenicName) => {
                                this.lineChartData.series.push({
                                    name : scenicName,
                                    data : scenicData.map(item => {
                                        return {
                                            name : item.name,
                                            value : item.value,
                                            time : item.date,
                                        };
                                    }),
                                });
                                //legend数据
                                this.lineChartData.legend.push({
                                    name : scenicName,
                                    icon : 'rect',
                                });
                            });
                        } else {
                            this.lineChartData.series = [];
                        }
                        //xAxisData数据
                        this.$set(this.lineChartData, 'xAxisData', res.data.xAxisData || []);
                    } else {
                        this.lineChartData = { series : [], xAxisData : [], legend : [] };
                    }
                });
            },
            /**
             * 改变日期时获取新的经营状况数据
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

    .operation-state {
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
