<template>
    <!--会员管理--会员积分--设置积分率折扣率（类型/产品）-->
    <div class="integration-set-rate-for-product">

        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/memberManage/integration">积分、折扣率设置</BreadcrumbItem>
                <BreadcrumbItem to="/memberManage/setRate">钻石会员积分、折扣率设置</BreadcrumbItem>
                <BreadcrumbItem>按类别或产品设置积分、折扣率</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="rate-content">
            <div class="title-wrap">店铺：{{ info.name }}</div>
            <div class="filter-wrap">
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
                        label="产品编码"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="店铺名称"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型"
                        width="120"
                        :filters="[{ text: '主食', value: '主食' }, { text: '酒水', value: '酒水' }]"
                        :filter-method="filterTag"
                        filter-placement="bottom-end">
                    </el-table-column>
                    <el-table-column
                        prop="integRate"
                        label="积分率"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="discountRate"
                        label="折扣率"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="操作">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue" @click="showModifyModal(scope)">设置积分、折扣率</span>
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

        <!--总体积分率折扣率设置modal-->
        <modify-rate-modal ref="modifyRate" title="设置积分、折扣率"></modify-rate-modal>

    </div>
</template>

<script>

    import modifyRateModal from '../components/modifyRateModal.vue'

    export default {
        components: {
            modifyRateModal,
        },
        data () {
            return {
                //跳转信息
                info: {},
                // 查询数据
                queryParams: {
                    keyword: '',
                    pageNo: '1',
                    pageSize: '10',
                },
                // 表格数据
                tableData: [
                    {
                        id: '0029179379281379',
                        type: '主食',
                        name: '西红柿鸡蛋面',
                        integRate: '-',
                        discountRate: '-',
                    },
                    {
                        id: '0029179379281379',
                        type: '主食',
                        name: '酸菜鱼',
                        integRate: '0.5',
                        discountRate: '0.95',
                    },
                    {
                        id: '0029179379281379',
                        type: '酒水',
                        name: '红牛饮料',
                        integRate: '1',
                        discountRate: '0.8',
                    },
                    {
                        id: '0029179379281379',
                        type: '主食',
                        name: '雪花肥牛',
                        integRate: '2',
                        discountRate: '0.6',
                    },
                ],
                total: 50,
            }
        },
        created() {
            this.init();
        },
        methods: {

            init() {
                if (this.$route.query && this.$route.query.info) {
                    this.info = this.$route.query.info;
                }
            },

            filterTag(value, row) {
                return row.type === value;
            },

            showModifyModal ( data ) {
                console.log(data);
                this.$refs.modifyRate.show();
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

    .integration-set-rate-for-product {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .breadcrumb-box {
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .rate-content{
            padding: 20px 30px;

            .title-wrap{
                font-size: $font_size_18px;
                color: $color_333;
                margin-bottom: 10px;
            }

            .filter-wrap{
                margin-bottom: 10px;
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

