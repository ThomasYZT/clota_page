<!--
内容：销售政策 - 我定义的销售政策/分销给我的销售政策
作者：
日期：
-->

<template>
    <div class="marketing-policy">

        <div class="tabs-wrap">
            <Tabs :animated="false" :value="tabsName" @on-click="changeTab">
                <TabPane :label="$t('我定义的销售政策')" name="created"></TabPane>
                <TabPane :label="$t('分销给我的销售政策')" name="cancellation"></TabPane>
            </Tabs>
        </div>

        <div class="btn-wrap" v-if="tabsName === 'created'">
            <Button type="primary">+ {{$t('add')}}</Button>
            <Button type="error"
                    :disabled="selectedRow.length > 0 ? false : true"
                    @click="batchDel">{{$t('del')}}</Button>
        </div>

        <div class="btn-wrap" v-if="tabsName === 'cancellation'">
            <!--所属景区：-->
            <span>所属景区：</span>
            <Select v-model="queryParams.scene" @on-change="queryList">
                <Option v-for="(item,index) in enumData.scene" :key="index"
                        :value="item.name">{{$t(item.desc)}}
                </Option>
            </Select>
            <div class="float-right">
                <Input v-model.trim="queryParams.keyWord"
                       :placeholder="$t('请输入销售政策名称')"/>
                <Button type="primary" @click="queryList">{{$t("query")}}</Button>
            </div>
        </div>

        <!--我定义的销售政策-->
        <table-com
            v-if="tabsName === 'created'"
            :ofsetHeight="170"
            :show-pagination="true"
            :column-data="myPolicyHead"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            :column-check="true"
            @query-data="queryList"
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
                        <li class="normal" @click="checkProductDetail(scope.row)">{{$t('check')}}</li><!--查看-->
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
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            @query-data="queryList">
            <el-table-column
                slot="column5"
                slot-scope="row"
                fixed="right"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li class="normal" @click="checkProductDetail(scope.row)">{{$t('check')}}</li><!--查看-->
                        <li class="normal" @click="checkProductDetail(scope.row)">{{$t('分销')}}</li><!--分销-->
                    </ul>
                </template>
            </el-table-column>
        </table-com>

    </div>
</template>
<script type="text/ecmascript-6">

    import tableCom from '@/components/tableCom/tableCom.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import {myPolicyHead, distributePolicyHead} from '../policyConfig';

    export default {
        components: {tableCom},
        props: {},
        data() {
            return {
                //当前tap值
                tabsName: 'created',
                // 获取数据的请求参数
                queryParams: {
                    scene: '',
                    keyWord: '',
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    order: 'update_time desc',
                },
                // 表格表头字段名
                myPolicyHead: myPolicyHead,
                distributePolicyHead: distributePolicyHead,
                // 列表数据
                tableData: [],
                // 数据总条数
                totalCount: 0,
                // 已勾选的模板
                selectedRow: [],
                // 枚举数据
                enumData: {
                    scene: [],
                },
                // 筛选列表
                filterList: [
                    {text: '已启用', value: '已启用'},
                    {text: '未启用', value: '未启用'},
                ],
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {

            // 查询列表
            queryList() {
                this.tableData = [
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
                this.totalCount = this.tableData.length;
            },

            /**
             * 切换tab
             * @param name
             */
            changeTab (name) {
                this.tabsName = name;
            },

            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection(selection) {
                this.selectedRow = selection;
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
                width: 88px;
                margin-right: 7px;
            }

            /deep/ .ivu-input-wrapper{
                width: 280px;
                margin-right: 15px;
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
</style>
