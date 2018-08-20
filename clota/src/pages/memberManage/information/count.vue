<template>
    <!--会员统计-->
    <div class="member-count">

        <div class="count-header">
            <Select v-model="queryParams.scene" style="width:200px">
                <Option v-for="item in scene" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select v-model="queryParams.store" style="width:200px">
                <Option v-for="item in store" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
        </div>

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
                    <Input v-model="queryParams.keyword" placeholder="请输入姓名、电话、会员编号" style="width: 240px" />
                    <Button type="primary">查 询</Button>
                    <Button type="ghost">重 置</Button>
                </div>
                <div class="table-wrap">
                    <el-table
                        :data="tableData"
                        :border="true"
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="会员姓名">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="idNum"
                            label="身份证号">
                        </el-table-column>
                        <el-table-column
                            prop="sex"
                            label="性别">
                        </el-table-column>
                        <el-table-column
                            prop="belongTo"
                            label="会员归属">
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="listDetail(scope.row)">详情</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page-wrap" v-if="tableData.length > 0">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="parseInt(queryParams.pageNo)"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="parseInt(queryParams.pageSize)"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="parseInt(total)">
                    </el-pagination>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

    import dataTotal from '../components/dataShow.vue'
    import chartPie from '../components/chartPie.vue'

    export default {
        components: {
            dataTotal,
            chartPie,
        },
        data () {
            return {
                // 查询数据
                queryParams: {
                    keyword: '',
                    scene: '',
                    store: '',
                    pageNo: '1',
                    pageSize: '10',
                },
                // 枚举数据
                scene: [
                    {
                        name: '北京欢乐谷',
                        value: '0',
                    }
                ],
                store: [
                    {
                        name: '全部店铺',
                        value: '0',
                    }
                ],
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
                tableData: [
                    {
                        name: '张三',
                        mobile: '16876868839',
                        idNum: '4307283898172933',
                        sex: '男',
                        belongTo: '北京欢乐谷',
                    }
                ],
                total: 50,
            }
        },
        methods: {

            listDetail ( data ) {
                console.log(data)
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .count-header{
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
            background: $color_F4F6F8;
        }

        .count-content{
            padding: 20px;

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

                .table-wrap{

                }

                .page-wrap{
                    margin-top: 30px;
                    text-align: center;
                }
            }

        }

    }

</style>
