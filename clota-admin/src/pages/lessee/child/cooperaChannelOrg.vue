<!--合作渠道（机构）-->

<template>
    <div class="coopera-channel-org">
        <div class="tab-list">
            <ButtonGroup>
                <Button :class="{'ivu-active-tap' : filterType === item.value , 'ivu-default-tap' : filterType !== item.value}"
                        @click="filterTable(item.value)"
                        :key="index"
                        v-for="(item,index) in filterList">
                    {{$t(item.label)}}
                    <span v-if="item.value === 'audit'" class="wraing-label">{{auditNumber | contentFilter}}</span>
                </Button>
            </ButtonGroup>
            <div class="search">
                <Input type="text"
                       v-model.trim="keyWord"
                       style="width: 200px"
                       :placeholder="$t('lessPlaceholder')"
                       @on-enter="queryList"/>
                <Button type="primary" @click="queryList">查找</Button>
            </div>
        </div>
        <table-com
            v-if="filterType"
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :page-no-d.sync="pageNo"
            :show-pagination="true"
            :page-size-d.sync="pageSize"
            :total-count="totalCount"
            :ofset-height="120"
            @query-data="queryList">
            <el-table-column
                slot="columnoperate"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                fixed="right"
                :min-width="row.minWidth">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="normal" @click="toDetail(scoped.row)">查看</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columns } from './cooperaChannelOrgConfig';
    import ajax from '@/api/index.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            tableCom,
        },
        data () {
            return {
                //关键字查询
                keyWord : '',
                //表头数据
                columnData : columns,
                //过滤类型
                filterType : '',
                //过滤列表
                filterList : [
                    {
                        label : 'readyDeal',
                        value : 'audit'
                    },
                    {
                        label : 'auditTrue',
                        value : 'success'
                    },
                    {
                        label : 'auditFalse',
                        value : 'reject'
                    }
                ],
                pageNo : 1,
                pageSize : 10,
                totalCount : 0,
                //合作渠道数据
                tableData : [],
                //待审核个数
                auditNumber : 0
            };
        },
        methods : {
            /**
             * 过滤表格
             * @param value
             */
            filterTable (value) {
                this.filterType = value;
                this.queryList();
                this.updateStorgeInfo({
                    filterType : this.filterType
                });
            },
            /**
             * 跳转到详情
             * @param data
             */
            toDetail (data) {
                this.$router.push({
                    name : 'cooperaChannelPerDetail',
                    params : {
                        type : 'org',
                        id : data.id
                    }
                });
            },
            /**
             * 查询机构合作渠道
             */
            queryList () {
                ajax.post('queryPartners',{
                    partnerType : 'company',
                    auditStatus : this.filterType,
                    condition : this.keyWord,
                    page : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if (res.status === 200) {
                        this.tableData = res.data.list ? res.data.list : [];
                        this.totalCount = res.data ? Number(res.data.totalRecord) : 0;
                        this.auditNumber = res.data && res.data.other ? Number(res.data.other.auditNumber) : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                        this.auditNumber = 0;
                    }
                });
            },
            /**
             * 获取路由参数
             * @param{Object} params 路由参数
             * @param{Object} toRoute 下一个路由
             * @param{Object} formRoute 前一个路由
             */
            getParams (params,toRoute,formRoute) {
                if (params && Object.keys(params).length > 0 &&
                    (formRoute.name === 'cooperaChannelPerDetail' || formRoute.name === 'cooperaChannelOrgDetailModify')) {
                    this.filterType = params.filterType;
                } else {
                    this.filterType = 'audit';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .coopera-channel-org {
        position: relative;
        @include block_outline();

        .tab-list {
            @include block_outline($height: 62px);
            padding: 15px 0;

            .search {
                @include block_outline(262px);
                float: right;
                overflow: hidden;
            }

             .wraing-label{
                color: $color_err;
            }
        }

        /deep/ .el-table td,
        /deep/ .el-table th {
            padding: 11px 0 !important;
        }

        /deep/ .el-table::before {
            display: none;
        }

        .operate-info {
            @include table_operate();

            .disabled {
                color: $color_yellow;
            }
        }

        .no-data {
            @include no_data();
        }
    }
</style>
