<!--
内容：储值账户信息
作者：djc
日期：
-->

<template>
    <div class="">
        <div class="block-title">{{$t('储值账户信息')}}</div>
        <div class="table-wrap">
            <table-com
                :table-com-min-height="250"
                :column-data="columnData"
                :table-data="tableData"
                :border="false">
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{ scope.row.account | moneyFilter }} {{$t('yuan')}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{ scope.row.account | moneyFilter }} {{$t('yuan')}}
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
        components: {tableCom},
        props: {},
        data() {
            return {
                // 表头信息
                columnData: [
                    {
                        title: '本金',
                        minWidth: 180,
                        field: '',
                    },
                    {
                        title: '赠送金额',
                        minWidth: 180,
                        field: '',
                    }
                ],
                // 列表数据
                tableData: [],
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {}
    };
</script>

<style lang="scss" scoped>
    .table-wrap {
        width: 500px;
    }
</style>
