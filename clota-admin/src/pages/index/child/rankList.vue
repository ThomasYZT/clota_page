<!--排行榜-->

<template>
    <div class="rank-list">
        <div class="title">
            排行榜
            <span class="server-care" @click="toDetail">
                更多
                <span class="iconfont icon-pull-down"></span>
            </span>
        </div>
        <div class="rank-list-detail">
            <table-com
                :column-data="columnData"
                :table-data="tableData"
                :height="265"
                @query-data="getOrderRankingList">
                <el-table-column
                    slot="columnindex"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{'with-bck' : scope.$index < 3}">{{scope.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="columnproportion"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span>{{getIndex(scope.row.proportion)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="columnbar"
                    slot-scope="row"
                    :label="row.title"
                    width="100">
                    <template slot-scope="scoped">
                        <div class="bar-warp">
                            <div class="bar" :style="{width : (scoped.row.proportion ? scoped.row.proportion * 100 : 0) + '%'}"></div>
                        </div>
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columns } from './rankListConfig';
    import ajax from '@/api/index.js';
    import { validator } from 'klwk-ui';

    export default {
        components : {
            tableCom
        },
        data () {
            return {
                //表头配置
                columnData : columns,
                //表格数据
                tableData : [],
            };
        },
        methods : {
            /**
             * 跳转到排行榜详情
             */
            toDetail () {
                this.$router.push({
                    name : 'rankDetail'
                });
            },
            /**
             * 获取排行榜
             */
            getOrderRankingList () {
                ajax.get('orderRankingList',{
                    page : 1,
                    pageSize : 5,
                    date : new Date().format('yyyy-MM-dd HH:mm:ss')
                }).then(res => {
                    if (res.status === 200) {
                        this.tableData = res.data.list ? res.data.list : [];
                    } else {
                        this.tableData = [];
                    }
                }).catch(() => {
                    this.tableData = [];
                });
            },
            /**
             * 获取占比
             * @param rate
             */
            getIndex (rate) {
                if (validator.isNumber(rate)) {
                    return Number(rate * 100).toFixed(2) + '%';
                } else {
                    return '-';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .rank-list {
        float: left;
        margin-left: 15px;
        @include block_outline(410px, 315px);
        @include card();

        .title {
            @include block_outline($height: 45px);
            line-height: 45px;
            padding: 0 20px;
            font-size: $font_size_16px;
            color: $color_353B5E;

            .server-care {
                float: right;
                font-size: $font_size_12px;
                color: $color_1890FF;
                cursor: pointer;
            }
        }

        .rank-list-detail {
            @include block_outline($height: 268px);

            /deep/ .el-table td,
            /deep/ .el-table th {
                padding: 4px 0 !important;
                border-bottom: 0 !important;
                background: $color_fff;
                font-size: $font_size_12px;
                color: $color_333;

                &:nth-of-type(1) .cell {
                    padding-left: 24px !important;
                }
            }
            /deep/ .el-table th .cell {
                color: $color_999;
                font-size: $font_size_14px;
            }

            .bar-warp {
                @include block_outline(67px, 8px);

                .bar {
                    height: 100%;
                    background: rgba(73, 169, 238, 1);
                }
            }

            .with-bck {
                @include block_outline(20px, 20px, flase);
                border-radius: 10px;
                background: $color_0071BC;
                text-align: center;
                line-height: 20px;
                color: $color_fff;
            }
        }

        .icon-pull-down::before{
            display: inline-block;
            color: $color_blue;
            transform: rotate(-90deg) scale(0.8);
        }
    }
</style>
