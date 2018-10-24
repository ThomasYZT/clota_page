<!--
内容：销售政策 - 我定义的销售政策/分销给我的销售政策
作者：
日期：
-->

<template>
    <div class="marketing-policy">

        <!--tab栏 仅非合作伙伴可见-->
        <div class="tabs-wrap" v-if="role !== 'partner'">
            <Tabs :animated="false" :value="tabsName" @on-click="changeTab">
                <TabPane :label="$t('mySalePolicy')" name="created"></TabPane><!--我定义的销售政策-->
                <!--仅公司不可见-->
                <TabPane :label="$t('distributeSalePolicy')"
                         name="cancellation"
                         v-if="role !== 'company'"></TabPane><!--分销给我的销售政策-->
            </Tabs>
        </div>

        <!--按钮栏 仅非合作伙伴可见-->
        <div class="btn-wrap" v-if="tabsName === 'created' && role !== 'partner'">
            <Button type="primary" @click="addPolicy">+ {{$t('addSalePolicy')}}</Button>
            <Button type="error"
                    v-if="selectedRow.length < 1"
                    disabled>{{$t('batchOperate')}}<i class="el-icon-arrow-down el-icon--right"></i></Button>
            <el-dropdown @command="handleCommand" trigger="click" v-else>
                <span class="el-dropdown-link">
                    {{$t('batchOperate')}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in dropdownList"
                                      :key="index"
                                      :command="item.value">
                        {{$t(item.name)}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span class="tips float-right">{{$t('defaultPolicyType')}}</span><!--业态目前为默认ticket-->
        </div>

        <!--表格搜索栏 仅合作伙伴、景区可见--分销给我的销售政策列表-->
        <div class="btn-wrap" v-if="(role === 'partner' || role === 'scenic') && tabsName === 'cancellation'">
            <span>{{$t('scenePlace')}}：</span>
            <Select v-model="chooseOrgId" @on-change="queryDistPolicyList"> <!--所属景区：-->
                <Option v-for="(item,index) in enumData.scene" :key="index"
                        :value="item.id">{{$t(item.orgName)}}
                </Option>
            </Select>
            <div class="float-right">
                <Input v-model.trim="keywords"
                       :placeholder="$t('inputField',{field: $t('salePolicyName')})"/>
                <Button type="primary" @click="queryDistPolicyList">{{$t("query")}}</Button>
            </div>
        </div>

        <!--我定义的销售政策-->
        <table-com
            v-if="tabsName === 'created' && role !== 'partner'"
            :ofsetHeight="170"
            :show-pagination="true"
            :column-data="myPolicyHead"
            :table-data="myPolicyData"
            :total-count="mTotal"
            :page-no-d.sync="myPolicyParams.pageNo"
            :page-size-d.sync="myPolicyParams.pageSize"
            :border="true"
            :column-check="true"
            @query-data="queryMyPolicyList"
            @selection-change="changeSelection">
            <!--:filters="filterList"-->
               <!--:filter-method="filterHandler"-->
               <!--filter-placement="bottom-end"-->
           <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <div>
                        <span v-if="scope.row.auditStatus === 'enabled'" class="status-recharge pass">{{$t('startingUse')}}</span><!--已启用-->
                        <span v-if="scope.row.auditStatus === 'auditing'" class="status-recharge reject">{{$t('checking')}}</span><!--审核中-->
                        <span v-if="scope.row.auditStatus === 'rejected'" class="status-recharge pending">{{$t('rejected')}}</span><!--已驳回-->
                        <span v-if="scope.row.auditStatus === 'not_enabled'" class="status-recharge pending">{{$t('unStarting')}}</span><!--未启用-->
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
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--分销给我的销售政策-->
        <table-com
            v-if="tabsName === 'cancellation'"
            :ofsetHeight="170"
            :show-pagination="true"
            :column-data="distributePolicyHead"
            :table-data="distPolicyData"
            :total-count="dTotal"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            @query-data="queryDistPolicyList"
            :border="true">
            <el-table-column
                slot="column5"
                slot-scope="row"
                fixed="right"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li class="normal" @click="check(scope.row)">{{$t('check')}}</li><!--查看-->
                        <li class="normal" @click="distribute(scope.row)">{{$t('distribution')}}</li><!--分销-->
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--删除模态框-->
        <del-modal ref="delModal">
            <span class="content-text">{{$t('isDoing')}}{{$t('delete')}}：<span class="yellow-label">{{delUnits}}</span></span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>

        <!--新建销售政策-->
        <add-sale-policy-modal ref="addSalePolicyModal"
                               :list="policyTypeList"
                               @close-modal="queryMyPolicyList">
        </add-sale-policy-modal>

        <!-- 查看分销政策 分销给我的销售政策 -->
        <check-sale-policy-modal ref="checkSalePolicyModal"></check-sale-policy-modal>

        <!-- 分销 -->
        <distribution-modal @complete="distributeComplete($event)"
                            ref="distributionModal"f></distribution-modal>

    </div>
</template>
<script type="text/ecmascript-6">

    import tableCom from '@/components/tableCom/tableCom.vue';
    import delModal from '@/components/delModal/index.vue';
    import addSalePolicyModal from './components/addSalePolicyModal.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import checkSalePolicyModal from './components/checkSalePolicyModal';
    import distributionModal from './components/distributionModal'
    import {mapGetters} from 'vuex';
    import {myPolicyHead, distributePolicyHead} from '../policyConfig';
    import ajax from '@/api/index';

    export default {
        components: {
            tableCom,
            delModal,
            addSalePolicyModal,
            checkSalePolicyModal,
            distributionModal
        },
        props: {},
        data() {
            return {
                //当前账号角色
                role: '',
                //当前tap值
                tabsName: 'created',
                // 表格表头字段名
                myPolicyHead: myPolicyHead,
                distributePolicyHead: distributePolicyHead,
                // 列表数据
                myPolicyData: [],
                distPolicyData: [],
                //关键字
                keywords: '',
                //所属景区
                chooseOrgId: '',
                // 获取我的销售政策列表数据请求参数
                myPolicyParams: {
                    selectType: 'from',
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                // 获取分销列表数据的请求参数
                queryParams: {
                    selectType: 'to',
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                // 数据总条数
                mTotal: 0,
                dTotal: 0,
                // 已勾选的删除数据
                selectedRow: [],
                // 删除数据显示
                delUnits: '',
                // 枚举数据
                enumData: {
                    scene: [],
                },
                // 筛选列表
                filterList: [
                    {text: '已启用', value: '已启用'},
                    {text: '未启用', value: '未启用'},
                ],
                // 下拉列表数据
                dropdownList: [
                    { name: 'checked', value: 'checked' },//审核
                    { name: 'up', value: 'up' },//上架
                    { name: 'down', value: 'down' },//下架
                    { name: 'delete', value: 'delete' },//删除
                ],
                // 业态类型数据
                policyTypeList: [],
            }
        },
        computed: {
            ...mapGetters([
                'manageOrgs'
            ])
        },
        created() {

            //设置当前角色
            this.role = this.manageOrgs.nodeType;
            if(this.role === 'partner') {
                this.tabsName = 'cancellation';
            }
            if(this.role === 'partner' || this.role === 'scenic') {
                this.queryDistPolicyList();
            }
            //获取所有销售政策业态类型
            this.getAllPolicyType();

            //获取所属景区列表
            this.queryPolicyFromScenic();
        },
        mounted() {
        },
        watch: {},
        methods: {

            /**
             * 切换tab
             * @param name
             */
            changeTab (name) {
                this.tabsName = name;
            },

            // 获取所有销售政策业态类型
            getAllPolicyType () {
                ajax.post('getAllPolicyType', {}).then(res => {
                    if(res.success){
                        this.policyTypeList = res.data || [];
                    } else {
                        this.policyTypeList = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            // 查询我定义的销售政策列表
            queryMyPolicyList() {
                ajax.post('queryPolicy', {
                    ...this.myPolicyParams,
                    keyword: this.keywords,
                    chooseOrgId: this.chooseOrgId
                }).then(res => {
                    this.selectedRow = [];
                    if(res.success){
                        this.myPolicyData = res.data.data || [];
                        this.mTotal = res.data.totalRow || 0;
                    } else {
                        this.myPolicyData = [];
                        this.mTotal = 0;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            // 查询分销给我的销售政策列表
            queryDistPolicyList() {
                ajax.post('queryPolicy', {
                    ...this.queryParams,
                    keyword: this.keywords,
                    chooseOrgId: this.chooseOrgId
                }).then((res) => {
                    this.dTotal = res.data.totalRow || 0;
                    this.distPolicyData = res.data ? res.data.data : [];
                });
            },

            //获取所属景区列表
            queryPolicyFromScenic() {
                ajax.post('queryPolicyFromScenic',{
                    selectType: 'to',
                    pageNo: 1,
                    pageSize: 999
                }).then(res => {
                    if(res.success) {
                        this.enumData.scene = res.data;
                    }
                })
            },

            // 新建销售政策
            addPolicy () {

                //业态目前为默认ticket
                /* if(this.$refs.addSalePolicyModal){
                    this.$refs.addSalePolicyModal.show();
                }*/

                this.$router.push({
                    name: 'editSalePolicy',
                    params: {
                        type: 'add',
                        productType: 'ticket',
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
                this.delUnits = this.selectedRow.map(item => item.name).join(',');
                console.log(ids);
                this.$refs.delModal.show({
                    title : this.$t('deleteBatch'),
                    confirmCallback : () => {
                        this.deletePolicy(ids);
                    }
                });
            },
            /**
             * 删除票类
             * @param ids
             */
            deletePolicy( ids ) {
                ajax.post('deletePolicy',{
                    policyIds: ids
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('success') + this.$t('delete'));
                        this.queryMyPolicyList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
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

            // 点击dropdown回调 (checked-enabled审核,up-enabled上架,down-not_enabled下架,delete-删除)
            handleCommand( item ) {
                console.log(item);
                if(item){
                    let ids = this.selectedRow.map(item => item.id).join(',');
                    switch (item) {
                        case 'checked' :
                            this.modifyPolicyStatus(ids, 'auditing');
                            break;
                        case 'up' :
                            this.modifyPolicyStatus(ids, 'enabled');
                            break;
                        case 'down' :
                            this.modifyPolicyStatus(ids, 'not_enabled');
                            break;
                        case 'delete' :
                            this.batchDel();
                            break;
                    }
                }
            },

            // 更新销售政策状态
            modifyPolicyStatus ( ids, status ) {
                ajax.post('modifyPolicyStatus',{
                    policyIds: ids,
                    status: status
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('updateStatus') + this.$t('success'));
                        this.queryMyPolicyList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            // 查看政策详情 -- 自己定义的分销政策
            viewDetail ( data ) {
                this.$router.push({
                    name: 'salePolicyDetail',
                    params: {
                        info: data
                    }
                })
            },
            /**
             * 查看分销详情 -- 分配给我的分销政策
             */
            check(data) {
                this.$router.push({
                    name: 'distributeDetail',
                    params: {
                        listItem: data
                    }
                })
                //this.$refs.checkSalePolicyModal.toggle(data);
            },
            /**
             *  分销操作
             */
            distribute(data) {
                this.$refs.distributionModal.toggle(data);
            },
            /**
             * 刷新页面
             */
            refresh() {
                if(this.tabsName === 'cancellation') {
                    this.queryDistPolicyList();
                } else {
                    this.queryMyPolicyList();
                }
            },
            /**
             * 分销成功
             */
            distributeComplete(data) {
                this.$router.push({
                    name: 'distributeDetail',
                    params: {
                        listItem: data
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/base";

    .marketing-policy {

        .tabs-wrap{
            /deep/ .ivu-tabs-nav{
                margin-left: 30px;
                font-size: $font_size_16px;
            }
        }

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

    }

    .yellow-label{
        color: $color_yellow;
    }

    .red-label {
        color: $color_red;
    }
</style>
