<template>
  <div class="partner">
    <div class="orgHeader">
      <Select style="width: 180px;float: left;margin-right:10px">
        <Option value="132">全部公司景区</Option>
      </Select>
      <Select style="width: 180px;float: left;margin-right:10px">
        <Option value="132">全部业态</Option>
      </Select>
      <Select style="width: 180px;float: left;margin-right:10px">
        <Option value="132">全部角色名称</Option>
      </Select>
      <Button type="primary"  style="float: left;margin-right: 10px" @click="addPartnerBtn" size="default">查 询</Button>
      <Button type="ghost" style="float: left" size="default">重 置</Button>
    </div>
    <div>
      <el-table
        :data="tableData3"
        :border="true"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="公司/景区名称">
          <template slot-scope="scope">
            <div class="cellText">水世界管理有限公司</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="业态类型">
          <template slot-scope="scope">
            <div>票务</div>
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
          label="角色名称">
          <template slot-scope="scope">
            <div>产品操作员</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <div class="operation">
              <span class="span-blue">查看详情</span>
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
  //弹窗
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
      //新增合作伙伴
      addPartnerBtn(){
      },
      //删除合作伙伴
      deletePartnerBtn(){
      },
      init(){

      }
    },
    computed: {
    },
    created () {
    },
  }
</script>

<style lang="scss">
  @import '~@/assets/scss/base';
  .partner{

  }
</style>
