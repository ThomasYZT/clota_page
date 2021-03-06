<!--组织架构树-->

<template>
    <div class="structure-tree">
        <ul class="head">
            <li class="tree-title"
                :class="{'active' : activeTap === 'manage'}"
                @click="switchTap('manage')">
                <span class="iconfont icon-fiance"></span>
                经营管理
            </li>
            <li class="tree-title"
                :class="{'active' : activeTap === 'economic'}"
                @click="switchTap('economic')">
                <span class="iconfont icon-management"></span>
                财务管理
            </li>
        </ul>
        <div class="search-input">
            <Input
                v-model.trim="keyWord"
                placeholder="请输入查找内容"
                icon="ios-search"
                style="width: 360px"/>
        </div>
        <div class="tree-plugin">
            <el-tree :data="companyData"
                     node-key="id"
                     ref="tree"
                     :default-expanded-keys="defaultExpandedKeys"
                      :expand-on-click-node="false"
                      v-if="companyData.length > 0"
                     :filter-node-method="filterNode"
                      :render-content="renderContent">
            </el-tree>
            <no-data v-else>
            </no-data>
        </div>
        <!--删除节点模态框-->
        <del-modal ref="delModal">
            <span style="" class="red-bale">本操作将同步删除本节点的全部下级节点，并不可撤销，</span>
            <span>是否继续删除？</span>
        </del-modal>
        <!--删除节点失败原因显示-->
        <confirm-modal v-model="confirmModalShow" title="提示">
            当前删除节点或其子孙节点是其它节点的财务上级，不可删除，请重新设置财务上级后再删除
        </confirm-modal>
        <!--新增节点模态框-->
        <add-modal v-model="addModalShow"
                   :node-detail="currentNode"
                   @add-com-modal-show="addCompanyShow"
                   @add-scene-modal-show="addScene"
                   @add-cashier-modal-show="addCashier"
                   @add-department="addDepartment">
        </add-modal>
        <!--新增公司模态框-->
        <add-company v-model="addCompanyModalShow"
                     :root-id="rootId"
                     :chosed-node-detail="currentNode"
                     :added-node-detail="addNodeDetail"
                     @fresh-structure-data="getStructureData">
        </add-company>
        <!--新增景区模态框-->
        <add-scene v-model="addSceneModalShow"
                   :root-id="rootId"
                   :chosed-node-detail="currentNode"
                   :added-node-detail="addNodeDetail"
                   @fresh-structure-data="getStructureData">
        </add-scene>
        <!--新增核销/销售款台模态框-->
        <add-cashier v-model="addCashierModalShow"
                     :chosed-node-detail="currentNode"
                     :added-node-detail="addNodeDetail"
                     @fresh-structure-data="getStructureData">
        </add-cashier>
        <!--删除节点报错提示模态框-->
        <notice-modal ref="noticeModal">
            <ul class="pro-list">
                <li class="detail">{{`${$t('cannotDelte')} ${currentNode.name}`}}</li>
                <li class="detail partner-list">{{$t('cannotDeleteReason')}}</li>
                <li class="hint">
                    <Icon type="information-circled"></Icon>
                </li>
            </ul>
        </notice-modal>
    </div>
</template>

