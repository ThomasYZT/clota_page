
import defaultsDeep from 'lodash/defaultsDeep';
//柱状图配置
const baseConfig = {
    tooltip : {
        trigger : 'axis',
        axisPointer : {
            lineStyle : {
                color : 'transparent'
            }
        },
        backgroundColor : '#fff',
        padding : [10, 15],
        textStyle : {
            color : '#333333',
            align : 'left'
        },
        confine : true,
        extraCssText : 'border: 1px solid #DFE3E9; box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10)'
    },
    grid : {
        top : 20,
        bottom : 25,
        left : 40,
        right : 40,
        containLabel : true
    },
    xAxis : {
        z : 10,
        //设置轴线的属性
        axisLine : {
            show : true,
            lineStyle : {
                color : '#B0BDC9'
            },
            z : 10,
            onZero : false
        },
        //轴线单位坐标线对应的方向
        axisTick : {
            show : true
        },
        //刻度标签文字
        axisLabel : {
            show : true,
            color : '#666666',
            interval : 0
        },
    },
    yAxis : {
        splitNumber : 4,
        //网格线
        splitLine : {
            show : true,
            lineStyle : {
                color : '#F5F5F5'
            }
        },
        axisLine : {
            show : true,
            lineStyle : {
                color : '#B0BDC9',
                width : 1
            },
            z : 10
        },
        //轴线单位坐标线对应的方向
        axisTick : {
            show : true
        },
        //刻度标签文字
        axisLabel : {
            show : true,
            color : '#666666'
        }
    },
    dataZoom : [
        {
            type : 'inside'
        }
    ],
    series : [
        {
            type : 'bar',
            barWidth : 25,
            label : {
                normal : {
                    show : true,
                    position : 'top',
                    color : '#999999'
                }
            },
            itemStyle : {
                normal : {
                    color : '#1890FF',
                    opacity : '0.85'
                },
                emphasis : {
                    color : '#1890FF',
                    opacity : '0.95'
                }
            }
        }
    ]
};

export const getConfig = function (xAxisData,seriesData) {
    return defaultsDeep({
        xAxis : {
            data : xAxisData
        },
        series : [
            {
                data : seriesData
            }
        ]
    },baseConfig);
};
