<template>
    <!--会员管理--渠道设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="btn-wrap">
                <Button type="primary" @click="showChannelModal">+ 新增渠道</Button>
            </div>
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border="true"
                    max-height="450"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="编码">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="渠道名称">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="备注">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="操作">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue" @click="showChannelModal(scope)">修改</span>
                                <span @click="deleteChannel(scope)">删除</span>
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

        <!--新增渠道modal-->
        <add-channel-modal ref="addChannel"></add-channel-modal>

    </div>
</template>

<script>

    import headerTabs from './components/headerTabs.vue'
    import addChannelModal  from '../components/addChannelModal.vue'

    export default {
        components: {
            headerTabs,
            addChannelModal,
        },
        data () {
            return {
                routerName: 'channelSetting',
                // 查询数据
                queryParams: {
                    pageNo: '1',
                    pageSize: '10',
                },
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
            }
        },
        methods: {

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            showChannelModal ( data ) {
                console.log(data)
                this.$refs.addChannel.show();
            },

            deleteChannel ( data ) {
                console.log(data)
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .setting{
        @include block_outline();
        min-width: $content_min_width;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .content {
            padding: 0px 30px;
            height: calc(100% - 124px);
            overflow: auto;

            .btn-wrap{
                height: 60px;
                line-height: 60px;
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
