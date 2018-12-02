import defaultsDeep from 'lodash/defaultsDeep';
const defaultConfig = {
    color : [],
    title : {
        show : false
    },
    tooltip : {
        trigger : 'axis',
        formatter : function () {},
        backgroundColor : 'rgba(0,0,0,0.8)',
        padding : [9, 12]
    },
    legend : {
        orient : 'horizontal',
        textStyle : {
            fontSize : 14,
            rich : {
                name : {
                    width : 60,
                    color : '#666666',
                    padding : [0,5,0,0]
                },
                per : {
                    width : 60,
                    color : '#999999',
                    padding : [0,0,0,10]
                },
                val : {
                    color : '#333333'
                },
                sg : {
                    borderColor : '#aaa',
                    width : 1,
                    height : 12,
                    backgroundColor : '#D9D9D9'
                }
            }
        },
        bottom : 20,
        pageButtonGap : 10,
        lineHeight : 56,
        itemGap : 50,
        itemWidth : 16,
        itemHeight : 8,
        show : true,
        data : []
    },
    grid : {
        left : '3%',
        right : '4%',
        bottom : '10%',
        containLabel : true
    },
    toolbox : {
        feature : {
            saveAsImage : {}
        }
    },
    xAxis : {
        type : 'category',
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
        axisLine : {
            lineStyle : {
                color : '#B0BDC9'
            }
        },
        axisLabel : {
            color : '#666',
        }
    },
};

export const defaultSeries = {
    type : 'line',
    data : []
};

export const barSeries = {
    type : 'bar',
    data : []
};


export const getLineConfig = ({ color, legendData, seriesData, xAxisData, formatter }) => {
    return defaultsDeep({
        color : color,
        legend : {
            data : legendData
        },
        xAxis : {
            data : xAxisData
        },
        series : seriesData,
        tooltip : {
            formatter : formatter
        }
    }, defaultConfig);
};
