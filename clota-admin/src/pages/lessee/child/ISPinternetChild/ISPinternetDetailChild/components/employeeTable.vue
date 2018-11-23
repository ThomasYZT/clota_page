<!--员工信息-->

<template>
    <div class="employee-table">
        <div class="pick-up-title" >
            <span class="label">员工账号</span>
            <span class="back-up"
                  @click="isPackUp = !isPackUp">
            {{$t(isPackUp ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-pull-down" :class="{'icon-reverse' : isPackUp}"></span>
          </span>
        </div>
        <transition name="fade">
            <div class="table-wrap" v-if="isPackUp">
                <div class="employee-account">
                    员工账号数：{{totalCount | contentFilter}}
                    <Button type="primary"
                            :disabled="selectedEmployee.length < 1"
                            @click="resetPassSelectEmployee">重置密码</Button>
                    <Button type="error"
                            class="ivu-btn-90px"
                            :disabled="selectedEmployee.length < 1"
                            @click="deleteSelectEmployee">删除</Button>
                </div>
                <table-com
                    v-if="tableShow"
                    :column-data="employeeColumn"
                    :table-data="tableData"
                    :border="true"
                    :page-no-d.sync="pageNo"
                    :show-pagination="true"
                    :page-size-d.sync="pageSize"
                    :total-count="totalCount"
                    :auto-height="true"
                    :table-com-min-height="280"
                    @query-data="getEmployees"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        slot="columncheck"
                        type="selection"
                        slot-scope="row"
                        :label="row.title"
                        fixed="left"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                    </el-table-column>
                    <el-table-column
                        slot="columnoperate"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        show-overflow-tooltip
                        fixed="right"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            <ul class="operate-info">
                                <li class="red-label" @click="delElement(scoped.row)">删除</li>
                                <li class="normal" @click="resetPass(scoped.row)">重置密码</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </transition>
        <!--删除员工-->
        <del-modal ref="delModal">
        </del-modal>
        <change-pass ref="changePass">
        </change-pass>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { employee,depEmployee } from '../departmentConfig';
    import delModal from '@/components/delModal/index.vue';
    import changePass from '@/components/editModal/index.vue';
    import ajax from '@/api/index.js';
    import MD5 from 'crypto-js/md5';
    export default {
        props : {
            //当前查看员工数据的结构类型，分为部门和非部门，默认为非部门
            'type' : {
                type : String,
                default : 'noDepartment'
            },
            //表格查询参数
            'search-params' : {
                typee : Object,
                default () {
                    return {};
                }
            },
            //是否默认展开
            'isDefaultPackUp' : {
                type : Boolean,
                default : false
            }
        },
        components : {
            tableCom,
            delModal,
            changePass
        },
        data () {
            return {
                //表格数据
                tableData : [],
                //表头数据
                employeeColumn : this.type === 'department' ? depEmployee : employee ,
                //选中的员工
                selectedEmployee : [],
                //员工总数
                totalCount : 0,
                pageNo : 1,
                pageSize : 10,
                //是否展开
                isPackUp : false
            };
        },
        methods : {
            /**
             * 选择的员工数据改变
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedEmployee = data;
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
                let ids = [];
                let employees = [];
                this.selectedEmployee.forEach(item => {
                    ids.push(item.id);
                    employees.push(item.nickName);
                });
                this.$refs.delModal.show({
                    msg : `确认删除员工${employees.join('、')}?`,
                    title : '删除员工',
                    confirmCallback : () => {
                        this.confirmDelete(ids);
                    }
                });
            },
            /**
             * 删除员工
             * @param data
             */
            delElement (data) {
                this.$refs.delModal.show({
                    msg : `确认删除员工${data.nickName}?`,
                    title : '删除员工',
                    confirmCallback : () => {
                        this.confirmDelete([data.id]);
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
             * @param ids
             */
            confirmDelete (ids) {
                ajax.post('deleteEmployees',{
                    ids : ids
                }).then(res => {
                   if (res.status === 200) {
                       this.$Message.success('删除成功');
                       this.getEmployees();
                   } else {
                       this.$Message.error('删除失败');
                   }
                });
            },
            /**
             * 确认修改密码
             * @param pass
             * @param employee
             */
            confirmChangePass (pass,employee) {
                ajax.post('updatePassword',{
                    ids : employee.map(item => item.id),
                    // password : MD5(pass).toString()
                    password : pass
                }).then(res => {
                   if (res.status === 200) {
                       this.$Message.success('重置密码成功');
                       this.getEmployees();
                   } else {
                       this.$Message.error('重置密码失败');
                   }
                }).finally(() => {
                    this.$refs.changePass.hide();
                });
            },
            /**
             * 获取部门下员工列表
             */
            getEmployees () {
                ajax.post('getEmployees',{
                    id : this.searchParams.id,
                    page : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if (res.status === 200) {
                        this.tableData = res.data ? res.data.list : [];
                        this.totalCount = res.data ? Number(res.data.totalRecord) : '';
                    } else {
                        this.tableData = [];
                        this.totalCount = '';
                    }
                });
            }
        },
        computed : {
            //表格是否显示
            tableShow () {
                return this.searchParams && this.searchParams.id;
            }
        },
        watch : {
            //默认展开的初始值
            isDefaultPackUp : {
                handler (newVal) {
                    if (newVal === true) {
                        this.isPackUp = true;
                    } else {
                        this.isPackUp = false;
                    }
                },
                immediate : true
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .employee-table{

        .pick-up-title{
            @include block_outline($height: 59px);
            padding: 25px 0 10px 0;

            .label {
                display: inline-block;
                font-size: $font_size_16px;
                color: $color_333;
                line-height: 24px;
                vertical-align: middle;
            }

            .back-up {
                font-size: $font_size_14px;
                color: $color_blue;
                display: inline-block;
                margin-left: 10px;
                margin-top: 2px;
                vertical-align: middle;
                cursor: pointer;

                .icon-pull-down{
                    display: inline-block;
                    transition: all 0.5s;

                    &::before{
                        color: $color_blue;
                        font-size: 12px;
                    }

                    &.icon-reverse{
                        transform: rotate(180deg);
                        transition: all 0.5s;
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
