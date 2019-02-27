<!--
    我定义的销售政策列表模版元素
    作者：杨泽涛
-->
<template>
    <div class="my-defined-policy-list">
        <!--按钮栏（仅非合作伙伴可见）-->
        <div class="btn-wrap" v-if="role !== 'partner'">
            <!--新建销售政策按钮-->
            <Button v-if="canAddSalePolicy"
                    icon="android-add"
                    type="primary"
                    @click="addPolicy">{{$t('addSalePolicy')}}</Button>
            <!--批量操作下拉栏-->
            <template v-if="dropdownList.length > 0">
                <Button type="error"
                        v-if="isDisabled || dropdownList.filter(item => item.show).length < 1"
                        disabled>{{$t('batchOperate')}}<i class="el-icon-arrow-down el-icon--right"></i></Button>
                <el-dropdown @command="handleCommand" trigger="click" v-else>
                <span class="el-dropdown-link">
                    {{$t('batchOperate')}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in dropdownList"
                                          :key="index"
                                          v-show="item.show"
                                          :command="item.value">
                            {{$t(item.name)}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
        </div>

        <!--我定义的销售政策-->
        <table-com
            v-if="role !== 'partner'"
            :ofsetHeight="170"
            :show-pagination="true"
            :column-data="myPolicyHead"
            :table-data="myPolicyData"
            :total-count="mTotal"
            :page-no-d.sync="myPolicyParams.pageNo"
            :page-size-d.sync="myPolicyParams.pageSize"
            :border="true"
            :column-check="dropdownList.length > 0"
            @query-data="queryMyPolicyList"
            @selection-change="changeSelection">
            <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <div>
                        <span v-if="scope.row.auditStatus === 'enabled'" class="status-recharge pass">{{$t('startingUse')}}</span><!--已启用-->
                        <span v-else-if="scope.row.auditStatus === 'auditing'" class="status-recharge reject">{{$t('checking')}}</span><!--审核中-->
                        <span v-else-if="scope.row.auditStatus === 'rejected'" class="status-recharge pending">{{$t('rejected')}}</span><!--已驳回-->
                        <span v-else-if="scope.row.auditStatus === 'not_enabled'" class="status-recharge pending">{{$t('unStarting')}}</span><!--未启用-->
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                slot="column5"
                slot-scope="row"
                fixed="right"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li class="normal" @click="viewDetail(scope.row)">{{$t('check')}}</li><!--查看-->
                        <li class="normal" @click="quotaAllowance(scope.row)">{{$t('quotaAllowance')}}</li><!--查看-->
                        <li class="red-label"
                            :class="{disabled : scope.row.auditStatus !== 'rejected' && scope.row.auditStatus !== 'not_enabled'}"
                            @click="batchDel(scope.row)">{{$t('delete')}}</li><!--删除-->
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--删除模态框-->
        <del-modal ref="delModal" class="del-min-width">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('colonSetting',{ key : $t('isDoing') })}}
                <span class="yellow-label">{{delUnits}}</span>
            </span>
            <span><span style="color : #EB6751;">{{$t('irreversible')}}</span>{{$t('sureToDel')}}</span>
        </del-modal>
    </div>
</template>

