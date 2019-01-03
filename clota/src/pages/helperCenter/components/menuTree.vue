<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="menu-tree">
        <el-tree :data="fileList"
                 :props="defaultProps"
                 :lazy="true"
                 :load="queryPageInfoByFoldId"
                 :highlight-current="true"
                 icon-class="iconfont icon-file"
                 @node-click="showPage">
            <div class="menu-item" slot-scope="{ node, data }">
                <span v-if="data.isFolder">{{ node.label }}</span>
                <span v-else>{{ data.title }}</span>
            </div>
        </el-tree>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    export default {
        props : {
            'nowItem' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {},
        data () {
            return {
                defaultProps : {
                    children : 'children',
                    label : 'name',
                    isLeaf : 'isLeaf'
                },
                //文件夹列表数据
                fileList : [],
                //文件列表数据
                pageList : [],
                //当前选中文件项
                nowMenuItem : {},
                //当前选中文件夹
                nowFolderItem : {},
            };
        },
        methods : {
            /**
             *  获取文件夹列表数据
             */
            getHelpCenterCatalogs () {
                ajax.post('getHelpCenterCatalogs').then(res => {
                    if (res.success) {
                        this.fileList = res.data ? res.data.map((item) => {
                            return {
                                ...item,
                                isFolder : true,
                                children : [],
                            };
                        }) : [];
                    } else {
                        this.fileList = [];
                    }
                });
            },
            /**
             * 获取页面信息列表数据
             * @param node
             * @param resolve
             */
            queryPageInfoByFoldId (node, resolve) {
                if (node && node.data && node.data.id) {
                    ajax.post('queryPageInfoByFoldId', {
                        foldId : node.data.id
                    }).then(res => {
                        if (res.success) {
                            resolve(res.data ? res.data.map(item => {
                                return {
                                    ...item,
                                    isLeaf : true,
                                };
                            }) : []);
                        } else {
                            resolve([]);
                        }
                    });
                } else {
                    resolve([]);
                }

            },
            /**
             * 显示帮助信息
             * @param node
             */
            showPage (data) {
                if (data.isLeaf) {
                    this.nowMenuItem = data;
                    this.$emit('update:nowItem', this.nowMenuItem);
                }
            }
        },
        created () {
            this.getHelpCenterCatalogs();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
