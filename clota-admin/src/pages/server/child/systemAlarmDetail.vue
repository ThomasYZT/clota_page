<!--系统警告详情-->

<template>
    <div class="system-warn-alarm-detail">
        <bread-crumb-head
            :locale-router="$t('systemAlarm')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="alaram-list">
            <div class="time-chose">
                <DatePicker type="date"
                            v-model="timeselect"
                            placement="bottom-end"
                            style="width: 224px"
                            @on-change="queryMoreWarningData">
                </DatePicker>
            </div>
            <div class="alaram-table">
                <table-com
                    :table-data="tableData"
                    :table-height="tableHeight"
                    :column-data="columnData">
                    <el-table-column
                        slot="column0"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            <span class="iconfont"
                                  :class="{'icon-warn' : scoped.row.warningLevel === '2',
                                  'icon-error' : scoped.row.warningLevel === '1',
                                  'icon-mind' : scoped.row.warningLevel === '3'}"></span>
                            {{scoped.row.message}}
                        </template>
                    </el-table-column>
                </table-com>
                <div class="page-area" v-if="totalCount > 0">
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
                <loading :visible="isLoading">
                </loading>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import tableCom from '../../index/child/tableCom';
    import tableMixins from '../../lessee/tableMixins';
    import loading from '@/components/loading/loading.vue';
    import {columns} from './systemAlarmConfig';
    import ajax from '@/api/index.js';

    export default {
        mixins: [tableMixins],
        components: {
            breadCrumbHead,
            tableCom,
            loading
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('serverList'),
                        router: {
                            name: 'server'
                        }
                    },
                    {
                        name: this.$t('deviceInfo'),
                        router: {
                            name: 'serverDetail'
                        }
                    }
                ],
                //选择的日期
                timeselect: new Date(),
                //是否在加载中
                isLoading: false,
                //表头配置
                columnData: columns,
                //容器去除不包含表格的高度
                spaceOffset: 209,
                //服务器ip
                serverIp : '',
                //系统警报列表
                tableData : []
            }
        },
        methods: {
            /**
             * 查询系统报警事件
             */
            queryMoreWarningData () {
                ajax.post('queryMoreWarningData',{
                    ip : this.serverIp,
                    pageSize : this.pageSize,
                    page : this.pageNo,
                    ctime : this.timeselect.format('yyyy-MM-dd')
                }).then(res => {
                    if(res.status === 200){
                        this.tableData = res.data.list ? res.data.list : [];
                        this.totalCount = res.data.totalRecord;
                    }else{
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
             * 获取路由参数
             * @param params
             */
            getParams(params) {
                if(params.ip){
                    this.serverIp = params.ip;
                    this.queryMoreWarningData();
                }
            },
            /**
             * 每页条数改变
             * @param pageSize
             */
            sizeChange (pageSize) {
                this.pageSize = pageSize;
                this.queryMoreWarningData();
            },
            /**
             * 每页大小改变
             * @param pageNo
             */
            pageNoChange(pageNo) {
                this.pageNo = pageNo;
                this.queryMoreWarningData();
            }
        },
        beforeRouteEnter(to,from,next) {
            next(vm => {
                vm.getParams(to.params);
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .system-warn-alarm-detail {
        @include block_outline();

        .alaram-list {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 0 60px;
            overflow: auto;

            .time-chose {
                padding: 14px 0;
                @include block_outline($height: 60px);
            }

            .alaram-table {
                @include block_outline($height: unquote('calc(100% - 80px)'));
            }

            .page-area {
                @include block_outline($height: 57px);
                text-align: right;

                /deep/ .el-pagination {
                    display: inline-block;
                    padding-top: 15px;
                }
            }

            .no-data {
                @include no_data();
            }
        }
    }
</style>
