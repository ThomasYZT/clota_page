<!--系统警告详情-->

<template>
    <div class="system-warn-alarm-detail">
        <bread-crumb-head
            :locale-router="$t('systemAlarm')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="alaram-list">
            <div class="time-chose">
                <DatePicker type="daterange"
                            v-model="timeselect"
                            placement="bottom-end"
                            style="width: 224px">
                </DatePicker>
            </div>
            <div class="alaram-table">
                <table-com
                    :table-data="tableData"
                    :table-height="tableHeight"
                    :column-data="columnData">
                </table-com>
                <div class="page-area" v-if="tableData.length > 0">
                    <el-pagination
                        :current-page="pageNo"
                        :page-sizes="pageSizeConfig"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="40">
                    </el-pagination>
                </div>
                <no-data class="no-data"
                         v-if="tableData.length < 1">
                </no-data>
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
    import noData from '@/components/noDataTip/noData-tip.vue';
    import loading from '@/components/loading/loading.vue';
    import {columns} from './systemAlarmConfig';

    export default {
        mixins: [tableMixins],
        components: {
            breadCrumbHead,
            tableCom,
            noData,
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
                timeselect: '',
                //是否在加载中
                isLoading: false,
                //表头配置
                columnData: columns,
                //容器去除不包含表格的高度
                spaceOffset: 209
            }
        },
        methods: {}
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
