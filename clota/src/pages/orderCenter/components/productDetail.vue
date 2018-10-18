<!--
内容：产品明细
作者：
日期：
-->

<template>
    <div class="product-detail">
        <div class="block-title">{{$t('产品明细')}}</div>
        <div class="table-top">
            <!--产品名称-->
            <span>{{$t('productName')}}：{{baseInfo.productName | contentFilter}}</span>
            <!--产品单价-->
            <span style="margin-left: 40px;">{{$t('settlePrice')}}：{{baseInfo.price | contentFilter}}</span>
            <div class="audit-btn">
                <Button type="primary" style="width: 88px; margin-right: 5px;">{{$t('通过')}}</Button>
                <Button type="error" style="width: 88px; background-color: #EB6751;">{{$t('全部驳回')}}</Button>
            </div>
        </div>
        <!--产品列表-->
        <table-com
            :table-com-min-height="300"
            :ofsetHeight="170"
            :show-pagination="false"
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :column-check="true"
            @selection-change="changeSelection">
        </table-com>
        <div class="table-bottom">
            <i class="iconfont icon-note"></i>
            <ul>
                <li>{{$t('未取票')}}：<b>0</b></li>
                <li>{{$t('已取票')}}：<b>0</b></li>
                <li>{{$t('未核销')}}：<b>0</b></li>
                <li>{{$t('已核销')}}：<b>0</b></li>
                <li>{{$t('已退票')}}：<b>0</b></li>
                <li>{{$t('已改签')}}：<b>0</b></li>
            </ul>
            <div class="reserve-num">{{$t('已改签')}}：<b>{{baseInfo.quantity | contentFilter}}</b></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {productListHead} from '../auditCenter/auditConfig';
    import ajax from '@/api/index';

    export default {
        components: {tableCom},
        props: {
            moduleInfo: Array,
            baseInfo: Object
        },
        data() {
            return {
                //表头配置
                columnData : productListHead,
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

    .block-title {
        @include info-block-title(20px, 20px, 18px, 14px, $color_blue, 4px);
    }

    .table-bottom {
        margin-top: 10px;
        padding: 0 16px;
        background: $color_E8F7FF;
        border: 1px solid rgba(0,130,213,0.50);
        border-radius: 4px;

        .icon-note {
            color: $color_blue;
        }
        ul {
            display: inline-block;
            margin-left: 15px;
            vertical-align: middle;
            > li {
                float: left;
                margin-right: 40px;
                line-height: 30px;
                color: rgba(0,0,0,0.65);
                b {
                    color: #000;
                }
            }
        }
        .reserve-num {
            float: right;
            margin-right: 14px;
            color: $color_red;
            line-height: 30px;
        }
    }
</style>
