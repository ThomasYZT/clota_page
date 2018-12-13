import defaultsDeep from 'lodash/defaultsDeep';
import echarts from 'echarts/lib/echarts';

const columnBaseConfig = {
    xAxis : {
        type : 'category',
        data : [],
        axisLabel : {
            inside : false,
            textStyle : {
                color : '#999'
            },
        },
        axisTick : {
            // show : false
        },
        axisLine : {
            show : true,
            lineStyle : {
                color : '#B0BDC9'
            }
        },
        z : 10
    },
    yAxis : {
        type : 'value',
        splitLine : {
            show : false
        },
        axisLine : {
            show : true,
            lineStyle : {
                color : '#B0BDC9'
            }
        },
        axisTick : {
            // show : false
        },
        axisLabel : {
            textStyle : {
                color : '#999',
                fontSize : '12px'
            }
        }
    },
    tooltip : {
        trigger : 'item',
        textStyle : {
            "fontSize" : 12
        }
    },
    series : [
        {
            barWidth : 14,
            barMaxWidth : 14
        }
    ]
};

export default function (xAxisData, seriesData) {
    let seriesOption = [];
    let option = {
        type : 'bar',
        barWidth : '20%',
        itemStyle : {
            normal : {
                barBorderRadius : [4, 4, 0, 0],
                color : new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        { offset : 0, color : '#0055B8' },
                        { offset : 1, color : '#00B8C2' }
                    ]
                )
            },
            emphasis : {
                color : new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        { offset : 0, color : '#2378f7' },
                        { offset : 1, color : '#83bff6' }
                    ]
                )
            }
        },
        data : []
    };
    if (seriesData && seriesData.length > 0) {
        for (let i = 0, len = seriesData.length; i < len; i++) {
            option.data = seriesData[i].data;
            seriesOption.push(option);
        }
    } else {
        seriesOption = [option];
    }

    return defaultsDeep({
        xAxis : {
            data : xAxisData
        },
        series : seriesOption
    }, columnBaseConfig);
}
