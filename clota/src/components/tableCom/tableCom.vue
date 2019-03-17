<!--公用table组件-->

<template>
    <div class="table-com" :class="{ 'no-data-table-wrap' : tableData.length < 1 }" :style="{'min-height' : minHeight}" >
        <el-table :data="tableData"
                  v-if="tableMaxHeight !== null"
                  :span-method="spanMethod"
                  style="width: 100%"
                  ref="multipleTable"
                  :class="{'table-click-able' : rowClickAble}"
                  :border="border"
                  :height="height === 'auto' ? null : height"
                  :max-height="tableMaxHeight !== 'auto' ? parseInt(tableMaxHeight) : 'auto'"
                  :row-class-name="rowClassName"
                  :default-sort="defaultSort"
                  :header-cell-class-name="headerClickable ? 'header-clickable' : ''"
                  @header-click="headerClick"
                  @sort-change="handleSortChanged"
                  @row-click="classDetailLink"
                  @selection-change="handleSelectionChange">
                   <el-table-column
                        v-if="columnCheck"
                        type="selection"
                        fixed="left"
                        :selectable="selectable"
                        :width="selectionWidth">
                   </el-table-column>
                   <template
                    v-for="(item,index) in columnData">
                    <slot :name="'column' + index"
                          :width="getColumnWidth(item)"
                          :min-width="getColumnMinWidth(item)"
                          :index="index"
                          :field="item.field"
                          :title="$tc(item.title,item.tcIndex = 1,item.tcData = {})">
                    <!--ableClick表示点击某一列进入详情-->
                    <el-table-column
                        v-if="item.ableClick"
                        :label="$tc(item.title,item.tcIndex = 1,item.tcData = {})"
                        show-overflow-tooltip
                        :prop="item.field"
                        :key="item.field"
                        :width="getColumnWidth(item)"
                        :min-width="getColumnMinWidth(item)">
                        <template slot-scope="scoped">
                                <span
                                    class="detail-hover"
                                    v-w-title="scoped.row[item.field]">
                                    {{scoped.row[item.field] | contentFilter}}
                                </span>
                        </template>
                    </el-table-column>
                        <!--货比格式化列-->
                    <el-table-column
                        v-if="item.type === 'money'"
                        :label="$tc(item.title,item.tcIndex = 1,item.tcData = {})"
                        show-overflow-tooltip
                        :prop="item.field"
                        :key="index"
                        :width="getColumnWidth(item)"
                        :min-width="getColumnMinWidth(item)">
                        <template slot-scope="scoped">
                            <span
                                class="detail-hover"
                                v-w-title="scoped.row[item.field]">
                                {{scoped.row[item.field] | moneyFilter | contentFilter}}
                            </span>
                        </template>
                    </el-table-column>
                    <!--日期格式化列-->
                    <el-table-column
                        v-else-if="item.type === 'date'"
                        :label="$tc(item.title,item.tcIndex = 1,item.tcData = {})"
                        show-overflow-tooltip
                        :prop="item.field"
                        :key="index"
                        :width="getColumnWidth(item)"
                        :min-width="getColumnMinWidth(item)">
                        <template slot-scope="scoped">
                        <span
                            class="detail-hover"
                            v-w-title="scoped.row[item.field]">
                            {{scoped.row[item.field] | timeFormat('yyyy-MM-dd') | contentFilter}}
                        </span>
                        </template>
                    </el-table-column>
                    <!--时间格式化列-->
                    <el-table-column
                        v-else-if="item.type === 'time'"
                        :label="$tc(item.title,item.tcIndex = 1,item.tcData = {})"
                        show-overflow-tooltip
                        :prop="item.field"
                        :key="index"
                        :width="getColumnWidth(item)"
                        :min-width="getColumnMinWidth(item)">
                        <template slot-scope="scoped">
                            <span
                                class="detail-hover"
                                v-w-title="scoped.row[item.field]">
                                {{scoped.row[item.field] | timeFormat('yyyy-MM-dd HH:mm:ss') | contentFilter}}
                            </span>
                        </template>
                    </el-table-column>
                    <!--普通列-->
                    <el-table-column
                        v-else
                        :label="$tc(item.title,item.tcIndex = 1,item.tcData = {})"
                        :prop="item.field"
                        show-overflow-tooltip
                        :key="index"
                        :width="getColumnWidth(item)"
                        :min-width="getColumnMinWidth(item)">
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
        <div class="no-data-wrap" v-if="tableData.length < 1">
            <!--无数据组件-->
            <no-data >
            </no-data>
        </div>
    </div>
</template>

