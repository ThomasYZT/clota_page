<!--渠道信息-->

<template>
    <div class="list-info">
        <div class="btn-area">
            <div class="search-by-word">
                <Input v-model.trim="channelListParams.channelName"
                       :placeholder="$t('validateError.pleaseInput', { msg: $t('channelName')})"/>
                <Button type="primary"
                        class="ivu-btn-90px"
                        @click="searchList">{{$t('query')}}</Button>
            </div>
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="add">{{$t('add')}}</Button>
            <Button type="error"
                    :disabled="rowSelect.length < 1"
                    @click="bitchDel">{{$t('deleteBatch')}}</Button>
        </div>

        <table-com
            :ofsetHeight="116"
            :show-pagination="true"
            :column-data="channelHead"
            :table-data="tableData"
            :total-count="total"
            :page-no-d.sync="channelListParams.page"
            :page-size-d.sync="channelListParams.pageSize"
            :border="false"
            @selection-change="handleSelectionChange"
            @query-data="queryList">
            <el-table-column
                slot="columnselect"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                show-overflow-tooltip
                type="selection"
                slot-scope="row">
            </el-table-column>
            <el-table-column
                slot="columnstatus"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                show-overflow-tooltip
                slot-scope="row">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.status === 'normal' ? $t('startUsing') : $t('outUse') }}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="columnoperate"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                show-overflow-tooltip
                slot-scope="row">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <template v-if="scoped.row.status === 'normal'">
                            <li class="normal" @click="disabledChannel(scoped.row)">{{$t('disabled')}}</li>
                        </template>
                        <template v-else>
                            <li class="normal" @click="openChannel(scoped.row)">{{$t('startUsing')}}</li>
                        </template>
                        <li class="red-label" @click="del(scoped.row)">{{$t('delete')}}</li>
                        <li class="normal" @click="edit(scoped.row)">{{$t('edit')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--删除模态框-->
        <del-modal ref="delModal">
            <span class="content-text">{{$t('isDoing')}}{{$t('delete') + $t('channel')}}：<span class="yellow-label">{{delUnits.channelName}}</span></span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>
        <!--批量删除模态框-->
        <del-modal ref="delBatchModal">
            <span class="content-text">{{$t('isDoing')}}<span class="yellow-label">{{$t('deleteBatch') + $t('channel')}}</span></span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>

    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import delModal from '@/components/delModal/index.vue';
    import {channelHead} from './channelConfig';
    import ajax from '@/api/index';

    export default {
        components : {
            tableCom,
            delModal
        },
        data() {

            const validateMethod = {

                // 输入内容不合规则
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));
                    } else {
                        callback();
                    }
                }

            };

            return {
                //表格多选列表
                rowSelect : [],
                //列表的请求参数
                channelListParams: {
                    //搜索的关键字
                    channelName: '',
                    page: 1,
                    pageSize: 10
                },
                //表头配置
                channelHead : channelHead,
                //列表数据
                tableData: [],
                //列表数据总数
                total: 0,
                //删除的信息
                delUnits : {},
            }
        },
        methods: {
            /**
             * 查询渠道信息列表
             */
            queryList() {
                ajax.post('channelList', this.channelListParams).then(res => {
                    if(res.status === 200){
                        this.tableData = res.data.list || [];
                        this.total = res.data.totalRecord ? parseInt(res.data.totalRecord) : 0;
                    } else {
                        this.tableData = [];
                        this.total = 0;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 查询列表，区分有无搜索文案查询
             */
            searchList () {
                if(this.channelListParams.channelName){
                    this.channelByName();
                } else{
                    this.queryList();
                }
            },
            /**
             * 根据渠道名称获取渠道信息
             */
            channelByName () {
                ajax.post('channelByName', this.channelListParams).then(res => {
                    if(res.status === 200){
                        this.tableData = res.data.list || [];
                        this.total = res.data.totalRecord ? parseInt(res.data.totalRecord) : 0;
                    } else {
                        this.tableData = [];
                        this.total = 0;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 触发选择行
             * @param data
             */
            handleSelectionChange(data) {
                this.rowSelect = data;
            },
            /**
             * 删除行
             * @param data
             */
            del(data) {
                this.delUnits = data;
                this.$refs.delModal.show({
                    title : this.$t('delete') + this.$t('channel'),
                    confirmCallback : () => {
                        this.deleteChannel(data.id);
                    }
                });
            },
            /**
             * 批量删除
             */
            bitchDel () {
                let ids = this.rowSelect.map(item => item.id).join(',');
                this.$refs.delBatchModal.show({
                    title : this.$t('deleteBatch') + this.$t('channel'),
                    confirmCallback : () => {
                        this.deleteChannel(ids);
                    }
                });
            },
            /**
             * 删除渠道信息
             * @param data
             */
            deleteChannel( data ) {
                ajax.post('deleteChannel',{
                    ids: data
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success(this.$t('success') + this.$t('delete'));
                        this.searchList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 新增
             */
            add () {
                this.$router.push({
                    name : 'editChannel',
                    params :{
                        type :'add'
                    }
                });
            },
            /**
             * 修改行
             * @param data
             */
            edit (data) {
                this.$router.push({
                    name : 'editChannel',
                    params :{
                        type :'edit',
                        info: data
                    }
                });
            },
            /**
             * 禁用渠道信息
             * @param data
             */
            disabledChannel(data){
                this.switchChannel(data, 'invalid');
            },
            /**
             * 启用渠道信息
             * @param data
             */
            openChannel(data){
                this.switchChannel(data, 'normal');
            },
            /**
             * 修改渠道信息状态
             * @param data
             * @param status
             */
            switchChannel ( data, status ) {
                ajax.post('switchChannel',{
                    id: data.id,
                    status: status,
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success( (status === 'normal' ? this.$t('startUsing') : this.$t('disabled'))
                            + this.$t('success') );
                        this.searchList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .list-info{
        padding: 0 30px 0 30px;
        @include block_outline();

        .btn-area{
            @include block_outline($height : 60px);
            text-align: right;
            padding-top: 14px;

            .ivu-btn-90px{
                margin-right: 10px;
            }

            .search-by-word{
                float: left;

                /deep/ .ivu-input-wrapper{
                    width: 280px;
                    margin-right: 15px;
                }
            }
        }

    }

    .content-text{
        padding: 0 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }

    .yellow-label{
        color: $color_yellow;
    }

    .red-label {
        color: $color_err;
    }
</style>
