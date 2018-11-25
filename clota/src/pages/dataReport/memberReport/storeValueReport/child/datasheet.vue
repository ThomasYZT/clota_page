<!--
    会员储值报表--数据表
    作者：杨泽涛
-->
<template>
    <div class="datasheet">
        <filterHead>
            <div slot="left-filter" class="left-bar">
                <!-- 日期选择器 -->
                <DatePicker v-model="filterData.date"
                            type="daterange"
                            :editable="false"
                            :clearable="false"
                            :placeholder="$t('selectField', { msg : $t('date') })"
                            @on-change="getData"
                            style="width: 280px"></DatePicker>

                <!-- 景区下拉列表 -->
                <span class="label">{{$t('scenic')}}</span>
                <Select v-model="filterData.scenic"
                        :placeholder="$t('selectField', { msg : $t('scenic') })"
                        @on-change="getData"
                        style="width:160px">
                    <Option v-for="item in scenicList" :value="item.value" :key="item.value">
                        {{ item.label === 'allScenic' ? $t(item.label) : item.label }}
                    </Option>
                </Select>

                <!-- 会员类别下拉列表 -->
                <span class="label">{{$t('memberType')}}</span>
                <Select v-model="filterData.cardType"
                        :placeholder="$t('selectField', { msg : $t('memberType') })"
                        @on-change="getData"
                        style="width:160px">
                    <Option v-for="item in cardTypeList" :value="item.value" :key="item.value">
                        {{ item.label === 'memberTypeAll' ? $t(item.label) : item.label }}
                    </Option>
                </Select>
            </div>
            <div slot="right-filter" class="right-bar">
                <Input class="input-field"
                       v-model.trim="filterData.custName"
                       icon="ios-search"
                       style="width: 280px"
                       :placeholder="$t('inputField', { field : $t('memberName') })"
                       @on-enter="getData"
                       @on-click="getData" />
            </div>
        </filterHead>

        <div class="statistics">
            <!-- 储值累计总额 -->
            <span class="label">{{$t('colonSetting', { key: $t('storeValueTotal') })}}</span><span class="data">{{storeValueTotal | moneyFilter}} {{$t('yuan')}}</span>
            <!-- 储值累计消费 -->
            <span class="label">{{$t('colonSetting', { key: $t('storeValueTotalConsume') })}}</span><span class="data">{{storeValueTotalConsume | moneyFilter}} {{$t('yuan')}}</span>
            <!-- 储值余额 -->
            <span class="label">{{$t('colonSetting', { key: $t('storeValueBalance') })}}</span><span class="data">{{storeValueBalance | moneyFilter}} {{$t('yuan')}}</span>

        </div>

        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="220"
            :page-no-d.sync="filterData.pageNo"
            :page-size-d.sync="filterData.pageSize"
            @query-data="getData">
            <el-table-column
                slot="column8"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.paymentType ? $t('payType.' + scope.row.paymentType) : '-'}}
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>

<script>
    import common from '../../../../../assets/js/common';
    import filterHead from '../../components/filterHead';
    import tableCom from '../../../../../components/tableCom/tableCom';
    import { memberStoreValueHead } from '../../tableHeadConfig';
    import ajax from '../../../../../api/index';
    export default {
        props : {
            //会员卡下拉列表数据
            cardTypeList : {
                type : Array,
                default () {
                    return [];
                }
            },
            //景区下拉列表数据
            scenicList : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            filterHead,
            tableCom
        },
        data () {
            return {
                //过滤条件数据
                filterData : {
                    //会员类型
                    cardType : 'all',
                    //会员级别
                    scenic : 'all',
                    //日期范围
                    date : [common.getDay(-6),common.getDay(0)],
                    //会员名称
                    custName : '',
                    //页数
                    pageNo : 1,
                    //每页条数
                    pageSize : 10
                },
                //储值累计总额
                storeValueTotal : 0,
                //储值累计消费
                storeValueTotalConsume : 0,
                //储值余额
                storeValueBalance : 0,
                //表格表头配置
                columnData : memberStoreValueHead,
                //表格数据
                tableData : [],
                //记录总条数
                totalCount : 0
            };
        },
        methods : {
            /**
             * 获取页面数据
             */
            getData () {
                ajax.post('listRechargeDetail', {
                    startTime : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endTime : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    orgId : this.filterData.scenic === 'all' ? '' : this.filterData.scenic,
                    cardTypeId : this.filterData.cardType === 'all' ? '' : this.filterData.cardType,
                    custName : this.filterData.custName,
                    pageNo : this.filterData.pageNo,
                    pageSize : this.filterData.pageSize
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                        this.sumCorpusRecharge();
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            //统计会员卡数量和销售金额
            sumCorpusRecharge () {
                ajax.post('sumCorpusRecharge', {
                    startTime : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endTime : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    orgId : this.filterData.scenic === 'all' ? '' : this.filterData.scenic,
                    cardTypeId : this.filterData.cardType === 'all' ? '' : this.filterData.cardType,
                    custName : this.filterData.custName
                }).then(res => {
                    if (res.success) {
                        this.storeValueBalance = res.data ? res.data.rest : 0;
                        this.storeValueTotal = res.data ? res.data.total : 0;
                        this.storeValueTotalConsume = this.storeValueTotal - this.storeValueBalance;
                    } else {
                        this.storeValueBalance = 0;
                        this.storeValueTotal = 0;
                        this.storeValueTotalConsume = 0;
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .datasheet {
        height: 100%;
        .left-bar {
            height: 100%;
        }

        .right-bar {
            height: 100%;
            text-align: right;
        }

        .statistics {
            padding: 8px 20px;
            height: 50px;
            width: 100%;
            line-height: 34px;

            .label {
                font-size: 14px;
                color: #666;

                &:not(:first-of-type) {
                    margin-left: 20px;
                }
            }

            .data {
                font-size: 18px;
                color: #22BB5F;
            }
        }
    }
</style>
