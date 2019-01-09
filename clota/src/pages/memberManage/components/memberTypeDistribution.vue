<!--会员类别分布数据-->
<template>
    <div class="member-data-pie">
        <div class="data-header">
            <div class="title">{{$t("enterpriseMemberCardNum")}}</div>
        </div>
        <div class="filter-head">
            <!--时间范围选择-->
            <span :class="{'active': timeType === 'all'}"
                  class="date-range"
                  @click="changeTimeType('all')">{{$t("all")}}</span>
            <span :class="{'active': timeType === 'today'}"
                  class="date-range"
                  @click="changeTimeType('today')">{{$t("today")}}</span>
            <span :class="{'active': timeType === 'week'}"
                  class="date-range"
                  @click="changeTimeType('week')">{{$t("thisWeek")}}</span>
            <span :class="{'active': timeType === 'month'}"
                  class="date-range"
                  @click="changeTimeType('month')">{{$t("thisMonth")}}</span>
            <div class="date-range-filter">
                <DatePicker v-model="autoDefTIme"
                            format="yyyy-MM-dd"
                            type="daterange"
                            :clearable="false"
                            :editable="false"
                            transfer
                            placement="bottom-end"
                            style="width: 220px"
                            @on-change="dateChange">
                </DatePicker>
            </div>
        </div>
        <div class="data-content">
            <vue-echarts
                v-if="memberLevelData && memberLevelData.length > 0"
                ref="vueChart"
                :options="options"
                auto-resize>
            </vue-echarts>
            <no-data v-else>
            </no-data>
        </div>
    </div>
</template>

