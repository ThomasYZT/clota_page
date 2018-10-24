<!--财务权限设置-->

<template>
    <div class="finace-role-set">
        <div class="node-list">
            <div class="node-info">
                <el-tree :data="companyData"
                         node-key="id"
                         ref="nodeTree"
                         check-strictly
                         show-checkbox
                         :default-expand-all="true"
                         :props="defaultProps"
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
    export default {
        props : {
            //默认选中的节点
            'default-chosed-node-init' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //默认手动选择的权限
            //修改的员工数据包含的手动选择权限
            'extra-privalige' : {
                type : Array,
                default () {
                    return [];
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
                //菜单权限配置
                menuDefaultProps : {
                    children: 'subNode',
                    label : 'org'
                },
                //节点数据
                treeData: {},
                //菜单权限列表
                menuList : [],
                // 当前激活的节点id
                activeNodeId : '',
                //当前选择的组织节点
                chosedOrgList : [],
                //左侧选择的组织节点和右侧菜单权限对应表
                privaligeInfo : {},
                //手动选取的其它菜单权限
                handlerChosedMenu : {},
                //选择的菜单权限节点
                choosedNodes : []
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
                //如果当前节点是在选择角色下的节点，那么是默认选中，且不可取消
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
                let roleMenus = this.defaultChosedDisabledPrivaliges[this.activeNodeId] ? this.defaultChosedDisabledPrivaliges[this.activeNodeId] : [];
                //如果左侧节点没有勾选，那么右侧节点下的菜单权限不可勾选
                //角色下的菜单权限不可修改状态
                if(!this.chosedOrgList.includes(this.activeNodeId) || (roleMenus.includes(data['privCode']))){
                    this.$set(data,'disabled',true);
                }else{
                    this.$set(data,'disabled',false);
                }
                //如果当前选择的节点有被其它节点关联，那么当前节点不可以取消选择
                for(let i = 0,j = this.choosedNodes.length;i < j;i++){
                    if(this.choosedNodes[i]['linkedPrivCode'] === data['privCode']){
                        this.$set(data,'disabled',true);
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
                this.$emit('set-org-name',{
                    type : 'finance',
                    data : data.orgName
                });
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
             * 节点权限变化，菜单权限也跟着变化
             * @param data
             * @param checkedKeys
             */
            treeCheck (data,{checkedNodes,checkedKeys}) {
                //如果节点取消选择，那么右侧的菜单权限也要全部取消选择
                if(!checkedKeys.includes(data.id)){
                    this.privaligeInfo[data.id] = [];
                    if(this.activeNodeId === data['id']){
                        this.$nextTick(() => {
                            this.$refs.menuTree.setCheckedNodes([]);
                        });
                    }
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
                this.choosedNodes = JSON.parse(JSON.stringify(checkedNodes));
                this.handlerChosedMenu[this.activeNodeId] = [];
                if(checkedKeys.includes(data.privCode)){
                    //如果当前权限有其它关联权限，那么必须要选择其它关联的权限
                    if(data.linkedPrivCode && !checkedKeys.includes(data.linkedPrivCode)){
                        this.$refs.menuTree.setChecked(data.linkedPrivCode,true);
                    }
                }
                this.$nextTick(() => {
                    let havedChosedNodes =this.$refs.menuTree.getCheckedNodes();
                    this.privaligeInfo[this.activeNodeId] = [...havedChosedNodes.map(item => {
                        //将不是默认选中的权限保存为手动选择的额外权限
                        if(!this.defaultChosedDisabledPrivaliges[this.activeNodeId] ||
                            !this.defaultChosedDisabledPrivaliges[this.activeNodeId].includes(item.privCode)){
                            this.handlerChosedMenu[this.activeNodeId].push({
                                ...item,
                                choseStatus : ''
                            });
                        }
                        return {
                            ...item,
                            choseStatus : ''
                        }
                    }),...halfCheckedNodes.map(item => {
                        if(!item.disabled){
                            //将不是默认选中的权限保存为手动选择的额外权限
                            if(!this.defaultChosedDisabledPrivaliges[this.activeNodeId] ||
                                !this.defaultChosedDisabledPrivaliges[this.activeNodeId].includes(item.privCode)){
                                this.handlerChosedMenu[this.activeNodeId].push({
                                    ...item,
                                    choseStatus : 'half'
                                });
                            }
                        }
                        return {
                            ...item,
                            choseStatus : 'half'
                        }
                    })];
                });
                // this.privaligeInfo[this.activeNodeId] = [...checkedNodes.map(item => {
                //     //将不是默认选中的权限保存为手动选择的额外权限
                //     if(!this.defaultChosedDisabledPrivaliges[this.activeNodeId] ||
                //         !this.defaultChosedDisabledPrivaliges[this.activeNodeId].includes(item.privCode)){
                //         this.handlerChosedMenu[this.activeNodeId].push(item);
                //     }
                //     return {
                //         ...item,
                //         choseStatus : '',
                //     }
                // }),...halfCheckedNodes.map(item => {
                //     return {
                //         ...item,
                //         choseStatus : 'half'
                //     }
                // })];
            },
            /**
             * 设置右侧默认选中的菜单节点
             */
            setDefaultMenuChosed () {
                //将角色下的菜单权限和手动选择的菜单权限全部默认选中
                let chosedNode = this.privaligeInfo[this.activeNodeId] ? this.privaligeInfo[this.activeNodeId].filter(item => item.choseStatus !== 'half') : [];
                let handlerChoseNode = this.handlerChosedMenu[this.activeNodeId] ? this.handlerChosedMenu[this.activeNodeId] : [];
                this.choosedNodes = JSON.parse(JSON.stringify(chosedNode.concat(handlerChoseNode)));
                this.$nextTick(() => {
                    this.$refs.menuTree.setCheckedNodes(chosedNode.concat(handlerChoseNode));
                });
            },
            /**
             * 节点的复选框选择状态改变
             * @param data
             * @param select
             */
            checkChange (data,select) {
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
            },
            /**
             * 获取手动选择的菜单权限
             */
            getHandlerChosedMenu () {
                let result = [];
                for(let item in this.handlerChosedMenu){
                    for(let i = 0,j = this.handlerChosedMenu[item].length;i < j;i++){
                        result.push({
                            privOrg : item,
                            privCode : this.handlerChosedMenu[item][i].privCode,
                            privType : this.handlerChosedMenu[item][i].privType,
                            path : this.handlerChosedMenu[item][i].path,
                            ranges : this.handlerChosedMenu[item][i].ranges,
                            orgType : 'economic',
                            linkedPrivCode : this.handlerChosedMenu[item][i].linkedPrivCode,
                            choseStatus : this.handlerChosedMenu[item][i].choseStatus,
                        });
                    }
                }
                return result;
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
            //角色节点下的所有菜单权限不可手动勾选和取消勾选
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
                        for(let item in this.handlerChosedMenu){
                            data.push(item);
                        }
                        if(Object.keys(newVal).length > Object.keys(oldVal).length){
                            for(let i = 0,j = this.chosedOrgList.length;i < j;i++){
                                if(!(this.chosedOrgList[i] in newVal)){
                                    data.push(this.chosedOrgList[i]);
                                }
                            }
                        }else{
                            for(let i = 0,j = this.chosedOrgList.length;i < j;i++){
                                if(!(this.chosedOrgList[i] in oldVal)){
                                    data.push(this.chosedOrgList[i]);
                                }
                            }
                        }
                        this.privaligeInfo = JSON.parse(JSON.stringify(newVal));
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
                        if(disChecked.length > 0){
                            this.$nextTick(() => {
                                this.$refs.nodeTree.setCheckedKeys(disChecked);
                                this.setDefaultMenuChosed();
                            });
                        }
                    }
                },
                deep : true
            },
            //如果有默认的手动选择权限，那么需要勾选上
            extraPrivalige :{
                handler (newVal,oldVal) {
                    if(newVal){
                        for(let i = 0,j = newVal.length;i < j;i++){
                            if(newVal[i]['orgType'] === 'economic'){
                                if(this.handlerChosedMenu[newVal[i]['privOrg']]){
                                    this.handlerChosedMenu[newVal[i]['privOrg']].push({
                                        path : newVal[i]['path'],
                                        privCode : newVal[i]['privCode'],
                                        privType : newVal[i]['privType'],
                                        ranges :newVal[i]['ranges'],
                                        linkedPrivCode :newVal[i]['linkedPrivCode'],
                                    });
                                }else{
                                    this.handlerChosedMenu[newVal[i]['privOrg']] = [{
                                        path : newVal[i]['path'],
                                        privCode : newVal[i]['privCode'],
                                        privType : newVal[i]['privType'],
                                        ranges :newVal[i]['ranges'],
                                        linkedPrivCode :newVal[i]['linkedPrivCode'],
                                    }];
                                }
                            }
                        }
                        this.$nextTick(() => {
                            let keys = [];
                            for(let item in this.handlerChosedMenu){
                                keys.push(item);
                            }
                            if(keys.length > 0){
                                this.$refs.nodeTree.setCheckedKeys(keys);
                            }
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
    .finace-role-set{
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
                @include overflow_tip(unquote('calc(100% - 2px)'), 36px);
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
