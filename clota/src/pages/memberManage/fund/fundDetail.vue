<template>
    <!--会员管理--储值管理--资金明细-->
    <div class="member-fund-account">

        <div class="fund-account-header">
            <Select v-model="queryParams.type" style="width:180px">
                <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
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
                    prop="name"
                    label="会员姓名">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                </el-table-column>
                <el-table-column
                    prop="level"
                    label="交易类型">
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="本次交易金额"
                    width="150">
                    <template slot-scope="scope">
                        <span :class="scope.row.balance && scope.row.balance > 0 ? 'green-color' : 'red-color'">{{showNumFunc(scope.row.balance)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="send"
                    label="本次储值赠送金额"
                    width="150">
                    <template slot-scope="scope">
                        <span :class="scope.row.send && scope.row.send > 0 ? 'green-color' : 'red-color'">{{showNumFunc(scope.row.send)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="交易后账户余额 ">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="交易时间">
                </el-table-column>
                <el-table-column
                    prop="recorder"
                    label="操作人员记录">
                    <template slot-scope="scope">
                        <span>{{scope.row.recorder || '-'}}</span>
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

        <!--新增储值modal-->
        <add-fund-modal ref="addFund"></add-fund-modal>

    </div>
</template>

<script>

    import addFundModal  from '../components/addFundModal.vue'

    export default {
        components: {
            addFundModal,
        },
        data () {
            return {
                // 查询数据
                queryParams: {
                    keyword: '',
                    type: '',
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
                        disabled: 'false',
                        id: '309287482',
                        name: '张三',
                        mobile: '16876868839',
                        sex: '男',
                        level: '黄金会员',
                        type: '正式会员',
                        integ: '1999',
                        balance: '737.00',
                        create_time: '2015-01-01',
                    },
                    {
                        disabled: 'true',
                        id: '309287482',
                        name: '张三',
                        mobile: '16876868839',
                        sex: '男',
                        level: '黄金会员',
                        type: '正式会员',
                        integ: '1999',
                        balance: '-737.00',
                        create_time: '2015-01-01',
                    }
                ],
                total: 50,
            }
        },
        methods: {

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            addFund ( data ) {
                console.log(data)
                this.$refs.addFund.show();
            },

            /**
             * 显示数值正负
             * @param n
             */
            showNumFunc ( n ) {
                let num = n ? parseInt(n) : null;
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
    .member-fund-account{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .fund-account-header{
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
            background: $color_F4F6F8;
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

</style>

