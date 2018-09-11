<!--
内容：销售政策 - 我定义的销售政策/分销给我的销售政策
作者：
日期：
-->

<template>
    <div class="ticket-type">
        <div class="operation-box">
            <Button type="primary" @click="$router.push({name: 'addSmsTemplate'})">+ {{$t('add')}}</Button>
            <Button type="ghost">{{$t('设置')}}</Button>
            <Button type="error">{{$t('del')}}</Button>
        </div>

        <table-com
            :ofsetHeight="170"
            :show-pagination="true"
            :column-data="myPolicyHead"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            :column-check="true"
            :default-sort="{prop: 'updateTime', order: 'descending'}"
            @sort-change="handleSortChanged"
            @query-data="queryList"
            @selection-change="changeSelection">
            <el-table-column
                slot="column7"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="operate" @click="checkProductDetail(scope.row)">{{$t('check')}}</span><!--查看-->
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
                // 获取数据的请求参数
                queryParams: {
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
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            // 查询票类产品列表
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
             * 查看短信模板详情，并传入当前被操作的行数据
             * @param scopeRow - 行数据
             */
            checkSmsDetail(scopeRow) {
                this.$refs.checkTplModal.show({item: scopeRow});
            },
            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection(selection) {
                this.selectedRow = selection;
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
                    if (params.prop === 'updateTime'){
                        params.prop = 'update_time';
                    }

                    Object.assign(this.filterParam, { order: `${params.prop} ${order}` });
                    Object.assign(this.queryParams, this.filterParam);
                    this.queryParams.pageNo = 1;
                    this.queryList();
                }
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
                width: 88px;
                margin-right: 7px;
                &:nth-child(2) {
                    border-color: $color_blue;
                }
            }
        }
    }
</style>
