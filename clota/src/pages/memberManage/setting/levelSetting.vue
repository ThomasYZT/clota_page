<template>
    <!--会员管理--会员级别-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="btn-wrap">
                <Button type="primary" @click="showAddMemberModal">+ 新增会员级别</Button>
                <Button type="primary"
                        :disabled="tableData.length > 0 ? false : true"
                        @click="showRuleModal">晋级设置</Button>
            </div>
            <div class="table-wrap">
                <table-com
                    :ofsetHeight="180"
                    :column-data="levelListHead"
                    :table-data="tableData"
                    :border="true">
                    <el-table-column
                        slot="column3"
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
                        slot="column5"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        fixed="right"
                        slot-scope="row">
                        <template slot-scope="scoped">
                            <ul class="operate-list">
                                <li class="blue-label" @click="showAddMemberModal($event,scoped.row)">修改</li>
                                <li class="red-label" @click="deleteLevelInfo($event,scoped.row)">删除</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>

        </div>

        <!--新增会员modal-->
        <add-member-modal ref="addMember" @modify-success="queryList"></add-member-modal>

        <!--会员等级晋升规则设置modal-->
        <member-rule-modal ref="memberRule" @modify-success="queryList"></member-rule-modal>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {levelListHead} from './levelConfig';
    import headerTabs from './components/headerTabs.vue';
    import addMemberModal  from '../components/addMemberModal.vue';
    import memberRuleModal  from '../components/memberRuleModal.vue';

    export default {
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
            }
        },
        created(){
            //查询列表
            this.queryList();
        },
        methods: {

            showAddMemberModal ( event, data ) {
                console.log(data)
                this.$refs.addMember.show( data || null );
            },

            showRuleModal () {
                this.$refs.memberRule.show( this.tableData );
            },

            //查询列表(查询表格取统一的方法名)
            queryList () {
                ajax.post('queryMemberLevels', {
                    pageNo: 1,
                    pageSize: 99999,
                    isDeleted: 'false',
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data || [];
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'queryMemberLevels 查询失败！');
                    }
                })
            },

            //增加/修改会员级别
            showChannelModal ( event, data ) {
                console.log(data)
                this.$refs.addChannel.show(data);
            },

            //删除数据
            deleteLevelInfo ( event, data ) {
                console.log(data)
                ajax.post('deleteMemberLevel', {
                    id: data.id,
                    isDeleted: 'true',
                }).then(res => {
                    if(res.success){
                        this.$Message.success('删除成功！');
                        //查询列表
                        this.queryList();
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'deleteMemberLevel 删除失败！');
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
                    min-width: 108px;
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

