<template>
    <!--会员管理--储值管理--财务管理--下级单位储值账户信息详情-->
    <div class="member-junior-detail">

        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/memberManage/financialManagement">财务管理</BreadcrumbItem>
                <BreadcrumbItem>下级单位储值账户信息详情</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="junior-content">
            <div class="title-wrap">单位：天津欢乐谷景区</div>
            <div class="little-title">总余额：478,323.02元</div>
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border='true'
                    style="width: 100%">
                    <el-table-column
                        prop="level"
                        label="公司名称">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="账户余额（元）">
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="操作">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue"  @click="viewFundDetail(scope)">资金明细</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>
</template>

<script>


    export default {
        components: {},
        data () {
            return {
                // 表格数据
                tableData: [
                    {
                        level: '普通会员',
                        type: '普通员工',
                    },
                    {
                        level: '黄金会员',
                        type: '经理级',
                    },
                    {
                        level: '铂金会员',
                        type: '项目老总',
                    },
                    {
                        level: '钻石会员',
                        type: '董事长',
                    },
                ],
            }
        },
        methods: {

            viewFundDetail ( data ) {
                console.log(data);
                this.$router.push({ name: 'fundDetail', query: { info: data.row }});
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-junior-detail{
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

        .junior-content{
            margin-bottom: 30px;
            padding: 30px 45px;

            .title-wrap{
                font-size: $font_size_18px;
                color: $color_333;
                margin-bottom: 5px;
            }

            .little-title{
                font-size: $font_size_14px;
                color: $color_606266;
                margin-bottom: 15px;
            }

            .btn-wrap{
                margin-bottom: 10px;
            }

            .table-wrap{

            }

        }

    }
</style>



