<template>
    <!--折线图-->
    <div class="member-chart-line">
        <div class="chart-left">
            <div class="lagend-container">
                <div class="chart-title">{{data.label1}}</div>
                <div class="chart-num">{{data.total1}}</div>
                <div class="chart-label">
                    <span class="iconfont icon-down red-color"></span>
                    <span>{{data.rate1}}</span>
                    <span>同比上周</span>
                </div>
            </div>

            <div class="lagend-container">
                <div class="chart-title">{{data.label2}}</div>
                <div class="chart-num">{{data.total2}}</div>
                <div class="chart-label">
                    <span class="iconfont icon-up green-color"></span>
                    <span>{{data.rate2}}</span>
                    <span>同比上周</span>
                </div>
            </div>

        </div>
        <div class="chart-right">
            <div class="filter">
                <span :class="{'active': data.type === 'week'}">本周</span>
                <span :class="{'active': data.type === 'month'}">本月</span>
                <span :class="{'active': data.type === 'year'}">本年</span>
                <div class="date-range-filter">
                    <div class="double-date-container" :class="{'ivu-form-item-error' : validateError.entryDate}">
                        <Date-picker class="double-date" v-model="startTime" type="date" placement="bottom-end" :editable="false" placeholder="开始时间"></Date-picker>
                        <span>至</span>
                        <Date-picker class="double-date" v-model="endTime" type="date" placement="bottom-end" :editable="false" placeholder="结束时间"></Date-picker>
                        <span class="iconfont icon-date-picker"></span>
                    </div>
                    <div v-show="validateError" class="ivu-form-item-error-tip">{{validateError.entryDate}}</div>
                </div>
            </div>
            <div class="line-content">
                <div class="label">单位：万元</div>
                <vue-echarts :options="options" auto-resize></vue-echarts>
            </div>
        </div>
    </div>
</template>

<script>

    import echarts from 'echarts/lib/echarts'
    import vueEcharts from '@/components/vueEcharts/Echarts'

    export default {
        props: ['data'],
        components: {
            vueEcharts,
        },
        data () {
            return {
                startTime: '',
                endTime: '',
                validateError: '',
                seriesData: [
                    { name: '03-02周六', value: 6},
                    { name: '03-03周天', value: 5},
                    { name: '03-04周一', value: 5},
                    { name: '03-05周二', value: 8},
                    { name: '03-06周三', value: 11},
                    { name: '03-07周四', value: 12},
                    { name: '03-08周五', value: 10},
                ],
                xAxis: ['03-02周六','03-03周天','03-04周一','03-05周二','03-06周三','03-07周四','03-08周五'],
            }
        },
        computed: {
            options(){
                return {
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: '#fff',
                        padding: [10, 15],
                        formatter: function ( params ) {
                            /*if(params.length > 0){
                                var tooltip = '<span style="color: #666666;">' + params[0].name +'</span></br>'
                                    + params[0].seriesName +'<span style="margin-left: 12px">' + (Number(params[0].value)*100).toFixed(2) + '%' + '</span>';
                                return tooltip;
                            }*/
                            return '100';
                        },
                        textStyle: {
                            color: '#333333',
                        },
                        confine: true,
                        extraCssText: 'border: 1px solid #DFE3E9; box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10)'
                    },
                    grid: {
                        top: 20,
                        left: 10,
                        right: 30,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        //设置轴线的属性
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#F1F3FA',
                                width: 2,
                            }
                        },
                        //轴线单位坐标线对应的方向
                        axisTick: {
                            show: false
                        },
                        //刻度标签文字
                        axisLabel: {
                            color: '#666',
                            margin: 10,
                        },
                        data: this.xAxis
                    },
                    yAxis: {
                        //轴线单位坐标线对应的方向
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#F1F3FA',
                                width: 2,
                            }
                        },
                        //网格线
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#F1F3FA",
                                type: "solid"
                            }
                        },
                        //刻度标签文字
                        axisLabel: {
                            color: '#666',
                            show: true,
                        },
                        type: 'value'
                    },
                    series: [
                        {
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: '#3071CE',
                                },
                                emphasis:{
                                    color: '#3071CE',
                                }
                            },
                            //面积样式
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#D9E7FA'},
                                            {offset: 1, color: '#F2F6FB'},
                                        ]
                                    )
                                }
                            },
                            data: this.seriesData
                        },
                    ],
                    //滑块
                    dataZoom: {
                        type: 'slider',
                        xAxisIndex: [0],
                        //组件高度
                        height: 15,
                        //下边的距离
                        bottom: 20,
                        //字体颜色
                        textStyle: {
                            color: '#000',
                        },
                        //背景块样式
                        dataBackground: {
                            lineStyle: {
                                width: 0
                            },
                            areaStyle: {
                                color: 'rgba(0,0,0,0.2)',
                            }
                        }
                    },
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-chart-line{
        height: 100%;
        @include clearfix();

        .red-color{
            color: $color_red;
        }

        .green-color{
            color: $color_green;
        }

        .chart-left{
            height: 100%;
            width: 230px;
            float: left;
            border-right: 2px solid $color_E1E1E1;
            display: inline-block;
            text-align: center;
            padding: 16px 0;

            .lagend-container{
                padding: 16px 0;

                .chart-title{
                    font-size: $font_size_14px;
                    color: $color_999;
                }

                .chart-num{
                    font-size: $font_size_22px;
                    color: $color_353B5E;
                }

                .chart-label{
                    font-size: $font_size_12px;
                    color: $color_999;
                }

            }

        }

        .chart-right{
            width: calc(100% - 232px);
            height: 100%;
            display: inline-block;

            .filter{
                height: 48px;
                padding: 17px 45px 0;
                text-align: right;

                >span{
                    font-size: $font_size_14px;
                    color: $color_7F8FA4;
                    letter-spacing: 1px;
                    margin-right: 20px;
                    cursor: pointer;
                    &.active{
                        color: $color_blue;
                    }
                }

                .date-range-filter{
                    position: relative;
                    width: 320px;
                    display: inline-block;
                    height: 30px;
                    .ivu-icon-ios-calendar-outline{  display: none;}
                    .double-date-container{
                        background: $color_fff;
                        border: 1px solid $color_D8D8D8;
                        border-radius: 4px;
                        height: 30px;
                        line-height: 20px;
                        vertical-align: middle;
                        .double-date{
                            width: 130px;
                            display: inline-block;
                            /deep/ .ivu-icon-ios-calendar-outline{  display: none !important;}
                            /deep/ .ivu-icon-ios-close{  display: inline-block;left: 90px;}

                            /deep/ .ivu-input{
                                font-size: $font_size_14px;
                                height: 28px;
                                border: none;
                                border-width: 0;
                                padding-right: 0;
                                text-indent: 10px;
                            }
                            /deep/ .ivu-input:focus{
                                border-width: 0;
                                box-shadow: none;
                            }
                        }
                        .iconfont{
                            color: $color_CED0DA;
                            font-size: $font_size_18px;
                            vertical-align: middle;
                            margin-right: 5px
                        }
                        /deep/ &.ivu-form-item-error{
                            border:1px solid $color_red;
                        }
                    }
                    .double-date-container:hover {
                        background-color: transparent;
                        border-color: $color_blue;
                    }
                }
            }

            .line-content{
                height: calc(100% - 50px);
                padding: 0 20px;

                .label{
                    height: 20px;
                    font-size: $font_size_12px;
                    color: $color_999;
                    padding-left: 60px;
                }

                .echarts {
                    @include block_outline(100%, 205px);
                    margin: 0 auto;
                }
            }
        }

    }
</style>
