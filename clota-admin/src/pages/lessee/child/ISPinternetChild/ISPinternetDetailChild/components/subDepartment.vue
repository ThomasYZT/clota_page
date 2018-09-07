<!--下属部门-->

<template>
    <div class="sub-department">
        <div class="pick-up-title" >
            <span class="label">{{$t('subDepartment')}}</span>
            <span class="back-up"
                  @click="isPackUp = !isPackUp">
                    {{$t(isPackUp ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-pull-down" :class="{'icon-reverse' : isPackUp}"></span>
            </span>
        </div>
        <transition name="fade">
            <div class="table-wrap" v-if="isPackUp">
                <div class="employee-account">
                    <Button type="error"
                            :disabled="selectedDepartment.length < 1"
                            @click="delDepartment">删除</Button>
                </div>
                <table-com
                    v-if="tableShow"
                    :column-data="partMentHead"
                    :table-data="tableData"
                    :border="true"
                    :page-no-d.sync="pageNo"
                    :show-pagination="true"
                    :page-size-d.sync="pageSize"
                    :total-count="totalCount"
                    :auto-height="true"
                    :table-com-min-height="280"
                    @query-data="queryList"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        slot="columncheck"
                        slot-scope="row"
                        :label="row.title"
                        fixed="left"
                        show-overflow-tooltip
                        type="selection"
                        :width="row.width"
                        :min-width="row.minWidth">
                    </el-table-column>
                    <el-table-column
                        slot="columnstatus"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            {{scoped.row.status === 'close' ? $t('outUse') : $t('startUsing')}}
                        </template>
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
                                <li class="red-label" @click="delDep(scoped.row)">删除</li>
                                <li class="normal" @click="changeDep(scoped.row)">修改</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </transition>
        <!--删除二次确认模态框-->
        <del-modal ref="delModal">
        </del-modal>
        <!--编辑模态框-->
        <edit-modal ref="editModal">
            <Form :model="formData"
                  ref="formRef"
                  label-position="top"
                  :rules="ruleValidate"
                  :label-width="0">
                <FormItem label="修改部门名称" prop="depName">
                    <Input v-model.trim="formData.depName" style="width: 280px"/>
                </FormItem>
            </Form>
        </edit-modal>
    </div>
</template>

<script>
    import {partMentHead} from './subDepartmentConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import delModal from '@/components/delModal/index.vue';
    import editModal from '@/components/editModal/index.vue';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //表格查询参数
            'search-params' : {
                typee : Object,
                default () {
                    return {}
                }
            }
        },
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
                tableData : [],
                //下属景区总数
                totalCount : 0,
                //选中的部门
                selectedDepartment : [],
                pageNo : 1,
                pageSize : 10,
                //是否收起
                isPackUp : true,
                //修改部门名称表单
                formData : {
                    depName : ''
                },
                //校验规则
                ruleValidate : {
                    depName : [
                        {required : true,message : this.$t('inputField',{field : this.$t('depName')}),trigger : 'blur'},
                        {max : 100,message : this.$t('errorMaxLength',{field : this.$t('depName')}),trigger : 'blur'}
                    ]
                }
            }
        },
        methods: {
            /**
             * 批量删除部门
             */
            delDepartment () {
                let orgNames = this.selectedDepartment.map(item => item.orgName);
                this.$refs.delModal.show({
                    msg : `删除部门${orgNames.join(',')}`,
                    title : '删除部门',
                    confirmCallback : () =>{
                        this.confirmDelDepartment(this.selectedDepartment.map(item => item.id));
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
                    msg : `删除部门${data.orgName}`,
                    title : '删除部门',
                    confirmCallback : () =>{
                        this.confirmDelDepartment([data.id]);
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
                    confirmCallback : () => {
                        this.$refs.formRef.validate(valid => {
                            if(valid) {
                                this.confirmChangeDep(this.formData.depName,data);
                            }
                        });
                    }
                });
            },
            /**
             * 确认修改部门名称
             * @param name
             * @param rowData
             */
            confirmChangeDep (name,rowData) {
                ajax.post('updateOrgInfo',{
                    id : rowData.id,
                    orgName : name
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success('修改成功');
                        this.$emit('org-change');
                        this.queryList();
                    }else{
                        this.$Message.error(res.message || '修改失败');
                    }
                }).finally(() => {
                    this.$refs.editModal.hide();
                });
            },
            /**
             * 根据筛选条件过滤数据
             * @param filters
             */
            handleFilter (filters) {
                this.tableData = this.tableData.slice(0,2)
            },
            /**
             * 查询下属部门信息
             */
            queryList () {
                ajax.post('getSubsidiaries',{
                    id : this.searchParams.id,
                    nodeType : 'department'
                }).then(res => {
                    if(res.status === 200){
                        this.tableData = res.data ? res.data : [];
                    }else{
                        this.tableData = [];
                    }
                });
            },
            /**
             * 确认删除部门
             * @param ids
             */
            confirmDelDepartment (ids) {
                ajax.post('deleteDepartments',{
                    ids : ids
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success('删除成功');
                        this.$emit('org-change');
                        this.queryList();
                    }else{
                        this.$Message.error('删除失败');
                    }
                });
            }
        },
        computed : {
            //表格是否显示
            tableShow () {
                return this.searchParams && this.searchParams.id;
            }
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
