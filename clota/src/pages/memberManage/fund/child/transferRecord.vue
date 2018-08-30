<template>
    <!--会员管理--储值管理--财务管理--转账记录-->
    <div class="member-transfer-record">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :locale-router="'transferRecord'"
                :before-router-list="beforeRouterList"><!--转账记录-->
            </bread-crumb-head>
        </div>

        <div class="transfer-content">
            <div class="filter-wrap">
                <Select v-model="queryParams.tradeType" style="width:180px;margin-right: 10px;">
                    <Option v-for="item in tradeType"
                            :value="item.value"
                            :key="item.value">
                        {{ item.label }}
                    </Option>
                </Select>
                <Date-picker
                    style="width:180px;margin-right: 10px;"
                    type="date"
                    v-model="queryParams.startTime"
                    :placeholder="$t('selectField', {msg: $t('startDate')})"><!--请选择开始日期-->
                </Date-picker>
                <Date-picker
                    style="width:180px;margin-right: 10px;"
                    type="date"
                    v-model="queryParams.endTime"
                    :placeholder="$t('selectField', {msg: $t('endDate')})"><!--请选择结束日期-->
                </Date-picker>
                <Input v-model="queryParams.keyword"
                       placeholder="请输入单位名称"
                       style="width: 240px;margin-right: 10px;" />
                <Button type="primary" @click="queryList">{{$t('query')}}</Button>
                <Button type="ghost" @click="reset">{{$t('reset')}}</Button>
            </div>
            <div class="table-wrap">
                <table-com
                    :ofsetHeight="170"
                    :show-pagination="true"
                    :column-data="columnData"
                    :table-data="tableData"
                    :total-count="totalCount"
                    :page-no-d.sync="pageNo"
                    :page-size-d.sync="pageSize"
                    :border="true"
                    @query-data="queryList">
                    <el-table-column
                        slot="column1"
                        slot-scope="row"
                        show-overflow-tooltip
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <span :class="scope.row['operType'] === 'transfer_in' ? 'green-color' : 'red-color'">
                                {{scope.row['operType'] === 'transfer_in' ? '+' : '-'}}{{scope.row.amount | moneyFilter | contentFilter}}元
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column2"
                        slot-scope="row"
                        show-overflow-tooltip
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(scope.row['operType'])}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column3"
                        show-overflow-tooltip
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(scope.row['fee']) | moneyFilter}}元
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>

    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './transferRecordConfig';
    import ajax from '@/api/index.js';
    import {tradeType} from '@/assets/js/constVariable.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';

    export default {
        components: {
            tableCom,
            breadCrumbHead
        },
        data () {
            return {
                //表头配置
                columnData : columnData,
                //总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                // 查询数据
                queryParams: {
                    //关键字
                    keyword: '',
                    //交易类型
                    tradeType: 'all',
                    //开始时间
                    startTime: '',
                    //结束时间
                    endTime: '',
                },
                //交易类型列表
                tradeType : tradeType,
                // 表格数据
                tableData: [],
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('financialManagement'),
                        router: {
                            name: 'transfer'
                        }
                    }
                ],
            }
        },
        methods: {

            /**
             * 查询转账记录
             */
            queryList () {
                ajax.post('queryChangeList',{
                    operType : this.queryParams.tradeType !== 'all' ? this.queryParams.tradeType : '',
                    startDate : this.queryParams.startTime ? this.queryParams.startTime.format('yyyy-MM-dd 00:00:00') : '',
                    endDate : this.queryParams.endTime ? this.queryParams.endTime.format('yyyy-MM-dd 23:59:59') : '',
                    keyword : this.queryParams.keyword,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                }).catch(err => {
                    this.tableData = [];
                    this.totalCount = 0;
                })
            },
            /**
             * 重置查询条件
             */
            reset () {
                this.queryParams.keyword = '';
                this.queryParams.tradeType = 'all';
                this.queryParams.startTime = '';
                this.queryParams.endTime = '';
                this.queryList();
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-transfer-record{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;
        position: relative;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .transfer-content{

            .filter-wrap{
                height: 60px;
                line-height: 60px;
                padding: 0 30px;
            }

            .table-wrap{

                .green-color{
                    color: $color_green;
                }

                .red-color{
                    color: $color_red;
                }

                /deep/ .el-table th:first-child .cell,
                /deep/ .el-table td:first-child .cell{
                    padding-left: 30px!important;
                }

            }
        }

    }
</style>


