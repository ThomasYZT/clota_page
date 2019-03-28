<!--下拉树-->

<template>
    <div class="select-tree">
        <i-input :value="orgName"
                   readonly
                    :disabled="disabled"
                   @click.native="showTree($event)"
                   :style="{width : width}">
        </i-input>
        <Icon class="arrow"
              :class="{'is-reverse': treeShow}"
              type="ios-arrow-down">
        </Icon>
        <transition name="el-zoom-in-top">
            <div class="tree-wrap" v-show="treeShow" v-clickoutside="hideTree" :style="{width : width}">
                <el-tree :data="tree"
                         v-transfer-dom
                         ref="nodeTree"
                         :default-expand-all="true"
                         :props="defaultProps"
                         :expand-on-click-node="false"
                         @node-click="choseNode"
                         :filter-node-method="nodeFilter"
                         :render-content="renderContent">
                </el-tree>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props : {
            width : {
              type : String,
              default () {
                  return '100%';
              }
            },
            //组织树数据
            tree : {
                type : Array,
                default () {
                    return [];
                }
            },
            //默认选中的节点
            value : {
                type : String,
                default : ''
            },
            //是否禁用
            disabled : {
                type : Boolean,
                default : false
            },
            //禁用的节点id数组
            'disabled-node-ids' : {
                type : Array ,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                //组织树是否显示
                treeShow : false,
                //组织树配置
                defaultProps : {
                    children : 'subNodes',
                    label : 'orgName'
                },
                //组织id与name对应数据
                treeIdToName : {},
            };
        },
        methods : {
            /**
             * 显示树
             */
            showTree (e) {
                if (this.disabled) return;
                e.stopPropagation();
                this.treeShow = true;
            },
            /**
             * 隐藏树
             */
            hideTree () {
                this.treeShow = false;
            },
            /**
             * 选择节点
             * @param data
             * @param node
             */
            choseNode (data,node) {
                if (this.disabledNodeIds.includes(data.id) || data.disabled) return;
                this.$emit('input',data.id);
                this.hideTree();
            },
            /**
             * 组织树render函数
             */
            renderContent (h, { root, node, data }) {
                this.$set(this.treeIdToName,data.id,data['orgName']);
                return h('div', {
                    style : {
                        display : 'inline-block',
                        width : '100%'
                    },
                    class : {
                        'title-wrap' : true,
                        'active-node' : data.id === this.value
                    }
                }, [
                    h('span', {
                        class : {
                            'title-class' : true,
                            'disabled-node' : this.disabledNodeIds.includes(data.id) || data.disabled
                        },
                        directives : [
                            {
                                name : 'w-title',
                                value : data.orgName
                            }
                        ],
                    }, data.orgName)
                ]);
            },
            /**
             * 筛选节点信息
             * @param{String} value 筛选信息
             * @param{Object} data 节点信息
             */
            nodeFilter (value,data) {
                return !this.disabledNodeIds.includes(data.id);
            }
        },
        computed : {
            //显示选中的节点信息
            orgName () {
                if (this.value) {
                    return this.treeIdToName[this.value];
                } else {
                    return '';
                }
            }
        },
        watch : {
            tree : {
                handler (newVal) {
                    if (newVal) {
                        this.$nextTick(() => {
                            if (this.$refs.nodeTree) {
                                this.$refs.nodeTree.filter('id');
                            }
                        });
                    }
                },
                deep : true,
                immediate : true
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .select-tree{
        position: relative;
        display: inline-block;

        /deep/ .ivu-input{
            cursor: pointer;
        }

        /deep/ .ivu-input-type{
            max-width: 100%;
        }

        .arrow{
            position: absolute;
            right: 11px;
            top : 8px;
            color: #CED0DA;
            transition: transform .3s;
            transform: rotateZ(0deg);

            &.is-reverse{
                transform: rotateZ(180deg);
            }
        }

        .tree-wrap{
            position: absolute;
            z-index: 9;
            width: 100%;
            max-height: 200px;
            background: $color_fff;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
            overflow: auto;
            padding: 5px 0;
        }

        .ivu-tree{
        }

        .title-class {
            @include overflow_tip(unquote('calc(100% - 40px)'), 36px);
            display: inline-block;
            padding: 7px 0;
            line-height: 22px;
            font-size: 14px;
            color: #333333;
            vertical-align: middle;

        }

        .el-icon-caret-right{
            position: relative;
            z-index: 99;
        }

        /deep/ .title-wrap {
            @include absolute_pos(relative, 0, 0, 0, -20px);
            padding-left: 20px;
            cursor: pointer;

            &:hover {

                .title-class {
                    color: $color_blue;
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
                font-size: 14px;
                color: #333333;
                vertical-align: middle;

                &.disabled-node{
                    color: $color_gray!important;
                    cursor: not-allowed;
                }
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
    }
</style>
