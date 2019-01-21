<!--
内容：收款账户管理
作者：djc
日期：
-->

<template>
    <div class="payment-manage">
        <div class="filter-box">
            <Input class="input-field"
                   v-model.trim="queryParams.keyword"
                   icon="ios-search"
                   :placeholder="$t('inputField', { field : $t('partnerName') })"
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
                    <span class="status-account warning" v-if="scope.row.whetherAlarm=='true'">{{$t('warning')}}</span>
                    <span class="status-account normal" v-else>{{$t('normal')}}</span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="canModifyAccount"
                slot="column6"
                fixed="right"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="operate"
                          @click="handleRecharge(scope.row)">{{$t('modify')}}
                    </span>
                </template>
            </el-table-column>
        </table-com>

        <!--撤回充值申请 - 弹窗-->
        <modify-limit-modal ref="modifyLimitModal"
                            @updata-list="queryList">
        </modify-limit-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import modifyLimitModal from './components/modifyLimitModal.vue';
    import { configVariable } from '@/assets/js/constVariable';
    import { paymentHead } from '../financeManageConfig';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        components : { tableCom, modifyLimitModal },
        props : {},
        data () {
            return {
                // 获取数据的请求参数
                queryParams : {
                    keyword : '',
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                },
                filterParam : {
                    name : '',
                },
                // 表格表头字段名
                columnData : paymentHead,
                // 列表数据
                tableData : [],
                // 数据总条数
                totalCount : 0,
            };
        },
        computed : {
            ...mapGetters([
                'permissionInfo'
            ]),
            //是否可以修改收款账户
            canModifyAccount () {
                return this.permissionInfo && this.permissionInfo['modifyReceivableAccount'] === 'allow';
            }
        },
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 查询收款账户列表
             **/
            queryList () {
                ajax.post('queryPartnerAccounts', this.queryParams).then((res) => {
                    if (res.data && res.data.data) {
                        this.tableData = res.data.data;
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },

            // 搜索信息
            handleSearch () {
                this.queryParams.pageNo = 1;
                this.queryList();
            },
            /**
             * 显示修改额度弹窗，并传入当前被操作的行数据
             * @param scopeRow - 行数据
             */
            handleRecharge (scopeRow) {
                if (!this.canModifyAccount) return;
                this.$refs.modifyLimitModal.show({ item : scopeRow });
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
