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
                <table-com
                    ref="multipleTable"
                    :table-data="tableData"
                    :table-height="tableHeight"
                    :column-data="levelListHead"
                    :border="true">
                    <el-table-column
                        slot="column2"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        slot-scope="row">
                        <template slot-scope="scoped">
                            <Icon type="checkmark-round" v-if="scoped.row.isRecharge === 'true'"></Icon>
                            <Icon type="close-round" v-else></Icon>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column3"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        slot-scope="row">
                        <template slot-scope="scoped">
                            <Icon type="checkmark-round" v-if="scoped.row.isScore === 'true'"></Icon>
                            <Icon type="close-round" v-else></Icon>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column4"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        slot-scope="row">
                        <template slot-scope="scoped">
                           <span>{{scoped.row.lowerGrowthValue}} - {{scoped.row.highestGrowthValue}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column6"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        fixed="right"
                        slot-scope="row">
                        <template slot-scope="scoped">
                            <div class="operation">
                                <span class="span-blue" @click="showAddMemberModal($event,scoped.row)">修改</span>
                                <span @click="deleteChannel($event,scoped.row)">删除</span>
                            </div>
                        </template>
                    </el-table-column>
                </table-com>
            </div>

            <!--<div class="page-wrap" v-if="tableData.length > 0">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNo"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="parseInt(total)">
                </el-pagination>
            </div>-->

        </div>

        <!--新增会员modal-->
        <add-member-modal ref="addMember"></add-member-modal>

        <!--会员等级晋升规则设置modal-->
        <member-rule-modal ref="memberRule"></member-rule-modal>

    </div>
</template>

<script>

    import ajax from '@/api/index'
    import tableCom from '@/pages/memberManage/components/tableCom';
    import tableMixins from '@/mixins/tableMixins';
    import {levelListHead} from './levelConfig';
    import headerTabs from './components/headerTabs.vue'
    import addMemberModal  from '../components/addMemberModal.vue'
    import memberRuleModal  from '../components/memberRuleModal.vue'

    export default {
        mixins : [tableMixins],
        components: {
            headerTabs,
            addMemberModal,
            memberRuleModal,
            tableCom,
        },
        data () {
            return {
                //当前页面路由名称
                routerName: 'levelSetting',
                //列表表头
                levelListHead : levelListHead,
                // 表格数据
                tableData: [],
                total: 0,
            }
        },
        created(){
            //查询列表
            this.queryList();
        },
        methods: {

            showAddMemberModal ( data ) {
                console.log(data)
                this.$refs.addMember.show();
            },

            showRuleModal ( data ) {
                console.log(data)
                this.$refs.memberRule.show();
            },

            //查询列表(查询表格取统一的方法名)
            queryList () {
                var list = [
                    {
                        channelName: "饿了吗2",
                        companyId: 1,
                        createUser: 123,
                        createdTime: "2018-08-15 11:20:17",
                        id: 1,
                        isDeleted: "false",
                        remark: "222",
                        status: "1",
                        updateUser: 456,
                        updatedTime: "2018-08-20 16:56:19",
                    },
                ];
                ajax.post('queryMemberLevels', {
                    pageNo: 1,
                    pageSize: 99999,
                    companyId: '1',
                    orgId: '101',
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data || [];
                        this.total = res.data.totalRow || 0;
                        this.setTableHeight();
                    } else {
                        console.log(res);
                        this.$Message.warning('queryChannelSet 查询失败！');
                    }
                })
            },

            //增加/修改渠道
            showChannelModal ( event, data ) {
                console.log(data)
                this.$refs.addChannel.show(data);
            },

            //删除数据
            deleteLevelInfo ( event, data ) {
                console.log(data)
                ajax.post('queryMemberLevels', {
                    companyId: '',
                    orgId: '',
                    id: data.id,
                    isDeleted: 'true',
                }).then(res => {
                    if(res.success){
                        this.$Message.success('删除成功！');
                        //查询列表
                        this.queryList();
                    } else {
                        console.log(res);
                        this.$Message.warning('queryMemberLevels 删除失败！');
                    }
                })
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
                /deep/ .ivu-btn{
                    width: 108px;
                    margin-right: 15px;
                }
            }

            .table-wrap{
                max-height: calc(100% - 70px);

                .ivu-icon-checkmark-round, .ivu-icon-close-round{
                    color: $color_C0CDDF;
                }
            }

            .page-wrap{
                margin-top: 30px;
                text-align: center;
            }

        }

    }
</style>

