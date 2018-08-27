<template>
    <!--折线图-->
    <div class="member-chart-line">
        <div class="chart-left">
            <div class="lagend-container">
                <div class="chart-title">{{data.label1}}</div>
                <!--判断是否显示的是金额，如果是才对数值进行格式化-->
                <div class="chart-num" v-if="type === 'money'">{{data.total1 | moneyFilter | contentFilter}}</div>
                <div class="chart-num" v-else>{{data.total1 | contentFilter}}</div>
                <div class="chart-label">(截至目前）</div>
            </div>

            <div class="lagend-container">
                <div class="chart-title">{{data.label2}}</div>
                <!--判断是否显示的是金额，如果是才对数值进行格式化-->
                <div class="chart-num"  v-if="type === 'money'">{{data.total2 | moneyFilter | contentFilter}}</div>
                <div class="chart-num"  v-else>{{data.total2 | contentFilter}}</div>
                <div class="chart-label" v-if="type === 'integra'">(截至目前）</div>
            </div>

        </div>
        <div class="chart-right">
            <div class="filter">
                <!--时间范围选择-->
                <span :class="{'active': timeType === 'week'}"
                      @click="changeTimeType('week')">近7天</span>
                <span :class="{'active': timeType === 'month'}"
                      @click="changeTimeType('month')">近30天</span>
                <span :class="{'active': timeType === 'year'}"
                      @click="changeTimeType('year')">本年</span>
                <div class="date-range-filter">
                    <DatePicker v-model="autoDefTIme"
                                format="yyyy-MM-dd"
                                type="daterange"
                                :clearable="false"
                                :editable="false"
                                transfer
                                placement="bottom-end"
                                style="width: 319px"
                                @on-change="dateChange">
                    </DatePicker>
                </div>
            </div>
            <div class="line-content">
                <div class="label" v-if="type === 'money'">单位：万元</div>
                <div class="label" v-else></div>
                <vue-echarts
                    :options="chartConfig"
                    auto-resize
                    ref="vueCharts">
                </vue-echarts>
            </div>
        </div>
    </div>
</template>

<script>

    import vueEcharts from '@/components/vueEcharts/Echarts';
    import ajax from '@/api/index.js';
    import {getConfig} from './chartLineConfig';

    export default {
        props : {
            //图表数据
            data : {
                type : Object,
                default () {
                    return {}
                }
            },
            //当前类型
            type : {
                type : String,
                default : ''
            }
        },
        components: {
            vueEcharts,
        },
        data () {
            return {
                //图表数据
                seriesData: [],
                //横坐标轴数据
                xAxis: [],
                //当前日期类型
                timeType : 'week',
                //自定义时间
                autoDefTIme : []
            }
        },
        computed: {
            //图表配置
            chartConfig(){
                return getConfig(this.xAxis,this.seriesData);
            },
            //获取日期信息
            getDateInfo() {
                if(this.timeType === 'week'){//近7天数据
                    return {
                        startDate : new Date().addDays(-7).format('yyyy-MM-dd'),
                        endDate : new Date().format('yyyy-MM-dd'),
                    }
                }else if(this.timeType === 'month'){//近30天数据
                    return {
                        startDate : new Date().addDays(-30).format('yyyy-MM-dd'),
                        endDate : new Date().format('yyyy-MM-dd'),
                    }
                }else if(this.timeType === 'year'){//本年数据
                    let year = String(new Date().getFullYear());
                    return {
                        startDate : new Date(year).format('yyyy-MM-dd'),
                        endDate : new Date().format('yyyy-MM-dd'),
                    }
                }else if(this.timeType === 'autoDefTIme'){//自定义时间范围
                    return {
                        startDate : this.autoDefTIme[0] ? this.autoDefTIme[0].format('yyyy-MM-dd') : '',
                        endDate : this.autoDefTIme[1] ? this.autoDefTIme[1].format('yyyy-MM-dd') : '',
                    }
                }
            }
        },
        methods : {
            /**
             * 获取消费图表数据
             */
            getMemberConsumeSumGroupBy () {
                ajax.post('getMemberConsumeSumGroupBy',{
                    startDate : this.getDateInfo.startDate,
                    endDate : this.getDateInfo.endDate,
                    accountType : this.type === 'money' ? '1' : '2',
                    accOperType : 'consume',
                }).then(res => {
                    this.xAxis = [];
                    this.seriesData = [];
                    if(res.success){
                        if(res.data && Object.keys(res.data).length > 0){
                            for(let item in res.data){
                                this.xAxis.push(item ? item.slice(5) : '');
                                this.seriesData.push({
                                    name : item ? item.slice(5) : '',
                                    value : res.data[item]
                                });
                            }
                        }
                    }
                }).catch(err => {
                    this.xAxis = [];
                    this.seriesData = [];
                }).finally(() => {
                    this.$nextTick(() => {
                        this.$refs.vueCharts.refresh();
                    });
                });
            },
            /**
             * 获取对应时间的消费数据
             * @param timeType 时间类型
             */
            changeTimeType(timeType) {
                this.autoDefTIme = [];
                this.timeType = timeType;
                this.getMemberConsumeSumGroupBy();
            },
            /**
             * 自定义查看时间范围
             */
            dateChange () {
                this.timeType = 'autoDefTIme';
                this.getMemberConsumeSumGroupBy();
            }
        },
        created () {
            this.getMemberConsumeSumGroupBy();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-chart-line{
        height: 100%;
        @include clearfix();

        .chart-left{
            height: 100%;
            width: 230px;
            float: left;
            border-right: 1px solid $color_E1E1E1;
            display: inline-block;
            text-align: center;

            .lagend-container{
                padding: 35px 0 0 32px;
                text-align: left;

                .chart-title{
                    font-size: $font_size_14px;
                    color: $color_999;
                }

                .chart-num{
                    font-size: $font_size_22px;
                    color: $color_353B5E;
                }

                .chart-label{
                    font-size: $font_size_12px;
                    color: $color_999;
                }

            }

        }

        .chart-right{
            width: calc(100% - 232px);
            height: 100%;
            display: inline-block;

            .filter{
                height: 48px;
                padding: 17px 45px 0;
                text-align: right;

                >span{
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
                    width: 320px;
                    display: inline-block;
                    height: 30px;

                    /deep/ .ivu-input{
                        cursor: pointer;
                    }
                }
            }

            .line-content{
                height: calc(100% - 50px);
                padding: 0 20px;

                .label{
                    height: 20px;
                    font-size: $font_size_12px;
                    color: $color_999;
                    padding-left: 60px;
                }

                .echarts {
                    @include block_outline(100%, 190px);
                    margin: 0 auto;
                }
            }
        }

    }
</style>
