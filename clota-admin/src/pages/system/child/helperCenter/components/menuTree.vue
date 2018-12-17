<!--
    帮助信息目录树组件
    作者：杨泽涛
-->
<template>
    <div class="menu-tree">
        <div class="btn-wrapper">
            <span class="add-btn" @click="addNewFolder">+ {{$t('addFile')}}</span>
        </div>
        <el-tree ref="elTree"
                 node-key="id"
                 :data="folderList"
                 :props="defaultProps"
                 icon-class="iconfont icon-file"
                 @node-click="nodeClick"
                 @current-change="currentChange">
            <div class="menu-item" :class="{ 'selected-file' : (data.id === nowfileItem.id) && (data.type !== 'no_file') && !data.isFolder }" slot-scope="{node, data}">
                <div class="label-wrapper">
                    <!-- 文件夹 -->
                    <template v-if="data.isFolder">
                        <span  class="folder-item" v-if="data.type === ''">{{node.label}}</span>
                        <!-- 带状态的文件夹 -->
                        <Input v-else-if="data.type === 'add'"
                               v-model="folderNode.name"
                               :placeholder="$t('inputField', { field : $t('folderName') })"
                               style="width: 130px"></Input>
                        <Input v-else-if="data.type === 'edit'"
                               v-model="data.name"
                               :placeholder="$t('inputField', { field : $t('folderName') })"
                               style="width: 130px"></Input>
                    </template>
                    <!-- 文件 -->
                    <template v-else>
                        <span class="file-item" :class="{ 'add-file-btn' : data.type === 'no_file'}">{{data.name}}</span>
                    </template>
                </div>
                <div class="tool-wrapper" v-if="data.type === 'add' || data.type === 'edit'">
                    <span class="tool-btn blue-btn" @click.stop="validateFolder(data)">{{$t('save')}}</span>
                    <span class="tool-btn" @click.stop="cancel(data)">{{$t('cancel')}}</span>
                </div>
                <div class="tool-wrapper" v-if="data.type === ''">
                    <span class="tool-btn blue-btn"  @click.stop="editFolder(data)">{{$t('edit')}}</span>
                    <span class="tool-btn red-btn" @click.stop="deleteFolder(data)">{{$t('delete')}}</span>
                </div>
            </div>
        </el-tree>

        <delModal ref="delModal">
            <div class="del-modal">
                <i class="iconfont icon-help"></i>
                <span class="warn-tip">{{$t('sureToDelFolderTip')}}</span>
            </div>
        </delModal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import { validator } from 'klwk-ui';
    import forEach from 'lodash/forEach';
    import delModal from '../../../../../components/delModal/index';
    export default {
        props : {
            //当前选择的文件
            nowfileItem : {
                type : Object,
                default () {
                    return {};
                }
            },
            //取消保存的文件
            cancelFile : {
                type : Object,
                default () {
                    return {};
                }
            },
            //更新信息
            updateInfo : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            delModal
        },
        data () {
            return {
                //文件夹列表数据
                folderList : [],
                //树节点固定字段设置
                defaultProps : {
                    children : 'pageList',
                    label : 'name',
                },
                //文件夹节点
                folderNode : {
                    name : '',
                    isFolder : true,
                    type : 'add',
                    pageList : []
                },
                //当前所选节点
                nowItem : {}
            };
        },
        methods : {
            /**
             * 查询文件夹列表
             */
            findfolderList () {
                ajax.get('folderList').then(res => {
                    if (res.status && res.status === 200) {
                        this.folderList = res.data && res.data.folderList ? res.data.folderList.map((item) => {
                            return {
                                ...item,
                                isFolder : true,
                                type : '',
                                pageList : item.pageList && item.pageList.length > 0 ? item.pageList : [
                                    {
                                        name : '+新增文件',
                                        type : 'no_file',
                                        folderId : item.id
                                    },
                                ],
                            };
                        }) : [];
                    } else {
                        this.folderList = [];
                    }
                });
            },
            /**
             * 新增文件夹
             */
            addNewFolder () {
                let canAdd = true;
                forEach(this.folderList, (item) => {
                    if (item.type === 'add') {
                        canAdd = false;
                        return false;
                    }
                });
                if (canAdd) {
                    this.folderList.push(this.folderNode);
                }
            },
            /**
             *  删除文件夹
             *  @param {object} data
             */
            deleteFolder (data) {
                this.$refs.delModal.show({
                    confirmCallback : () => {
                        ajax.post('deleteFolder', {
                            id : data.id,
                        }).then((res) => {
                            if (res.status === 200) {
                                this.findfolderList();
                                this.$Message.success(this.$t('successTip', { tip : this.$t('delete') }));
                            } else {
                                this.$Message.error(this.$t('failureTip', { tip : this.$t('delete') }));
                            }
                        })
                    }
                })
            },
            /**
             * 修改文件夹
             * @param {object} data
             */
            editFolder (data) {
                this.$refs.elTree.store.nodesMap[data.id].expanded = false;
                forEach(this.folderList, (item, index) => {
                    if (item.id === data.id) {
                        this.$set(this.folderList[index],'type','edit');
                        return false;
                    }
                });
            },
            /**
             *  所选文件夹改变事件（用户点击文件夹时触发）
             *  @param {object} data
             */
            currentChange (data) {
                if (data.type !== 'add' && data.type !== 'no_limit') {
                    this.nowItem = defaultsDeep({ type : 'change' }, data);
                }
            },
            /**
             *  校验文件夹数据
             *  @param {object} data
             */
            validateFolder (data) {
                if (validator.isInLengthRange(this.folderNode.name, 0, 10)) {
                    if (data.type === 'add') {
                        this.saveFolder();
                    } else if (data.type === 'edit')  {
                        this.updateFolder(data);
                    }
                } else {
                    this.$Message.warning(this.$t('errorMaxLength', { field : this.$t('folderName'), length : 10 }))
                }
            },
            /**
             * 保存文件夹
             */
            saveFolder () {
                ajax.post('addFolder', {
                    name : this.folderNode.name,
                }).then(res => {
                    if (res.status === 200) {
                        this.findfolderList();
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                        this.folderNode = {
                            name : '',
                            isFolder : true,
                            type : 'add',
                            pageList : [],
                        };
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('add') }));
                    }
                })
            },
            /**
             *  修改文件夹
             *  @param {object} data
             **/
            updateFolder (data) {
                ajax.post('updateFolder', {
                    id : data.id,
                    name : data.name,
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('edit') }));
                        this.findfolderList();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('edit') }));
                    }
                })
            },
            /**
             * 取消保存
             * @param {object} data
             */
            cancel (data) {
                if (data.type === 'add') {
                    this.folderList.pop();
                    this.folderNode = {
                        name : '',
                        isFolder : true,
                        type : 'add',
                        pageList : [],
                    }
                } else if (data.type === 'edit') {
                    forEach(this.folderList, (item, index) => {
                        if (item.id === data.id) {
                            this.$set(this.folderList[index],'type','');
                            return false;
                        }
                    });
                }
            },
            /**
             * 查询页面列表数据
             * @param {object} data
             * @param {function} callback
             */
            findPageList (data, callback) {
                    ajax.get('pageList', {
                        folderId : data.id
                    }).then(res => {
                        if (res.status === 200) {
                            forEach(this.folderList, (item, index) => {
                                if (item.id === data.id) {
                                    this.folderList[index].pageList = res.data && res.data.pageList ? res.data.pageList.map((item) => {
                                        return {
                                            name : item.title,
                                            type : 'show-file',
                                            ...item
                                        }
                                    }) : [];
                                    this.folderList[index].pageList.push({
                                        name : '+新增文件',
                                        type : 'no_file',
                                        folderId : data.id
                                    });
                                    return false;
                                }
                            });
                            if (callback) {
                                callback();
                            }
                        } else {
                            this.folderList[index].pageList = [
                                {
                                    name : '+新增文件',
                                    type : 'no_file',
                                    folderId : data.id
                                },
                            ]
                            this.$Message.error(this.$t('getPageListFailure'));
                        }
                    });
            },
            /**
             * 节点被点击时的回掉
             * @param {object} data
             * @param {object} node
             */
            nodeClick (data, node) {
                if (data.isFolder && data.type !== 'add' && data.type !== 'edit') {
                    if (this.$refs.elTree.store.nodesMap[data.id].expanded) {
                        this.findPageList(data);
                    }
                } else {
                    this.$emit('update:nowfileItem', data);
                    if (this.$refs.elTree.store.nodesMap[data.id]) {
                        this.$refs.elTree.store.nodesMap[data.id].expanded = false;
                    }

                    if (data.type === 'no_file') {
                        this.addFile(data);
                    }
                }
            },
            /**
             * 新增文件
             * @param data
             */
            addFile (data) {
                if (this.validEditFile()) {
                    forEach(this.folderList, (item, index) => {
                        if (item.id === data.folderId) {
                            this.folderList[index].pageList.pop();
                            this.folderList[index].pageList.push({
                                name : '新建文件',
                                type : 'new-file',
                                isFolder : false,
                                folderId : data.folderId,
                            });
                            this.folderList[index].pageList.push({
                                name : '+新增文件',
                                type : 'no_file',
                                folderId : data.folderId
                            });
                            this.$nextTick(() => {
                                this.$emit('update:nowfileItem', this.folderList[index].pageList[this.folderList[index].pageList.length - 2]);
                            });
                            return false;
                        }
                    });
                }
            },
            /**
             * 检查是否有正在编辑的文件
             * @return {boolean}
             */
            validEditFile () {
                let status = true;
                forEach(this.folderList, (folder) => {
                    forEach(folder.pageList, (page) => {
                        if (page.type === 'new-file') {
                            status = false;
                            this.$Message.warning(this.$t('youHaveUnsavedFile'));
                            return false;
                        }
                    })
                });
                return status;
            },
            /**
             * 取消保存文件
             */
            revoke () {
                let status = false;
                forEach(this.folderList, (folder) => {
                    if (status) {
                        return false;
                    } else {
                        forEach(folder.pageList, (page, index) => {
                            if (page.type === 'new-file') {
                                folder.pageList.splice(index, 1);
                                this.$emit('update:nowfileItem', {});
                                status = true;
                                return false;
                            }
                        });
                    }
                });
            },
            /**
             * 新增文件跟新列表信息
             * @param {object} data
             */
            updateInfoList (data) {
                //查询文件列表数据
                this.findPageList({
                    id : data.folderId,
                }, () => {
                    this.$emit('update:nowfileItem', {
                        ...this.folderList.find(item => {
                            return item.id === data.folderId;
                        }).pageList.find(item => {
                            return item.id === data.fileId;
                        })
                    })
                });
                //展开要更新的文件夹
                this.$refs.elTree.store.nodesMap[data.folderId].expanded = true;
            }
        },
        created () {
            this.findfolderList();
        },
        watch : {
            cancelFile : {
                handler (file) {
                    if (Object.keys(file).length > 0) {
                        this.revoke();
                    }
                },
                deep : true,
            },
            updateInfo : {
                handler (newVal) {
                    if (Object.keys(newVal).length > 0) {
                        this.updateInfoList(newVal);
                    }
                },
                deep : true,
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .menu-tree {
        .btn-wrapper {
            width: 100%;
            height: 60px;
            line-height: 60px;
            text-align: center;

            .add-btn {
                color: $color_blue;
                cursor: pointer;
                transition: all 0.5s;
                &:hover {
                    color: $color_lang_color
                }
            }
        }

        .menu-item {
            padding: 6px;
            height: 28px;
            width: 100%;
            display: flex;
            line-height: 16px;

            .label-wrapper {
                position: relative;
                flex: 1 0;
                flex-basis: 70%;
                height: 100%;

                .file-item {
                    font-size: 14px;
                    color: $color_gray;
                }

                .add-file-btn {
                    padding: 2px;
                    display: inline-block;
                    border-radius: 3px;
                    font-size: 12px;
                    border: 1px dotted $color_gray;
                }

                .folder-item {
                    font-size: 14px;
                }

                /deep/ .ivu-input-wrapper {
                    line-height: 25px;
                    .ivu-input {
                        height: 25px;
                    }
                }
            }

            .tool-wrapper {
                display: none;
                flex: 1 0;
                flex-basis: 30%;

                .tool-btn {
                    font-size: 10px;
                    color: $color_gray;

                    &.blue-btn {
                        color: $color_blue;
                    }

                    &.red-btn {
                        color: $color_red;
                    }

                    &:hover {
                        transition : all 0.3s;
                        &.blue-btn {
                            color: $color_lang_color;
                        }
                        &.red-btn {
                            color: $color_yellow;
                        }
                        color: $color_606266;
                    }
                }
            }

            &:hover {
                .tool-wrapper {
                    display: block;
                }
            }

            /deep/ .ivu-input-wrapper {
                .ivu-input {
                    height: 25px;
                    padding: 0px 7px;
                }
            }
        }

        .selected-file {
            background-color: #f5f7fa;
            border-radius: 5px;
        }
    }

    .del-modal {
        width: 80%;
        .icon-help {
            &:before {
                color: #EB6751;
            }
        }

        .type-name {
            color: $color_yellow;
        }

        .result {
            color: $color_red;
        }
    }
</style>
