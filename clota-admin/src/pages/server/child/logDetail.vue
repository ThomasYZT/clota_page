<!--日志详情-->

<template>
    <div class="log-detail">
        <bread-crumb-head
            :locale-router="$t('logFile',{msg : serverName})"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="log-info">
            <div class="time-chose">
                <DatePicker type="daterange"
                            placement="bottom-end"
                            style="width: 280px"
                            v-model="logDate"
                            @on-change="dateChange">
                </DatePicker>
            </div>
            <!-- 日志文件面积图 -->
            <area-com :y-yxis-name="$t('fileSize')"
                        :series-data="logInfo.data"
                        :legend-data="logInfo.legend"
                        area-type="logFile"
                        key="disk">
            </area-com>

            <div class="log-file-desc">
                <div class="label"></div>
                日志文件-最小 ： {{minSize}}M 最大：{{maxSize}}M
            </div>

            <div class="log-history">
                <table-com
                    v-if="serverIp"
                    :column-data="columnData"
                    :table-data="tableData"
                    :border="true"
                    :page-no-d.sync="pageNo"
                    :show-pagination="true"
                    :page-size-d.sync="pageSize"
                    :total-count="totalCount"
                    :ofset-height="190"
                    @query-data="queryLogTableData">
                    <el-table-column
                        slot="columndate"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            {{scoped.row.ctime ? scoped.row.ctime.slice(0,10) : '-'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="columntime"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            {{scoped.row.ctime ? scoped.row.ctime.substr(11) : '-'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="columnlogSize"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            {{scoped.row.logSize ? Number(scoped.row.logSize / 1024).toFixed(2) : '-'}}
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import areaCom from './components/area';
    import tableCom from '@/components/tableCom/tableCom';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js'
    import ajax from '@/api/index.js';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            areaCom,
            tableCom
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : this.$t('serverList'),
                        router : {
                            name : 'server'
                        }
                    },
                    {
                        name : this.$t('deviceInfo'),
                        router : {
                            name : 'serverDetail'
                        }
                    }
                ],
                //筛选的日志时间
                logDate : [new Date().addDays(-7),new Date()],
                //表头数据
                columnData : [
                    {
                        title : '日期',
                        minWidth : 70,
                        field : 'date'
                    },
                    {
                        title : '时间',
                        minWidth : 70,
                        field : 'time'
                    },
                    {
                        title : '文件大小(M)',
                        minWidth : 70,
                        field : 'logSize'
                    },
                ],
                //表格数据
                tableData : [],
                //服务器ip
                serverIp : '',
                //服务器名称
                serverName : '',
                //日志信息
                logInfo : {
                    data : [],
                    legend : []
                },
                pageNo : 1,
                pageSize : 10,
                totalCount : 0,
            };
        },
        methods : {
             /**
             * 获取路由数据
             */
            getParams (params) {
                if (params.ip) {
                    this.serverIp = params.ip;
                    this.serverName = params.serverName;
                    this.queryLog();
                } else {
                    this.$router.push({
                        name : 'serverDetail'
                    });
                }
            },
            /**
             * 查询日志信息
             */
            queryLog () {
                ajax.post('queryLog',{
                    ip : this.serverIp,
                    startTime : this.logDate[0].format('yyyy-MM-dd 00:00:00'),
                    endTime : this.logDate[1].format('yyyy-MM-dd 23:59:59'),
                    pageSize : this.pageSize,
                    page : this.pageNo
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data && res.data.list && res.data.list.length > 0) {
                            let legendData = res.data.list.sort((a,b) => (a.ctime ? a.ctime.toDate() : '') - (b.ctime ? b.ctime.toDate() : ''));
                            this.logInfo.data = legendData.map(item => {
                                return  {
                                    size : item.logSize ? Number(Number(item.logSize / 1024).toFixed(2)) : 0,
                                    ...item
                                }
                            });
                            this.logInfo.legend = legendData.map(item => item.ctime ? new Date(item.ctime).format('MM.dd') : '');
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
            },
            /**
             * 查询日志记录信息
             */
            queryLogTableData () {
                ajax.post('queryLog',{
                    ip : this.serverIp,
                    startTime : this.logDate[0].format('yyyy-MM-dd 00:00:00'),
                    endTime : this.logDate[1].format('yyyy-MM-dd 23:59:59'),
                    pageSize : this.pageSize,
                    page : this.pageNo
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data && res.data.list && res.data.list.length > 0) {
                            this.tableData = res.data.list.sort((a,b) => a.ctime.toDate() - b.ctime.toDate());
                            this.totalCount = res.data ? Number(res.data.totalRecord) : 0;
                        } else {
                            this.tableData = [];
                            this.totalCount = 0;
                        }
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 日期改变重新获取日志信息
             */
            dateChange () {
                this.queryLogTableData();
                this.queryLog();
            }
        },
        computed : {
            //日志文件最大值
            maxSize () {
                let size = Number(Math.max(...this.logInfo.data.map(item => item.size)));
                return Number.isFinite(size) ? size : '-';
            },
            //日志文件最小值
            minSize () {
                let size = Number(Math.min(...this.logInfo.data.map(item => item.size)));
                return Number.isFinite(size) ? size : '-';
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .log-detail{
        @include block_outline();
        background: $color_f4f6f9;
        overflow: auto;

        .log-info{
            min-height: calc(100% - 74px);
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 0 60px;
            overflow: auto;

            .log-file-desc{
                text-align: center;
                font-size: $font_size_14px;
                color: $color_333;
                @include block_outline($height : 30px);
                line-height: 30px;
                margin-top: 10px;

                .label{
                    @include block_outline(15px,15px);
                    display: inline-block;
                    vertical-align: sub;
                    background: $color_green;
                }
            }

            .time-chose{
                @include block_outline($height : 60px);
                padding: 14px 0;

                .name {
                    float: left;
                    font-size: $font_size_14px;
                    color: $color_333;
                    @include block_outline(auto,32px);
                    line-height: 32px;
                }

                /deep/ .ivu-date-picker{
                    float: right;
                }
            }

            /deep/ .echarts{
                @include block_outline(100%,400px);
            }

            .log-history{
                margin-top: 30px;
            }
        }
    }
</style>
