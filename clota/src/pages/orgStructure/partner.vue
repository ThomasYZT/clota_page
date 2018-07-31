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
          label="合作伙伴编码">
          <template slot-scope="scope">
            <div class="cellText"><span class="code">309287482</span></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="合作伙伴名称">
          <template slot-scope="scope">
            <div>星火旅行社1</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="合作伙伴名称">
          <template slot-scope="scope">
            <div>A级销售渠道</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="合作协议起始日期">
          <template slot-scope="scope">
            <div>2018-10-09</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="合作协议结束日期">
          <template slot-scope="scope">
            <div>2018-10-09</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="协议状态">
            <template slot-scope="scope">
              <div>已启用</div>
            </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="备注">
          <template slot-scope="scope">
            <div>这是动物园门票，这是动物园门票，</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <div class="operation">
              <span>修改</span>
              <span class="disable">禁用</span>
              <span>删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>



<script>
  import ajax from '@/api/ajaxList'
  import { Table } from 'element-ui';
  export default {
    components: {
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
        }]
      }
    },
    methods: {

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
      background: #F5F7FA;
    }
    .el-table th>.cell{
      color: #303133;
      font-weight: normal;
    }
    .code{
      color: #333333;
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
        .disable{
          color: $color_yellow;
        }
        &:last-child{
          border-right: none;
          color: $color_red;
        }
      }
    }
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
