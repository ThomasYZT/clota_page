<!--公用table组件-->

<template>
    <div class="table-com">
        <el-table :data="tableData"
                  style="width: 100%"
                  :max-height="tableMaxHeight"
                  @row-click="classDetailLink">
            <el-table-column
                v-if="columnCheck"
                type="selection"
                :width="selectionWidth">
            </el-table-column>
            <template
                v-for="(item,index) in columnData">
                <slot :name="'column' + index"
                      :width="item.width"
                      :minWidth="item.minWidth"
                      :index="index"
                      :field="item.field"
                      :title="item.title">
                    <!--ableClick表示点击某一列进入详情-->
                    <el-table-column
                        v-if="item.ableClick"
                        :label="item.title"
                        :prop="item.field"
                        :key="index"
                        :width="item.width"
                        :min-width="item.minWidth">
                        <template slot-scope="scoped">
                                    <span
                                        class="detail-hover"
                                        v-w-title="scoped.row[item.field]">
                                        {{scoped.row[item.field] | contentFilter}}
                                    </span>
                        </template>
                    </el-table-column>
                    <!--普通列-->
                    <el-table-column
                        v-else
                        :label="item.title"
                        :prop="item.field"
                        :key="index"
                        :width="item.width"
                        :min-width="item.minWidth">
                        <template slot-scope="scoped">
                                    <span v-w-title="scoped.row[item.field]" >
                                        {{scoped.row[item.field]  | contentFilter}}
                                    </span>
                        </template>
                    </el-table-column>
                </slot>
            </template>
        </el-table>
        <div class="pagination" v-if="showPagination">
            <el-pagination
                :page-sizes="pageSizeConfig"
                :page-size="pageSize"
                :layout="pageLayout"
                :total="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {configVariable} from '@/assets/js/constVariable.js';
    import tableMixins from '@/mixins/tableMixins.js';
    export default {
        mixins : [tableMixins],
        props: {
            //表格数据
            'table-data': {
                type: Array,
                default() {
                    return [];
                }
            },
            'column-data': {
                type: [Object, Array],
                default() {
                    return {};
                }
            },
            //是否开启选择
            'column-check': {
                type: Boolean,
                default: false
            },
            //是否开启边框
            'border' : {
                type: Boolean,
                default: false
            },
            //选择框的宽度
            'selection-width' : {
                type : Number,
                default : 55
            },
            //是否开启分页
            'show-pagination' : {
                type : Boolean,
                default : false
            },
            //总共条数
            'total-count' : {
                type : Number,
                default : 0
            }
        },
        data() {
            return {
                //分页配置
                pageConfig : configVariable,
                //表格最大高度
                tableMaxHeight : '0',
            }
        },
        methods: {
            /**
             * 行点击事件
             * @param data
             */
            classDetailLink(data) {
                this.$emit('row-click', data);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .table-com {

        /deep/ .el-table th:first-child .cell,
        /deep/ .el-table td:first-child .cell {
            padding-left: 16px !important;
        }

        .table-bar {
            margin-top: 16px;
        }
    }
</style>
