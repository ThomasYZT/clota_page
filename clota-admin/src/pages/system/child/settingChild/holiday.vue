<!--节假日信息-->

<template>
    <div class="list-info">
        <div class="btn-area">
            <div class="search-by-word">
                <Input v-model.trim="holidayListParams.holidayName"
                       :placeholder="$t('validateError.pleaseInput', { msg: $t('holidayName')})"/>
                <Button type="primary"
                        class="ivu-btn-90px"
                        @click="queryList">{{$t('query')}}</Button>
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
            :column-data="holidayHead"
            :table-data="tableData"
            :total-count="total"
            :page-no-d.sync="holidayListParams.page"
            :page-size-d.sync="holidayListParams.pageSize"
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
                slot="columnholidayTime"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                show-overflow-tooltip
                slot-scope="row">
                <template slot-scope="scoped">
                    {{ scoped.row.holidayStartTime | timeFormat('yyyy-MM-dd')}}{{$t('to')}}{{scoped.row.holidayEndTime | timeFormat('yyyy-MM-dd') }}
                </template>
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
                        <li class="red-label" @click="del(scoped.row)">{{$t('delete')}}</li>
                        <li class="normal" @click="edit(scoped.row)">{{$t('edit')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--删除模态框-->
        <del-modal ref="delModal">
            <span class="content-text">{{$t('isDoing')}}{{$t('delete') + $t('holiday')}}：<span class="yellow-label">{{delUnits.holidayName}}</span></span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>
        <!--批量删除模态框-->
        <del-modal ref="delBatchModal">
            <span class="content-text">{{$t('isDoing')}}<span class="yellow-label">{{$t('deleteBatch') + $t('holiday')}}</span></span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>
    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import delModal from '@/components/delModal/index.vue';
    import {holidayHead} from './holidayConfig';
    import ajax from '@/api/index';

    export default {
        components : {
            tableCom,
            delModal
        },
        data() {
            return {
                //表格多选列表
                rowSelect : [],
                //列表的请求参数
                holidayListParams: {
                    //搜索的关键字
                    holidayName: '',
                    page: 1,
                    pageSize: 10
                },
                //表头配置
                holidayHead : holidayHead,
                // 列表数据
                tableData: [],
                // 列表数据总数
                total: 0,
                //删除的信息
                delUnits : {},
            }
        },
        methods: {
            /**
             * 查询账户信息列表
             */
            queryList() {
                ajax.post('holidayList', this.holidayListParams).then(res => {
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
             * 新增
             */
            add () {
                this.$router.push({
                    name : 'editHoliday',
                    params :{
                        type :'add'
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
             * 批量删除
             */
            bitchDel () {
                let ids = this.rowSelect.map(item => item.id).join(',');
                this.$refs.delBatchModal.show({
                    title : this.$t('deleteBatch') + this.$t('holiday'),
                    confirmCallback : () => {
                        this.deleteHoliday(ids);
                    }
                });
            },
            /**
             * 删除单行
             * @param data
             */
            del(data) {
                this.delUnits = data;
                this.$refs.delModal.show({
                    title : this.$t('delete') + this.$t('holiday'),
                    confirmCallback : () => {
                        this.deleteHoliday(data.id);
                    }
                });
            },
            /**
             * 删除节假日
             * @param data
             */
            deleteHoliday( data ) {
                ajax.post('deleteHoliday',{
                    ids: data
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success(this.$t('success') + this.$t('delete'));
                        this.queryList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 修改行
             * @param data
             */
            edit (data) {
                this.$router.push({
                    name : 'editHoliday',
                    params :{
                        type :'edit',
                        info: data
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
