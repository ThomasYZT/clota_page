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
                :table-data="tableData"
                table-height="268px"
                :column-data="columnData">
                <el-table-column
                    label="排名"
                    slot="column0"
                    width="70">
                    <template slot-scope="scoped">
                        <span :class="{'with-bck' : scoped.$index < 3}">{{scoped.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="100">
                    <template slot-scope="scoped">
                        <div class="bar-warp">
                            <div class="bar"></div>
                        </div>
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>

<script>
    import tableCom from './tableCom';
    import {columns} from './rankListConfig';

    export default {
        components: {
            tableCom
        },
        data() {
            return {
                //表头配置
                columnData: columns,
                tableData: [{
                    index: '1',
                    name: '王小虎',
                    rate: '100%'
                }, {
                    index: '2',
                    name: '王小虎',
                    rate: '1%'
                }],
            }
        },
        methods: {
            /**
             * 跳转到排行榜详情
             */
            toDetail () {
                this.$router.push({
                    name : 'rankDetail'
                });
            }
        }
    }
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
            border-bottom: 1px solid $color_E8E8E;
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
                    @include block_outline(20%);
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
