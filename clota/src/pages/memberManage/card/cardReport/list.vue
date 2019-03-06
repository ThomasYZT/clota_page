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
                <Select v-model="filterParam.scene" style="width:140px">
                    <Option v-for="item in cardScenarioList"
                            :value="item.value"
                            :key="item.value">{{ $t(item.label) }}</Option>
                </Select>
            </div>
            <!-- 卡券类别 -->
            <div class="tool-wrapper">
                <span class="label-titile">{{$t('couponType')}}</span>
                <Select v-model="filterParam.couponType" style="width:140px">
                    <Option v-for="item in couponTypeList"
                            :value="item.value"
                            :key="item.value">{{ $t(item.label) }}</Option>
                </Select>
            </div>
            <!-- 日期范围 -->
            <div class="tool-wrapper">
                <span class="label-titile">{{$t('time')}}</span>
                <DatePicker type="daterange" split-panels
                            placeholder="Select date"
                            style="width: 200px"></DatePicker>
            </div>
            <div class="tool-wrapper right">
                <Input v-model.trim="filterParam.keyword"
                       icon="ios-search"
                       style="width: 300px;"
                       :placeholder="$t('inputField', {field: $t('name') + ' / ' + $t('loginName')})"
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
                <!-- 生成数量 -->
                <el-table-column
                    slot="column4"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="table-btn" @click="toCouponCodeDetail('generationNum', scope.row)">
                            {{ scope.row.test | contentFilter }}
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
                        <span class="table-btn" @click="toCouponCodeDetail('remainingAmount', scope.row)">
                            {{ scope.row.test | contentFilter }}
                        </span>
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
                        <span class="table-btn" @click="toCouponUsageDetail('redeemed')">
                            {{ scope.row.test | contentFilter }}
                        </span>
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
                        <span class="table-btn" @click="toCouponUsageDetail('received')">
                            {{ scope.row.test | contentFilter }}
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
                        <span class="table-btn" @click="toCouponUsageDetail('used')">
                            {{ scope.row.test | contentFilter }}
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
                        <span class="table-btn" @click="toCouponUsageDetail('noUse')">
                            {{ scope.row.test | contentFilter }}
                        </span>
                    </template>
                </el-table-column>
                <!-- 已过期 -->
                <el-table-column
                    slot="column10"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="table-btn" @click="toCouponUsageDetail('expired')">
                            {{ scope.row.test | contentFilter }}
                        </span>
                    </template>
                </el-table-column>
                <!-- 操作栏 -->
                <el-table-column
                    slot="column14"
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
    </div>
</template>

<script>

    import { cardScenario, couponTypeList } from '@/assets/js/constVariable';
    import { cardReportHead } from './cardReportConfig';
    import tableCom from '@/components/tableCom/tableCom';
    export default {
        components : {
            tableCom
        },
        data () {
            return {
                //会员卡使用场景下拉列表数据
                cardScenarioList : cardScenario,
                //卡券类别下拉数据
                couponTypeList : couponTypeList,
                //查询过滤参数
                filterParam : {
                    //应用场景
                    scene : '',
                    //卡券类别
                    couponType : '',
                    //关键字
                    keyword : '',
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
                this.tableData = [
                    {
                        test : "2222"
                    }
                ];
            },
            /**
             * 导出
             */
            exportReport () {

            },
            /**
             * 前往优惠券使用详情页
             * @param type
             */
            toCouponUsageDetail (type) {
                this.$router.push({
                    name : 'couponUsageDetails',
                    params : {
                        type : type,
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

            }
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
