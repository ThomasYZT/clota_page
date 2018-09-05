<!--合作渠道（个人）-->

<template>
    <div class="coopera-channel-per">
        <div class="tab-list">
            <ButtonGroup>
                <Button :class="{'ivu-active-tap' : filterType === item.value , 'ivu-default-tap' : filterType !== item.value}"
                        @click="filterTable(item.value)"
                        :key="index"
                        v-for="(item,index) in filterList">
                    {{$t(item.label)}} <span v-if="item.value === 'audit'" class="wraing-label">{{auditNumber | contentFilter}}</span>
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
            :column-data="columnDataInfo"
            :table-data="tableData"
            :border="true"
            :page-no-d.sync="pageNo"
            :show-pagination="true"
            :page-size-d.sync="pageSize"
            :total-count="totalCount"
            :ofset-height="120"
            @query-data="queryList">
             <el-table-column
                slot="columnsex"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scoped">
                    {{$t(scoped.row.sex)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="columnattach"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scoped">
                    <img :src="scoped.row.attach" alt="">
                </template>
            </el-table-column>
            <el-table-column
                slot="columnoperate"
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
    import {columns} from './cooperaChannelPerConfig';
    import ajax from '@/api/index.js';

    export default {
        components: {
            tableCom
        },
        data() {
            return {
                //表头数据
                columnData: columns,
                //过滤类型
                filterType: 'audit',
                //过滤列表
                filterList: [
                    {
                        label: 'auditStatus.waitAudit',
                        value: 'audit'
                    },
                    {
                        label: 'auditStatus.audited',
                        value: 'success'
                    },
                    {
                        label: 'auditStatus.rejected',
                        value: 'reject'
                    }
                ],
                pageNo : 1,
                pageSize : 10,
                totalCount : 0,
                //合作渠道数据
                tableData : [],
                //待审核个数
                auditNumber : ''
            }
        },
        methods: {
            /**
             * 过滤表格
             * @param value
             */
            filterTable(value) {
                this.filterType = value;
                this.queryList();
            },
            /**
             * 跳转到详情
             * @param data
             */
            toDetail(data) {
                this.$router.push({
                    name : 'cooperaChannelPerDetail',
                    params : {
                        type : 'per'
                    }
                });
            },
            /**
             * 查询机构合作渠道
             */
            queryList () {
                ajax.post('queryPartners',{
                    partnerType : 'person',
                    auditStatus : this.filterType,
                    condition : this.keyWord,
                    page : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if(res.status === 200){
                        this.tableData = res.data.pageInfo.list ? res.data.pageInfo.list : [];
                        this.totalCount = Number(res.data.pageInfo.totalRecord);
                        this.auditNumber = res.data.auditNumber;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                        this.auditNumber = '';
                    }
                });
            }
        },
        computed: {
            //表格表头数据
            columnDataInfo() {
                return this.columnData[this.filterType];
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .coopera-channel-per {
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

        .operate-info {
            @include table_operate();

            .disabled {
                color: $color_yellow;
            }
        }

        /deep/ .el-table td,
        /deep/ .el-table th {
            padding: 11px 0 !important;
        }

        /deep/ .el-table::before {
            display: none;
        }

        .no-data {
            @include no_data();
        }
    }
</style>
