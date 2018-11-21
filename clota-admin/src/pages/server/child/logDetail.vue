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
                        key="disk">
            </area-com>

            <div class="log-file-desc">
                <div class="label"></div>
                日志文件-最小 ： {{minSize}}M 最大：{{maxSize}}M
            </div>

            <div class="log-history">
                <table-com
                    :table-data="tableData"
                    :table-height="tableHeight"
                    :column-data="columnData"
                    :row-click="false">
                </table-com>
                <div class="page-area" v-if="tableData.length > 0">
                    <el-pagination
                        :current-page="pageNo"
                        :page-sizes="pageSizeConfig"
                        :page-size="pageSize"
                        :layout="pageLayout"
                        :total="totalCount"
                        @size-change="sizeChange"
                        @current-change="pageNoChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import areaCom from './components/area';
    import tableCom from '../../index/child/tableCom';
    import tableMixins from '../../lessee/tableMixins';
    import ajax from '@/api/index.js';
    export default {
        mixins : [tableMixins],
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
                        field : 'ctime'
                    },
                    {
                        title : '时间',
                        minWidth : 70,
                        field : 'ctime'
                    },
                    {
                        title : '文件大小 M',
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
                }
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
                    this.queryLogTableData();
                }
            },
            /**
             * 查询日志信息
             * @param pageSize
             * @param pageNo
             */
            queryLog (pageSize,pageNo) {
                ajax.post('queryLog',{
                    ip : this.serverIp,
                    startTime : this.logDate[0].format('yyyy-MM-dd'),
                    endTime : this.logDate[1].format('yyyy-MM-dd'),
                    pageSize : pageSize ? pageSize : 9999,
                    page : pageNo ? pageNo : 1
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.list && res.data.list.length > 0) {
                            let legendData = res.data.list.sort((a,b) => a.ctime.toDate() - b.ctime.toDate());
                            this.logInfo.data = legendData.map(item => item.logSize);
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
                }).catch(err => {
                    this.logInfo = {
                        data : [],
                        legend : []
                    };
                });
            },
            /**
             * 每页条数改变
             * @param pageSize
             */
            sizeChange (pageSize) {
                this.pageSize = pageSize;
                this.queryLogTableData();
            },
            /**
             * 每页大小改变
             * @param pageNo
             */
            pageNoChange (pageNo) {
                this.pageNo = pageNo;
                this.queryLogTableData();
            },
            /**
             * 查询日志记录信息
             */
            queryLogTableData () {
                ajax.post('queryLog',{
                    ip : this.serverIp,
                    startTime : this.logDate[0].format('yyyy-MM-dd'),
                    endTime : this.logDate[1].format('yyyy-MM-dd'),
                    pageSize : this.pageSize,
                    page : this.pageNo
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.list && res.data.list.length > 0) {
                            this.tableData = res.data.list.sort((a,b) => a.ctime.toDate() - b.ctime.toDate());
                            this.totalCount = res.data.totalRecord;
                        } else {
                            this.tableData = [];
                            this.totalCount = 0;
                        }
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                }).catch(err => {
                    this.tableData = [];
                    this.totalCount = 0;
                }).finally(() => {
                    this.setTableHeight();
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
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams(to.params);
            });
        },
        computed : {
            //日志文件最大值
            maxSize () {
                let size = Number(Number(Math.max(...this.logInfo.data) / 1024).toFixed(2));
                return Number.isFinite(size) ? size : '-';
            },
            //日志文件最小值
            minSize () {
                let size = Number(Number(Math.min(...this.logInfo.data) / 1024).toFixed(2));
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
            .page-area {
                @include block_outline($height: 57px);
                text-align: right;

                /deep/ .el-pagination {
                    display: inline-block;
                    padding-top: 15px;
                }
            }
        }
    }
</style>
