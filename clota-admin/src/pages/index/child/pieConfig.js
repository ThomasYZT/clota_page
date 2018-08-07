import {defaultsDeep} from 'lodash';

//饼图配置信息
// export default {
//   series : [
//     {
//       data:[
//         {
//           value:535,
//           name: '荆州',
//           label: {
//             normal: {
//               formatter: '{b|{b}}\n{per|{d}%}  ',
//               rich: {
//                 b: {
//                   color: '#666666',
//                   fontSize: 12,
//                   lineHeight: 20,
//                   padding: [2, 4],
//                 },
//                 per: {
//                   color: '#666666',
//                   fontSize: 12,
//                 }
//               }
//             }
//           },
//         },
//         {
//           value:510,
//           name: '兖州',
//           label: {
//             normal: {
//               formatter: '{b|{b}}\n{per|{d}%}  ',
//               rich: {
//                 b: {
//                   color: '#666666',
//                   fontSize: 12,
//                   lineHeight: 20,
//                   padding: [2, 4],
//                 },
//                 per: {
//                   color: '#666666',
//                   fontSize: 12,
//                 }
//               }
//             }
//           },
//         },
//         {
//           value:634,
//           name: '益州',
//           label: {
//             normal: {
//               formatter: '{b|{b}}\n{per|{d}%}  ',
//               rich: {
//                 b: {
//                   color: '#666666',
//                   fontSize: 12,
//                   lineHeight: 20,
//                   padding: [2, 4],
//                 },
//                 per: {
//                   color: '#666666',
//                   fontSize: 12,
//                 }
//               }
//             }
//           },
//         },
//         {
//           value:735,
//           name: '西凉',
//           label: {
//             normal: {
//               formatter: '{b|{b}}\n{per|{d}%}  ',
//               rich: {
//                 b: {
//                   color: '#666666',
//                   fontSize: 12,
//                   lineHeight: 20,
//                   padding: [2, 4],
//                 },
//                 per: {
//                   color: '#666666',
//                   fontSize: 12,
//                 }
//               }
//             }
//           },
//         }
//       ]
//     }
//   ]
// };

const pieBaseConfig = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        bottom: 10,
        left: 'center',
        data: []
    },
    series: [
        {
            type: 'pie',
            radius: '73',
            center: ['50%', '50%'],
            selectedMode: 'single',
            color: [
                '#0071BC',
                '#55C6C5',
                '#F8AAC4',
                '#FDB252',
                '#F6857E',
                '#6FD6E3',
                '#71CF7F',
                '#5B9DF3',
                '#D990E3',
                '#8B8DFD',
                '#F0E21A',
                '#64BFFA',
            ],
            hoverAnimation: false,
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

export default function (legendData, seriesData) {
    let data = [];
    for (let i = 0, j = seriesData.length; i < j; i++) {
        data.push({
            value: seriesData[i].value,
            name: seriesData[i].name,
            label: {
                normal: {
                    formatter: '{b|{b}}\n{per|{d}%}  ',
                    rich: {
                        b: {
                            color: '#666666',
                            fontSize: 12,
                            lineHeight: 20,
                            padding: [2, 4],
                        },
                        per: {
                            color: '#666666',
                            fontSize: 12,
                        }
                    }
                }
            },
        });
    }
    return defaultsDeep(pieBaseConfig, {
        legend: {
            data: legendData
        },
        series: [
            {
                data: data
            }
        ]
    });
}
