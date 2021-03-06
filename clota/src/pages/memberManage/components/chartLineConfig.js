

import defaultsDeep from 'lodash/defaultsDeep';
import echarts from 'echarts/lib/echarts';
//基础配置
const baseConfig = {
    tooltip : {
        trigger : 'axis',
        backgroundColor : '#fff',
        padding : [10, 15],
        formatter : function ( params ) {
            if (params.length > 0) {
                let tooltip = '<span style="color: #666666;">' + params[0].name + '<br></span>' + params[0].value;
                return tooltip;
            }
        },
        textStyle : {
            color : '#333333',
        },
        confine : true,
        extraCssText : 'border: 1px solid #DFE3E9; box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10)'
    },
    grid : {
        top : 20,
        left : 10,
        right : 30,
        bottom : 22,
        containLabel : true
    },
    xAxis : {
        type : 'category',
        boundaryGap : false,
        //设置轴线的属性
        axisLine : {
            show : true,
            lineStyle : {
                color : '#B0BDC9'
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
            color : '#666666',
            margin : 10,
        },
        data : []
    },
    yAxis : {
        type : 'value',
        splitNumber : 4,
        axisLabel : {
            show : true,
            color : '#666666',
            fontSize : 12
        },
        //设置轴线的属性
        axisLine : {
            show : true,
            lineStyle : {
                color : '#B0BDC9'
            },
            z : 10
        },
        //网格线
        splitLine : {
            show : true,
            lineStyle : {
                color : '#F1F3FA'
            }
        },
    },
    series : [
        {
            type : 'line',
            itemStyle : {
                normal : {
                    color : '#3071CE',
                },
                emphasis : {
                    color : '#3071CE',
                }
            },
            //面积样式
            areaStyle : {
                normal : {
                    color : new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset : 0, color : '#D9E7FA' },
                            { offset : 1, color : '#F2F6FB' },
                        ]
                    )
                }
            },
            data : []
        },
    ],
};

/**
 * 获取配置信息
 * @param xAxisData
 * @param seriesData
 */
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
