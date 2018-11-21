import defaultsDeep from 'lodash/defaultsDeep';
const defaultConfig = {
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
        data : []
    },
    grid : {
        left : '3%',
        right : '4%',
        bottom : '3%',
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


export const getLineConfig = ({ legendData, seriesData, xAxisData, formatter }) => {
    return defaultsDeep({
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
