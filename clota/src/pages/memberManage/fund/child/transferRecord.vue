<template>
    <!--会员管理--储值管理--财务管理--转账记录-->
    <div class="member-transfer-record">

        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/memberManage/financialManagement">财务管理</BreadcrumbItem>
                <BreadcrumbItem>转账记录</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="transfer-content">
            <div class="filter-wrap">
                <Select v-model="queryParams.type" style="width:180px">
                    <Option value="''">全部交易类型</Option>
                    <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <Date-picker
                    style="width:180px"
                    type="date"
                    v-model="queryParams.startTime"
                    placeholder="请选择开始日期">
                </Date-picker>
                <Date-picker
                    style="width:180px"
                    type="date"
                    v-model="queryParams.endTime"
                    placeholder="请选择结束日期">
                </Date-picker>
                <Input v-model="queryParams.keyword" placeholder="请输入姓名、电话、会员编号" style="width: 240px" />
                <Button type="primary">查 询</Button>
                <Button type="ghost">重 置</Button>
            </div>
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border="true"
                    max-height="450"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="会员编码">
                    </el-table-column>
                    <el-table-column
                        prop="transferFund"
                        label="转账金额(元)">
                        <template slot-scope="scope">
                            <span :class="scope.row.transferFund && scope.row.transferFund > 0 ? 'green-color' : 'red-color'">{{showNumFunc(scope.row.transferFund)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型">
                    </el-table-column>
                    <el-table-column
                        prop="serverCharge"
                        label="手续费(元)">
                    </el-table-column>
                    <el-table-column
                        prop="outer"
                        label="转出账户">
                    </el-table-column>
                    <el-table-column
                        prop="inner"
                        label="转入账户">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="转账时间">
                    </el-table-column>
                    <el-table-column
                        prop="operator"
                        label="操作人">
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注">
                        <template slot-scope="scope">
                            <span>{{scope.row.remark || '-'}}</span>
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
</template>

<script>


    export default {
        components: {},
        data () {
            return {
                // 查询数据
                queryParams: {
                    keyword: '',
                    type: '',
                    startTime: '',
                    endTime: '',
                    pageNo: '1',
                    pageSize: '10',
                },
                // 枚举数据
                type: [
                    {
                        name: '北京欢乐谷',
                        value: '0',
                    }
                ],
                // 表格数据
                tableData: [
                    {
                        id: '749374378',
                        transferFund: '789.93',
                        type: '收入',
                        serverCharge: '0.00',
                        outer: '北京欢乐谷',
                        inner: '天津欢乐谷',
                        time: '2018.09.01 08:11:22',
                        operator: '王大锤',
                        remark: '这是动物园门票',
                    },
                    {
                        id: '749374378',
                        transferFund: '-789.93',
                        type: '支出',
                        serverCharge: '32.32',
                        outer: '天津欢乐谷',
                        inner: '北京欢乐谷',
                        time: '2018.09.01 08:11:22',
                        operator: '王大锤',
                        remark: '这是动物园门票',
                    },
                ],
                total: 50,
            }
        },
        methods: {

            viewDetail ( data ) {
                console.log(data)
                this.$refs.modifyDetail.show('fund');
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            /**
             * 显示数值正负
             * @param n
             */
            showNumFunc ( n ) {
                let num = n ? parseFloat(n) : null;
                if (num && num > 0) {
                    return '+'+num
                } else if(num && num < 0) {
                    return num
                } else if(num === 0) {
                    return '0'
                } else {
                    return '-'
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-transfer-record{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        position: relative;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .transfer-content{

            .filter-wrap{
                height: 60px;
                line-height: 60px;
                padding: 0 30px;
            }

            .table-wrap{

                .green-color{
                    color: $color_green;
                }

                .red-color{
                    color: $color_red;
                }

            }

            .page-wrap{
                margin-top: 30px;
                text-align: center;
            }
        }

    }
</style>


