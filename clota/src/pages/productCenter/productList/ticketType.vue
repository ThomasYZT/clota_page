<!--
内容：产品列表 - 票类
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
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            :column-check="true"
            @query-data="queryList"
            @selection-change="changeSelection">
            <el-table-column
                slot="column5"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <div class="tpl-content">{{scope.row.status}}</div>
                </template>
            </el-table-column>
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
    import {ticketTypeHead} from '../productConfig';

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
                // 表格表头字段名
                columnData: ticketTypeHead,
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
                        'sellingOrg': '是',
                        'status': '已启用',
                        'updateTime': '2018-04-17 15:31:00',
                    },{
                        'id': '00002103965',
                        'productCode': '星火旅行社1',
                        'productName': '票内业态',
                        'productDesc': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'sellingOrg': '是',
                        'status': '已启用',
                        'updateTime': '2018-04-17 15:31:00',
                    },{
                        'id': '00002103965',
                        'productCode': '星火旅行社1',
                        'productName': '票内业态',
                        'productDesc': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'sellingOrg': '是',
                        'status': '已启用',
                        'updateTime': '2018-04-17 15:31:00',
                    },{
                        'id': '00002103965',
                        'productCode': '星火旅行社1',
                        'productName': '票内业态',
                        'productDesc': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'sellingOrg': '是',
                        'status': '已启用',
                        'updateTime': '2018-04-17 15:31:00',
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