<script>
    import delModal from '@/components/delModal/index.vue';
    import addModal from './child/addNode';
    import addCompany from './child/addCompany';
    import addScene from './child/addScene';
    import addCashier from './child/addCashier';
    import ajax from '@/api/index.js';
    import noData from '@/components/noDataTip/noData-tip';
    import noticeModal from '@/components/noticeModal/index.vue';

    export default {
        props : {
            //组织结构数据
            'tree-data' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //当前选中的结构类型
            value : {
                type : String,
                default : ''
            },
            //当前激活的节点
            activeNode : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            delModal,
            addModal,
            addCompany,
            addScene,
            addCashier,
            noData,
            noticeModal
        },
        data () {
            return {
                //搜索关键字
                keyWord : '',
                //当前激活菜单
                activeTap : 'manage',
                //添加节点模态框是否显示
                addModalShow : false,
                //当前操作的节点
                currentNode : {},
                //是否显示添加公司的模态框
                addCompanyModalShow : false,
                //是否显示添加景区的模态框
                addSceneModalShow : false,
                //是否显示添加款台的模态框
                addCashierModalShow : false,
                //新增的节点信息
                addNodeDetail : {},
                defaultProps : {
                    children : 'chilrends'
                },
                //确认模态框是否显示
                confirmModalShow : false
            };
        },
        methods : {
            /**
             * 组织树render函数
             */
            renderContent (h, { root, node, data }) {
                if (data.id === this.activeNode.id) {
                    this.$emit('update:activeNode',Object.assign(this.activeNode,{
                        pid : data.pid,
                    }));
                }
                // data.expand = true;
                return h('div', {
                    style : {
                        display : 'inline-block',
                        width : '100%'
                    },
                    class : {
                        'title-wrap' : true,
                        'active-node' : data.id === this.activeNode.id
                    },
                    on : {
                        click : () => {
                            this.$emit('update:activeNode',{
                                id : data.id,
                                pid : data.pid,
                                type : data.data ? data.data.nodeType : ''
                            });
                            // this.activeNode = data;
                            this.$emit('input',data.data.type);
                        }
                    }
                }, [
                    h('span', {
                        class : {
                            'title-class' : true
                        },
                        directives : [
                            {
                                name : 'w-title',
                                value : data.name
                            }
                        ],
                    }, data.name),
                    h('span', {
                        class : {
                            iconfont : 'true',
                            'icon-delete' : true,
                            //财务管理不允许删除节点
                            'hidden' : this.activeTap === 'economic' || data.pid === '0'
                        },
                        style : {
                            paddingRight : '5px',
                        },
                        on : {
                            click : (e) => {
                                e.stopPropagation();
                                this.currentNode = data;
                                this.$refs.delModal.show({
                                    title : `删除${data.name}`,
                                    confirmCallback : () => {
                                        this.delNode(data);
                                    }
                                });
                            }
                        }
                    }),
                    h('span', {
                        class : {
                            iconfont : 'true',
                            'icon-add' : true,
                            //财务管理不允许添加节点
                            //核销款台或部门下不可以新建节点
                            'hidden' : this.activeTap === 'economic'
                            || (data.data && data.data.nodeType === 'department')
                        },
                        style : {
                            paddingRight : '5px',
                        },
                        on : {
                            click : (e) => {
                                e.stopPropagation();
                                this.currentNode = data;
                                this.addModalShow = true;
                            }
                        }
                    })
                ]);
            },
            /**
             * 选择切换tap
             * @param tap
             */
            switchTap (tap) {
                this.activeTap = tap;
                this.keyWord = '';
                this.$emit('update:activeNode',{});
                this.$emit('switch-tap',tap);
            },
            /**
             * 打开填写新增公司的信息的模态框
             * @param data
             */
            addCompanyShow (data) {
                this.addNodeDetail = data;
                this.addCompanyModalShow = true;
            },
            /**
             * 重新获取组织结构数据
             */
            getStructureData () {
                this.$emit('fresh-org',this.activeNode);
            },
            /**
             * 打开填写新增景区的信息的模态框
             * @param data
             */
            addScene (data) {
                this.addNodeDetail = data;
                this.addSceneModalShow = true;
            },
            /**
             * 打开填写新增款台的信息的模态框
             * @param data
             */
            addCashier (data) {
                this.addNodeDetail = data;
                this.addCashierModalShow = true;
            },
            /**
             * 新增部门
             * @param data
             */
            addDepartment (data) {
                ajax.post('addOrgInfo',{
                    rootId : this.rootId,
                    orgName : data.nodeName,
                    nodeType : 'department',
                    parentManageId : this.currentNode.id,
                    parentEconomicId : this.currentNode.id,
                    status : data.status
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success('新增成功');
                        this.getStructureData();
                    } else {
                        this.$Message.error('新增失败');
                    }
                });
            },
            /**
             * 删除节点
             * @param data
             */
            delNode (data) {
                ajax.post('deleteNode',{
                    id : data.id
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success('删除成功');
                        this.switchTap(this.activeTap);
                    } else {
                        if (res.message && res.message === '需要删除的节点中包含了其他节点的财务上级') {
                            this.confirmModalShow = true;
                        } else if (res.message && res.message === '需要删除的节点中包含收付款未结清或仍有储值记录的节点') {
                            this.$refs.noticeModal.show({
                                title : this.$t('hint'),
                                showCancel : false
                            });
                        } else {
                            this.$Message.error('删除失败');
                        }
                    }
                });
            },
            /**
             * 过滤节点方法
             * @param value
             * @param data
             * @returns {boolean}
             */
            filterNode (value, data) {
                if (!value) return true;
                return data && data.name && data.name.indexOf(value) !== -1;
            }
        },
        computed : {
            //公司树数据
            companyData () {
                if (Object.keys(this.treeData).length > 0) {
                    return this.treeData;
                } else {
                    return [];
                }
            },
            //根节点id
            rootId () {
                if (this.treeData && this.treeData.length > 0) {
                    return this.treeData[0].id;
                } else {
                    return '';
                }
            },
            //默认展开的节点
            defaultExpandedKeys () {
                if (this.activeNode) {
                    return [this.activeNode.id];
                } else {
                    return [];
                }
            }
        },
        watch : {
            //监视查询关键字，如果改变就进行查找
            keyWord (newVal,oldVal) {
                this.$nextTick( () => {
                    if (this.$refs.tree) {
                        this.$refs.tree.filter(newVal);
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .structure-tree {
        @include block_outline();
        padding: 0 20px;

        .head {
            @include block_outline($height: 68px);
            border-bottom: 1px solid $color_E1E1E1;
            padding: 23px 0 20px 0;

            .tree-title {
                float: left;
                @include block_outline($width: 50%, $height: 25px);
                font-size: $font_size_16px;
                color: $color_666;
                text-align: center;
                cursor: pointer;

                &.active {
                    color: $color_blue;

                    .iconfont::before {
                        color: $color_blue;
                    }
                }

                &:nth-of-type(1) {
                    border-right: 1px solid $color_E1E1E1;
                }

                .iconfont {
                    color: $color_666;
                    font-size: $font_size_14px;
                    /*margin-right: 10px;*/
                }
            }
        }

        .search-input {
            @include block_outline($height: 78px);
            padding-top: 20px;

            /deep/ .ivu-input {
                height: 32px;
            }
        }

        .tree-plugin {
            position: relative;
            @include block_outline($height: unquote('calc(100% - 166px)'));
            @include padding_place();
            overflow-x: hidden;

            /deep/ .ivu-tree-arrow {
                width: 20px;
                display: inline-block;
                font-size: $font_size_16px;
                color: $color_A8ACB4;
                position: relative;
                z-index: 5;
                vertical-align: middle;
                padding-left: 7px;
            }

            /deep/ .el-tree-node__content{
                height: 36px;
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
                    background: $color_fafa;

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
                    margin-top: 12px;
                    cursor: pointer;

                    &:nth-last-of-type(2) {
                        /*margin-left: 9px;*/
                    }
                }
            }
        }

        .red-bale{
            padding: 0 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width : 100%;
            color:#ed3f14;
        }
    }

    .pro-list{
        max-width: 320px;
        position: relative;

        .detail{
            line-height: 25px;

            &.partner-list{
                color: $color_err;
            }
        }

        .hint{
            content : '';
            @include absolute_pos(absolute,$top : 2px,$left : -20px);

            .ivu-icon-information-circled{
                font-size: $font_size_17px;
                color: $color_err;
            }
        }
    }
</style>
