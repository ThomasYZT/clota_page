<!--新增员工-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        :width="600"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="add-employee"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title">{{$t('新增员工')}}</span>
        </div>
        <div class="selection">
            已选：{{employeeSelected.length}}人
        </div>
        <table-com
            v-if="value"
            :column-data="columns"
            :table-data="tableData"
            :border="true"
            :height="500"
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
        </table-com>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="save">{{$t('save')}}</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {roleHead} from './employeeRoleListConfig';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //绑定modal的v-modal值
            value: {
                type: Boolean,
                default: false
            },
        },
        components : {
            tableCom
        },
        data() {
            return {
                //表头配置
                columns : roleHead.slice(0,-1),
                //表格数据
                tableData : [],
                //已选择的员工
                employeeSelected : [],
            }
        },
        methods: {
            /**
             * 保存当前选择的员工
             */
            save () {
                this.$emit('updateSelected',this.employeeSelected);
                this.cancel();
            },
            /**
             * 取消选择员工
             */
            cancel () {
                this.$emit('input',false);
            },
            /**
             * 模态框状态改变
             */
            changeValue(data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {
                if(type === true){
                }else{
                }
            },
            /**
             * 查询当前员工列表
             */
            queryList () {
                ajax.post('getEmployeeList',{
                    pageNo : 1,
                    pageSize : 99999
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data.data : [];
                    }else{
                        this.tableData = [];
                    }
                });
            },
            /**
             * 选择的员工变化
             * @param employees
             */
            selectedChange (employees) {
                this.employeeSelected = employees;
            }
        }
    }
</script>

<style lang="scss">
	@import '~@/assets/scss/base';
    .add-employee{
        .selection{
            @include block_outline($height : 40px);
            padding: 10px;
            line-height: 20px;
            font-size: $font_size_14px;
            color: #606266;
        }

        .ivu-modal-body{
            padding: 0 10px;
        }
    }
</style>
