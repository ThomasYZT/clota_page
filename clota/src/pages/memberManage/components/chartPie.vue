<!--会员分布数据-->
<template>
    <div class="member-data-pie">
        <div class="data-header">
            <div class="title">{{$t("memberDistribute")}}</div>
        </div>

        <div class="data-content">
            <vue-echarts
                ref="vueChart"
                :options="options"
                auto-resize>
            </vue-echarts>
        </div>
    </div>
</template>

<script>

    import vueEcharts from '@/components/vueEcharts/Echarts';
    import ajax from '@/api/index.js';

    export default {
        components: {
            vueEcharts
        },
        data () {
            return {
                //会员等级数据
                memberLevelData : [],
                //会员总数
                memberCount : ''
            }
        },
        computed: {
            //环形图参数
            options(){
                let colorList = ['#0055B8', '#33C0BF', '#FD8CB1', '#FBC826','#22BB5F','#EB6751','#F7981C','#669ad5','#22BB5F'];
                let legendData = [], seriesData = [];
                for(let item of this.memberLevelData){
                    let per = 0;
                    if(this.memberCount !== 0){
                        per = Number(item.value  * 100 / this.memberCount).toFixed(2);
                    }
                    //格式化图例数据
                    legendData.push(`${item.label}|${per}%|${item.value}`);
                    //设置环形图数据
                    seriesData.push(Object.assign({
                        name : `${item.label}|${per}%|${item.value}`
                    },item));
                }
                return {
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        axisPointer: {
                            lineStyle: {
                                color: 'transparent'
                            }
                        },
                        formatter: (params) => {
                            return `${params.data.label}:${params.value}`;
                        },
                        backgroundColor: '#fff',
                        padding: [10, 15],
                        textStyle: {
                            color: '#333333',
                        },
                        confine: true,
                        extraCssText: 'border: 1px solid #DFE3E9; box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10)'
                    },
                    legend: {
                        // type: 'scroll',
                        // pageButtonPosition : 'end',
                        orient: 'vertical',
                        top: 'middle',
                        pageButtonGap : 10,
                        lineHeight: 56,
                        // bottom : 10,
                        left: seriesData.length > 6 ? 170 : 250,
                        // left:  250,
                        itemGap: 18,
                        itemWidth: 8,
                        itemHeight: 8,
                        textStyle: {
                            fontSize: 14,
                            rich: {
                                name: {
                                    width : 60,
                                    color: '#666666',
                                    padding : [0,5,0,0]
                                },
                                per: {
                                    width : 60,
                                    color: '#999999',
                                    padding : [0,0,0,10]
                                },
                                val : {
                                    color : '#333333'
                                },
                                sg : {
                                    borderColor: '#aaa',
                                    width: 1,
                                    height: 12,
                                    backgroundColor :'#D9D9D9'
                                }
                            }
                        },
                        formatter: (data) => {
                            let dataArr = data.split('|');
                            return `{name|${dataArr[0]}}{sg|}{per|${dataArr[1]}}{val|${dataArr[2]}}`;
                        },
                        data: legendData,
                    },
                    series: [
                        {
                            type:'pie',
                            center: [90, '50%'],
                            radius: ['55%', '73%'],
                            avoidLabelOverlap: false,
//                            minAngle: 5, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互。
                            itemStyle: {
                                normal: {
                                    borderColor: '#FFFFFF',
                                    borderWidth: 2,
                                    color: ( params ) => {
                                        return colorList[params.dataIndex];
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter: ( params )=>{
                                        return this.memberCount;
                                    },
                                    textStyle: {
                                        fontSize: 26,
                                        color: 'rgba(0,0,0,0.85'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            hoverAnimation: false,
                            data: seriesData
                        }
                    ]
                }
            }
        },
        methods: {
            /**
             * 获取会员等级数量
             */
            getMemberLevelCount () {
                this.memberCount = 0;
                ajax.post('getMemberLevelCount').then(res => {
                    if(res.success){
                        this.memberLevelData = res.data ? res.data.map(item => {
                            this.memberCount += item.levelCount;
                            return {
                                value : item.levelCount,
                                label : item.levelName
                            }
                        }) : [];
                    }else{
                        this.memberLevelData = [];
                    }
                }).catch(err => {
                    this.memberLevelData = [];
                }).finally(() => {
                    this.$nextTick(() => {
                        this.$refs.vueChart.refresh();
                    });
                });
            }
        },
        created () {
            this.getMemberLevelCount();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-data-pie{
        @include block_outline();
        background: $color_fff;
        border: 1px solid $color_DFE2E5;
        border-radius: 4px;
        position: relative;

        .data-header{
            height: 50px;
            line-height: 48px;
            padding: 0 20px;
            border-bottom: 1px solid $color_E1E1E1;
            @include clearfix();

            .title{
                display: inline-block;
                color: $color_353B5E;
                font-size: $font_size_18px;
            }

        }

        .data-content {
            height: calc(100% - 50px);
            padding-top: 10px;
            .echarts {
                @include block_outline(100%, 175px);
                margin: 0 auto;
            }
        }
    }
</style>
