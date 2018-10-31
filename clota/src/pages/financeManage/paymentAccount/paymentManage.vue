<!--
内容：付款账户管理
作者：djc
日期：
-->

<template>
    <div class="payment-manage">
        <div class="filter-box">
            <Input class="input-field"
                   v-model.trim="queryParams.keyword"
                   icon="ios-search"
                   :placeholder="$t('inputAnywordForSearch')"
                   @on-enter="handleSearch"
                   @on-click="handleSearch" />
        </div>
        <table-com
            :ofsetHeight="120"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            @query-data="queryList">
            <el-table-column
                slot="column0"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="status-account normal" v-if="scope.row.whetherAlarm === 'true'">{{$t('normal')}}</span>
                    <span class="status-account warning" v-else>{{$t('warning')}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.availableBalance | moneyFilter}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column4"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.accountBalance | moneyFilter}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column5"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.creditBalance | moneyFilter}}
                </template>
            </el-table-column>

            <el-table-column
                slot="column6"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="operate"
                          @click="handleRecharge(scope.row)">{{$t('topUp')}}
                    </span>
                </template>
            </el-table-column>
        </table-com>

        <!--撤回充值申请 - 弹窗-->
        <recharge-modal ref="rechargeModal"
                        @update-list="queryList"></recharge-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import rechargeModal from './components/rechargeModal.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import {paymentHead} from '../financeManageConfig';
    import ajax from '@/api/index'

    export default {
        components: {tableCom, rechargeModal},
        props: {},
        data() {
            return {
                // 获取数据的请求参数
                queryParams: {
                    keyword: '',
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    name: '',
                },
                // 表格表头字段名
                columnData: paymentHead,
                // 列表数据
                tableData: [],
                // 数据总条数
                totalCount: 0,
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            /**
             * 查询付款账户列表
             **/
            queryList() {
                ajax.post('queryPayAccounts', this.queryParams).then((res) => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },

            // 搜索信息
            handleSearch() {
                this.queryParams.pageNo = 1;
                this.queryList();
            },
            /**
             * 显示充值弹窗，并传入当前被操作的行数据
             * @param scopeRow - 行数据
             */
            handleRecharge(scopeRow) {
                this.$refs.rechargeModal.show({item: scopeRow});
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/base";

    .payment-manage {

        .status-account {
            position: relative;
            padding-left: 14px;
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 6px;
                height: 6px;
                border-radius: 50px;
            }
        }
        .normal:after {
            background: $color_green;
        }
        .warning:after {
            background: $color_red;
        }
    }

    .operate {
        color: $color_blue;
        cursor: pointer;
    }

    .filter-box {
        padding: 15px 30px 15px;
        overflow: hidden;
        .input-field {
            width: 350px;
            float: right;
        }
    }
</style>
