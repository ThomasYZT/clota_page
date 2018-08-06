<!--环形图-->

<template>
  <div class="circle-chart">
    <vue-echarts
      ref="echarts"
      :options="options"
      auto-resize>
    </vue-echarts>
  </div>
</template>

<script>
  import vueEcharts from '@/components/vueEcharts/ECharts.vue';
  export default {
    components : {
      vueEcharts
    },
    props :{
      //率
      'rate' : {
        type : Number,
        default : 0
      }
    },
    data() {
      return {}
    },
    methods: {},
    computed : {
      //环形图配置参数
      options () {
        return {
          grid: {
            top: 0,
            bottom: 20,
            left: 15,
            right: 15,
            containLabel: false
          },
          tooltip: {
            show: false,
          },
          series: [{
            type: 'pie',
            animation : false,
            radius: [55, 70],//内外半径
            avoidLabelOverlap: false,//是否启用防止标签重叠策略
            hoverAnimation: false,//是否开启 hover 在扇区上的放大动画效果。
            silent: true,//图形是否不响应和触发鼠标事件
            center: ['50%', 114],//饼图的中心（圆心）坐标
            label: {
              normal: {
                show: true,
                position : 'center',
                color: '#353B5E',
                fontSize: 20,
                fontWeight: 'normal'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#FFFFFF',
                borderWidth : 0
              }
            },
            data: [
              {value:this.rate,name : this.rate + '%'},
              {value : 100 - this.rate}
            ],
            color: ['#55C6C5','#f3f3f8'],
          }],
          title :{
            show : true,
            text : '通过率',
            bottom : 0,
            left : 'center',
            textStyle : {
              color : '#999999',
              fontSize : 12
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';
  .circle-chart{
    float: left;
    @include block_outline($height : 195px);

    /deep/ .echarts{
      @include block_outline($height : 195px);
    }
  }
</style>
