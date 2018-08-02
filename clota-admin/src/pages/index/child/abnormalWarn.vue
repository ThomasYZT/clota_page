<!--异常事件报警-->

<template>
  <div class="abnormal-warn">
    <div class="title">异常事件报警</div>
    <div class="table-list-area">
      <ul class="event-list">
        <li class="event">
          <ul class="event-info">
            <li class="event-name">服务器无响应</li>
            <li class="server-name">Service-01</li>
            <li class="event-time">2016-09-09 08:00</li>
            <li class="watch">查看</li>
          </ul>
        </li>
        <li class="event">
          <ul class="event-info">
            <li class="event-name">服务器无响应</li>
            <li class="server-name">Service-01</li>
            <li class="event-time">2016-09-09 08:00</li>
            <li class="watch">查看</li>
          </ul>
        </li>
        <li class="event">
          <ul class="event-info">
            <li class="event-name">服务器无响应</li>
            <li class="server-name">Service-01</li>
            <li class="event-time">2016-09-09 08:00</li>
            <li class="watch">查看</li>
          </ul>
        </li>
        <li class="event">
          <ul class="event-info">
            <li class="event-name">服务器无响应</li>
            <li class="server-name">Service-01</li>
            <li class="event-time">2016-09-09 08:00</li>
            <li class="watch">查看</li>
          </ul>
        </li>
        <li class="event">
          <ul class="event-info">
            <li class="event-name">服务器无响应</li>
            <li class="server-name">Service-01</li>
            <li class="event-time">2016-09-09 08:00</li>
            <li class="watch">查看</li>
          </ul>
        </li>
        <li class="event">
          <ul class="event-info">
            <li class="event-name">服务器无响应</li>
            <li class="server-name">Service-01</li>
            <li class="event-time">2016-09-09 08:00</li>
            <li class="watch">查看</li>
          </ul>
        </li>
        <li class="event">
          <ul class="event-info">
            <li class="event-name">服务器无响应</li>
            <li class="server-name">Service-01</li>
            <li class="event-time">2016-09-09 08:00</li>
            <li class="watch">查看</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="page-area">
      <el-pagination
        :current-page="pageNo"
        :page-sizes="pageSizeConfig"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import {configVariable} from '../../../assets/js/constVariable';
    export default {
        data() {
            return {
              //每页大小配置
              pageSizeConfig : configVariable.pageSizeConfig,
              //每页大小
              pageSize : configVariable.pageDefaultSize,
              //当前页码
              pageNo : 1
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .abnormal-warn{
    float: left;
    @include block_outline($width : unquote('calc(100% - 425px)'),$height : 309px);
    @include card();

    .title{
      @include block_outline($height : 45px);
      border-bottom: 1px solid $color_E8E8E;
      line-height: 45px;
      padding : 0 20px;
      font-size: $font_size_16px;
      color: $color_353B5E;
    }

    .table-list-area{
      padding: 0 20px;
      @include block_outline($height : 204px);

      .event-list{
        overflow: auto;
        @include block_outline();

        .event{
          @include block_outline($height : 40px);
          border-bottom: 1px solid $color_E6EAEE;

          .event-info{
            @include block_outline();

            .event-name,
            .server-name,
            .watch,
            .event-time{
              float: left;
              @include block_outline(unquote('calc((100% - 50px) / 3)'));
              line-height: 40px;
              font-size: $font_size_14px;
              color: $color_666;
            }

            .event-name{
              padding-left: 20px;
            }

            .watch{
              float: left;
              @include block_outline(50px);
              color: $color_0082D5;
              cursor: pointer;
            }
          }
        }
      }
    }

    .page-area{
      @include block_outline($height : 57px);
      text-align: center;

      /deep/ .el-pagination{
        display: inline-block;
        padding-top: 15px;
      }
    }
  }
</style>
