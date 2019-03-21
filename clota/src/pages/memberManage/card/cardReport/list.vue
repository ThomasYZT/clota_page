<!--
    卡券报表列表页
    作者：杨泽涛
-->
<template>
    <div class="card-report">
        <div class="head-filter">
            <!-- 应用场景 -->
            <div class="tool-wrapper">
                <span class="label-titile">{{$t('applicationScenario')}}</span>
                <Select v-model="filterParam.appScene"
                        style="width:140px"
                        @on-change="queryList">
                    <Option v-for="item in cardScenarioList"
                            :value="item.value"
                            :key="item.value">{{ $t(item.label) }}</Option>
                </Select>
            </div>
            <!-- 卡券类别 -->
            <div class="tool-wrapper">
                <span class="label-titile">{{$t('couponType')}}</span>
                <Select v-model="filterParam.couponType"
                        style="width:140px"
                        @on-change="queryList">
                    <Option v-for="item in couponTypeList"
                            :value="item.value"
                            :key="item.value">{{ $t(item.label) }}</Option>
                </Select>
            </div>

            <!-- 日期范围 -->
            <div class="tool-wrapper">
                <span class="label-titile">{{$t('time')}}</span>
                <DatePicker v-model="filterParam.dateTime"
                            type="daterange"
                            split-panels
                            :placeholder="$t('selectField', { msg : '' })"
                            style="width: 200px"
                            @on-change="queryList"></DatePicker>
            </div>

            <!-- 关键字 -->
            <div class="tool-wrapper right">
                <Input v-model.trim="filterParam.keyword"
                       icon="ios-search"
                       style="width: 280px;"
                       :placeholder="$t('inputField', {field: $t('couponNameV2') + ' / ' + $t('ticketYard')})"
                       @on-enter="queryList"
                       @on-click="queryList" />
            </div>
        </div>

        <!-- 导出 -->
        <Button class="ivu-btn-108px single-btn" type="primary" @click="exportReport">{{$t('exporting')}}</Button>

        <div class="table-wrapper">
            <table-com :ofset-height="160"
                       :column-data="columnData"
                       :table-data="tableData"
                       :border="true"
                       :show-pagination="true"
                       :page-no-d.sync="filterParam.pageNo"
                       :page-size-d.sync="filterParam.pageSize"
                       :total-count="totalCount"
                       @query-data="queryList">
                <!-- 应用场景 -->
                <el-table-column
                    slot="column1"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row['appScene'] ? $t('coupon.' + scope.row['appScene']) : '-'}}
                    </template>
                </el-table-column>
                <!-- 类别 -->
                <el-table-column
                    slot="column2"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{$t(scope.row['couponType']) | contentFilter}}
                    </template>
                </el-table-column>
                <!-- 使用条件 -->
                <el-table-column
                    slot="column3"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{getUseCondition(scope.row)}}
                    </template>
                </el-table-column>
                <!-- 生成数量 -->
                <el-table-column
                    slot="column4"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="table-btn"
                              @click="toCouponCodeDetail('generationNum', scope.row)">
                            {{ scope.row.quantity | contentFilter }}
                        </span>
                    </template>
                </el-table-column>

                <!-- 剩余数量 -->
                <el-table-column
                    slot="column5"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span v-if="scope.row['appScene'] !== 'right'"
                              class="table-btn"
                              @click="toCouponCodeDetail('remainingAmount', scope.row)">
                            {{ scope.row.waitNum | contentFilter }}
                        </span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <!-- 已兑换 -->
                <el-table-column
                    slot="column6"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span v-if="scope.row['appScene'] !== 'right'"
                              class="table-btn"
                              @click="toCouponUsageDetail(scope.row, 'redeemed')">
                            {{ scope.row.exchangeNum | contentFilter }}
                        </span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <!-- 已领取 -->
                <el-table-column
                    slot="column7"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="table-btn" @click="toCouponUsageDetail(scope.row, 'received')">
                            {{ scope.row.receiveNum | contentFilter }}
                        </span>
                    </template>
                </el-table-column>
                <!-- 已使用 -->
                <el-table-column
                    slot="column8"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="table-btn" @click="toCouponUsageDetail(scope.row, 'used')">
                            {{ scope.row.usedNum | contentFilter }}
                        </span>
                    </template>
                </el-table-column>
                <!-- 未使用 -->
                <el-table-column
                    slot="column9"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="table-btn" @click="toCouponUsageDetail(scope.row, 'noUse')">
                            {{ scope.row.nouseNum | contentFilter }}
                        </span>
                    </template>
                </el-table-column>
                <!-- 有效期 -->
                <el-table-column
                    slot="column10"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span v-if="scope.row.appScene === 'spread'">{{scope.row.effectiveTime | timeFormat('yyyy-MM-dd')}}--{{scope.row.expireTime | timeFormat('yyyy-MM-dd')}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <!-- 操作栏 -->
                <el-table-column
                    slot="column13"
                    show-overflow-tooltip
                    slot-scope="row"
                    fixed="right"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <!-- 卡券详情 -->
                            <li @click="showCardDetail(scope.row)">{{$t('detail')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>


        <!-- 查看券码模态框 -->
        <!--<viewCodeModal ref="viewCodeModal"></viewCodeModal>-->
    </div>
</template>

<script>

    import { cardScenario, couponTypeList } from '@/assets/js/constVariable';
    import { cardReportHead } from './cardReportConfig';
    import tableCom from '@/components/tableCom/tableCom';
    import viewCodeModal from '../coupon/components/viewCodeModal';
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    export default {
        components : {
            tableCom,
            viewCodeModal
        },
        data () {
            if (couponTypeList.findIndex(item => {
                return item.value === 'all';
            }) < 0) {
                couponTypeList.unshift({ label : 'all', value : 'all' })
            }
            return {
                //会员卡使用场景下拉列表数据
                cardScenarioList : cardScenario,
                //卡券类别下拉数据
                couponTypeList : couponTypeList,
                //查询过滤参数
                filterParam : {
                    //日期范围
                    dateTime : [ new Date().addDays(-7), new Date()],
                    //应用场景
                    appScene : 'all',
                    //卡券类别
                    couponType : 'all',
                    //关键字
                    keyword : '',
                    //页码
                    pageNo : 1,
                    //每页数据条数
                    pageSize : 10,
                },
                //表头配置
                columnData : cardReportHead,
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
            };
        },
        methods : {
            /**
             * 列表查询
             */
            queryList () {
                let params = defaultsDeep({}, this.filterParam);
                params.appScene = params.appScene === 'all' ? '' : params.appScene;
                params.couponType = params.couponType === 'all' ? '' : params.couponType;
                params.startTime = this.filterParam.dateTime[0].format('yyyy-MM-dd 00:00:00');
                params.endTime = this.filterParam.dateTime[1].format('yyyy-MM-dd 23:59:59');
                delete params.dateTime;
                ajax.post('queryForReport', params).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 导出
             */
            exportReport () {
                let params = defaultsDeep({}, this.filterParam);
                params.appScene = params.appScene === 'all' ? '' : params.appScene;
                params.couponType = params.couponType === 'all' ? '' : params.couponType;
                params.startTime = this.filterParam.dateTime[0].format('yyyy-MM-dd 00:00:00');
                params.endTime = this.filterParam.dateTime[1].format('yyyy-MM-dd 23:59:59');
                delete params.dateTime;
                let alink = document.createElement('a');
                alink.href = ajax.export('queryForReportForExport', params);
                alink.click();
            },
            /**
             * 前往优惠券使用详情页
             * @param type
             * @param rowData 列表项数据
             */
            toCouponUsageDetail (rowData, type) {
                this.$router.push({
                    name : 'couponUsageDetails',
                    params : {
                        type : type,
                        rowData : rowData,
                    }
                });
            },
            /**
             *  前往优惠券券码详情页
             *  @param type 券码详情类型
             *  @param rowData 券数据
             */
            toCouponCodeDetail (type, rowData) {
                this.$router.push({
                    name : 'couponCodeDetails',
                    params : {
                        type : type,
                        couponInfo : rowData
                    }
                });
            },
            /**
             * 打开该优惠券弹窗，查询优惠券信息
             *  @param rowData 券数据
             */
            showCardDetail (rowData) {
                // this.$refs.viewCodeModal.show(rowData);
                this.$router.push({
                    name : 'addCardV2',
                    params : {
                        type : 'check',
                        rowData : rowData
                    }
                });
            },
            /**
             * 获取卡券使用条件
             * @param rowData
             */
            getUseCondition (rowData) {
                if (rowData.couponType === 'discount_coupon') {//折扣券
                    return this.$t('discountCouponUseConditions',{ minCash : rowData.conditionLowerLimtation,maxCash : rowData.conditionUpperLimtation });
                } else if (rowData.couponType === 'exchange_coupon') {//兑换券
                    return this.$t('only',{ msg : rowData.remark });
                } else if (rowData.couponType === 'cash_coupon') {//代金券
                    return this.$t('overTipCanUse',{ money : rowData.conditionLowerLimtation });
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .card-report {
        .head-filter {
            padding: 0 20px;
            height: 50px;
            line-height: 50px;

            .tool-wrapper {
                display: inline-block;
                margin-right: 20px;

                &.right {
                    float: right;
                }
            }

            .label-titile {
                margin-right: 10px;
                font-size: 14px;
                color: #585858;
            }
        }

        .single-btn {
            margin-left: 20px;
        }

        .table-wrapper {
            margin-top: 10px;

            .table-btn {
                color: $color_blue;
                cursor: pointer;
            }
        }
    }
</style>
