<template>
    <!--  我的订单 -->
    <div class="channel">
        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="$t('myOrder')"><!--我的订单-->
        </bread-crumb-head>

        <div class="filter-box">
            <Input v-model.trim="filterParam.keyWord"
                   class="input-field"
                   :placeholder="$t('inputOrderSearch')"
                   :style="{width : lang === 'zh-CN' ? '240px' : '400px'}"/><!--请输入产品名称、交易号-->
            <Button type="primary" :disabled="!filterParam.keyWord" @click="handleSearch">{{$t("query")}}</Button>
            <Button type="ghost" :disabled="!filterParam.keyWord" @click="reset">{{$t("reset")}}</Button>
        </div>
        <div class="selectionTable">

            <table-com
                :ofsetHeight="170"
                :show-pagination="true"
                :column-data="columnData"
                :table-data="tableData"
                :total-count="totalCount"
                :page-no-d.sync="queryParams.pageNo"
                :page-size-d.sync="queryParams.pageSize"
                :border="true"
                @query-data="queryList">

                <el-table-column
                    slot="column3"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">{{scope.row.amount | moneyFilter}}</template>
                </el-table-column>

                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="[{'org': scope.row.status=='refund'}]">{{ $t(orderStatus(scope.row.status)) }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    slot="column7"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    fixed="right"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="operate-btn blue" @click="goOderDetail(scope.row)">{{$t('details')}}</span><!--详情-->
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>


<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import ajax from '@/api/index';
    import {orderListHead, orderStatus} from '../infoListConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import map from 'lodash/map';
    import {mapGetters} from 'vuex';

    export default {
        components: {
            breadCrumbHead,
            tableCom
        },
        data() {
            return {
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'memberInfo',   // 会员信息
                        router: {name: 'memberInfo'},
                    },
                    {
                        name: 'memberDetail',   // 会员详情
                        router: {name: 'infoDetail'},
                    },
                ],

                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    keyWord: '',
                },
                // 表格表头字段名
                columnData: orderListHead,
                // 列表数据
                tableData: [],
                // 数据总条数
                totalCount: 0,
            }
        },
        methods: {
            // 初始化加载获取员工列表数据
            queryList() {

                ajax.post('queryMemberOrder', this.queryParams).then(res => {
                    if (res.success) {
                        if (res.data && res.data.data) {
                            this.tableData = res.data.data;
                            this.totalCount = res.data.totalRow;
                        } else {
                            this.tableData = [];
                            this.totalCount = 0;
                        }
                    }
                });
            },

            // 搜索员工
            handleSearch() {
                this.queryParams.pageNo = 1;
                Object.assign(this.queryParams, this.filterParam);
                this.queryList();
            },

            //重置查询数据
            reset () {
                this.filterParam.keyWord = "";
                this.handleSearch();
            },

            //路由跳转订单详情页面
            goOderDetail(scopeRow) {
                this.$router.push({
                    name: 'orderDetail',
                    query: {orderId: scopeRow.id}
                });
            },

            // 订单状态显示
            orderStatus: orderStatus,

        },
        computed: {
            ...mapGetters({
                lang : 'lang'
            })
        },
        created() {
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .channel {
        @include block_outline();
        background: $color_fff;
        border-radius: 4px 4px 0 0;

        .filter-box {
            padding: 15px 30px 15px;
            overflow: hidden;
            .input-field {
                float: left;
                margin-right: 20px;
            }

            /deep/ .ivu-btn-ghost {
                margin-left: 5px;
            }
        }

        .operate-btn {
            cursor: pointer;
        }

        .blue {
            color: $color_blue;
        }
        .org {
            color: $color_yellow;
        }

    }
</style>
