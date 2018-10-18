<!--
内容：产品明细
作者：
日期：
-->

<template>
    <div class="product-detail">
        <div class="block-title">{{$t('产品明细')}}</div>
        <div class="table-top">
            <span>{{$t('产品名称')}}：{{}}</span>
            <span>{{$t('产品单价')}}：{{}}</span>
            <div class="audit-btn">
                <Button type="primary">{{$t('通过')}}</Button>
                <Button type="error">{{$t('全部驳回')}}</Button>
            </div>
        </div>
        <!--产品列表-->
        <table-com
            :ofsetHeight="170"
            :show-pagination="false"
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :column-check="true"
            @query-data="queryList"
            @selection-change="changeSelection">
        </table-com>
        <div class="table-bottom"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {productListHead} from '../auditCenter/auditConfig';
    import ajax from '@/api/index';

    export default {
        components: {},
        props: {},
        data() {
            return {
                //表头配置
                columnData : bulkRefundHead,
                //表格数据
                tableData: [],
                // 已勾选的数据
                chosenRowData: [],
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection(selection) {
                this.chosenRowData = selection;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';


</style>
