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
                 :data="folderList"
                 :props="defaultProps"
                 icon-class="iconfont icon-file"
                 @current-change="currentChange">
            <div class="menu-item" slot-scope="{node, data}">
                <div class="label-wrapper">
                    <!-- 文件夹 -->
                    <template v-if="data.isFolder">
                        <span v-if="data.type === ''">{{node.label}}</span>
                        <!-- 带状态的文件夹 -->
                        <Input v-else-if="data.type === 'add' || data.type === 'edit'"
                               v-model="folderNode.name"
                               :placeholder="$t('inputField', { field : $t('folderName') })"
                               style="width: 130px"></Input>
                    </template>
                    <!-- 文件 -->
                    <template v-else>
                        <span class="file-item">{{data.name}}</span>
                    </template>
                </div>
                <div class="tool-wrapper" v-if="data.type === 'add'">
                    <span class="tool-btn blue-btn" @click.stop="validateFolder">{{$t('save')}}</span>
                    <span class="tool-btn" @click="cancel">{{$t('cancel')}}</span>
                </div>
                <div class="tool-wrapper" v-if="data.type === ''">
                    <span class="tool-btn blue-btn"  @click.stop="validateFolder">{{$t('edit')}}</span>
                    <span class="tool-btn red-btn">{{$t('delete')}}</span>
                </div>
            </div>
        </el-tree>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import { validator } from 'klwk-ui';
    export default {
        components : {},
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
                                        name : '暂无文件',
                                        type : 'no_file'
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
                this.folderList.push(this.folderNode);
            },
            /**
             * 加载文件
             */
            loadFiles (node, resolve) {
                if (node && node.data && node.data.id) {
                    ajax.get('pageList', {
                        folderId : node.data.id,
                    }).then((res) => {
                        if (res.success && res.success === 200) {
                            resolve(res.pageList ? res.pageList.map((item) => {
                                return {
                                    ...item,
                                    type : '',
                                }
                            }) : []);
                        } else {
                            resolve([])
                        }
                    });
                } else {
                    resolve([]);
                }
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
             */
            validateFolder () {
                if (validator.isInLengthRange(this.folderNode.name, 0, 10)) {
                    this.saveFolder();
                } else {
                    this.$Message.warn(this.$t('errorMaxLength', { field : this.$t('folderName'), length : 10 }))
                }
            },
            /**
             * 保存文件夹
             */
            saveFolder () {

            },
            /**
             * 取消保存
             */
            cancel () {
                this.folderList.pop();
                this.folderNode = {
                    name : '',
                    isFolder : true,
                    type : 'add',
                    pageList : [],
                }
            }
        },
        created () {
            this.findfolderList();
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
                flex: 1 0;
                flex-basis: 70%;
                height: 100%;

                .file-item {
                    font-size: 14px;
                    color: $color_gray;
                }

                /deep/ .ivu-input-wrapper {
                    line-height: 20px;
                    .ivu-input {
                        height: 20px;
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
    }
</style>
