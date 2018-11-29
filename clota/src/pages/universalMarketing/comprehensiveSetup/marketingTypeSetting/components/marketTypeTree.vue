<!--
    营销类别组织树
    作者：杨泽涛
-->
<template>
    <div class="market-type-tree">
        <p class="add-btn">
            <span @click="add">+{{$t('addNewMarketingType')}}</span>
        </p>
        <el-tree :data="data" :props="defaultProps">
            <div class="node" slot-scope="{ node, data }">
                <div class="label">
                    <span v-if="data.type !== 'edit' && data.type !== 'add'">{{data.label}}</span>
                    <Input v-else v-model="data.label" :placeholder="$t('inputField', { field : $t('marketType') })" style="width: 130px;"></Input>
                </div>
                <div class="tool-box" v-if="data.level === '1'">
                    <template v-if="data.type === 'edit' || data.type === 'add'">
                        <span @click.stop="save(data)" class="save">{{$t('save')}}</span>
                        <span @click.stop="cancel(data)" class="cancel">{{$t('cancel')}}</span>

                    </template>
                    <template v-else>
                        <i @click.stop="edit(data)" class="iconfont icon-edit"></i>
                        <i @click.stop="del(data)" class="iconfont icon-delete"></i>
                    </template>
                </div>
            </div>
        </el-tree>

        <delModal ref="delModal">
            <div class="del-modal">
                <i class="iconfont icon-help"></i>
                {{$t('colonSetting', { key : $t('delMarketingTypeName') })}} <span class="type-name">{{delData.label}}</span>
                <span class="result">{{$t('delMarketingTypeResult')}}</span>
                <span class="warn-tip">{{$t('operationIrrevocable')}}，{{$t('sureToDel')}}</span>
            </div>
        </delModal>
    </div>
</template>

<script>
    import delModal from '../../../../../components/delModal/index';
    export default {
        components : {
            delModal
        },
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
                            },
                            {
                                label : '二级 2-2',
                                level : '2',
                            }
                        ]
                    }
                ],
                defaultProps : {
                    children : 'children',
                    label : 'label',
                },
                //新节点数据
                newNodeData : {
                    label : '',
                    level : '1',
                    type : 'add',
                    children : []
                },
                //正在删除的内容
                delData : {}
            };
        },
        methods : {
            /**
             * 增加营销类别
             */
            add () {
                this.data.push(this.newNodeData);
            },
            /**
             *  编辑
             *  @param {object} data
             */
            edit (data) {
                this.data.forEach((item,index, arr) => {
                    if (data.label === item.label) {
                        this.$set(arr[index],'type','edit');
                    }
                });
            },
            /**
             *  删除
             *  @param {object} data
             */
            del (data) {
                this.delData = data;
                this.$refs.delModal.show({
                    confirmCallback : () => {
                        this.data.forEach((item,index, arr) => {
                            if (data.label === item.label) {
                                arr.splice(index, 1)
                            }
                        });
                    },
                    cancelCallback : () => {
                        this.delData = {};
                    }
                })

            },
            /**
             * 保存
             */
            save () {

            },
            /**
             * 取消
             * @param {object} data
             */
            cancel (data) {
                this.data.forEach((item,index, arr) => {
                    if (data.label === item.label && item.type === 'edit') {
                        this.$set(arr[index],'type','');
                    } else if (data.label === item.label && item.type === 'add') {
                        this.data.pop();
                    }
                });
                this.newNodeData = {
                    label : '',
                    level : '1',
                    type : 'add',
                    children : []
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
            height: 30px;
            display: flex;
            .label {
                flex: 1 0;
                flex-basis: 70%;
                span {
                    font-size: 16px;
                    color: #333;
                }
            }

            &:hover {
                .tool-box {
                    display: block;
                }
            }

            .tool-box {
                display: none;
                height: 100%;
                flex: 1 0;
                flex-basis: 30%;
                text-align: right;
                font-size: 12px;
                line-height: 30px;

                .iconfont, .save, .cancel {
                    &:hover {
                        font-weight: bold;
                    }
                }

                .icon-edit {
                    color: #2F70DF;
                    margin-right: 8px;
                }

                .icon-delete {
                    color: #EB6751;
                    margin-right: 10px;
                }

                .save {
                    color: #2F70DF;
                }

                .cancel {
                    color: #EB6751;
                    margin-right: 4px;
                }
            }

            /deep/ .ivu-input-wrapper {
                .ivu-input {
                    height: 25px;
                    padding: 0px 7px;
                }
            }
        }
    }
    .del-modal {
        width: 80%;
        .icon-help {
            color: #EB6751;
        }

        .type-name {
            color: $color_yellow;
        }

        .result {
            color: $color_red;
        }
    }
</style>
