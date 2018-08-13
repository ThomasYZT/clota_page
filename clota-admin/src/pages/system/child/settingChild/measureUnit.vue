<!--计量单位-->

<template>
    <div class="measure-unit">
        <div class="btn-area">
            <Button type="primary" class="ivu-btn-90px">新增</Button>
            <Button type="ghost"
                    :disabled="rowSelect.length < 1"
                    @click="bitchDel">批量删除</Button>
        </div>
        <table-com
            :table-data="tableData"
            :table-height="tableHeight"
            :column-data="unitHead"
            :auto-height="true"
            :column-check="true"
            @selection-change="handleSelectionChange">
            <el-table-column
                slot="column3"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="operate-list disabled" @click="disabledUnit(scoped.row)">禁用</li>
                        <li class="operate-list" @click="delUnit(scoped.row)">删除</li>
                        <li class="operate-list delete" @click="watchDetail(scoped.row)">修改</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <div class="page-area" v-if="tableData.length > 0">
            <el-pagination
                :current-page="pageNo"
                :page-sizes="pageSizeConfig"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
        <!--删除账号模态框-->
        <del-modal ref="delModal">
            <span style="padding: 0 20px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width : 100%;">您正在删除单位：{{delUnits}}</span>
            <span><span style="color:#ed3f14;">本操作不可撤销</span>，是否继续？</span>
        </del-modal>
    </div>
</template>

<script>
    import tableCom from '../../../index/child/tableCom';
    import tableMixins from '../../../lessee/tableMixins';
    import {unitHead} from './measureUnitConfig';
    import delModal from '@/components/delModal/index.vue';
    export default {
        mixins :[tableMixins],
        components : {
            tableCom,
            delModal
        },
        data() {
            return {
                //表格数据
                tableData : [
                    {
                        name : '元'
                    },
                    {
                        name : '元'
                    },
                    {
                        name : '元'
                    },
                    {
                        name : '元'
                    },
                ],
                //表头配置
                unitHead : unitHead,
                //总共条数
                totalCount :100,
                //当前选中的行数据
                rowSelect : [],
                //删除的单位
                delUnits : ''
            }
        },
        methods: {
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
            disabledUnit(data){
                this.$Message.success('禁用成功');
            },
            /**
             * 删除单位
             * @param data
             */
            delUnit (data) {
                this.delUnits = data.name;
                this.$refs.delModal.show({
                    title : '删除单位',
                    confirmCallback : () => {
                        this.$Message.success('删除成功');
                    }
                });
            },
            /**
             * 批量删除单位
             */
            bitchDel () {
                this.delUnits = this.rowSelect.map(item => item.name).join(',');
                this.$refs.delModal.show({
                    title : '删除单位',
                    confirmCallback : () => {
                        this.$Message.success('删除成功');
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .measure-unit{
        @include block_outline();

        .btn-area{
            @include block_outline($height : 60px);
            text-align: right;
            padding-top: 14px;

            .ivu-btn-90px{
                margin-right: 10px;
            }
        }

        .page-area {
            @include block_outline($height: 57px);
            text-align: right;

            /deep/ .el-pagination {
                display: inline-block;
                padding-top: 15px;
            }
        }

        .operate-info {
            @include table_operate();

            .disabled {
                color: $color_yellow;
            }

            .delete{
                color: $color_err;
            }
        }
    }
</style>
