<!--饼图-->

<template>
  <vue-echarts
    :options="pieOptions"
    auto-resize>
  </vue-echarts>
</template>

<script>
    import getPieConfig from './pieConfig';
    import vueEcharts from '@/components/vueEcharts/ECharts.vue';
    export default {
        props : {

        },
        components : {
          vueEcharts
        },
        data() {
            return {
            }
        },
        methods: {
        },
        computed : {
          //饼图配置
          pieOptions () {
            return getPieConfig(['a','b'],[
              {
                name : 'a',
                value : 1
              },
              {
                name : 'b',
                value : 11
              }
            ]);
          }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .echarts{
    @include block_outline(408px,260px);
  }
</style>
