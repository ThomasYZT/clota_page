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
                    placeholder="Select date"
                    style="width: 280px"
                    @on-change="getOrderRankingList">
                </DatePicker>
            </div>
            <table-com
                :table-data="tableData"
                :table-height="tableHeight"
                :column-data="columns">
                <!--排名-->
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        {{row.index + 1}}
                    </template>
                </el-table-column>
                <!--占比-->
                <el-table-column
                    slot="column3"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        {{getIndex(scoped.row.proportion)}}
                    </template>
                </el-table-column>
            </table-com>
            <div class="page-area" v-if="totalCount > 0">
                <el-pagination
                    :current-page="pageNo"
                    :page-sizes="pageSizeConfig"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount"
                    @size-change="pageSizeChange"
                    @current-change="pageNoChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import tableCom from '../tableCom';
    import {columns} from './rankConfig.js';
    import tableMixins from '../../../lessee/tableMixins';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import ajax from '@/api/index.js';
    import {validator} from 'klwk-ui';

    export default {
        mixins :[tableMixins],
        components : {
            tableCom,
            breadCrumbHead
        },
        data() {
            return {
                //查询的日期
                selectDate : new Date(),
                //表头配置
                columns :columns,
                //总共条数
                totalCount : 0,
                  //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('index'),
                        router: {
                            name: 'index'
                        }
                    }
                ],
                spaceOffset : 165
            }
        },
        methods: {
            /**
             * 获取排行榜
             */
            getOrderRankingList () {
                ajax.get('orderRankingList',{
                    page : this.pageNo,
                    pageSize : this.pageSize,
                    date : this.selectDate.format('yyyy-MM-dd')
                }).then(res => {
                    if(res.status === 200){
                        this.totalCount = res.data.totalRecord;
                        this.tableData = res.data.list ? res.data.list : [];
                    }else{
                        this.tableData =  [];
                        this.totalCount = 0;
                    }
                }).catch(err => {
                    this.tableData =  [];
                    this.totalCount = 0;
                }).finally(() =>{
                    this.setTableHeight();
                });
            },
            /**
             * 获取占比
             * @param rate
             */
            getIndex (rate) {
                if(validator.isNumber(rate)){
                    return Number(Number(rate) * 100).toFixed(2) + '%';
                }else{
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
            pageNoChange(pageNo) {
                this.pageNo = pageNo;
                this.getOrderRankingList();
            }
        },
        created () {
            this.getOrderRankingList();
        }
    }
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
            @include padding_place();
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
