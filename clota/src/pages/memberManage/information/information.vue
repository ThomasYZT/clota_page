<template>
    <!--会员管理--会员信息-->
    <div class="member-information">

        <div class="filter-wrap">
            <Select v-model="queryParams.level" style="width:180px">
                <Option v-for="item in level" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select v-model="queryParams.channel" style="width:180px">
                <Option v-for="item in channel" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select v-model="queryParams.type" style="width:180px">
                <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select v-model="queryParams.status" style="width:180px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
        </div>

        <div class="search-wrap">
            <Input v-model="queryParams.keyword" placeholder="请输入姓名、电话、会员编号" style="width: 240px" />
            <Button type="primary">查 询</Button>
            <Button type="ghost">重 置</Button>
        </div>

        <div class="btn-wrap">
            <Button type="primary" @click="add">+ 新增会员</Button>
        </div>

        <div class="table-wrap">
            <el-table
                :data="tableData"
                :border="true"
                max-height="450"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-click="viewDetail">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="会员编码"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="会员姓名"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="手机号"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别"
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="level"
                    label="会员级别"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="会员类型"
                    width="170">
                </el-table-column>
                <el-table-column
                    prop="integ"
                    label="可用积分"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="账户余额"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="虚拟账户余额"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="注册时间"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="operation">
                            <span class="span-blue" @click="modifyData(scope)">修改</span>
                            <span @click="deleteData(scope)">删除</span>
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
                    level: '',
                    channel: '',
                    type: '',
                    status: '',
                    pageNo: '1',
                    pageSize: '10',
                },
                // 枚举数据
                level: [
                    {
                        name: '全部会员等级',
                        value: '0',
                    }
                ],
                channel: [
                    {
                        name: '全部会员渠道',
                        value: '0',
                    }
                ],
                type: [
                    {
                        name: '全部会员类型',
                        value: '0',
                    }
                ],
                status: [
                    {
                        name: '全部会员状态',
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

            add () {
                this.$router.push({ name: 'addMember', query: { type: 'add' }});
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            viewDetail ( data ) {
                console.log(data)
                this.$router.push({ name: 'infoDetail' });
            },

            modifyData ( data ) {
                console.log(data)
                this.$router.push({ name: 'addMember', query: { type: 'modify' }});
            },

            deleteData ( data ) {
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

    .member-information {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        padding-top: 20px;

        .filter-wrap{
            padding: 0 30px;
            margin-bottom: 8px;
        }

        .search-wrap{
            padding: 0 30px;
            margin-bottom: 12px;
        }

        .btn-wrap{
            padding: 0 30px;
            margin-bottom: 15px;
        }

        .table-wrap{

        }

        .page-wrap{
            margin-top: 30px;
            text-align: center;
        }

    }
</style>
