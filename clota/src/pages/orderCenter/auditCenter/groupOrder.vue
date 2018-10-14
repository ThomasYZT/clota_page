<!--
内容：团队订单预审核
作者：djc
日期：
-->

<template>
    <div class="group-order">
        <!--筛选条件-->
        <audit-filter :audit-name="'group'"
                      @on-filter="">
        </audit-filter>
        <!--批量审核-->

        <!--审核列表-->
        <table-com
            :ofsetHeight="170"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            :column-check="true"
            @query-data="queryList"
            @selection-change="changeSelection">

            <el-table-column
                slot="column9"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="operate-btn blue" @click="">{{$t('通过')}}</span>
                    <span class="divide-line"></span>
                    <span class="operate-btn red" @click="">{{$t('reject')}}</span>
                    <span class="divide-line"></span>
                    <span class="operate-btn blue" @click="">{{$t('details')}}</span>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>
<script type="text/ecmascript-6">
    import auditFilter from './components/auditFilter.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {groupOrderHead} from './auditConfig';
    import ajax from '@/api/index.js';
    import {configVariable} from '@/assets/js/constVariable.js';

    export default {
        components: { auditFilter, tableCom },
        props: {},
        data() {
            return {
                //表头配置
                columnData : groupOrderHead,
                //表格数据
                tableData: [],
                //总条数
                totalCount : 0,
                //表格是否显示
//                tableShow : false,
                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                // 已勾选的数据
                chosenRowData: [],
                //是否显示预定模态框
                showReserveModal : false,
                //选择的产品列表
                productList : []
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        methods: {
            /**
             * 查询所有团队订单审核信息
             */
            queryList () {
                ajax.post('queryTeamOrder',{
                    ...this.queryParams
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection(selection) {
                this.chosenRowData = selection;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .group-order {
        .divide-line {
            display: inline-block;
            width: 1px;
            height: 14px;
            margin: 0 5px;
            margin-bottom: -2px;
            background: #E1E1E1;
        }

        .operate-btn {
            cursor: pointer;
        }

        .blue {
            color: $color_blue;
        }
        .red {
            color: $color_red;
        }
    }
</style>
