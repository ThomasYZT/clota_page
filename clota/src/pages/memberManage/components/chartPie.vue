<template>
    <div class="member-data-pie">
        <div class="data-header">
            <div class="title">会员分布数据</div>
            <div class="filter">
                <DatePicker type="month" placeholder="请选择" v-model="dataPie.time" style="width: 140px"></DatePicker>
            </div>
        </div>

        <div class="data-content">
            <vue-echarts :options="options" auto-resize></vue-echarts>
        </div>
    </div>
</template>

<script>

    import constVariable from '@/assets/js/constVariable'
    import vueEcharts from '@/components/vueEcharts/Echarts'

    export default {
        props: ['dataPie'],
        components: {
            vueEcharts
        },
        data () {
            return {}
        },
        computed: {
            options(){
                let colorList = ['#0055B8', '#33C0BF', '#FD8CB1', '#FBC826'];
                let legendList = ['V1', 'V2', 'V3', 'V4'];
                let legendData = [], seriesData = [];
                for(let key of legendList){
                    legendData.push({ name: key, icon: 'circle'});
                    seriesData.push({ name: key, value: 0});
                }
                let totalCount = 100;
                return {
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        axisPointer: {
                            lineStyle: {
                                color: 'transparent'
                            }
                        },
                        formatter: (params) => {
//                            let tooltip = constVariable.evaluateStatus[params.name] + ':&nbsp;&nbsp;' +  params.value +'人&nbsp;&nbsp;' + params.percent + '%';
                            return "38.88%";
                        },
                        backgroundColor: 'rgba(0,0,0,0.70)',
                        padding: [10, 15],
                        textStyle: {
                            color: '#FFFFFF',
                            align: 'left'
                        },
                        confine: true,
                        extraCssText:  'box-shadow: 0 2px 6px 0 rgba(0,0,0,0.70)'
                    },
                    legend: {
                        orient: 'vertical',
                        top: 'middle',
                        left: '50%',
                        itemGap: 18,
                        itemWidth: 8,
                        itemHeight: 8,
                        textStyle: {
                            fontSize: 14,
                            rich: {
                                name: {
                                    width: 130,
                                    color: '#666666',
                                    overflow: 'hidden'
                                },
                                number: {
                                    color: '#333333'
                                }
                            }
                        },
                        formatter: name => {
                            return name
                            let status = constVariable.vipStatus[name];
                            status = status.length > 6 ? status.substr(0, 5) + '...' : status;
                            return 'name | 48.88% 3992'
                        },
                        data: legendData
                    },
                    series: [
                        {
                            type:'pie',
                            center: ['22%', '50%'],
                            radius: ['60%', '78%'],
                            avoidLabelOverlap: false,
//                            minAngle: 5, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互。
                            itemStyle: {
                                normal: {
                                    borderColor: '#FFFFFF',
                                    borderWidth: 2,
                                    color: ( params ) => {
                                        return colorList[params.dataIndex];
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter: ( params )=>{
                                        return totalCount;
                                    },
                                    textStyle: {
                                        fontSize: 24,
                                        color: '#999999'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            hoverAnimation: false,
                            data: seriesData
                        }
                    ]
                }
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-data-pie{
        @include block_outline();
        background: $color_fff;
        border: 1px solid $color_DFE2E5;
        border-radius: 4px;
        position: relative;

        .data-header{
            height: 50px;
            line-height: 48px;
            padding: 0 20px;
            border-bottom: 2px solid $color_E1E1E1;
            @include clearfix();

            .title{
                display: inline-block;
                color: $color_353B5E;
                font-size: $font_size_18px;
            }

            .filter{
                display: inline-block;
                float: right;
            }
        }

        .data-content {
            height: calc(100% - 50px);
            .echarts {
                @include block_outline(480px, 190px);
                margin: 0 auto;
            }
        }
    }
</style>
