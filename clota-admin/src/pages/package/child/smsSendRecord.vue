<!--短信发送记录-->

<template>
    <div class="operation-log">
        <!--筛选表头-->
        <filter-head>
        </filter-head>
        <div class="table-area">
            <div class="order-info">
                <Icon type="ios-help"></Icon>
                <span class="note-tips">共发送：<span class="icon-weight">1280条</span></span>
            </div>
            <table-com
                :table-data="tableData"
                :table-height="tableHeight"
                :column-data="smsSendRecord"
                :auto-height="true">
                <el-table-column
                    slot="column8"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <ul class="operate-info">
                            <li class="operate-list" @click="watchDetail(scoped.row)">查看</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
            <div class="page-area" v-if="tableData.length > 0">
                <el-pagination
                    :current-page="pageNo"
                    :page-sizes="pageSizeConfig"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import filterHead from './smsSendRecordChild/filterHead';
    import tableCom from '../../index/child/tableCom';
    import tableMixins from '../../lessee/tableMixins';
    import {smsSendRecord} from './smsSendRecordChild/smsSendRecordConfig';
    export default {
        mixins :[tableMixins],
        components : {
            filterHead,
            tableCom
        },
        data() {
            return {
                //表头配置
                smsSendRecord : smsSendRecord,
                //表格数据
                tableData : [
                    {
                        time : '20180615 12:26:56'
                    },
                    {
                        time : '20180615 12:26:56'
                    },
                    {
                        time : '20180615 12:26:56'
                    },
                    {
                        time : '20180615 12:26:56'
                    },
                ],
                //总共条数
                totalCount : 100,
            }
        },
        methods: {
            /**
             * 查看发送短信详情
             * @param data
             */
            watchDetail(data) {
                this.$router.push({
                    name : 'smsSendRecordDetail'
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .operation-log{
        @include block_outline();
        min-height: 100%;
        background: $color_fff;
        overflow: auto;
        @include padding_place();

        .page-area {
            @include block_outline($height: 57px);
            text-align: right;

            /deep/ .el-pagination {
                display: inline-block;
                padding-top: 15px;
            }
        }

        .table-area{
            padding: 0 30px;

            .order-info{
                @include block_outline($height : 30px);
                background: $color_E8F7FF;
                border: 1px solid rgba(0,130,213,0.50);
                border-radius: 4px;
                line-height: 27px;
                font-size: $font_size_14px;
                color: rgba($color_000,0.65);
                padding-left: 15px;
                margin-bottom: 10px;

                .ivu-icon-ios-help{
                    font-size: $font_size_17px;
                    color:  $color_0082D5;
                    vertical-align: text-top;
                    margin-right: 10px;
                    margin-top: 1px;
                }

                .note-tips{
                    margin-right: 20px;

                    .icon-weight{
                        color: $color_000;
                    }
                }
            }
        }
    }
</style>
