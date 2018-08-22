<!--公用table组件-->

<template>
    <div class="table-com">
        <el-table :data="tableData"
                  style="width: 100%"
                  :border="border"
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
        <div class="pagination" v-if="showPagination && tableData.length > 0">
            <el-pagination
                :page-sizes="pageSizeConfig"
                :page-size="pageSize"
                :layout="pageLayout"
                :total="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <!--无数据组件-->
        <no-data v-if="tableData.length < 1">
        </no-data>
    </div>
</template>

<script>
    import {configVariable} from '@/assets/js/constVariable.js';
    import tableMixins from '@/mixins/tableMixins.js';
    import noData from '@/components/noDataTip/noData-tip.vue';
    export default {
        mixins : [tableMixins],
        components : {
            noData
        },
        props: {
            //表格数据
            'table-data': {
                type: Array,
                default() {
                    return [];
                }
            },
            //表头配置
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
            },
            //表格距离顶部距离
            'ofset-height' : {
                type : Number,
                default : 0
            }
        },
        data() {
            return {
                //分页配置
                pageConfig : configVariable,
                //表格最大高度
                tableMaxHeight : '100%',
            }
        },
        methods: {
            /**
             * 行点击事件
             * @param data
             */
            classDetailLink(data) {
                this.$emit('row-click', data);
            },
            /**
             * 设置表头的最大高度
             */
            setTableMaxHeight () {
                let rootEl = this.$root.$el;
                if(rootEl){
                    this.tableMaxHeight = rootEl.offsetHeight - this.ofsetHeight;
                }
            },
            /**
             * 触发查询数据的方法
             */
            queryList () {
                this.$emit('query-data',{
                    pageNo : this.pageNo,
                    pageSize : this.showPagination ? this.pageSize : this.maxPageSize
                });
            }
        },
        created () {
            this.queryList();
        }

    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .table-com {
        position: relative;
        width: 100%;
        min-height: 100%;

        /deep/ .el-table th:first-child .cell,
        /deep/ .el-table td:first-child .cell {
            padding-left: 16px !important;
        }

        .table-bar {
            margin-top: 16px;
        }

        .pagination {
            margin: 30px auto;
            text-align: center;
        }
    }
</style>
