<!--
    团队订单退单审核
    作者：杨泽涛
-->
<template>
    <div class="charge-back">
        <backAuditFilter :audit-name="'bulk'"
                         @on-filter="filterList"></backAuditFilter>

        <!--批量审核-->
        <div class="batch-audit">
            <el-dropdown trigger="click"
                         placement="bottom-start"
                         @command="handleCommand">
                <Button type="primary" style="float: left" size="default">{{$t('batchAudit')}}</Button><!--批量审核-->

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in batchAudit"
                                      :key="index"
                                      :disabled="chosenRowData.length <= 0"
                                      :command="item">{{$t(item.label)}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <!--审核列表-->
        <table-com
            :ofsetHeight="240"
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
        </table-com>
    </div>
</template>

<script>
    import backAuditFilter from './components/backAuditFilter';
    import tableCom from '@/components/tableCom/tableCom';
    import {teamOrderChargeBack, batchAudit} from './auditConfig';
    export default {
        components: {
            tableCom,
            backAuditFilter
        },
        data() {
            return {
                //表头数据
                columnData : teamOrderChargeBack,
                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,
                    pageSize: 10,
                },
                tableData : [],
                totalCount : 0,
                // 已勾选的数据
                chosenRowData: [],
                //批量审核
                batchAudit: batchAudit
            }
        },
        methods: {
            /**
             * 过滤列表数据
             * @param {object} paramsObj
             */
            filterList (paramsObj) {
                Object.assign(this.queryParams, paramsObj);
                this.queryList();
            },
            /**
             * 获取列表数据
             */
            queryList () {
                // ajax.post('').then(res => {
                //     if (res.success) {
                //
                //     } else {
                //
                //     }
                // });
                this.tableData = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},];
                this.totalCount = 20;
            },
            handleCommand(dropItem) {
                if (this.chosenRowData.length<=0) {
                    this.$Message.error(this.$t('selectChannelOperate'));
                    return;
                }
                switch (dropItem.value) {
                    case 'success' :
                        this.showAuditModal(this.chosenRowData, true, 'pass');
                        break;
                    case 'reject' :
                        this.showAuditModal(this.chosenRowData, true, 'reject');
                        break;
                }
            },
            /**
             * 表格项被选中
             * @param {array} rows
             */
            changeSelection (rows) {
                this.chosenRowData = rows;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .charge-back {
        .batch-audit {
            @include block_outline();
            margin-bottom: 10px;
            padding-left: 20px;
            line-height: 1;
        }
    }
    /deep/.el-dropdown-menu__item {
        width: 88px;
        text-align: center;

        &:not(.is-disabled) {
            color: $color_333;
        }
        &:not(.is-disabled):hover, &:focus {
            background-color: #f1f4f8;
            color: $color_blue;
        }
    }
</style>
