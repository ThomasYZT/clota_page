<!--组织架构树-->

<template>
    <div class="structure-tree">
        <ul class="head">
            <li class="tree-title"
                :class="{'active' : activeTap === 'manage'}"
                @click="switchTap('manage')">
                <span class="iconfont icon-finance"></span>
                经营管理
            </li>
            <li class="tree-title"
                :class="{'active' : activeTap === 'economic'}"
                @click="switchTap('economic')">
                <span class="iconfont icon-manage"></span>
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
                     :props="defaultProps   "
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
        <edit-modal ref="delModalTip">
            <div style="padding: 0 20px">{{$t('S007')}}</div>
        </edit-modal>
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
                     @fresh-structure-data="getStructureData"
                     @input="clearDetail">
        </add-company>
        <!--新增景区模态框-->
        <add-scene v-model="addSceneModalShow"
                   :root-id="rootId"
                   :chosed-node-detail="currentNode"
                   :added-node-detail="addNodeDetail"
                   @fresh-structure-data="getStructureData"
                   @input="clearDetail">
        </add-scene>
        <!--新增核销/销售款台模态框-->
        <add-cashier v-model="addCashierModalShow"
                     :chosed-node-detail="currentNode"
                     :added-node-detail="addNodeDetail"
                     @fresh-structure-data="getStructureData"
                     @input="clearDetail">
        </add-cashier>
    </div>
</template>

