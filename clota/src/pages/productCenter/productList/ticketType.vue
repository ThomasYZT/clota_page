<!--
内容：产品列表 - 票类
作者：
日期：
-->

<template>
    <div class="ticket-type">
        <div class="operation-box" v-if="role === 'scenic'">
            <Button type="primary"
                    v-if="canAddProduct"
                    @click="$router.push({name: 'addTicket', params: { type: 'add'}})">+ {{$t('add')}}</Button>
            <Button type="error"
                    v-if="cacnDelProduct"
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
            :column-check="role === 'scenic' && cacnDelProduct"
            :default-sort="{prop: 'updatedTime', order: 'descending'}"
            @sort-change="handleSortChanged"
            @query-data="queryList"
            @selection-change="changeSelection">
                <!--:filters="filterList"-->
                <!--:filter-method="filterHandler"-->
                <!--filter-placement="bottom-end"-->
            <el-table-column v-if="role !== 'partner'"
                             slot="column3"
                             slot-scope="row"
                             :label="row.title"
                             :width="row.width"
                             :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.standardPrice}}
                </template>
            </el-table-column>
            <el-table-column v-if="role === 'partner'"
                             slot="column4"
                             slot-scope="row"
                             :label="row.title"
                             :width="row.width"
                             :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.printPrice}}
                </template>
            </el-table-column>
            <el-table-column
                v-if="role !== 'partner'"
                slot="column6"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <div>
                        <span v-if="scope.row.auditStatus === 'enabled'" class="status-recharge pass">{{$t('startingUse')}}</span><!--已启用-->
                        <span v-else-if="scope.row.auditStatus === 'auditing'" class="status-recharge reject">{{$t('checking')}}</span><!--审核中-->
                        <span v-else-if="scope.row.auditStatus === 'rejected'" class="status-recharge pending">{{$t('rejected')}}</span><!--已驳回-->
                        <span v-else class="status-recharge pending">{{$t('unStarting')}}</span><!--未启用-->
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                v-if="role !== 'partner'"
                slot="column7"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth"
                :prop="row.field">
                <template slot-scope="scope">
                    {{scope.row.updatedTime}}
                </template>
            </el-table-column>
            <el-table-column
                v-if="role === 'scenic' || role === 'partner'"
                slot="column8"
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
    import { configVariable } from '@/assets/js/constVariable';
    import { ticketTypeHead } from '../productConfig';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            tableCom,
            delModal,
        },
        computed : {
            ...mapGetters([
                'manageOrgs',
                'permissionInfo',
            ]),
            //是否可以新增票类信息
            canAddProduct () {
                return this.permissionInfo && 'addProduct' in this.permissionInfo;
            },
            //是否可以删除票类信息
            cacnDelProduct () {
                return this.permissionInfo && 'deleteProduct' in this.permissionInfo;
            }
        },
        props : {},
        data () {
            return {
                // 获取数据的请求参数
                queryParams : {
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                    auditStatus : '', //审核状态；（未启用-not_enabled，已驳回-rejected，审核中-auditing，已启用-enabled）
                },
                filterParam : {
                    orderBy : [{ name : 'p.updated_time', val : 'desc' }],//[{name:xxx,val:asc|desc}]
                },
                // 筛选列表
                /*filterList: [
                    { text: '已启用', value: '已启用' },
                    { text: '未启用', value: '未启用' },
                ],*/
                // 表格表头字段名
                columnData : ticketTypeHead,
                // 列表数据
                tableData : [],
                // 数据总条数
                total : 0,
                // 已勾选的模板
                selectedRow : [],
                // 删除数据显示
                delUnits : '',
            };
        },
        methods : {

            // 查询票类产品列表
            queryList () {
                ajax.post('queryProductPage',this.queryParams).then(res => {
                    if (res.success) {
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
                    name : 'ticketDetail',
                    params : {
                        info : data
                    }
                });
            },

            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection (selection) {
                this.selectedRow = selection;
            },
            // 批量删除
            batchDel () {
                if ( !this.cacnDelProduct ) return;
                let ids = this.selectedRow.map(item => item.id).join(',');
                this.delUnits = this.selectedRow.map(item => item.productName).join(',');
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
            deleteTicket ( data ) {
                ajax.post('deleteProduct',{
                    productIds : data
                }).then(res => {
                    if (res.success) {
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
            handleSortChanged : function (params) {
                let order = 'desc';
                if (params.order && params.order === 'ascending') {
                    order = 'asc';
                }
                if (params.prop) {
                    if (params.prop === 'updatedTime') {
                        params.prop = 'p.updated_time';
                    }

                    Object.assign(this.filterParam, { orderBy : JSON.stringify([{ name : `${params.prop}`, val : `${order}` }, { name : 'p.audit_status', val : 'asc' }]) });
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
            filterHandler (value, row) {
                return row.status === value;
            },

        },
        created () {
            //设置角色权限
            this.role = this.manageOrgs.nodeType;
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
        display: inline-block;
        width: 200px;
        vertical-align: top;
        color: $color_yellow;
    }

    .red-label {
        color: $color_red;
    }

</style>
