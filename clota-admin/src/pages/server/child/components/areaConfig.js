import defaultsDeep from 'lodash/defaultsDeep';

const areaConfig = {
    xAxis : {
        type : 'category',
        boundaryGap : false
    },
    yAxis : {
        type : 'value'
    },
    grid : {
        left : 30,
        right : 20,
        bottom : 0,
        top : 40,
        containLabel : true
    },
    tooltip : {
        trigger : 'axis',
        axisPointer : {
            label : {
                backgroundColor : '#6a7985'
            }
        },
        extraCssText : 'background : #ffffff;border: 1px solid #DFE3E9; box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);color:rgb(51, 51, 51);'
    },
    series : [{
        type : 'line',
        areaStyle : {
            color : '#dbeefc'
        },
        smooth : true,
        color : ['#51abef']
    }]
};

export default function (xAxisData, seriesData,yAxisName) {
    let areaData = defaultsDeep({
        xAxis : {
            data : xAxisData
        },
        series : [
            {
                data : seriesData
            }
        ],
        yAxis : {
            name : yAxisName
        }
    },areaConfig);
    return areaData;
}
