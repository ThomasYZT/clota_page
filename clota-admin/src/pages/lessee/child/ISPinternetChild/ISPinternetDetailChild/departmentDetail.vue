<!--部门详情-->

<template>
    <div class="department-deail">
        <div class="com-name">
          <span class="name"
                v-w-title="'广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团'">
            广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团
          </span>
            <span class="started">已启用</span>
            <span class="edit">修改</span>
        </div>
        <ul class="department-info">
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">部门ID：</span>
                    <span class="info-val">232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323</span>
                </div>
            </li>
        </ul>
        <table-com
            :table-data="tableData"
            :column-data="employeeColumn"
            title="员工账号"
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
                        :disabled="selectedEmployee.length < 1"
                        @click="deleteSelectEmployee">删除</Button>
            </div>
            <el-table-column
                slot="column5"
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
    import tableCom from '../../organization/tableCom';
    import {employee} from './departmentConfig';
    import delModal from '@/components/delModal/index.vue';
    import changePass from '@/components/editModal/index.vue';
    export default {
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
                employeeColumn : employee,
                //选中的鱼啊弄个
                selectedEmployee : [],
                //员工总数
                totalCount : 100
            }
        },
        methods: {
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
             * 确认删除员工
             * @param data
             */
            confirmDelete (data){
                console.log(data)
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
             * 选择的员工数据改变
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedEmployee = data;
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
             * 确认修改密码
             * @param pass
             * @param employee
             */
            confirmChangePass(pass,employee) {
                console.log(pass,employee)
            },
            /**
             * 获取员工信息
             * @param data
             */
            getEmployeeList (data) {
                console.log(data)
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .department-deail{
        @include block_outline($width: unquote('calc(100% - 400px)'));
        padding: 11px 35px;
        float: right;
        overflow: auto;

        .com-name {
            @include overflow_tip(100%, 56px);
            padding: 14px 0;

            .name {
                line-height: 28px;
                font-size: $font_size_20px;
                color: $color_000_085;
                vertical-align: middle;
                display: inline-block;
                @include overflow_tip($width: unquote('calc(100% - 127px)'), $height: 100%);
            }

            .started,
            .edit {
                @include block_outline(60px);
                display: inline-block;
                vertical-align: middle;
                line-height: 28px;
                font-size: $font_size_14px;
            }

            .started {
                padding-left: 10px;
                color: $color_22BB5F;
            }

            .edit {
                float: right;
                color: $color_blue;
                text-align: right;
            }
        }

        .department-info {
            @include block_outline($height: auto);
            padding-bottom: 21px;
            border-bottom: 1px dashed $color_E1E1E1;

            .list {
                @include block_outline($height: 30px);
                padding: 4px 0;
                line-height: 22px;

                .info-list1 {
                    @include block_outline(100%, auto);
                }

                .info-list1{
                    display: flex;
                    flex-direction: row;
                    float: left;
                    font-size: $font_size_14px;

                    .info-key {
                        @include block_outline(auto, 100%);
                        color: $color_333;
                    }

                    .info-val {
                        flex: 1;
                        @include overflow_tip(auto, auto);
                        color: $color_666;
                    }
                }
            }
        }
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
