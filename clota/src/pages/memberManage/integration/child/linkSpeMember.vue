<template>
    <!--会员管理--会员积分--特殊会员权益管理--关联会员信息-->
    <div class="integration-link-member-info">

        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/memberManage/integration">特殊会员权益管理</BreadcrumbItem>
                <BreadcrumbItem>关联会员信息</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="rate-content">
            <div class="title-wrap">员工分类：{{ info.type }}</div>
            <div class="filter-wrap">
                <Input v-model="queryParams.keyword" placeholder="请输入姓名、电话、会员编号"/>
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
                        prop="name"
                        label="姓名"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="手机号"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="idNum"
                        label="身份证号"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="操作">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue" @click="showLinkModal(scope)">关联所属类别</span>
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
        <link-belong-modal ref="linkBelong"></link-belong-modal>

    </div>
</template>

<script>

    import linkBelongModal from '../components/linkBelongModal.vue'

    export default {
        components: {
            linkBelongModal,
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
                        name: '张三',
                        mobile: '15322222222',
                        idNum: '222212121212121212',
                    },
                    {
                        name: '张三',
                        mobile: '15322222222',
                        idNum: '222212121212121212',
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

            showLinkModal ( data ) {
                console.log(data);
                this.$refs.linkBelong.show();
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

    .integration-link-member-info {
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
                /deep/ .ivu-input-wrapper{
                    width: 240px;
                    margin-right: 15px;
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

</style>
