<!--
    帮助信息目录树组件
    作者：杨泽涛
-->
<template>
    <div class="menu-tree">
        <div class="btn-wrapper">
            <span class="add-btn">+ {{$t('addFile')}}</span>
        </div>
        <el-tree :data="folderList" :props="defaultProps" icon-class="">
            <div class="menu-item" slot-scope="{node, data}">
                <div class="label-wrapper">
                    <span v-if="data.isFolder">{{node.label}}</span>
                    <span v-else>{{data.name}}</span>
                </div>
                <div class="tool-wrapper"></div>
            </div>
        </el-tree>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    export default {
        components : {},
        data () {
            return {
                folderList : [],
                defaultProps : {
                    children : 'pageList',
                    label : 'name',
                    isLeaf : 'leaf',
                },
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
                                isFolder : true
                            };
                        }) : [];
                    } else {
                        this.folderList = [];
                    }
                })
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
            height: 100%;
            width: 100%;
            display: flex;

            .label-wrapper {
                flex: 1 0;
                flex-basis: 70%;
            }

            .tool-wrapper {
                flex: 1 0;
                flex-basis: 30%;
            }
        }
    }
</style>
