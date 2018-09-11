<!--服务提供商-->

<template>
    <div class="isp-internet">
        <div class="create-lessee">
            <Button type="primary">
                <span @click="addLess">新建租户</span>
            </Button>
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
        <!--<table-com-->
            <!--:table-data="tableData"-->
            <!--:table-height="tableHeight"-->
            <!--:column-data="columnData"-->
            <!--:row-click="false">-->
            <!--<el-table-column-->
                <!--label="操作"-->
                <!--:width="120">-->
                <!--<template slot-scope="scoped">-->
                    <!--<ul class="operate-info">-->
                        <!--<li class="operate-list" @click="toISPinternetDetail">查看</li>-->
                        <!--<li class="operate-list disabled" @click="disabledLess(scoped.row)">禁用</li>-->
                    <!--</ul>-->
                <!--</template>-->
            <!--</el-table-column>-->
        <!--</table-com>-->
        <!--<div class="page-area" v-if="tableData.length > 0">-->
            <!--<el-pagination-->
                <!--:current-page="pageNo"-->
                <!--:page-sizes="pageSizeConfig"-->
                <!--:page-size="pageSize"-->
                <!--layout="total, sizes, prev, pager, next, jumper"-->
                <!--:total="40">-->
            <!--</el-pagination>-->
        <!--</div>-->

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
        <!--<disabled-less v-model="disabledLessModalShow"-->
                       <!--:less-detail="currentRow"-->
                       <!--@confirm-disabled="confirmDisabled">-->
        <!--</disabled-less>-->
    </div>
</template>

<script>
    import {columns} from './ISPinternetConfig';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import disabledLess from './ISPinternetChild/disabledLess';
    import ajax from '@/api/index';

    export default {
        components: {
            breadCrumbHead,
            tableCom,
            disabledLess
        },
        data() {
            return {
                //关键字信息查询
                keyWord : '',
                //表头数据
                columnData: columns,
                //是否显示
                disabledLessModalShow : false,
                //当前操作的租户数据
                currentRow : {},
                pageNo : 1,
                pageSize : 10,
                totalCount : 0,
                //表格数据
                tableData : []
            }
        },
        methods: {
            /**
             * 新增租户
             */
            addLess() {
                this.$router.push({
                    name: 'addLess'
                });
            },
            /**
             * 查看服务提供商详情
             * @param data
             */
            toISPinternetDetail(data) {
                this.$router.push({
                    name: 'ISPinternetDetail',
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
             * @param rowData 租户的数据
             */
            disabledLess (rowData) {
                // this.disabledLessModalShow = true;
                // this.currentRow = rowData;
                ajax.post('updateOrgInfoStatus',{
                    id : rowData.id,
                    status : 'close'
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success('禁用成功');
                        this.queryList();
                    }else{
                        this.$Message.error(res.message || '禁用失败');
                    }
                });
            },
            /**
             * 确认禁用租户
             */
            confirmDisabled () {

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
                    if(res.status === 200){
                        this.tableData = res.data.list ? res.data.list : [];
                        this.totalCount = Number(res.data.totalRecord);
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                })
            },
            /**
             * 设置行样式
             * @param row
             */
            rowClassName ({row}) {
                if(row.viewStatue === 1){
                    return 'light-row';
                }
            },
            /**
             * 启用租户
             * @param rowData
             */
            ableLess (rowData) {
                ajax.post('updateOrgInfoStatus',{
                    id : rowData.id,
                    status : 'open'
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success('启用成功');
                        this.queryList();
                    }else{
                        this.$Message.error(res.message || '启用失败');
                    }
                });
            }
        },
        computed: {}
    }
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
            color: $color_err;
        }

        /deep/ .el-table::before {
            display: none;
        }

        .no-data {
            @include no_data();
        }
    }
</style>
