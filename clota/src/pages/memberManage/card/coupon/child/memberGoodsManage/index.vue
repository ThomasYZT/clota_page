<!--
    会员模块--优惠卷--商品管理
    作者：杨泽涛
-->
<template>
    <div class="member-goods-manage">
        <breadCrumbHead :locale-router="'memberGoodsManage'"
                        :before-router-list="beforeRouterList"></breadCrumbHead>
        <div class="head-toolbox">
            <div class="left-tool">
                <Button class="ivu-btn-108px" type="primary" @click="addGood">+ {{$t('addGood')}}</Button>
            </div>
            <div class="right-tool">
                <Input class="input-field"
                       v-model.trim="filterParam.keyword"
                       icon="ios-search"
                       :placeholder="$t('inputAnywordForSearch')"
                       @on-enter="queryList"
                       @on-click="queryList" />
            </div>
        </div>

        <div class="table-wrapper">
            <table-com :column-data="columnData"
                       :table-data="tableData"
                       :border="true"
                       :show-pagination="true"
                       :total-count="totalCount"
                       :ofset-height="170"
                       :page-no-d.sync="filterParam.pageNo"
                       :page-size-d.sync="filterParam.pageSize"
                       @query-data="queryList">
                <el-table-column
                    slot="column2"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <!-- 删除 -->
                            <li class="red-label" @click="del(scope.row)">{{$t('del')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>

        <!-- 新增商品模态框 -->
        <addGoodModal ref="addGoodModal" @updateList="queryList"></addGoodModal>

        <!--删除模态框-->
        <delModal ref="delModal">
            <div :class="$style.delTips">
                <Icon :class="$style.icon" type="help-circled"></Icon>
                <span><span style="color : #EB6751;">{{$t('irreversible')}}</span>{{$t('sureToDel')}}</span>
            </div>
        </delModal>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import tableCom from '@/components/tableCom/tableCom';
    import delModal from '../../../../../../components/delModal/index';
    import addGoodModal from './components/addGoodModal';
    import { memberGoodsManageHead } from './memberGoodsManageConfig';
    import ajax from '@/api/index';
    export default {
        components : {
            breadCrumbHead,
            tableCom,
            addGoodModal,
            delModal
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'members-coupon',
                        router : {
                            name : 'coupon',
                        }
                    }
                ],
                //查询过滤参数
                filterParam : {
                    //关键字
                    keyword : '',
                    //页码
                    pageNo : 1,
                    //每页数量
                    pageSize : 10,
                },
                //表头数据
                columnData : memberGoodsManageHead,
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
            };
        },
        methods : {
            /**
             * 新增商品
             */
            addGood () {
                this.$refs.addGoodModal.show();
            },
            /**
             * 列表查询
             */
            queryList () {
                ajax.post('listProductList', {
                    ...this.filterParam
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 删除商品
             * @param rowData 商品数据
             */
            del (rowData) {
                this.$refs.delModal.show({
                    title : this.$t('del') + this.$t('goods'),
                    confirmCallback : () => {
                        this.confirmDelete(rowData);
                    }
                });
            },
            /**
             * 确认删除
             * @param rowData 商品数据
             */
            confirmDelete (rowData) {
                ajax.post('member-deleteProduct', {
                    id : rowData.id
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip' , { tip : this.$t('del') }));
                        this.queryList();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('del') }));
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-goods-manage {
        .head-toolbox {
            display: flex;
            height: 60px;
            line-height: 60px;
            .left-tool {
                flex: 1 0;
                padding: 0 20px;
            }
            .right-tool {
                flex: 1 0;
                padding: 0 30px;
                text-align: right;
            }

            .input-field {
                margin-right: 10px;
                width: 350px;

                /deep/ .ivu-input {
                    height: 30px;
                }
            }
        }
    }
</style>
<style module lang="scss">
    .delTips{
        position: absolute;
        padding: 0 76px 0 106px;
        color: #333333;
        font-size: 14px;
    }

    .icon{
        position: absolute;
        left: 88px;
        top : 2px;
        font-size: 15px;
        color: #EB6751;
    }

    .red-bale {
        color: #ED3F14;
    }

    .blue-txt {
        color: #2F70DF;
        margin-right: 5px;
    }
</style>
