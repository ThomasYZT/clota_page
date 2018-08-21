<!--服务器菜单-->

<template>
    <div class="server-info">
        <div class="tab-list">
            <Button type="primary"
                    @click="addServer">{{$t('addServer')}}</Button>
        </div>
        <table-com
            :table-data="tableData"
            :table-height="tableHeight"
            :column-data="columnData">
            <el-table-column
                :label="$t('operate')"
                :width="60">
                <template slot-scope="scoped">
                    <span class="watch"
                          @click="toDetail(scoped.row)">{{$t('look')}}</span>
                </template>
            </el-table-column>
        </table-com>
        <div class="page-area" v-if="totalCount > 0">
            <el-pagination
                :current-page="pageNo"
                :page-sizes="pageSizeConfig"
                :page-size="pageSize"
                :layout="pageLayout"
                :total="totalCount"
                @size-change="sizeChange"
                @current-change="pageNoChange">
            </el-pagination>
        </div>
        <!--加载中-->
        <loading :visible="isLoading">
        </loading>
    </div>
</template>

<script>
    import tableCom from '../index/child/tableCom';
    import loading from '@/components/loading/loading.vue';
    import tableMixins from '../lessee/tableMixins';
    import {columns} from './serverConfig';
    import ajax from '@/api/index.js';

    export default {
        mixins: [tableMixins],
        components: {
            tableCom,
            loading
        },
        data() {
            return {
                //表头配置
                columnData: columns,
            }
        },
        methods: {
            /**
             * 查看设备详情
             * @param rowData 行数据
             */
            toDetail(rowData) {
                this.$router.push({
                    name: 'serverDetail',
                    params : {
                        id : rowData.id,
                        ip : rowData.ip,
                    }
                });
            },
            /**
             * 添加服务器
             */
            addServer() {
                this.$router.push({
                    name: 'addServer'
                });
            },
            /**
             * 查询服务器
             */
            queryAllServerMsg () {
                ajax.post('queryAllServerMsg',{
                    page : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if(res.status === 200){
                        this.totalCount = res.data.totalRecord;
                        this.tableData = res.data.list ? res.data.list : [];
                    }else{
                        this.totalCount = 0;
                        this.tableData = [];
                    }
                }).catch(() => {
                    this.totalCount = 0;
                    this.tableData = [];
                }).finally(() => {
                    this.setTableHeight();
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams(params) {
                this.queryAllServerMsg();
            },
            /**
             * 每页条数改变
             * @param pageSize
             */
            sizeChange (pageSize) {
                this.pageSize = pageSize;
                this.queryAllServerMsg();
            },
            /**
             * 每页大小改变
             * @param pageNo
             */
            pageNoChange(pageNo) {
                this.pageNo = pageNo;
                this.queryAllServerMsg();
            }
        },
        beforeRouteEnter(to,from,next) {
            next(vm => {
                vm.getParams(to.params);
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .server-info {
        position: relative;
        padding: 0 30px 0 30px;
        @include block_outline();
        @include padding_place();
        background: $color_fff;

        .tab-list {
            @include block_outline($height: 62px);
            padding: 15px 0;
        }

        .watch {
            color: $color_blue;
            cursor: pointer;
        }

        /deep/ .el-table td,
        /deep/ .el-table th {
            padding: 12px 0 !important;
        }

        /deep/ .el-table::before {
            display: none;
        }

        .page-area {
            @include block_outline($height: 57px);
            text-align: right;

            /deep/ .el-pagination {
                display: inline-block;
                padding-top: 15px;
            }
        }

        .no-data {
            @include no_data();
        }
    }
</style>
