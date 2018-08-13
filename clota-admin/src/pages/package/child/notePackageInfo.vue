<!--短信套餐列表-->

<template>
    <div class="package">
        <div class="create-package">
            <Button type="primary">
                <span @click="addPackage">新建套餐</span>
            </Button>
        </div>
        <table-com
            :table-data="tableData"
            :table-height="tableHeight"
            :column-data="packageHead"
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
                        <li class="operate-list" @click="editPackage(scoped.row)">修改</li>
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
    import {packageHead} from './notePackageConfig';

    export default {
        mixins :[tableMixins],
        components : {
            tableCom,
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
                    name : 'editnotePackage',
                    params : {
                        type : 'add'
                    }
                });
            },
            /**
             * 修改套餐
             * @param data
             */
            editPackage (data) {
                this.$router.push({
                    name : 'editnotePackage',
                    params : {
                        type : 'edit'
                    }
                });
            },
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
