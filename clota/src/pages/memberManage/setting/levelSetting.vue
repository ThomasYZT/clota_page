<template>
    <!--会员管理--会员级别-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="btn-wrap">
                <Button type="primary" @click="showAddMemberModal">+ 新增会员</Button>
                <Button type="primary" @click="showRuleModal">晋级设置</Button>
            </div>
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border="true"
                    max-height="450"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="等级编码">
                    </el-table-column>
                    <el-table-column
                        prop="level"
                        label="会员级别">
                    </el-table-column>
                    <el-table-column
                        prop="fund"
                        label="是否储值">
                        <template slot-scope="scope">
                            <Icon type="checkmark-round" v-if="scope.row.fund === 'true'"></Icon>
                            <Icon type="close-round" v-else></Icon>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="integ"
                        label="是否积分">
                        <template slot-scope="scope">
                            <Icon type="checkmark-round" v-if="scope.row.integ === 'true'"></Icon>
                            <Icon type="close-round" v-else></Icon>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="range"
                        label="成长值范围">
                    </el-table-column>
                    <el-table-column
                        prop="ramark"
                        label="备注">
                        <template slot-scope="scope">
                            <div>{{scope.row.ramark || '-'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="操作">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue" @click="showAddMemberModal(scope)">修改</span>
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

        <!--新增会员modal-->
        <add-member-modal ref="addMember"></add-member-modal>

        <!--会员等级晋升规则设置modal-->
        <member-rule-modal ref="memberRule"></member-rule-modal>

    </div>
</template>

<script>

    import headerTabs from './components/headerTabs.vue'
    import addMemberModal  from '../components/addMemberModal.vue'
    import memberRuleModal  from '../components/memberRuleModal.vue'

    export default {
        components: {
            headerTabs,
            addMemberModal,
            memberRuleModal,
        },
        data () {
            return {
                routerName: 'levelSetting',
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
                        integ: 'false',
                        balance: '737.00',
                        create_time: '2015-01-01',
                        fund: 'true',
                        range: '0-999',
                        ramark: '是备注',
                    },
                    {
                        disabled: 'true',
                        id: '309287482',
                        name: '张三',
                        mobile: '16876868839',
                        sex: '男',
                        level: '黄金会员',
                        type: '正式会员',
                        integ: 'true',
                        balance: '737.00',
                        create_time: '2015-01-01',
                        fund: 'true',
                        range: '3000-不限',
                        ramark: '',
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

            showAddMemberModal ( data ) {
                console.log(data)
                this.$refs.addMember.show();
            },

            showRuleModal ( data ) {
                console.log(data)
                this.$refs.memberRule.show();
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