<script>
    import delModal from '@/components/delModal/index.vue';
    import editModal from '@/components/editModal/index.vue';
    import addModal from './child/addNode';
    import addCompany from './child/addCompany';
    import addScene from './child/addScene';
    import addCashier from './child/addCashier';
    import ajax from '@/api/index.js';
    import noData from '@/components/noDataTip/noData-tip';

    export default {
        props: {
            //组织结构数据
            'tree-data': {
                type: Object,
                default() {
                    return {};
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
                    return  {};
                }
            }
        },
        components: {
            delModal,
            addModal,
            addCompany,
            addScene,
            addCashier,
            noData,
            editModal
        },
        data() {
            return {
                //搜索关键字
                keyWord: '',
                //当前激活菜单
                activeTap: 'manage',
                //添加节点模态框是否显示
                addModalShow: false,
                //当前操作的节点
                currentNode: {},
                //是否显示添加公司的模态框
                addCompanyModalShow: false,
                //是否显示添加景区的模态框
                addSceneModalShow: false,
                //是否显示添加款台的模态框
                addCashierModalShow: false,
                //新增的节点信息
                addNodeDetail: {},
                defaultProps: {
                    children: 'subNodes'
                },
            }
        },
        methods: {
            /**
             * 组织树render函数
             */
            renderContent(h, {root, node, data}) {
                if(data.id === this.activeNode.id){
                    this.$emit('update:activeNode',Object.assign(this.activeNode,{
                        level : node.level,
                    }));
                }
                // data.expand = true;
                return h('div', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    },
                    class: {
                        'title-wrap': true,
                        'active-node' : data.id === this.activeNode.id
                    },
                    on : {
                        click : () => {
                            this.$emit('update:activeNode',{
                                id : data.id,
                                level : node.level,
                                type : data.nodeType
                            });
                            // this.activeNode = data;
                            this.$emit('input',data.nodeType);
                        }
                    }
                }, [
                    h('span', {
                        class: {
                            'title-class': true
                        },
                        directives: [
                            {
                                name: 'w-title',
                                // value: data.orgName,
                                value: {
                                    position : 'top',
                                    msg: data.orgName,
                                },
                            }
                        ],
                    }, data.orgName),
                    h('span', {
                        class: {
                            iconfont: 'true',
                            'icon-delete': true,
                            //财务管理不允许删除节点
                            'hidden' : this.activeTap === 'economic' || node.level === 1
                        },
                        style : {
                            paddingRight : '5px',
                            color : '#EB6751',
                            fontSize : '14px',
                            marginTop : '10px'
                        },
                        on: {
                            click: (e) => {
                                e.stopPropagation();
                                this.currentNode = data;
                                this.$refs.delModal.show({
                                    title : `删除${data.orgName}`,
                                    confirmCallback : () => {
                                        this.delNode(data);
                                    }
                                });
                            }
                        }
                    }),
                    h('span', {
                        class: {
                            iconfont: 'true',
                            'icon-node-add': true,
                            //财务管理不允许添加节点
                            //核销款台或部门下不可以新建节点
                            'hidden' : this.activeTap === 'economic'
                            || (data.nodeType === 'department') || data.nodeType === 'table'
                        },
                        style : {
                            paddingRight : '5px',
                            fontSize : '16px'
                        },
                        on: {
                            click: (e) => {
                                e.stopPropagation();
                                this.currentNode = data;
                                this.addModalShow = true;
                            }
                        }
                    })
                ])
            },
            /**
             * 选择切换tap
             * @param tap
             */
            switchTap(tap) {
                this.activeTap = tap;
                this.keyWord = '';
                this.$emit('update:activeNode',{});
                this.$emit('switch-tap',tap);
            },
            /**
             * 打开填写新增公司的信息的模态框
             * @param data
             */
            addCompanyShow(data) {
                this.addNodeDetail = data;
                this.addCompanyModalShow = true;
            },
            /**
             * 重新获取组织结构数据
             */
            getStructureData() {
                this.$emit('fresh-org',this.activeNode);
            },
            /**
             * 打开填写新增景区的信息的模态框
             * @param data
             */
            addScene(data) {
                this.addNodeDetail = data;
                this.addSceneModalShow = true;
            },
            /**
             * 打开填写新增款台的信息的模态框
             * @param data
             */
            addCashier(data) {
                this.addNodeDetail = data;
                this.addCashierModalShow = true;
            },
            /**
             * 新增部门
             * @param data
             */
            addDepartment(data) {
                ajax.post('addOrgInfo',{
                    // rootId : this.rootId,
                    orgName : data.nodeName,
                    nodeType : 'department',
                    parentManageId : this.currentNode.id,
                    parentEconomicId : this.currentNode.id,
                }).then(res => {
                    if(res.success){
                        this.$Message.success('新增成功');
                        this.getStructureData();
                    }else{
                        this.$Message.error('新增失败');
                    }
                });
            },
            /**
             * 删除节点
             * @param data
             */
            delNode (data) {
                ajax.post('deleteOrg',{
                    orgId : data.id
                }).then(res => {
                    if(res.success){
                        this.$Message.success('删除成功');
                        this.$emit('switch-tap',this.activeTap);
                    }else{
                        if(res.code === 'S007'){
                            this.$refs.delModalTip.show({
                                title : '提示',
                            });
                        }else{
                            this.$Message.error('删除失败');
                        }
                    }
                })
            },
            /**
             * 过滤节点方法
             * @param value
             * @param data
             * @returns {boolean}
             */
            filterNode(value, data) {
                if (!value) return true;
                return data && data.orgName && data.orgName.indexOf(value) !== -1;
            },
            /**
             * 清空当前选择的节点
             * @param data
             */
            clearDetail (data){
                if(data === false){
                    this.currentNode = {};
                }
            }
        },
        computed : {
            //公司树数据
            companyData (){
                if(Object.keys(this.treeData).length > 0){
                    return [this.treeData];
                }else{
                    return [];
                }
            },
            //根节点id
            rootId (){
                if(this.treeData && this.treeData.length > 0){
                    return this.treeData[0].id;
                }else{
                    return '';
                }
            },
            //默认展开的节点
            defaultExpandedKeys () {
                if(this.activeNode){
                    return [this.activeNode.id];
                }else{
                    return []
                }
            }
        },
        watch : {
            //监视查询关键字，如果改变就进行查找
            keyWord (newVal,oldVal) {
                this.$refs.tree.filter(newVal);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .structure-tree {
        @include block_outline();
        padding: 0 20px;

        /deep/ .loader{
            background: red;
        }

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

                    .iconfont {
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
            @include block_outline($height: 70px);
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

            /deep/ .el-tree-node__content > .el-tree-node__expand-icon{
                position: relative;
                z-index: 9;
            }

            /deep/ .el-tree-node__content{
                height: 36px;
                background: $color_fff;

                &:hover{
                    background: $color_fff!important;
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
                    background: $color_fafa;

                    .title-class {
                        color: $color_blue;
                    }
                }

                .title-class {
                    @include overflow_tip(unquote('calc(100% - 45px)'), 36px);
                    display: inline-block;
                    padding: 7px 0;
                    line-height: 22px;
                    font-size: 16px;
                    color: #333333;
                    vertical-align: middle;
                    float: left;
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

        .red-bale{
            padding: 0 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width : 100%;
            color:#ed3f14;
        }
    }
</style>
