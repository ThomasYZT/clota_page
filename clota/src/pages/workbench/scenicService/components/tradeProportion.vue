<!--
内容：业态经营占比 - 按日期获取数据
作者：djc
日期：
-->

<template>
    <div class="trade-proportion">
        <div class="header-box">
            <span class="title">{{$t('tradeProportion')}}</span>
            <DatePicker type="date"
                        v-model.trim="date"
                        :editable="false"
                        :clearable="false"
                        :placeholder="$t('selectField',{msg: ''})"
                        placement="bottom-end"
                        class="date-picker"
                        @on-change="getTradeRatio">
            </DatePicker>
        </div>
        <div class="chart-area">
            <pie :pie-data="pieChartData"></pie>
        </div>
    </div>
</template>
<script>
    import ajax from '@/api/index.js';
    import pie from '../../components/pie.vue';

    export default {
        components : {
            pie
        },
        props : {},
        data () {
            return {
                //日期
                date : new Date(),
                //业态经营占比柱状图表数据
                pieChartData : {
                    data : [
                        /*{
                            value : 20,
                            name : '冰雪'
                        },{
                            value : 40,
                            name : '餐饮'
                        },{
                            value : 40,
                            name : '门票'
                        },*/
                    ],
                    legend : []
                },
            }
        },
        computed : {},
        created () {
            this.getTradeRatio();
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 查询业态经营占比柱状图表数据
             */
            getTradeRatio () {
                ajax.post('workbench-getSaleAmountRatio',{
                    date : this.date.format('yyyy-MM-dd'),
                }).then(res => {
                    if (res.success && res.data) {
                        this.pieChartData.data = res.data.data || [];
                    } else {
                        this.pieChartData.data = [];
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .trade-proportion {
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
    }
</style>
