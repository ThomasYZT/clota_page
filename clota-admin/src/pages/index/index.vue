<!--首頁-->

<template>
  <div class="index-page">
    <div class="time-chose">
      <Select v-model="dataType" style="width:224px">
        <Option v-for="item in dataList"
                :value="item.value"
                :key="item.value">
          {{ item.label }}
        </Option>
      </Select>
      <DatePicker type="daterange"
                  placement="bottom-end"
                  style="width: 224px">
      </DatePicker>
    </div>
    <div class="top-data">
      <top-data :label-name="$t('todayLogin')"
                :label-rate="23"
                :label-num="100">
      </top-data>
      <top-data :label-name="$t('travelOrder')"
                :label-rate="23"
                :label-num="100">
      </top-data>
      <top-data :label-name="$t('tenementCount')"
                :label-rate="23"
                :label-num="100">
      </top-data>
      <top-data :label-name="$t('serverCount')"
                :label-rate="23"
                :label-num="100">
      </top-data>
    </div>
    <div class="abnormal">
      <abnormal-warn>
      </abnormal-warn>
      <lessee-place>
      </lessee-place>
    </div>
    <div class="server-info">
      <server-list>
      </server-list>
      <rank-list>
      </rank-list>
    </div>
  </div>
</template>

<script>
    import topData from './child/topData';
    import abnormalWarn from './child/abnormalWarn';
    import lesseePlace from './child/lesseePlace';
    import serverList from './child/serverList';
    import rankList from './child/rankList';
    export default {
        components : {
          topData,
          abnormalWarn,
          lesseePlace,
          serverList,
          rankList
        },
        data() {
            return {
              //数据类型
              dataType : '',
              //类型列表
              dataList : [
                {
                  label : '运营数据大盘',
                  value : ''
                }
              ]
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .index-page{
    padding: 12px 100px 0 100px;
    background: $color_f4f6f9;
    @include block_outline();
    @include padding_place();
    overflow: auto;

    .time-chose{
      .ivu-select{
        margin-right: 17px;
      }
    }

    .top-data,
    .abnormal,
    .server-info{
      overflow: auto;
      margin-top: 15px;
    }
  }
</style>
