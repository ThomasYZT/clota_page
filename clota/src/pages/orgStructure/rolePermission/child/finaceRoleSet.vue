<!--财务权限设置-->

<template>
    <div class="finace-role-set">
        <div class="node-list">
            <div class="node-name">
                {{$t('financeAuthority')}}：
            </div>
            <div class="node-info">
                <el-tree :data="companyData"
                         node-key="id"
                         ref="nodeTree"
                         check-strictly
                         show-checkbox
                         :default-expand-all="true"
                         :props="defaultProps"
                         :default-expanded-keys="defaultExpandedKeys"
                         :expand-on-click-node="false"
                         v-if="companyData.length > 0"
                         @check="treeCheck"
                         :render-content="renderContent">
                </el-tree>
                <no-data v-else>
                </no-data>
            </div>
        </div>
        <div class="menu-list">
            <div class="node-name">
                {{$t('menuPermission')}}：
            </div>
            <div class="node-info">
                <el-tree :data="menuList"
                         node-key="privCode"
                         ref="menuTree"
                         show-checkbox
                         :default-expand-all="true"
                         :props="menuDefaultProps"
                         :expand-on-click-node="false"
                         v-show="menuList.length > 0"
                         :render-content="menuRenderContent"
                         @check="menuCheckChange"
                         @check-change="checkChange">
                </el-tree>
                <no-data v-show="menuList.length < 1">
                </no-data>
            </div>
        </div>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import debounce from 'lodash/debounce';
    export default {
        props : {
            //默认选中的节点
            'default-chosed-node-init' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //是否禁用组织树复选框选择
            'disabled' : {
                type : Boolean,
                default : false
            }
        },
        data() {
            return {
                //组织树配置
                defaultProps: {
                    children: 'subNodes',
                    label : 'orgName'
                },
                menuDefaultProps : {
                    children: 'subNode',
                    label : 'org'
                },
                //默认选择的节点
                defaultExpandedKeys : [],
                //节点数据
                treeData: {},
                //菜单权限列表
                menuList : [],
                // 当前激活的nodeid
                activeNodeId : '',
                //当前选择的组织节点
                chosedOrgList : [],
                //当前左侧选择的组织节点和右侧菜单权限对应
                privaligeInfo : {},
                //选择的菜单权限节点
                choosedNodes : [],
            }
        },
        components : {
            noData
        },
        methods: {
            /**
             * 组织树render函数
             */
            renderContent(h, {root, node, data}) {
                //没有新增或修改权限不可以编辑组织树
                if(this.disabled){
                    this.$set(data,'disabled',true);
                }else{
                    this.$set(data,'disabled',false);
                }
                return h('div', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    },
                    class: {
                        'title-wrap': true,
                        'active-node' : data.id === this.activeNodeId
                    },
                    on : {
                        click : () => {
                            this.getMenuPrivalige(data);
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
                                value: data.orgName
                            }
                        ],
                    }, data.orgName)
                ])
            },
            /**
             * 菜单组织树
             */
            menuRenderContent (h, {root, node, data}) {
                //没有选择节点不可选择菜单权限
                //没有新增或修改权限不可以编辑组织树
                if(!this.chosedOrgList.includes(this.activeNodeId) || this.disabled){
                    this.$set(data,'disabled',true);
                }else{
                    this.$set(data,'disabled',false);
                }
                //如果当前选择的节点有被其它节点关联，那么当前节点不可以取消选择
                for(let i = 0,j = this.choosedNodes.length;i < j;i++){
                    if(this.choosedNodes[i]['linkedPrivCode'] === data['privCode']){
                        this.$set(data,'disabled',true);
                        break;
                    } else {
                        this.$set(data,'disabled',false);
                    }
                }
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
                                value: this.$t('privalige.' + data.privCode)
                            }
                        ],
                    }, this.$t('privalige.' + data.privCode))
                ])
            },
            /**
             * 获取经营管理树
             */
            getOrgTree () {
                ajax.post('getOrgTree',{
                    manageType : 'economic',
                    showScene : 'privilege',
                }).then(res => {
                    if(res.success){
                        this.treeData = res.data ? res.data : {};
                        if(this.treeData && Object.keys(this.treeData).length > 0){
                            this.getMenuPrivalige(this.treeData);
                        }
                    }else{
                        this.treeData = {};
                    }
                })
            },
            /**
             * 获取机构的菜单权限
             * @param data
             */
            getMenuPrivalige (data) {
                this.activeNodeId = data.id;
                ajax.post('getAllPrivilege',{
                    orgId : data.id
                }).then(res => {
                    if(res.success){
                        this.menuList  = res.data ? res.data : [];
                    }else{
                        this.menuList  = [];
                    }
                }).finally(() => {
                    this.setDefaultMenuChosed();
                });
            },
            /**
             * 节点选择变化
             * @param data
             * @param checkedKeys
             */
            treeCheck (data,{checkedNodes,checkedKeys}) {
                if(!checkedKeys.includes(data.id)){
                    this.privaligeInfo[data.id] = [];
                    if(this.activeNodeId === data.id){
                        this.$nextTick(() => {
                            this.$refs.menuTree.setCheckedNodes([]);
                        });
                    }
                }
                this.chosedOrgList = checkedKeys;
            },
            /**
             * 组织机构选择的对应的菜单权限改变
             * @param data
             * @param checkedKeys
             * @param checkedNodes
             * @param halfCheckedNodes
             */
            menuCheckChange (data,{checkedKeys,checkedNodes,halfCheckedNodes}){
                this.choosedNodes = JSON.parse(JSON.stringify(checkedNodes.filter(item => !item.disabled)));
                // this.choosedNodes = JSON.parse(JSON.stringify(checkedNodes));
                if(checkedKeys.includes(data.privCode)){
                    //如果当前权限有其它关联权限，那么必须要选择其它关联的权限
                    if(data.linkedPrivCode && !checkedKeys.includes(data.linkedPrivCode)){
                        this.$refs.menuTree.setChecked(data.linkedPrivCode,true);
                    }
                } else {
                    this.$nextTick(() => {
                        this.$refs.menuTree.setChecked(data.privCode,false,true);
                    });
                }
                // this.$nextTick(() => {
                //     let havedChosedNodes =this.$refs.menuTree.getCheckedNodes();
                //     this.privaligeInfo[this.activeNodeId] = [...havedChosedNodes.map(item => {
                //         return {
                //             ...item,
                //             choseStatus : ''
                //         }
                //     }),...halfCheckedNodes.map(item => {
                //         return {
                //             ...item,
                //             choseStatus : 'half'
                //         }
                //     })];
                // });
            },
            /**
             * 设置右侧默认选中的菜单节点
             */
            setDefaultMenuChosed () {
                if(this.activeNodeId in this.privaligeInfo){
                    let chosedNode = this.privaligeInfo[this.activeNodeId] ? this.privaligeInfo[this.activeNodeId].filter(item => item.choseStatus !== 'half') : [];
                    // this.choosedNodes = JSON.parse(JSON.stringify(chosedNode));
                    this.$nextTick(() => {
                        this.$refs.menuTree.setCheckedNodes(chosedNode);
                    });
                }else{
                    this.$nextTick(() => {
                        this.$refs.menuTree.setCheckedNodes([]);
                    });
                }
            },
            /**
             * 获取选择的财务权限
             */
            getMangePrivalige () {
                let returnValige = [];
                for(let item in this.privaligeInfo){
                    for(let i = 0,j = this.privaligeInfo[item].length;i < j;i++){
                        returnValige.push({
                            privOrg : item,
                            privCode : this.privaligeInfo[item][i].privCode,
                            privType : this.privaligeInfo[item][i].privType,
                            path : this.privaligeInfo[item][i].path,
                            ranges : this.privaligeInfo[item][i].ranges,
                            orgType : 'economic',
                            choseStatus : this.privaligeInfo[item][i].choseStatus,
                            linkedPrivCode : this.privaligeInfo[item][i].linkedPrivCode,
                        });
                    }
                }
                return returnValige;
            },
            checkChange : debounce(function () {
                this.$nextTick(() => {
                    let havedChosedNodes = this.$refs.menuTree.getCheckedNodes();
                    let halfCheckedNodes = this.$refs.menuTree.getHalfCheckedNodes();
                    // console.log(havedChosedNodes)
                    this.choosedNodes = JSON.parse(JSON.stringify(havedChosedNodes.filter(item => !item.disabled)));
                    // this.choosedNodes = JSON.parse(JSON.stringify(havedChosedNodes));
                    this.privaligeInfo[this.activeNodeId] = [...havedChosedNodes.map(item => {
                        return {
                            ...item,
                            choseStatus : ''
                        }
                    }),...halfCheckedNodes.map(item => {
                        return {
                            ...item,
                            choseStatus : 'half'
                        }
                    })];
                });
            },100)
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
        },
        created () {
            this.getOrgTree();
        },
        watch : {
            //设置默认选中的节点
            defaultChosedNodeInit (newVal,oldVal) {
                if(newVal && Object.keys(newVal).length > 0){
                    this.privaligeInfo = newVal;
                    let data = [];
                    for(let item in this.defaultChosedNodeInit){
                        data.push(item);
                    }
                    this.chosedOrgList = data;
                    this.$nextTick(() => {
                        this.$refs.nodeTree.setCheckedKeys(data);
                    });
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .finace-role-set{
        @include block_outline($height : 310px);
        border-bottom: 1px solid $color_E1E1E1;
        border-top: 1px solid $color_E1E1E1;

        .node-name{
            @include block_outline($height : 45px);
            padding: 20px 0 7px 0;
            line-height: 20px;
            font-size: $font_size_14px;
            color: $color_333;
        }

        .node-list{
            position: relative;
            @include block_outline(50%,100%);
            float: left;
            border-right: 1px dashed #E1E1E1;

        }

        .node-info{
            @include block_outline($height : unquote('calc(100% - 45px)'));
            overflow: auto;
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

        /deep/ .el-tree-node__content{
            height: 37px;

            .el-tree-node__label{
                font-size: $font_size_16px;
                color: $color_333;
            }
        }

        .menu-list{
            position: relative;
            @include block_outline(50%,100%);
            float: left;
            padding-left: 30px;
        }
    }
</style>