<script>
    import { configVariable } from '@/assets/js/constVariable.js';
    import tableMixins from '@/mixins/tableMixins.js';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import { mapGetters } from 'vuex';
    export default {
        mixins : [tableMixins],
        components : {
            noData
        },
        props : {
            //表格数据
            'table-data' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //表头配置
            'column-data' : {
                type : [Object, Array],
                default () {
                    return {};
                }
            },
            //是否开启选择
            'column-check' : {
                type : Boolean,
                default : false
            },
            //是否开启边框
            'border' : {
                type : Boolean,
                default : false
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
            },
            //没数据时表格table-com类的最小高度
            'table-com-min-height' : {
                type : Number,
                default : 0
            },
            //页码
            'page-no-d' : {
                type : Number,
                default : 1
            },
            //每页条数
            'page-size-d' : {
                type : Number,
                default : 10
            },
            //高度不限制，自由撑高
            'auto-height' : {
                type : Boolean,
                default : false
            },
            //动态添加行类名的方法
            'row-class-name' : {
                type : Function,
                default : new Function()
            },
            // 单元格合并方法
            'span-method' : {
                type : Function,
                default : new Function()
            },
            //行是否可以点击
            'row-click-able' : {
                type : Boolean,
                default : false
            },
            //表格的默认排序的列、顺序 {prop: '', order: 'ascending'}
            'default-sort' : {
                type : Object
            },
            //表格高度
            'height' : {
                type : [Number,String],
                default : 'auto'
            },
            //默认分页参数
            'default-page-layout' : {
                type : String,
                defaut : ''
            },
            //表头单元格是否可点击
            'header-clickable' : {
                type : Boolean,
                default : false
            },
            //表格选择框是否禁用
            'selectable' : {
                type : Function,
                default () {
                    return function () {
                        return true;
                    };
                }
            },
            //第一次需要自动查询接口，
            'auto-query-first' : {
                type : Boolean,
                default : true
            }
        },
        data () {
            return {
                //分页功能配置
                pageLayout : this.defaultPageLayout ? this.defaultPageLayout : configVariable.pageLayout,
                //表格最大高度
                tableMaxHeight : null,
            };
        },
        methods : {
            /**
             * 行点击事件
             * @param data
             */
            classDetailLink (data) {
                this.$emit('row-click', data);
            },
            /**
             * 设置表格的最大高度
             */
            setTableMaxHeight () {
                if (this.autoHeight) {
                    this.tableMaxHeight = 'auto';
                } else {
                    let rootEl = this.$root.$el;
                    if (rootEl) {
                        let offsetHeight = this.ofsetHeight ? this.ofsetHeight : this.$el.getBoundingClientRect().top;
                        if (this.showPagination) {
                            this.tableMaxHeight = rootEl.offsetHeight - offsetHeight - 52 + 'px';
                        } else {
                            this.tableMaxHeight = rootEl.offsetHeight - offsetHeight + 'px';
                        }
                    }
                }
            },
            /**
             * 多选框选中状态改变
             * @param data
             */
            handleSelectionChange (data) {
                this.$emit('selection-change',data);
            },
            /**
             * 排序改变
             * @param data
             */
            handleSortChanged (data) {
                this.$emit('sort-change',data);
            },
            /**
             * 触发查询数据的方法
             */
            queryList () {
                this.$emit('query-data',{
                    pageNo : this.pageNo,
                    pageSize : this.showPagination ? this.pageSize : this.maxPageSize
                });
            },
            //清空选择
            clearSelection () {
                this.$refs.multipleTable.clearSelection();
            },
            //设置表格某行选中/不选中
            toggleRowSelection ( row, selected) {
                this.$refs.multipleTable.toggleRowSelection( row, selected );
            },
            /**
             * 注册监听页面缩放事件
             */
            registerWindowResize () {
                window.addEventListener('resize', this.setTableMaxHeight);
            },
            /**
             * 解除监听页面缩放事件
             */
            unregisterWindowResize () {
                window.removeEventListener('resize', this.setTableHeight);
            },
            /**
             * 获取表格宽度
             * @param columnData
             */
            getColumnWidth (columnData) {
                if (this.lang === 'en') {
                    if (columnData.enWidth) {
                        return columnData.enWidth;
                    } else {
                        return columnData.width;
                    }
                } else if (this.lang === 'zh-CN') {
                    return columnData.width;
                }
            },
            /**
             * 获取表格最小宽度
             * @param columnData
             */
            getColumnMinWidth (columnData) {
                if (this.lang === 'en') {
                    if (columnData.enMinWidth) {
                        return columnData.enMinWidth;
                    } else {
                        return columnData.minWidth;
                    }
                } else if (this.lang === 'zh-CN') {
                    return columnData.minWidth;
                }
            },
            /**
             * 当某一列的表头点击事件
             */
            headerClick (column, event) {
                this.$emit('headerClick', column, event);
            },
        },
        created () {
            if (this.autoQueryFirst) {
                this.queryList();
            }
        },
        mounted () {
            this.setTableMaxHeight();
            this.registerWindowResize();
        },
        computed : {
            minHeight () {
                if (this.height !== 'auto') {
                    return 'auto';
                } else {
                    if (this.tableData && this.tableData.length === 0) {
                        if (this.tableComMinHeight !== 0) {
                            return this.tableComMinHeight + 'px';
                        } else {
                            return this.tableMaxHeight;
                        }
                    } else {
                        return 'auto';
                    }
                }
            },
            ...mapGetters({
                lang : 'lang',
            })
        },
        watch : {
            //如果表格数据改变了，表格数据长度为0，但是不是在第一页，需要重新获取数据
            tableData (newVal,oldVal) {
                if (newVal && newVal.length === 0 && this.pageNo !== 1) {
                    this.handleCurrentChange(1);
                }
                this.$nextTick(() => {
                    if (oldVal.length < 1) {
                        this.$el.querySelector('.el-table__body-wrapper').scrollLeft = 0;
                        this.$el.querySelector('.el-table__header-wrapper').scrollLeft = 0;
                    }
                });
            }
        },
        beforeDestroy () {
            this.unregisterWindowResize();
        }

    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .table-com {
        position: relative;
        width: 100%;

        &.no-data-table-wrap {
            /deep/ .el-table__header-wrapper{
                overflow: auto;
            }
        }

        .table-click-able /deep/ tbody tr{
            cursor: pointer;
        }

        .table-bar {
            margin-top: 16px;
        }

        .pagination {
            padding: 10px 0;
            text-align: center;
        }

        /deep/ .el-table__empty-block{
            display: none;
        }

        .no-data-wrap{
            @include absolute_pos(absolute,60px,0,0,0);
        }

        /deep/ .el-table-column--selection .cell {
            padding-left: 20px;
            padding-right: 20px;
        }
    }
</style>
