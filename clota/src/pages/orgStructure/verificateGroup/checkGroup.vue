1<template>
    <!-- 核销设备分组 -->
    <div class="check-group">
        <div class="orgHeader">

            <!--新增分组-->
            <add-group v-if="canAddSaleGroup" @fresh-data="getOrgGroupList">
            </add-group>

            <!--批量操作-->
            <batch-opertate
                v-if="canMoveSaleGroup || canRemoveSaleGroup"
                :orgGroupList="orgGroupList"
                :saleGroupSelected="saleGroupSelected"
                @handle-out-group="handleOutGroup"
                @handle-remove-group="handleRemoveGroup">
            </batch-opertate>

            <!--选择分组-->
            <group-select
                :groupType.sync="groupType"
                :orgGroupList="orgGroupList"
                @fresh-data="getOrgGroupList"
                @fresh-channel="queryList">
            </group-select>
        </div>

        <div class="content">
            <table-com
                v-if="groupType"
                :column-data="columns"
                :table-data="tableData"
                :border="true"
                :page-no-d.sync="pageNo"
                :show-pagination="true"
                :page-size-d.sync="pageSize"
                :total-count="totalCount"
                :ofset-height="120"
                @query-data="queryList"
                @selection-change="selectedChange">
                <el-table-column
                    v-if="canMoveSaleGroup || canRemoveSaleGroup"
                    slot="column0"
                    slot-scope="row"
                    :label="row.title"
                    type="selection"
                    :width="row.width"
                    :min-width="row.minWidth">
                </el-table-column>
                <el-table-column
                    slot="column3"
                    slot-scope="row"
                    :label="row.title"
                    show-overflow-tooltip
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{$t(scope.row.checkerType === 'check'
                        ? 'verifyCashierType' :  scope.row.checkerType === 'sale'
                        ? 'verifySaleType' : 'verifySaleAndCashierType')}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column5"
                    slot-scope="row"
                    :label="row.title"
                    show-overflow-tooltip
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row.checkGroupId ? scope.row.checkGroupName : $t('noGroup')}}
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="canMoveSaleGroup || canRemoveSaleGroup"
                    slot="column6"
                    slot-scope="row"
                    :label="row.title"
                    show-overflow-tooltip
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        <ul class="operate-list">
                            <li v-if="canMoveSaleGroup">
                                <move-group
                                    v-model="scoped.row.visible"
                                    :rowData="scoped.row"
                                    :orgGroupList="orgGroupList"
                                    @move-channel-group="moveChannelGroup">
                                </move-group>
                            </li>
                            <li v-if="canRemoveSaleGroup"
                                :class="{disabled : !scoped.row.checkGroupId}"
                                @click="channelRemove(scoped.row)">{{$t('outGroup')}}</li><!--移出分组-->
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <!--移除分组-->
        <del-modal ref="delModal">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('removeVeriGroupNotice')}}
            </span>
        </del-modal>
    </div>
</template>


