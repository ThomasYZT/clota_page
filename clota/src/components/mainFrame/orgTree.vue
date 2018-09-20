<!--组织树-->

<template>
    <div class="org-tree-wrap" @click.stop="">
        <Input v-model.trim="filterValue"
               placeholder="搜索"
               style="width: 270px;margin-bottom:5px;margin-left: 15px;"
               @input="filter($event)"/>
        <div class="tree-list">
            <el-tree
                :props="defaultProps"
                node-key="id"
                ref="tree"
                :filter-node-method="filterNode"
                :data="treeData"
                :render-content="menuRenderContent"
                @node-click="orgChose">
            </el-tree>
        </div>
    </div>
</template>

<script>
    import common from '@/assets/js/common';
    import {mapGetters} from 'vuex';
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
                return data && data.orgName && data.orgName.indexOf(value) !== -1;
            },
            /**
             * 获取组织树列表
             */
            getOrgTree() {
                this.treeData = common.getOrgTree();
            },
            /**
             * 获取选中的组织
             * @returns {string | null}
             */
            getChoseOrg (){
                return this.manageOrgs;
            },
            /**
             * 更改组织结构
             * @param data
             * @param node
             */
            orgChose (data,node){
                if(data.id !== this.manageOrgs.id){
                    this.$store.dispatch('resetNodeChosed',data).then(route => {
                        this.$router.replace({
                            path : route.path
                        });
                        this.$nextTick(() =>{
                            this.$refs.tree.setCheckedNodes([this.getChoseOrg()]);
                            this.$emit('hide-tree');
                        });
                    });
                }
            },
            /**
             * 菜单组织树
             */
            menuRenderContent (h, {root, node, data}) {
                return h('div', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    },
                    class: {
                        'title-wrap': true,
                    },
                }, [
                    h('span', {
                        class: {
                            'title-class': true
                        },
                        directives: [
                            {
                                name: 'w-title',
                                value: data.orgName
                            }
                        ],
                    }, data.orgName)
                ])
            },
        },
        created () {
            this.getOrgTree();
        },
        mounted () {
            this.$nextTick(() =>{
                this.$refs.tree.setCheckedNodes([this.getChoseOrg()]);
            });
        },
        computed : {
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            })
        },
        watch : {
            //监视查询关键字，如果改变就进行查找
            filterValue (newVal,oldVal) {
                this.$refs.tree.filter(newVal);
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .org-tree-wrap{
        padding: 5px 0 10px 0;
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

            /deep/ .is-checked{
                background: $color_fafa;
            }
        }

        /deep/ .title-wrap {
            @include absolute_pos(relative, 0, 0, 0, -20px);
            padding-left: 20px;
            cursor: pointer;

            &:hover {
                background: $color_fafa;

                .title-class {
                    color: $color_blue;
                }

                .iconfont:not(.hidden) {
                    display: inline-block;
                }
            }

            &.active-node{

                .title-class {
                    color: $color_blue;
                }
            }

            .title-class {
                @include overflow_tip(unquote('calc(100% - 40px)'), 36px);
                display: inline-block;
                padding: 7px 0;
                line-height: 22px;
                font-size: 16px;
                color: #333333;
                vertical-align: middle;
            }

            .iconfont {
                display: none;
                color: $color_blue;
                font-size: 14px;
                float: right;
                margin-top: 7px;
                cursor: pointer;
            }
        }

        /deep/ .tree-list{
            overflow-x: hidden;
        }
    }
</style>
