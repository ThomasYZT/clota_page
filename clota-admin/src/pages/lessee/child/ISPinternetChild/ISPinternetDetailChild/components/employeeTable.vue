<!--员工信息-->

<template>
    <div class="employee-table">
        <table-com
            :table-data="tableData"
            :column-data="employeeColumn"
            title="员工账号"
            :is-pack-up="isPackUp"
            :show-page="true"
            :total="totalCount"
            @selection-change="handleSelectionChange"
            @get-new-data="getEmployeeList">
            <el-table-column
                slot="column0"
                type="selection"
                width="55">
            </el-table-column>
            <div class="employee-account" slot="table-title">
                员工账号数：2
                <Button type="primary"
                        :disabled="selectedEmployee.length < 1"
                        @click="resetPassSelectEmployee">重置密码</Button>
                <Button type="error"
                        class="ivu-btn-90px"
                        :disabled="selectedEmployee.length < 1"
                        @click="deleteSelectEmployee">删除</Button>
            </div>
            <el-table-column
                v-if="type === 'department'"
                slot="column6"
                :label="$t('operate')"
                width="145">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="delete" @click="delElement(scoped.row)">删除</li>
                        <li class="reset-pass " @click="resetPass(scoped.row)">重置密码</li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column
                v-else
                slot="column4"
                :label="$t('operate')"
                width="145">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="delete" @click="delElement(scoped.row)">删除</li>
                        <li class="reset-pass " @click="resetPass(scoped.row)">重置密码</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <del-modal ref="delModal">
        </del-modal>
        <change-pass ref="changePass">
        </change-pass>
    </div>
</template>

<script>
    import tableCom from '../../../organization/tableCom';
    import {employee,depEmployee} from '../departmentConfig';
    import delModal from '@/components/delModal/index.vue';
    import changePass from '@/components/editModal/index.vue';
    export default {
        props : {
            //是否展开默认值
            'is-pack-up': {
                type: Boolean,
                default: false
            },
            //当前查看员工数据的结构类型，分为部门和非部门，默认为非部门
            'type' : {
                type : String,
                default : 'noDepartment'
            }
        },
        components : {
            tableCom,
            delModal,
            changePass
        },
        data() {
            return {
                //表格数据
                tableData: [
                    {
                        aa: '2016-05-03',
                        realName: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        aa: '2016-05-03',
                        realName: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                //表头数据
                employeeColumn : this.type === 'department' ?  depEmployee : employee ,
                //选中的员工
                selectedEmployee : [],
                //员工总数
                totalCount : 100
            }
        },
        methods: {
            /**
             * 选择的员工数据改变
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedEmployee = data;
            },
            /**
             * 获取员工信息
             * @param data
             */
            getEmployeeList (data) {
                console.log(data)
            },
            /**
             * 批量重置密码
             */
            resetPassSelectEmployee () {
                this.$refs.changePass.show({
                    title : this.$t('changePass'),
                    confirmCallback : (pass) => {
                        this.confirmChangePass(pass,this.selectedEmployee);
                    }
                });
            },
            /**
             * 删除选中的员工
             */
            deleteSelectEmployee () {
                let employees = [];
                this.selectedEmployee.forEach(item => {
                    employees.push(item.realName);
                });
                this.$refs.delModal.show({
                    msg : `确认删除员工${employees.join('、')}?`,
                    title : '删除员工',
                    confirmCallback : () => {
                        this.confirmDelete(data);
                    }
                });
            },
            /**
             * 删除员工
             * @param data
             */
            delElement (data) {
                this.$refs.delModal.show({
                    msg : `确认删除员工${data.realName}?`,
                    title : '删除员工',
                    confirmCallback : () => {
                        this.confirmDelete(data);
                    }
                });
            },
            /**
             * 重置密码
             * @param data
             */
            resetPass (data) {
                this.$refs.changePass.show({
                    title : this.$t('changePass'),
                    confirmCallback : (pass) => {
                        this.confirmChangePass(pass,[data]);
                    }
                });
            },
            /**
             * 确认删除员工
             * @param data
             */
            confirmDelete (data){
                console.log(data)
            },
            /**
             * 确认修改密码
             * @param pass
             * @param employee
             */
            confirmChangePass(pass,employee) {
                console.log(pass,employee)
            },
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .employee-table{

        .employee-account {
            @include block_outline($height: 40px);
            line-height: 20px;
            padding-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_606266;

            .ivu-btn{
                float: right;
                margin-left: 10px;
            }
        }

        .operate-info{
            @include table_operate();

            .reset-pass{
                color: $color_blue;
            }

            .delete{
                color:$color_err
            }
        }
    }
</style>
