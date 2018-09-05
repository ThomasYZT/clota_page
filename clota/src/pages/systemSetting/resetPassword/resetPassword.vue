<!--
内容：重置全员密码
作者：djc
日期：
-->

<template>
    <div class="reset-employee-pwd">
        <div class="filter-box">
            <Input class="input-field"
                   v-model.trim="filterParam.name"
                   icon="ios-search"
                   :placeholder="$t('inputField', {field: '姓名 / 登录名'})"
                   @on-enter="handleSearch"
                   @on-click="handleSearch" />
        </div>
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
                slot="column5"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                        <div class="role-privilege" v-w-title="scope.row.rolePrivilege">{{scope.row.rolePrivilege}}</div>
                </template>
            </el-table-column>
            <el-table-column
                slot="column7"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                        <span class="reset" @click="handleReset(scope.row)">重置</span>
                </template>
            </el-table-column>
        </table-com>

        <!--重置密码弹窗-->
        <reset-pwd-modal ref="resetPwdModal"></reset-pwd-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import resetPwdModal from './components/resetPwdModal.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import {employeeInfoHead} from './resetPwdConfig';

    export default {
        components: {tableCom, resetPwdModal},
        props: {},
        data() {
            return {
                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    name: '',
                },
                // 表格表头字段名
                columnData: employeeInfoHead,
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
            queryList() {
                this.tableData = [
                    {
                        'employeeID': '309287482',
                        'loginName': 'adminclota01',
                        'name': '张贝贝',
                        'orgName': '银科环企有限公司',
                        'department': '销售部',
                        'rolePrivilege': '长隆欢乐园管理员、深圳xxxxxxxxxxxxx',
                        'phone': '18900003333'
                    },
                    {
                        'employeeID': '309287482',
                        'loginName': 'adminclota02',
                        'name': '张闪闪',
                        'orgName': '银科环企有限公司',
                        'department': '研发部',
                        'rolePrivilege': '长隆欢乐园管理员、深圳xxxxxxxxxxxxx',
                        'phone': '18900003333'
                    },
                ];
                this.totalCount = this.tableData.length;
            },

            // 搜索会员
            handleSearch() {
                this.queryParams.pageNo = 1;
                Object.assign(this.queryParams, this.filterParam);
                this.queryList();
            },
            handleReset(scopeRow) {
                this.$refs.resetPwdModal.show({item: scopeRow});
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .reset-employee-pwd {

        .role-privilege {
            @include overflow_tip();
        }
        .reset {
            color: $color_blue;
            cursor: pointer;
        }
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
