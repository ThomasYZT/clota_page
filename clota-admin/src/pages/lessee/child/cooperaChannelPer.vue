<!--合作渠道（个人）-->

<template>
    <div class="coopera-channel-per">
        <div class="tab-list">
            <ButtonGroup>
                <Button :type="filterType === item.value ? 'primary' : 'ghost'"
                        @click="filterTable(item.value)"
                        :key="index"
                        v-for="(item,index) in filterList">
                    {{$t(item.label)}}
                </Button>
            </ButtonGroup>
            <div class="search">
                <Input type="text"
                       v-model="keyWord"
                       style="width: 200px"
                       :placeholder="$t('lessPlaceholder')"/>
                <Button type="primary">查找</Button>
            </div>
        </div>
        <table-com
            :table-data="tableData"
            :table-height="tableHeight"
            :column-data="columnDataInfo">
            <el-table-column
                label="操作"
                :width="80">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="operate-list" @click="toDetail(scoped.row)">查看</li>
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
                :total="40">
            </el-pagination>
        </div>
        <no-data class="no-data"
                 v-if="tableData.length < 1">
        </no-data>
        <loading :visible="isLoading">
        </loading>
    </div>
</template>

<script>
    import tableCom from '../../index/child/tableCom';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import loading from '@/components/loading/loading.vue';
    import tableMixins from '../tableMixins';
    import {columns} from './cooperaChannelPerConfig';

    export default {
        mixins: [tableMixins],
        components: {
            tableCom,
            noData,
            loading
        },
        data() {
            return {
                //表头数据
                columnData: columns,
                //过滤类型
                filterType: 'ready',
                //过滤列表
                filterList: [
                    {
                        label: 'auditStatus.waitAudit',
                        value: 'ready'
                    },
                    {
                        label: 'auditStatus.audited',
                        value: 'true'
                    },
                    {
                        label: 'auditStatus.rejected',
                        value: 'false'
                    }
                ],
                //表格数据
                tableData: [
                    {
                        name: 'aa'
                    }
                ]
            }
        },
        methods: {
            /**
             * 过滤表格
             * @param value
             */
            filterTable(value) {
                this.filterType = value;
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
