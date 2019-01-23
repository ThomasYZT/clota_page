<!--柱图-->

<template>
    <vue-echarts
        :options="columnOptions"
        auto-resize>
    </vue-echarts>
</template>

<script>
    import getColumnConfig from './columnConfig';
    import vueEcharts from '@/components/vueEcharts/eCharts.vue';

    export default {
        props : {
            //饼图数据
            'column-data' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            vueEcharts
        },
        data () {
            return {};
        },
        methods : {},
        computed : {
            //柱图配置
            columnOptions () {
                return getColumnConfig(this.columnData.xAxisData, this.columnData.series);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .echarts {
        @include block_outline(408px, 372px);
    }
</style>
