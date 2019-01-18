1<template>
    <!-- 新增员工页面 -->
    <div class="partner">

        <div class="filter-box">
            <Button type="primary"
                    v-if="canAddEmployee"
                    style="float: left;margin-right: 10px"
                    icon="android-add"
                    @click="getNewPartner('add')"
                    size="default">{{$t('newEmployee')}}</span>
            </Button>
            <Input class="input-field"
                   v-model.trim="filterParam.keyword"
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
                v-if="canModifyEmployee || canDelEmployee"
                slot="column6"
                slot-scope="row"
                fixed="right"
                :label="row.title"
                :min-width="operateColumnWidth.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li  v-if="canModifyEmployee" @click="getNewPartner('modify', scope.row)">{{$t('modify')}}</li>
                        <li class="red-label"
                            v-if="canDelEmployee"
                            @click="deleteEmployee(scope.row)">{{$t('del')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>


        <delete-list ref="delListModal" @deletions="handleDeletions" :deleteName="deleteName" :name="name"></delete-list>
    </div>
</template>


<script>
    //删除列表弹窗
    import deleteList from '../model/deleteList.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { configVariable } from '@/assets/js/constVariable';
    import { employeeInfoHead } from '../../systemSetting/resetPassword/resetPwdConfig';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            tableCom,
            deleteList,
        },
        data () {
            return {
                // 获取数据的请求参数
                queryParams : {
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                },
                filterParam : {
                    keyword : '',
                },
                // 表格表头字段名
                columnData : employeeInfoHead.filter((item, i) => {
                    return item.field !== 'rolePrivilege';
                }),
                // 列表数据
                tableData : [],
                // 数据总条数
                totalCount : 0,

                deleteName : this.$t('delEmployee'), //删除内容名字
                name : '', //删除弹窗名字
                scopeRowData : {}, //当前被操作的行数据
            };
        },
        methods : {
            // 初始化加载获取员工列表数据
            queryList () {
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
            handleSearch () {
                this.queryParams.pageNo = 1;
                Object.assign(this.queryParams, this.filterParam);
                this.queryList();
            },

            //新增/修改员工
            getNewPartner (type, scopeRow) {
                this.$router.replace({
                    name : 'addEmployee',
                    query : { type : type },
                    params : { employeeItem : scopeRow }
                });
            },
            //删除员工
            deleteEmployee (scopeRow) {
                if (!this.canDelEmployee) return;
                this.scopeRowData = scopeRow;
                this.name = scopeRow.nickName;
                this.$refs.delListModal.show();
            },
            //确认删除
            handleDeletions () {
                if (!this.canDelEmployee) return;
                ajax.post('deletedEmployee', {
                    accountIds : this.scopeRowData.id
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('del') }));
                        this.handleSearch();
                    }
                });
            },

        },
        computed : {
            ...mapGetters({
                permissionInfo : 'permissionInfo',
                lang : 'lang',
            }),
            //是否有新增员工的权限
            canAddEmployee () {
                return this.permissionInfo && 'addEmployee' in this.permissionInfo;
            },
            //是否有删除员工的权限
            canDelEmployee () {
                return this.permissionInfo && 'deleteEmployee' in this.permissionInfo;
            },
            //是否有编辑员工的权限
            canModifyEmployee () {
                return this.permissionInfo && 'modifyEmployee' in this.permissionInfo;
            },
            //操作列宽度
            operateColumnWidth () {
                if (this.canDelEmployee && this.canModifyEmployee) {
                    return {
                        minWidth : this.lang === 'zh-CN' ? 120 : 150
                    };
                } else if (this.canDelEmployee || this.canModifyEmployee) {
                    return {
                        minWidth : this.lang === 'zh-CN' ? 80 : 100
                    };
                }
                return {
                    minWidth : 80
                };
            }
        },
        created () {
        },
    };
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
    }
</style>
