<!---->

<template>
    <vue-echarts
        :options="areaOptions"
        auto-resize>
    </vue-echarts>
</template>

<script>
    import vueEcharts from '@/components/vueEcharts/ECharts.vue';
    import getPieConfig from './areaConfig';
    export default {
        components : {
            vueEcharts
        },
        data() {
            return {}
        },
        props : {
            //y轴名称
            'y-yxis-name' : {
                type : String,
                default : ''
            }
        },
        methods: {},
        computed: {
            //面积图配置
            areaOptions() {
                return getPieConfig(['2.4', '5.6','7.9'], [22,12,40],this.yYxisName);
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
</style>
