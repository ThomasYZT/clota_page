<!--服务提供商详情-->

<template>
    <div class="isp-internet-detail">
        <bread-crumb-head
            :locale-router="$t('lesseeDetail')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="less-company-detail">
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
                           :activeNode="activeNode"
                           @fresh-org="freshOrgInfo">
                </component>
            </transition>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import structureTree from '../organization/structureHead';
    import companyDetail from './ISPinternetDetailChild/companyDetail';
    import departmentDetail from './ISPinternetDetailChild/departmentDetail';
    import cashierDetail from './ISPinternetDetailChild/cashierDetail';
    import sceneDetail from './ISPinternetDetailChild/sceneDetail';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/api/index.js';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            structureTree,
            companyDetail,
            departmentDetail,
            cashierDetail,
            sceneDetail
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('ISPinternet'),
                        router: {
                            name: 'ISPinternet'
                        }
                    }
                ],
                //组织结构数据
                structureData: {},
                //详情路由
                componentName : 'company',
                //节点id
                nodeId : '',
                //当前激活tap
                activeTap : 'manage',
                //当前激活的节点
                activeNode : {}
            }
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params.id){
                    this.nodeId = params.id;
                    this.getCompanyTree();
                }else{
                    this.$router.push({
                        name : 'ISPinternet'
                    });
                }
            },
            /**
             * 获取组织树
             */
            getCompanyTree () {
                let activeNode = JSON.parse(JSON.stringify(this.activeNode));
                this.activeNode = {};
                ajax.post('getCompanyTree',{
                    id : this.nodeId,
                    type : this.activeTap
                }).then(res => {
                    if(res.status === 200){
                        this.structureData = res.data ? res.data : {};
                        if(Object.keys(activeNode).length < 1){
                            this.activeNode = JSON.parse(JSON.stringify({
                                id : this.structureData.id,
                                pid : this.structureData.pid,
                                type : this.structureData.data ? this.structureData.data.nodeType : ''
                            }));
                        }else{
                            this.activeNode = activeNode;
                        }
                    }else{
                        this.structureData = {};
                        this.activeNode = {};
                    }
                })
            },
            /**
             * 切换tap列表
             * @param tapType
             */
            switchTap (tapType) {
                this.activeTap = tapType;
                this.getCompanyTree();
            },
            /**
             * 更新当前的组织树
             * @param activeNode 激活的节点信息
             */
            freshOrgInfo(activeNode) {
                this.activeNode = activeNode;
                this.getCompanyTree();
            }
        },
        computed : {
            /**
             * 右侧引入的组件
             */
            componentSelect () {
                if(this.activeNode.type === 'company') {
                    return 'companyDetail'
                }else if(this.activeNode.type === 'department'){
                    return 'departmentDetail'
                }else if(this.activeNode.type === 'cashier'){
                    return 'cashierDetail';
                }else if(this.activeNode.type === 'scenic'){
                    return 'sceneDetail';
                }else{
                    return  '';
                }
            },
            //组件动态设置key
            nodeKey () {
                if(this.activeNode){
                    return this.activeNode.id;
                }else{
                    return '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .isp-internet-detail {
        @include block_outline();

        .less-company-detail {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            overflow: auto;
            .structure {
                float: left;
                @include block_outline(400px);
                border-right: 1px solid $color_E1E1E1;
            }
        }
    }
</style>
