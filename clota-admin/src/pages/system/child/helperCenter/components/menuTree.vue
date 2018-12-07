<!--
    帮助信息目录树组件
    作者：杨泽涛
-->
<template>
    <div class="menu-tree">
        <el-tree :data="menuList" :props="defaultProps" icon-class=""></el-tree>
    </div>
</template>

<script>

    export default {
        components : {},
        data () {
            return {
                menuList : [
                    {
                        label : '一级 1',
                        children : [
                            {
                                label : '二级 1-1',
                            }
                        ]
                    },
                    {
                        label : '一级 2',
                        children : [
                            {
                                label : '二级 2-1',
                            },
                            {
                                label : '二级 2-2',
                            }
                        ]
                    }
                ],
                defaultProps : {
                    children : 'children',
                    label : 'label'
                }
            };
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
