<!--
内容：合作伙伴里的游客来源、分业态经营状况、分产品经营状况。 按时间查询数据公用组件
作者：djc
日期：
-->

<template>
    <div class="diff-date-data" :class="{ 'en-modal' : lang === 'en' }">
        <div class="header-box">
            <div class='title-wrapper' v-w-title="$t(cardTitle)">
                {{$t(cardTitle)}}
            </div>
            <div class="date-wrapper">
                <DatePicker type="daterange"
                            v-model.trim="date"
                            :editable="false"
                            :clearable="false"
                            :placeholder="$t('selectField',{msg: ''})"
                            placement="bottom-end"
                            class="date-picker"
                            :transfer="true"
                            style="width: 215px;"
                            @on-change="queryList">
                </DatePicker>
            </div>
        </div>

        <div class="table-list-area">
            <table-com
                :ofsetHeight="200"
                :height="lang === 'zh-CN' ? 365 : 375"
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
                        <span>{{$t(scope.row.name)}}</span>
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
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { mapGetters } from 'vuex';

    export default {
        components : { tableCom },
        props : {
            //卡片标题
            cardTitle : {
                type : String
            },
            //表头配置
            columnData : {
                type : Array,
                default () {
                    return [];
                }
            },
            //表格数据
            tableData : {
                type : Array,
                default () {
                    return [];
                }
            },
        },
        data () {
            return {
                date : [new Date().addMonths(-1), new Date()],
            };
        },
        computed : {
            ...mapGetters([
                'lang'
            ])
        },
        created () {
            this.queryList();
        },
        methods : {
            /**
             * 查询数据
             */
            queryList () {
                this.$emit('on-change', this.date);
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .diff-date-data {
        /*float: right;*/
        height: 100%;
        background: $color_fff;
        border: 1px solid $color_DFE2E5;
        border-radius: 4px;

        .en-modal{

        }

        .header-box {
            border-bottom: 1px solid $color_E1E1E1;
            padding: 6px 10px;
            overflow: auto;

            .title-wrapper {
                display: inline-block;
                vertical-align: middle;
                line-height: 32px;
                max-width: calc(100% - 215px);
                @include overflow_tip();
                padding-right: 5px;
                font-size: $font_size_16px;
                color: $color_353B5E;
            }
            .date-wrapper {
                display: inline-block;
                vertical-align: middle;
                float: right;
                margin-top: 2px;

                .date-picker {
                    width: 150px;
                    float: right;
                }
            }

            .chart-area {
                height: calc(100% - 45px);
            }
        }

        .table-list-area {
            @include block_outline($height: calc(100% - 45px));
        }
    }
</style>
