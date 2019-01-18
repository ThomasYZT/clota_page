<template>
    <!--会员管理--储值管理--资金明细-->
    <div class="member-fund-account">
        <div class="breadcrumb-box" v-if="fromAccountStore">
            <bread-crumb-head
                :locale-router="'fundDetail'"
                :before-router-list="beforeRouterList">
            </bread-crumb-head>
        </div>
        <div class="fund-account-header">
            <Select v-model="queryParams.accountTypeId"
                    style="width:180px;margin-right: 5px"
                    :placeholder="$t('chooseAccountType')"
                    @on-change="queryList"><!--请选择账户类型-->
                <Option
                    v-for="item in accountList"
                    :value="item.id"
                    :key="item.id + Math.random()">
                    {{ item.accountName }}
                </Option>
            </Select>
            <Select v-model="queryParams.tradeType"
                    style="width:180px;margin-right: 5px"
                    :placeholder="$t('selectField', {msg: $t('transactionType')})"
                    @on-change="queryList"><!--请选择交易类型-->
                <Option
                    v-for="item in tradeType1"
                    :value="item.value"
                    :key="item.value">
                    {{ $t(item.label) }}
                </Option>
            </Select>
            <Input v-model.trim="queryParams.keyword"
                   :placeholder="$t('fundPlaceholder')"
                   :style="{width: lang === 'zh-CN' ? '240px' : '390px','margin-right' : '5px'}" /><!--请输入姓名、电话、会员编号-->
            <Button type="primary"
                    style="margin-right: 5px;"
                    @click="queryList">{{$t('query')}}</Button>
            <Button type="ghost" @click="reset">{{$t('reset')}}</Button>
        </div>
        <table-com
            v-if="tableShow"
            :key="$route.name"
            :ofsetHeight="fromAccountStore ? 160 : 110"
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
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t(scope.row['gender'])}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column4"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <!--{{scope.row['operationType'] === 'adjust_score' ? $t('adjustMoney') :  $t(scope.row['operationType'])}}-->
                    {{scope.row['operationType'] === 'adjust_score' ? $t('adjustMoney') :  $t(scope.row['evaluateType'])}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column5"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t(scope.row.accountTypeName) | contentFilter}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column6"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span :class="{'red-color' : scope.row.amount <= 0,'green-color' : scope.row.amount > 0}">
                        {{getTradeMoney(scope.row) | contentFilter}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column7"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span v-if="scope.row.accountTypeId === '1'">
                       {{scope.row.endingBalance | moneyFilter | contentFilter}}{{$t('yuan')}}
                    </span>
                    <span v-else>
                     {{scope.row.endingBalance | moneyFilter | contentFilter}}{{$t(scope.row.unit)}}
                    </span>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>
<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './fundDetailConfig';
    import ajax from '@/api/index.js';
    import { moneyTradeTypes } from '@/assets/js/constVariable.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import { mapGetters } from 'vuex';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            tableCom,
            breadCrumbHead
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'fundInfo',
                        router : {
                            name : 'fundInfo'
                        }
                    }
                ],
                // 查询数据
                queryParams : {
                    //账户id
                    accountTypeId : 'all',
                    //关键字
                    keyword : '',
                    //交易类型
                    tradeType : 'all',
                },
                // 表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                //表头配置
                columnData : columnData,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //账户类型列表
                accountList : [],
            };
        },
        methods : {
            /**
             * 查询资金交易明细
             */
            queryList () {
                let accountTypeIds = [];
                if (this.queryParams.accountTypeId === 'all') {
                    for (let i = 0,j = this.accountList.length; i < j; i++) {
                        if (this.accountList[i].id !== 'all') {
                            accountTypeIds.push(this.accountList[i].id);
                        }
                    }
                }
                ajax.post('queryOrgAccountChange',{
                    accountTypeIds : this.queryParams.accountTypeId === 'all' ? accountTypeIds.join(',') : this.queryParams.accountTypeId,
                    operType : this.queryParams.tradeType === 'all' ? '' : this.queryParams.tradeType,
                    startDate : '',
                    endDate : '',
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                    keyword : this.queryParams.keyword,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
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
                this.queryParams.accountTypeId = 'all';
                this.queryParams.tradeType = 'all';
                this.queryList();
            },
            /**
             * 查询账户类型
             */
            queryMemberAccountDefine () {
                ajax.post('queryMemberAccountDefine',{
                    accountType : 'charging',
                    pageNo : 1,
                    pageSize : 99999
                }).then(res => {
                    if (res.success) {
                        this.accountList = res.data ? res.data.data.filter(item => {
                            //如果是多账户可以显示除了默认账户外的其它账户
                            if (this.isMutipleAccount) {
                                //如果是售卖型会员卡，才可以显示开卡账户
                                if (this.cardIsSaling) {
                                    return true;
                                } else {
                                    return item.id !== '4';
                                }
                            } else {
                                //如果是售卖型会员卡，才可以显示开卡账户
                                if (this.cardIsSaling) {
                                    return item.id === '4' || item.id === '1';
                                } else {
                                    return item.id === '1';
                                }
                            }
                        }) : [];
                        this.accountList.unshift({
                            id : 'all',
                            accountName : this.$t('allAccount') // 全部账户
                        });
                    } else {
                        this.accountList = [];
                    }
                }).catch(() => {
                    this.accountList = [];
                });
            },
            /**
             * 获取路由信息
             * @param params
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0 && this.fromAccountStore) {
                    this.$set(this.queryParams,'accountTypeId',params.id);
                    this.queryParams.accountTypeId = params.id;
                } else {
                    this.$set(this.queryParams,'accountTypeId','all');
                }
            },
            /**
             * 获取本次交易金额
             * @param rowData
             */
            getTradeMoney (rowData) {
                let unit = '';
                let label = rowData.amount > 0 ? '+' : '';
                if (rowData.unit) {
                    unit = this.$t(rowData.unit);
                } else if (rowData.accountTypeId === '1') {
                    unit = this.$t('yuan'); // '元'
                }
                if (rowData.accountSubType === 'corpus') {
                    return `${this.$t('corpusAccount')}:${label}${rowData.amount}${unit}`; // 本金账户
                } else if (rowData.accountSubType === 'donate') {
                    return `${this.$t('presentAccount')}:${label}${rowData.amount}${unit}`; // 赠送账户
                } else {
                    return `${label}${rowData.amount}${unit}`;
                }
            }
        },
        created () {
            this.queryMemberAccountDefine();
        },
        beforeRouteLeave (to,from,next) {
            next();
        },
        computed : {
            //是否是从账户储值信息跳转过来的页面
            fromAccountStore () {
                return this.$route.name === 'fianceDetail';
            },
            ...mapGetters({
                lang : 'lang',
                memberConfigInfo : 'memberConfigInfo',
            }),
            //表格是否显示
            tableShow () {
                return this.queryParams.accountTypeId && this.accountList && this.accountList.length > 0;
            },
            //是否是售卖型会员卡
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否是多账户类型
            isMutipleAccount () {
                return this.memberConfigInfo && this.memberConfigInfo['accountPattern'] && this.memberConfigInfo['accountPattern'] === 'multiple';
            },
            //交易类型列表
            tradeType1 () {
                let result = moneyTradeTypes;
                if (!this.isMutipleAccount) {
                    result = result.filter(item => item.value !== 'to_cash');
                }
                if (this.cardIsSaling) {
                    return result;
                } else {
                    return result.slice(0,-1);
                }
            },
        },
        watch : {
            '$route' (newVal,oldVal) {
                if (newVal.name === 'fundDetail') {
                    this.$set(this.queryParams,'accountTypeId','all');
                    this.pageSize = 10;
                    this.pageNo = 1;
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-fund-account{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;
        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            background: $color_F4F6F8;
        }
        .fund-account-header{
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
        }
        .green-color{
            color: $color_green;
        }
        .red-color{
            color: $color_red;
        }
        .page-wrap{
            margin-top: 30px;
            text-align: center;
        }
    }
</style>
