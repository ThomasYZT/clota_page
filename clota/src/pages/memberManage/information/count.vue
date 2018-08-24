<template>
    <!--会员统计-->
    <div class="member-count">

        <!--<div class="count-header">-->
            <!--<Select v-model="queryParams.scene" style="width:200px">-->
                <!--<Option v-for="item in scene" :value="item.value" :key="item.value">{{ item.name }}</Option>-->
            <!--</Select>-->
            <!--<Select v-model="queryParams.store" style="width:200px">-->
                <!--<Option v-for="item in store" :value="item.value" :key="item.value">{{ item.name }}</Option>-->
            <!--</Select>-->
        <!--</div>-->

        <div class="count-content">

            <div class="home-data-show">
                <!--会员数据概览-->
                <div class="data-show-left">
                    <data-total :data-count="dataCount"></data-total>
                </div>
                <!--会员分布数据-->
                <div class="data-show-right">
                    <chart-pie :data-pie="dataPie"></chart-pie>
                </div>
            </div>

            <div class="table-container">
                <div class="title-wrap">会员信息查询</div>
                <div class="filter-wrap">
                    <Input v-model="keyword"
                           placeholder="请输入姓名、电话、会员编号"
                           style="width: 240px" />
                    <Button type="primary" @click="queryList">查 询</Button>
                    <Button type="ghost" @click="resetKeyword">重 置</Button>
                </div>
                <table-com
                    :auto-height="true"
                    :table-com-min-height="300"
                    :ofsetHeight="170"
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
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(scope.row['gender'])}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column5"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue" @click="toDetail(scope.row)">详情</span>
                            </div>
                        </template>
                    </el-table-column>
                </table-com>
            </div>

        </div>

    </div>
</template>

<script>

    import dataTotal from '../components/dataShow.vue';
    import chartPie from '../components/chartPie.vue';
    import ajax from '@/api/index.js';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {countHead} from './countConfig';

    export default {
        components: {
            dataTotal,
            chartPie,
            tableCom
        },
        data () {
            return {
                //关键字
                keyword : '',
                // 会员数据概览
                dataCount: {
                    time: '2017-07',
                    total: '7392',
                    todayAdd: '162',
                    yestAdd: '220',
                    monthAdd: '1928',
                },
                // 会员分布数据
                dataPie: {
                    time: '2017-07',
                },
                // 表格数据
                tableData: [],
                //总条数
                totalCount: 50,
                pageSize : 10,
                pageNo : 1,
                //表头配置
                columnData : countHead
            }
        },
        methods: {
            /**
             * 查询会员信息
             */
            queryList () {
                ajax.post('queryMemberPage', {
                    keyWord : this.keyword,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.totalCount = 0;
                });
            },
            /**
             * 重置查询条件
             */
            resetKeyword () {
                this.keyword = '';
                this.queryList();
            },
            /**
             * 跳转到会员详情
             * @param data
             */
            toDetail (data) {
                this.$router.push({
                    name : 'infoDetail',
                    params : {
                        detail : data
                    }
                });
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-count{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .count-content{
            padding: 20px 20px 0 20px;

            .home-data-show{
                width: 100%;
                height: 245px;
                margin-bottom: 30px;
                @include clearfix();

                .data-show-left{
                    height: 100%;
                    float: left;
                    width: calc(50% - 8px);
                    margin-right: 15px;
                    display: inline-block;
                }

                .data-show-right{
                    height: 100%;
                    width: calc(50% - 8px);
                    display: inline-block;
                }
            }

            .table-container{

                .title-wrap{
                    font-size: $font_size_16px;
                    color: $color_333;
                    margin-bottom: 15px;
                }

                .filter-wrap{
                    margin-bottom: 10px;
                    /deep/ .ivu-input-wrapper{
                        width: 240px;
                        margin-right: 20px;
                    }
                    /deep/ .ivu-btn{
                        margin-right: 5px;
                    }
                }

            }
        }

    }

</style>
