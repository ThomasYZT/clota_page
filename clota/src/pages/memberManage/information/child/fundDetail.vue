<template>
    <!--个人资金交易明细-->
    <div class="member-fund-detail">

        <bread-crumb-head style="padding: 0 30px;"
                          :before-router-list="beforeRouterList"
                          :locale-router="localeRouter">
        </bread-crumb-head>

        <div class="fund-detail-content">
            <div class="filter-wrap">
                <Select v-model="queryParams.operType"
                        :style="{ 'width' : lang === 'zh-CN' ? '180px' : '200px' }"
                        @on-change="filterDealList"
                        :placeholder="$t('selectField', {msg: ''})">
                    <Option v-for="item in type"
                            class="overflow-tip-list"
                            :value="item.value"
                            v-w-title="$t(item.label)"
                            :key="item.value">{{ $t(item.label) }}</Option>
                </Select>
                <Date-picker
                    type="date"
                    v-model="queryParams.startDate"
                    :editable="false"
                    :style="{ 'width' : lang === 'zh-CN' ? '180px' : '256px' }"
                    format="yyyy-MM-dd"
                    :placeholder="$t('selectField', {msg: $t('startDate')})"
                    @on-change="filterDealList()">
                </Date-picker><!--请选择开始日期-->
                <Date-picker
                    type="date"
                    v-model="queryParams.endDate"
                    :editable="false"
                    :style="{ 'width' : lang === 'zh-CN' ? '180px' : '256px' }"
                    format="yyyy-MM-dd"
                    :placeholder="$t('selectField', {msg: $t('endDate')})"
                    @on-change="filterDealList()"><!--请选择结束日期-->
                </Date-picker>
                <div class="btn-wrap">
                    <Button type="primary" class="ivu-btn-65px" @click="filterDealList()">{{$t('query')}}</Button><!--查询-->
                    <Button type="ghost" class="ivu-btn-65px" @click="resetQueryParams()">{{$t('reset')}}</Button><!--重置-->
                </div>
            </div>
            <div class="other-info-line">
                <a :href="downloadUrl">
                    <Button type="primary">{{$t('exporting')}}</Button><!--导出-->
                </a>
                <ul class="total-amount">
                    <li class="amount-record">
                        <span class="key-label">{{$t('colonSetting', { key : $t('hasPayed') })}}</span>
                        <span class="value-label">{{disbursement | moneyFilter | contentFilter}} {{$t(accountUnit)}}</span>
                    </li>
                    <li class="amount-record">
                        <span class="key-label">{{$t('colonSetting', { key : $t('storeTotalValue') })}}</span>
                        <span class="value-label">{{storeAmount | moneyFilter | contentFilter}} {{$t(accountUnit)}}</span>
                    </li>
                </ul>
            </div>
            <table-com
                v-if="queryParams.accountTypeIds"
                :ofsetHeight="210"
                :show-pagination="true"
                :column-data="columnData"
                :table-data="tableData"
                :total-count="totalCount"
                :page-no-d.sync="queryParams.pageNo"
                :page-size-d.sync="queryParams.pageSize"
                :border="true"
                @query-data="queryList">
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="green-color" v-if="scope.row.amount > -1">
                            +{{ scope.row.amount | moneyFilter | contentFilter }} {{(scope.row.accountTypeId === '1' || scope.row.accountTypeId === '4') ? $t('yuan') : $t(scope.row.unit)}}
                        </span>
                        <span class="red-color" v-if="scope.row.amount < 0">
                            {{ scope.row.amount }} {{(scope.row.accountTypeId === '1' || scope.row.accountTypeId === '4') ? $t('yuan') : $t(scope.row.unit)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="blue-color"
                              v-if="scope.row.operationType === 'adjust_money'"
                              @click="viewDetail(scope.row)">
                            {{ $t('adjustMoney') }}
                        </span>
                        <span v-else>{{ $t(scope.row.evaluateType) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column2"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span v-if="scope.row.accountSubType === 'corpus'"><!--本金-->
                            {{$t('principal')}}：{{ scope.row.amount | moneyFilter | contentFilter }}
                            {{(scope.row.accountTypeId === '1' || scope.row.accountTypeId === '4') ? $t('yuan') : $t(scope.row.unit)}}
                        </span>
                        <span v-else-if="scope.row.accountSubType === 'donate'"><!--赠送-->
                            {{$t('sendGift')}}：{{ scope.row.amount  | moneyFilter | contentFilter }}
                            {{(scope.row.accountTypeId === '1' || scope.row.accountTypeId === '4') ? $t('yuan') : $t(scope.row.unit)}}
                        </span>
                        <span v-else>{{ scope.row.amount  | moneyFilter | contentFilter }}
                            {{(scope.row.accountTypeId === '1' || scope.row.accountTypeId === '4') ? $t('yuan') : $t(scope.row.unit)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span>{{ scope.row.endingBalance | moneyFilter | contentFilter }}
                            {{scope.row.accountTypeId === '1' ? $t('yuan') : $t(scope.row.unit)}}</span>
                    </template>
                </el-table-column>
            </table-com>
        </div>

        <!--查看手动修改账户的资金交易明细，信息modal-->
        <modify-detail-modal ref="modifyDetail" :manual-data="currManualData"></modify-detail-modal>

    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import modifyDetailModal from '../components/viewModifyModal.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { fundDetailHead } from './fundDetailConfig';
    import ajax from '@/api/index.js';
    import { moneyTradeTypes } from '@/assets/js/constVariable.js';
    import ajaxConfig from '@/config/index.js';
    import apiList from '@/api/apiList.js';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            modifyDetailModal,
            tableCom
        },
        data () {
            return {

                localeRouter : 'selfFundTradeDetail', // 个人资金交易明细
                // 查询数据
                queryParams : {
                    cardId : '',
                    accountTypeIds : '',
                    operType : 'all',
                    startDate : '',
                    endDate : '',
                    pageNo : 1,
                    pageSize : 10,
                },
                // 表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                //表头配置
                columnData : fundDetailHead,
                //会员详情账户数据
                fundDetail : {},
                //当前手动修改的交易数据
                currManualData : {},
                //已支出
                disbursement : '',
                //已储值
                storeAmount : '',
                //账户类型id
                accountTypeId : '',
                //账户单位
                accountUnit : ''
            };
        },
        methods : {
            /**
             * 查询资金交易明细
             */
            queryList () {
                let param = {};
                Object.assign(param, this.queryParams);
                if (this.queryParams.operType === 'all') {
                    param.operType = null;
                }
                ajax.post('queryOrgAccountChange', Object.assign(param,{
                    startDate : this.queryParams.startDate ? new Date(this.queryParams.startDate).format('yyyy-MM-dd 00:00:00') : '',
                    endDate : this.queryParams.endDate ? new Date(this.queryParams.endDate).format('yyyy-MM-dd 23:59:59') : '',
                })).then(res => {
                    if (res.success) {
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                }).finally(() => {
                    this.getFundAmountInfo();
                });
            },

            /**
             * 手动修改的交易数据，弹窗
             */
            viewDetail ( scopeRow ) {
                this.$refs.modifyDetail.show('fund');
                this.currManualData = scopeRow;
            },

            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    for (let item in params) {
                        this[item] = params[item];
                    }
                    this.queryParams.cardId = this.fundDetail.cardId;
                    this.queryParams.accountTypeIds = this.fundDetail.accountDefineId;
                    this.accountTypeId = this.fundDetail['accountDefineId'];
                    this.queryList();
                }
            },

            /**
             * 查询交易明细
             */
            filterDealList () {
                Object.assign(this.queryParams, {
                    pageNo : 1,
                    pageSize : 10
                });
                this.queryList();
            },

            /**
             * 重置查询条件
             */
            resetQueryParams () {
                Object.assign(this.queryParams, {
                    operType : 'all',
                    startDate : '',
                    endDate : '',
                    pageNo : 1,
                    pageSize : 10,
                });
                this.queryList();
            },
            /**
             * 获取支出和储值统计信息
             */
            getFundAmountInfo () {
                ajax.post('showRechargeAndAdjust',{
                    startTime : this.queryParams.startDate ? new Date(this.queryParams.startDate).format('yyyy-MM-dd 00:00:00') : '',
                    endTime : this.queryParams.endDate ? new Date(this.queryParams.endDate).format('yyyy-MM-dd 23:59:59') : '',
                    bizType : this.queryParams.operType === 'all' ? '' : this.queryParams.operType,
                    cardId : this.queryParams.cardId,
                    accountTypeId : this.accountTypeId
                }).then(res => {
                    if (res.success) {
                        this.storeAmount = res.data ? res.data.add : '';
                        this.accountUnit = res.data ? res.data.unit : '';
                        this.disbursement = res.data ? res.data.reduce * -1 : '';
                    } else {
                        this.storeAmount = '';
                        this.disbursement = '';
                        this.accountUnit = '';
                    }
                });
            }
        },
        computed : {
            //下载交易明细文件
            downloadUrl () {
                return ajaxConfig['HOST'] + apiList['exportAccountDetail'] +
                    '?accountTypeIds=' + this.accountTypeId +
                    '&cardId=' + this.queryParams.cardId +
                    '&token=' + ajax.getToken() +
                    '&operType=' + (this.queryParams.operType === 'all' ? '' : this.queryParams.operType) +
                    '&startDate=' + (this.queryParams.startDate ? new Date(this.queryParams.startDate).format('yyyy-MM-dd 00:00:00') : '') +
                    '&endDate=' + (this.queryParams.endDate ? new Date(this.queryParams.endDate).format('yyyy-MM-dd 23:59:59') : '');
            },
            //是否是从储值账户信息过来的页面
            isStoredAccount () {
                return this.$route.name === 'perFundDetail';
            },
            beforeRouterList () {
                if (this.isStoredAccount) {
                    return [
                        {
                            name : 'fundInfo', // 储值账户信息
                            router : {
                                name : 'fundInfo'
                            },
                        },
                        {
                            name : 'storageDetail', // 储值明细
                            router : {
                                name : 'fund'
                            },
                        },
                    ];
                } else {
                    return [
                        {
                            name : 'memberInfo', // 会员信息
                            router : {
                                name : 'memberInfo'
                            },
                        },
                        {
                            name : 'memberDetail', // 会员详情
                            router : {
                                name : 'infoDetail'
                            },
                        },
                    ];
                }
            },
            //交易类型枚举数据
            type () {
                if (this.cardIsSaling) {
                    return moneyTradeTypes;
                } else {
                    return moneyTradeTypes.slice(0,-1);
                }
            },
            ...mapGetters({
                memberConfigInfo : 'memberConfigInfo',
                lang : 'lang',
            }),
            //是否是售卖型会员卡
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-fund-detail{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;
        position: relative;

        .fund-detail-content{


            .filter-wrap{
                height: 50px;
                line-height: 60px;
                padding: 0 30px;
                /deep/ .ivu-select{
                    width: 180px;
                    margin-right: 5px;
                }

                /deep/ .ivu-date-picker{
                    width: 180px;
                    margin-right: 5px;
                }

                /deep/ .ivu-btn{
                    margin-right: 5px;
                }
            }

            .other-info-line{
                padding: 4px 30px;
                @include block_outline($height : 50px);

                .total-amount{
                    display: inline-block;
                    height: 25px;
                    line-height: 20px;
                    text-align: right;
                    overflow: auto;
                    padding: 4px 0 5px 0;
                    float: right;

                    .amount-record{
                        display: inline-block;
                        margin-left: 20px;

                        .key-label{
                            color: $color_yellow;
                        }

                        .value-label{
                            color: $color_999;
                        }
                    }
                }
            }

            .btn-wrap{
                display: inline-block;
                margin-left: 15px;
            }

            .table-wrap{

            }

            .page-wrap{
                margin-top: 30px;
                text-align: center;
            }

            .red-color{
                color: $color_red;
            }

            .green-color{
                color: $color_green;
            }

            .blue-color{
                color: $color_blue;
                cursor: pointer;
            }

        }

    }
</style>

