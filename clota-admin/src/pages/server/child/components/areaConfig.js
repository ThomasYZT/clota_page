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
        extraCssText : 'background : #ffffff;border: 1px solid #DFE3E9; box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);color:rgb(51, 51, 51);',
    },
    series : {
        type : 'line',
        areaStyle : {
            color : '#dbeefc'
        },
        smooth : true,
        color : ['#51abef'],
    }
};

export default function (xAxisData, seriesData,yAxisName,type) {
    let areaData = defaultsDeep({
        xAxis : {
            type : 'category',
            boundaryGap : true,
            //网格线
            splitLine : {
                show : false
            },
            //设置轴线的属性
            axisLine : {
                show : true,
                lineStyle : {
                    color : '#BFC5CB'
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
                color : '#999999',
                interval : 0
            },
            data : xAxisData
        },
        series : {
            data : seriesData.map(item => item.size)
        },
        yAxis : {
            name : yAxisName,
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
                    color : '#BFC5CB',
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
                color : '#999999'
            }
        },
        tooltip : {
            formatter ([data]) {
                let dataInfo = seriesData[data.dataIndex];
                //磁盘日志显示信息
                if (type === 'disk') {
                    return `<span style="color:#999999;">${dataInfo.ctime}</span><br/>
                        <span style="display: inline-block;padding-left: 20px;">磁盘已用${dataInfo.size ? dataInfo.size : '-'}M</span><br/>
                        <span style="display: inline-block;padding-left: 20px;">已用${dataInfo.totalSpace ? Number(dataInfo.size / dataInfo.totalSpace * 100).toFixed(2) : '-'}%</span><br/>
                        <span style="display: inline-block;padding-left: 20px;">可用${dataInfo.totalSpace ? Number(dataInfo.freeSpace / dataInfo.totalSpace * 100).toFixed(2) : '-'}%</span>
                    `;
                } else if (type === 'logFile') {//日志文件
                    return `<span style="color:#999999;">${dataInfo.ctime ? dataInfo.ctime.slice(0,10) : '-'}</span><br/>
                        <span style="display: inline-block;padding-left: 20px;">${dataInfo.size ? dataInfo.size : '-'}M</span>
                    `;
                }
            },
        }
    },areaConfig);
    return areaData;
}
