<!--订单排行榜详情-->

<template>
    <div class="rank-detail">
        <bread-crumb-head
            :locale-router="$t('rankDetail')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class=rank-info>
            <div class="tab-list">
                <DatePicker
                    v-model="selectDate"
                    type="date"
                    placeholder="Select date"
                    style="width: 280px">
                </DatePicker>
            </div>
            <table-com
                :table-data="tableData"
                :table-height="tableHeight"
                :column-data="columns"
                :auto-height="true">
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
            <div class="page-area" v-if="tableData.length > 0">
                <el-pagination
                    :current-page="pageNo"
                    :page-sizes="pageSizeConfig"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import tableCom from '../tableCom';
    import {columns} from './rankConfig.js';
    import tableMixins from '../../../lessee/tableMixins';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    export default {
        mixins :[tableMixins],
        components : {
            tableCom,
            breadCrumbHead
        },
        data() {
            return {
                //查询的日期
                selectDate : new Date(),
                //表头配置
                columns :columns,
                //总共条数
                totalCount : 100,
                  //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('index'),
                        router: {
                            name: 'index'
                        }
                    }
                ],
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .rank-detail{
        @include block_outline();
        overflow: auto;

        .rank-info {
            padding: 0 30px;
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            overflow: auto;

            .tab-list {
                @include block_outline($height: 62px);
                padding: 15px 0;
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
    }
</style>
