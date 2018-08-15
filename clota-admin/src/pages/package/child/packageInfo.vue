<!--套餐列表-->

<template>
    <div class="package">
        <div class="create-package">
            <Button type="primary">
                <span @click="addPackage">添加套餐</span>
            </Button>
        </div>
        <table-com
            :table-data="tableData"
            :table-height="tableHeight"
            :column-data="packageHead"
            :auto-height="true">
            <el-table-column
                slot="column5"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="operate-list" @click="watchPackage(scoped.row)">查看</li>
                        <li class="operate-list" @click="editPackage(scoped.row)">编辑</li>
                        <li class="operate-list del" @click="delPackage(scoped.row)">删除</li>
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
        <!--删除套餐模态框-->
        <del-modal ref="delModal">
            <span style="padding: 0 20px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width : 100%;">您正在删除套餐：Server2012Server2012Server2012Server2012Server2012</span>
            <span><span style="color:#ed3f14;">本操作不可撤销</span>，是否继续？</span>
        </del-modal>
    </div>
</template>

<script>

    import tableCom from '../../index/child/tableCom';
    import tableMixins from '../../lessee/tableMixins';
    import {packageHead} from './packageInfoConfig';
    import delModal from '@/components/delModal/index.vue';

    export default {
        mixins :[tableMixins],
        components : {
            tableCom,
            delModal
        },
        data() {
            return {
                totalCount : 100,
                //表头配置
                packageHead : packageHead
            }
        },
        methods: {
            /**
             * 新建套餐
             */
            addPackage () {
                this.$router.push({
                    name : 'editPackage',
                    params : {
                        type : 'add'
                    }
                });
            },
            /**
             * 编辑套餐
             * @param data
             */
            editPackage (data) {
                this.$router.push({
                    name : 'editPackage',
                    params : {
                        type : 'edit'
                    }
                });
            },
            /**
             * 删除套餐
             * @param data
             */
            delPackage (data) {
                this.$refs.delModal.show({
                    title : '删除套餐',
                    confirmCallback : () => {
                        // this.confirmDelete(data);
                    }
                });
            },
            /**
             * 查看套餐
             * @param data
             */
            watchPackage (data) {
                this.$router.push({
                    name : 'editPackage',
                    params : {
                        type : 'watch'
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .package{
        @include block_outline();
        @include padding_place();
        padding: 0 30px;

        .create-package{
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
