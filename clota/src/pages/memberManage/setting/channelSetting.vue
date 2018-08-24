<template>
    <!--会员管理--渠道设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="btn-wrap">
                <Button type="primary" @click="showChannelModal($event)">+ 新增渠道</Button>
            </div>
            <div class="table-wrap">
                <table-com
                    ref="multipleTable"
                    :table-data="tableData"
                    :table-height="tableHeight"
                    :column-data="channelListHead"
                    :border="true">
                    <el-table-column
                        slot="column3"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        fixed="right"
                        slot-scope="row">
                        <template slot-scope="scoped">
                            <div class="operation">
                                <span class="span-blue" @click="showChannelModal($event,scoped.row)">修改</span>
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

        <!--新增渠道modal-->
        <add-channel-modal ref="addChannel" @close-modal="queryList"></add-channel-modal>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/pages/memberManage/components/tableCom';
    import tableMixins from '@/mixins/tableMixins';
    import {channelListHead} from './channelConfig';
    import headerTabs from './components/headerTabs.vue';
    import addChannelModal  from '../components/addChannelModal.vue';

    export default {
        mixins : [tableMixins],
        components: {
            headerTabs,
            addChannelModal,
            tableCom,
        },
        data () {
            return {
                //当前页面路由名称
                routerName: 'channelSetting',
                //列表表头
                channelListHead : channelListHead,
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

            //查询列表(查询表格取统一的方法名)
            queryList () {
                ajax.post('queryChannelSet', {
                    pageNo: 1,
                    pageSize: 99999,
                    isDeleted: 'false',
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
            deleteChannel ( event, data ) {
                console.log(data)
                ajax.post('updateChannelSet', {
                    id: data.id,
                    isDeleted: 'true',
                }).then(res => {
                    if(res.success){
                        this.$Message.success('删除成功！');
                        //查询列表
                        this.queryList();
                    } else {
                        console.log(res);
                        this.$Message.warning('queryChannelSet 删除失败！');
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
            }

            .table-wrap{
                max-height: calc(100% - 70px);
            }

            .page-wrap{
                margin-top: 30px;
                text-align: center;
            }

        }

    }
</style>
