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
                    v-if="serverIp"
                    :column-data="columnData"
                    :table-data="tableData"
                    :border="true"
                    :page-no-d.sync="pageNo"
                    :show-pagination="true"
                    :page-size-d.sync="pageSize"
                    :total-count="totalCount"
                    :ofset-height="190"
                    @query-data="queryMoreWarningData">
                    <el-table-column
                        slot="columnmessage"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            <span class="iconfont"
                                  :class="{'icon-warn' : scoped.row.warningLevel === '2',
                                  'icon-error' : scoped.row.warningLevel === '1',
                                  'icon-mind' : scoped.row.warningLevel === '3'}"></span>
                            {{scoped.row.message | contentFilter}}
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columns } from './systemAlarmConfig';
    import ajax from '@/api/index.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js'

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            tableCom,
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
                //选择的日期
                timeselect : new Date(),
                //表头配置
                columnData : columns,
                //服务器ip
                serverIp : '',
                //系统警报列表
                tableData : [],
                pageNo : 1,
                pageSize : 10,
                totalCount : 0,
            };
        },
        methods : {
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
                    if (res.status === 200) {
                        this.tableData = res.data ? res.data.list : [];
                        this.totalCount = res.data ? Number(res.data.totalRecord) : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params.ip) {
                    this.serverIp = params.ip;
                } else {
                    this.$router.push({
                        name : 'serverDetail'
                    });
                }
            },
        }
    };
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
