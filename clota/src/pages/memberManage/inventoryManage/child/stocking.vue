<!--
    进销存管理--库存盘点
    作者：杨泽涛
-->
<template>
    <div class="stocking">
        <!-- 面包屑导航 -->
        <breadCrumbHead
            :before-router-list="beforeRouterList"
            :locale-router="$t('stocking')"
        >
        </breadCrumbHead>

        <Form ref="formBody"
              label-position="right"
              :label-width="180">
            <toolBox :toolNum="3">
                <div slot="tool0">
                    <Form-item :label="$t('changeType')+':'">
                        <Select v-model="filterData.changeType" style="width:250px">
                            <Option v-for="(item, index) in changeTypeList" :value="item.value" :key="index">{{ $t(item.label) }}</Option>
                        </Select>
                    </Form-item>
                </div>
                <div slot="tool1">
                    <Form-item :label="$t('startEndDate')+':'">
                        <DatePicker type="daterange" split-panels
                                    v-model="dateRange"
                                    :placeholder="$t('selectField', { msg : $t('startEndDate') })"
                                    style="width: 250px"></DatePicker>
                    </Form-item>
                </div>
                <div slot="tool2">
                    <Button class="ivu-btn-90px" type="primary" @click="getListData">{{$t('orgStructQuery')}}</Button>
                    <div class="btn-wrapper">
                        <Button class="ivu-btn-90px" type="primary">{{$t('exporting')}}</Button>
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
                        {{ scope.row.stockNum + scope.row.undrawNum }}
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
                        {{ scope.row.goodsStatus === 'down' ? $t('down') : $t('up') }}
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
                        <div class="operate">
                            <span class="operate-btn blue" @click="stockDetail(scope.row)">{{$t('stockDetail')}}</span>
                        </div>
                    </template>
                </el-table-column>
            </tableCom>
        </div>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import toolBox from '../components/toolBox';
    import { stockingHead } from './tableConfig';
    import ajax from '@/api/index';
    export default {
        components : {
            tableCom,
            breadCrumbHead,
            toolBox
        },
        data () {
            return {
                //路由信息
                beforeRouterList : [
                    {
                        name : 'inventoryManage',
                    }
                ],
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
        methods : {
            /**
             * 日期改变转换格式
             * @param {object} data
             */
            dateChange (data) {
                this.filterData.startDate = data[0];
                this.filterData.endDate = data[1];
            },
            /**
             * 获取库存盘点列表数据
             */
            getListData () {
                this.filterData.startDate = new Date(this.dateRange[0]).format('yyyy-MM-dd');
                this.filterData.endDate = new Date(this.dateRange[1]).format('yyyy-MM-dd');
                ajax.post('queryGoodsStock', this.filterData).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.$Message.error(this.$t('dataGetError'));
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
            }
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
            float: right;
        }

        .operate {
            .operate-btn {
                cursor: pointer;
                margin-right: 10px;
            }

            .blue {
                color: #2F70DF;
            }
        }
    }
</style>
