<!--
    会员权益优惠券推送记录表格
    作者：杨泽涛
-->
<template>
    <div class="">
        <table-com :column-data="columnData"
                   :table-data="tableData"
                   :border="true"
                   :show-pagination="true"
                   :total-count="totalCount"
                   :ofset-height="170"
                   :page-no-d.sync="pageNo"
                   :page-size-d.sync="pageSize"
                   @query-data="queryList">
            <!-- 优惠券类型 -->
            <el-table-column
                slot="column3"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <!--<span class="line-info" @click="showLog('all', scope.row)">-->
                        <!--{{scope.row.couponType ? $t(scope.row.couponType) : '-'}}-->
                    <!--</span>-->
                    <span>
                        {{scope.row.couponType ? $t(scope.row.couponType) : '-'}}
                    </span>
                </template>
            </el-table-column>
            <!-- 已发放数量 -->
            <el-table-column
                slot="column6"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="line-info" @click="showLog('all', scope.row)">
                        {{scope.row.optCount | contentFilter }}
                    </span>
                </template>
            </el-table-column>
            <!-- 已使用 -->
            <el-table-column
                slot="column7"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="line-info" @click="showLog('used', scope.row)">
                        {{scope.row.usedNum | contentFilter }}
                    </span>
                </template>
            </el-table-column>
            <!-- 未使用 -->
            <el-table-column
                slot="column8"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="line-info" @click="showLog('noUse', scope.row)">
                        {{scope.row.waitNum | contentFilter }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column9"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <!-- 详细 -->
                        <li @click="detail(scope.row)">{{$t('details')}}</li>
                        <!-- 推送卡级 -->
                        <li>
                            <Tooltip transfer placement="bottom">
                                <span @click="queryLevelNames(scope.row)">{{$t('pushRecord')}}</span>
                                <div v-if="scope.row.LevelNames && scope.row.LevelNames.length > 0"
                                     slot="content">
                                    <p v-for="(item, index) in scope.row.LevelNames" :key="index" style="min-width: 100px;">{{item}}</p>
                                </div>
                                <div v-else-if="!scope.row.query || !scope.row.LevelNames || scope.row.LevelNames.length === 0"
                                     slot="content">
                                    <span>推送卡级记录为空，点击刷新</span>
                                </div>
                                <div v-else slot="content">
                                    <span>点击查询推送卡级记录</span>
                                </div>

                            </Tooltip>
                        </li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <reportModal ref="reportModal"></reportModal>
        <couponDetailsModal ref="couponDetailsModal"></couponDetailsModal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import couponDetailsModal from './couponDetailsModal';
    import reportModal from './reportModal';
    import { pushRecordHead } from '../couponRecordConfig';
    import ajax from '@/api/index';
    export default {
        props : {
            dateTime : {
                type : Array,
                default () {
                    return [new Date(), new Date().addDays(-7)]
                }
            }
        },
        components : {
            tableCom,
            reportModal,
            couponDetailsModal
        },
        data () {
            return {

                //表头数据
                columnData : pushRecordHead,
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页记录数
                pageSize : 10
            };
        },
        methods : {
            queryList () {
                ajax.post('queryCouponsLogs', {
                    optType : 'pull',
                    startTime : this.dateTime[0].format('yyyy-MM-dd 00:00:00'),
                    endTime : this.dateTime[1].format('yyyy-MM-dd 23:59:59'),
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                })
            },
            /**
             * 详细
             * @param rowData
             */
            detail (rowData) {
                this.$refs.couponDetailsModal.show(rowData);
            },
            /**
             * 查看详细报表
             * @param type
             * @param rowData
             */
            showLog (type, rowData) {
                this.$refs.reportModal.show(type, rowData);
            },
            /**
             * 查询推送级别名字
             */
            queryLevelNames (rowData) {
                ajax.post('queryLevelNames', {
                    couponId : rowData.couponId,
                    batchId : rowData.batchId,
                }).then(res => {
                    if (res.success) {
                        this.$set(rowData, 'LevelNames', res.data);
                        // rowData.LevelNames = res.data ? res.data : [];
                    } else {
                        this.$set(rowData, 'LevelNames', []);
                        // rowData.LevelNames = [];
                    }
                    this.$set(rowData, 'query', true);
                    // rowData.query = true;
                })
            }
        },
        watch : {
            dateTime : {
                handler (newVal) {
                    this.queryList();
                },
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .line-info {
        color: $color_blue;
        cursor: pointer;
    }
</style>
