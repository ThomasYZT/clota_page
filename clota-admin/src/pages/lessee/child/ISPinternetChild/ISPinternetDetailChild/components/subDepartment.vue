<!--下属部门-->

<template>
    <div class="sub-department">
        <table-com
            :table-data="tableData"
            :column-data="partMentHead"
            :title="$t('subDepartment')"
            :show-page="true"
            :show-table-bar="false"
            :total="totalCount"
            @selection-change="handleSelectionChange"
            @get-new-data="getSubCompany">
            <el-table-column
                slot="column0"
                type="selection"
                width="55">
            </el-table-column>
            <div class="employee-account" slot="table-title">
                <Button type="error"
                        :disabled="selectedDepartment.length < 1"
                        @click="delDepartment">删除</Button>
            </div>

            <el-table-column
                slot="column5"
                :label="$t('operate')"
                width="145">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="delete" @click="delDep(scoped.row)">删除</li>
                        <li class="reset-pass " @click="changeDep(scoped.row)">修改</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--删除二次确认模态框-->
        <del-modal ref="delModal">
        </del-modal>
        <!--编辑模态框-->
        <edit-modal ref="editModal">
        </edit-modal>
    </div>
</template>

<script>
    import {partMentHead} from './subDepartmentConfig';
    import tableCom from '../../../organization/tableCom';
    import delModal from '@/components/delModal/index.vue';
    import editModal from '@/components/editModal/index.vue';
    export default {
        components : {
            tableCom,
            delModal,
            editModal
        },
        data() {
            return {
                //下属部门表头配置
                partMentHead : partMentHead,
                //表格数据
                tableData : [
                    {
                        examName : 'examName',
                        status : 'open'
                    },
                    {
                        examName : 'examName',
                        status : 'close'
                    },
                    {
                        examName : 'examName',
                        status : 'pause'
                    }
                ],
                //下属景区总数
                totalCount : 100,
                //选中的部门
                selectedDepartment : [],
            }
        },
        methods: {
            /**
             * 获取下属部门信息
             */
            getSubCompany () {

            },
            /**
             * 批量删除部门
             */
            delDepartment () {
                this.$refs.delModal.show({
                    msg : '删除部门',
                    title : '删除部门',
                    confirmCallback : () =>{
                        this.$Message.success('删除成功');
                        this.getSubCompany();
                    }
                });
            },
            /**
             * 选择的部门数据改变
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedDepartment = data;
            },
            /**
             * 删除部门
             * @param data
             */
            delDep (data) {
                this.$refs.delModal.show({
                    msg : '删除部门',
                    title : '删除部门',
                    confirmCallback : () =>{
                        this.$Message.success('删除成功');
                    }
                });
            },
            /**
             * 修改部门名称
             * @param data
             */
            changeDep (data) {
                this.$refs.editModal.show({
                    title : this.$t('changeDepName'),
                    confirmCallback : (pass) => {
                        this.confirmChangeDep(pass,data);
                    }
                });
            },
            /**
             * 确认修改部门名称
             * @param name
             * @param rowData
             */
            confirmChangeDep (name,rowData) {
                console.log(name,rowData)
            }
        },
        created () {
            this.getSubCompany();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .sub-department{
        @include block_outline($height : auto);

        .operate-info{
            @include table_operate();

            .custome{
                color: $color_blue;
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
