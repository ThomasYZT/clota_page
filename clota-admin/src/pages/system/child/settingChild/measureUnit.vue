<!--计量单位-->

<template>
    <div class="measure-unit">
        <div class="btn-area">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="addUnit">{{$t('add')}}</Button>
            <Button type="error"
                    :disabled="rowSelect.length < 1"
                    @click="bitchDel">{{$t('deleteBatch')}}</Button>
        </div>
        <table-com
            :ofsetHeight="116"
            :show-pagination="true"
            :column-data="unitHead"
            :table-data="tableData"
            :total-count="total"
            :page-no-d.sync="unitListParams.page"
            :page-size-d.sync="unitListParams.pageSize"
            :border="true"
            @selection-change="handleSelectionChange"
            @query-data="queryList">
            <el-table-column
                slot="columnselect"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="90"
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
                slot="columnbuiltin"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                show-overflow-tooltip
                slot-scope="row">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.builtin === 'yes' ? $t('yes') : $t('no') }}</span>
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
                    <ul class="operate-info" v-if="scoped.row.builtin === 'no'">
                        <template v-if="scoped.row.status === 'normal'">
                            <li class="normal red-label" @click="disabledUnit(scoped.row)">{{$t('disabled')}}</li>
                        </template>
                        <template v-else>
                            <li class="normal" @click="openUnit(scoped.row)">{{$t('startUsing')}}</li>
                        </template>
                        <li class="red-label" @click="delUnit(scoped.row)">{{$t('delete')}}</li>
                        <li class="normal" @click="editUnit(scoped.row)">{{$t('edit')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--删除模态框-->
        <del-modal ref="delModal">
            <span class="content-text">{{$t('isDoing')}}{{$t('delete') + $t('unit')}}：<span class="yellow-label">{{delUnits.name}}</span></span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>
        <!--批量删除模态框-->
        <del-modal ref="delBatchModal">
            <span class="content-text">{{$t('isDoing')}}<span class="yellow-label">{{$t('deleteBatch') + $t('unit')}}</span></span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>

    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import { unitHead } from './measureUnitConfig';
    import delModal from '@/components/delModal/index.vue';
    import ajax from '@/api/index';

    export default {
        components : {
            tableCom,
            delModal
        },
        data () {
            return {
                //表格数据
                tableData : [],
                //表头配置
                unitHead : unitHead,
                //列表的请求参数
                unitListParams : {
                    page : 1,
                    pageSize : 10
                },
                //总共条数
                total : 100,
                //当前选中的行数据
                rowSelect : [],
                //删除数据
                delUnits : {}
            };
        },
        methods : {
            /**
             * 查询账户信息列表
             */
            queryList () {
                ajax.post('unitList', this.unitListParams).then(res => {
                    if (res.status === 200) {
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
             * 更改选中的状态
             * @param data
             */
            handleSelectionChange (data) {
                this.rowSelect = data;
            },
            /**
             * 禁用单位
             * @param data
             */
            disabledUnit (data) {
                this.switchUnit(data, 'invalid');
            },
            /**
             * 启用单位
             * @param data
             */
            openUnit (data) {
                this.switchUnit(data, 'normal');
            },
            /**
             * 修改计量单位状态
             * @param data
             * @param status
             */
            switchUnit ( data, status ) {
                ajax.post('switchUnit',{
                    id : data.id,
                    status : status,
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success( (status === 'normal' ? this.$t('startUsing') : this.$t('disabled'))
                            + this.$t('success') );
                        this.queryList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 删除单位
             * @param data
             */
            delUnit (data) {
                this.delUnits = data;
                this.$refs.delModal.show({
                    title : this.$t('delete') + this.$t('unit'),
                    confirmCallback : () => {
                        this.deleteUnit(data.id);
                    }
                });
            },
            /**
             * 批量删除单位
             */
            bitchDel () {
                let ids = this.rowSelect.map(item => item.id).join(',');
                this.$refs.delBatchModal.show({
                    title : this.$t('deleteBatch') + this.$t('unit'),
                    confirmCallback : () => {
                        this.deleteUnit(ids);
                    }
                });
            },
            /**
             * 删除单位
             * @param data
             */
            deleteUnit ( data ) {
                ajax.post('deleteUnit',{
                    ids : data
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('delete') + this.$t('success'));
                        this.queryList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 新增单位拟
             */
            addUnit () {
                this.$router.push({
                    name : 'editMeasureUnit',
                    params : {
                        type : 'add'
                    }
                });
            },
            /**
             * 编辑账号
             * @param data
             */
            editUnit (data) {
                this.$router.push({
                    name : 'editMeasureUnit',
                    params : {
                        type : 'edit',
                        info : data
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .measure-unit{
        padding: 0 30px 0 30px;
        @include block_outline();

        .btn-area{
            @include block_outline($height : 60px);
            text-align: right;
            padding-top: 14px;

            .ivu-btn-90px{
                margin-right: 10px;
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
