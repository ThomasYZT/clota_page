<template>
    <!--会员管理--储值管理--财务管理-->
    <div class="member-special">

        <div class="content-item">
            <div class="title">会员储值账户信息</div>
            <div class="content">
                <div class="header-wrap">本账户余额（元）</div>
                <div class="body-wrap">
                    <div class="coast">372,888,881.09</div>
                    <div class="operate-right">
                        <span @click="showTransferModal">转账</span>
                        <span class="split-line"></span>
                        <span @click="viewTransferRecord">转账记录</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-item">
            <div class="title-wrap">下级单位储值账户信息</div>
            <div class="btn-wrap">
                <!--搜索框-->
                <Input v-model="keyword"
                       placeholder="请输入查找内容"
                       style="width: 360px"
                       icon="ios-search-strong"
                       @on-enter="queryList"
                       @on-click="queryList" />
            </div>
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
                                <span class="span-blue"  @click="viewDetail(scope)">详细信息</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!--转账modal-->
        <transfer-modal ref="transfer"></transfer-modal>

    </div>
</template>

<script>

    import transferModal from  './components/transferModal.vue'

    export default {
        components: {
            transferModal,
        },
        data () {
            return {
                keyword: '',
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

            showTransferModal () {
                this.$refs.transfer.show();
            },

            viewTransferRecord () {
                this.$router.push({ name: 'transferRecord'});
            },

            viewFundDetail ( data ) {
                console.log(data);
                this.$router.push({ name: 'fundDetail', query: { info: data.row }});
            },

            viewDetail ( data ) {
                console.log(data);
                this.$router.push({ name: 'juniorDetail', query: { info: data.row }});
            },

            queryList() {

            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-special{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        padding: 20px 30px;

        .content-item{
            margin-bottom: 30px;

            .title-wrap{
                font-size: $font_size_16px;
                color: $color_333;
                margin-bottom: 15px;
            }

            .content{
                border: 1px solid $color_E9E9E9;
                border-radius: 4px 4px 0 0;
                font-size: $font_size_14px;
                margin-top: 15px;

                .header-wrap{
                    background: $color_F5F7FA_050;
                    border-bottom: 1px solid $color_E9E9E9;
                    border-radius: 3px 3px 0 0;
                    height: 40px;
                    line-height: 38px;
                    padding: 0 20px;
                    color: $color_000_085;
                }

                .body-wrap{
                    padding: 0 40px 0 30px;
                    height: 60px;
                    line-height: 60px;
                    @include clearfix();

                    .coast{
                        display: inline-block;
                        font-size: $font_size_18px;
                        color: $color-333;
                        >span{
                            margin-right: 30px;
                        }
                    }

                    .operate-right{
                        float: right;
                        color: $color-blue;
                        >span{
                            cursor: pointer;
                        }
                        .split-line{
                            display: inline-block;
                            width: 1px;
                            height: 14px;
                            background-color: $color-E1E1E1;
                            margin: 0 10px;
                            vertical-align: middle;
                        }
                    }

                }
            }

            .btn-wrap{
                margin-bottom: 10px;
            }

            .table-wrap{

            }

        }

    }
</style>

