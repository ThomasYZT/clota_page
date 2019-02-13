<!--
内容：畅销产品 - 按日期获取数据
作者：djc
日期：
-->

<template>
    <div class="popular-product">
        <div class="header-box">
            <span class="title">{{$t('popularProduct')}}</span>
            <DatePicker type="month"
                        v-model.trim="date"
                        :editable="false"
                        :clearable="false"
                        :placeholder="$t('selectField',{msg: ''})"
                        placement="bottom-end"
                        class="date-picker"
                        @on-change="getPopularProducts">
            </DatePicker>
        </div>

        <template v-if="columnChartData.series.length > 0">
            <div class="chart-area">
                <column :column-data="columnChartData"></column>
            </div>
        </template>
        <template v-else>
            <div class="no-data-wrapper">
                <noDataTip></noDataTip>
            </div>
        </template>
    </div>
</template>
<script>
    import ajax from '@/api/index.js';
    import column from '../../components/column.vue';
    import noDataTip from '@/components/noDataTip/noData-tip';
    export default {
        components : {
            column,
            noDataTip
        },
        props : {},
        data () {
            return {
                //日期
                date : new Date(),
                //畅销产品柱状图表数据
                columnChartData : {
                    series : [],
                    xAxisData : []
                }
            };
        },
        computed : {},
        created () {
            this.getPopularProducts();
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 查询畅销产品数据
             */
            getPopularProducts () {
                this.columnChartData = {
                    series : [],
                    xAxisData : []
                };
                ajax.post('workbench-getGoodSaleProduct',{
                    date : this.date.format('yyyy-MM'),
                }).then(res => {
                    if (res.success && res.data) {
                        if (res.data.length > 0) {
                            this.columnChartData.series.push({
                                name : this.$t('salesQty'),
                                data : res.data.map(item => {
                                    return item.value;
                                }),
                                type : "bar",
                            });
                            this.columnChartData.xAxisData = res.data.map(item => {
                                return item.name;
                            });
                        } else {
                            this.columnChartData = { series : [], xAxisData : [] };
                        }

                    } else {
                        this.columnChartData = { series : [], xAxisData : [] };
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .popular-product {
        width: 410px;
        float: right;
        height: 100%;
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

            .chart-area {
                height: calc(100% - 45px);
            }
        }

        .no-data-wrapper {
            position: relative;
            width: 100%;
            height: calc(100% - 45px);
        }
    }
</style>
