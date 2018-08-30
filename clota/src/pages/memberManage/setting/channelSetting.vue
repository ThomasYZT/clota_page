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
                    :ofsetHeight="180"
                    :column-data="channelListHead"
                    :table-data="tableData"
                    :border="true">
                    <el-table-column
                        slot="column0"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip
                        slot-scope="row">
                    </el-table-column>
                    <el-table-column
                        slot="column1"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip
                        slot-scope="row">
                    </el-table-column>
                    <el-table-column
                        slot="column2"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip
                        slot-scope="row">
                    </el-table-column>
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
                            <ul class="operate-list">
                                <li class="blue-label" @click="showChannelModal($event,scoped.row)">修改</li>
                                <li class="red-label" @click="deleteChannel($event,scoped.row)">删除</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>

        </div>

        <!--新增渠道modal-->
        <add-channel-modal ref="addChannel" @close-modal="queryList"></add-channel-modal>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {channelListHead} from './channelConfig';
    import headerTabs from './components/headerTabs.vue';
    import addChannelModal  from '../components/addChannelModal.vue';

    export default {
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
                    } else {
                        console.log(res);
                        this.$Message.warning('queryChannelSet '+ $t('queryFailure') +'！');
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
                        this.$Message.success(this.$t('successTip', {tip: 'del'}) + '！');     // 删除成功
                        //查询列表
                        this.queryList();
                    } else {
                        console.log(res);
                        this.$Message.warning('queryChannelSet '+ this.$t('failureTip', {tip: 'del'}) +'！');     // 删除失败
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
