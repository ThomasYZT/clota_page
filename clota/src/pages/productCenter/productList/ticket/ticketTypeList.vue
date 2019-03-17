<!--
内容：产品列表 - 票类
作者：
日期：
-->

<template>
    <div class="ticket-type">
        <div class="operation-box" v-if="role === 'scenic'">
            <Button type="primary"
                    icon="android-add"
                    v-if="canAddProduct"
                    @click="$router.push({name: 'addTicket', params: { type: 'add'}})">{{$t('add')}}</Button>
            <Button type="error"
                    v-if="cacnDelProduct"
                    :disabled="canDelete"
                    @click="batchDel()">{{$t('del')}}</Button>
        </div>
        <!-- 筛选产品类别 -->
        <div class="filter-wrapper" v-if="manageOrgs.nodeType !== 'partner'">
            <span>{{$t('colonSetting', { key : $t('selectProductType') })}}</span>
            <Select v-model="queryParams.typeId"
                    @on-change="queryList"
                    style="width:250px">
                <Option v-for="item in typeList"
                        :value="item.id"
                        :key="item.id">
                    {{ $t(item.name) }}
                </Option>
            </Select>
            <span class="inline-btn" @click="manageType">{{$t('management')}}</span>
        </div>

        <table-com
            :ofsetHeight="manageOrgs.nodeType !== 'partner' ? 120 : 60"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="total"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            :column-check="role === 'scenic' && cacnDelProduct"
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
                    {{scope.row.standardPrice | contentFilter}}
                </template>
            </el-table-column>
            <el-table-column v-if="role === 'partner'"
                             slot="column5"
                             slot-scope="row"
                             :label="row.title"
                             :width="row.width"
                             :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.printPrice | contentFilter}}
                </template>
            </el-table-column>
            <el-table-column
                v-if="role !== 'partner'"
                slot="column7"
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
                slot="column8"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth"
                :prop="row.field">
                <template slot-scope="scope">
                    {{scope.row.updatedTime | contentFilter}}
                </template>
            </el-table-column>
            <el-table-column
                v-if="role === 'scenic' || role === 'partner'"
                slot="column9"
                slot-scope="row"
                fixed="right"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li class="operate" @click="checkProductDetail(scope.row)">{{$t('check')}}</li><!--查看-->
                        <li class="red-label"
                            v-if="scope.row.auditStatus === 'rejected' || scope.row.auditStatus === 'not_enabled'"
                            @click="batchDel(scope.row)">{{$t('delete')}}</li><!--删除-->
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--删除模态框-->
        <del-modal ref="delModal" class="del-min-width">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('youAreDeleting')}}
               <span class="yellow-label">{{delUnits}}</span>
                <span><span style="color : #EB6751;">{{$t('irreversible')}}</span>{{$t('sureToDel')}}</span>
            </span>
        </del-modal>

        <typeManageModal ref="typeManageModal" @updateTypeList="queryTagDefines"></typeManageModal>
    </div>
</template>
<script type="text/ecmascript-6">

    import tableCom from '@/components/tableCom/tableCom.vue';
    import delModal from '@/components/delModal/index.vue';
    import typeManageModal from './components/typeManageModal';
    import { configVariable } from '@/assets/js/constVariable';
    import { ticketTypeHead } from '../../productConfig';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            tableCom,
            delModal,
            typeManageModal,
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
            },
            //设置角色权限
            role () {
                return this.manageOrgs.nodeType;
            },
            //是否可进行批量删除
            canDelete () {
                if (this.selectedRow.length > 0 && this.selectedRow.filter((item) => {
                    return item.auditStatus === 'enabled' || item.auditStatus === 'auditing';
                }).length === 0) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        data () {
            return {
                // 获取数据的请求参数
                queryParams : {
                    typeId : 'all',
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                    auditStatus : '', //审核状态；（未启用-not_enabled，已驳回-rejected，审核中-auditing，已启用-enabled）
                },
                filterParam : {
                    orderBy : [{ name : 'p.updated_time', val : 'desc' }],//[{name:xxx,val:asc|desc}]
                },
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
                //类别列表数据
                typeList : [{
                    id : 'all',
                    name : 'allType',
                }],
            };
        },
        methods : {
            /**
             *  查询票类产品列表
             */
            queryList () {
                ajax.post('queryProductPage',{
                    pageNo : this.queryParams.pageNo,
                    pageSize : this.queryParams.pageSize,
                    auditStatus : this.queryParams.auditStatus,
                    typeId : this.queryParams.typeId === 'all' ? '' : this.queryParams.typeId,
                    orderBy : this.queryParams.orderBy,
                }).then(res => {
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
            /**
             *  查看详情
             */
            checkProductDetail ( data ) {
                this.$router.push({
                    name : 'ticketDetail',
                    params : {
                        info : data,
                        role : this.role === 'partner' ? 'other_org' : '',
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
            /**
             * 批量删除
             */
            batchDel (data) {
                if ( !this.cacnDelProduct ) return;
                if (!data) {
                    let ids = this.selectedRow.map(item => item.id).join(',');
                    this.delUnits = this.selectedRow.map(item => {
                        return item.productName;
                    }).join(',');
                    this.$refs.delModal.show({
                        title : this.$t('deleteBatch'),
                        confirmCallback : () => {
                            this.deleteTicket(ids);
                        }
                    });
                } else {
                    let ids = data.id;
                    this.delUnits = data.productName;
                    this.$refs.delModal.show({
                        title : this.$t('delete'),
                        confirmCallback : () => {
                            this.deleteTicket(ids);
                        }
                    });
                }
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

                    Object.assign(this.filterParam, { orderBy : JSON.stringify([{ name : 'p.audit_status', val : 'asc' }, { name : `${params.prop}`, val : `${order}` }]) });
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
            /**
             * 获取类别列表数据
             */
            queryTagDefines () {
                ajax.post('queryTagDefines', {
                    scene : 'product_type',
                }).then(res => {
                    if (res.success) {
                        this.typeList = res.data ? [{
                            id : 'all',
                            name : 'allType',
                        }].concat(res.data) : [{
                            id : 'all',
                            name : 'allType',
                        }];
                    } else {
                        this.typeList = [{
                            id : 'all',
                            name : 'allType',
                        }];
                    }
                });
            },
            /**
             * 管理标签
             */
            manageType () {
                this.$refs.typeManageModal.show();
            }
        },
        created () {
            if (this.manageOrgs.nodeType !== 'partner') {
                //查询产品类别列表数据
                this.queryTagDefines();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/base";

    .ticket-type {

        .operation-box {
            padding: 0 30px;
            margin: 15px 0;
            /deep/ .ivu-btn {
                min-width: 88px;
                margin-right: 7px;
            }
        }

        .filter-wrapper {
            margin: 15px 0 0 0;
            padding: 0 30px 15px;

            .inline-btn {
                margin-right: 10px;
                color: $color_blue;
                cursor: pointer;
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
        color: $color_yellow;
    }

    .red-label {
        color: $color_red;
    }

</style>
