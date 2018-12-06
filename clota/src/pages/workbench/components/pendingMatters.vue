<!--
内容：待处理事项
作者：djc
日期：
-->

<template>
    <div class="pending-matters">
        <div class="container">
            <div class="header-box">
                <span class="title">{{$t('pendingMatters')}}</span><!--待处理事项-->
                <span class="check-all" @click="checkMatters()">{{$t('checkAll')}}</span>
            </div>
            <div class="table-list-area">
                <table-com
                    :ofsetHeight="200"
                    :height="263"
                    :show-pagination="false"
                    :column-data="columnData"
                    :table-data="tableData"
                    :border="false"
                    @query-data="queryList">
                    <el-table-column
                        slot="column0"
                        slot-scope="row"
                        show-overflow-tooltip
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column1"
                        slot-scope="row"
                        show-overflow-tooltip
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t('pendingMatters.' + scope.row.name)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column2"
                        slot-scope="row"
                        show-overflow-tooltip
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <span style="color: #EB6751;">{{scope.row.value}}</span>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>
        <!--全部待处理事项弹窗-->
        <pending-matter-modal ref="pendingMatterModal" @on-hide="queryList()"></pending-matter-modal>
    </div>
</template>
<script>
    import ajax from '@/api/index.js';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { pendingMattersHead } from '../workbenchConfig';
    import pendingMatterModal from '../components/pendingMatterModal.vue';

    export default {
        components : {
            tableCom,
            pendingMatterModal
        },
        props : {},
        data () {
            return {
                //表头配置
                columnData : pendingMattersHead,
                //表格数据
                tableData : [],
            }
        },
        computed : {},
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 查询各类别待处理事项量
             */
            queryList () {
                ajax.post('workbench-getWorkBackByClassify').then(res => {
                    if (res.success) {
                        this.tableData = res.data || [];
                    } else {
                        this.tableData = [];
                    }
                });
            },
            /**
             * 显示查看全部待处理事项弹窗
             */
            checkMatters () {
                this.$refs.pendingMatterModal.show();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .pending-matters {
        width: 42%;
        float: left;
        height: 100%;
        padding-left: 15px;

        .container {
            position: relative;
            height: 100%;
            background: $color_fff;
            border: 1px solid $color_DFE2E5;
            border-radius: 4px;
        }

        .header-box {
            @include block_outline($height: 45px);
            border-bottom: 1px solid $color_E1E1E1;
            line-height: 45px;
            padding: 0 20px;

            .title {
                font-size: $font_size_18px;
                color: $color_353B5E;
            }

            .check-all {
                float: right;
                color: $color_blue;
                font-size: 12px;
                cursor: pointer;
            }
        }
    }
</style>