<script>
    import ajax from '@/api/index.js';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { saleGroup } from './checkGroupConfig';
    import delModal from '@/components/delModal/index.vue';
    import { saleOperateBatch } from '@/assets/js/constVariable.js';
    import batchOpertate from './child/batchOperate';
    import addGroup from './child/addGroup';
    import groupSelect from './child/groupSelect';
    import moveGroup from './child/moveGroup';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            tableCom,
            delModal,
            batchOpertate,
            addGroup,
            groupSelect,
            moveGroup
        },
        data () {
            return {
                //表单数据
                tableData : [],
                //核销设备分组
                orgGroupList : [],
                //表头配置
                columns : saleGroup,
                pageNo : 1,
                pageSize : 10,
                totalCount : 0,
                //当前操作的分组信息
                currentGroup : {},
                //批量操作类型
                batchOperate : saleOperateBatch,
                //选择的渠道列表
                saleGroupSelected : [],
                groupType : ''
            };
        },
        methods : {
            /**
             * 查询核销设备分组信息
             */
            getOrgGroupList () {
                if (!this.canAddSaleGroup) return;
                ajax.post('getOrgGroupList',{
                    groupType : 'check'
                }).then(res => {
                    if (res.success) {
                        this.orgGroupList = res.data ? res.data : [];
                    } else {
                        this.orgGroupList = [];
                    }
                });
            },
            /**
             * 查询所有核销设备分组
             */
            queryList () {
                ajax.post('getCheckItemPage',{
                    groupId : this.groupType === '-2' ? '' : this.groupType,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                    orgId : this.manageOrgs.id
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 移动核销设备分组
             * @param data
             */
            batchMoveChannelGroup (data) {
                ajax.post('batchMoveItemGroup',data,{
                    headers : {
                        'Content-Type' : 'application/json;charset-UTF-8'
                    }
                }).then(res => {
                   if (res.success) {
                       this.$Message.success(this.$t('successTip',{ tip : this.$t('move') }));
                       this.queryList();
                   } else {
                       this.$Message.error(this.$t('failureTip',{ tip : this.$t('move') }));
                   }
                });
            },
            /**
             * 将渠道移出分组
             * @param rowData
             */
            removeGroup (rowData) {
                this.$refs.delModal.show({
                    title : this.$t('notice'),//提示
                    confirmCallback : () => {
                        this.batchMoveChannelGroup(rowData);
                    }
                });
            },
            /**
             * 修改选中的渠道
             * @param data
             */
            selectedChange (data) {
                this.saleGroupSelected = data;
            },
            /**
             * 单个移出分组
             * @param data
             */
            channelRemove (data) {
                if (!data.checkGroupId) return;
                this.removeGroup([{
                    checkGroupId : '',
                    id : data.id,
                }]);
            },
            /**
             * 批量移出分组
             */
            handleOutGroup () {
                this.removeGroup(this.saleGroupSelected.map(item => ({
                    checkGroupId : '',
                    id : item.id,
                })));
            },
            /**
             * 批量移动分组
             * @param groupId
             */
            handleRemoveGroup (groupId) {
                this.batchMoveChannelGroup(this.saleGroupSelected.map(item => ({
                    checkGroupId : groupId,
                    id : item.id,
                })));
            },
            /**
             * 移动分组
             * @param data
             */
            moveChannelGroup (data) {
                this.batchMoveChannelGroup(data);
            },
        },
        created () {
            this.getOrgGroupList();
        },
        computed : {
            ...mapGetters({
                manageOrgs : 'manageOrgs',
                permissionInfo : 'permissionInfo',
            }),
            //是否可以新增分组
            canAddSaleGroup () {
                return this.permissionInfo && this.permissionInfo['addCheckerGroup'] === 'allow';
            },
            //是否可以移动分组
            canMoveSaleGroup () {
                return this.permissionInfo && this.permissionInfo['moveCheckerGroup'] === 'allow';
            },
            //是否可以移出分组
            canRemoveSaleGroup () {
                return this.permissionInfo && this.permissionInfo['removeCheckerGroup'] === 'allow';
            }
        }
    };
</script>

<style lang="scss">
    @import '~@/assets/scss/base';


    .check-group {
        @include block_outline();
        background: $color_fff;

        .orgHeader{
            @include block_outline($height : 60px);
            padding: 14px 30px 0 30px;

            .save{
                font-size: $font_size_12px;
                color: $color_blue;
                margin-left: 5px;
            }

            .cancel{
                font-size: $font_size_12px;
                color: $color_999;
            }
        }

        .content{
            @include block_outline($height : unquote('calc(100% - 60px)'));
        }
    }
    .ivu-select-dropdown-transfer{
        z-index: 9999;
    }

    .content-text {
        width: 210px;
        position: relative;

        .delete-icon {
            position: absolute;
            left: -27px;
            margin-right: 12px;
            color: $color_red;
        }

        .yellow-label{
            display: inline-block;
            max-width: 100%;
            color: $color_yellow;
            vertical-align: middle;
            @include overflow_tip();
        }
    }
</style>

