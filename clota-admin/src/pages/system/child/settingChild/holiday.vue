<!--节假日信息-->

<template>
    <div class="list-info">
        <div class="btn-area">
            <div class="search-by-word">
                <Input v-model="keyword"
                       style="width : 280px"
                       placeholder="输入节假日名称"/>
                <Button type="primary"
                        class="ivu-btn-90px"
                        @click="getTableData">查询</Button>
            </div>
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="add">新增</Button>
            <Button type="ghost"
                    :disabled="rowSelect.length < 1"
                    @click="bitchDel">批量删除</Button>
        </div>
        <table-com
            :table-data="tableData"
            :table-height="tableHeight"
            :column-data="holidayHead"
            :auto-height="true"
            :column-check="true"
            @selection-change="handleSelectionChange">
            <el-table-column
                slot="column4"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="operate-list delete" @click="del(scoped.row)">删除</li>
                        <li class="operate-list" @click="edit(scoped.row)">修改</li>
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

        <!--删除模态框-->
        <del-modal ref="delModal">
            <span style="padding: 0 20px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width : 100%;">您正在删除节假日：{{delUnits}}</span>
            <span><span style="color:#ed3f14;">本操作不可撤销</span>，是否继续？</span>
        </del-modal>
    </div>
</template>

<script>
    import tableCom from '../../../index/child/tableCom';
    import tableMixins from '../../../lessee/tableMixins';
    import delModal from '@/components/delModal/index.vue';
    import {holidayHead} from './holidayConfig';
    export default {
        mixins :[tableMixins],
        components : {
            tableCom,
            delModal
        },
        data() {
            return {
                //搜索的关键字
                keyword : '',
                rowSelect : [],
                //表头配置
                holidayHead : holidayHead,
                //删除的信息
                delUnits : '',
                //总条数
                totalCount : 10
            }
        },
        methods: {
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
             * 批量删除
             */
            bitchDel () {
                this.delUnits = this.rowSelect.map(item => item.name).join(',');
                this.$refs.delModal.show({
                    title : '删除节假日',
                    confirmCallback : () => {
                        this.$Message.success('删除成功');
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
                this.delUnits = data.name;
                this.$refs.delModal.show({
                    title : '删除节假日',
                    confirmCallback : () => {
                        this.$Message.success('删除成功');
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
                        type :'edit'
                    }
                });
            },
            /**
             * 获取表格数据
             */
            getTableData () {
                alert('aa')
            }
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

        .page-area {
            @include block_outline($height: 57px);
            text-align: right;

            /deep/ .el-pagination {
                display: inline-block;
                padding-top: 15px;
            }
        }
    }
</style>
