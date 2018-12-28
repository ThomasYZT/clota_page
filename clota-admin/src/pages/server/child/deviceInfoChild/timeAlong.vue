<!--各个时间段设备使用情况-->

<template>
    <div class="serve-depart">
        <div class="day-tap">
            <ButtonGroup>
                <!-- 今日 -->
                <Button :class="{'ivu-active-tap' : activeTap === 'today','ivu-default-tap' : activeTap !== 'today'}"
                        @click="choseDay('today')">{{$t('today')}}
                </Button>
                <!-- 昨天 -->
                <Button
                    :class="{'ivu-active-tap' : activeTap === 'yesterday','ivu-default-tap' : activeTap !== 'yesterday'}"
                    @click="choseDay('yesterday')">{{$t('yesterday')}}
                </Button>
                <!-- 过去7天 -->
                <Button
                    :class="{'ivu-active-tap' : activeTap === 'passedSevenDays','ivu-default-tap' : activeTap !== 'passedSevenDays'}"
                    @click="choseDay('passedSevenDays')">{{$t('passedSevenDays')}}
                </Button>
                <!-- 过去30天 -->
                <Button
                    :class="{'ivu-active-tap' : activeTap === 'passedThirtyDays','ivu-default-tap' : activeTap !== 'passedThirtyDays'}"
                    @click="choseDay('passedThirtyDays')">{{$t('passedThirtyDays')}}
                </Button>
            </ButtonGroup>
        </div>
        <div class="device-detail">
            <div class="chart-circle">
                <no-data v-if="diskUsePer === '-'"></no-data>
                <template v-else>
                    <!-- 磁盘使用空间占比环形图 -->
                    <annlar :rate="diskUsePer"></annlar>
                    <div class="chart-name">{{$t('diskSpaceInfo')}}</div>
                    <div class="detail" @click="toDiskDetail" >
                        {{$t('look')}}
                        <span class="iconfont icon-pull-down"></span>
                    </div>
                </template>
            </div>
            <div class="chart-circle">
                <no-data v-if="logInfo.data.length < 1"></no-data>
                <template v-else>
                    <div class="area-map">
                        <!-- 日志文件面积图 -->
                        <area-com :y-yxis-name="$t('fileSize') + '(M)'"
                                  :series-data="logInfo.data"
                                  :legend-data="logInfo.legend"
                                  area-type="logFile"
                                  key="disk">
                        </area-com>
                    </div>
                    <div class="chart-name">{{$t('logFile',{ msg : '' })}}</div>
                    <div class="detail" @click="toLogDetail">
                        {{$t('look')}}
                        <span class="iconfont icon-pull-down"></span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import annlar from './annular';
    import areaCom from '../components/area';
    import ajax from '@/api/index.js';
    import noData from '@/components/noDataTip/noData-tip.vue';

    export default {
        props : {
            //服务器ip
            'server-ip' : {
                type : String,
                default : ''
            },
            //服务器名称
            'server-name' : {
                type : String,
                default : ''
            }
        },
        components : {
            annlar,
            noData,
            areaCom
        },
        data () {
            return {
                //当前激活的tap
                activeTap : 'today',
                //磁盘空间使用百分比
                diskUsePer : '-',
                //日志信息
                logInfo : {
                    data : [],
                    legend : []
                }
            };
        },
        methods : {
            /**
             * 选择tap
             * @param dayType
             */
            choseDay (dayType) {
                this.activeTap = dayType;
                this.queryMoreDiskSpaceDate();
                this.queryLog();
            },
            /**
             * 跳转的日志文件详情
             */
            toLogDetail () {
                this.$router.push({
                    name : 'logDetail',
                       params : {
                        ip : this.serverIp,
                        serverName : this.serverName
                    }
                });
            },
            /**
             * 跳转到磁盘监控详情
             */
            toDiskDetail () {
                let date = this.selectedDay();
                this.$router.push({
                    name : 'diskDetail',
                    params : {
                        ip : this.serverIp,
                        startTime : new Date(date.startTime),
                        endTime : new Date(date.endTime),
                        serverName : this.serverName
                    }
                });
            },
            /**
             * 查询磁盘空间信息
             */
            queryMoreDiskSpaceDate () {
                let date = this.selectedDay();
                ajax.post('queryMoreDiskSpaceDate',{
                    ip : this.serverIp,
                    startTime : date.startTime,
                    endTime : date.endTime,
                    pageSize : 10,
                    page : 1
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data && res.data.list && res.data.list.length > 0) {
                            let diskData = res.data.list[res.data.list.length - 1];
                            this.diskUsePer = Number(Number((diskData.totalSpace - diskData.freeSpace) / diskData.totalSpace * 100).toFixed(2));
                        } else {
                            this.diskUsePer = '-';
                        }
                    } else {
                        this.diskUsePer = '-';
                    }
                });
            },
            /**
             * 获取tap标签对应的日期信息
             */
            selectedDay () {
                //今天
                if (this.activeTap === 'today') {
                    return {
                        startTime : new Date().format('yyyy-MM-dd 00:00:00'),
                        endTime : new Date().format('yyyy-MM-dd 23:59:59'),
                    };
                } else if (this.activeTap === 'yesterday') {//昨天
                    return {
                        startTime : new Date().addDays(-1).format('yyyy-MM-dd 00:00:00'),
                        endTime : new Date().addDays(-1).format('yyyy-MM-dd 23:59:59'),
                    };
                } else if (this.activeTap === 'passedSevenDays') {//过去7天
                    return {
                        startTime : new Date().addDays(-7).format('yyyy-MM-dd 00:00:00'),
                        endTime : new Date().format('yyyy-MM-dd 23:59:59'),
                    };
                } else if (this.activeTap === 'passedThirtyDays') {//过去30天
                    return {
                        startTime : new Date().addDays(-30).format('yyyy-MM-dd 00:00:00'),
                        endTime : new Date().format('yyyy-MM-dd 23:59:59'),
                    };
                } else {
                    return {
                        startTime : '',
                        endTime : ''
                    };
                }
            },
            /**
             * 查询日志信息
             */
            queryLog () {
                ajax.post('queryLog',{
                    ip : this.serverIp,
                    startTime : new Date().addDays(-7).format('yyyy-MM-dd 00:00:00'),
                    endTime : new Date().format('yyyy-MM-dd 00:00:00'),
                    pageSize : 7,
                    page : 1
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.list && res.data.list.length > 0) {
                            let legendData = res.data.list.sort((a,b) => a.ctime.toDate() - b.ctime.toDate());
                            this.logInfo.data = legendData.map(item => {
                                return {
                                    size : item.logSize ? Number(item.logSize / 1024).toFixed(2) : 0,
                                    ...item
                                };
                            });
                            this.logInfo.legend = legendData.map(item => new Date(item.ctime).format('MM.dd'));
                        } else {
                            this.logInfo = {
                                data : [],
                                legend : []
                            };
                        }
                    } else {
                        this.logInfo = {
                            data : [],
                            legend : []
                        };
                    }
                });
            }
        },
        mounted () {
            this.queryMoreDiskSpaceDate();
            this.queryLog();
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .serve-depart {
        @include block_outline($height: auto);
        background: $color_fff;
        border: 1px solid $color_DFE2E5;
        border-radius: 4px;

        .day-tap {
            display: none;
            @include block_outline($height: 60px);
            border-bottom: 1px solid $color_E8E8E;
            padding: 15px 16px 0 16px;
        }

        .icon-pull-down::before{
            display: inline-block;
            color: $color_blue;
            transform: rotate(-90deg) scale(0.8);
        }

        .device-detail {
            @include block_outline($height: 278px);

            .chart-circle {
                position: relative;
                float: left;
                @include block_outline(50%);

                .chart-name {
                    clear: both;
                    font-size: $font_size_16px;
                    color: $color_353B5E;
                    text-align: center;
                    padding-top: 10px;
                }

                .detail {
                    width: 60px;
                    font-size: $font_size_12px;
                    color: $color_0082D5;
                    text-align: center;
                    cursor: pointer;
                    margin: 5px auto 0 auto;

                    .icon-pull-down{
                        vertical-align: middle;
                    }
                }

                .title-analysis {
                    position: relative;
                    font-size: $font_size_64px;
                    @include block_outline($height: 195px);

                    .log-name {
                        display: block;
                        // @include center_center();
                        color: $color_353B5E;
                        text-align: center;
                        padding-top: 80px;
                    }
                }

                .area-map{
                    @include block_outline($height : 200px);

                    .echarts{
                        @include block_outline();
                    }
                }
            }
        }
    }
</style>
