<!--添加员工权限-->

<template>
    <div class="employee-privalige-set">
        <div class="btn-area">
            <Button type="primary" @click="addEmployee">增加员工</Button>
            <Button type="error"
                    @click="del(employeeChosed)"
                    :disabled="employeeChosed.length < 1">批量删除</Button>
        </div>
        <table-com
            :column-data="columns"
            :table-data="tableData"
            :border="true"
            :auto-height="true"
            :table-com-min-height="300"
            @query-data="queryList"
            @selection-change="selectedChange">
            <el-table-column
                slot="column0"
                slot-scope="row"
                :label="row.title"
                type="selection"
                :width="row.width"
                :min-width="row.minWidth">
            </el-table-column>
            <el-table-column
                slot="column4"
                slot-scope="row"
                :label="row.title"
                show-overflow-tooltip
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scoped">
                    <ul class="operate-list">
                        <li @click="del([scoped.row])">删除</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--新增员工弹窗-->
        <add-employee
            v-model="addVisible"
            @updateSelected="updateSelected">
        </add-employee>
        <del-modal ref="delModal">
            <div class="del-tips">
                <Icon type="help-circled"></Icon>
                <span class="red-bale">您将解除员工：<span style="color: #F7981C;">{{delEmployees.map(item => item.nickName).join(',')}}</span>等{{delEmployees.length}}位员工权限。<span style="color:#ed3f14 ;">本操作不可撤销，</span></span>
                <span>是否确认删除？</span>
            </div>
        </del-modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {roleHead} from './employeeRoleListConfig';
    import addEmployee from './addEmployee';
    import delModal from '@/components/delModal/index.vue';
    export default {
        props : {
            //已包含的员工列表
            'employee-list' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data() {
            return {
                //表头配置
                columns : roleHead,
                //表格配置
                tableData : [],
                //新增员工弹窗是否显示
                addVisible : false,
                //选择的员工
                employeeChosed : [],
                //将要删除员工数据
                delEmployees : []
            }
        },
        components : {
            tableCom,
            addEmployee,
            delModal
        },
        methods: {
            /**
             * 查询当前权限下的员工列表
             */
            queryList () {

            },
            /**
             * 更新选择员工数据
             * @param data
             */
            updateSelected (data) {
                if(this.tableData.length > 0){
                    for(let i = 0,j = data.length;i < j;i++){
                        new Promise((resolve,reject) => {
                            for(let a = 0,b = this.tableData.length;a < b;a++){
                                if(data[i].id === this.tableData[a].id){
                                    reject();
                                }
                            }
                            resolve();
                        }).then(() => {
                            this.tableData.push(data[i]);
                        });
                    }
                }else{
                    this.tableData = JSON.parse(JSON.stringify(data));
                }
                this.$emit('updateSelected',this.tableData);
            },
            /**
             * 新增员工弹窗弹出
             */
            addEmployee() {
                this.addVisible = true;
            },
            /**
             * 删除员工
             * @param rowData
             */
            del (rowData) {
                this.delEmployees = rowData;
                this.$refs.delModal.show({
                    title : `删除员工`,
                    confirmCallback : () => {
                        this.confirmDel(rowData);
                    }
                });
            },
            /**
             * 删除员工
             * @param data
             */
            confirmDel (data) {
                for(let i = 0,j = data.length;i < j;i++){
                    for(let a = this.tableData.length - 1,b = 0;a >= b;a--){
                        if(data[i].id === this.tableData[a].id){
                            this.tableData.splice(a,1);
                        }
                    }
                }
            },
            /**
             * 选择员工改变
             * @param data
             */
            selectedChange (data) {
                this.employeeChosed = data;
            }
        },
        watch : {
            'employeeList' (newVal,oldVal){
                if(newVal){
                    this.tableData = JSON.parse(JSON.stringify(newVal));
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .employee-privalige-set{

        .btn-area{
            @include block_outline($height : 56px);
            padding-top: 15px;
        }

        @at-root .del-tips{
            position: absolute;
            padding: 0 76px 0 106px;
            color: $color_333;
            font-size: $font_size_14px;

            .ivu-icon{
                @include absolute_pos(absolute,$left : 88px,$top : 2px);
                font-size: 15px;
                color: #EB6751;
            }
        }
    }
</style>
