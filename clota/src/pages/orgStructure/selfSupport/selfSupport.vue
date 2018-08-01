<template>
  <div class="partner">
    <div class="header">
      <Button type="primary" icon="md-add" style="float: left;margin-right: 10px">新增合作伙伴</Button>
      <Button style="float: left">批量操作</Button>
      <div class="search">
        <Input suffix="ios-search" placeholder="请输入任意信息进行查询" />
      </div>
    </div>
    <div>
      <el-table
        :data="tableData3"
        :border="true"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="自营渠道编码">
          <template slot-scope="scope">
            <div class="cellText"><span class="code">309287482</span></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="自营渠道名称">
          <template slot-scope="scope">
            <div>星火旅行社1</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="销售渠道分组">
          <template slot-scope="scope">
            <div>A级销售渠道</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="自营渠道类型">
          <template slot-scope="scope">
            <div>2018-10-09</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="URL/IP">
          <template slot-scope="scope">
            <div>2018-10-09</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="状态"
          :render-header="renderHeader">
          <template slot-scope="scope">
            <div class="cellText">
                <span @click="enable">
                  <span :class="enableValue?'icon_enable':'icon_notEnable'"></span><span>已启用</span>
                </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="备注">
          <template slot-scope="scope">
            <div>备注</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <div class="operation">
              <span>修改</span>
              <span class="disable">禁用</span>
              <span class="delete">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>



<script>
  import ajax from '@/api/ajaxList'
  import filterDrop from  '../../../components/filterDrop/filterDrop.vue';
  export default {
    components: {
      filterDrop
    },
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        listFilters: {
          stateFilter: [{name: '全部', state: 'all'}, {name: '已签到', state: 'ok'}, {name: '未签到', state: 'leak'}],
          alertFilter: [{name: '不限', alert: 'all'}, {name: '异常', alert: 'alert'}, {
            name: '正常',
            alert: 'normal'
          }],
        },
        enableValue:true,
      }
    },
    methods: {
      renderHeader(h, params) {
        return h(filterDrop, {
          props: {
            colParams: params.column,
            filters: this.listFilters
          },
          on: {
            'state-filter': this.handleAlertFilter,
            'alert-filter': this.handleAlertFilter,
          }
        });
      },
      handleAlertFilter(){

      },
      enable () {
        this.enableValue = !this.enableValue;
        if(this.enableValue){
          this.$Message.success('您已启用合作伙伴：星火旅社1');
        }else{
          this.$Message.warning('您已禁用合作伙伴：星火旅社1');
        }
      },
    },
    computed: {
    },
    created () {
    },
  }
</script>

<style lang="scss"  scoped>
  @import '~@/assets/scss/base';
  /deep/.partner{
    .ivu-btn{
      padding: 6px 20px 5px!important;
    }
    .el-table th{
      background: $color_F5F7FA;
    }
    .el-table th>.cell{
      color: $color_303133;
      font-weight: normal;
    }
    .el-pager li{
      color: $color_606266;
      font-weight: normal;
    }
    .el-pager li.active{
      color: $color_6666FF;
    }
  }
  .cellText{
    .code{
      color: $color_333;
    }
    .icon_enable{
      width: 6px;
      height: 6px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 8px;
      overflow: hidden;
      background: $color_green;
    }
    .icon_notEnable{
      width: 6px;
      height: 6px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 8px;
      overflow: hidden;
      background: $color_BBC5D5;
    }
  }
  .operation{
    @include clearfix;
    span{
      color: $color_blue;
      padding-right: 9px;
      padding-left: 9px;
      border-right: 1px solid #E1E1E1;
      cursor: pointer;
      float: left;
      &:last-child{
        border-right: none;
        color: $color_red;
      }
    }
    .disable{
      color: $color_yellow;
    }
    .delete{
      color: $color_gray!important;
      cursor: not-allowed;
    }
  }
  .pagination{
    margin:30px auto;
    text-align: center;
  }
  .partner{
    .header{
      @include clearfix;
      padding: 14px 30px;
      .search{
        width: 353px;
        float: right;
      }
    }
  }
</style>
