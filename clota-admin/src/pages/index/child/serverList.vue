<!--服务器列表-->

<template>
  <div class="server-list">
    <div class="title">
      服务器列表
      <span class="server-care">服务器维护</span>
    </div>
    <div class="table-list">
      <table-com
        :table-data="tableData"
        table-height="268px"
        :column-data="columnData">
      </table-com>
    </div>
  </div>
</template>

<script>
    import tableCom from './tableCom';
    import {columns} from './serverListConfig';
    export default {
        components : {
          tableCom
        },
        data() {
            return {
              tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
              }],
              //表头配置
              columnData : columns
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .server-list{
    float: left;
    @include block_outline($width : unquote('calc(100% - 425px)'),$height : 315px);
    @include card();

    .title{
      @include block_outline($height : 45px);
      border-bottom: 1px solid $color_E8E8E;
      line-height: 45px;
      padding : 0 20px;
      font-size: $font_size_16px;
      color: $color_353B5E;

      .server-care{
        float: right;
        font-size: $font_size_12px;
        color: $color_1890FF;
        cursor: pointer;
      }
    }

    .table-list{
      @include block_outline($height : 268px);

      /deep/ .el-table td,
      /deep/ .el-table th{
        padding: 8px 0!important;
      }
    }
  }
</style>
