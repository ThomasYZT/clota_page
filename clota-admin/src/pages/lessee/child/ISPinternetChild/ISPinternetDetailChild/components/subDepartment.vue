<!--下属部门-->

<template>
    <div class="sub-department">
        <!--<table-com-->
            <!--:table-data="tableData"-->
            <!--:column-data="partMentHead"-->
            <!--:title="$t('subDepartment')"-->
            <!--:show-page="true"-->
            <!--:is-pack-up="isPackUp"-->
            <!--:show-table-bar="false"-->
            <!--:total="totalCount"-->
            <!--@selection-change="handleSelectionChange"-->
            <!--@get-new-data="getSubCompany"-->
            <!--@filter-method="handleFilter">-->
            <!--<el-table-column-->
                <!--slot="column0"-->
                <!--type="selection"-->
                <!--width="55">-->
            <!--</el-table-column>-->
            <!--<div class="employee-account" slot="table-title">-->
                <!--<Button type="error"-->
                        <!--:disabled="selectedDepartment.length < 1"-->
                        <!--@click="delDepartment">删除</Button>-->
            <!--</div>-->

            <!--<el-table-column-->
                <!--slot="column5"-->
                <!--:label="$t('operate')"-->
                <!--width="145">-->
                <!--<template slot-scope="scoped">-->
                    <!--<ul class="operate-info">-->
                        <!--<li class="delete" @click="delDep(scoped.row)">删除</li>-->
                        <!--<li class="reset-pass " @click="changeDep(scoped.row)">修改</li>-->
                    <!--</ul>-->
                <!--</template>-->
            <!--</el-table-column>-->
        <!--</table-com>-->

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
                    @query-data="queryList">
                    <el-table-column
                        slot="columncheck"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        type="selection"
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
            }
        },
        created () {
            this.getSubCompany();
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
