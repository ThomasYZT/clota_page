<!--系统公告-->

<template>
    <div class="notice">
        <div class="create-notice">
            <Button type="primary">
                <span @click="addnotice">发布公告</span>
            </Button>
        </div>
        <table-com
            :table-data="tableData"
            :table-height="tableHeight"
            :column-data="systemHead"
            :auto-height="true">
            <el-table-column
                slot="column7"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="operate-list" @click="watchNotice(scoped.row)">查看</li>
                        <li class="operate-list" @click="editnotice(scoped.row)">编辑</li>
                        <li class="operate-list stop" @click="stopnotice(scoped.row)">禁用</li>
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
</template>

<script>

    import tableCom from '../../index/child/tableCom';
    import tableMixins from '../../lessee/tableMixins';
    import {systemHead} from './systemNoticeConfig';

    export default {
        mixins :[tableMixins],
        components : {
            tableCom,
        },
        data() {
            return {
                totalCount : 100,
                //表头配置
                systemHead : systemHead
            }
        },
        methods: {
            /**
             * 新建公告
             */
            addnotice () {
                this.$router.push({
                    name : 'editSystemNotice',
                    params : {
                        type : 'add'
                    }
                });
            },
            /**
             * 停用公告
             * @param data
             */
            stopnotice (data) {
                this.$Message.success('您已禁用公告1');
            },
            /**
             * 编辑公告
             * @param data
             */
            editnotice (data) {
                this.$router.push({
                    name : 'editSystemNotice',
                    params : {
                        type : 'edit'
                    }
                });
            },
            /**
             * 查看公告
             * @param data
             */
            watchNotice (data) {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .notice{
        @include block_outline();
        @include padding_place();
        padding: 0 30px;

        .create-notice{
            @include block_outline($height: 62px);
            padding: 15px 0;
        }

        .operate-info {
            @include table_operate();

            .operate-list {
                color: $color_blue;
            }

            .stop{
                color : $color_yellow
            }

            .del{
                color: $color_err;
            }
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
</style>
