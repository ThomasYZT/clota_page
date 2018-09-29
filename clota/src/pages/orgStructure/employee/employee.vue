<template>
    <!-- 新增员工页面 -->
    <div class="partner">

        <div class="filter-box">
            <Button type="primary" icon="md-add" style="float: left;margin-right: 10px" @click="getNewPartner('add')"
                    size="default"><span class="add-icon">+ {{$t('新增员工')}}</span>
            </Button>
            <Input class="input-field"
                   v-model.trim="filterParam.keyword"
                   icon="ios-search"
                   :placeholder="$t('请输入任意信息进行查询')"
                   @on-enter="handleSearch"
                   @on-click="handleSearch" />
        </div>

        <div>
            <!--<el-table
                :data="tableData"
                :border="true"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="员工ID">
                    <template slot-scope="scope">
                        <div class="cellText">309287482</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="登录名">
                    <template slot-scope="scope">
                        <div>adminclota01</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="姓名">
                    <template slot-scope="scope">
                        <div>张贝贝</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="企业/景区名称">
                    <template slot-scope="scope">
                        <div>银科环企有限公司</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="部门名称">
                    <template slot-scope="scope">
                        <div>销售部门</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="角色权限">
                    <template slot-scope="scope">
                        <div>长隆欢乐园管理员、深圳…</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="电话">
                    <template slot-scope="scope">
                        <div>1722727378</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="operation">
                            <span>{{$t('modify')}}</span>
                            <span @click="deleteEmployeeBtn">{{$t('del')}}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </div>-->

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
                <!--依需求暂时去掉角色权限字段-->
                <!--<el-table-column
                    slot="column5"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <div class="role-privilege" v-w-title="scope.row.rolePrivilege">{{scope.row.rolePrivilege}}</div>
                    </template>
                </el-table-column>-->
                <el-table-column
                    slot="column6"
                    slot-scope="row"
                    fixed="right"
                    :label="row.title"
                    :width="130"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="modify-info" @click="getNewPartner('modify', scope.row)">{{$t('modify')}}</span>
                        <span class="divide-line"></span>
                        <span class="del-info" @click="deleteEmployee(scope.row)">{{$t('del')}}</span>
                    </template>
                </el-table-column>
            </table-com>
        </div>


        <delete-list ref="delListModal" @deletions="handleDeletions" :deleteName="deleteName" :name="name"></delete-list>
    </div>
</template>


<script>
    //删除列表弹窗
    import deleteList from '../model/deleteList.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import {employeeInfoHead} from '../../systemSetting/resetPassword/resetPwdConfig';
    import ajax from '@/api/index';

    export default {
        components: {
            tableCom,
            deleteList,
        },
        data() {
            return {
                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    keyword: '',
                },
                // 表格表头字段名
                columnData: employeeInfoHead.filter((item, i) => {
                    return item.field !== 'rolePrivilege';
                }),
                // 列表数据
                tableData: [],
                // 数据总条数
                totalCount: 0,

                deleteName: this.$t('删除员工'),  //删除内容名字
                name: '', //删除弹窗名字
                scopeRowData: {}, //当前被操作的行数据
            }
        },
        methods: {
            // 初始化加载获取员工列表数据
            queryList() {
                /*this.tableData = [
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
                this.totalCount = this.tableData.length;*/

                /**
                 *
                 */
                ajax.post('getEmployeeList', this.queryParams).then(res => {
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

            //新增/修改员工
            getNewPartner(type, scopeRow) {
                this.$router.replace({
                    name: 'addEmployee',
                    query: {type: type},
                    params: {employeeItem: scopeRow}
                })
            },
            //删除员工
            deleteEmployee(scopeRow) {
                this.scopeRowData = scopeRow;
                this.name = scopeRow.nickName;
                this.$refs.delListModal.show();
            },
            //确认删除
            handleDeletions() {
                ajax.post('deletedEmployee', {
                    accountIds: this.scopeRowData.id
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', {tip: this.$t('del')}));
                        this.handleSearch();
                    }
                });
            },

        },
        computed: {},
        created() {
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .partner {
        @include block_outline();
        background: $color_fff;
        border-radius: 4px;

        .filter-box {
            padding: 15px 30px 15px;
            overflow: hidden;
            .input-field {
                width: 350px;
                float: right;
            }
        }

        .role-privilege {
            @include overflow_tip();
        }

        .modify-info {
            color: $color_blue;
            cursor: pointer;
        }

        .del-info {
            color: $color_red;
            cursor: pointer;
        }

        .divide-line {
            display: inline-block;
            width: 1px;
            height: 14px;
            margin: 0 5px;
            margin-bottom: -2px;
            background: #E1E1E1;
        }
    }
</style>
