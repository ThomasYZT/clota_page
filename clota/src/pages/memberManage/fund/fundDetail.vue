<template>
    <!--会员管理--储值管理--资金明细-->
    <div class="member-fund-account">

        <div class="fund-account-header">
            <Select v-model="queryParams.accountTypeId"
                    style="width:180px"
                    placeholder="请选择账户类型">
                <Option
                    v-for="item in accountList"
                    :value="item.id"
                    :key="item.id">
                    {{ item.accountName }}
                </Option>
            </Select>
            <Select v-model="queryParams.tradeType"
                    style="width:180px"
                    placeholder="请选择交易类型">
                <Option
                    v-for="item in tradeType1"
                    :value="item.value"
                    :key="item.value">
                    {{ item.label }}
                </Option>
            </Select>
            <Input v-model="queryParams.keyword" placeholder="请输入姓名、电话、会员编号" style="width: 240px" />
            <Button type="primary" @click="queryList">查 询</Button>
            <Button type="ghost" @click="reset">重 置</Button>
        </div>
        <table-com
            v-if="tableShow"
            :ofsetHeight="110"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="pageNo"
            :page-size-d.sync="pageSize"
            :border="true"
            @query-data="queryList">
            <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t(scope.row['gender'])}}
                </template>
            </el-table-column>
            <!--<el-table-column-->
                <!--slot="column5"-->
                <!--slot-scope="row"-->
                <!--:label="row.title"-->
                <!--:width="row.width"-->
                <!--:min-width="row.minWidth">-->
                <!--<template slot-scope="scope">-->
                    <!--<div class="operation">-->
                        <!--<span class="span-blue" @click="toDetail(scope.row)">详情</span>-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </table-com>
        <!--<div class="table-wrap">-->
            <!--<el-table-->
                <!--:data="tableData"-->
                <!--:border="true"-->
                <!--max-height="450"-->
                <!--style="width: 100%">-->
                <!--<el-table-column-->
                    <!--prop="id"-->
                    <!--label="会员编码">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="name"-->
                    <!--label="会员姓名">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="mobile"-->
                    <!--label="手机号">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="sex"-->
                    <!--label="性别">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="level"-->
                    <!--label="交易类型">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="balance"-->
                    <!--label="本次交易金额"-->
                    <!--width="150">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span :class="scope.row.balance && scope.row.balance > 0 ? 'green-color' : 'red-color'">{{showNumFunc(scope.row.balance)}}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="send"-->
                    <!--label="本次储值赠送金额"-->
                    <!--width="150">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span :class="scope.row.send && scope.row.send > 0 ? 'green-color' : 'red-color'">{{showNumFunc(scope.row.send)}}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="balance"-->
                    <!--label="交易后账户余额 ">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="time"-->
                    <!--label="交易时间">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="recorder"-->
                    <!--label="操作人员记录">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span>{{scope.row.recorder || '-'}}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            <!--</el-table>-->
        <!--</div>-->
        <!--<div class="page-wrap" v-if="tableData.length > 0">-->
            <!--<el-pagination-->
                <!--@size-change="handleSizeChange"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="parseInt(queryParams.pageNo)"-->
                <!--:page-sizes="[10, 20, 50, 100]"-->
                <!--:page-size="parseInt(queryParams.pageSize)"-->
                <!--layout="total, sizes, prev, pager, next, jumper"-->
                <!--:total="parseInt(total)">-->
            <!--</el-pagination>-->
        <!--</div>-->


    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './fundDetailConfig';
    import ajax from '@/api/index.js';
    import {tradeType1} from '@/assets/js/constVariable.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            tableCom
        },
        data () {
            return {
                //交易类型列表
                tradeType1 : tradeType1,
                // 查询数据
                queryParams: {
                    //账户id
                    accountTypeId : '',
                    //关键字
                    keyword: '',
                    //交易类型
                    tradeType: 'all',
                },
                // 表格数据
                tableData: [],
                //总条数
                totalCount: 0,
                //表头配置
                columnData : columnData,
                //页码
                pageNo: 1,
                //每页条数
                pageSize : 10,
                //账户类型列表
                accountList : []
            }
        },
        methods: {
            /**
             * 显示数值正负
             * @param n
             */
            showNumFunc ( n ) {
                let num = n ? parseInt(n) : null;
                if (num && num > 0) {
                    return '+'+num
                } else if(num && num < 0) {
                    return num
                } else if(num === 0) {
                    return '0'
                } else {
                    return '-'
                }
            },

            /**
             * 查询资金交易明细
             */
            queryList () {
                ajax.post('queryOrgAccountChange',{
                    accountTypeId : this.queryParams.accountTypeId,
                    operType : 'adjustment',
                    startDate : '',
                    endDate : '',
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                    keyword : this.queryParams.keyword,
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
                });
            },
            /**
             * 重置查询条件
             */
            reset () {
                this.queryParams.keyword = '';
                this.queryParams.accountTypeId = '';
                this.queryParams.tradeType = 'all';
                this.queryList();
            },
            /**
             * 查询账户类型
             */
            queryMemberAccountDefine () {
                ajax.post('queryMemberAccountDefine',{
                    accountType: 'charging',
                    pageNo: 1,
                    pageSize: 99999
                }).then(res => {
                    if(res.success){
                        this.accountList = res.data.data ? res.data.data : [];
                        if(this.accountList.length > 0){
                            this.queryParams.accountTypeId = this.accountList[0].id;
                        }
                    }else{
                        this.accountList = [];
                    }
                }).catch(() => {
                    this.accountList = [];
                })
            },
            /**
             * 获取路由信息
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    this.queryParams.accountTypeId = params.id;
                }
            }

        },
        created () {
            this.queryMemberAccountDefine();
        },
        computed : {
            //表格是否显示
            tableShow () {
                return this.queryParams.accountTypeId;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-fund-account{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .fund-account-header{
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
        }

        .table-wrap{

            .green-color{
                color: $color_green;
            }

            .red-color{
                color: $color_red;
            }

        }

        .page-wrap{
            margin-top: 30px;
            text-align: center;
        }
    }

</style>

