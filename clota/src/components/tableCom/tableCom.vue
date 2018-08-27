<!--公用table组件-->

<template>
    <div class="table-com" :style="{'min-height' : minHeight}" >
        <el-table :data="tableData"
                  v-if="tableMaxHeight !== null"
                  :span-method="spanMethod"
                  style="width: 100%"
                  :border="border"
                  :max-height="tableMaxHeight !== 'auto' ? parseInt(tableMaxHeight) : 'auto'"
                  :row-class-name="rowClassName"
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
        <div class="no-data-wrap" v-if="tableData.length < 1">
            <!--无数据组件-->
            <no-data >
            </no-data>
        </div>
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
            }
        },
        data() {
            return {
                //分页配置
                pageConfig : configVariable,
                //表格最大高度
                tableMaxHeight : null,
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
                if(this.autoHeight){
                    this.tableMaxHeight = 'auto';
                }else{
                    let rootEl = this.$root.$el;
                    if(rootEl){
                        if(this.showPagination){
                            this.tableMaxHeight = rootEl.offsetHeight - this.ofsetHeight - 92 + 'px';
                        }else{
                            this.tableMaxHeight = rootEl.offsetHeight - this.ofsetHeight + 'px';
                        }
                    }
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
        },
        mounted () {
            this.setTableMaxHeight();
        },
        computed : {
            minHeight () {
                if(this.tableData && this.tableData.length === 0){
                    if(this.tableComMinHeight !== 0){
                        return this.tableComMinHeight + 'px';
                    }else{
                        return this.tableMaxHeight;
                    }
                }else{
                    return 'auto';
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .table-com {
        position: relative;
        width: 100%;

        .table-bar {
            margin-top: 16px;
        }

        .pagination {
            padding: 30px 0;
            text-align: center;
        }

        /deep/ .el-table__empty-block{
            display: none;
        }

        .no-data-wrap{
            @include absolute_pos(absolute,48px,0,0,0);
        }
    }
</style>
