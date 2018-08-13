<template>
    <!--个人积分交易明细-->
    <div class="member-integration-detail">

        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/memberManage/memberInfo">会员信息</BreadcrumbItem>
                <BreadcrumbItem to="/memberManage/infoDetail">会员详情</BreadcrumbItem>
                <BreadcrumbItem>个人积分交易明细</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="integration-detail-content">
            <div class="filter-wrap">
                <Select v-model="queryParams.type" style="width:200px">
                    <Option value="''">全部交易类型</Option>
                    <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <Date-picker
                    type="date"
                    v-model="queryParams.startTime"
                    placeholder="请选择开始日期">
                </Date-picker>
                <Date-picker
                    type="date"
                    v-model="queryParams.endTime"
                    placeholder="请选择结束日期">
                </Date-picker>
                <Button type="primary">查 询</Button>
                <Button type="ghost">重 置</Button>
            </div>
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border="true"
                    @row-click="viewDetail"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="本次交易积分">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="交易类型">
                    </el-table-column>
                    <el-table-column
                        prop="idNum"
                        label="交易编码">
                    </el-table-column>
                    <el-table-column
                        prop="sex"
                        label="交易信息">
                    </el-table-column>
                    <el-table-column
                        prop="belongTo"
                        label="交易后账户积分">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="交易时间">
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

        <!--积分修改信息modal-->
        <modify-detail-modal ref="modifyDetail"></modify-detail-modal>

    </div>
</template>

<script>

    import modifyDetailModal from '../components/viewModify.vue'

    export default {
        components: {
            modifyDetailModal,
        },
        data () {
            return {
                // 查询数据
                queryParams: {
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
                        name: '张三',
                        mobile: '16876868839',
                        idNum: '4307283898172933',
                        sex: '男',
                        belongTo: '北京欢乐谷',
                        time: '2018.07.09 08:00:11',
                    }
                ],
                total: 50,
            }
        },
        methods: {

            viewDetail ( data ) {
                console.log(data)
                this.$refs.modifyDetail.show('integration');
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

    .member-integration-detail{
        @include block_outline();
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

        .integration-detail-content{

            .filter-wrap{
                height: 60px;
                line-height: 60px;
                padding: 0 30px;
            }

            .table-wrap{

            }

            .page-wrap{
                margin-top: 30px;
                text-align: center;
            }
        }

    }
</style>