<script>
    import { myPolicyHead } from '../../policyConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { configVariable } from '@/assets/js/constVariable';
    import delModal from '@/components/delModal/index.vue';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';
    export default {
        components : {
            tableCom,
            delModal
        },
        data () {
            return {
                //我定义的销售政策列表表头
                myPolicyHead : myPolicyHead,
                //表格数据
                myPolicyData : [],
                //列表数据总条数
                mTotal : 0,
                //获取我的销售政策列表数据请求参数
                myPolicyParams : {
                    selectType : 'from',
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                },
                // 删除数据显示
                delUnits : '',
                // 已勾选的删除数据
                selectedRow : [],
                //能否进行批量操作
                isDisabled : true,
                //可批量禁用
                disenable : false,
                //可批量通过
                passable : false,
                //可批量驳回
                rebuttable : false,
                //可批量启用
                openable : false,
                //可批量删除
                deletable : false,
                //可提交审核
                auditable : false,
            };
        },
        computed : {
            ...mapGetters([
                'manageOrgs',
                'permissionInfo',
            ]),
            //新建/修改/提交审核我定义的销售政策
            canAddSalePolicy () {
                return this.permissionInfo && 'addAndModifyPolicy' in this.permissionInfo;
            },
            //是否可以删除政策
            canDelPolicy () {
                return this.permissionInfo && 'deletePolicy' in this.permissionInfo;
            },
            //是否可以审核政策
            canAuditPolicy () {
                return this.permissionInfo && 'auditPolicy' in this.permissionInfo;
            },
            //是否可以提交审核
            canApplyAuditPolicy () {
                return this.permissionInfo && 'applyAuditPolicy' in this.permissionInfo;
            },
            //是否可以禁用政策
            canDisabledPolicy () {
                return this.permissionInfo && 'disablePolicy' in this.permissionInfo;
            },
            //批量操作类型
            dropdownList () {
                let result = [];
                if (this.canAuditPolicy) {
                    result.push({ name : 'checkPass', value : 'checkPass' ,show : this.passable });//审核通过
                    result.push({ name : 'reject', value : 'reject' ,show : this.rebuttable });//驳回
                }
                if (this.canApplyAuditPolicy) {
                    result.push({ name : 'commitCheck', value : 'commitCheck' ,show : this.auditable });//提交审核
                }
                if (this.canDelPolicy) {
                    result.push({ name : 'delete', value : 'delete',show : this.deletable });//删除
                }
                if (this.canDisabledPolicy) {
                    result.push({ name : 'forbidden', value : 'forbidden' ,show : this.disenable });//禁用
                    result.push({ name : 'commissioned', value : 'commissioned' ,show : this.openable });//启用
                }
                return result;
            },
            //当前机构角色
            role () {
                return this.manageOrgs.nodeType;
            }
        },
        methods : {
            /**
             *  查询我定义的销售政策列表
             */
            queryMyPolicyList () {
                ajax.post('queryPolicy', {
                    ...this.myPolicyParams,
                    keyword : this.keywords,
                    chooseOrgId : this.chooseOrgId
                }).then(res => {
                    this.selectedRow = [];
                    if (res.success) {
                        this.myPolicyData = res.data.data || [];
                        this.mTotal = res.data.totalRow || 0;
                    } else {
                        this.myPolicyData = [];
                        this.mTotal = 0;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 新建销售政策
             */
            addPolicy () {
                if (!this.canAddSalePolicy) return;
                this.$router.push({
                    name : 'editSalePolicy',
                    params : {
                        type : 'add',
                        productType : 'ticket',
                    }
                });
            },
            /**
             *  查看政策详情 -- 自己定义的分销政策
             *  @param data
             */
            viewDetail ( data ) {
                this.$router.push({
                    name : 'salePolicyDetail',
                    params : {
                        info : data
                    }
                });
            },
            /**
             *  前往配额余量页面
             */
            quotaAllowance ( data ) {
                this.$router.push({
                    name : 'quotaAllowance',
                    params : {
                        info : data,
                    }
                });
            },
            /**
             * 点击dropdown回调 (checked-enabled审核,up-enabled上架,down-not_enabled下架,delete-删除)
             * @param item
             */
            handleCommand ( item ) {
                if (item) {
                    let ids = this.selectedRow.map(obj => obj.id).join(',');
                    let allocationIds = this.selectedRow.map(obj => obj.allocationId).join(',');
                    switch (item) {
                        case 'checkPass' :
                            this.modifyPolicyStatus(ids, allocationIds, 'enabled');
                            break;
                        case 'commissioned' :
                            this.modifyPolicyStatus(ids, allocationIds, 'enabled');
                            break;
                        case 'forbidden' :
                            this.modifyPolicyStatus(ids, allocationIds, 'not_enabled');
                            break;
                        case 'delete' :
                            this.batchDel();
                            break;
                        case 'reject' :
                            //驳回
                            this.modifyPolicyStatus(ids, allocationIds, 'rejected');
                            break;
                        case 'commitCheck' :
                            //提交审核
                            this.modifyPolicyStatus(ids, allocationIds, 'auditing');
                            break;
                        default:
                            break;
                    }
                }
            },
            // 更新销售政策状态
            modifyPolicyStatus ( ids, allocationIds, status ) {
                ajax.post('modifyPolicyStatus',{
                    allocationIds : allocationIds,
                    policyIds : ids,
                    status : status
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('updateStatus') + this.$t('success'));
                        this.queryMyPolicyList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection (selection) {
                this.selectedRow = selection;
                this.canBatchOperate(selection);
            },
            /**
             *  批量删除
             */
            batchDel (data) {
                if (data) {
                    if (data.auditStatus !== 'rejected' && data.auditStatus !== 'not_enabled') return;
                    let ids = data.id;
                    this.delUnits = data.name;
                    this.$refs.delModal.show({
                        title : this.$t('delete'),
                        confirmCallback : () => {
                            this.deletePolicy(ids);
                        }
                    });
                } else {
                    let ids = this.selectedRow.map(item => item.id).join(',');
                    this.delUnits = this.selectedRow.map(item => item.name).join(',');
                    this.$refs.delModal.show({
                        title : this.$t('deleteBatch'),
                        confirmCallback : () => {
                            this.deletePolicy(ids);
                        }
                    });
                }
            },
            /**
             * 删除销售政策
             * @param ids
             */
            deletePolicy ( ids ) {
                ajax.post('deletePolicy',{
                    policyIds : ids
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('success') + this.$t('delete'));
                        this.queryMyPolicyList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 判断当前选中的销售政策列表能否进行批量操作
             * @param data
             */
            canBatchOperate (data) {
                this.disenable = false;
                this.passable = false;
                this.rebuttable = false;
                this.deletable = false;
                this.openable = false;
                this.isDisabled = true;
                this.auditable = false;
                if (data.length > 0) {
                    let auditStatus = data[0].auditStatus,
                        status = true;

                    for (let i = 1,len = data.length; i < len; i++) {
                        //若选中的行中有一行的审核状态值于第一个不同，则不允许批量操作
                        if (data[i].auditStatus !== auditStatus) {
                            status = false;
                            break;
                        }
                    }
                    if (status) {
                        this.isDisabled = false;
                        switch (auditStatus) {
                            //选中的行都是 已启用 状态 => 可禁用
                            case 'enabled':
                                this.disenable = true;
                                break;
                            //选中的行都是 审核中 状态 => 可审核通过、可驳回
                            case 'auditing':
                                this.passable = true;
                                this.rebuttable = true;
                                break;
                            //选中的行都是 已驳回 状态 => 可删除、可提交审核
                            case 'rejected':
                                this.deletable = true;
                                this.auditable = true;
                                break;
                            //选中的行都是 未启用 状态 => 可提交审核、可删除
                            case 'not_enabled':
                                this.auditable = true;
                                this.deletable = true;
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .my-defined-policy-list {
        .btn-wrap{
            height: 58px;
            line-height: 56px;
            padding: 0px 30px;
            @include clearfix();

            /deep/ .ivu-btn {
                min-width: 88px;
                margin-right: 7px;
            }

            /deep/ .ivu-input-wrapper{
                width: 280px;
                margin-right: 15px;
            }

            /deep/ .ivu-input{
                font-size: $font_size_14px;
            }

            /deep/ .ivu-select{
                width: 280px;
            }

            /deep/ .el-dropdown{
                line-height: 29px;
                color: $color_blue;
                border: 1px solid $color_blue;
                padding: 0 15px;
                border-radius: 4px;
                cursor: pointer;
            }

            .float-right{
                float: right;
            }

            .tips{
                font-size: $font_size_12px;
                color: $color_yellow;
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

        .content-text {
            margin: 0 15px;
        }

        .yellow-label{
            word-break:break-all;
            color: $color_yellow;
        }
    }
</style>
