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
                                v-model="componentName"
                                @switch-tap="switchTap">
                </structure-tree>
            </div>
            <!--组织架构不同的节点对应不同的组件-->
            <component :is="componentSelect">
            </component>
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
                structureData: [
                    // {
                    //     title: '公司',
                    //     type : 'company',
                    //     children: [
                    //         {
                    //             title: '长隆旅游集团',
                    //             type : 'company',
                    //             children: [
                    //                 {
                    //                     title: '部门',
                    //                     type : 'department'
                    //                 },
                    //                 {
                    //                     title: '核销款台',
                    //                     type : 'cashier'
                    //                 },
                    //                 {
                    //                     title: '景区',
                    //                     type : 'scene'
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // }
                ],
                //详情路由
                componentName : '',
                //节点id
                nodeId : '',
                //当前激活tap
                activeTap : 'manage'
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
                console.log(params)
            },
            /**
             * 获取组织树
             */
            getCompanyTree () {
                ajax.post('getCompanyTree',{
                    id : this.nodeId,
                    type : this.activeTap
                }).then(res => {
                    if(res.status === 200){
                        this.structureData = res.data ? res.data : [];
                    }else{
                        this.structureData = [];
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
            }
        },
        computed : {
            /**
             * 右侧引入的组件
             */
            componentSelect () {
                if(this.componentName === 'company') {
                    return 'companyDetail'
                }else if(this.componentName === 'department'){
                    return 'departmentDetail'
                }else if(this.componentName === 'cashier'){
                    return 'cashierDetail';
                }else if(this.componentName === 'scene'){
                    return 'sceneDetail';
                }else{
                    return  '';
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
