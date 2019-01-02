<!--
    会员消费数据报表--数据表
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
                            style="width: 280px;margin-right: 10px;"></DatePicker>

                <!-- 景区下拉列表 -->
                <span class="label">{{$t('order.scenic')}}</span>
                <Select v-model="filterData.orgId"
                        :placeholder="$t('selectField', { msg : $t('order.scenic') })"
                        @on-change="getData"
                        style="width:160px;margin-right: 10px;" >
                    <Option v-for="item in scenicList" :value="item.value" :key="item.value">{{ $t(item.label) }}</Option>
                </Select>

                <!-- 业态下拉列表 -->
                <span class="label">{{$t('industry')}}</span>
                <Select v-model="filterData.productType"
                        :placeholder="$t('selectField', { msg : $t('industry') })"
                        @on-change="getData"
                        style="width:160px;margin-right: 10px;">
                    <Option v-for="item in productTypeList" :value="item.value" :key="item.value">{{ $t(item.label) }}</Option>
                </Select>
            </div>
            <div slot="right-filter" class="right-bar">
                <Input class="input-field"
                       v-model.trim="filterData.keyword"
                       icon="ios-search"
                       style="width: 280px"
                       :placeholder="$t('inputAnywordForSearch')"
                       @on-enter="getData"
                       @on-click="getData" />
            </div>
        </filterHead>

        <div class="statistics">
            <!-- 累计消费 -->
            <span class="label">{{$t('colonSetting', { key: $t('totalConsume') })}}</span><span class="data">{{totalConsume | moneyFilter | contentFilter}}</span>
            <!-- 累计交易笔数 -->
            <span class="label">{{$t('colonSetting', { key: $t('totalTradeQuantity') })}}</span><span class="data">{{totalTradeQuantity | contentFilter}}</span>
            <!-- 累计消费人数 -->
            <span class="label">{{$t('colonSetting', { key: $t('totalConsumePeople') })}}</span><span class="data">{{totalConsumePeople | contentFilter}}</span>
        </div>

        <table-com
            v-if="scenicList.length !== 0"
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="204"
            :page-no-d.sync="filterData.pageNo"
            :page-size-d.sync="filterData.pageSize"
            @query-data="getData">
            <el-table-column
                slot="column1"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{$t(scope.row.productType)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="toDetail(scope.row)">{{scope.row.memberName}}</li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column
                slot="column9"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="check(scope.row)">{{$t('details')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <detailModal ref="detailModal"></detailModal>
    </div>
</template>

<script>
    import common from '@/assets/js/common';
    import filterHead from '../../components/filterHead';
    import tableCom from '@/components/tableCom/tableCom';
    import { consumeHead } from '../../tableHeadConfig';
    import ajax from '@/api/index';
    import detailModal from '../components/detailModal';
    export default {
        props : {
            //景区列表
            'scenicList' : {
                type : Array,
                default () {
                    return [];
                }
            },
        },
        components : {
            filterHead,
            tableCom,
            detailModal
        },
        data () {
            return {
                //业态下拉列表数据
                productTypeList : [
                    {
                        value : 'all',
                        label : 'allProductType'
                    },
                    {
                        value : 'ticket',
                        label : 'ticket'
                    },
                    {
                        value : 'catering',
                        label : 'repast'
                    },
                    {
                        value : 'commodity',
                        label : 'goods'
                    },
                    {
                        value : 'hotel',
                        label : 'hotel'
                    },
                ],
                //过滤条件数据
                filterData : {
                    //景区
                    orgId : 'all',
                    //业态
                    productType : 'all',
                    //日期范围
                    date : [common.getDay(-6),common.getDay(0)],
                    //关键字
                    keyword : '',
                    //页数
                    pageNo : 1,
                    //每页条数
                    pageSize : 10
                },
                //累计消费
                totalConsume : 0,
                //累计交易笔数
                totalTradeQuantity : 0,
                //累计消费人数
                totalConsumePeople : 0,
                //表格表头配置
                columnData : consumeHead,
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
                //获取会员消费数据报表
                ajax.post('queryPagedMemberOrderList', {
                    startDate : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endDate : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    orgId : this.filterData.orgId === 'all' ? '' : this.filterData.orgId,
                    productType : this.filterData.productType === 'all' ? '' : this.filterData.productType,
                    keyword : this.filterData.keyword,
                    pageNo : this.filterData.pageNo,
                    pageSize : this.filterData.pageSize
                }).then(res => {
                   if (res.success) {
                       this.tableData = res.data ? res.data.data : [];
                       this.totalCount = res.data ? res.data.totalRow : 0;
                       this.countTotalMemberConsume();
                   } else {
                       this.tableData = [];
                       this.totalCount = 0;
                   }
                });
            },
            //统计会员卡数量和销售金额
            countTotalMemberConsume () {
                ajax.post('countTotalMemberConsume', {
                    startDate : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endDate : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    orgId : this.filterData.orgId === 'all' ? '' : this.filterData.orgId,
                    productType : this.filterData.productType === 'all' ? '' : this.filterData.productType,
                    keyword : this.filterData.keyword,
                }).then(res => {
                    if (res.success) {
                        this.totalConsume = res.data ? res.data.consumeAmount : 0;
                        this.totalTradeQuantity = res.data ? res.data.consumeCount : 0;
                        this.totalConsumePeople = res.data ? res.data.consumerNum : 0;
                    } else {
                        this.totalConsume = 0;
                        this.totalTradeQuantity = 0;
                        this.totalConsumePeople = 0;
                    }
                });
            },
            /**
             * 前往详情页
             * @param {*} data
             */
            toDetail (data) {
                this.$router.push({
                    name : 'consumeRecord',
                    params : {
                        listItem : data
                    }
                });
            },
            /**
             * 查看详情
             * @param {*} data
             */
            check (data) {
                this.$refs.detailModal.toggle(data);
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
