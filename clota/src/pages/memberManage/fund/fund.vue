<template>
    <!--会员管理--储值管理--储值账户-->
    <div class="member-fund-account">

        <div class="fund-account-header">
            <Select v-model="queryParams.level" style="width:200px">
                <Option v-for="item in level" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select v-model="queryParams.status" style="width:200px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select v-model="queryParams.channel" style="width:200px">
                <Option v-for="item in channel" :value="item.value" :key="item.value">{{ item.name }}</Option>
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
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
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
                    label="会员级别">
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="账户余额">
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="虚拟账户余额">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="operation">
                            <span class="span-blue" @click="addFund(scope)">新增储值</span>
                        </div>
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
                    level: '',
                    status: '',
                    channel: '',
                    pageNo: '1',
                    pageSize: '10',
                },
                // 枚举数据
                level: [
                    {
                        name: '北京欢乐谷',
                        value: '0',
                    }
                ],
                status: [
                    {
                        name: '全部店铺',
                        value: '0',
                    }
                ],
                channel: [
                    {
                        name: '全部店铺',
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
                        balance: '737.00',
                        create_time: '2015-01-01',
                    }
                ],
                total: 50,
                multipleSelection: [],
            }
        },
        methods: {

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

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

        }

        .page-wrap{
            margin-top: 30px;
            text-align: center;
        }
    }

</style>
