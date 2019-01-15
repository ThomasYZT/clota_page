import defaultsDeep from 'lodash/defaultsDeep';
import common from '../../../assets/js/common';
import i18n from '../../../assets/lang/lang.config';
const pieBaseConfig = {
    color : ['#2498b8', '#00B6C2', '#F8AAC4', '#FBC826', '#FB7A89', '#64BFFA', '#71CF7F', '#8B8DFD', 'F8DB8E'],
    legend : {
        type : 'scroll',
        orient : 'horizontal',
        bottom : 5,
        pageButtonGap : 10,
        lineHeight : 17,
        itemGap : 30,
        itemWidth : 16,
        itemHeight : 2,
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
        formatter : function (param) {
            let html = '';
            let date = param.length > 0 && param[0].data && param[0].data.time ? param[0].data.time : '';
            let week = common.getWeekDay(new Date(date));
            html += `<p>${date} ${i18n.messages[i18n.locale][week]}</p>`;
            param.forEach((item,index) => {
                html += `<p>
                        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${param[index] ? param[index].color : '#22BB5F'}"></span>
                        <span style='color:#fff'>${item.data.name} : </span> <span>${item.data.value}</span>
                        </p>`;
            });
            return html;
        },
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
    if (seriesData) {
        seriesData.forEach(item => {
            seriesOption.push(defaultsDeep(item, option));
        });
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
