<!--
内容：营业状况
作者：djc
日期：
-->

<template>
    <div class="business-situation">
        <!--营业状况-->
        <div class="header-box">
            <span class="title">{{$t('businessState')}}</span>
            <DatePicker type="daterange"
                        v-model.trim="date"
                        :editable="false"
                        :clearable="false"
                        :placeholder="$t('selectField',{msg: ''})"
                        placement="bottom-end"
                        class="date-picker"
                        @on-change="queryList">
            </DatePicker>
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
                    slot="column2"
                    slot-scope="row"
                    show-overflow-tooltip
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span>{{scope.row.value}}</span>
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>
<script>
    import ajax from '@/api/index.js';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { businessHead } from '../../workbenchConfig';

    export default {
        components : {
            tableCom
        },
        props : {},
        data () {
            return {
                date : [new Date().addMonths(-1), new Date()],
                //表头配置
                columnData : businessHead,
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
             * 查询营业状况数据
             */
            queryList () {
                ajax.post('workbench-getSaleAmountGroup',{
                    startDate : this.date[0].format('yyyy-MM-dd'),
                    endDate : this.date[1].format('yyyy-MM-dd')
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data || [];
                    } else {
                        this.tableData = [];
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .business-situation {
        position: relative;
        float: left;
        /*@include block_outline($width: unquote('calc(100% - 330px)'));*/
        width: 58%;
        background: $color_fff;
        border: 1px solid $color_DFE2E5;
        border-radius: 4px;

        .header-box {
            @include block_outline($height: 45px);
            border-bottom: 1px solid $color_E1E1E1;
            line-height: 45px;
            padding: 0 20px;

            .title {
                font-size: $font_size_18px;
                color: $color_353B5E;
            }
            .date-picker {
                width: 180px;
                float: right;
                margin-top: 7px;
            }
        }

        .table-list-area {
            /*padding: 0 30px;*/
            @include block_outline($height: calc(100% - 45px));
        }
    }
</style>
