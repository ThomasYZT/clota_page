<!--账号管理-->

<template>
    <div class="account">
        <div class="create-account">
            <Button type="primary">
                <span @click="addAccount">新建账号</span>
            </Button>
        </div>
        <table-com
            :ofsetHeight="208"
            :show-pagination="true"
            :table-data="tableData"
            :column-data="accountHead"
            :total-count="total"
            :page-no-d.sync="accListParams.page"
            :page-size-d.sync="accListParams.pageSize" :auto-height="true">
            <el-table-column
                slot="column8"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="operate-list" @click="editAccount(scoped.row)">修改</li>
                        <li class="operate-list stop" @click="stopAccount(scoped.row)">停用</li>
                        <li class="operate-list del" @click="delAccount(scoped.row)">删除</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--<div class="page-area" v-if="tableData.length > 0">
            <el-pagination
                :current-page="pageNo"
                :page-sizes="pageSizeConfig"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>-->
        <!--删除账号模态框-->
        <del-modal ref="delModal">
            <span style="padding: 0 20px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width : 100%;">您正在删除账号：Server2012Server2012Server2012Server2012Server2012</span>
            <span><span style="color:#ed3f14;">本操作不可撤销</span>，是否继续？</span>
        </del-modal>
    </div>
</template>

<script>

    import tableCom from '../../index/child/tableCom';
    import tableMixins from '../../lessee/tableMixins';
    import {accountHead} from './accountConfig';
    import delModal from '@/components/delModal/index.vue';
    import ajax from '@/api/index'

    export default {
        mixins :[tableMixins],
        components : {
            tableCom,
            delModal
        },
        data() {
            return {
                totalCount : 100,
                //表头配置
                accountHead : accountHead,
                // 账户列表的请求参数
                accListParams: {
                    page: 1,
                    pageSize: 10
                },
                // 列表数据
                tableData: [],
                // 列表数据总数
                total: 0
            }
        },
        created() {
            this.getAccountList();
        },
        methods: {
            /**
             * 查询账户信息列表
             */
            getAccountList() {
                ajax.post('user_list', this.accListParams).then(res => {
                    this.tableData = res.data.list || [];
                    this.total = res.totalRecord || 0;
                });
            },
            /**
             * 新建账号
             */
            addAccount () {
                this.$router.push({
                    name : 'addAccount',
                    params : {
                        type : 'add'
                    }
                });
            },
            /**
             * 停用账号
             * @param data
             */
            stopAccount (data) {
                this.$Message.success('您已停用/启用账号：Server2012');
            },
            /**
             * 删除账号
             * @param data
             */
            delAccount (data) {
                this.$refs.delModal.show({
                    title : '删除账号',
                    confirmCallback : () => {
                        // this.confirmDelete(data);
                    }
                });
            },
            /**
             * 编辑账号
             * @param data
             */
            editAccount (data) {
                  this.$router.push({
                    name : 'addAccount',
                    params : {
                        type : 'edit'
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .account{
        @include block_outline();
        @include padding_place();
        padding: 0 30px;

        .create-account{
            @include block_outline($height: 62px);
            padding: 15px 0;
        }

        .operate-info {
            @include table_operate();

            .operate-list {
                color: $color_blue;
            }

            .stop{
                color : $color_yellow
            }

            .del{
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
