<!--订单排行榜详情-->

<template>
    <div class="rank-detail">
        <bread-crumb-head
            :locale-router="$t('rankDetail')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class=rank-info>
            <div class="tab-list">
                <DatePicker
                    v-model="selectDate"
                    type="date"
                    :clearable="false"
                    :editable="false"
                    placeholder="Select date"
                    style="width: 280px"
                    @on-change="getOrderRankingList">
                </DatePicker>
            </div>
            <table-com
                :column-data="columns"
                :table-data="tableData"
                :border="true"
                :page-no-d.sync="pageNo"
                :show-pagination="true"
                :page-size-d.sync="pageSize"
                :total-count="totalCount"
                :ofset-height="192"
                @query-data="getOrderRankingList">
                <el-table-column
                    slot="columnindex"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{row.index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="columnproportion"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{getIndex(scope.row.proportion)}}
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columns } from './rankConfig.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import ajax from '@/api/index.js';
    import { validator } from 'klwk-ui';

    export default {
        components : {
            tableCom,
            breadCrumbHead
        },
        data () {
            return {
                //查询的日期
                selectDate : new Date(),
                //表头配置
                columns : columns,
                //总共条数
                totalCount : 0,
                  //上级路由列表
                beforeRouterList : [
                    {
                        name : 'index',
                        router : {
                            name : 'index'
                        }
                    }
                ],
                //表格数据
                tableData : [],
                pageNo : 1,
                pageSize : 10,
            };
        },
        methods : {
            /**
             * 获取排行榜
             */
            getOrderRankingList () {
                ajax.get('orderRankingList',{
                    page : this.pageNo,
                    pageSize : this.pageSize,
                    date : this.selectDate.format('yyyy-MM-dd HH:mm:ss')
                }).then(res => {
                    if (res.status === 200) {
                        this.totalCount = res.data.totalRecord;
                        this.tableData = res.data.list ? res.data.list : [];
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                }).catch(err => {
                    this.tableData = [];
                    this.totalCount = 0;
                });
            },
            /**
             * 获取占比
             * @param rate
             */
            getIndex (rate) {
                if (validator.isNumber(rate)) {
                    return Number(Number(rate) * 100).toFixed(2) + '%';
                } else {
                    return '-';
                }
            },
            /**
             * 每页条数改变
             * @param pageSize
             */
            pageSizeChange (pageSize) {
                this.pageSize = pageSize;
                this.getOrderRankingList();
            },
            /**
             * 页码改变
             * @param pageNo
             */
            pageNoChange (pageNo) {
                this.pageNo = pageNo;
                this.getOrderRankingList();
            }
        },
        created () {
            this.getOrderRankingList();
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .rank-detail{
        @include block_outline();
        overflow: auto;

        .rank-info {
            padding: 0 30px;
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            overflow: auto;

            .tab-list {
                @include block_outline($height: 62px);
                padding: 15px 0;
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
