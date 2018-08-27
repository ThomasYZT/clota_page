<!--组织树-->

<template>
    <div class="org-tree-wrap" @click.stop="">
        <Input v-model="filterValue"
               placeholder="搜索"
               style="width: 270px;margin-bottom:5px;"
               @input="filter($event)"/>
        <div class="tree-list">
            <el-tree
                :props="defaultProps"
                ref="tree"
                :filter-node-method="filterNode"
                :data="treeData">
            </el-tree>
        </div>
    </div>
</template>

<script>
    import common from '@/assets/js/common';
    export default {
        data() {
            return {
                //筛选组织的关键字
                filterValue : '',
                //组织树数据
                treeData: [],
                //props配置
                defaultProps: {
                    children: 'children',
                    label: 'orgName'
                }
            }
        },
        methods: {
            /**
             * 过滤组织树数据
             * @param e
             */
            filter(e){
                this.$refs.tree.filter(e);
            },
            /**
             * 组织树过滤方法
             * @param value
             * @param data
             * @returns {boolean}
             */
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            /**
             * 获取组织树列表
             */
            getOrgTree() {
                this.treeData = common.getOrgTree();
            }
        },
        created () {
            this.getOrgTree();
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .org-tree-wrap{
        padding:5px 15px 10px 15px;
        position: absolute;
        top : 46px;
        right : 55px;
        background: $color_fff;
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        width: 300px;
        max-height: 390px;
        z-index: 99999;

        &::before{
            display: block;
            content: '';
            @include block_outline(10px,10px);
            background: $color_fff;
            position: relative;
            top: -10px;
            transform: rotate(45deg);
            right: -226px;
            border-top: 1px solid #E0E0E0;
            border-left: 1px solid #E0E0E0;
        }

        .tree-list{
            max-height: 330px;
            overflow: auto;
        }
    }
</style>
