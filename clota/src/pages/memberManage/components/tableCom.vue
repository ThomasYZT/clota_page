<!--任务表格-->

<template>
    <el-table :data="tableData"
              v-if="parseInt(tableHeight) > 0"
              style="width: 100%"
              class="table-wrap"
              :class="{'row-click' : rowClick}"
              @row-click="classDetailLink"
              @selection-change="handleSelectionChange"
              :height="autoHeight ? 'max-content' : tableHeight">
                <template slot="empty">
                    <no-data>
                    </no-data>
                </template>
            <el-table-column
                v-if="columnCheck"
                type="selection"
                width="55">
            </el-table-column>
        <template
            v-for="(item,index) in columnDataCs">
            <slot :name="'column' + index"
                  :width="item.width"
                  :minWidth="item.minWidth"
                  :index="index"
                  :field="item.field"
                  :title="item.title">
                <el-table-column
                    v-if="item.ableClick"
                    :show-overflow-tooltip="true"
                    class-name="column-emp"
                    :label="item.title"
                    :prop="item.field"
                    :key="index"
                    :width="item.width"
                    :min-width="item.minWidth">
                    <template slot-scope="scoped">
                    <span
                        class="borderNone iconfont"
                        :class="{'icon-male' : scoped.row['sex'] === 'm' ,'icon-female' : scoped.row['sex'] === 'f'}"></span>
                        <span
                            class="detail-hover"
                            v-w-title="scoped.row[item.field]">{{scoped.row[item.field] | contentFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else-if="item.fixed"
                    :show-overflow-tooltip="true"
                    :label="item.title"
                    :prop="item.field"
                    :key="index"
                    :width="item.width"
                    :min-width="item.minWidth">
                    <template slot-scope="scoped">
                    <span
                        class="operate-info"
                        v-for="list in item.operateList"
                        @click="list['click']">{{list['name']}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else
                    :show-overflow-tooltip="true"
                    :label="item.title"
                    :prop="item.field"
                    :key="index"
                    :width="item.width"
                    :min-width="item.minWidth">
                    <template slot-scope="scoped">
                        <span
                            v-w-title="scoped.row[item.field]" v-if="item.type === 'time'">
                            {{scoped.row[item.field] | timeFormat('yyyy-MM-dd HH:mm')   | contentFilter}}
                        </span>
                        <span
                            v-w-title="scoped.row[item.field]" v-else>{{scoped.row[item.field]  | contentFilter}}</span>
                    </template>
                </el-table-column>
            </slot>
        </template>
        <slot></slot>
    </el-table>
</template>

<script>
    import {validator} from 'klwk-ui';
    import noData from '@/components/noDataTip/noData-tip.vue';

    export default {
        components : {
            noData,
        },
        props: {
            //表格数据
            'table-data': {
                type: Array,
                default() {
                    return [];
                }
            },
            //表格高度
            'table-height': {
                type: String,
                default: '50px'
            },
            //表头数据
            'column-data': {
                type: [Object, Array],
                default() {
                    return {};
                }
            },
            //激活的二级tap
            'active-tap': {
                type: String,
                default: ''
            },
            //行是否可点击
            'row-click': {
                type: Boolean,
                default: false
            },
            //不固定表格高度
            'auto-height' : {
                type : Boolean,
                default : false
            },
            //是否开启第一列选择
            'column-check' : {
                type : Boolean,
                default : false
            }
        },
        data() {
            return {}
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
             * 多选框选中状态改变
             * @param data
             */
            handleSelectionChange (data) {
                this.$emit('selection-change',data);
            },
        },
        computed: {
            //表头配置
            columnDataCs() {
                if (this.activeTap !== '') {
                    return this.columnData[this.activeTap];
                } else {
                    return this.columnData;
                }
            },
        },
        filters: {
            // 时间格式化过滤器
            timeFormat(value, format = 'yyyy/MM/dd', emptyVal = '') {
                if (!value) {
                    return emptyVal;
                } else if (value instanceof Date) {
                    return value.format(format);
                } else if (validator.isNumber(value)) {
                    return new Date(Number(value)).format(format);
                } else if (typeof value === 'string') {
                    return value.toDate().format(format);
                } else {
                    return value
                }
            },
            //内容过滤器，如果内容为空或null，返回-
            contentFilter(content) {
                if (content === '' || content === null || content === undefined) {
                    return '-';
                } else {
                    return content;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .table-wrap {
        .detail-hover {
            width: 100%;
            display: inline-block;
            @color: #1875F0;
            cursor: pointer;

            &:hover {
                color: @color;
            }
        }

        /deep/ .operate-info {
            @color: #1875F0;
            display: inline-block;
            color: @color;
            cursor: pointer;
        }

        &.row-click /deep/ .el-table__body tr {
            cursor: pointer;
        }

        /deep/ tr th:nth-of-type(1) .cell,
        /deep/ tr td:nth-of-type(1) .cell {
            padding-left: 30px !important;
        }
    }
</style>
