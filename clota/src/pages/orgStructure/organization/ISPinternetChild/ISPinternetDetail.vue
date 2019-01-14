<!--服务提供商详情-->

<template>
    <div class="isp-internet-detail">
        <!--<div class="less-company-detail">-->
        <!--</div>-->
        <div class="structure">
            <!--组织结构图-->
            <structure-tree :tree-data="structureData"
                            :activeNode.sync="activeNode"
                            v-model="componentName"
                            @switch-tap="switchTap"
                            @fresh-org="freshOrgInfo">
            </structure-tree>
        </div>
        <!--组织架构不同的节点对应不同的组件-->
        <transition name="fade">
            <component :is="componentSelect"
                       :key="nodeKey"
                       :activeTap="activeTap"
                       :activeNode="activeNode"
                       @fresh-org="freshOrgInfo">
            </component>
        </transition>
    </div>
</template>

<script>
    import structureTree from '../organization/structureHead';
    import companyDetail from './ISPinternetDetailChild/companyDetail';
    import departmentDetail from './ISPinternetDetailChild/departmentDetail';
    import cashierDetail from './ISPinternetDetailChild/cashierDetail';
    import sceneDetail from './ISPinternetDetailChild/sceneDetail';
    import partnerDetail from './ISPinternetDetailChild/partnerDetail';
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            structureTree,
            companyDetail,
            departmentDetail,
            cashierDetail,
            sceneDetail,
            partnerDetail
        },
        data () {
            return {
                //组织结构数据
                structureData : {},
                //详情路由
                componentName : 'company',
                //节点id
                nodeId : '',
                //当前激活tap
                activeTap : 'manage',
                //当前激活的节点
                activeNode : {}
            };
        },
        methods : {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                // if(params.id){
                //     this.nodeId = params.id;
                //     if(params.activeNode){
                //         this.activeNode = params.activeNode;
                //     }
                //     this.getCompanyTree();
                // }else{
                //     this.$router.push({
                //         name : 'ISPinternet'
                //     });
                // }
            },
            /**
             * 获取组织树
             */
            getCompanyTree () {
                let activeNode = JSON.parse(JSON.stringify(this.activeNode));
                this.activeNode = {};
                ajax.post('getOrgTree',{
                    manageType : this.activeTap,
                    showScene : this.activeTap === 'manage' ? 'manage' : 'privilege',
                }).then(res => {
                    if (res.success) {
                        this.structureData = res.data ? res.data : {};
                        if (Object.keys(activeNode).length < 1) {
                            this.activeNode = JSON.parse(JSON.stringify({
                                id : this.structureData.id,
                                level : this.structureData.level,
                                type : this.structureData.nodeType
                            }));
                        } else {
                            this.activeNode = activeNode;
                        }
                    } else {
                        this.structureData = {};
                        this.activeNode = {};
                    }
                });
            },
            /**
             * 切换tap列表
             * @param tapType
             */
            switchTap (tapType) {
                this.activeTap = tapType;
                this.getTreeData();
            },
            /**
             * 更新当前的组织树
             * @param activeNode 激活的节点信息
             */
            freshOrgInfo (activeNode) {
                this.activeNode = activeNode;
                this.getTreeData();
            },
            /**
             * 获取合作伙伴组织树
             */
            getPartnerTreeData () {
                let activeNode = JSON.parse(JSON.stringify(this.activeNode));
                this.activeNode = {};
                ajax.post('getWholeOrgTree',{
                    manageType : this.activeTap,
                }).then(res => {
                    if (res.success) {
                        this.structureData = res.data ? res.data : {};
                        if (Object.keys(activeNode).length < 1) {
                            this.activeNode = JSON.parse(JSON.stringify({
                                id : this.structureData.id,
                                level : this.structureData.level,
                                type : this.structureData.nodeType
                            }));
                        } else {
                            this.activeNode = activeNode;
                        }
                    } else {
                        this.structureData = {};
                        this.activeNode = {};
                    }
                });
            },
            /**
             * 获取组织树信息
             */
            getTreeData () {
                if (this.manageOrgs.nodeType === 'partner') {
                    this.getPartnerTreeData();
                } else {
                    this.getCompanyTree();
                }
            }
        },
        computed : {
            /**
             * 右侧引入的组件
             */
            componentSelect () {
                if (this.activeNode.type === 'company') {
                    return 'companyDetail';
                } else if (this.activeNode.type === 'department') {
                    return 'departmentDetail';
                } else if (this.activeNode.type === 'table') {
                    return 'cashierDetail';
                } else if (this.activeNode.type === 'scenic') {
                    return 'sceneDetail';
                } else if (this.activeNode.type === 'partner') {
                    return 'partnerDetail';
                } else {
                    return '';
                }
            },
            //组件动态设置key
            nodeKey () {
                if (this.activeNode) {
                    return this.activeNode.id;
                } else {
                    return '';
                }
            },
            ...mapGetters([
                'manageOrgs'
            ])
        },
        created () {
            this.getTreeData();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .isp-internet-detail {
        @include block_outline();
        background: $color_fff;
        border-radius: 4px;

        .structure {
            float: left;
            @include block_outline(400px);
            border-right: 1px solid $color_E1E1E1;
        }
    }
</style>
