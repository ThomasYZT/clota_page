<!--磁盘使用情况面积图-->

<template>
    <vue-echarts
        ref="area"
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
        data () {
            return {
                //重置面积图定时器
                timer : ''
            };
        },
        props : {
            //y轴名称
            'y-yxis-name' : {
                type : String,
                default : ''
            },
            //数据
            'series-data' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //图标和数据
            'legend-data' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //日志文件类型
            'area-type' : {
                type : String,
                default : 'disk'
            }
        },
        methods : {},
        computed : {
            //面积图配置
            areaOptions () {
                return getPieConfig( this.legendData,this.seriesData,this.yYxisName,this.areaType);
            }
        },
        watch : {
            //配置改变，重新渲染图表
            areaOptions () {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.$nextTick(() => {
                        this.$refs.area.refresh();
                    });
                    clearTimeout(this.timer);
                },300);
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
</style>
