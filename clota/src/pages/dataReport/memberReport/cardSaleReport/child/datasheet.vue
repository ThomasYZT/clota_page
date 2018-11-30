<!--
    会员卡销售报表--数据表
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

                <!-- 会员类型下拉列表 -->
                <span class="label">{{$t('memberType')}}</span>
                <Select v-model="filterData.memberType"
                        :placeholder="$t('selectField', { msg : $t('memberType') })"
                        @on-change="queryLevelsByCardType('change')"
                        style="width:160px">
                    <Option v-for="item in cardTypeList" :value="item.value" :key="item.value">
                        {{ item.label }}
                    </Option>
                </Select>

                <!-- 会员级别下拉列表 -->
                <span class="label">{{$t('member-level')}}</span>
                <Select v-model="filterData.memberLevel"
                        :placeholder="$t('selectField', { msg : $t('member-level') })"
                        @on-change="getData"
                        style="width:160px">
                    <Option v-for="item in memberLevellist" :value="item.value" :key="item.value">
                        {{ item.label === 'memberLevelAll' ? $t(item.label) : item.label }}
                    </Option>
                </Select>
            </div>
            <div slot="right-filter" class="right-bar">
                <Input class="input-field"
                       v-model.trim="filterData.phoneNum"
                       icon="ios-search"
                       style="width: 280px"
                       :placeholder="$t('inputField', { field : $t('members') + $t('mobilePhone') })"
                       @on-enter="getData"
                       @on-click="getData" />
            </div>
        </filterHead>

        <div class="statistics">
            <!-- 销售数量 -->
            <span class="label">{{$t('colonSetting', { key: $t('salesQty') })}}</span><span class="data">{{saleQuantity | contentFilter}}</span>
            <!-- 总计金额 -->
            <span class="label">{{$t('colonSetting', { key: $t('addAll') })}}</span><span class="data">{{totalMoney | moneyFilter | contentFilter}}</span>
        </div>

        <table-com
            v-if="cardTypeList.length !== 0"
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
                slot="column5"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                show-overflow-tooltip
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.custName | contentFilter}} / {{scope.row.phoneNum | contentFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column7"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.payType ? $t('payType.' + scope.row.payType) : '-'}}
                </template>
            </el-table-column>
        </table-com>

    </div>
</template>

<script>
    import common from '../../../../../assets/js/common';
    import filterHead from '../../components/filterHead';
    import tableCom from '../../../../../components/tableCom/tableCom';
    import { memberCardHead } from '../../tableHeadConfig';
    import ajax from '../../../../../api/index';
    export default {
        props : {
            cardTypeList : {
                type : Array,
                default () {
                    return [];
                }
            },
        },
        components : {
            filterHead,
            tableCom
        },
        data () {
            return {
                //会员级别下拉列表数据
                memberLevellist : [
                    {
                        value : 'all',
                        label : 'memberLevelAll'
                    }
                ],
                //过滤条件数据
                filterData : {
                    //会员类型
                    memberType : this.cardTypeList[0] ? this.cardTypeList[0].value : '',
                    //会员级别
                    memberLevel : 'all',
                    //日期范围
                    date : [common.getDay(-6),common.getDay(0)],
                    //会员手机号
                    phoneNum : '',
                    //页数
                    pageNo : 1,
                    //每页条数
                    pageSize : 10
                },
                //销售数量
                saleQuantity : 0,
                //总计金额
                totalMoney : 0,
                //表格表头配置
                columnData : memberCardHead,
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
                //会员卡销售报表明细
                ajax.post('queryPagedCardSaleDetail', {
                    startTime : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endTime : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    cardTypeId : this.filterData.memberType === 'all' ? '' : this.filterData.memberType,
                    levelId : this.filterData.memberLevel === 'all' ? '' : this.filterData.memberLevel,
                    phoneNum : this.filterData.phoneNum,
                    pageNo : this.filterData.pageNo,
                    pageSize : this.filterData.pageSize
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                        this.countCardAndSaleMoney();
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 统计会员卡数量和销售金额
             */
            countCardAndSaleMoney () {
                ajax.post('countCardAndSaleMoney', {
                    startTime : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endTime : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    cardTypeId : this.filterData.memberType === 'all' ? '' : this.filterData.memberType,
                    levelId : this.filterData.memberLevel === 'all' ? '' : this.filterData.memberLevel,
                    phoneNum : this.filterData.phoneNum
                }).then(res => {
                    if (res.success) {
                        this.totalMoney = res.data && res.data.length > 0 ? res.data[0].money : 0;
                        this.saleQuantity = res.data && res.data.length > 0 ? res.data[0].quantity : 0;
                    } else {
                        this.totalMoney = 0;
                        this.saleQuantity = 0;
                    }
                });
            },
            /**
             * 获取卡级别列表数据
             * @param {string} type
             */
            queryLevelsByCardType (type) {
                this.filterData.memberLevel = 'all';
                this.memberLevellist = [
                    {
                        value : 'all',
                        label : 'memberLevelAll'
                    }
                ];
                ajax.post('queryLevelsByCardType', {
                    cardTypeId : this.filterData.memberType
                }).then(res => {
                    if (res.success && res.data.length > 0) {
                        this.memberLevellist = this.memberLevellist.concat(res.data.map(item => {
                            return {
                                value : item.id,
                                label : item.levelDesc
                            };
                        }));
                    } else {
                        this.memberLevellist = [
                            {
                                value : 'all',
                                label : 'memberLevelAll'
                            }
                        ];
                    }
                });
                if (type) {
                    this.getData();
                }
            }
        },
        watch : {
            cardTypeList : {
                handler  (newVal) {
                    if (newVal.length > 0) {
                        this.filterData.memberType = newVal[0].value;
                        this.queryLevelsByCardType();
                    } else {
                        this.filterData.memberType = '';
                    }
                },
                immediate : true
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
