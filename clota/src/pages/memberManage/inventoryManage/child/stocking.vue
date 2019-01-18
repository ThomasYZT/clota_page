<!--
    进销存管理--库存盘点
    作者：杨泽涛
-->
<template>
    <div class="stocking">

        <Form ref="formBody"
              label-position="right"
              :label-width="180">
            <toolBox :toolNum="3">
                <div slot="tool0">
                    <Form-item>
                        <Select v-model="filterData.changeType"
                                @on-change="getListData()"
                                style="width:250px">
                            <Option v-for="(item, index) in changeTypeList"
                                    :value="item.value"
                                    :key="index">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div slot="tool1">
                    <Form-item >
                        <DatePicker type="daterange"
                                    split-panels
                                    v-model="dateRange"
                                    @on-change="dateChange"
                                    :editable="false"
                                    :clearable="false"
                                    :placeholder="$t('selectField', { msg : $t('startEndDate') })"
                                    style="width: 250px"></DatePicker>
                    </Form-item>
                </div>
                <div slot="tool2">
                    <Button class="ivu-btn-90px" type="primary" @click="getListData">{{$t('orgStructQuery')}}</Button>
                    <!-- 导出 -->
                    <div class="btn-wrapper">
                        <a class="ivu-btn-90px" :href="downloadUrl">{{$t('exporting')}}</a>
                    </div>
                </div>
            </toolBox>
        </Form>

        <div class="table-wrapper">
            <tableCom :column-data="stockingHead"
                      :table-data="tableData"
                      :border="true"
                      :show-pagination="true"
                      :total-count="totalCount"
                      :page-no-d.sync="filterData.pageNo"
                      :page-size-d.sync="filterData.pageSize"
                      @query-data="getListData">
                <!-- 库存数量 -->
                <el-table-column
                    slot="column2"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{ scope.row.stockNum + scope.row.undrawNum | contentFilter}}
                    </template>
                </el-table-column>
                <!-- 商品状态 -->
                <el-table-column
                    slot="column6"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="status normal" v-if="scope.row.goodsStatus === 'up'">{{$t('up')}}</span>
                        <span class="status sleep" v-else>{{$t('down')}}</span>
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column
                    slot="column7"
                    slot-scope="row"
                    fixed="right"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <li class="blue-label" @click="stockDetail(scope.row)">{{$t('stockDetail')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </tableCom>
        </div>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import toolBox from '../components/toolBox';
    import { stockingHead } from './tableConfig';
    import ajax from '@/api/index';
    import ajaxConfig from '@/config/index.js';
    import apiList from '@/api/apiList.js';
    export default {
        components : {
            tableCom,
            toolBox
        },
        data () {
            return {
                //过滤信息
                filterData : {
                    startDate : '',
                    endDate : '',
                    changeType : 'in',
                    pageNo : 1,
                    pageSize : 10,
                    dateRange : []
                },
                //变动类型列表
                changeTypeList : [
                    {
                        value : 'in',
                        label : 'inGoods'
                    },
                    {
                        value : 'out',
                        label : 'outGoods'
                    }
                ],
                //表头配置
                stockingHead : stockingHead,
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
                //日期范围
                dateRange : []
            };
        },
        computed : {
            //下载模板路径
            downloadUrl () {
                return ajaxConfig['HOST'] + apiList['exportGoodsStock'] + '?token=' + ajax.getToken() +
                    '&startDate=' + this.filterData.startDate +
                    '&endDate=' + this.filterData.endDate +
                    '&changeType=' + this.filterData.changeType;
            },
        },
        methods : {
            /**
             * 日期改变转换格式
             * @param {object} data
             */
            dateChange (data) {
                this.filterData.startDate = data[0];
                this.filterData.endDate = data[1];
                this.getListData();
            },
            /**
             * 获取库存盘点列表数据
             */
            getListData () {
                this.filterData.startDate = this.dateRange[0] ? this.dateRange[0].format('yyyy-MM-dd') : '';
                this.filterData.endDate = this.dateRange[1] ? this.dateRange[1].format('yyyy-MM-dd') : '';
                ajax.post('queryGoodsStock', this.filterData).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                    }
                });
            },
            /**
             * 前往库存详情页面
             * @param {object} data
             */
            stockDetail (data) {
                this.$router.push({
                    name : 'stockInfo',
                    params : {
                        listItem : data
                    }
                });
            },
        },
        created () {
            let date = new Date();
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            this.dateRange[0] = firstDay;
            this.dateRange[1] = lastDay;

        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .stocking {
        .btn-wrapper {
            display: inline-block;
            a {
                display: inline-block;
                padding: 4px 15px;
                width: 90px;
                font-size: 14px;
                color: $color_fff;
                border-radius: 4px;
                text-align: center;
                background-color: $color_blue;
            }
        }

        .status {
            position: relative;
            padding-left: 14px;
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 6px;
                height: 6px;
                border-radius: 50px;
            }
        }
        .normal:after {
            background: $color_green;
        }
        .sleep:after {
            background: $color_gray;
        }
    }
</style>
