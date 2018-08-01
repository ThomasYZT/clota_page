<template>
  <div class="disChannel">
    <div class="header">
      <Button type="primary" icon="md-add" style="float: left;margin-right: 10px" @click="addPartnerBtn" size="default">新增分组</Button>
      <Button style="float: left" class="ivu-btn-cancel" size="default">批量操作</Button>
      <div class="search">
        <Input suffix="ios-search" placeholder="全部分组" />
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
          label="渠道编码">
          <template slot-scope="scope">
            <div class="cellText"><span class="code">309287482</span></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="渠道名称">
          <template slot-scope="scope">
            <div>星火旅行社1</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="销售渠道类型">
          <template slot-scope="scope">
            <div>A级销售渠道</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <div class="operation">
              <span>修改</span>
              <span class="disable">移动到</span>
              <span class="delete" @click="deletePartnerBtn">移出分组</span>
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
    <edit-dropdown></edit-dropdown>
  </div>
</template>



<script>
  import ajax from '@/api/ajaxList'
  import editDropdown from '../../../components/editDropdown/editDropdown.vue';
  //弹窗
  export default {
    components: {
      editDropdown,
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
        pattnerName:'售票处终端001',
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

<style lang="scss">
  @import '~@/assets/scss/base';
  .disChannel{
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
