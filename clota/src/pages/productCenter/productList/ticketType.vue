<!--
内容：产品列表 - 票类
作者：
日期：
-->

<template>
    <div class="ticket-type">
        <div class="operation-box">
            <Button type="primary"
                    @click="$router.push({name: 'addTicket', params: { type: 'add'}})">+ {{$t('add')}}</Button>
            <Button type="error"
                    :disabled="selectedRow.length > 0 ? false : true"
                    @click="batchDel">{{$t('del')}}</Button>
        </div>

        <table-com
            :ofsetHeight="120"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="total"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            :column-check="true"
            :default-sort="{prop: 'updatedTime', order: 'descending'}"
            @sort-change="handleSortChanged"
            @query-data="queryList"
            @selection-change="changeSelection">
            <el-table-column
                slot="column5"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :filters="filterList"
                :filter-method="filterHandler"
                filter-placement="bottom-end"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <div>
                        <span v-if="scope.row.auditStatus === 'enabled'" class="status-recharge pass">{{$t('startingUse')}}</span><!--已启用-->
                        <span v-if="scope.row.auditStatus === 'auditing'" class="status-recharge reject">{{$t('checking')}}</span><!--审核中-->
                        <span v-if="scope.row.auditStatus === '已驳回'" class="status-recharge pending">{{$t('rejected')}}</span><!--已驳回-->
                        <span v-if="scope.row.auditStatus === '未启用'" class="status-recharge pending">{{$t('unStarting')}}</span><!--未启用-->
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                slot="column6"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth"
                sortable="custom"
                :prop="row.field">
                <template slot-scope="scope">
                    {{scope.row.updatedTime}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column7"
                slot-scope="row"
                fixed="right"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li class="operate" @click="checkProductDetail(scope.row)">{{$t('check')}}</li><!--查看-->
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--删除模态框-->
        <del-modal ref="delModal">
            <span class="content-text">{{$t('isDoing')}}{{$t('delete')}}：<span class="yellow-label">{{delUnits}}</span></span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>

    </div>
</template>
<script type="text/ecmascript-6">

    import tableCom from '@/components/tableCom/tableCom.vue';
    import delModal from '@/components/delModal/index.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import {ticketTypeHead} from '../productConfig';
    import ajax from '@/api/index';

    export default {
        components: {
            tableCom,
            delModal,
        },
        props: {},
        data() {
            return {
                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    order: 'update_time desc',
                },
                // 筛选列表
                filterList: [
                    {text: '已启用', value: '已启用'},
                    {text: '未启用', value: '未启用'},
                ],
                // 表格表头字段名
                columnData: ticketTypeHead,
                // 列表数据
                tableData: [],
                // 数据总条数
                total: 0,
                // 已勾选的模板
                selectedRow: [],
                // 删除数据显示
                delUnits: '',
            }
        },
        methods: {

            // 查询票类产品列表
            queryList() {
                ajax.post('queryProductPage',this.queryParams).then(res => {
                    if(res.success){
                        this.tableData = res.data.data || [];
                        this.total = res.data.totalRow || 0;
                    } else {
                        this.tableData = [];
                        this.total = 0;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            //查看详情
            checkProductDetail ( data ) {
                this.$router.push({
                    name: 'ticketDetail',
                    params: {
                        info: data
                    }
                })
            },

            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection(selection) {
                this.selectedRow = selection;
            },
            // 批量删除
            batchDel () {
                let ids = this.selectedRow.map(item => item.id).join(',');
                this.delUnits = this.selectedRow.map(item => item.productName).join(',');
                console.log(ids);
                this.$refs.delModal.show({
                    title : this.$t('deleteBatch'),
                    confirmCallback : () => {
                        this.deleteTicket(ids);
                    }
                });
            },
            /**
             * 删除票类
             * @param data
             */
            deleteTicket( data ) {
                ajax.post('deleteProduct',{
                    productIds: data
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('success') + this.$t('delete'));
                        this.queryList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            /**
             * 列表排序 - 默认按更新时间降序排列
             * @param params - { column, prop, order }
             */
            handleSortChanged: function (params) {
                let order = 'desc';
                if (params.order && params.order === 'ascending'){
                    order = 'asc';
                }
                if (params.prop){
                    if (params.prop === 'updatedTime'){
                        params.prop = 'updated_time';
                    }

                    Object.assign(this.filterParam, { order: `${params.prop} ${order}` });
                    Object.assign(this.queryParams, this.filterParam);
                    this.queryParams.pageNo = 1;
                    this.queryList();
                }
            },

            /**
             * 表格筛选
             * @param value
             * @param row
             * @returns {boolean}
             */
            filterHandler(value, row) {

                return row.status === value;

            },

        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/base";

    .ticket-type {

        .operation-box {
            padding: 15px 30px;
            /deep/ .ivu-btn {
                min-width: 88px;
                margin-right: 7px;
            }
        }

        .status-recharge {
            position: relative;
            padding-left: 14px;
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 6px;
                height: 6px;
                border-radius: 50px;
            }
        }
        .pass:after {
            background: $color_green;
        }
        .pending:after {
            background: $color_BBC5D5;
        }
        .reject:after {
            background: $color_red;
        }

    }

    .yellow-label{
        color: $color_yellow;
    }

    .red-label {
        color: $color_red;
    }

</style>
