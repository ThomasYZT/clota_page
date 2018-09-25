<!--会员卡可用范围设置-->

<template>
    <div class="card-scope-setting">
        <!--头部tab组件-->
        <header-tabs
            :router-name="routerName">
        </header-tabs>
        <div class="content">
            <div class="title">会员卡可用渠道选择</div>
            <table-com
                ref="tableCom"
                :column-data="columns"
                :table-data="tableData"
                :border="true"
                :page-no-d.sync="pageNo"
                :show-pagination="true"
                :page-size-d.sync="pageSize"
                :total-count="totalCount"
                :auto-height="true"
                :table-com-min-height="280"
                @query-data="queryList"
                @selection-change="channelChange">
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    :label="row.title"
                    type="selection"
                    :width="row.width"
                    :min-width="row.minWidth">
                </el-table-column>
            </table-com>
            <div class="title">会员卡可用景区选择</div>
            <el-tree :data="companyData"
                     node-key="id"
                     ref="tree"
                     :default-expand-all="true"
                     show-checkbox
                     :check-strictly="true"
                     :props="defaultProps"
                     :default-expanded-keys="defaultExpandedKeys"
                     :expand-on-click-node="false"
                     v-if="companyData.length > 0"
                     :render-content="renderContent">
            </el-tree>
        </div>
        <div class="btn-area">
            <Button type="primary" @click="saveSetting">{{$t("save")}}</Button>
            <Button type="ghost" @click="resetFieldFunc">{{$t("cancel")}}</Button>
        </div>
    </div>
</template>

<script>
    import headerTabs from './components/headerTabs.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {cardScopeHead} from './cardScopeConfig';
    import ajax from '@/api/index.js';
    export default {
        components : {
            headerTabs,
            tableCom
        },
        data() {
            return {
                //当前页面路由名称
                routerName: 'cardScopeSetting',
                //表头配置
                columns : cardScopeHead,
                //表格数据
                tableData : [],
                pageNo : 1,
                pageSize : 10,
                //总条数
                totalCount : 0,
                //组织树配置
                defaultProps: {
                    children: 'subNodes'
                },
                //组织树数据
                treeData : {},
                //默认选中的节点
                defaultExpandedKeys : [],
                //当前选择的自营渠道列表
                channelSelected : []
            }
        },
        methods: {
            /**
             * 查询会员卡可用渠道范围
             */
            queryList () {
                ajax.post('querySelfOwnedChannel',{
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                }).finally(() => {
                    this.getOrgTree();
                });
            },
            /**
             * 获取组织树列表
             */
            getOrgTree () {
                ajax.post('getRootOrgTree',{
                    showScene : 'manage',
                    manageType : 'manage',
                }).then(res =>{
                   if(res.success){
                       this.treeData = res.data ? res.data : {};
                   }else{
                       this.treeData = {};
                   }
                }).finally(() => {
                    this.findBasicSet();
                });
            },
            /**
             * 组织树render函数
             */
            renderContent(h, {root, node, data}) {
                if(data.nodeType === 'department' ||  data.nodeType === 'table' ||  data.nodeType === 'company'){
                    this.$set(data,'disabled',true);
                }
                return h('div', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    },
                    class: {
                        'title-wrap': true,
                    },
                    on : {
                        click : () => {
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
                        style : {
                            display : 'inline-block',
                            overflow : 'hidden',
                            textOverflow :'ellipsis',
                            whiteSpace : 'nowrap',
                            width : '93%'
                        }
                    }, data.orgName),
                ])
            },
            /**
             * 保存设置
             */
            saveSetting () {
                let companyIds = this.$refs.tree ? this.$refs.tree.getCheckedKeys() : [];
                ajax.post('basicSet',{
                    channelIds : this.channelSelected.map(item => item.id).join(','),
                    parkIds : companyIds.join(','),
                }).then(res => {
                   if(res.success){
                       this.$Message.success('保存成功');
                       this.findBasicSet();
                   } else{
                       this.$Message.error('保存失败');
                   }
                });
            },
            /**
             * 选中的自营渠道修改
             * @param data
             */
            channelChange (data) {
                this.channelSelected = data;
            },
            /**
             * 取消保存，重置状态
             */
            resetFieldFunc () {
                this.queryList();
            },
            /**
             * 获取会员卡可用范围设置
             */
            findBasicSet (){
                ajax.post('findBasicSet').then(res => {
                   if(res.success){
                       if(res.data){
                           if(res.data.channelIds){
                               let channelSelected = res.data.channelIds.split(',');
                               this.$nextTick(() => {
                                   for(let i = 0,j = this.tableData.length;i < j;i++){
                                       if(channelSelected.includes(this.tableData[i].id)){
                                           this.$refs.tableCom.toggleRowSelection(this.tableData[i],true);
                                       }
                                   }
                               });
                           }
                           if(res.data.parkIds){
                               this.$nextTick(() => {
                                   this.$refs.tree.setCheckedKeys(res.data.parkIds.split(','));
                               });
                           }
                       }
                   }else{
                       this.channelSelected = [];
                   }
                });
            }
        },
        created () {
            // this.findBasicSet();
        },
        computed : {
            //组织树数组格式数据
            companyData () {
                if(this.treeData && Object.keys(this.treeData).length > 0){
                    return this.treeData;
                }else{
                    return [];
                }
            }
        }
    }
</script>


<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .card-scope-setting{
        background: $color-fff;
        @include block_outline();

        .content{
            height: calc(100% - 126px);
            overflow: auto;
            padding: 25px 60px;

            .title{
                font-size: $font_size_16px;
                color: $color_333;
                line-height: 24px;
                margin-bottom: 15px;

                &:not(:nth-of-type(1)){
                    margin-top: 25px;
                }
            }

            /deep/ .table-com{
                width: 500px;
            }

            /deep/ .el-tree{
                width: 500px;
            }
        }

        .btn-area{
            @include block_outline($height : 56px);
            line-height: 56px;
            text-align: center;
            background: #FFFFFF;
            -webkit-box-shadow: 0 -5px 3px 0 rgba(0, 0, 0, 0.03);
            box-shadow: 0 -5px 3px 0 rgba(0, 0, 0, 0.03);

            /deep/ .ivu-btn{
                width: 108px;
                padding: 5px 30px;
            }
            .ivu-btn + .ivu-btn{
                margin-left: 20px;
            }
        }
    }
</style>
