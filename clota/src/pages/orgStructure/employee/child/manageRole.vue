<!--景区经营权限设置-->

<template>
    <div class="manage-role-set">
        <div class="node-list">
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
                         @check-change="checkChange"
                         :render-content="renderContent">
                </el-tree>
                <no-data v-else>
                </no-data>
            </div>
        </div>
        <div class="menu-list">
            <div class="node-info">
                <el-tree :data="menuList"
                         node-key="privCode"
                         ref="menuTree"
                         show-checkbox
                         :default-expand-all="true"
                         :props="menuDefaultProps"
                         :default-expanded-keys="menuDefaultChosed"
                         :expand-on-click-node="false"
                         v-show="menuList.length > 0"
                         :render-content="menuRenderContent"
                         @check="menuCheckChange">
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
    import defaultsDeep from 'lodash/defaultsDeep';
    export default {
        props : {
            // //默认选中的节点
            // 'default-chosed-node-init' : {
            //     type : Object,
            //     default () {
            //         return {};
            //     }
            // },
            'rolePrivaliges' : {
                type : Object ,
                default () {
                    return {}   ;
                }
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
                //菜单默认选中的项
                menuDefaultChosed : [],
                // 当前激活的nodeid
                activeNodeId : '',
                //当前选择的组织节点
                chosedOrgList : [],
                //当前左侧选择的组织节点和右侧菜单权限对应
                privaligeInfo : {},
                //默认选中的菜单
                defaultChosedMenu : {}
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
                if(data.id in this.defaultChosedNodeInit){
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
                let test = this.defaultChosedDisabledPrivaliges[this.activeNodeId] ? this.defaultChosedDisabledPrivaliges[this.activeNodeId] : [];
                // console.log(test,data['privCode'],test.includes(data['privCode']));
                if(!this.chosedOrgList.includes(this.activeNodeId) || (test.includes(data['privCode']))){
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
                    },
                }, [
                    h('span', {
                        class: {
                            'title-class': true
                        },
                        directives: [
                            {
                                name: 'w-title',
                                value: this.$t(data.privCode)
                            }
                        ],
                    }, this.$t(data.privCode))
                ])
            },
            /**
             * 获取经营管理树
             */
            getOrgTree () {
                ajax.post('getOrgTree',{
                    manageType : 'manage',
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
                    this.$nextTick(() => {
                        this.$refs.menuTree.setCheckedNodes([]);
                    });
                }
            },
            /**
             * 组织机构选择的对应的菜单权限改变
             * @param data
             * @param checkedKeys
             * @param checkedNodes
             * @param halfCheckedNodes
             */
            menuCheckChange (data,{checkedKeys,checkedNodes,halfCheckedNodes}){
                this.privaligeInfo[this.activeNodeId] = [...checkedNodes.map(item => {
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
            },
            /**
             * 设置右侧默认选中的菜单节点
             */
            setDefaultMenuChosed () {
                if(this.activeNodeId in this.privaligeInfo){
                    let chosedNode = this.privaligeInfo[this.activeNodeId] ? this.privaligeInfo[this.activeNodeId].filter(item => item.choseStatus !== 'half') : [];
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
             * 获取选择的经营权限
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
                            orgType : 'manage',
                            choseStatus : this.privaligeInfo[item][i].choseStatus
                        });
                    }
                }
                return returnValige;
            },
            checkChange (data,select) {
                console.log(data);
                if(select){
                    this.chosedOrgList.push(data['id']);
                }else{
                    for(let i = 0,j = this.chosedOrgList.length;i < j;i++){
                        if(this.chosedOrgList[i] === data['id']){
                            this.chosedOrgList.splice(i,1);
                            break;
                        }
                    }
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
            //默认选中的不可选择的菜单权限
            defaultChosedDisabledPrivaliges () {
                let result = {};
                for(let orgId in this.defaultChosedNodeInit){
                    let orgInfo = this.defaultChosedNodeInit[orgId];
                    for(let i = 0,j = orgInfo.length;i < j;i++){
                        if(!result[orgId]){
                            result[orgId] = [];
                        }
                        result[orgId].push(orgInfo[i]['privCode']);
                    }
                }
                return result;
            },
            defaultChosedNodeInit () {
                let result = {};
                for(let item in this.rolePrivaliges){
                    for(let i = 0,j = this.rolePrivaliges[item].length;i < j;i++){
                        let data = this.rolePrivaliges[item];
                        if(data[i].orgType === 'manage'){
                            if(!result[data[i].privOrg]){
                                result[data[i].privOrg] = [{
                                    path : data[i].path,
                                    privCode : data[i].privCode,
                                    privType : data[i].privType,
                                    ranges : data[i].ranges,
                                    choseStatus : data[i].choseStatus,
                                    defaultChosed : true
                                }];
                            }else{
                                result[data[i].privOrg].push({
                                    path : data[i].path,
                                    privCode : data[i].privCode,
                                    privType : data[i].privType,
                                    ranges : data[i].ranges,
                                    choseStatus : data[i].choseStatus,
                                    defaultChosed : true
                                });
                            }
                        }
                    }
                }
                return result;
            }
        },
        created () {
            this.getOrgTree();
        },
        watch : {
            //设置默认选中的节点
            defaultChosedNodeInit :{
                handler (newVal,oldVal) {
                    if(newVal && Object.keys(newVal).length > 0){
                        let data = [];
                        for(let item in this.defaultChosedNodeInit){
                            data.push(item);
                        }
                        if(Object.keys(newVal).length > Object.keys(oldVal).length){
                            for(let i = 0,j = this.chosedOrgList.length;i < j;i++){
                                if(!(this.chosedOrgList[i] in newVal)){
                                    data.push(this.chosedOrgList[i]);
                                }
                            }
                            defaultsDeep(this.privaligeInfo,newVal);
                        }else{
                            for(let i = 0,j = this.chosedOrgList.length;i < j;i++){
                                if(!(this.chosedOrgList[i] in oldVal)){
                                    data.push(this.chosedOrgList[i]);
                                }
                                if(this.chosedOrgList[i] in oldVal && !(this.chosedOrgList[i] in newVal)){
                                    delete this.privaligeInfo[this.chosedOrgList[i]];
                                }
                            }
                        }
                        this.$nextTick(() => {
                            this.$refs.nodeTree.setCheckedKeys(data);
                            this.setDefaultMenuChosed();
                        });
                    }else{
                        let disChecked = [];
                        for(let i = 0,j = this.chosedOrgList.length;i < j;i++){
                            if(!(this.chosedOrgList[i] in oldVal)){
                                disChecked.push(this.chosedOrgList[i]);
                            }else{
                                delete this.privaligeInfo[this.chosedOrgList[i]];
                            }
                        }
                        this.$nextTick(() => {
                            this.$refs.nodeTree.setCheckedKeys(disChecked);
                            this.setDefaultMenuChosed();
                        });
                    }
                },
                deep : true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .manage-role-set{
        @include block_outline($height : unquote('calc(100% - 37px)'));
        border-bottom: 1px solid $color_E1E1E1;
        border-top: 1px solid $color_E1E1E1;

        .node-list{
            position: relative;
            @include block_outline(380px,100%);
            float: left;
            border-right: 1px dashed #E1E1E1;

        }

        .node-info{
            height: 100%;
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
            @include block_outline(unquote('calc(100% - 380px)'),100%);
            float: left;
        }
    }
</style>
