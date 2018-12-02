<!--
    营销类别组织树
    作者：杨泽涛
-->
<template>
    <div class="market-type-tree">
        <p class="add-btn">
            <span @click="add">+{{$t('addNewMarketingType')}}</span>
        </p>
        <el-tree ref="elTree" :data="typeList" :props="defaultProps" node-key="id">
            <div class="node" slot-scope="{ node, data }">
                <div class="label">
                    <span v-if="data.type !== 'edit' && data.type !== 'add'">{{node.label}}</span>
                    <Input v-else v-model="data.label" :placeholder="$t('inputField', { field : $t('marketType') })" style="width: 130px;"></Input>
                </div>
                <div class="tool-box">
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
    import ajax from '@/api/index';
    import forEach from 'lodash/forEach';
    export default {
        components : {
            delModal
        },
        data () {
            return {
                typeList : [],
                defaultProps : {
                    children : 'children',
                    label : 'typeName',
                },
                //新节点数据
                newNodeData : {
                    label : '',
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
                let canAdd = true;
                forEach(this.typeList, (item) => {
                    if (item.type === 'add') {
                        canAdd = false;
                        return false;
                    }
                });
                if (canAdd) {
                    this.typeList.push(this.newNodeData);
                }
            },
            /**
             *  编辑
             *  @param {object} data
             */
            edit (data) {
                forEach(this.typeList, (item,index, arr) => {
                    if (data.label === item.label) {
                        this.$set(arr[index],'type','edit');
                        return false;
                    }
                });
            },
            /**
             *  删除
             *  @param {object} data
             */
            del (data) {
                this.$refs.delModal.show({
                    confirmCallback : () => {
                        //确认删除
                        this.confirmDel(data);
                    }
                })

            },
            /**
             *  确认删除类别
             *  @param {*} data
             */
            confirmDel (data) {
                forEach(this.typeList, (item) => {
                    if (data.label === item.label) {
                        this.forceDelete(data);
                        return false;
                    }
                });
            },
            /**
             *  接口强制删除类别
             *  @param {*} data
             */
            forceDelete (data) {
                ajax.post('marketing-forceDeleteType', {
                    typeId : data.id
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('del') }));
                        this.getTypeList();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('del') }));
                    }
                });
            },
            /**
             * 保存
             * @param {*} data
             */
            save (data) {
                if (data.type && data.type === 'add') {
                    this.addType(data);
                } else {
                    this.saveEdit(data);
                }

            },
            /**
             *  增加类别
             *  @param {*} data
             */
            addType (data) {
                ajax.post('marketing-addType', {
                    typeName : data.label,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                        this.getTypeList();
                        this.newNodeData = {
                            label : '',
                            type : 'add'
                        }
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('add') }));
                    }
                });
            },
            /**
             * 保存编辑
             * @param {*} data
             */
            saveEdit (data) {
                ajax.post('marketing-updateType', {
                    id : data.id,
                    typeName : data.label,
                    registerUrl : data.registerUrl,
                    withdrawDay : data.withdrawDay
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('edit') }));
                        this.getTypeList();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('edit') }));
                    }
                 })
            },
            /**
             * 取消
             * @param {object} data
             */
            cancel (data) {
                forEach(this.typeList, (item,index, arr) => {
                    if (data.label === item.label && item.type === 'edit') {
                        this.$set(arr[index],'type','');
                        return false;
                    } else if (data.label === item.label && item.type === 'add') {
                        this.typeList.pop();
                        return false;
                    }
                });
                this.newNodeData = {
                    label : '',
                    type : 'add'
                }
            },
            /**
             *  获取营销类别列表数据
             */
            getTypeList () {
                ajax.post('marketing-typeList').then((res) => {
                    if (res.success) {
                        this.typeList = res.data ? res.data.map((item) => {
                            return {
                                ...item,
                                label : item.typeName,
                                type : '',
                            }
                        }) : [];
                        this.$refs.elTree.setCurrentKey([this.typeList[0].id]);
                    } else {
                        this.typeList = [];
                    }
                });
            }
        },
        created () {
            this.getTypeList();
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
