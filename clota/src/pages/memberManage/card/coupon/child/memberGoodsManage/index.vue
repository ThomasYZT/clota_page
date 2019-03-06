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
                       :placeholder="$t('inputField', {field: $t('name') + ' / ' + $t('loginName')})"
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
                            <li @click="delete(scope.row)">{{$t('del')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import tableCom from '@/components/tableCom/tableCom';
    import { memberGoodsManageHead } from './memberGoodsManageConfig';
    export default {
        components : {
            breadCrumbHead,
            tableCom
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

            },
            /**
             * 列表查询
             */
            queryList () {

            },
            /**
             * 删除商品
             * @param rowData 商品数据
             */
            delete (rowData) {

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
