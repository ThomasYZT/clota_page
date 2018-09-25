<!--员工信息-->

<template>
    <div class="employee-table">
        <div class="pick-up-title" >
            <span class="label">员工账号</span>
            <span class="back-up"
                  @click="isPackUp = !isPackUp">
            {{$t(isPackUp ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-arrow-down" :class="{'icon-reverse' : isPackUp}"></span>
          </span>
        </div>
        <transition name="fade">
            <div class="table-wrap" v-if="isPackUp">
                <div class="employee-account">
                    员工账号数：{{employeeNumber | contentFilter}}
                </div>
                <table-com
                    v-if="tableShow"
                    default-page-layout="total, prev, pager, next"
                    :column-data="employeeColumn"
                    :table-data="tableData"
                    :border="true"
                    :page-no-d.sync="pageNo"
                    :show-pagination="true"
                    :page-size-d.sync="pageSize"
                    :total-count="totalCount"
                    :auto-height="true"
                    :table-com-min-height="280"
                    @query-data="getEmployees">
                </table-com>
            </div>
        </transition>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {employee,depEmployee} from '../departmentConfig';
    import ajax from '@/api/index.js';
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
                    return {}
                }
            },
            //是否默认展开
            'isDefaultPackUp' : {
                type : Boolean,
                default : false
            },
            //是否是部门
            'is-department' : {
                type : Boolean,
                default : false
            }
        },
        components : {
            tableCom
        },
        data() {
            return {
                //表格数据
                tableData: [],
                //表头数据
                employeeColumn : this.type === 'department' ?  depEmployee : employee ,
                //员工总数
                totalCount : 0,
                pageNo : 1,
                pageSize : 10,
                //员工总数
                employeeNumber : '',
                //是否展开
                isPackUp : false
            }
        },
        methods: {
            /**
             * 获取部门下员工列表
             */
            getEmployees () {
                let params = {};
                if(this.isDepartment){
                    params = {
                        deptId : this.searchParams.id,
                        pageNo : this.pageNo,
                        pageSize : this.pageSize,
                    };
                }else{
                    params = {
                        orgId : this.searchParams.id,
                        pageNo : this.pageNo,
                        pageSize : this.pageSize,
                    };
                }
                ajax.post('getEmployeeList',params).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount  = this.employeeNumber = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.employeeNumber = '';
                        this.totalCount = 0;
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
                handler (newVal){
                    if(newVal === true){
                        this.isPackUp = true;
                    }else{
                        this.isPackUp = false;
                    }
                },
                immediate : true
            }
        }
    }
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
                vertical-align: middle;
                cursor: pointer;

                .icon-arrow-down{
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
    }
</style>
