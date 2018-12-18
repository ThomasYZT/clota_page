<!--
    散客二级订单详情--退票日志
    作者：杨泽涛
-->
<template>
    <div class="refund-log">
        <div class="title">{{$t('refundLog')}}</div>

        <tableCom :column-data="refundAlterListHead"
                  :table-data="refundAlterList"
                  :table-com-min-height="250"
                  :border="true"
                  :auto-height="true">
            <el-table-column
                slot="column1"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.reqAccName | contentFilter}}/{{scope.row.reqTime | contentFilter
                        }}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column3"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.auditAccName | contentFilter}}/{{scope.row.auditTime | contentFilter}}</span>
                </template>
            </el-table-column>
        </tableCom>
    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom';
    import { refundAlterListHead } from './secondLevelDetailConfig'
    export default {
        props: {
            refundAlterList: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        components: {
            tableCom
        },
        data() {
            return {
                refundAlterListHead: refundAlterListHead
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .refund-log{
        border-radius: 2px;
        margin: 10px 0 6px;
        padding: 2px 0 16px 0;
        position: relative;

        .title{
            position: relative;
            padding: 15px 0 0 0;
            @include block_outline($height : 45px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 14px;
                vertical-align: middle;
            }
        }
    }
</style>
