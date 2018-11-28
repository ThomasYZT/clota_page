<!--
    营销类别组织树
    作者：杨泽涛
-->
<template>
    <div class="market-type-tree">
        <p class="add-btn">
            <span @click="add">+{{$t('addNewMarketingType')}}</span>
        </p>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
            <div class="node" @mouseover="show()"  slot-scope="{ node, data }">
                <div class="label">
                    <span>{{data.label}}</span>
                </div>
                <div class="tool-box" v-show="data.show" v-if="data.level === '1'">
                    <i class="iconfont icon-edit"></i>
                    <i class='iconfont icon-delete'></i>
                </div>
            </div>
        </el-tree>
    </div>
</template>

<script>

    export default {
        components : {},
        data () {
            return {
                data : [
                    {
                        label : '一级 1',
                        level : '1',
                        children : [
                            {
                                label : '二级 1-1',
                                level : '2',
                                children : [
                                    {
                                        label : '三级 1-1-1',
                                        level : '3',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label : '一级 2',
                        level : '1',
                        children : [
                            {
                                label : '二级 2-1',
                                level : '2',
                                children : [
                                    {
                                        label : '三级 2-1-1',
                                        level : '3',
                                    }
                                ]
                            },
                            {
                                label : '二级 2-2',
                                level : '2',
                                children : [
                                    {
                                        label : '三级 2-2-1',
                                        level : '3',
                                    }
                                ]
                            }
                        ]
                    }
                ],
                defaultProps : {
                    children : 'children',
                    label : 'label',
                }
            };
        },
        methods : {
            handleNodeClick (data) {
                console.log(data);
            },
            /**
             * 增加营销类别
             */
            add () {

            },
            /**
             *  显示工具箱
             */
            show (e) {
                console.log(arguments)
                if (e && e.fromElement) {
                    e.fromElement.style.display = 'block';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .market-type-tree {
        /deep/ .el-tree {
            span.el-tree-node__label {
                font-size: 16px;
            }
        }

        .add-btn {
            padding-left: 20px;
            height: 50px;
            width: 100%;
            color: $color_blue;
            font-size: 14px;
            line-height: 50px;
            cursor: pointer;
        }

        .node {
            width: 100%;
            display: flex;
            .label {
                flex: 1 0;
                flex-basis: 70%;
                span {
                    font-size: 16px;
                    color: #333;
                }
            }

            .tool-box {
                flex: 1 0;
                flex-basis: 30%;
                text-align: right;
                font-size: 12px;
                .icon-edit {
                    color: #2F70DF;
                    margin-right: 8px;
                }

                .icon-delete {
                    color: #EB6751;
                    margin-right: 18px;
                }

                &:hover {
                    color: #000;
                }
            }
        }
    }
</style>
