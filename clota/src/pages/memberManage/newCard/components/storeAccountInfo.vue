<!--
内容：储值账户信息
作者：djc
日期：
-->

<template>
    <div class="">
        <div class="block-title">{{chargeInfo.accountName | contentFilter}}</div>
        <div class="table-wrap">
            <table-com
                :table-com-min-height="250"
                :column-data="columnData"
                :table-data="tableData"
                :auto-height="true"
                :border="false">
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{ scope.row.corpusBalance | moneyFilter | contentFilter }} {{$t('yuan')}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{ scope.row.donateBalance | moneyFilter | contentFilter }} {{$t('yuan')}}
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        components : { tableCom },
        props : {
            //储值账户信息
            'charge-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                // 表头信息
                columnData : [
                    {
                        title : 'principal',
                        minWidth : 180,
                        field : 'corpusBalance',
                    },
                    {
                        title : 'giftSum',
                        minWidth : 180,
                        field : 'donateBalance',
                    }
                ],
            };
        },
        computed : {
            //储值账户信息
            tableData () {
                if (this.chargeInfo && Object.keys(this.chargeInfo).length > 0) {
                    return [this.chargeInfo];
                } else {
                    return [];
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .table-wrap {
        width: 500px;
    }
</style>
