<!--
    配额余量页面组件
    作者：杨泽涛
-->
<template>
    <div class="quota-allowance">
        <!-- 面包屑导航 -->
        <breadCrumbHead :locale-router="'quotaAllowance'"
                        :before-router-list="beforeRouterList"></breadCrumbHead>
        <div class="content">
            <div class="title">
                <span>{{$t('colonSetting', { key : '销售政策名称' })}} {{$t(policyItem.name)}}</span>
            </div>
            <div class="filter-head">
                <i-row>
                    <i-col span="6">
                        <span>选择产品</span>
                        <Select v-model="params.productId"
                                transfer
                                style="width:180px"
                                @on-change="queryList">
                            <Option v-for="item in productList"
                                    :value="item.id"
                                    :key="item.id">{{ item.productName }}</Option>
                        </Select>
                    </i-col>
                    <i-col span="6">
                        <span>选择渠道</span>
                        <Select v-model="params.channelId"
                                transfer
                                style="width:180px"
                                @on-change="queryList">
                            <Option v-for="item in channelsList"
                                    :value="item.partnerId"
                                    :key="item.partnerId">{{ item.channelName }}</Option>
                        </Select>
                    </i-col>
                </i-row>
            </div>
            <div class="time-filter">
                <div class="left-board">
                    <span class="label-title">{{$t('colonSetting', { key : $t('配额限制方式') })}}</span>
                    <span class="label-name">{{$t(quotaType)}}</span>
                </div>
                <div class="right-board">
                    <!--时间范围选择-->
                    <span :class="{'active': timeType === 'week'}"
                          @click="changeTimeType('week')">{{$t("recent_days_7")}}</span>
                    <span :class="{'active': timeType === 'month'}"
                          @click="changeTimeType('month')">{{$t("recent_days_30")}}</span>
                    <div class="date-range-filter">
                        <DatePicker v-model="autoDefTime"
                                    format="yyyy-MM-dd"
                                    type="daterange"
                                    :clearable="false"
                                    :editable="false"
                                    :options="dateOption"
                                    transfer
                                    :placeholder="$t('selectField', { msg : $t('date') })"
                                    placement="bottom-end"
                                    style="width: 280px"
                                    @on-change="changeDateCustom">
                        </DatePicker>
                    </div>
                </div>
            </div>
            <div class="table-wrapper">
                <table-com
                    v-if="params.productId && params.channelId"
                    :table-com-min-height="500"
                    :auto-height="true"
                    :column-data="columnData"
                    :table-data="tableData"
                    :border="true"
                    :show-pagination="false"
                    :page-no-d.sync="params.pageNo"
                    :page-size-d.sync="params.pageSize"
                    :total-count="totalCount"
                    @query-data="queryList">
                    <el-table-column
                        slot="column1"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <span>{{Number(scope.row.initQuota ? scope.row.initQuota : 0) -
                                Number(scope.row.restQuota ? scope.row.restQuota : 0)}}</span>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
            <!-- 配额调配器 -->
            <quotaController :quotaType="quotaType"
                             :policyInfo="policyItem"
                             :channelId="params.channelId"
                             :productId="params.productId"
                             @updateList="queryList"></quotaController>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins';
    import tableCom from '@/components/tableCom/tableCom';
    import quotaController from './components/quotaController';
    import { quotaAllowanceHead } from './headConfig';
    import ajax from '@/api/index';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            tableCom,
            quotaController
        },
        data () {
            return {
                //上级导航列表
                beforeRouterList : [
                    {
                        name : 'mySalePolicy', //我定义的销售政策
                        router : {
                            name : 'marketingPolicy'
                        }
                    }
                ],
                //销售政策项 -- 路由参数
                policyItem : {},
                //查询条件参数
                params : {
                    // pageNo : 1,
                    // pageSize : 10,
                    productId : '',
                    channelId : '',
                },
                //该销售政策的产品列表
                productList : [],
                //该销售政策的渠道列表
                channelsList : [],
                //当前日期类型
                timeType : 'week',
                //自定义时间
                autoDefTime : [],
                //配额余量表格表头配置
                columnData : quotaAllowanceHead,
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
                //配额限制方式
                quotaType : '',
                //禁用今天之后的日期
                dateOption : {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                }
            };
        },
        computed : {
            //获取日期信息
            getDateInfo () {
                if (this.timeType === 'week') {//近7天数据
                    return {
                        startDate : new Date().addDays(-7).format('yyyy-MM-dd'),
                        endDate : new Date().format('yyyy-MM-dd'),
                    };
                } else if (this.timeType === 'month') {//近30天数据
                    return {
                        startDate : new Date().addDays(-30).format('yyyy-MM-dd'),
                        endDate : new Date().format('yyyy-MM-dd'),
                    };
                } else if (this.timeType === 'year') {//本年数据
                    let year = String(new Date().getFullYear());
                    return {
                        startDate : new Date(year).format('yyyy-MM-dd'),
                        endDate : new Date().format('yyyy-MM-dd'),
                    };
                } else if (this.timeType === 'autoDefTime') {//自定义时间范围
                    return {
                        startDate : this.autoDefTime[0] ? this.autoDefTime[0].format('yyyy-MM-dd') : '',
                        endDate : this.autoDefTime[1] ? this.autoDefTime[1].format('yyyy-MM-dd') : '',
                    };
                } else {
                    return {
                        startDate : new Date().addDays(-7).format('yyyy-MM-dd'),
                        endDate : new Date().format('yyyy-MM-dd'),
                    };
                }
            },
        },
        methods : {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && params.info) {
                    this.policyItem = params.info;
                    this.getProductsByPolicyId();
                    this.getSaleChannelsByPolicyId();
                } else {
                    this.$router.push({
                        name : 'marketingPolicy'
                    });
                }
            },
            /**
             * 获取对应时间的消费数据
             * @param timeType 时间类型
             */
            changeTimeType (timeType) {
                this.autoDefTIme = [];
                this.timeType = timeType;
                this.queryList();
            },
            /**
             * 自定义查看时间范围
             */
            changeDateCustom () {
                this.timeType = 'autoDefTime';
                this.queryList();
            },
            /**
             * 查询表格数据
             */
            queryList () {
                ajax.post('getQuotaChanges', {
                    policyId : this.policyItem.id,
                    startDate : new Date(this.getDateInfo.startDate).format('yyyy-MM-dd'),
                    endDate : new Date(this.getDateInfo.endDate).format('yyyy-MM-dd'),
                    ...this.params,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.quotaType = res.data ? res.data.quotaType : '';
                    } else {
                        this.tableData = [];
                    }
                });
            },
            /**
             * 根据销售政策id查询销售政策下使用到的产品
             */
            getProductsByPolicyId () {
                ajax.post('getProductsByPolicyId', {
                    policyId : this.policyItem.id,
                }).then(res => {
                    if (res.success) {
                        this.productList = res.data ? res.data : [];
                        this.params.productId = this.productList[0] ? this.productList[0].id : '';
                    } else {
                        this.productList = [];
                    }
                });
            },
            /**
             * 根据销售政策id查询销售政策下使用到的渠道
             */
            getSaleChannelsByPolicyId () {
                ajax.post('getSaleChannelsByPolicyId', {
                    policyId : this.policyItem.id,
                }).then(res => {
                    if (res.success) {
                        this.channelsList = res.data ? res.data : [];
                        this.params.channelId = this.channelsList[0] ? this.channelsList[0].partnerId : '';
                    } else {
                        this.channelsList = [];
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .content {
        padding: 20px 20px;
        .title {
            margin-bottom: 10px;
            span {
                font-size: 18px;
                color: #000;
                line-height: 28px;
            }
        }

        .filter-head {
            margin-bottom: 20px;
            span {
                color: #585858;
                font-size: 14px;
            }
        }

        .time-filter {
            margin: 11px 0;
            display: flex;

            .left-board {
                flex: 1 0;
            }

            .right-board {
                text-align: right;
                flex: 1 0;

                >span{
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    font-size: $font_size_14px;
                    color: $color_7F8FA4;
                    letter-spacing: 1px;
                    margin-right: 10px;
                    cursor: pointer;
                    &.active{
                        color: $color_blue;
                    }
                }

                .date-range-filter {
                    display: inline-block;
                }
            }
        }
        .table-wrapper {
            margin-bottom: 20px;
            border-bottom: 1px solid #E1E1E1;
        }
    }
</style>
