<!--产品类别设置-->

<template>
    <div class="product-type-setting">
        <!--头部tab组件-->
        <header-tabs
            :router-name="routerName">
        </header-tabs>
        <div class="content">
            <div class="btn-area">
                <Button type="primary" icon="ios-plus-empty" @click="addProductType">新增产品类别</Button>
            </div>
            <table-com
                :column-data="columnData"
                :table-data="tableData"
                :border="true"
                :page-no-d.sync="pageNo"
                :show-pagination="true"
                :page-size-d.sync="pageSize"
                :total-count="totalCount"
                :ofset-height="190"
                @query-data="queryList">
                <el-table-column
                    slot="column3"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <ul class="operate-list">
                            <li class="normal" @click="modify(scoped.row)">修改</li>
                            <li class="red-label" @click="delProductType(scoped.row)">删除</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <!--新增产品类别模态框-->
        <add-product-type-modal
            :product-data="currentData"
            v-model="addModalVisible"
            @input="currentData = {}"
            @fresh-data="queryList">
        </add-product-type-modal>
        <!--删除模态框-->
        <del-modal ref="delModal">
            <span class="content-text">您正在删除产品类别：<span class="yellow-label">{{currentData ? currentData.typeName : ''}}</span></span>
            <span><span style="color : #EB6751;">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>
    </div>
</template>

<script>
    import headerTabs from './components/headerTabs.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {productTypeSettingHead} from './productTypeSettingConfig';
    import ajax from '@/api/index.js';
    import addProductTypeModal from './components/addProductType';
    import delModal from '@/components/delModal/index.vue';
    export default {
        components : {
            headerTabs,
            tableCom,
            addProductTypeModal,
            delModal
        },
        data() {
            return {
                //当前页面路由名称
                routerName: 'productTypeSetting',
                //表头配置
                columnData :productTypeSettingHead,
                tableData : [
                ],
                pageNo : 1,
                pageSize : 10,
                totalCount : 0,
                //新增模态框是否显示
                addModalVisible : false,
                //当前操作的数据
                currentData : {}
            }
        },
        methods: {
            /**
             * 新增产品类别
             */
            addProductType () {
                this.addModalVisible = true;
                this.currentData = {};
            },
            /**
             * 修改产品类别
             * @param rowData
             */
            modify (rowData) {
                this.currentData = rowData;
                this.addModalVisible = true;
            },
            /**
             * 删除产品类别
             * @param rowData
             */
            delProductType (rowData) {
                this.currentData = rowData;
                this.$refs.delModal.show({
                    title : '删除产品类别',
                    confirmCallback : () => {
                        this.deleteProductType();
                    }
                })
            },
            /**
             * 查询所有哦产品列表
             */
            queryList () {
                ajax.post('queryProductType',{
                    pageNo : this.pageNo,
                    pageSize :this.pageSize
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 删除产品类别
             */
            deleteProductType () {
                ajax.post('deleteProductType',{
                    id : this.currentData.id
                }).then(res =>{
                    if(res.success){
                        this.$Message.success('删除成功');
                        this.queryList();
                    }else{
                        this.$Message.error('删除失败');
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .product-type-setting{
        background: $color-fff;
        @include block_outline();

        .content {
            height: calc(100% - 126px);
            overflow: auto;
            padding: 0 30px;

            .btn-area{
                @include block_outline($height : 60px);
                padding-top: 15px;

                /deep/ .ivu-btn{
                    margin-right: 5px;
                }
            }
        }
    }
</style>
