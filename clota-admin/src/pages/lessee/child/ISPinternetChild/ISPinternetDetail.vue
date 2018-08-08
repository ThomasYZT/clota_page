<!--服务提供商详情-->

<template>
    <div class="isp-internet-detail">
        <bread-crumb-head
            :locale-router="$t('lesseeDetail')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="less-company-detail">
            <div class="structure">
                <structure-tree :tree-data="structureData"
                                v-model="componentName">
                </structure-tree>
            </div>
            <component :is="componentSelect">
            </component>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import organization from '../organization/organization';
    import structureTree from '../organization/structureHead';
    import companyDetail from './ISPinternetDetailChild/companyDetail';
    import departmentDetail from './ISPinternetDetailChild/departmentDetail';
    import cashierDetail from './ISPinternetDetailChild/cashierDetail';
    import sceneDetail from './ISPinternetDetailChild/sceneDetail'

    export default {
        components: {
            breadCrumbHead,
            organization,
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
                    {
                        title: '公司',
                        type : 'company',
                        expand: true,
                        children: [
                            {
                                title: '长隆旅游集团',
                                expand: true,
                                type : 'company',
                                children: [
                                    {
                                        title: '部门',
                                        type : 'department'
                                    },
                                    {
                                        title: '核销款台',
                                        type : 'cashier'
                                    },
                                    {
                                        title: '景区',
                                        type : 'scene'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                //详情路由
                componentName : ''
            }
        },
        methods: {},
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
