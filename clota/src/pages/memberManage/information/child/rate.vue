<template>
    <!--享受积分、折扣率信息-->
    <div class="member-rate">

        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/memberManage/memberInfo">会员信息</BreadcrumbItem>
                <BreadcrumbItem to="/memberManage/infoDetail">会员详情</BreadcrumbItem>
                <BreadcrumbItem>享受积分、折扣率信息</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="rate-content">
            <div class="title-wrap">享受积分、折扣率信息</div>
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border="false"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="店铺">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类别">
                    </el-table-column>
                    <el-table-column
                        prop="integ"
                        label="积分率">
                    </el-table-column>
                    <el-table-column
                        prop="rebate"
                        label="折扣率">
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
                        name: '张记手擀面',
                        type: '主食',
                        integ: '1积分=1元',
                        rebate: '9.5折',
                    }
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-rate{
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

        .rate-content{
            padding: 20px 30px;

            .title-wrap{
                font-size: $font_size_16px;
                color: $color_333;
                margin-bottom: 15px;
            }

        }

    }
</style>


