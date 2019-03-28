<!--服务提供商-->

<template>
    <div class="isp-internet">
        <div class="create-lessee">
            <Button type="primary" @click="addLess">{{$t('新建集团/公司租户')}}</Button>
            <div class="search">
                <Input type="text"
                       v-model.trim="keyWord"
                       style="width: 200px"
                       :placeholder="$t('lessPlaceholder')"
                       @on-enter="queryList"/>
                <Button type="primary"
                        @click="queryList" >查找</Button>
            </div>
        </div>

        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :page-no-d.sync="pageNo"
            :show-pagination="true"
            :page-size-d.sync="pageSize"
            :total-count="totalCount"
            :ofset-height="120"
            :row-class-name="rowClassName"
            @query-data="queryList">
            <el-table-column
                slot="columnnodeType"
                slot-scope="row"
                :label="row.title"
                show-overflow-tooltip
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t(scope.row.nodeType)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="columndueService"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="invalid-services">{{scope.row.dueService}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="columnstatus"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.status === 'open' ? $t('inUse') : $t('outUse')}}
                </template>
            </el-table-column>
            <el-table-column
                slot="columnoperate"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                show-overflow-tooltip
                fixed="right"
                :min-width="row.minWidth">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="normal" @click="toISPinternetDetail(scoped.row)">查看</li>
                        <li class="red-label" v-if="scoped.row.status === 'open'" @click="disabledLess(scoped.row)">禁用</li>
                        <li class="normal" v-if="scoped.row.status === 'close'" @click="ableLess(scoped.row)">启用</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--确认修改租户状态提示框-->
        <change-less-status v-model="disabledLessModalShow"
                           :less-detail="currentRow"
                           :operate-type="operateType"
                           @confirm-disabled="confirmChangeStatus">
        </change-less-status>
    </div>
</template>

<script>
    import { columns } from './ISPinternetConfig';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import changeLessStatus from './ISPinternetChild/disabledLess';
    import ajax from '@/api/index';

    export default {
        components : {
            breadCrumbHead,
            tableCom,
            changeLessStatus
        },
        data () {
            return {
                //关键字信息查询
                keyWord : '',
                //表头数据
                columnData : columns,
                //是否显示
                disabledLessModalShow : false,
                //当前操作的租户数据
                currentRow : {},
                pageNo : 1,
                pageSize : 10,
                totalCount : 0,
                //表格数据
                tableData : [],
                //禁用/启用操作类别
                operateType : ''
            };
        },
        methods : {
            /**
             * 新增租户
             */
            addLess () {
                this.$router.push({
                    name : 'addLess'
                });
            },
            /**
             * 查看服务提供商详情
             * @param{Object} data
             */
            toISPinternetDetail (data) {
                this.$router.push({
                    name : 'ISPinternetDetail',
                    params : {
                        id : data.id,
                        activeNode : {
                            id : data.id,
                            type : data.nodeType
                        }
                    }
                });
            },
            /**
             * 禁用租户
             * @param{Object} rowData 租户的数据
             */
            disabledLess (rowData) {
                this.disabledLessModalShow = true;
                this.currentRow = rowData;
                this.operateType = 'close';
            },
            /**
             * 确认禁用/启用租户
             */
            confirmChangeStatus () {
                this.disabledLessModalShow = false;
                ajax.post('updateOrgInfoStatus',{
                    id : this.currentRow.id,
                    status : this.operateType
                }).then(res => {
                    if (res.status === 200) {
                        if (this.operateType === 'close') {
                            this.$Message.success('禁用成功');
                        } else {
                            this.$Message.success('启用成功');
                        }
                        this.queryList();
                    } else {
                        if (this.operateType === 'close') {
                            this.$Message.error(res.message || '禁用失败');
                        } else {
                            this.$Message.error(res.message || '启用失败');
                        }
                    }
                });
            },
            /**
             * 查询服务提供商信息
             */
            queryList () {
                ajax.post('queryServiceProvider',{
                    condition : this.keyWord,
                    page : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if (res.status === 200) {
                        this.tableData = res.data.list ? res.data.list : [];
                        this.totalCount = Number(res.data.totalRecord);
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 设置行样式
             * @param row
             */
            rowClassName ({ row }) {
                if (row.viewStatue === 1) {
                    return 'light-row';
                }
            },
            /**
             * 启用租户
             * @param rowData
             */
            ableLess (rowData) {
                this.disabledLessModalShow = true;
                this.currentRow = rowData;
                this.operateType = 'open';
            }
        },
        computed : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .isp-internet {
        position: relative;
        @include block_outline();

        .create-lessee {
            @include block_outline($height: 62px);
            padding: 15px 0;

            .search {
                @include block_outline(262px);
                float: right;
                overflow: hidden;
            }
        }

        .operate-info {
            @include table_operate();

            .disabled {
                color: $color_yellow;
            }
        }

        /deep/ .light-row{

            .invalid-services{
                color: $color_err;
            }
        }

        /deep/ .el-table::before {
            display: none;
        }

        .no-data {
            @include no_data();
        }
    }
</style>