<script>

    import vueEcharts from '@/components/vueEcharts/eCharts.vue';
    import ajax from '@/api/index.js';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            vueEcharts,
            noData
        },
        data () {
            return {
                //会员等级数据
                memberLevelData : [],
                //会员总数
                memberCount : '',
                //当前查看的时间范围
                timeType : 'all',
                //自定义时间
                autoDefTIme : [],
            };
        },
        computed : {
            //环形图参数
            options () {
                let colorList = ['#0055B8', '#33C0BF', '#FD8CB1', '#FBC826','#22BB5F','#EB6751','#F7981C','#669ad5','#22BB5F'];
                let legendData = [], seriesData = [];
                for (let item of this.memberLevelData) {
                    let per = 0;
                    if (this.memberCount !== 0) {
                        per = Number(item.value * 100 / this.memberCount).toFixed(2);
                    }
                    //格式化图例数据
                    legendData.push(`${item.label}|${per}%|${item.value}`);
                    //设置环形图数据
                    seriesData.push(Object.assign({
                        name : `${item.label}|${per}%|${item.value}`
                    },item));
                }
                return {
                    tooltip : {
                        show : true,
                        trigger : 'item',
                        axisPointer : {
                            lineStyle : {
                                color : 'transparent'
                            }
                        },
                        formatter : (params) => {
                            return `${params.data.label}:${params.value}`;
                        },
                        backgroundColor : '#fff',
                        padding : [10, 15],
                        textStyle : {
                            color : '#333333',
                        },
                        confine : true,
                        extraCssText : 'border: 1px solid #DFE3E9; box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10)'
                    },
                    legend : {
                        // type: 'scroll',
                        // pageButtonPosition : 'end',
                        orient : 'vertical',
                        top : 'middle',
                        pageButtonGap : 10,
                        lineHeight : 56,
                        // bottom : 10,
                        // left: seriesData.length > 6 ? 170 : 250,
                        right : seriesData.length > 6 ? '3%' : '20%',
                        // left:  250,
                        itemGap : 18,
                        itemWidth : 8,
                        itemHeight : 8,
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
                        formatter : (data) => {
                            let dataArr = data.split('|');
                            let name = dataArr[0];
                            //超过4个字符的长度，显示省略号
                            if (name.length > 4) {
                                name = name.slice(0,4) + "...";
                            }
                            return `{name|${name}}{sg|}{per|${dataArr[1]}}{val|${dataArr[2]}}`;
                        },
                        data : legendData,
                    },
                    series : [
                        {
                            type : 'pie',
                            center : [90, '50%'],
                            radius : ['55%', '73%'],
                            avoidLabelOverlap : false,
//                            minAngle: 5, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互。
                            itemStyle : {
                                normal : {
                                    borderColor : '#FFFFFF',
                                    borderWidth : 2,
                                    color : ( params ) => {
                                        return colorList[params.dataIndex];
                                    }
                                }
                            },
                            label : {
                                normal : {
                                    show : true,
                                    position : 'center',
                                    formatter : ( params )=>{
                                        return this.memberCount;
                                    },
                                    textStyle : {
                                        fontSize : 26,
                                        color : 'rgba(0,0,0,0.85'
                                    }
                                }
                            },
                            labelLine : {
                                normal : {
                                    show : false
                                }
                            },
                            hoverAnimation : false,
                            data : seriesData
                        }
                    ]
                };
            },
            //筛选时间参数
            serachParams () {
                if (this.timeType === 'all') {//全部
                    return {
                        startTime : '1990-01-01',
                        endTime : '9999-12-31'
                    };
                } else if (this.timeType === 'today') {//当天
                    return {
                        startTime : new Date().format('yyyy-MM-dd'),
                        endTime : new Date().format('yyyy-MM-dd')
                    };
                } else if (this.timeType === 'week') {//本周
                    return {
                        startTime : new Date().addDays(-new Date().getDay() === 0 ? -new Date().getDay() - 6 : -new Date().getDay() + 1).format('yyyy-MM-dd'),
                        endTime : new Date().addDays(new Date().getDay() === 0 ? 0 : 7 - new Date().getDay()).format('yyyy-MM-dd'),
                    };
                } else if (this.timeType === 'month') {//本月
                    return {
                        startTime : new Date().format('yyyy-MM-01'),
                        endTime : new Date().addDays(-new Date().getDate()).addMonths(1).addDays(-1).format('yyyy-MM-dd'),
                    };
                } else if (this.timeType === 'autoDefTIme') {//自定义事件
                    return {
                        startTime : this.autoDefTIme[0] ? this.autoDefTIme[0].format('yyyy-MM-dd') : '',
                        endTime : this.autoDefTIme[1] ? this.autoDefTIme[1].format('yyyy-MM-dd') : '',
                    };
                }
            },
            ...mapGetters({
                memberConfigInfo : 'memberConfigInfo',
            }),
            //是否是售卖型会员卡
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否是成长型型会员卡
            cardIsGrowth () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'growth' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
        },
        methods : {
            /**
             * 获取对应时间的消费数据
             * @param timeType 时间类型
             */
            changeTimeType (timeType) {
                this.autoDefTIme = [];
                this.timeType = timeType;
                this.getCompanyCardTypeInfo();
            },
            /**
             * 自定义查看时间范围
             */
            dateChange () {
                this.timeType = 'autoDefTIme';
                this.getCompanyCardTypeInfo();
            },
            /**
             * 获取企业卡数据分布
             */
            getCompanyCardTypeInfo () {
                this.memberCount = 0;
                ajax.post('countCardsByTyeId',{
                    ...this.serachParams,
                    cardTypeId : '3'//业主卡-1 个人会员卡-2 企业卡-3
                }).then(res => {
                    if (res.success) {
                        this.memberLevelData = res.data ? res.data.map(item => {
                            this.memberCount += item.quantity;
                            return {
                                value : item.quantity,
                                label : item.levelDesc
                            };
                        }) : [];
                    } else {
                        this.memberLevelData = [];
                    }
                }).catch(() => {
                    this.memberLevelData = [];
                }).finally(() => {
                    this.$nextTick(() => {
                        if (this.$refs.vueChart) {
                            this.$refs.vueChart.refresh();
                        }
                    });
                });
            }
        },
        created () {
            this.getCompanyCardTypeInfo();
        }
    };
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

        .filter-head{
            @include block_outline($height : 40px);
            padding: 10px 20px 0 0;
            text-align: right;

            .date-range{
                display: inline-block;
                height: 30px;
                line-height: 30px;
                font-size: $font_size_14px;
                color: $color_7F8FA4;
                letter-spacing: 1px;
                margin-right: 10px;
                cursor: pointer;
                &.active{
                    color: $color_blue;
                }
            }

            .date-range-filter{
                vertical-align: middle;
                position: relative;
                display: inline-block;
                height: 30px;

                /deep/ .ivu-input{
                    cursor: pointer;
                }
            }
        }

        .data-content {
            height: calc(100% - 90px);
            position: relative;

            .echarts {
                @include block_outline(100%, 180px);
                max-width: 700px;
                margin: 0 auto;
            }
        }
    }
</style>
