import defaultsDeep from 'lodash/defaultsDeep';

const pieBaseConfig = {
    legend : {
        bottom : 10,
        itemGap : 5,
        itemWidth : 5,
        /*textStyle : {
            color : '#fff',
            fontSize : '10'
        },*/
        data : []
    },
    tooltip : {
        trigger : "axis",
        axisPointer : { // 坐标轴指示器，坐标轴触发有效
            type : 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle : {
                color : '#E8E8E8'
            }
        },
        // formatter : '{b}<br />{a}: {c0}',
        // formatter : function (param) {
        //     param = param[0];
        //     // console.log(param)
        //     return [
        //         param.name + '<br />',
        //         param.data + '<br/>',
        //     ].join('');
        // },
        backgroundColor : 'rgba(0,0,0,0.7)', // 背景
        padding : [8, 10], //内边距
        extraCssText : 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
    },
    xAxis : [{
        type : "category",
        axisLine : {
            lineStyle : {
                color : '#B0BDC9'
            }
        },
        splitLine : {
            show : false,
            lineStyle : {
                color : '#F1F3FA',
            }
        },
        boundaryGap : false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
        axisTick : {
            show : true
        },
        splitArea : {
            show : false
        },
        axisLabel : {
            inside : false,
            textStyle : {
                color : '#666',
                fontWeight : 'normal',
                fontSize : '12',
            },
            margin : 15
        },
        data : [],
    }],
    yAxis : {
        type : 'value',
        axisTick : {
            show : true
        },
        axisLine : {
            show : true,
            lineStyle : {
                color : '#B0BDC9',
            }
        },
        splitLine : {
            show : true,
            lineStyle : {
                color : '#F1F3FA',
            }
        },
        axisLabel : {
            textStyle : {
                color : '#666',
                fontWeight : 'normal',
                fontSize : '12',
            },
            margin : 15
        },
    },
    series : []
};

export default function (xAxisData, seriesData, legendData) {
    let seriesOption = [];
    let option = {
        type : 'line',
        symbolSize : 1,//标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10[ default: 4 ]
        symbol : 'circle',//标记的图形。ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
        smooth : true, //是否平滑曲线显示
        showSymbol : false, //是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
        itemStyle : {
            normal : {
                color : '#00B6C2',
                lineStyle : {
                    width : 2,
                    type : 'solid' //'dotted'虚线 'solid'实线
                },
                borderColor : '#00B6C2', //图形的描边颜色。支持的格式同 color
                borderWidth : 0 ,//描边线宽。为 0 时无描边。[ default: 0 ]
                barBorderRadius : 0,
                label : {
                    show : false,
                },
                opacity : 0.5,
            }
        },
        data : [],
    };
    if (seriesData && seriesData.length > 0) {
        for (let i = 0, len = seriesData.length; i < len; i++) {
            option.data = seriesData[i];
            seriesOption.push(option);
        }
    } else {
        seriesOption = [option];
    }

    return defaultsDeep({
        legend : {
            data : legendData
        },
        xAxis : [{
            data : xAxisData
        }],
        series : seriesOption
    }, pieBaseConfig);
}
