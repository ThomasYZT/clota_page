<!--设备信息-->

<template>
  <div class="device-info">
    <bread-crumb-head>
    </bread-crumb-head>
    <div class="device-detail">
      <div class="device-name">
        MSSql-01设备信息
      </div>
      <div class="de-li">
        <ul class="detail-list">
          <li class="arg-list">
            <span class="key">设备名称：</span>
            <span class="val">MSSqlMSSqlMSSqlMSSqlMSSqlMSSql-01</span>
          </li>
          <li class="arg-list">
            <span class="key">系统：</span>
            <span class="val">MSSqlMSSqlMSSqlMSSqlMSSqlMSSql-01</span>
          </li>
          <li class="arg-list">
            <span class="key">系统描述：</span>
            <span class="val">MSSqlMSSqlMSSqlMSSqlMSSqlMSSql-01</span>
          </li>
        </ul>
        <ul class="detail-list">
          <li class="arg-list">
            <span class="key">IP地址：</span>
            <span class="val">MSSqlMSSqlMSSqlMSSqlMSSqlMSSql-01</span>
          </li>
          <li class="arg-list">
            <span class="key">系统类型：</span>
            <span class="val">MSSqlMSSqlMSSqlMSSqlMSSqlMSSql-01</span>
          </li>
          <li class="arg-list">
            <span class="key">密码：</span>
            <span class="val">MSSqlMSSqlMSSqlMSSqlMSSqlMSSql-01</span>
          </li>
        </ul>
        <ul class="detail-list">
          <li class="arg-list">
            <span class="key">应用服务：</span>
            <span class="val">MSSqlMSSqlMSSqlMSSqlMSSqlMSSql-01</span>
          </li>
          <li class="arg-list">
            <span class="key">监控频率：</span>
            <span class="val">MSSqlMSSqlMSSqlMSSqlMSSqlMSSql-01</span>
          </li>
        </ul>
      </div>
      <div class="system-alarm">
        <div class="name">系统报警</div>
        <ul class="alarm">
          <li class="detail">
            <div class="alarm-name">服务器无响应</div>
            <div class="time">2016-09-09 08:00</div>
            <div class="operate">查看</div>
          </li>
          <li class="detail">
            <div class="alarm-name">服务器无响应</div>
            <div class="time">2016-09-09 08:00</div>
            <div class="operate">查看</div>
          </li>
        </ul>
      </div>
      <div class="serve-depart">

      </div>
    </div>
  </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    export default {
        components : {
          breadCrumbHead
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .device-info{
    @include block_outline();
    background: $color_f4f6f9;

    .device-detail{
      @include block_outline($height : unquote('calc(100% - 74px)'));
      margin-top: 20px;
      background: $color_fff;
      @include padding_place();
      padding: 26px 60px;
      overflow: auto;

      .device-name{
        padding: 14px 0;
        @include overflow_tip(100%,56px);
        font-size: $font_size_20px;
        color: rgba($color_000,0.85);
      }

      .de-li{
        @include block_outline($height : auto);
        overflow: auto;

        .detail-list{
          float: left;
          @include block_outline(33.33%,auto);

          .arg-list{
            @include block_outline($height : 30px);
            padding: 4px;
            line-height: 22px;
            font-size: $font_size_14px;
            display: flex;
            flex-direction: row;

            .key{
              color: $color_333;
            }

            .val{
              flex: 1;
              @include overflow_tip();
              color: $color_666;
            }
          }
        }
      }

      .system-alarm{
        @include block_outline($height : auto);
        border-top: 1px dashed $color_E1E1E1;
        clear: both;
        margin-top: 21px;
        @include padding_place(38px);

        .name{
          @include block_outline($height : 70px);
          padding: 25px 0 20px 0;
          line-height: 24px;
          font-size: $font_size_16px;
          color: $color_333;
        }

        .alarm{
          @include block_outline(580px,auto);

          .detail{
            @include block_outline($height : 47px);
            display: flex;
            flex-direction: row;
            line-height: 47px;
            border-bottom: 1px solid $color_E8E8E;
            padding: 0 20px 0 15px;
            font-size: $font_size_14px;

            &:nth-of-type(1){
              border-top: 1px solid $color_E8E8E;
            }

            .alarm-name{
              flex :1;
              @include overflow_tip();
              color: $color_666;
            }

            .time{
              @include block_outline(160px);
              color: $color_666;
            }

            .operate{
              @include block_outline(50px);
              font-size: $font_size_12px;
              color: $color_blue;
              cursor: pointer;
            }
          }
        }
      }

      .serve-depart{
        @include block_outline($height : auto);
        background: $color_fff;
        border: 1px solid $color_DFE2E5;
        border-radius: 4px;
      }
    }
  }
</style>
