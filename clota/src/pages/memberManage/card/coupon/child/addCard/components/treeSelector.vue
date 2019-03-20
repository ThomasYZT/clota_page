<!--
    树形结构选择列表，附带搜索功能
    作者：杨泽涛
-->
<template>
    <div class="tree-selector">
        <div v-if="treeData && treeData.length > 0" class="tree-node">
            <el-tree ref="elTree"
                     show-checkbox
                     :node-key="nodeKey"
                     :props="defaultProps"
                     :data="treeData"
                     @check-change="handleCheck">
                <template slot-scope="{ node }">
                    <span class="label"
                          v-w-title="node.label">{{node.label}}</span>
                </template>
            </el-tree>
        </div>
        <div v-else
             class="no-data-tip">
            <noDataTip></noDataTip>
        </div>
    </div>
</template>

<script>
    import noDataTip from '@/components/noDataTip/noData-tip';
    export default {
        components : {
            noDataTip
        },
        model : {
            prop : 'value',
            event : 'change'
        },
        props : {
            //列表数据
            data : {
                type : Array,
                default () {
                    return [];
                }
            },
            //双向绑定数据
            value : {
                type : Array,
                default () {
                    return [];
                },
            },
            //树节点配置选项
            defaultProps : {
                required : true,
                type : Object,
            },
            //每个树节点用来作为唯一标识的属性
            nodeKey : {
                required : true,
                type : String,
            },
            //是否禁用
            disabled : {
                type : Boolean,
                default : false,
            }
        },
        data () {
            return {
                checkedData : [],
            };
        },
        computed : {
            treeData () {
                if (this.disabled) {
                    return this.data.map(item => {
                        return {
                            ...item,
                            disabled : true
                        };
                    });
                } else {
                    return this.data;
                }
            }
        },
        methods : {
            /**
             * node
             * @param data 节点数据
             * @param isCheck 当前节点是否被选中
             * @param vnode
             */
            handleCheck (data, isCheck, vnode) {
                if (isCheck) {
                    this.checkedData.push(data);
                } else {
                    this.checkedData.splice(this.checkedData.findIndex(item => {
                        return data[this.nodeKey] === item[this.nodeKey];
                    }), 1);
                }
                this.$emit('change', this.checkedData);
            },
            /**
             * 重置
             */
            reset () {
                this.checkedData = [];
            }
        },
        watch : {
            value : {
                handler (value) {
                    this.$nextTick(() => {
                        if (this.$refs.elTree) {
                            this.$refs.elTree.setCheckedKeys(value.map(item => {
                                return item[this.nodeKey];
                            }));
                        }
                    });
                    this.$emit('on-change', value);
                },
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .tree-selector {
        padding: 10px 0;
        width: 280px;
        height: 210px;
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        overflow: auto;

        .no-data-tip {
            width: 100%;
            height: 100%;
            position: relative;
        }

        /deep/ .el-tree-node__label {
            color: #585858;
            font-size: 14px;
        }

        .label {
            @include overflow_tip();
            font-size: 13px;
            color: #585858;
        }
    }
</style>
