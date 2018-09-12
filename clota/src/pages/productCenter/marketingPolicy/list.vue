<!--
内容：销售政策 - 我定义的销售政策/分销给我的销售政策
作者：
日期：
-->

<template>
    <div class="marketing-policy">

        <div class="tabs-wrap">
            <Tabs :animated="false" :value="tabsName" @on-click="changeTab">
                <TabPane :label="$t('mySalePolicy')" name="created"></TabPane><!--我定义的销售政策-->
                <!--<TabPane :label="$t('distributeSalePolicy')" name="cancellation"></TabPane>&lt;!&ndash;分销给我的销售政策&ndash;&gt;-->
            </Tabs>
        </div>

        <div class="btn-wrap" v-if="tabsName === 'created'">
            <Button type="primary" @click="addPolicy">+ {{$t('addSalePolicy')}}</Button>
            <Button type="error"
                    :disabled="selectedRow.length > 0 ? false : true"
                    @click="batchDel">{{$t('batchOperate')}}</Button>
            <!--<el-dropdown @command="handleCommand">-->
                <!--<span class="el-dropdown-link">-->
                    <!--{{$t('batchOperate')}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                <!--</span>-->
                <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item v-for="(item,index) in dropdownList"-->
                                      <!--:key="index"-->
                                      <!--:command="item.value">-->
                        <!--{{$t(item.name)}}-->
                    <!--</el-dropdown-item>-->
                <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
        </div>

        <!--暂时隐藏-->
        <div class="btn-wrap" v-if="tabsName === 'cancellation'">
            <span>{{$t('scenePlace')}}：</span>
            <Select v-model="queryParams.scene" @on-change="queryDistPolicyList"> <!--所属景区：-->
                <Option v-for="(item,index) in enumData.scene" :key="index"
                        :value="item.name">{{$t(item.desc)}}
                </Option>
            </Select>
            <div class="float-right">
                <Input v-model.trim="queryParams.keyWord"
                       :placeholder="$t('inputField',{field: $t('salePolicyName')})"/>
                <Button type="primary" @click="queryDistPolicyList">{{$t("query")}}</Button>
            </div>
        </div>

        <!--我定义的销售政策-->
        <table-com
            v-if="tabsName === 'created'"
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
            <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :filters="filterList"
                :filter-method="filterHandler"
                filter-placement="bottom-end"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <div>
                        <span v-if="scope.row.status === '已启用'" class="status-recharge pass">{{$t('startingUse')}}</span><!--已启用-->
                        <span v-if="scope.row.status === '审核中'" class="status-recharge reject">{{$t('checking')}}</span><!--审核中-->
                        <span v-if="scope.row.status === '已驳回'" class="status-recharge pending">{{$t('rejected')}}</span><!--已驳回-->
                        <span v-if="scope.row.status === '未启用'" class="status-recharge pending">{{$t('unStarting')}}</span><!--未启用-->
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

        <!--分销给我的销售政策--暂时隐藏-->
        <table-com
            v-if="tabsName === 'cancellation'"
            :ofsetHeight="170"
            :show-pagination="true"
            :column-data="distributePolicyHead"
            :table-data="distPolicyData"
            :total-count="dTotal"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            @query-data="queryDistPolicyList">
            <el-table-column
                slot="column5"
                slot-scope="row"
                fixed="right"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li class="normal">{{$t('check')}}</li><!--查看-->
                        <li class="normal">{{$t('distribution')}}</li><!--分销-->
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
                               @close-modal="queryMyPolicyList">
        </add-sale-policy-modal>

    </div>
</template>
<script type="text/ecmascript-6">

    import tableCom from '@/components/tableCom/tableCom.vue';
    import delModal from '@/components/delModal/index.vue';
    import addSalePolicyModal from './components/addSalePolicyModal.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import {myPolicyHead, distributePolicyHead} from '../policyConfig';
    import ajax from '@/api/index';

    export default {
        components: {
            tableCom,
            delModal,
            addSalePolicyModal,
        },
        props: {},
        data() {
            return {
                //当前tap值
                tabsName: 'created',
                // 表格表头字段名
                myPolicyHead: myPolicyHead,
                distributePolicyHead: distributePolicyHead,
                // 列表数据
                myPolicyData: [],
                distPolicyData: [],
                // 获取我的销售政策列表数据请求参数
                myPolicyParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                // 获取分销列表数据的请求参数
                queryParams: {
                    scene: '',
                    keyWord: '',
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
                    { name: 'check', value: 'check' },//审核
                    { name: 'up', value: 'ip' },//上架
                    { name: 'down', value: 'down' },//下架
                    { name: 'delete', value: 'delete' },//删除
                ],
            }
        },
        computed: {},
        created() {
            this.queryDistPolicyList();
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

            // 查询我定义的销售政策列表
            queryMyPolicyList() {
                this.myPolicyData = [
                    {
                        'id': '00002103965',
                        'productCode': '星火旅行社1',
                        'productName': '票内业态',
                        'productDesc': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'sellingOrg': '野生动物园',
                        'status': '已启用',
                        'updateTime': '2018-08-20 15:31:00',
                    },{
                        'id': '00002103965',
                        'productCode': '星火旅行社2',
                        'productName': '票内业态',
                        'productDesc': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'sellingOrg': '冰雪世界',
                        'status': '已启用',
                        'updateTime': '2018-06-01 15:31:00',
                    },{
                        'id': '00002103965',
                        'productCode': '星火旅行社3',
                        'productName': '票内业态',
                        'productDesc': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'sellingOrg': '野生动物园',
                        'status': '已启用',
                        'updateTime': '2018-04-17 15:31:00',
                    },{
                        'id': '00002103965',
                        'productCode': '星火旅行社4',
                        'productName': '票内业态',
                        'productDesc': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'sellingOrg': '冰雪世界',
                        'status': '已启用',
                        'updateTime': '2018-03-17 15:31:00',
                    },

                ];
                this.mTotal = this.myPolicyData.length;
            },

            // 查询分销给我的销售政策列表
            queryDistPolicyList() {
                this.distPolicyData = [
                    {
                        'id': '00002103965',
                        'productCode': '星火旅行社1',
                        'productName': '票内业态',
                        'productDesc': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'sellingOrg': '野生动物园',
                        'status': '已启用',
                        'updateTime': '2018-08-20 15:31:00',
                    },{
                        'id': '00002103965',
                        'productCode': '星火旅行社2',
                        'productName': '票内业态',
                        'productDesc': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'sellingOrg': '冰雪世界',
                        'status': '已启用',
                        'updateTime': '2018-06-01 15:31:00',
                    },{
                        'id': '00002103965',
                        'productCode': '星火旅行社3',
                        'productName': '票内业态',
                        'productDesc': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'sellingOrg': '野生动物园',
                        'status': '已启用',
                        'updateTime': '2018-04-17 15:31:00',
                    },{
                        'id': '00002103965',
                        'productCode': '星火旅行社4',
                        'productName': '票内业态',
                        'productDesc': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'sellingOrg': '冰雪世界',
                        'status': '已启用',
                        'updateTime': '2018-03-17 15:31:00',
                    },

                ];
                this.dTotal = this.distPolicyData.length;
            },

            //新建销售政策
            addPolicy () {
                if(this.$refs.addSalePolicyModal){
                    this.$refs.addSalePolicyModal.show();
                }
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
                        this.deletePolicy(ids);
                    }
                });
            },
            /**
             * 删除票类
             * @param data
             */
            deletePolicy( data ) {
                ajax.post('deletePolicy',{
                    ids: data
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

            //点击dropdown回调
            handleCommand( item ) {
                console.log(item)
            },

            //查看详情
            viewDetail ( data ) {

            },


        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/base";

    .marketing-policy {

        .tabs-wrap{
            /deep/ .ivu-tabs-nav{
                margin-left: 30px;
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

            .float-right{
                float: right;
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
